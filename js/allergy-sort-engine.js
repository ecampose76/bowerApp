// ============================================================
// ALLERGY SORT ENGINE — pure round-generation logic, no DOM.
// Builds a balanced 6-dish sort round (3 containing a given
// allergen, 3 free of it) from DISHES' real allergensInRecipe
// data. Dishes with no allergen data at all are never included
// -- absence of data is never treated as "allergen-free".
// ============================================================

// Nuts (2 dishes total) and Pork (1 dish total) can never supply
// 3 examples on the minority side, so they're excluded outright --
// a data ceiling, not a design choice.
const ALLERGY_SORT_PLAYABLE = [
  "alcohol", "chili", "citrus", "dairy", "eggs", "fish", "garlic",
  "gluten", "mustard", "onion", "sesame", "shellfish", "soy", "vinegar"
];

const ALLERGY_SORT_LABELS = {
  alcohol: "Alcohol", chili: "Chili", citrus: "Citrus", dairy: "Dairy",
  eggs: "Eggs", fish: "Fish", garlic: "Garlic", gluten: "Gluten",
  mustard: "Mustard", onion: "Onion", sesame: "Sesame",
  shellfish: "Shellfish", soy: "Soy", vinegar: "Vinegar"
};

function shuffleArr(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Splits every dish that actually has allergen data into "has" / "without"
// for the given allergen. Dishes missing allergensInRecipe are excluded
// entirely -- never assumed allergen-free.
function buildAllergenPool(dishes, allergen) {
  const eligible = dishes.filter((d) => Array.isArray(d.allergensInRecipe));
  const has = eligible.filter((d) => d.allergensInRecipe.includes(allergen));
  const without = eligible.filter((d) => !d.allergensInRecipe.includes(allergen));
  return { has, without };
}

// Builds one round: half the dishes contain the allergen, half don't,
// drawn randomly from real data and shuffled for display order. Throws
// if the pool can't honestly supply a balanced round -- callers should
// only ever offer allergens from ALLERGY_SORT_PLAYABLE, but this stays
// defensive regardless of what's passed in.
function buildSortRound(dishes, allergen, roundSize = 6) {
  const perSide = Math.floor(roundSize / 2);
  const { has, without } = buildAllergenPool(dishes, allergen);
  if (has.length < perSide || without.length < perSide) {
    throw new Error(`Allergen "${allergen}" cannot supply a balanced ${roundSize}-card round (has: ${has.length}, without: ${without.length}).`);
  }
  const pickedHas = shuffleArr(has).slice(0, perSide);
  const pickedWithout = shuffleArr(without).slice(0, perSide);
  const cards = shuffleArr([
    ...pickedHas.map((d) => ({ id: d.id, name: d.name, section: d.section, desc: d.description || "", truth: "has", allergens: d.allergensInRecipe })),
    ...pickedWithout.map((d) => ({ id: d.id, name: d.name, section: d.section, desc: d.description || "", truth: "without", allergens: d.allergensInRecipe }))
  ]);
  return { allergen, cards };
}

if (typeof window !== "undefined") {
  window.ChiriusAllergySort = { ALLERGY_SORT_PLAYABLE, ALLERGY_SORT_LABELS, buildAllergenPool, buildSortRound };
}
