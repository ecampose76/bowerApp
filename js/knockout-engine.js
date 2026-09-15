// ============================================================
// KNOCKOUT GAME ENGINE — pure matchup logic, no DOM/storage.
// Builds a themed comparison block (fixed axis, persistent
// champion) from WINES' structure fields. See project handoff
// doc + design discussion for why prompts stay fixed per block
// instead of rotating every round.
//
// Every axis here is framed "higher structure value wins" —
// sweeter, more acidic, more tannic, higher alcohol, fuller body.
// If a future axis doesn't follow that orientation, it needs its
// own comparator, not a reuse of this one.
// ============================================================

const KNOCKOUT_AXES = {
  acidity:   { key: "acidity",   label: "Which has higher acidity?",   scope: () => true },
  alcohol:   { key: "alcohol",   label: "Which is higher in alcohol?", scope: () => true },
  body:      { key: "body",      label: "Which is fuller-bodied?",     scope: () => true },
  tannin:    { key: "tannin",    label: "Which has more tannin?",      scope: (w) => w.style === "red" },
  sweetness: { key: "sweetness", label: "Which is sweeter?",           scope: () => true }
};

// Round-by-round bucket preference, biggest delta (easiest/clearest)
// first, tightest delta (hardest/closest) last -- this is the mastery
// ramp. Blocks longer than this array just repeat the final ("hardest")
// preference for any extra rounds.
const ROUND_DELTA_CURVE = [
  [3, 2, 1],
  [3, 2, 1],
  [2, 3, 1],
  [2, 1, 3],
  [1, 2, 3],
  [1, 2, 3]
];

function pairKey(idA, idB) {
  return [idA, idB].sort().join("|");
}

// Builds every valid (non-tied) pair within an axis's scope, bucketed by
// |delta|. Ties are real data (e.g. two wines both acidity:4) and are
// excluded, not resolved -- there is no honest "winner" for a tie.
function buildAxisPool(wines, axisKey) {
  const axis = KNOCKOUT_AXES[axisKey];
  if (!axis) throw new Error(`Unknown knockout axis: ${axisKey}`);

  const scoped = wines.filter(axis.scope);
  const buckets = {};
  let tieCount = 0;

  for (let i = 0; i < scoped.length; i++) {
    for (let j = i + 1; j < scoped.length; j++) {
      const a = scoped[i], b = scoped[j];
      const va = a.structure[axis.key], vb = b.structure[axis.key];
      if (va === vb) { tieCount++; continue; }
      const delta = Math.abs(va - vb);
      const winnerId = va > vb ? a.id : b.id;
      const pair = { aId: a.id, bId: b.id, delta, winnerId };
      (buckets[delta] = buckets[delta] || []).push(pair);
    }
  }

  return { axisKey, scoped, buckets, tieCount };
}

// Picks one unused pair from `pool` involving `championId`, honoring the
// requested delta-bucket preference order and falling back gracefully:
// 1. preferred buckets, excluding opponents already used this block
// 2. any bucket, excluding opponents already used this block
// 3. preferred buckets, opponents allowed to repeat (thin-pool fallback)
// Returns null only if the champion truly has zero valid opponents left.
function pickChallenger(pool, championId, usedOpponentIds, deltaPreference) {
  const allPairsForChampion = [];
  Object.keys(pool.buckets).forEach((delta) => {
    pool.buckets[delta].forEach((pair) => {
      if (pair.aId === championId || pair.bId === championId) {
        allPairsForChampion.push(pair);
      }
    });
  });
  if (allPairsForChampion.length === 0) return null;

  const opponentOf = (pair) => (pair.aId === championId ? pair.bId : pair.aId);

  const tryPass = (allowRepeatOpponent) => {
    for (const delta of deltaPreference) {
      const candidates = allPairsForChampion.filter((p) => {
        if (p.delta !== delta) return false;
        if (!allowRepeatOpponent && usedOpponentIds.has(opponentOf(p))) return false;
        return true;
      });
      if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
      }
    }
    return null;
  };

  return tryPass(false) || tryPass(true);
}

// Builds a full themed block: a chain of rounds under one fixed axis,
// with the winner of each round carrying forward as champion into the
// next. `startingWineId` is optional -- if omitted, a random scoped wine
// with at least one valid pairing is chosen. `excludeWineId` is optional --
// if provided, that wine is removed from the pool entirely for this block
// (used to keep the previous session's undefeated winner from dominating
// the next session too). If excluding it would leave the axis unbuildable,
// the exclusion is silently dropped rather than failing the block.
function buildKnockoutBlock(wines, axisKey, roundCount = 6, startingWineId = null, excludeWineId = null) {
  let activeWines = wines;
  if (excludeWineId) {
    const withoutExcluded = wines.filter((w) => w.id !== excludeWineId);
    try {
      const testPool = buildAxisPool(withoutExcluded, axisKey);
      const hasAnyPairs = Object.values(testPool.buckets).some((b) => b.length > 0);
      if (hasAnyPairs) activeWines = withoutExcluded;
    } catch (e) { /* fall through and keep the full pool */ }
  }

  const pool = buildAxisPool(activeWines, axisKey);
  const wineById = {};
  activeWines.forEach((w) => { wineById[w.id] = w; });

  const eligibleStarters = pool.scoped.filter((w) =>
    Object.values(pool.buckets).some((bucket) =>
      bucket.some((p) => p.aId === w.id || p.bId === w.id)
    )
  );
  if (eligibleStarters.length === 0) {
    throw new Error(`Axis "${axisKey}" has no valid pairs at all -- cannot build a block.`);
  }

  // A wine holding the single highest value on this axis can never lose a
  // "higher wins" comparison -- no opponent's value can exceed it. Starting
  // the block on one guarantees a champion that can't be dethroned, which
  // isn't a game, it's a coin landing on the same side forever. Exclude
  // max-value holders from the starting pool (they can still show up later
  // as challengers and dethrone someone else -- only the *opening* pick is
  // restricted). Fall back to the unfiltered pool only if that would leave
  // no eligible starter at all.
  const axisMax = Math.max(...pool.scoped.map((w) => w.structure[axisKey]));
  const nonMaxStarters = eligibleStarters.filter((w) => w.structure[axisKey] !== axisMax);
  const starterPool = nonMaxStarters.length > 0 ? nonMaxStarters : eligibleStarters;

  let championId = startingWineId && starterPool.some((w) => w.id === startingWineId)
    ? startingWineId
    : starterPool[Math.floor(Math.random() * starterPool.length)].id;

  const rounds = [];
  const usedOpponentIds = new Set([championId]);

  for (let i = 0; i < roundCount; i++) {
    const deltaPreference = ROUND_DELTA_CURVE[Math.min(i, ROUND_DELTA_CURVE.length - 1)];
    const pair = pickChallenger(pool, championId, usedOpponentIds, deltaPreference);
    if (!pair) break; // pool genuinely exhausted for this champion -- block ends short

    const challengerId = pair.aId === championId ? pair.bId : pair.aId;
    usedOpponentIds.add(challengerId);

    rounds.push({
      roundNumber: i + 1,
      axisKey,
      championId,
      challengerId,
      winnerId: pair.winnerId,
      delta: pair.delta
    });

    championId = pair.winnerId;
  }

  return {
    axisKey,
    axisLabel: KNOCKOUT_AXES[axisKey].label,
    rounds,
    finalChampionId: championId,
    poolSize: Object.values(pool.buckets).reduce((n, b) => n + b.length, 0),
    tieCount: pool.tieCount
  };
}

if (typeof window !== "undefined") {
  window.ChiriusKnockout = { KNOCKOUT_AXES, buildAxisPool, buildKnockoutBlock, pairKey };
}
