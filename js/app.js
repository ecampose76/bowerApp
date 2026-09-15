// Prime 131 Wine App — logic

const app = document.getElementById("app");
document.documentElement.setAttribute("data-build", typeof APP_VERSION !== "undefined" ? APP_VERSION : "unknown");
let current = { view: "home", params: {} };

function go(view, params = {}, pushHistory = true) {
  current = { view, params };
  if (pushHistory) {
    history.pushState({ view, params }, "", "");
  } else {
    history.replaceState({ view, params }, "", "");
  }
  render();
}

function goBack() {
  history.back();
}

window.addEventListener("popstate", (e) => {
  if (e.state) {
    current = e.state;
  } else {
    current = { view: "home", params: {} };
  }
  render();
});

history.replaceState({ view: "home", params: {} }, "", "");

// Accessibility: several interactive surfaces are <div>s (not native
// <button>s) because they carry richer internal markup (icon + title +
// subtitle, flip-card faces, etc). Give them button semantics and
// keyboard support once per render rather than repeating this in every
// render function.
const KEYBOARD_TAPPABLE_SELECTOR = ".home-option, .home-card, .list-row, .speed-toggle, .wotd-main, .flipcard, .dish-flipcard, .testme-card, .video-frame, .wcard, .asort-placed";

function makeDivsKeyboardAccessible() {
  app.querySelectorAll(KEYBOARD_TAPPABLE_SELECTOR).forEach((el) => {
    if (el.hasAttribute("tabindex")) return;
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
  });
}

app.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target.closest(KEYBOARD_TAPPABLE_SELECTOR);
  if (!el) return;
  e.preventDefault();
  el.click();
});

function findWine(id) { return WINES.find(w => w.id === id) || HRW_WINES.find(w => w.id === id); }
function findDish(id) { return DISHES.find(d => d.id === id); }

function groupByStyle(wines) {
  const groups = {};
  STYLE_ORDER.forEach(s => groups[s] = []);
  wines.forEach(w => { if (groups[w.style]) groups[w.style].push(w); });
  return groups;
}

function groupBySection(dishes) {
  const groups = {};
  SECTION_ORDER.forEach(s => groups[s] = []);
  dishes.forEach(d => { if (groups[d.section]) groups[d.section].push(d); });
  return groups;
}

function stampSVG(currentNum, total) {
  const r = 26, circ = 2 * Math.PI * r;
  const pct = currentNum / total;
  const offset = circ - (pct * circ);
  return `<svg width="52" height="52" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="${r}" fill="none" stroke="var(--washi-300)" stroke-width="2.5"/>
    <circle cx="30" cy="30" r="${r}" fill="none" stroke="var(--bronze-500)" stroke-width="3"
      stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"
      transform="rotate(-90 30 30)"/>
    <text x="30" y="36" text-anchor="middle" font-family="JetBrains Mono" font-size="14" fill="var(--shoyu-700)">${currentNum}</text>
  </svg>`;
}

function guestFit(wine) {
  const { body, tannin } = wine.structure;
  if (wine.style === "sparkling") return "Celebratory moments, or any guest who wants something festive without a full glass of still wine.";
  if (wine.style === "sake") return "Guests doing the sushi or omakase who want a pour built specifically for raw fish.";
  if (wine.style === "white") {
    if (body >= 4) return "Guests who usually drink red but want something rich enough to feel substantial.";
    return "Lighter appetites, raw bar lovers, or anyone who wants a refreshing glass before the main course.";
  }
  if (wine.style === "red") {
    if (tannin >= 4) return "Serious steak guests who want a wine that can stand up to char, fat, and bold seasoning.";
    if (body <= 2) return "Guests who want red wine but are ordering fish — this one won't overpower the plate.";
    return "A dependable crowd-pleaser for guests who want red wine without a strong opinion on style.";
  }
  return "A flexible, food-friendly pour for most of the menu.";
}

function buildFaceHTML(wine, similar, idx) {
  if (idx === 0) {
    return `
      <p class="flip-label">1/3</p>
      <p class="face-title">Sell it</p>
      <p class="face-h3"><span class="ic">&#128172;</span> Guest description</p>
      <p class="face-desc">${wine.guestDescription}</p>
      <p class="face-h3"><span class="ic">&#10003;</span> Three selling points</p>
      ${wine.sellingPoints.map(p => `<div class="point-row"><span class="ic">&#10003;</span><span>${p}</span></div>`).join("")}
      <div class="arsenal-block">
        <p class="arsenal-label">Table-side line</p>
        <p class="arsenal-text">${wine.arsenal}</p>
      </div>
    `;
  } else if (idx === 1) {
    return `
      <p class="flip-label">2/3</p>
      <p class="face-title">Understand it</p>
      <p class="face-h3"><span class="ic">&#127866;</span> Winemaking note</p>
      <p class="face-desc" style="margin-bottom:14px;">${wine.winemakingNote}</p>
      <p class="face-h3"><span class="ic">&#127815;</span> Flavor profile</p>
      <div class="flavor-grid">${wine.flavorTags.map(t => `<div class="flavor-item"><div class="icon">${getFlavorIcon(t)}</div><p>${t}</p></div>`).join("")}</div>
      <p class="face-h3"><span class="ic">&#128202;</span> Structure</p>
      ${structureBars(wine.structure)}
      ${similar ? `<p class="back-line" style="margin-top:8px;"><b>Similar pour</b>${similar.name}</p>` : ""}
    `;
  } else {
    return `
      <p class="flip-label">3/3</p>
      <p class="face-title">Sommelier knowledge</p>
      <p class="face-h3"><span class="ic">&#10024;</span> Fun facts</p>
      <div class="fact-block"><p>${wine.funFact}</p></div>
      <div class="fact-block"><p>${wine.funFact2}</p></div>
      <p class="face-h3"><span class="ic">&#128214;</span> Short story</p>
      <p class="face-desc" style="margin-bottom:14px;">${wine.shortStory}</p>
      <p class="face-h3"><span class="ic">&#128278;</span> The moment</p>
      <p class="face-desc">${wine.moment}</p>
      <p class="face-h3"><span class="ic">&#128142;</span> The memory</p>
      <p class="face-desc">${wine.memory}</p>
    `;
  }
}

function renderFlipCard(wine) {
  const similar = wine.id.startsWith("hrw") ? similarHrwPour(wine) : wine.id.startsWith("bw") ? similarBottlePour(wine) : similarPour(wine);
  const flipcard = document.createElement("div");
  flipcard.className = "flipcard";
  const inner = document.createElement("div");
  inner.className = "flip-inner face-0";
  inner.innerHTML = buildFaceHTML(wine, similar, 0);
  flipcard.appendChild(inner);

  let faceIndex = 0;
  flipcard.onclick = () => {
    flipcard.classList.add("flipping");
    setTimeout(() => {
      faceIndex = (faceIndex + 1) % 3;
      inner.className = "flip-inner face-" + faceIndex;
      inner.innerHTML = buildFaceHTML(wine, similar, faceIndex);
      flipcard.classList.remove("flipping");
    }, 200);
  };

  return flipcard;
}

function similarPour(wine) {
  const sameStyle = WINES.filter(w => w.style === wine.style && w.id !== wine.id);
  if (!sameStyle.length) return null;
  return sameStyle[0];
}

function similarHrwPour(wine) {
  const sameStyle = HRW_WINES.filter(w => w.style === wine.style && w.id !== wine.id);
  if (!sameStyle.length) return null;
  return sameStyle[0];
}

function similarBottlePour(wine) {
  if (wine.subcategory) {
    const sameSubcategory = BOTTLE_WINES.filter(w => w.category === wine.category && w.subcategory === wine.subcategory && w.id !== wine.id);
    if (sameSubcategory.length) return sameSubcategory[0];
  }
  const sameCategory = BOTTLE_WINES.filter(w => w.category === wine.category && w.id !== wine.id);
  if (sameCategory.length) return sameCategory[0];
  const sameStyle = BOTTLE_WINES.filter(w => w.style === wine.style && w.id !== wine.id);
  if (!sameStyle.length) return null;
  return sameStyle[0];
}

const WSET_BANDS = {
  sweetness: ["Dry", "Off-Dry", "Medium-Dry", "Medium-Sweet", "Sweet"],
  acidity: ["Low", "Medium(-)", "Medium", "Medium(+)", "High"],
  tannin: ["Low", "Medium(-)", "Medium", "Medium(+)", "High"],
  alcohol: ["Low", "Medium(-)", "Medium", "Medium(+)", "High"],
  body: ["Light", "Medium(-)", "Medium", "Medium(+)", "Full"]
};

function structureBars(structure) {
  const order = ["sweetness", "acidity", "tannin", "alcohol", "body"];
  return order.map((key) => {
    const val = structure[key];
    if (key === "tannin" && val === 0) return "";
    const band = WSET_BANDS[key][val - 1] || WSET_BANDS[key][0];
    const width = val * 20;
    return `<div class="bar-block"><div class="bar-track"><div class="bar-fill" style="width:${width}%;"></div></div><p>${band} ${key === "sweetness" ? "" : key === "body" ? "Body" : key.charAt(0).toUpperCase() + key.slice(1)}</p></div>`;
  }).join("");
}

const FLAVOR_ICON_MAP = [
  [["berry", "currant", "plum", "cassis"], "\u{1F347}"],
  [["cherry", "strawberry", "raspberry", "cranberry"], "\u{1F352}"],
  [["citrus", "lemon", "lime", "zest", "yuzu", "bergamot"], "\u{1F34B}"],
  [["peach", "apple"], "\u{1F34F}"],
  [["tropical", "pineapple", "papaya", "dragon fruit"], "\u{1F34D}"],
  [["melon", "honeydew", "lychee", "pear"], "\u{1F348}"],
  [["flower", "honeysuckle", "violet", "floral", "lavender"], "\u{1F338}"],
  [["mocha", "cocoa", "chocolate", "coffee", "espresso", "roasted"], "\u2615"],
  [["oak", "cedar", "vanilla", "spice", "pepper", "whiskey", "bourbon", "malt", "bitters"], "\u{1FAB5}"],
  [["earth", "forest", "herb", "garrigue", "mineral", "stone", "flint", "tar", "savory", "basil", "mint", "matcha"], "\u{1F33F}"],
  [["brioche", "toast", "bread", "chalk"], "\u{1F950}"],
  [["honey"], "\u{1F36F}"],
  [["olive", "brin"], "\u{1FAD2}"],
  [["smoke"], "\u{1F525}"],
  [["agave"], "\u{1F335}"],
  [["ginger"], "\u{1FADA}"],
  [["sparkling", "bubbl"], "\u{1F942}"],
  [["sweet", "sugar"], "\u{1F36C}"],
  [["dry", "crisp", "silky", "bright"], "\u2744\uFE0F"]
];
function getFlavorIcon(tag) {
  const lower = tag.toLowerCase();
  for (const [keywords, icon] of FLAVOR_ICON_MAP) {
    if (keywords.some(k => lower.includes(k))) return icon;
  }
  return "\u{1F377}";
}

// SECTION_ICON_MAP now lives in config.js (per-restaurant configuration)
function getSectionIcon(section) { return SECTION_ICON_MAP[section] || "\u{1F37D}\uFE0F"; }

let activeTimer = null;

function render() {
  if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
  app.innerHTML = "";
  app.classList.toggle("home-view", current.view === "home");
  if (current.view === "home") renderHome();
  else if (current.view === "study-list") renderStudyList();
  else if (current.view === "study-card") renderStudyCard(current.params.wineId);
  else if (current.view === "hrw-list") renderHrwList();
  else if (current.view === "hrw-card") renderHrwCard(current.params.wineId);
  else if (current.view === "pairwf-list") renderPairWineFoodList();
  else if (current.view === "pairwf-detail") renderWineDetailWithPairing(current.params.wineId);
  else if (current.view === "pairfw-list") renderPairFoodWineList();
  else if (current.view === "menu-list") renderMenuList();
  else if (current.view === "dish-detail") renderDishDetail(current.params.dishId);
  else if (current.view === "pairing-explain") renderPairingExplain(current.params.wineId, current.params.dishId);
  else if (current.view === "test-me") renderTestMe();
  else if (current.view === "test-me-focus") renderTestMeFocus(current.params.mode);
  else if (current.view === "test-me-run") renderTestMeRun(current.params.mode);
  else if (current.view === "game-room") renderGameRoom();
  else if (current.view === "this-or-that") renderThisOrThat();
  else if (current.view === "this-or-that-focus") renderThisOrThatFocus();
  else if (current.view === "this-or-that-run") renderThisOrThatRun();
  else if (current.view === "imposter") renderImposterSetup();
  else if (current.view === "imposter-run") renderImposter();
  else if (current.view === "somm-says") renderSommSays();
  else if (current.view === "somm-says-run") renderSommSaysRun(current.params.seconds);
  else if (current.view === "match-it") renderMatchIt(current.params.matchType);
  else if (current.view === "match-it-picker") renderMatchItPicker();
  else if (current.view === "knockout") renderKnockout();
  else if (current.view === "knockout-run") renderKnockoutRun();
  else if (current.view === "allergy-sort") renderAllergyIntro();
  else if (current.view === "allergy-sort-run") renderAllergySortRun();
  else if (current.view === "cocktail-type") renderCocktailTypeChooser();
  else if (current.view === "cocktail-list") renderCocktailList();
  else if (current.view === "classic-cocktail-list") renderClassicCocktailList();
  else if (current.view === "cocktail-detail") renderCocktailDetail(current.params.cocktailId);
  else if (current.view === "wine-type") renderWineTypeChooser();
  else if (current.view === "wine-bottle-list") renderByTheBottleList();
  else if (current.view === "bottle-card") renderBottleCard(current.params.wineId);
  else if (current.view === "liquor-list") renderLiquorList();
  else if (current.view === "liquor-card") renderLiquorCard(current.params.liquorId);
  else if (current.view === "learning-hub") renderLearningHub();
  else if (current.view === "learning-intro") renderLearningIntro(current.params.moduleId);
  else if (current.view === "learning-chapter") renderLearningChapter(current.params.moduleId, current.params.chapterIndex, current.params.sectionIndex);
  else if (current.view === "learning-chapter-quiz") renderChapterQuiz(current.params.moduleId, current.params.chapterIndex, current.params.quizIndex);
  else if (current.view === "learning-pretest-video") renderLearningPreTestVideo(current.params.moduleId);
  else if (current.view === "learning-test-intro") renderLearningTestIntro(current.params.moduleId);
  else if (current.view === "learning-test") renderLearningTest(current.params.moduleId, current.params.index);
  else if (current.view === "learning-test-result") renderLearningTestResult(current.params.moduleId, current.params.correctCount, current.params.total, current.params.passed, current.params.wrongIndices);
  else if (current.view === "learning-complete") renderLearningComplete(current.params.moduleId);
  makeDivsKeyboardAccessible();
  window.scrollTo(0, 0);
}

function header(title, showBack = true, onBack = goBack) {
  const div = document.createElement("div");
  div.className = "app-header";
  div.innerHTML = `
    ${showBack ? `<button class="back-btn" aria-label="Back">&#8592;</button>` : ""}
    <p class="header-title">${title}</p>
  `;
  if (showBack) div.querySelector(".back-btn").onclick = onBack;
  app.appendChild(div);
}

/* In-app confirm modal -- used instead of the browser's native confirm(),
   which shows the raw origin URL and can't be styled to match the product. */
function showConfirm(message, confirmLabel, onConfirm) {
  const overlay = document.createElement("div");
  overlay.className = "confirm-overlay";
  overlay.innerHTML = `
    <div class="confirm-card">
      <p class="confirm-message">${message}</p>
      <div class="confirm-actions">
        <button type="button" class="confirm-cancel">Cancel</button>
        <button type="button" class="confirm-ok">${confirmLabel}</button>
      </div>
    </div>
  `;
  const close = () => overlay.remove();
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  overlay.querySelector(".confirm-cancel").onclick = close;
  overlay.querySelector(".confirm-ok").onclick = () => { close(); onConfirm(); };
  document.body.appendChild(overlay);
}

/* Device-local storage helpers (per-device, no accounts) */
const PROGRESS_KEY = "p131-progress";

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function setWineProgress(wineId, status) {
  const p = getProgress();
  p[wineId] = status;
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function resetProgress() {
  try { localStorage.removeItem(PROGRESS_KEY); } catch (e) {}
}

/* Confidence-Based Repetition (CBR) store for Test Me.
   Shape: { [itemId]: { rating: 1-5, lastSeen: <epoch ms> } }
   rating is the player's own 1-5 self-assessment after active recall,
   matching Brainscape's confidence scale (1 = "Not at all", 5 = "Totally
   confident"). lastSeen drives the staleness component of scheduling so
   a well-rated card still resurfaces occasionally instead of vanishing
   forever. This replaces the old learning/known binary in PROGRESS_KEY;
   see migrateProgressToConfidence() below for the one-time upgrade path. */
const CONFIDENCE_KEY = "p131-confidence";
const CONFIDENCE_MIGRATED_KEY = "p131-confidence-migrated";

function getConfidenceMap() {
  try { return JSON.parse(localStorage.getItem(CONFIDENCE_KEY)) || {}; } catch (e) { return {}; }
}
function getConfidence(itemId) {
  const map = getConfidenceMap();
  return map[itemId] || null;
}
function setConfidence(itemId, rating) {
  rating = Math.max(1, Math.min(5, Math.round(rating)));
  const map = getConfidenceMap();
  map[itemId] = { rating, lastSeen: Date.now() };
  try { localStorage.setItem(CONFIDENCE_KEY, JSON.stringify(map)); } catch (e) {}
  return map[itemId];
}
function resetConfidence() {
  try { localStorage.removeItem(CONFIDENCE_KEY); } catch (e) {}
}

/* One-time migration: old known/learning items become a sane starting
   confidence instead of reverting to "unseen." Runs once (guarded by
   CONFIDENCE_MIGRATED_KEY) so it never clobbers real CBR ratings entered
   after rollout. Old PROGRESS_KEY data is left in place, untouched --
   harmless, and lets a rollback still see the old known/learning state. */
function migrateProgressToConfidence() {
  try {
    if (localStorage.getItem(CONFIDENCE_MIGRATED_KEY)) return;
    const old = getProgress();
    const map = getConfidenceMap();
    Object.keys(old).forEach(itemId => {
      if (map[itemId]) return; // don't override anything already rated
      const status = old[itemId];
      if (status === "known") map[itemId] = { rating: 4, lastSeen: Date.now() };
      else if (status === "learning") map[itemId] = { rating: 2, lastSeen: Date.now() };
    });
    localStorage.setItem(CONFIDENCE_KEY, JSON.stringify(map));
    localStorage.setItem(CONFIDENCE_MIGRATED_KEY, "1");
  } catch (e) {}
}

/* Learning modules: dedicated progress store, keyed by module id.
   Shape: { [moduleId]: { furthest: <flat content index reached>, completed: <bool>, testFurthest: <index reached in the test> }
   This is the layer that will eventually get backed by the database
   instead of localStorage -- the render functions below only ever call
   these helpers, so swapping the storage later shouldn't require
   touching the views.

   Modules are organized as chapters (blocks of text/image/video content)
   followed by a single trailing test (quiz questions). "furthest" tracks
   position across the flattened chapter content only; the test has its
   own counter so leaving mid-test resumes there instead of at chapter 1. */
const LEARNING_PROGRESS_KEY = "p131-learning-progress";
function getLearningProgress() {
  try { return JSON.parse(localStorage.getItem(LEARNING_PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function setLearningFurthest(moduleId, sectionIndex) {
  const p = getLearningProgress();
  const cur = p[moduleId] || { furthest: -1, completed: false, testFurthest: -1 };
  cur.furthest = Math.max(cur.furthest, sectionIndex);
  p[moduleId] = cur;
  try { localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function getFinalTestAnswers(moduleId) {
  const p = getLearningProgress()[moduleId];
  return (p && p.finalTestAnswers) || {};
}
function setFinalTestAnswer(moduleId, questionIndex, chosenIndex) {
  const p = getLearningProgress();
  const cur = p[moduleId] || { furthest: -1, completed: false, testFurthest: -1 };
  cur.finalTestAnswers = cur.finalTestAnswers || {};
  cur.finalTestAnswers[questionIndex] = chosenIndex;
  p[moduleId] = cur;
  try { localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function clearFinalTestAnswers(moduleId) {
  const p = getLearningProgress();
  const cur = p[moduleId] || { furthest: -1, completed: false, testFurthest: -1 };
  cur.finalTestAnswers = {};
  cur.testFurthest = -1;
  p[moduleId] = cur;
  try { localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function setTestFurthest(moduleId, questionIndex) {
  const p = getLearningProgress();
  const cur = p[moduleId] || { furthest: -1, completed: false, testFurthest: -1 };
  cur.testFurthest = Math.max(cur.testFurthest ?? -1, questionIndex);
  p[moduleId] = cur;
  try { localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function markLearningComplete(moduleId) {
  const p = getLearningProgress();
  const cur = p[moduleId] || { furthest: -1, completed: false, testFurthest: -1 };
  const alreadyDone = cur.completed;
  cur.completed = true;
  p[moduleId] = cur;
  try { localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
  return !alreadyDone; // true the first time this module is finished
}
function isChapterQuizPassed(moduleId, chapterIndex) {
  const p = getLearningProgress()[moduleId];
  return !!(p && p.chapterQuizPassed && p.chapterQuizPassed[chapterIndex]);
}
function setChapterQuizPassed(moduleId, chapterIndex) {
  const p = getLearningProgress();
  const cur = p[moduleId] || { furthest: -1, completed: false, testFurthest: -1 };
  cur.chapterQuizPassed = cur.chapterQuizPassed || {};
  cur.chapterQuizPassed[chapterIndex] = true;
  p[moduleId] = cur;
  try { localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function isModuleUnlocked(mod) {
  if (!mod.unlockAfter) return true;
  const p = getLearningProgress();
  return !!(p[mod.unlockAfter] && p[mod.unlockAfter].completed);
}
function moduleStatus(mod) {
  if (!isModuleUnlocked(mod)) return "locked";
  const p = getLearningProgress()[mod.id];
  if (p && p.completed) return "completed";
  if (p && p.furthest > -1) return "in-progress";
  return "not-started";
}
function findLearningModule(id) { return LEARNING_MODULES.find(m => m.id === id); }

/* Final cumulative test must be passed at 100%. Two attempts allowed back to
   back; after a second failure the module locks for 10 minutes before a
   fresh pair of attempts is allowed again. State lives alongside the rest
   of the module's progress record so it resets cleanly per module. */
const FINAL_TEST_LOCKOUT_MS = 10 * 60 * 1000;
function getFinalTestState(moduleId) {
  const p = getLearningProgress()[moduleId];
  return (p && p.finalTest) || { attemptsUsed: 0, lockedUntil: null };
}
function setFinalTestState(moduleId, state) {
  const p = getLearningProgress();
  const cur = p[moduleId] || { furthest: -1, completed: false, testFurthest: -1 };
  cur.finalTest = state;
  p[moduleId] = cur;
  try { localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
function finalTestLockStatus(moduleId) {
  const state = getFinalTestState(moduleId);
  const now = Date.now();
  if (state.lockedUntil && now < state.lockedUntil) {
    return { locked: true, remainingMs: state.lockedUntil - now, state };
  }
  if (state.lockedUntil && now >= state.lockedUntil) {
    // cooldown has elapsed -- reset for a fresh pair of attempts
    const fresh = { attemptsUsed: 0, lockedUntil: null };
    setFinalTestState(moduleId, fresh);
    return { locked: false, remainingMs: 0, state: fresh };
  }
  return { locked: false, remainingMs: 0, state };
}
function recordFinalTestFailure(moduleId) {
  const state = getFinalTestState(moduleId);
  const attemptsUsed = (state.attemptsUsed || 0) + 1;
  const next = attemptsUsed >= 2
    ? { attemptsUsed, lockedUntil: Date.now() + FINAL_TEST_LOCKOUT_MS }
    : { attemptsUsed, lockedUntil: null };
  setFinalTestState(moduleId, next);
  return next;
}
function recordFinalTestPass(moduleId) {
  setFinalTestState(moduleId, { attemptsUsed: 0, lockedUntil: null });
}
function formatMmSs(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* Chapter/block helpers: a module's content lives in mod.chapters (each a
   block with its own sections), always followed by a single trailing
   mod.test (may be empty). These helpers flatten chapters for progress
   math without the views needing to know chapter boundaries directly. */
function moduleChapters(mod) { return mod.chapters || []; }
function flattenModuleContent(mod) {
  const flat = [];
  moduleChapters(mod).forEach((ch, ci) => {
    ch.sections.forEach((s, si) => flat.push({ chapterIndex: ci, sectionIndex: si }));
  });
  return flat;
}
function moduleTotalContent(mod) { return flattenModuleContent(mod).length; }
function resumeChapterPosition(mod) {
  const flat = flattenModuleContent(mod);
  if (!flat.length) return { chapterIndex: 0, sectionIndex: 0 };
  const p = getLearningProgress()[mod.id];
  const flatIndex = p ? Math.min(p.furthest + 1, flat.length - 1) : 0;
  return flat[Math.max(0, flatIndex)];
}

const REVIEW_STREAK_SEEN_KEY = "p131-review-streak-seen";
let reviewStreakPendingAnimation = null; // set once at load if this device hasn't seen the latest reset yet

function reviewStreakDays(startStr) {
  const start = new Date(startStr);
  const now = new Date();
  return Math.max(0, Math.floor((now - start) / 86400000));
}

// Runs once when the script loads. Compares this device's last-seen streak
// start against the deployed record. If they differ, a reset happened since
// this device last checked in, so it queues the extinguish animation for the
// next home render. There is no in-app way to change REVIEW_STREAK_RECORD.start
// yourself — it only changes when the owner asks Claude to update it.
(function checkReviewStreakReset() {
  let seenStart;
  try { seenStart = localStorage.getItem(REVIEW_STREAK_SEEN_KEY); } catch (e) { seenStart = null; }
  if (seenStart === null) {
    try { localStorage.setItem(REVIEW_STREAK_SEEN_KEY, REVIEW_STREAK_RECORD.start); } catch (e) {}
    return;
  }
  if (seenStart !== REVIEW_STREAK_RECORD.start) {
    reviewStreakPendingAnimation = {
      endedDays: typeof REVIEW_STREAK_RECORD.lastEndedDays === "number" ? REVIEW_STREAK_RECORD.lastEndedDays : null
    };
    try { localStorage.setItem(REVIEW_STREAK_SEEN_KEY, REVIEW_STREAK_RECORD.start); } catch (e) {}
  }
})();

function playStreakExtinguish(stripEl, onDone) {
  stripEl.style.position = "relative";
  stripEl.style.overflow = "visible";
  const main = stripEl.querySelector(".streak-main");
  const numEl = stripEl.querySelector(".streak-num");
  const labelEl = stripEl.querySelector(".streak-label");

  stripEl.classList.add("shaking");

  setTimeout(() => {
    if (main) main.classList.add("ashen-out");
    setTimeout(() => {
      if (numEl) numEl.textContent = "Extinguished";
      if (labelEl) labelEl.textContent = "Streak reset \u2014 back to zero";
      if (main) main.classList.remove("ashen-out");
      setTimeout(onDone, 650);
    }, 150);
  }, 650);
}

function wotdPool() {
  return WINES.concat(BOTTLE_WINES);
}

function wineOfTheDay() {
  const pool = wotdPool();
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  return pool[dayOfYear % pool.length];
}

function randomWine(excludeId) {
  const pool = wotdPool();
  if (pool.length <= 1) return pool[0];
  let pick;
  do {
    pick = pool[Math.floor(Math.random() * pool.length)];
  } while (pick.id === excludeId);
  return pick;
}


function renderHome() {
  const authedUser = getStoredAuth();
  const hero = document.createElement("div");
  hero.className = "home-hero";
  hero.innerHTML = `
    <div class="home-hero-plate">
      <div>
        <p class="home-title">${BRAND.fullName}</p>
        <p class="home-title-sub">Staff training</p>
      </div>
      <div class="home-account">
        ${authedUser ? `<p class="home-account-name">${authedUser.name || ""}</p>` : ""}
        <button type="button" class="home-logout-btn">Log out</button>
      </div>
    </div>
  `;
  hero.querySelector(".home-logout-btn").onclick = () => {
    showConfirm("Exit?", "Log out", () => {
      clearAuth();
      location.reload();
    });
  };
  app.appendChild(hero);

  const currentDays = reviewStreakDays(REVIEW_STREAK_RECORD.start);
  const bestDisplay = Math.max(REVIEW_STREAK_RECORD.best || 0, currentDays);
  const pending = reviewStreakPendingAnimation;
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const showAnimation = pending && pending.endedDays !== null && !reduceMotion;
  const initialDays = showAnimation ? pending.endedDays : currentDays;

  const streakStrip = document.createElement("div");
  streakStrip.className = "streak-strip";
  streakStrip.innerHTML = `
    <div class="streak-num-block">
      <p class="streak-num">${initialDays}</p>
      <p class="streak-num-lbl">${initialDays === 1 ? "Day" : "Days"}</p>
    </div>
    <div class="streak-main">
      <p class="streak-label">Since last 1-star review</p>
    </div>
    <span class="streak-best-pill">Best: ${bestDisplay}</span>
  `;
  app.appendChild(streakStrip);

  if (pending) reviewStreakPendingAnimation = null; // only ever plays once

  if (showAnimation) {
    setTimeout(() => {
      playStreakExtinguish(streakStrip, () => {
        const numEl = streakStrip.querySelector(".streak-num");
        const numLblEl = streakStrip.querySelector(".streak-num-lbl");
        const labelEl = streakStrip.querySelector(".streak-label");
        if (numEl) numEl.textContent = `${currentDays}`;
        if (numLblEl) numLblEl.textContent = currentDays === 1 ? "Day" : "Days";
        if (labelEl) labelEl.textContent = "Since last 1-star review";
        streakStrip.classList.remove("shaking");
      });
    }, 500);
  }

  const wotd = wineOfTheDay();
  let currentWotd = wotd;
  let wotdSpinning = false;
  const wotdStrip = document.createElement("div");
  wotdStrip.className = "wotd-strip";
  wotdStrip.innerHTML = `
    <div class="wotd-main">
      <p class="wotd-label">Wine of the day</p>
      <p class="wotd-name">${wotd.name}</p>
    </div>
    <button class="wotd-shuffle" aria-label="Shuffle to a random wine">Shuffle</button>
  `;
  const wotdNameEl = wotdStrip.querySelector(".wotd-name");
  const wotdMainEl = wotdStrip.querySelector(".wotd-main");
  const wotdShuffleBtn = wotdStrip.querySelector(".wotd-shuffle");

  wotdMainEl.onclick = () => {
    if (wotdSpinning) return;
    const route = currentWotd.id.startsWith("bw") ? "bottle-card" : "study-card";
    go(route, { wineId: currentWotd.id });
  };

  wotdShuffleBtn.onclick = (e) => {
    e.stopPropagation();
    if (wotdSpinning) return;

    const next = randomWine(currentWotd.id);
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      currentWotd = next;
      wotdNameEl.textContent = currentWotd.name;
      return;
    }

    wotdSpinning = true;
    wotdShuffleBtn.disabled = true;
    const pool = wotdPool();
    const totalDuration = 2000;
    const startTime = performance.now();
    let lastTick = -Infinity;

    function playReelTick(durationMs) {
      wotdNameEl.classList.remove("reel-tick");
      void wotdNameEl.offsetWidth; // force reflow so the animation restarts on every tick
      wotdNameEl.style.animationDuration = durationMs + "ms";
      wotdNameEl.classList.add("reel-tick");
    }

    function tick(now) {
      const elapsed = now - startTime;
      if (elapsed >= totalDuration) {
        currentWotd = next;
        wotdNameEl.textContent = currentWotd.name;
        playReelTick(220);
        wotdShuffleBtn.disabled = false;
        wotdSpinning = false;
        return;
      }
      const progress = elapsed / totalDuration;
      const interval = 90 + Math.pow(progress, 2.4) * 340;
      if (now - lastTick >= interval) {
        lastTick = now;
        wotdNameEl.textContent = pool[Math.floor(Math.random() * pool.length)].name;
        playReelTick(Math.min(interval, 260));
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  app.appendChild(wotdStrip);

  const options = document.createElement("div");
  options.className = "home-grid";
  options.innerHTML = `
    <div class="home-card" data-go="menu">
      <span class="nav-idx">01</span>
      <p class="home-card-title">Food</p>
      <span class="home-card-sub">Full menu</span>
    </div>
    <div class="home-card" data-go="wine">
      <span class="nav-idx">02</span>
      <p class="home-card-title">Wine</p>
      <span class="home-card-sub">Glass, bottle &amp; pairing</span>
    </div>
    <div class="home-card" data-go="bar">
      <span class="nav-idx">03</span>
      <p class="home-card-title">Bar</p>
      <span class="home-card-sub">Cocktails &amp; back bar</span>
    </div>
    <div class="home-card home-card-play" data-go="gameroom">
      <span class="nav-idx">04</span>
      <span class="home-card-tag">Play</span>
      <p class="home-card-title">Game Room</p>
      <span class="home-card-sub">Quiz, match, judgment calls</span>
    </div>
  `;
  options.querySelector('[data-go="wine"]').onclick = () => go("wine-type");
  options.querySelector('[data-go="bar"]').onclick = () => go("cocktail-type");
  options.querySelector('[data-go="menu"]').onclick = () => go("menu-list");
  options.querySelector('[data-go="gameroom"]').onclick = () => go("game-room");
  app.appendChild(options);

  const learningCard = document.createElement("div");
  learningCard.className = "home-card learning-card";
  learningCard.innerHTML = `
    <span class="nav-idx">05</span>
    <span class="home-card-tag">New</span>
    <p class="home-card-title">Learning</p>
    <span class="home-card-sub">Modules &amp; courses</span>
  `;
  learningCard.onclick = () => go("learning-hub");
  app.appendChild(learningCard);
}

function renderSearchableWineList(onSelect, placeholder, wineSource) {
  const source = wineSource || WINES;
  const wrap = document.createElement("div");
  const input = document.createElement("input");
  input.className = "search-input";
  input.placeholder = placeholder || "Search wines";
  wrap.appendChild(input);

  const listWrap = document.createElement("div");
  wrap.appendChild(listWrap);

  function draw(filter) {
    listWrap.innerHTML = "";
    const filtered = source.filter(w => w.name.toLowerCase().includes(filter.toLowerCase()));
    const groups = groupByStyle(filtered);
    STYLE_ORDER.forEach(style => {
      const wines = groups[style];
      if (!wines.length) return;
      const label = document.createElement("p");
      label.className = "section-label";
      label.textContent = STYLE_LABELS[style];
      listWrap.appendChild(label);
      wines.forEach(w => {
        const row = document.createElement("div");
        row.className = "list-row";
        const priceHtml = typeof w.price === "number" ? `<span class="list-row-price">$${w.price}</span>` : "";
        row.innerHTML = `<span class="list-row-main"><span class="style-dot ${w.style}"></span>${w.name}</span>${priceHtml}`;
        row.onclick = () => onSelect(w.id);
        listWrap.appendChild(row);
      });
    });
    if (!filtered.length) {
      listWrap.innerHTML = `<p class="empty-note">No wines match that search.</p>`;
    }
  }
  draw("");
  input.oninput = () => draw(input.value);
  return wrap;
}

function renderWineTypeChooser() {
  header("Wine");

  const options = document.createElement("div");
  options.className = "home-options";
  options.innerHTML = `
    <div class="home-option" data-go="hrw">
      <div class="home-icon-circle">&#127881;</div>
      <div class="home-option-text"><p>HRW Wine Selections</p><span>Houston Restaurant Weeks list</span></div>
    </div>
    <div class="home-option" data-go="glass">
      <div class="home-icon-circle">&#127863;</div>
      <div class="home-option-text"><p>By The Glass</p><span>Learn the full BTG list</span></div>
    </div>
    <div class="home-option" data-go="bottle">
      <div class="home-icon-circle">&#127866;</div>
      <div class="home-option-text"><p>By The Bottle</p><span>The full bottle list</span></div>
    </div>
    <div class="home-option" data-go="pairwf">
      <div class="home-icon-circle">&#127815;</div>
      <div class="home-option-text"><p>Pair Wine with Food</p><span>Start from the bottle</span></div>
    </div>
    <div class="home-option" data-go="pairfw">
      <div class="home-icon-circle">&#127860;</div>
      <div class="home-option-text"><p>Pair Food with Wine</p><span>Start from the dish</span></div>
    </div>
  `;
  options.querySelector('[data-go="hrw"]').onclick = () => go("hrw-list");
  options.querySelector('[data-go="glass"]').onclick = () => go("study-list");
  options.querySelector('[data-go="bottle"]').onclick = () => go("wine-bottle-list");
  options.querySelector('[data-go="pairwf"]').onclick = () => go("pairwf-list");
  options.querySelector('[data-go="pairfw"]').onclick = () => go("pairfw-list");
  app.appendChild(options);
}

function groupByBottleCategory(wines) {
  const groups = {};
  BOTTLE_CATEGORY_ORDER.forEach(c => groups[c] = []);
  wines.forEach(w => { if (groups[w.category]) groups[w.category].push(w); });
  return groups;
}

function renderByTheBottleList() {
  header("By The Bottle");
  if (!BOTTLE_WINES.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.style.padding = "40px 0";
    empty.textContent = "The bottle list hasn't been added yet.";
    app.appendChild(empty);
    return;
  }

  const wrap = document.createElement("div");
  const input = document.createElement("input");
  input.className = "search-input";
  input.placeholder = "Search the bottle list";
  wrap.appendChild(input);

  const listWrap = document.createElement("div");
  wrap.appendChild(listWrap);

  const manualExpanded = new Set();

  function draw(filter) {
    listWrap.innerHTML = "";
    const filtered = BOTTLE_WINES.filter(w => w.name.toLowerCase().includes(filter.toLowerCase()));
    const hasActiveFilter = filter.trim().length > 0;
    const groups = groupByBottleCategory(filtered);

    function appendWineRow(w) {
      const row = document.createElement("div");
      row.className = "list-row";
      const priceHtml = typeof w.price === "number" ? `<span class="list-row-price">$${w.price}</span>` : "";
      row.innerHTML = `<span class="list-row-main">${w.name}</span>${priceHtml}`;
      row.onclick = () => go("bottle-card", { wineId: w.id });
      listWrap.appendChild(row);
    }

    BOTTLE_CATEGORY_ORDER.forEach(category => {
      const wines = groups[category];
      if (!wines.length) return;

      const isExpanded = hasActiveFilter || manualExpanded.has(category);

      const label = document.createElement("button");
      label.className = "section-label section-toggle";
      label.innerHTML = `<span>${category} &middot; ${wines.length}</span><span class="section-chevron">${isExpanded ? "\u25BE" : "\u25B8"}</span>`;
      label.onclick = () => {
        if (hasActiveFilter) return;
        if (manualExpanded.has(category)) manualExpanded.delete(category);
        else manualExpanded.add(category);
        draw(input.value);
      };
      listWrap.appendChild(label);

      if (!isExpanded) return;

      const subOrder = BOTTLE_SUBCATEGORY_ORDER[category];
      if (subOrder) {
        subOrder.forEach(sub => {
          const subWines = wines.filter(w => w.subcategory === sub);
          if (!subWines.length) return;
          const subLabel = document.createElement("p");
          subLabel.className = "section-label";
          subLabel.textContent = sub;
          listWrap.appendChild(subLabel);
          subWines.forEach(appendWineRow);
        });
        wines.filter(w => !subOrder.includes(w.subcategory)).forEach(appendWineRow);
      } else {
        wines.forEach(appendWineRow);
      }
    });

    if (!filtered.length) {
      listWrap.innerHTML = `<p class="empty-note">No wines match that search.</p>`;
    }
  }
  draw("");
  input.oninput = () => draw(input.value);
  app.appendChild(wrap);
}

function renderBottleCard(wineId) {
  const wine = BOTTLE_WINES.find(w => w.id === wineId) || BOTTLE_WINES[0];
  const idx = BOTTLE_WINES.findIndex(w => w.id === wine.id);

  header("By The Bottle");
  app.appendChild(renderNavChips(wine.id, (id) => go("bottle-card", { wineId: id }, false), BOTTLE_WINES));
  app.appendChild(renderWineCardBody(wine));

  const footerNav = document.createElement("div");
  footerNav.className = "card-footer-nav";

  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "\u2190 Back";
  backBtn.disabled = idx === 0;
  backBtn.onclick = () => go("bottle-card", { wineId: BOTTLE_WINES[idx - 1].id }, false);

  const homeBtn = document.createElement("button");
  homeBtn.className = "footer-btn footer-btn-home";
  homeBtn.textContent = "Home";
  homeBtn.onclick = () => go("home", {});

  const nextBtn = document.createElement("button");
  nextBtn.className = "footer-btn";
  nextBtn.textContent = "Next \u2192";
  nextBtn.disabled = idx === BOTTLE_WINES.length - 1;
  nextBtn.onclick = () => go("bottle-card", { wineId: BOTTLE_WINES[idx + 1].id }, false);

  footerNav.appendChild(backBtn);
  footerNav.appendChild(homeBtn);
  footerNav.appendChild(nextBtn);
  app.appendChild(footerNav);

  let touchStartX = null;
  app.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { once: true });
  app.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      const nextIdx = dx < 0 ? Math.min(idx + 1, BOTTLE_WINES.length - 1) : Math.max(idx - 1, 0);
      go("bottle-card", { wineId: BOTTLE_WINES[nextIdx].id }, false);
    }
  }, { once: true });
}

function renderStudyList() {
  header("By The Glass");
  app.appendChild(renderSearchableWineList(
    (wineId) => go("study-card", { wineId }),
    "Search wines"
  ));
}

function renderHrwList() {
  header("HRW Wine Selections");
  app.appendChild(renderSearchableWineList(
    (wineId) => go("hrw-card", { wineId }),
    "Search HRW wines",
    HRW_WINES
  ));
}

function renderHrwCard(wineId) {
  const wine = HRW_WINES.find(w => w.id === wineId) || HRW_WINES[0];
  const idx = HRW_WINES.findIndex(w => w.id === wine.id);

  header("HRW Wine Selections");
  app.appendChild(renderNavChips(wine.id, (id) => go("hrw-card", { wineId: id }, false), HRW_WINES));
  app.appendChild(renderWineCardBody(wine));

  const footerNav = document.createElement("div");
  footerNav.className = "card-footer-nav";

  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "\u2190 Back";
  backBtn.disabled = idx === 0;
  backBtn.onclick = () => go("hrw-card", { wineId: HRW_WINES[idx - 1].id }, false);

  const homeBtn = document.createElement("button");
  homeBtn.className = "footer-btn footer-btn-home";
  homeBtn.textContent = "Home";
  homeBtn.onclick = () => go("home", {});

  const nextBtn = document.createElement("button");
  nextBtn.className = "footer-btn";
  nextBtn.textContent = "Next \u2192";
  nextBtn.disabled = idx === HRW_WINES.length - 1;
  nextBtn.onclick = () => go("hrw-card", { wineId: HRW_WINES[idx + 1].id }, false);

  footerNav.appendChild(backBtn);
  footerNav.appendChild(homeBtn);
  footerNav.appendChild(nextBtn);
  app.appendChild(footerNav);

  let touchStartX = null;
  app.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { once: true });
  app.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      const nextIdx = dx < 0 ? Math.min(idx + 1, HRW_WINES.length - 1) : Math.max(idx - 1, 0);
      go("hrw-card", { wineId: HRW_WINES[nextIdx].id }, false);
    }
  }, { once: true });
}

function renderPairWineFoodList() {
  header("Pair wine &#8594; food");
  app.appendChild(renderSearchableWineList(
    (wineId) => go("pairwf-detail", { wineId }),
    "Search a wine"
  ));
}

function renderDishList(headerTitle, searchPlaceholder, showAllergenFilter) {
  header(headerTitle);
  const wrap = document.createElement("div");
  const input = document.createElement("input");
  input.className = "search-input";
  input.placeholder = searchPlaceholder;
  wrap.appendChild(input);

  let excludedAllergens = [];
  if (showAllergenFilter) {
    const allAllergens = [...new Set(DISHES.flatMap(d => d.allergensInRecipe || []))].sort();
    const filterLabel = document.createElement("p");
    filterLabel.className = "allergen-group-label";
    filterLabel.style.marginTop = "4px";
    filterLabel.textContent = "Hide dishes containing:";
    wrap.appendChild(filterLabel);
    const filterRow = document.createElement("div");
    filterRow.className = "allergen-row";
    allAllergens.forEach(a => {
      const chip = document.createElement("button");
      chip.className = "chip removable allergen-filter-chip";
      chip.textContent = a.charAt(0).toUpperCase() + a.slice(1);
      chip.onclick = () => {
        if (excludedAllergens.includes(a)) {
          excludedAllergens = excludedAllergens.filter(x => x !== a);
          chip.classList.remove("filter-active");
        } else {
          excludedAllergens.push(a);
          chip.classList.add("filter-active");
        }
        draw(input.value);
      };
      filterRow.appendChild(chip);
    });
    wrap.appendChild(filterRow);
  }

  const listWrap = document.createElement("div");
  wrap.appendChild(listWrap);

  const manualExpanded = new Set();

  function draw(filter) {
    listWrap.innerHTML = "";
    let filtered = DISHES.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()));
    if (excludedAllergens.length) {
      filtered = filtered.filter(d => {
        const has = d.allergensInRecipe || [];
        return !excludedAllergens.some(a => has.includes(a));
      });
    }
    const hasActiveFilter = excludedAllergens.length > 0 || filter.trim().length > 0;
    const groups = groupBySection(filtered);
    SECTION_ORDER.forEach(section => {
      const dishes = groups[section];
      if (!dishes.length) return;

      const isExpanded = hasActiveFilter || manualExpanded.has(section);

      const label = document.createElement("button");
      label.className = "section-label section-toggle";
      label.innerHTML = `<span>${section}</span><span class="section-chevron">${isExpanded ? "\u25BE" : "\u25B8"}</span>`;
      label.onclick = () => {
        if (hasActiveFilter) return;
        if (manualExpanded.has(section)) manualExpanded.delete(section);
        else manualExpanded.add(section);
        draw(input.value);
      };
      listWrap.appendChild(label);

      if (!isExpanded) return;

      dishes.forEach(d => {
        const row = document.createElement("div");
        row.className = "list-row";
        row.innerHTML = `<span class="list-row-main"><span class="dish-icon">${getSectionIcon(d.section)}</span>${d.name}</span>`;
        row.onclick = () => go("dish-detail", { dishId: d.id });
        listWrap.appendChild(row);
      });
    });
    if (!filtered.length) {
      listWrap.innerHTML = `<p class="empty-note">No dishes match that search.</p>`;
    }
  }
  draw("");
  input.oninput = () => draw(input.value);
  app.appendChild(wrap);
}

function renderPairFoodWineList() {
  renderDishList("Pair food &#8594; wine", "Search a dish");
}

function renderMenuList() {
  renderDishList("Food menu", "Search the menu", true);
}

function renderCocktailTypeChooser() {
  header("Bar");

  const options = document.createElement("div");
  options.className = "home-options";
  options.innerHTML = `
    <div class="home-option" data-go="house">
      <div class="home-icon-circle">&#127864;</div>
      <div class="home-option-text"><p>House Cocktails</p><span>Prime 131's own recipe book</span></div>
    </div>
    <div class="home-option" data-go="classic">
      <div class="home-icon-circle">&#127865;</div>
      <div class="home-option-text"><p>Classic Cocktails</p><span>Timeless recipes, by base spirit</span></div>
    </div>
    <div class="home-option" data-go="liquor">
      <div class="home-icon-circle">&#127866;</div>
      <div class="home-option-text"><p>Liquor</p><span>The back bar, by category</span></div>
    </div>
  `;
  options.querySelector('[data-go="house"]').onclick = () => go("cocktail-list");
  options.querySelector('[data-go="classic"]').onclick = () => go("classic-cocktail-list");
  options.querySelector('[data-go="liquor"]').onclick = () => go("liquor-list");
  app.appendChild(options);
}

const LIQUOR_STRUCTURE_BANDS = {
  sweetness: ["Bone Dry", "Dry", "Medium", "Sweet", "Very Sweet"],
  smoke: ["None", "Faint", "Light", "Noticeable", "Heavy"],
  spice: ["Mellow", "Light", "Medium", "Peppery", "Fiery"],
  body: ["Light", "Medium(-)", "Medium", "Medium(+)", "Full"],
  finish: ["Short", "Medium(-)", "Medium", "Medium(+)", "Long"]
};

function liquorStructureBars(structure) {
  const order = ["sweetness", "smoke", "spice", "body", "finish"];
  return order.map((key) => {
    const val = structure[key];
    if (!val) return "";
    const band = LIQUOR_STRUCTURE_BANDS[key][val - 1] || LIQUOR_STRUCTURE_BANDS[key][0];
    const width = val * 20;
    return `<div class="bar-block"><div class="bar-track"><div class="bar-fill" style="width:${width}%;"></div></div><p>${band} ${key.charAt(0).toUpperCase() + key.slice(1)}</p></div>`;
  }).join("");
}

function buildLiquorFaceHTML(l, idx) {
  const hasSellContent = l.guestDescription || (l.sellingPoints && l.sellingPoints.length) || l.arsenal;
  const hasUnderstandContent = l.distillingNote || (l.flavorTags && l.flavorTags.length) || l.structure;
  const hasKnowledgeContent = l.funFact || l.funFact2 || l.shortStory || l.moment || l.memory;

  if (idx === 0) {
    if (!hasSellContent) return `<p class="flip-label">1/3</p><p class="face-title">Sell it</p><p class="empty-note" style="text-align:left;font-style:italic;">Details coming soon.</p>`;
    return `
      <p class="flip-label">1/3</p>
      <p class="face-title">Sell it</p>
      ${l.guestDescription ? `<p class="face-h3"><span class="ic">&#128172;</span> Guest description</p><p class="face-desc">${l.guestDescription}</p>` : ""}
      ${l.sellingPoints && l.sellingPoints.length ? `<p class="face-h3"><span class="ic">&#10003;</span> Selling points</p>${l.sellingPoints.map(p => `<div class="point-row"><span class="ic">&#10003;</span><span>${p}</span></div>`).join("")}` : ""}
      ${l.arsenal ? `<div class="arsenal-block"><p class="arsenal-label">Table-side line</p><p class="arsenal-text">${l.arsenal}</p></div>` : ""}
    `;
  } else if (idx === 1) {
    if (!hasUnderstandContent) return `<p class="flip-label">2/3</p><p class="face-title">Understand it</p><p class="empty-note" style="text-align:left;font-style:italic;">Details coming soon.</p>`;
    return `
      <p class="flip-label">2/3</p>
      <p class="face-title">Understand it</p>
      ${l.mashBill ? `<p class="face-h3"><span class="ic">&#127806;</span> Mash bill</p><p class="face-desc" style="margin-bottom:14px;">${l.mashBill}</p>` : ""}
      ${l.distillingNote ? `<p class="face-h3"><span class="ic">&#127866;</span> Distilling note</p><p class="face-desc" style="margin-bottom:14px;">${l.distillingNote}</p>` : ""}
      ${l.flavorTags && l.flavorTags.length ? `<p class="face-h3"><span class="ic">&#127815;</span> Flavor profile</p><div class="flavor-grid">${l.flavorTags.map(t => `<div class="flavor-item"><div class="icon">${getFlavorIcon(t)}</div><p>${t}</p></div>`).join("")}</div>` : ""}
      ${l.structure ? `<p class="face-h3"><span class="ic">&#128202;</span> Structure</p>${liquorStructureBars(l.structure)}` : ""}
    `;
  } else {
    if (!hasKnowledgeContent) return `<p class="flip-label">3/3</p><p class="face-title">Sommelier knowledge</p><p class="empty-note" style="text-align:left;font-style:italic;">Details coming soon.</p>`;
    return `
      <p class="flip-label">3/3</p>
      <p class="face-title">Sommelier knowledge</p>
      ${l.funFact || l.funFact2 ? `<p class="face-h3"><span class="ic">&#10024;</span> Fun facts</p>${l.funFact ? `<div class="fact-block"><p>${l.funFact}</p></div>` : ""}${l.funFact2 ? `<div class="fact-block"><p>${l.funFact2}</p></div>` : ""}` : ""}
      ${l.shortStory ? `<p class="face-h3"><span class="ic">&#128214;</span> Short story</p><p class="face-desc" style="margin-bottom:14px;">${l.shortStory}</p>` : ""}
      ${l.moment ? `<p class="face-h3"><span class="ic">&#128278;</span> The moment</p><p class="face-desc">${l.moment}</p>` : ""}
      ${l.memory ? `<p class="face-h3"><span class="ic">&#128142;</span> The memory</p><p class="face-desc">${l.memory}</p>` : ""}
    `;
  }
}

function renderLiquorFlipCard(l) {
  const flipcard = document.createElement("div");
  flipcard.className = "flipcard";
  const inner = document.createElement("div");
  inner.className = "flip-inner face-0";
  inner.innerHTML = buildLiquorFaceHTML(l, 0);
  flipcard.appendChild(inner);

  let faceIndex = 0;
  flipcard.onclick = () => {
    flipcard.classList.add("flipping");
    setTimeout(() => {
      faceIndex = (faceIndex + 1) % 3;
      inner.className = "flip-inner face-" + faceIndex;
      inner.innerHTML = buildLiquorFaceHTML(l, faceIndex);
      flipcard.classList.remove("flipping");
    }, 200);
  };

  return flipcard;
}

function liquorPriceLabel(l) {
  if (typeof l.price === "number") return `$${l.price}`;
  if (l.priceRange) return `$${l.priceRange}`;
  return "";
}

function renderLiquorList() {
  header("Liquor");
  const wrap = document.createElement("div");
  const input = document.createElement("input");
  input.className = "search-input";
  input.placeholder = "Search the back bar";
  wrap.appendChild(input);
  const listWrap = document.createElement("div");
  wrap.appendChild(listWrap);

  const manualExpanded = new Set();

  function appendLiquorRow(l, category) {
    const row = document.createElement("div");
    row.className = "list-row";
    const priceHtml = liquorPriceLabel(l) ? `<span class="list-row-price">${liquorPriceLabel(l)}</span>` : "";
    const allocFlag = l.allocation ? `<span class="dish-icon" title="Rotating supplier allocation — ask your server">*</span>` : "";
    row.innerHTML = `<span class="list-row-main"><span class="dish-icon">${SPIRIT_ICON_MAP[category] || "\u{1F943}"}</span>${l.name}${allocFlag}</span>${priceHtml}`;
    row.onclick = () => go("liquor-card", { liquorId: l.id });
    listWrap.appendChild(row);
  }

  function draw(filter) {
    listWrap.innerHTML = "";
    const filterLower = filter.toLowerCase();
    const hasActiveFilter = filterLower.trim().length > 0;

    SPIRIT_ORDER.forEach(category => {
      const items = LIQUOR.filter(l => l.category === category && l.name.toLowerCase().includes(filterLower))
        .sort((a, b) => a.name.localeCompare(b.name));
      if (hasActiveFilter && !items.length) return;

      const isExpanded = hasActiveFilter || manualExpanded.has(category);

      const label = document.createElement("button");
      label.className = "section-label section-toggle";
      label.innerHTML = `<span>${category}${items.length ? " &middot; " + items.length : ""}</span><span class="section-chevron">${isExpanded ? "\u25BE" : "\u25B8"}</span>`;
      label.onclick = () => {
        if (hasActiveFilter) return;
        if (manualExpanded.has(category)) manualExpanded.delete(category);
        else manualExpanded.add(category);
        draw(input.value);
      };
      listWrap.appendChild(label);

      if (!isExpanded) return;

      if (!items.length) {
        const empty = document.createElement("p");
        empty.className = "empty-note";
        empty.style.textAlign = "left";
        empty.style.fontStyle = "italic";
        empty.textContent = "No bottles added yet.";
        listWrap.appendChild(empty);
        return;
      }

      const subOrder = LIQUOR_SUBCATEGORY_ORDER[category];
      if (subOrder) {
        subOrder.forEach(sub => {
          const subItems = items.filter(l => l.subcategory === sub);
          if (!subItems.length) return;
          const subLabel = document.createElement("p");
          subLabel.className = "section-label";
          subLabel.textContent = sub;
          listWrap.appendChild(subLabel);
          subItems.forEach(l => appendLiquorRow(l, category));
        });
        items.filter(l => !subOrder.includes(l.subcategory)).forEach(l => appendLiquorRow(l, category));
      } else {
        items.forEach(l => appendLiquorRow(l, category));
      }
    });

    if (!listWrap.children.length) {
      listWrap.innerHTML = `<p class="empty-note">No bottles match that search.</p>`;
    }
  }
  draw("");
  input.oninput = () => draw(input.value);
  app.appendChild(wrap);
}

function renderLiquorCard(liquorId) {
  const l = LIQUOR.find(item => item.id === liquorId) || LIQUOR[0];
  const idx = LIQUOR.findIndex(item => item.id === l.id);

  header("Liquor");

  const container = document.createElement("div");

  const heroName = document.createElement("p");
  heroName.className = "hero-name";
  heroName.textContent = l.name;
  container.appendChild(heroName);

  if (l.subcategory) {
    const meta1 = document.createElement("p");
    meta1.className = "hero-meta";
    meta1.textContent = l.subcategory;
    container.appendChild(meta1);
  }

  if (l.region) {
    const meta2 = document.createElement("p");
    meta2.className = "hero-meta";
    meta2.textContent = l.region;
    container.appendChild(meta2);
  }

  if (l.allocation) {
    const meta3 = document.createElement("p");
    meta3.className = "hero-meta strong";
    meta3.textContent = "Rotating supplier allocation — ask your server for today's availability.";
    container.appendChild(meta3);
  }

  if (l.producer) {
    const meta4 = document.createElement("p");
    meta4.className = "hero-meta strong";
    meta4.textContent = "Producer: " + l.producer;
    container.appendChild(meta4);
  }

  const priceLabel = liquorPriceLabel(l);
  if (priceLabel) {
    const priceTag = document.createElement("p");
    priceTag.className = "hero-price";
    priceTag.innerHTML = `<span class="hero-price-amount">${priceLabel}</span>`;
    container.appendChild(priceTag);
  }

  // Phase B: sourced content (facts, flavor, structure, story). Items not
  // yet enriched fall back to an honest empty state per face, same
  // discipline as Dessert Wines elsewhere in the app -- nothing invented.
  container.appendChild(renderLiquorFlipCard(l));

  app.appendChild(container);

  const footerNav = document.createElement("div");
  footerNav.className = "card-footer-nav";

  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "\u2190 Back";
  backBtn.disabled = idx === 0;
  backBtn.onclick = () => go("liquor-card", { liquorId: LIQUOR[idx - 1].id }, false);

  const homeBtn = document.createElement("button");
  homeBtn.className = "footer-btn footer-btn-home";
  homeBtn.textContent = "Home";
  homeBtn.onclick = () => go("home", {});

  const nextBtn = document.createElement("button");
  nextBtn.className = "footer-btn";
  nextBtn.textContent = "Next \u2192";
  nextBtn.disabled = idx === LIQUOR.length - 1;
  nextBtn.onclick = () => go("liquor-card", { liquorId: LIQUOR[idx + 1].id }, false);

  footerNav.appendChild(backBtn);
  footerNav.appendChild(homeBtn);
  footerNav.appendChild(nextBtn);
  app.appendChild(footerNav);

  let touchStartX = null;
  app.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { once: true });
  app.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      const nextIdx = dx < 0 ? Math.min(idx + 1, LIQUOR.length - 1) : Math.max(idx - 1, 0);
      go("liquor-card", { liquorId: LIQUOR[nextIdx].id }, false);
    }
  }, { once: true });
}

// SPIRIT_ORDER and SPIRIT_ICON_MAP now live in config.js (per-restaurant configuration)

function renderClassicCocktailList() {
  header("Classic Cocktails");
  const wrap = document.createElement("div");
  const input = document.createElement("input");
  input.className = "search-input";
  input.placeholder = "Search classic cocktails";
  wrap.appendChild(input);
  const listWrap = document.createElement("div");
  wrap.appendChild(listWrap);

  function draw(filter) {
    listWrap.innerHTML = "";
    const filtered = CLASSIC_COCKTAILS.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
    SPIRIT_ORDER.forEach(spirit => {
      const group = filtered.filter(c => c.spirit === spirit);
      if (!group.length) return;
      const label = document.createElement("p");
      label.className = "section-label";
      label.textContent = spirit;
      listWrap.appendChild(label);
      group.forEach(c => {
        const row = document.createElement("div");
        row.className = "list-row";
        row.innerHTML = `<span class="list-row-main"><span class="dish-icon">${SPIRIT_ICON_MAP[spirit] || "\u{1F378}"}</span>${c.name}</span>`;
        row.onclick = () => go("cocktail-detail", { cocktailId: c.id });
        listWrap.appendChild(row);
      });
    });
    if (!filtered.length) {
      listWrap.innerHTML = `<p class="empty-note">No cocktails match that search.</p>`;
    }
  }
  draw("");
  input.oninput = () => draw(input.value);
  app.appendChild(wrap);
}

function renderCocktailList() {
  header("House Cocktails");
  const wrap = document.createElement("div");
  const input = document.createElement("input");
  input.className = "search-input";
  input.placeholder = "Search cocktails";
  wrap.appendChild(input);
  const listWrap = document.createElement("div");
  wrap.appendChild(listWrap);

  function draw(filter) {
    listWrap.innerHTML = "";
    const filtered = COCKTAILS.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
    filtered.forEach(c => {
      const row = document.createElement("div");
      row.className = "list-row";
      row.innerHTML = `<span class="list-row-main"><span class="dish-icon">&#127864;</span>${c.name}</span>`;
      row.onclick = () => go("cocktail-detail", { cocktailId: c.id });
      listWrap.appendChild(row);
    });
    if (!filtered.length) {
      listWrap.innerHTML = `<p class="empty-note">No cocktails match that search.</p>`;
    }
  }
  draw("");
  input.oninput = () => draw(input.value);
  app.appendChild(wrap);
}

function findCocktail(id) { return COCKTAILS.find(c => c.id === id) || CLASSIC_COCKTAILS.find(c => c.id === id); }

function renderCocktailDetail(cocktailId) {
  const cocktail = findCocktail(cocktailId);
  if (!cocktail) { go("cocktail-list", {}, false); return; }

  header("Cocktails");

  const container = document.createElement("div");
  const name = document.createElement("p");
  name.className = "hero-name";
  name.textContent = cocktail.name;
  container.appendChild(name);

  const meta1 = document.createElement("p");
  meta1.className = "hero-meta";
  meta1.textContent = cocktail.glassware;
  container.appendChild(meta1);

  const meta2 = document.createElement("p");
  meta2.className = "hero-meta strong";
  meta2.textContent = cocktail.method;
  container.appendChild(meta2);

  const flavorTitle = document.createElement("p");
  flavorTitle.className = "detail-h3";
  flavorTitle.innerHTML = `<span>&#127864;</span> Flavor profile`;
  container.appendChild(flavorTitle);

  const flavorGrid = document.createElement("div");
  flavorGrid.className = "flavor-grid cocktail-flavor-grid";
  flavorGrid.innerHTML = cocktail.flavorTags.map(t =>
    `<div class="flavor-item"><div class="icon">${getFlavorIcon(t)}</div><p>${t}</p></div>`
  ).join("");
  container.appendChild(flavorGrid);

  const flipcard = document.createElement("div");
  flipcard.className = "dish-flipcard";
  const inner = document.createElement("div");
  inner.className = "dish-flip-inner";

  function faceHTML(idx) {
    if (idx === 0) {
      return `
        <p class="dish-flip-tag">1/2 &middot; tap to flip</p>
        <p class="dish-flip-title">&#129380; Ingredients</p>
        ${cocktail.followUp && cocktail.followUp.length ? `
          <p class="detail-h3" style="margin-top:0; color:var(--washi-100);"><span>&#128172;</span> Ask the guest</p>
          <div class="followup-list">${cocktail.followUp.map(q => `<div class="followup-chip">${q}</div>`).join("")}</div>
        ` : ""}
        <ul class="ingredient-list">${cocktail.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        <p class="chefprep-text" style="margin-top:auto;"><b style="color:#D9B98A;">Garnish:</b> ${cocktail.garnish}</p>
      `;
    }
    return `
      <p class="dish-flip-tag">2/2 &middot; tap to flip</p>
      <p class="dish-flip-title">&#127864; Build</p>
      <p class="chefprep-text">${cocktail.directions}</p>
      ${cocktail.prep ? `<p class="chefprep-text" style="margin-top:8px;"><b style="color:#D9B98A;">House prep:</b> ${cocktail.prep}</p>` : ""}
      ${cocktail.funFact ? `<p class="chefprep-text" style="margin-top:8px;"><b style="color:#D9B98A;">Fun fact:</b> ${cocktail.funFact}</p>` : ""}
      ${cocktail.bestFor ? `<p class="chefprep-text" style="margin-top:8px;"><b style="color:#D9B98A;">Great for:</b> ${cocktail.bestFor}</p>` : ""}
    `;
  }

  inner.innerHTML = faceHTML(0);
  flipcard.appendChild(inner);
  let faceIndex = 0;
  flipcard.onclick = () => {
    flipcard.classList.add("flipping");
    setTimeout(() => {
      faceIndex = (faceIndex + 1) % 2;
      inner.className = "dish-flip-inner" + (faceIndex === 1 ? " chefprep" : "");
      inner.innerHTML = faceHTML(faceIndex);
      flipcard.classList.remove("flipping");
    }, 200);
  };
  container.appendChild(flipcard);

  app.appendChild(container);
}

function renderNavChips(activeWineId, onSelect, wineSource) {
  const source = wineSource || WINES;
  const wrap = document.createElement("div");
  wrap.className = "nav-chips";
  source.forEach(w => {
    const chip = document.createElement("button");
    chip.className = "nav-chip" + (w.id === activeWineId ? " active" : "");
    chip.textContent = w.name.split(" ").slice(0, 2).join(" ");
    chip.onclick = () => onSelect(w.id);
    wrap.appendChild(chip);
  });
  return wrap;
}

function renderHeroHeader(wine) {
  const frag = document.createElement("div");

  const heroName = document.createElement("p");
  heroName.className = "hero-name";
  heroName.textContent = wine.name;
  frag.appendChild(heroName);

  const meta1 = document.createElement("p");
  meta1.className = "hero-meta";
  meta1.textContent = wine.grape;
  frag.appendChild(meta1);

  const meta2 = document.createElement("p");
  meta2.className = "hero-meta";
  meta2.textContent = wine.region;
  frag.appendChild(meta2);

  const meta3 = document.createElement("p");
  meta3.className = "hero-meta strong";
  meta3.textContent = "Producer: " + wine.producer;
  frag.appendChild(meta3);

  const meta4 = document.createElement("p");
  meta4.className = "hero-meta strong";
  meta4.textContent = "Winemaker: " + wine.winemaker;
  frag.appendChild(meta4);

  if (typeof wine.price === "number") {
    const priceTag = document.createElement("p");
    priceTag.className = "hero-price";
    const priceUnit = wine.id.startsWith("bw") ? "bottle" : "glass";
    priceTag.innerHTML = `<span class="hero-price-amount">$${wine.price}</span><span class="hero-price-label">${priceUnit}</span>`;
    frag.appendChild(priceTag);
  }

  return frag;
}

function renderWineCardBody(wine) {
  const container = document.createElement("div");
  container.appendChild(renderHeroHeader(wine));

  const pairsLabel = document.createElement("p");
  pairsLabel.className = "pairs-label";
  pairsLabel.innerHTML = `<span class="ic">&#127860;</span>Pairs with`;
  container.appendChild(pairsLabel);

  const pillRow = document.createElement("div");
  pillRow.className = "pill-row";
  wine.pairingDishIds.forEach(dishId => {
    const dish = findDish(dishId);
    if (!dish) return;
    const pill = document.createElement("button");
    pill.className = "pill";
    pill.textContent = dish.name;
    pill.onclick = () => go("dish-detail", { dishId: dish.id });
    pillRow.appendChild(pill);
  });
  container.appendChild(pillRow);
  container.appendChild(renderFlipCard(wine));

  return container;
}

function renderStudyCard(wineId) {
  const wine = findWine(wineId) || WINES[0];
  const idx = WINES.findIndex(w => w.id === wine.id);

  header("By The Glass");
  app.appendChild(renderNavChips(wine.id, (id) => go("study-card", { wineId: id }, false)));
  app.appendChild(renderWineCardBody(wine));

  const footerNav = document.createElement("div");
  footerNav.className = "card-footer-nav";

  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "\u2190 Back";
  backBtn.disabled = idx === 0;
  backBtn.onclick = () => go("study-card", { wineId: WINES[idx - 1].id }, false);

  const homeBtn = document.createElement("button");
  homeBtn.className = "footer-btn footer-btn-home";
  homeBtn.textContent = "Home";
  homeBtn.onclick = () => go("home", {});

  const nextBtn = document.createElement("button");
  nextBtn.className = "footer-btn";
  nextBtn.textContent = "Next \u2192";
  nextBtn.disabled = idx === WINES.length - 1;
  nextBtn.onclick = () => go("study-card", { wineId: WINES[idx + 1].id }, false);

  footerNav.appendChild(backBtn);
  footerNav.appendChild(homeBtn);
  footerNav.appendChild(nextBtn);
  app.appendChild(footerNav);

  let touchStartX = null;
  app.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { once: true });
  app.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      const nextIdx = dx < 0 ? Math.min(idx + 1, WINES.length - 1) : Math.max(idx - 1, 0);
      go("study-card", { wineId: WINES[nextIdx].id }, false);
    }
  }, { once: true });
}

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
  return h;
}

const PAIRING_REASONS = {
  "w1|d-oysters": "Prosecco's bubbles and light sweetness mirror the citrus in the shallot ponzu and cut straight through the brine, resetting your palate before the next shuck.",
  "w1|d-edamame": "Simple sea-salted soybeans want a wine that's just as unfussy &ndash; Prosecco's apple and pear fruit softens the salt while the bubbles clear the palate between handfuls.",
  "w1|d-shishitos": "The blistered char and furikake here carry a little heat and a lot of salt &ndash; Prosecco's off-dry edge and low alcohol keep that from ever tasting sharp, and the bubbles cut the sesame oil.",

  "w2|d-caviar": "This isn't a classic pairing by reputation alone &ndash; Telmont's own brioche and toast character (from extended lees aging) genuinely echoes the nutty, buttery pop of the sturgeon roe itself.",
  "w2|d-shellfish-tower": "Four butter-drenched proteins in one dish need real acid to keep up &ndash; Telmont's chalky, high acidity is built for exactly this much richness without disappearing under it.",

  "w3|d-tuna-tartare": "The avocado purée brings fat, the yuzu-garlic-soy dressing brings sharp acid &ndash; the rosé's red berry fruit softens that sharpness while its own acidity stays right in step with the dressing.",
  "w3|d-yellowtail-carpaccio": "The wakamomo ponzu here is sweet-tart, built from baby Japanese peach &ndash; that's a genuine flavor echo with the wine's own strawberry and red currant fruit, not just a raw-fish default.",
  "w3|d-seared-spicy-salmon-roll": "Seared salmon and spicy aioli bring char and richness &ndash; the wine's acid cuts both, while its red fruit stays out of the way of the ponzu's savory edge instead of competing with it.",

  "w4|d-grilled-romaine": "The anchovy black garlic dressing is pungent and salty &ndash; Pinot Grigio's neutral, high-acid profile refuses to get bullied by it, letting the char on the lettuce still come through.",
  "w4|d-fire-roasted-beets": "Sweet-earthy beets with tangy labneh and warm-spiced pistachio dukkah don't need a wine trying to match them note for note &ndash; the wine's crisp apple character is a clean contrast instead.",
  "w4|d-branzino": "About as textbook as pairing gets: a delicate, simply grilled fish wants a delicate wine, and both just get out of the way and let the brown butter and lemon do the talking.",

  "w5|d-oysters": "Same shallot ponzu as the Ruffino pairing, but Emmolo's fresh-cut herb character leans directly into the raw brine, while its citrus zest matches the orange and lemon already in the sauce.",
  "w5|d-yellowtail-carpaccio": "Where the rosé Champagne leans into the sweetness of the wakamomo ponzu, Emmolo comes at the same dish from its herbal, stone-fruit side &ndash; a genuinely different but equally valid angle.",
  "w5|d-crunchy-spicy-tuna-roll": "Spicy mayo, sweet eel sauce, and fermented kimchi sauce is a real flavor bomb &ndash; Emmolo's high acid and citrus don't get lost in it, they cut straight through the mayo's richness.",
  "w5|d-131-california-roll": "A gentler roll than the crunchy tuna &ndash; crab, avocado, cucumber. Emmolo's citrus and herb notes complement the natural sweetness of the crab without overwhelming a more delicate roll.",

  "w6|d-mac-cheese": "This is rich meeting rich on purpose &ndash; the sharp cheddar cream sauce and the wine's own buttery, oak-driven character come from the same place, so neither one cuts the other, they just agree.",
  "w6|d-mashed-potato": "The richest dish on the menu &ndash; braised short rib, truffle jus, raclette melted over cream and butter. Cambria's full body means it won't get bulldozed, though the truffle's umami is working against the oak a little; this is a big-wine-big-dish match more than a precise umami answer.",
  "w6|d-miso-cod": "The coconut lemongrass espuma actually gives Cambria something specific to grab onto &ndash; its own tropical fruit picks up the coconut directly. Real flavor bridge, though Benton-Lane remains the safer choice if the umami from the miso marinade reads assertive that night.",
  "w6|d-wagyu-skirt": "The chili vinaigrette brings heat, the blue cheese brings funk &ndash; Cambria's roundness takes the edge off the heat while its tropical fruit plays well against the cheese instead of clashing with it.",

  "w7|d-lobster": "Butter-on-butter, but not redundant &ndash; Stag's Leap's own brioche and toast character (from time in oak) genuinely echoes the richness of the garlic ponzu butter rather than just matching its weight.",
  "w7|d-branzino": "The same fish as the Santa Margherita pairing, but here it's about the brown butter specifically &ndash; brown butter is nuttier and richer than a simple grilled preparation, and this Chardonnay's fuller body was built for that difference.",
  "w7|d-chicken-fried-lobster": "The richest lobster preparation on the menu &ndash; fried, breaded, finished with brown butter aioli. This needs Stag's Leap's fullest body and its own toasted, brioche-like character to stand up to the fry oil.",

  "w8|d-chopped-salad": "The plum vinaigrette is sweet-tart and the feta is salty &ndash; Miraval's delicate peach fruit doesn't try to compete with the plum syrup, and its bright acid sits right alongside the vinaigrette's own tang.",
  "w8|d-naan": "Smoky babaganoush or tangy labneh are both a little heavy on their own &ndash; the rosé's floral lift keeps the whole thing feeling fresh instead of dense.",
  "w8|d-edamame": "Same simple, salted snack as the Prosecco pairing, but Miraval's more delicate peach fruit (versus Prosecco's apple-pear) makes this the quieter, more contemplative choice rather than the celebratory one.",

  "w9|d-clam-chowder": "A genuinely classic move &ndash; mineral, flinty Sancerre rosé against a cream-based seafood soup. The high acid cuts the richness while the flint in the wine echoes the chowder's own smokiness.",
  "w9|d-shishitos": "The second shishito pairing on the list, but a different angle &ndash; Sancerre rosé's higher acid and more savory, mineral edge (versus Prosecco's fruit-forward sweetness) is the drier, more serious answer for this dish.",
  "w9|d-hamachi": "Textbook raw-fish logic &ndash; high acid, light body, and just enough red berry fruit to add brightness without masking the natural fat in the yellowtail.",

  "w10|d-branzino": "The crispy skin and brown butter here don't need to be met with force &ndash; Pinot's soft tannin means there's nothing to clash with the delicate flesh, and its acid takes care of the butter.",
  "w10|d-miso-cod": "The strongest technical answer on the whole list for this dish &ndash; the miso's umami and the espuma's citrus both behave better against Pinot's soft tannin and bright acid than they do against a bigger wine.",
  "w10|d-chefs-nigiri": "The fish changes daily on a chef's selection, so the wine needs to be the constant &ndash; light body and soft tannin is the safest bet across whatever's actually on the plate that night.",

  "w11|d-wagyu-skirt": "The chili vinaigrette and blue cheese both bring real intensity &ndash; Flowers' earthy spice notes stand up to the char while its acid handles the vinaigrette's heat more gracefully than a bigger red would.",
  "w11|d-short-rib": "Braised, glazed, finished with chimichurri &ndash; the wine's dark cherry fruit and moderate tannin suit the richness of a long-braised cut without the tannin overpowering meat that's already this tender.",
  "w11|d-negi-toro-roll": "An unusual move on paper &ndash; red wine with raw fish &ndash; but fatty bluefin toro behaves more like meat than like lean sushi, and Flowers' acid cuts the fat the same way it would with duck.",
  "w11|d-marinated-chicken": "The espelette marinade and chili-spiked potatoes bring real heat, and the double-fried potatoes bring real richness &ndash; Flowers' soft tannin won't amplify the burn, and its bright acid is exactly what cuts through the fry oil. This is also the restaurant's own tested pairing for this dish.",

  "w12|d-short-rib": "Malbec's riper, jammier fruit (versus the more savory Flowers Pinot Noir also linked to this dish) makes it the bigger, more crowd-pleasing option for a guest who wants more fruit-forward richness with their short rib.",
  "w12|d-marinated-chicken": "Still a fair pairing, though Flowers is the sharper technical answer &ndash; Malbec's slightly higher tannin makes this the pick for a guest who wants more red wine presence and isn't worried about the chili heat clashing.",
  "w12|d-burger": "Char-grilled beef, a special sauce with real chili flakes in it &ndash; Malbec's ripe fruit and moderate tannin is a straightforward, crowd-pleasing burger match, no subtlety required.",

  "w13|d-marinated-chicken": "The softest tannin of any red linked to this dish &ndash; genuinely the gentlest option if a guest is heat-sensitive and doesn't want any tannic bite stacked on top of the espelette and chili.",
  "w13|d-short-rib": "The gentlest of the three short rib pairings on this list &ndash; good for a guest who wants red wine with their braise but finds big tannin off-putting against something this tender.",

  "w14|d-ribeye": "The fattiest cut on the menu wants the wine with the most grip &ndash; Austin Hope's high tannin is built specifically to cut through this much marbling.",
  "w14|d-ny-strip-14": "Leaner than the ribeye but still a well-marbled Australian wagyu cut &ndash; same tannin-to-fat logic, just slightly less fat for the wine to work against.",
  "w14|d-short-rib": "The highest-tannin option paired with short rib on the list &ndash; the right call if the guest wants real structure against the glaze's sweetness rather than a softer red.",
  "w14|d-bone-marrow": "Pure marrow fat plus braised short rib is about as rich as this menu gets &ndash; Austin Hope has the most tannin on the list, exactly what's needed to cut it, and the char on the rib picks up the wine's own dark chocolate and warm spice.",

  "w15|d-filet-8": "Filet is the leanest cut on the menu, so it doesn't want the biggest wine &ndash; Oberon's medium tannin is deliberately gentler than Caymus or Austin Hope, matched to a cut with less fat to push against.",
  "w15|d-bone-in-filet": "Slightly more richness than a standard filet thanks to the bone, but still a lean cut &ndash; same logic as the 8oz filet, it wants the softer of the two Wagner-family Cabernets.",
  "w15|d-burger": "The cassis and mocha notes echo the char on the patty directly, and the medium tannin doesn't overpower the special sauce the way a bigger wine would.",

  "w16|d-tomahawk": "The biggest, most heavily marbled cut on the menu wants the biggest wine on the list &ndash; Caymus's full body and tannin were built for exactly this scale.",
  "w16|d-porterhouse": "Two cuts in one, strip and filet &ndash; Caymus's plush tannin handles the fattier strip side without being outclassed by a dish this large.",
  "w16|d-ny-strip-16": "Well-marbled but a notch below the tomahawk in scale &ndash; still wants a big wine, and Caymus's vanilla-oak character actually echoes the char from the wood-fire grill.",
  "w16|d-bone-marrow": "Between the marrow fat and the braised short rib on top, this is one of the richest bites on the menu &ndash; Caymus has the density to match it pound for pound, and the sweet onion jam plays surprisingly well against the wine's own vanilla and mocha.",

  "w17|d-naan": "Babaganoush's smokiness and the tahini's nuttiness share a flavor world with the wine's own garrigue herb character &ndash; a real regional echo, not just a soft-tannin safety pick.",
  "w17|d-marinated-chicken": "The peppery spice already in this wine actually mirrors the espelette in the chicken's marinade &ndash; a genuine flavor-affinity match, on top of the soft tannin doing its usual job of not fighting the heat.",
  "w17|d-wild-mushrooms": "An earthy, umami-forward dish that would turn bitter against a tannic red &ndash; this Grenache-Syrah blend's soft tannin avoids that clash, and its own earthy undertone leans right into the mushrooms.",

  "w18|d-short-rib": "More restrained tannin than the Napa Cabs also linked to short rib &ndash; the right call for a guest who wants elegance over raw power with their braise.",
  "w18|d-bone-in-filet": "The bone adds a layer of richness beyond a standard filet, giving this more structured Bordeaux blend something to actually grip onto that a plain filet wouldn't offer alone.",

  "w19|d-tenderloin-8": "A blend brings more complexity to a very simple, unadorned cut than a single-varietal wine would &ndash; the cedar and dried herb notes give the dish a second layer it wouldn't otherwise have.",
  "w19|d-wagyu-skirt": "Cedar and dried herb echo the char and the savory edge of the chili vinaigrette without needing to be as big or tannic as a straight Cabernet.",
  "w19|d-short-rib": "Sits right between Markham's softness and Austin Hope's power &ndash; a genuine middle-ground option for braised richness that doesn't ask the guest to pick an extreme.",

  "w20|d-sushi-sashimi-nigiri": "Same production logic as the food itself &ndash; rice, water, minimal intervention &ndash; so it never competes with clean raw fish, it just sits alongside it.",
  "w20|d-sushi-rolls": "Rolls often add mayo or sauce richness on top of the fish &ndash; sake's gentle natural sweetness handles that better than its clean profile alone would suggest.",
  "w20|d-sashimi-platter": "A platter this varied needs one constant, umami-friendly partner &ndash; sake's total lack of tannin means it's never wrong no matter which fish shows up that day.",
  "w20|d-omakase-platter": "At the very top of the list, the chef is choosing unpredictable, extremely premium ingredients &ndash; uni, otoro &ndash; and sake is the one pour on this list that's never a poor match for any of it.",
  "w20|d-ikura": "Salmon roe is intensely briny and umami, with a burst of liquid richness &ndash; the sake's own delicate melon and lychee sweetness is a genuine bridge against the salt, not just a safe umami default.",
  "w20|d-tamagoyaki": "This is a literal ingredient echo &ndash; the tamagoyaki itself is built with dashi, mirin, and sake, so the same character shows up again in the glass as it does on the plate.",
  "w20|d-unagi": "The eel is glazed in a sweet soy-mirin sauce &ndash; the sake's own off-dry character matches that sweetness instead of the dry-versus-sweet clash a bone-dry white would create."
};

function getDominantTrait(wine) {
  const s = wine.structure;
  if (s.tannin >= 4) return { trait: "tannin", value: s.tannin };
  if (s.acidity >= 4) return { trait: "acidity", value: s.acidity };
  if (s.body >= 4) return { trait: "body", value: s.body };
  if (s.body <= 2) return { trait: "body", value: s.body };
  if (s.acidity <= 2) return { trait: "acidity", value: s.acidity };
  return { trait: "tannin", value: s.tannin || s.body };
}

function pairingReason(wine, dish) {
  const key = wine.id + "|" + dish.id;
  const trait = getDominantTrait(wine);
  const text = PAIRING_REASONS[key] || `Its ${trait.trait} profile is the reason this works &ndash; balanced against the ${dish.name.toLowerCase()} rather than fighting it.`;
  return { trait: trait.trait, value: trait.value, text };
}

function renderWineDetailWithPairing(wineId) {
  const wine = findWine(wineId);
  if (!wine) { go("pairwf-list", {}, false); return; }
  header("Pair wine &#8594; food");

  const container = document.createElement("div");
  container.appendChild(renderHeroHeader(wine));

  const pairsLabel = document.createElement("p");
  pairsLabel.className = "pairs-label";
  pairsLabel.innerHTML = `<span class="ic">&#127860;</span>Pairs with`;
  container.appendChild(pairsLabel);

  const pillRow = document.createElement("div");
  pillRow.className = "pill-row";
  wine.pairingDishIds.forEach(dishId => {
    const dish = findDish(dishId);
    if (!dish) return;
    const pill = document.createElement("button");
    pill.className = "pill";
    pill.textContent = dish.name;
    pill.onclick = () => go("pairing-explain", { wineId: wine.id, dishId: dish.id });
    pillRow.appendChild(pill);
  });
  container.appendChild(pillRow);

  app.appendChild(container);
}

function splitTopLevel(str, delim) {
  const result = [];
  let depth = 0, current = "";
  for (const ch of str) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === delim && depth === 0) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim().length) result.push(current);
  return result;
}

function splitIngredients(text) {
  if (!text) return [];
  const components = text.split(" | ").flatMap(p => p.split(/\.\s+(?=[A-Z])/));
  const groups = [];
  components.forEach(raw => {
    const comp = raw.trim().replace(/\.$/, "");
    if (!comp) return;
    const dashMatch = comp.match(/^(.{2,60}?)\s*-\s*(.+)$/);
    let label = null, rest = comp;
    if (dashMatch && dashMatch[2].trim().length) {
      label = dashMatch[1].trim();
      rest = dashMatch[2];
    }
    const items = splitTopLevel(rest, ",").map(s => s.trim()).filter(Boolean);
    if (items.length) groups.push({ label, items });
  });
  return groups;
}

function renderIngredientGroups(groups) {
  return groups.map(g => {
    const itemsHtml = g.items.map(i => `<li>${i}</li>`).join("");
    if (g.label) {
      return `<li class="ingredient-group"><span class="ingredient-group-label">${g.label}</span><ul class="ingredient-sublist">${itemsHtml}</ul></li>`;
    }
    return itemsHtml;
  }).join("");
}

function renderDishFlipCard(dish) {
  const ingredientItems = splitIngredients(dish.ingredients);
  const flipcard = document.createElement("div");
  flipcard.className = "dish-flipcard";
  const inner = document.createElement("div");
  inner.className = "dish-flip-inner";

  function faceHTML(idx) {
    if (idx === 0) {
      return `
        <p class="dish-flip-tag">1/2 &middot; tap to flip</p>
        <p class="dish-flip-title">&#129367; Ingredients</p>
        <ul class="ingredient-list">${renderIngredientGroups(ingredientItems)}</ul>
      `;
    }
    return `
      <p class="dish-flip-tag">2/2 &middot; tap to flip</p>
      <p class="dish-flip-title">&#128293; Chef prep</p>
      <p class="chefprep-text">${dish.chefPrep}</p>
    `;
  }

  inner.innerHTML = faceHTML(0);
  flipcard.appendChild(inner);
  let faceIndex = 0;
  flipcard.onclick = () => {
    flipcard.classList.add("flipping");
    setTimeout(() => {
      faceIndex = (faceIndex + 1) % 2;
      inner.className = "dish-flip-inner" + (faceIndex === 1 ? " chefprep" : "");
      inner.innerHTML = faceHTML(faceIndex);
      flipcard.classList.remove("flipping");
    }, 200);
  };
  return flipcard;
}

function renderRawCutFlipCard(dish) {
  const flipcard = document.createElement("div");
  flipcard.className = "dish-flipcard";
  const inner = document.createElement("div");
  inner.className = "dish-flip-inner";

  function faceHTML(idx) {
    if (idx === 0) {
      return `
        <p class="dish-flip-tag">1/2 &middot; tap to flip</p>
        <p class="dish-flip-title">&#127843; What it is</p>
        <p class="chefprep-text">${dish.whatItIs}</p>
      `;
    }
    return `
      <p class="dish-flip-tag">2/2 &middot; tap to flip</p>
      <p class="dish-flip-title">&#128161; Good to know</p>
      <p class="chefprep-text">${dish.goodToKnow}</p>
    `;
  }

  inner.innerHTML = faceHTML(0);
  flipcard.appendChild(inner);
  let faceIndex = 0;
  flipcard.onclick = () => {
    flipcard.classList.add("flipping");
    setTimeout(() => {
      faceIndex = (faceIndex + 1) % 2;
      inner.className = "dish-flip-inner" + (faceIndex === 1 ? " chefprep" : "");
      inner.innerHTML = faceHTML(faceIndex);
      flipcard.classList.remove("flipping");
    }, 200);
  };
  return flipcard;
}

function renderDishDetail(dishId) {
  const dish = findDish(dishId);
  if (!dish) { go("pairfw-list", {}, false); return; }

  header(dish.section);

  const container = document.createElement("div");
  const name = document.createElement("p");
  name.className = "hero-name";
  name.textContent = dish.name;
  container.appendChild(name);

  if (dish.pronunciation || dish.translation) {
    const pronLine = document.createElement("p");
    pronLine.className = "hero-meta";
    pronLine.innerHTML = [
      dish.pronunciation ? `<i>${dish.pronunciation}</i>` : "",
      dish.translation ? dish.translation : ""
    ].filter(Boolean).join(" &middot; ");
    container.appendChild(pronLine);
  }

  if (dish.dropLine) {
    const dropLine = document.createElement("p");
    dropLine.className = "drop-line";
    dropLine.textContent = "\u201C" + dish.dropLine + "\u201D";
    container.appendChild(dropLine);
  } else {
    const desc = document.createElement("p");
    desc.className = "hero-meta";
    desc.textContent = dish.description;
    container.appendChild(desc);
  }

  if (dish.ingredients && dish.chefPrep) {
    container.appendChild(renderDishFlipCard(dish));
  } else if (dish.whatItIs && dish.goodToKnow) {
    container.appendChild(renderRawCutFlipCard(dish));
  }

  if (dish.funFact && !dish.whatItIs) {
    const factTitle = document.createElement("p");
    factTitle.className = "detail-h3";
    factTitle.innerHTML = `<span>&#10024;</span> Fun fact`;
    container.appendChild(factTitle);
    const factText = document.createElement("p");
    factText.className = "hero-meta";
    factText.style.cssText = "margin-bottom:14px; line-height:1.55; color:var(--shoyu-500);";
    factText.textContent = dish.funFact;
    container.appendChild(factText);
  }

  if (dish.allergensInRecipe && dish.allergensInRecipe.length) {
    const allergenTitle = document.createElement("p");
    allergenTitle.className = "detail-h3";
    allergenTitle.innerHTML = `<span>&#9888;&#65039;</span> Allergens`;
    container.appendChild(allergenTitle);

    const inRecipeLabel = document.createElement("p");
    inRecipeLabel.className = "allergen-group-label";
    inRecipeLabel.textContent = "In recipe";
    container.appendChild(inRecipeLabel);

    const inRecipeRow = document.createElement("div");
    inRecipeRow.className = "allergen-row";
    dish.allergensInRecipe.forEach(a => {
      const chip = document.createElement("span");
      chip.className = "chip in-recipe";
      chip.textContent = a.charAt(0).toUpperCase() + a.slice(1);
      inRecipeRow.appendChild(chip);
    });
    container.appendChild(inRecipeRow);

    if (dish.allergensRemovable && dish.allergensRemovable.length) {
      const removableLabel = document.createElement("p");
      removableLabel.className = "allergen-group-label";
      removableLabel.textContent = "Can be removed";
      container.appendChild(removableLabel);

      const removableRow = document.createElement("div");
      removableRow.className = "allergen-row";
      dish.allergensRemovable.forEach(a => {
        const chip = document.createElement("span");
        chip.className = "chip removable";
        chip.textContent = a.charAt(0).toUpperCase() + a.slice(1);
        removableRow.appendChild(chip);
      });
      container.appendChild(removableRow);
    }
  }

  const pairsLabel = document.createElement("p");
  pairsLabel.className = "pairs-label";
  pairsLabel.innerHTML = `<span class="ic">&#127863;</span>Pairs with`;
  container.appendChild(pairsLabel);

  const pillRow = document.createElement("div");
  pillRow.className = "pill-row";
  if (dish.pairedWineIds.length) {
    dish.pairedWineIds.forEach(wineId => {
      const wine = findWine(wineId);
      if (!wine) return;
      const pill = document.createElement("button");
      pill.className = "pill";
      pill.textContent = wine.name;
      pill.onclick = () => go("pairing-explain", { wineId: wine.id, dishId: dish.id });
      pillRow.appendChild(pill);
    });
  }
  container.appendChild(pillRow);

  if (!dish.pairedWineIds.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "No wine pairing set for this dish yet.";
    container.appendChild(empty);
  }

  app.appendChild(container);
}

function renderPairingExplain(wineId, dishId) {
  const wine = findWine(wineId);
  const dish = findDish(dishId);
  if (!wine || !dish) { go("home", {}, false); return; }

  header("Why this pairs");

  const container = document.createElement("div");
  const reason = pairingReason(wine, dish);
  const traitBand = WSET_BANDS[reason.trait][reason.value - 1];
  container.innerHTML = `
    <p class="hero-name" style="font-size:19px; margin-bottom:2px; text-align:center;">${wine.name}</p>
    <p class="pairs-connector">+</p>
    <p class="hero-name" style="font-size:19px; margin-top:2px; text-align:center;">${dish.name}</p>
    <div class="mini-bar-wrap">
      <p class="mini-bar-lbl">Driving trait &middot; ${reason.trait} (${traitBand})</p>
      <div class="mini-track"><div class="mini-fill" style="width:${reason.value * 20}%;"></div></div>
    </div>
    <p class="pairing-reason">${reason.text}</p>
    <p class="pairing-reason"><b>Table-side line:</b> ${wine.arsenal}</p>
  `;
  app.appendChild(container);

  const linksRow = document.createElement("div");
  linksRow.className = "card-footer-nav";
  const wineBtn = document.createElement("button");
  wineBtn.className = "footer-btn";
  wineBtn.textContent = "View wine";
  wineBtn.onclick = () => go("study-card", { wineId: wine.id });
  const dishBtn = document.createElement("button");
  dishBtn.className = "footer-btn";
  dishBtn.textContent = "View dish";
  dishBtn.onclick = () => go("dish-detail", { dishId: dish.id });
  linksRow.appendChild(wineBtn);
  linksRow.appendChild(dishBtn);
  app.appendChild(linksRow);
}

/* Test Me — Confidence-Based Repetition (CBR), modeled on Brainscape's
   publicly documented algorithm: active recall (see the clue, try to
   answer in your head, reveal), then a 1-5 self-rated confidence that
   determines how soon the card resurfaces. Low ratings come back soon;
   high ratings hardly ever, but never disappear entirely (staleness).
   Speed Round is a separate, verified multiple-choice timed mode --
   self-rated confidence can't be trusted for a competitive score, so it
   intentionally does not read from or write to the CBR store below. */
function quizPool(mode, focus) {
  if (mode === "food") {
    let pool = DISHES.filter(d => d.quizClue);
    if (focus && focus !== "all") pool = pool.filter(d => d.section === focus);
    return pool;
  }
  if (mode === "cocktail") {
    return COCKTAILS;
  }
  if (mode === "mixed") {
    return [...WINES, ...DISHES.filter(d => d.quizClue)];
  }
  let pool = WINES;
  if (focus && focus !== "all") pool = pool.filter(w => w.style === focus);
  return pool;
}

function isWineItem(item) { return item.id.charAt(0) === "w" && /^\d+$/.test(item.id.slice(1)); }
function isCocktailItem(item) { return item.id.charAt(0) === "c" && /^\d+$/.test(item.id.slice(1)); }

function queueKey(mode, focus) { return mode === "mixed" ? "mixed" : mode + ":" + (focus || "all"); }

function shuffleArr(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---- CBR scheduling ---- */

// Base "due weight" per confidence rating. Directly reflects Brainscape's
// own description of the system: 1s come up most frequently, 5s hardly
// ever. Exact numbers are ours (their formula is proprietary/undisclosed)
// but the ordering and steepness match their stated behavior.
const CBR_RATING_WEIGHT = { 1: 100, 2: 60, 3: 30, 4: 12, 5: 4 };
const CBR_UNSEEN_WEIGHT = 50;

function cbrBatchSize(poolLength) {
  return Math.max(4, Math.min(10, Math.ceil(poolLength * 0.15)));
}

// Throttles new material: only the front slice of never-rated items is
// eligible to appear at once, so a new user isn't shown the whole deck
// as "new" simultaneously. As those items get any rating they leave the
// unseen bucket and the next slice opens up on its own.
function cbrEligibleUnseen(pool, confidenceMap) {
  const unseen = pool.filter(item => !confidenceMap[item.id]);
  return unseen.slice(0, cbrBatchSize(pool.length)).map(i => i.id);
}

function cbrDueWeight(itemId, confidenceMap) {
  const rec = confidenceMap[itemId];
  if (!rec) return CBR_UNSEEN_WEIGHT;
  const base = CBR_RATING_WEIGHT[rec.rating] || 30;
  const hoursSince = (Date.now() - rec.lastSeen) / 3600000;
  // Staleness: a well-rated card slowly becomes more likely to resurface
  // the longer it's gone unreviewed, capped so it can never outweigh a
  // genuinely weak card that was just seen.
  const stalenessMultiplier = 1 + Math.min(hoursSince / 24, 3);
  return base * stalenessMultiplier;
}

let cbrLastShown = {}; // qKey -> itemId, avoids showing the same card twice in a row

function pickCBRItem(mode, focus) {
  const pool = quizPool(mode, focus);
  if (!pool.length) return null;
  const confidenceMap = getConfidenceMap();
  const eligibleUnseenIds = new Set(cbrEligibleUnseen(pool, confidenceMap));
  const candidates = pool.filter(item => confidenceMap[item.id] || eligibleUnseenIds.has(item.id));
  const usable = candidates.length ? candidates : pool;
  const qKey = queueKey(mode, focus);
  const lastId = cbrLastShown[qKey];
  let weighted = usable.map(item => ({ id: item.id, weight: cbrDueWeight(item.id, confidenceMap) }));
  if (weighted.length > 1) weighted = weighted.filter(w => w.id !== lastId);
  const total = weighted.reduce((sum, w) => sum + w.weight, 0);
  let roll = Math.random() * total;
  for (const w of weighted) {
    roll -= w.weight;
    if (roll <= 0) return w.id;
  }
  return weighted[weighted.length - 1].id;
}

/* Mastery %: weighted average confidence across the pool, unseen items
   counting as 0 -- mirrors Brainscape's Deck/Class Mastery score, which
   they describe as a weighted average of confidence across all cards. */
function cbrMastery(pool) {
  if (!pool.length) return 0;
  const confidenceMap = getConfidenceMap();
  const sum = pool.reduce((s, item) => s + ((confidenceMap[item.id] && confidenceMap[item.id].rating) || 0), 0);
  return Math.round((sum / (pool.length * 5)) * 100);
}
function cbrMasteredCount(pool, threshold) {
  threshold = threshold || 4;
  const confidenceMap = getConfidenceMap();
  return pool.filter(item => confidenceMap[item.id] && confidenceMap[item.id].rating >= threshold).length;
}

let speedPref = { testme: false, match: false };

function speedToggleRow(prefKey, label) {
  const row = document.createElement("div");
  row.className = "speed-toggle" + (speedPref[prefKey] ? " active" : "");
  row.innerHTML = `<span class="speed-icon">&#9889;</span><span class="speed-text">${label}</span><span class="speed-state">${speedPref[prefKey] ? "ON" : "OFF"}</span>`;
  row.onclick = () => {
    speedPref[prefKey] = !speedPref[prefKey];
    render();
  };
  return row;
}

function renderTestMe() {
  header("Quiz tool");

  const intro = document.createElement("p");
  intro.className = "testme-counter";
  intro.textContent = "What do you want to be tested on?";
  app.appendChild(intro);

  app.appendChild(speedToggleRow("testme", "Speed round \u00b7 60 seconds, score as many as you can"));

  const options = document.createElement("div");
  options.className = "home-options";
  options.innerHTML = `
    <div class="home-option" data-go="wine">
      <div class="home-icon-circle">&#127863;</div>
      <div class="home-option-text"><p>Wine</p><span>Guess the wine from its profile</span></div>
    </div>
    <div class="home-option" data-go="food">
      <div class="home-icon-circle">&#127860;</div>
      <div class="home-option-text"><p>Food</p><span>Guess the dish from its description</span></div>
    </div>
    <div class="home-option" data-go="cocktail">
      <div class="home-icon-circle">&#127864;</div>
      <div class="home-option-text"><p>Cocktails</p><span>Guess the cocktail from its profile</span></div>
    </div>
    <div class="home-option" data-go="mixed">
      <div class="home-icon-circle">&#128260;</div>
      <div class="home-option-text"><p>Mixed</p><span>Wine and food shuffled together</span></div>
    </div>
  `;
  options.querySelector('[data-go="wine"]').onclick = () => go("test-me-focus", { mode: "wine" });
  options.querySelector('[data-go="food"]').onclick = () => go("test-me-focus", { mode: "food" });
  options.querySelector('[data-go="cocktail"]').onclick = () => go("test-me-run", { mode: "cocktail" });
  options.querySelector('[data-go="mixed"]').onclick = () => go("test-me-run", { mode: "mixed" });
  app.appendChild(options);
}

function renderTestMeFocus(mode) {
  header("Quiz tool");

  const intro = document.createElement("p");
  intro.className = "testme-counter";
  intro.textContent = mode === "food" ? "Focus on one section, or test the whole menu" : "Focus on one style, or test the whole list";
  app.appendChild(intro);

  const options = document.createElement("div");
  options.className = "home-options";

  const allOpt = document.createElement("div");
  allOpt.className = "home-option";
  allOpt.innerHTML = `
    <div class="home-icon-circle">&#127760;</div>
    <div class="home-option-text"><p>${mode === "food" ? "All dishes" : "All wines"}</p><span>Everything in the pool</span></div>
  `;
  allOpt.onclick = () => go("test-me-run", { mode, focus: "all" });
  options.appendChild(allOpt);

  const categories = mode === "food"
    ? SECTION_ORDER.filter(s => DISHES.some(d => d.section === s && d.quizClue))
    : STYLE_ORDER.filter(s => WINES.some(w => w.style === s));

  categories.forEach(cat => {
    const opt = document.createElement("div");
    opt.className = "home-option";
    const label = mode === "food" ? cat : STYLE_LABELS[cat];
    const icon = mode === "food" ? getSectionIcon(cat) : "\u{1F377}";
    opt.innerHTML = `
      <div class="home-icon-circle">${icon}</div>
      <div class="home-option-text"><p>${label}</p><span>Just this ${mode === "food" ? "section" : "style"}</span></div>
    `;
    opt.onclick = () => go("test-me-run", { mode, focus: cat });
    options.appendChild(opt);
  });

  app.appendChild(options);
}

function renderTestMeRun(mode) {
  mode = ["food", "mixed", "cocktail"].includes(mode) ? mode : "wine";
  const focus = current.params.focus || "all";
  header("Quiz tool");

  const pool = quizPool(mode, focus);
  if (!pool.length) { go("test-me", {}, false); return; }

  if (speedPref.testme) {
    renderSpeedRound(mode, focus, pool);
  } else {
    renderCBRCard(mode, focus, pool);
  }
}

/* ---- Practice mode: Brainscape-style confidence study loop ---- */
function renderCBRCard(mode, focus, pool) {
  const qKey = queueKey(mode, focus);
  const itemId = pickCBRItem(mode, focus);
  if (!itemId) { go("test-me", {}, false); return; }
  cbrLastShown[qKey] = itemId;

  let itemKind;
  if (mode === "mixed") itemKind = itemId.startsWith("d-") ? "food" : "wine";
  else itemKind = mode === "food" ? "food" : mode === "cocktail" ? "cocktail" : "wine";
  const isFood = itemKind === "food";
  const isCocktail = itemKind === "cocktail";
  const item = isFood ? findDish(itemId) : isCocktail ? findCocktail(itemId) : findWine(itemId);
  if (!item) { render(); return; }

  const mastery = cbrMastery(pool);
  const masteredCount = cbrMasteredCount(pool);
  const remaining = pool.length - masteredCount;

  const counter = document.createElement("p");
  counter.className = "testme-counter";
  counter.textContent = `${mastery}% mastery \u00b7 ${masteredCount} of ${pool.length} confident`;
  app.appendChild(counter);

  const masteryTrack = document.createElement("div");
  masteryTrack.className = "mastery-track";
  masteryTrack.innerHTML = `<div class="mastery-fill" style="width:${mastery}%;"></div>`;
  app.appendChild(masteryTrack);

  if (masteredCount > 0 && remaining > 0 && remaining <= 5) {
    const nudge = document.createElement("p");
    nudge.className = "testme-nudge";
    nudge.textContent = remaining === 1
      ? "1 card away from mastering this deck."
      : `${remaining} cards away from mastering this deck.`;
    app.appendChild(nudge);
  }

  const card = document.createElement("div");
  card.className = "testme-card";
  let phase = "clue"; // clue -> revealed

  function clueBlockHTML() {
    if (isFood) {
      return `
        <p class="dish-flip-tag">Guess the dish &middot; tap to reveal</p>
        <p class="face-h3" style="margin-top:8px;"><span class="ic">&#128269;</span> Clues</p>
        <p class="face-desc" style="margin-bottom:10px;">${getSectionIcon(item.section)} ${item.section}</p>
        <p class="chefprep-text">${item.quizClue}</p>
      `;
    }
    if (isCocktail) {
      return `
        <p class="dish-flip-tag">Guess the cocktail &middot; tap to reveal</p>
        <p class="face-h3" style="margin-top:8px;"><span class="ic">&#128269;</span> Clues</p>
        <p class="face-desc" style="margin-bottom:10px;">${item.glassware} &middot; ${item.method}</p>
        <div class="flavor-grid">${item.flavorTags.map(t => `<div class="flavor-item"><div class="icon">${getFlavorIcon(t)}</div><p>${t}</p></div>`).join("")}</div>
      `;
    }
    return `
      <p class="dish-flip-tag">Guess the wine &middot; tap to reveal</p>
      <p class="face-h3" style="margin-top:8px;"><span class="ic">&#128269;</span> Clues</p>
      <p class="face-desc" style="margin-bottom:10px;">${STYLE_LABELS[item.style]} &middot; ${item.region}</p>
      <div class="flavor-grid">${item.flavorTags.map(t => `<div class="flavor-item"><div class="icon">${getFlavorIcon(t)}</div><p>${t}</p></div>`).join("")}</div>
      ${structureBars(item.structure)}
    `;
  }

  function answerBlockHTML() {
    const connector = `<div class="answer-connector"><span>&#8595;</span></div>`;
    if (isFood) {
      return `
        ${connector}
        <p class="dish-flip-tag">That's&hellip;</p>
        <p class="testme-answer-name">${item.name}</p>
        <p class="face-desc">${item.section}</p>
        <p class="face-desc" style="margin-top:12px; color:var(--bronze-500);">How well did you know it? Rate yourself below.</p>
      `;
    }
    if (isCocktail) {
      return `
        ${connector}
        <p class="dish-flip-tag">That's&hellip;</p>
        <p class="testme-answer-name">${item.name}</p>
        <p class="face-desc">Garnish: ${item.garnish}</p>
        <p class="face-desc" style="margin-top:12px; color:var(--bronze-500);">How well did you know it? Rate yourself below.</p>
      `;
    }
    return `
      ${connector}
      <p class="dish-flip-tag">That's&hellip;</p>
      <p class="testme-answer-name">${item.name}</p>
      <p class="face-desc">${item.grape}</p>
      <p class="face-desc">Producer: ${item.producer}</p>
      <p class="face-desc" style="margin-top:12px; color:var(--bronze-500);">How well did you know it? Rate yourself below.</p>
    `;
  }

  const inner = document.createElement("div");
  inner.className = "dish-flip-inner";
  const clueBlock = document.createElement("div");
  clueBlock.className = "clue-block";
  clueBlock.innerHTML = clueBlockHTML();
  const answerBlock = document.createElement("div");
  answerBlock.className = "answer-block";
  answerBlock.style.display = "none";
  inner.appendChild(clueBlock);
  inner.appendChild(answerBlock);
  card.appendChild(inner);

  function reveal() {
    phase = "revealed";
    answerBlock.innerHTML = answerBlockHTML();
    answerBlock.style.display = "block";
    confidenceWrap.style.display = "block";
  }

  card.onclick = () => { if (phase === "clue") reveal(); };

  /* Confidence rating: Brainscape's own 1-5 scale, asked only after
     reveal (active recall first, self-assessment second -- no
     pre-reveal prediction step, matching their documented flow). */
  const confidenceWrap = document.createElement("div");
  confidenceWrap.className = "confidence-wrap";
  confidenceWrap.style.display = "none";
  confidenceWrap.innerHTML = `
    <div class="confidence-labels"><span>Not at all</span><span>Totally confident</span></div>
    <div class="confidence-row">
      <button class="confidence-btn" data-rating="1">1</button>
      <button class="confidence-btn" data-rating="2">2</button>
      <button class="confidence-btn" data-rating="3">3</button>
      <button class="confidence-btn" data-rating="4">4</button>
      <button class="confidence-btn" data-rating="5">5</button>
    </div>
  `;
  confidenceWrap.querySelectorAll(".confidence-btn").forEach(btn => {
    btn.onclick = (e) => { e.stopPropagation(); rate(parseInt(btn.dataset.rating, 10)); };
  });

  function rate(rating) {
    const wasFullyMastered = cbrMasteredCount(pool) === pool.length;
    setConfidence(item.id, rating);
    const isFullyMasteredNow = cbrMasteredCount(pool) === pool.length;
    if (isFullyMasteredNow && !wasFullyMastered && markMilestone("testme-cbr-" + mode + "-" + focus + "-mastered")) {
      celebrate();
      setTimeout(() => render(), 1200);
      return;
    }
    render();
  }

  /* Swipe stays as a fast shortcut for the two ends of the same scale --
     right = 5 (nailed it), left = 1 (not at all) -- the button row still
     gives full 1-5 granularity for anything in between. */
  let touchStartX = null;
  let dragging = false;
  card.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    dragging = false;
  }, { passive: true });
  card.addEventListener("touchmove", (e) => {
    if (phase !== "revealed" || touchStartX === null) return;
    const dx = e.touches[0].clientX - touchStartX;
    if (Math.abs(dx) > 8) dragging = true;
    if (!dragging) return;
    inner.style.transition = "none";
    inner.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
    inner.classList.toggle("drag-right", dx > 40);
    inner.classList.toggle("drag-left", dx < -40);
  }, { passive: true });
  card.addEventListener("touchend", (e) => {
    if (phase !== "revealed" || touchStartX === null) { touchStartX = null; return; }
    const dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (dx > 60) {
      inner.style.transition = "transform 0.25s ease";
      inner.style.transform = `translateX(120%) rotate(12deg)`;
      setTimeout(() => rate(5), 220);
    } else if (dx < -60) {
      inner.style.transition = "transform 0.25s ease";
      inner.style.transform = `translateX(-120%) rotate(-12deg)`;
      setTimeout(() => rate(1), 220);
    } else {
      inner.style.transition = "transform 0.25s ease";
      inner.style.transform = "translateX(0) rotate(0)";
      inner.classList.remove("drag-right", "drag-left");
    }
  });

  app.appendChild(card);
  app.appendChild(confidenceWrap);

  const resetLink = document.createElement("p");
  resetLink.className = "testme-reset";
  resetLink.textContent = "Reset my progress";
  resetLink.onclick = () => {
    resetConfidence();
    resetProgress();
    cbrLastShown = {};
    render();
  };
  app.appendChild(resetLink);
}

/* ---- Speed Round: separate, verified, timed multiple-choice ---- */
function renderSpeedRound(mode, focus, pool) {
  if (typeof current.params.score !== "number") {
    current.params.score = 0;
    current.params.endsAt = Date.now() + 60000;
  }
  const remaining = Math.max(0, current.params.endsAt - Date.now());
  if (remaining <= 0) {
    renderSpeedEnd(mode, current.params.score);
    return;
  }

  const timerWrap = document.createElement("div");
  timerWrap.className = "timer-wrap";
  timerWrap.innerHTML = `
    <div class="timer-row"><span class="timer-score">&#9889; Score: ${current.params.score}</span><span class="timer-count">${Math.ceil(remaining / 1000)}s</span></div>
    <div class="timer-track"><div class="timer-fill" style="width:${(remaining / 60000) * 100}%;"></div></div>
  `;
  app.appendChild(timerWrap);
  activeTimer = setInterval(() => {
    const left = Math.max(0, current.params.endsAt - Date.now());
    const countEl = timerWrap.querySelector(".timer-count");
    const fillEl = timerWrap.querySelector(".timer-fill");
    if (countEl) countEl.textContent = Math.ceil(left / 1000) + "s";
    if (fillEl) fillEl.style.width = (left / 60000) * 100 + "%";
    if (left <= 0) {
      clearInterval(activeTimer); activeTimer = null;
      renderSpeedEnd(mode, current.params.score);
    }
  }, 250);

  // Draws uniformly from the whole pool each question -- independent of
  // the CBR confidence store, since Speed Round scores need to stay
  // trustworthy for a future leaderboard.
  const item = pool[Math.floor(Math.random() * pool.length)];
  const itemKind = mode === "mixed" ? (item.id.startsWith("d-") ? "food" : "wine") : (mode === "food" ? "food" : mode === "cocktail" ? "cocktail" : "wine");
  const isFood = itemKind === "food";
  const isCocktail = itemKind === "cocktail";

  const card = document.createElement("div");
  card.className = "testme-card no-flip";
  const inner = document.createElement("div");
  inner.className = "dish-flip-inner";
  const clueBlock = document.createElement("div");
  clueBlock.className = "clue-block";
  clueBlock.innerHTML = speedClueHTML(item, isFood, isCocktail);
  inner.appendChild(clueBlock);
  card.appendChild(inner);
  app.appendChild(card);

  // Distractors from the same focused pool where possible; widens to the
  // mode's full pool if the focus is too small to supply four distinct names.
  const widePool = quizPool(mode, "all");
  const namePool = pool.length >= 4 ? pool : widePool;
  const distractSource = namePool.filter(x => x.id !== item.id && x.name !== item.name);
  const distractors = shuffleArr(distractSource).slice(0, 3);
  const options = shuffleArr([item, ...distractors]);

  const mcRow = document.createElement("div");
  mcRow.className = "mc-row";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "mc-btn";
    btn.textContent = opt.name;
    btn.onclick = () => {
      Array.from(mcRow.children).forEach(b => b.disabled = true);
      const isCorrect = opt.id === item.id;
      btn.classList.add(isCorrect ? "mc-correct" : "mc-incorrect");
      if (!isCorrect) {
        const correctBtn = Array.from(mcRow.children).find(b => b.textContent === item.name);
        if (correctBtn) correctBtn.classList.add("mc-reveal-correct");
      }
      if (isCorrect) current.params.score++;
      setTimeout(() => render(), 450);
    };
    mcRow.appendChild(btn);
  });
  app.appendChild(mcRow);
}

function speedClueHTML(item, isFood, isCocktail) {
  if (isFood) {
    return `
      <p class="dish-flip-tag">Guess the dish</p>
      <p class="face-h3" style="margin-top:8px;"><span class="ic">&#128269;</span> Clues</p>
      <p class="face-desc" style="margin-bottom:10px;">${getSectionIcon(item.section)} ${item.section}</p>
      <p class="chefprep-text">${item.quizClue}</p>
    `;
  }
  if (isCocktail) {
    return `
      <p class="dish-flip-tag">Guess the cocktail</p>
      <p class="face-h3" style="margin-top:8px;"><span class="ic">&#128269;</span> Clues</p>
      <p class="face-desc" style="margin-bottom:10px;">${item.glassware} &middot; ${item.method}</p>
      <div class="flavor-grid">${item.flavorTags.map(t => `<div class="flavor-item"><div class="icon">${getFlavorIcon(t)}</div><p>${t}</p></div>`).join("")}</div>
    `;
  }
  return `
    <p class="dish-flip-tag">Guess the wine</p>
    <p class="face-h3" style="margin-top:8px;"><span class="ic">&#128269;</span> Clues</p>
    <p class="face-desc" style="margin-bottom:10px;">${STYLE_LABELS[item.style]} &middot; ${item.region}</p>
    <div class="flavor-grid">${item.flavorTags.map(t => `<div class="flavor-item"><div class="icon">${getFlavorIcon(t)}</div><p>${t}</p></div>`).join("")}</div>
    ${structureBars(item.structure)}
  `;
}

/* ---------- Game Room ---------- */

const MILESTONE_KEY = "p131-milestones";
function getMilestones() {
  try { return JSON.parse(localStorage.getItem(MILESTONE_KEY)) || {}; } catch (e) { return {}; }
}
function markMilestone(key) {
  const m = getMilestones();
  if (m[key]) return false;
  m[key] = true;
  try { localStorage.setItem(MILESTONE_KEY, JSON.stringify(m)); } catch (e) {}
  return true;
}

function celebrate() {
  const overlay = document.createElement("div");
  overlay.className = "celebrate-overlay";
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = ["\u{1F37E}", "\u{1F942}", "\u{1F377}", "\u2728"][i % 4];
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDelay = (Math.random() * 0.6) + "s";
    piece.style.fontSize = (16 + Math.random() * 14) + "px";
    overlay.appendChild(piece);
  }
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 2600);
}

function renderGameRoom() {
  header("Game Room");

  const wineMastered = cbrMasteredCount(WINES);
  const foodPool = quizPool("food");
  const foodMastered = cbrMasteredCount(foodPool);

  const status = document.createElement("div");
  status.className = "milestone-strip";
  status.innerHTML = `
    <p class="milestone-line">&#127942; Wines confident: ${wineMastered}/${WINES.length} &middot; Dishes confident: ${foodMastered}/${foodPool.length}</p>
  `;
  app.appendChild(status);

  const options = document.createElement("div");
  options.className = "home-options";
  options.innerHTML = `
    <div class="home-option" data-go="testme">
      <div class="home-icon-circle">&#127919;</div>
      <div class="home-option-text"><p>Test Me</p><span>Guess the wine or dish, track what you know</span></div>
    </div>
    <div class="home-option" data-go="thisorthat">
      <div class="home-icon-circle">&#9878;&#65039;</div>
      <div class="home-option-text"><p>This or That</p><span>Two real options, one call &mdash; train your judgment</span></div>
    </div>
    <div class="home-option" data-go="matchit">
      <div class="home-icon-circle">&#127183;</div>
      <div class="home-option-text"><p>Match It</p><span>Flip and match wines to regions, flavors, and pairings</span></div>
    </div>
    <div class="home-option" data-go="imposter">
      <div class="home-icon-circle">&#128373;&#65039;</div>
      <div class="home-option-text"><p>Imposter</p><span>Three belong together &mdash; one doesn't. Find it.</span></div>
    </div>
    <div class="home-option" data-go="sommsays">
      <div class="home-icon-circle">&#9889;</div>
      <div class="home-option-text"><p>Sommelier Says</p><span>Rapid-fire true or false, against the clock</span></div>
    </div>
    <div class="home-option" data-go="knockout">
      <div class="home-icon-circle">&#128081;</div>
      <div class="home-option-text"><p>Knockout</p><span>One structure axis, one champion &mdash; defend the title or dethrone it</span></div>
    </div>
    <div class="home-option" data-go="allergy-sort">
      <div class="home-icon-circle">&#9888;</div>
      <div class="home-option-text"><p>Allergy Sort</p><span>Drag real dishes into the right bin &mdash; contains it, or doesn't</span></div>
    </div>
  `;
  options.querySelector('[data-go="testme"]').onclick = () => go("test-me");
  options.querySelector('[data-go="thisorthat"]').onclick = () => go("this-or-that");
  options.querySelector('[data-go="matchit"]').onclick = () => go("match-it-picker");
  options.querySelector('[data-go="imposter"]').onclick = () => go("imposter");
  options.querySelector('[data-go="sommsays"]').onclick = () => go("somm-says");
  options.querySelector('[data-go="knockout"]').onclick = () => go("knockout");
  options.querySelector('[data-go="allergy-sort"]').onclick = () => go("allergy-sort");
  app.appendChild(options);
}

/* ---------- Knockout: fixed-axis structure duel with a persistent champion.
   Matchup generation, delta-weighted difficulty, and anti-repeat logic all
   live in knockout-engine.js (window.ChiriusKnockout) -- this section is
   render/state only. A block's outcomes (who wins each round) are fully
   determined by real structure data the moment the block is built; only
   the player's guesses and accuracy are decided at render time. */

const KNOCKOUT_BEST_PREFIX = "p131-best-knockout-";
function getKnockoutBest(axisKey) {
  try { return parseInt(localStorage.getItem(KNOCKOUT_BEST_PREFIX + axisKey)) || 0; } catch (e) { return 0; }
}
function setKnockoutBest(axisKey, val) {
  try { localStorage.setItem(KNOCKOUT_BEST_PREFIX + axisKey, String(val)); } catch (e) {}
}

const KNOCKOUT_LAST_CHAMP_PREFIX = "p131-last-champ-knockout-";
function getKnockoutLastChampion(axisKey) {
  try { return localStorage.getItem(KNOCKOUT_LAST_CHAMP_PREFIX + axisKey) || null; } catch (e) { return null; }
}
function setKnockoutLastChampion(axisKey, wineId) {
  try { localStorage.setItem(KNOCKOUT_LAST_CHAMP_PREFIX + axisKey, wineId); } catch (e) {}
}

function knockoutWineIcon(wine) {
  return wine.style === "sake" ? "\u{1F376}" : wine.style === "sparkling" ? "\u{1F942}" : "\u{1F377}";
}

/* Longest run of consecutive wins by the same wine, and the length of the
   run still active at the end of the block (0 if not needed). */
function knockoutStreaks(rounds) {
  const winners = rounds.map(r => r.winnerId);
  let maxStreak = 1, curLen = 1;
  for (let i = 1; i < winners.length; i++) {
    curLen = winners[i] === winners[i - 1] ? curLen + 1 : 1;
    if (curLen > maxStreak) maxStreak = curLen;
  }
  let finalStreak = 1;
  for (let i = winners.length - 1; i > 0; i--) {
    if (winners[i] === winners[i - 1]) finalStreak++; else break;
  }
  return { maxStreak, finalStreak };
}

function renderKnockout() {
  header("Knockout", true, () => go("game-room"));

  const intro = document.createElement("p");
  intro.className = "testme-counter";
  intro.textContent = "Pick a structure axis. One wine defends its title until something knocks it out.";
  app.appendChild(intro);

  const options = document.createElement("div");
  options.className = "home-options";
  Object.keys(ChiriusKnockout.KNOCKOUT_AXES).forEach((axisKey) => {
    let pairCount = 0;
    try {
      const pool = ChiriusKnockout.buildAxisPool(WINES, axisKey);
      pairCount = Object.values(pool.buckets).reduce((n, b) => n + b.length, 0);
    } catch (e) { pairCount = 0; }
    if (pairCount === 0) return; // axis has no valid pairs at all -- don't offer it
    const best = getKnockoutBest(axisKey);
    const label = axisKey.charAt(0).toUpperCase() + axisKey.slice(1);
    const opt = document.createElement("div");
    opt.className = "home-option";
    opt.innerHTML = `
      <div class="home-option-text">
        <p>${label}</p>
        <span>${pairCount} matchups${best ? ` \u00b7 Best streak: ${best}` : ""}</span>
      </div>
    `;
    opt.onclick = () => go("knockout-run", { axis: axisKey });
    options.appendChild(opt);
  });
  app.appendChild(options);
}

function renderKnockoutRun() {
  const axisKey = current.params.axis;
  const axisDef = ChiriusKnockout.KNOCKOUT_AXES[axisKey];
  header("Knockout", true, () => go("knockout"));

  if (!axisDef) { go("knockout", {}, false); return; }

  if (!current.params.block) {
    let block;
    try {
      const lastChamp = getKnockoutLastChampion(axisKey);
      block = ChiriusKnockout.buildKnockoutBlock(WINES, axisKey, 6, null, lastChamp);
    } catch (e) {
      go("knockout", {}, false);
      return;
    }
    current.params.block = block;
    current.params.roundIndex = 0;
    current.params.playerCorrect = 0;
    current.params.hintsLeft = 2;
    current.params.guessId = null;
  }

  const block = current.params.block;
  const roundIndex = current.params.roundIndex;

  if (roundIndex >= block.rounds.length) {
    renderKnockoutEnd(axisKey, block, current.params.playerCorrect);
    return;
  }

  const round = block.rounds[roundIndex];
  const champion = findWine(round.championId);
  const challenger = findWine(round.challengerId);
  if (!champion || !challenger) { go("knockout", {}, false); return; }

  if (current.params.cardOrderRound !== roundIndex) {
    current.params.cardOrder = Math.random() < 0.5 ? ["champion", "challenger"] : ["challenger", "champion"];
    current.params.cardOrderRound = roundIndex;
    current.params.hintPeek = false;
  }

  let streak = 1;
  for (let i = roundIndex - 1; i >= 0; i--) {
    if (block.rounds[i].winnerId === round.championId) streak++;
    else break;
  }

  const progressLine = document.createElement("p");
  progressLine.className = "testme-counter";
  progressLine.textContent = `Round ${roundIndex + 1} of ${block.rounds.length} \u00b7 ${current.params.playerCorrect} correct so far`;
  app.appendChild(progressLine);

  const prompt = document.createElement("p");
  prompt.className = "hero-name";
  prompt.style.textAlign = "center";
  prompt.style.marginBottom = "4px";
  prompt.textContent = axisDef.label;
  app.appendChild(prompt);

  const streakLine = document.createElement("p");
  streakLine.className = "knockout-streak";
  streakLine.innerHTML = `${champion.name}'s streak: <b>${streak}</b> round${streak === 1 ? "" : "s"}`;
  app.appendChild(streakLine);

  const matchup = document.createElement("div");
  matchup.className = "matchup";
  const revealed = !!current.params.guessId;
  const roles = { champion, challenger };

  current.params.cardOrder.forEach((role) => {
    const wine = roles[role];
    const card = document.createElement("div");
    card.className = "wcard";
    const isWinner = wine.id === round.winnerId;
    let badge = "";
    if (revealed) {
      if (isWinner) { card.classList.add("correct"); badge = `<div class="wcard-badge">&#10003;</div>`; }
      else if (wine.id === current.params.guessId) { card.classList.add("wrong"); badge = `<div class="wcard-badge">&#10005;</div>`; }
    }
    const val = wine.structure[axisKey];
    const showBand = revealed || current.params.hintPeek;
    const bandLine = showBand ? `<div class="wcard-meta" style="color:var(--bronze-200); margin-top:4px;">${WSET_BANDS[axisKey][val - 1]}</div>` : "";
    card.innerHTML = `
      ${badge}
      <div class="wcard-crown">${role === "champion" ? "\u2605 Champion" : "&nbsp;"}</div>
      <div class="wcard-icon">${knockoutWineIcon(wine)}</div>
      <p class="wcard-name">${wine.name}</p>
      <div class="wcard-meta">${wine.grape}<br>${wine.region}</div>
      ${bandLine}
    `;
    if (!revealed) {
      card.onclick = () => {
        current.params.guessId = wine.id;
        if (isWinner) current.params.playerCorrect++;
        render();
      };
    }
    matchup.appendChild(card);
  });
  app.appendChild(matchup);

  if (!revealed && current.params.hintsLeft > 0 && !current.params.hintPeek) {
    const hintRow = document.createElement("div");
    hintRow.className = "knockout-hint-row";
    hintRow.innerHTML = `<button class="knockout-hint-btn">Hint &middot; ${current.params.hintsLeft} left</button>`;
    hintRow.querySelector("button").onclick = () => {
      current.params.hintsLeft--;
      current.params.hintPeek = true;
      render();
    };
    app.appendChild(hintRow);
  }

  if (revealed) {
    const winner = findWine(round.winnerId);
    const loser = winner.id === champion.id ? challenger : champion;
    const winnerBand = WSET_BANDS[axisKey][winner.structure[axisKey] - 1];
    const loserBand = WSET_BANDS[axisKey][loser.structure[axisKey] - 1];
    const guessedRight = current.params.guessId === round.winnerId;
    const explain = document.createElement("div");
    explain.className = "tot-explain knockout-explain";
    explain.innerHTML = `
      <p class="tot-verdict">${guessedRight ? "&#9989; That's right." : "&#10060; Not quite."}</p>
      <p class="pairing-reason">${winner.name} shows ${winnerBand} ${axisKey}, ahead of ${loser.name}'s ${loserBand}.</p>
      <button class="footer-btn footer-btn-home">Next round &rarr;</button>
    `;
    explain.querySelector("button").onclick = () => {
      current.params.roundIndex++;
      current.params.guessId = null;
      render();
    };
    app.appendChild(explain);
  }
}

function renderKnockoutEnd(axisKey, block, playerCorrect) {
  app.innerHTML = "";
  header("Knockout", true, () => go("knockout"));

  const { maxStreak, finalStreak } = knockoutStreaks(block.rounds);
  const finalChampion = findWine(block.finalChampionId);
  const best = getKnockoutBest(axisKey);
  const isRecord = maxStreak > best;
  if (isRecord) { setKnockoutBest(axisKey, maxStreak); celebrate(); }
  setKnockoutLastChampion(axisKey, block.finalChampionId);

  const wrap = document.createElement("div");
  wrap.className = "speed-end";
  wrap.innerHTML = `
    <p class="speed-end-icon">&#128081;</p>
    <p class="speed-end-score">${playerCorrect}<span class="speed-end-total">/${block.rounds.length}</span></p>
    <p class="speed-end-label">correct calls \u00b7 ${axisKey}</p>
    <p class="speed-end-best">${isRecord ? "&#127942; New personal best streak!" : `Best streak so far: ${best}`}</p>
    <p class="knockout-streak" style="margin-top:14px;">Reigning champion: <b>${finalChampion ? finalChampion.name : "\u2014"}</b> (${finalStreak} round${finalStreak === 1 ? "" : "s"} running)</p>
    <p class="knockout-streak" style="margin-top:2px; text-transform:none; font-size:9px;">${finalChampion ? finalChampion.name : "This wine"} sits out the next ${axisKey} session</p>
  `;
  app.appendChild(wrap);

  const btnRow = document.createElement("div");
  btnRow.className = "card-footer-nav";
  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "Game Room";
  backBtn.onclick = () => go("game-room");
  const againBtn = document.createElement("button");
  againBtn.className = "footer-btn footer-btn-home";
  againBtn.textContent = "Play Again \u{1F451}";
  againBtn.onclick = () => go("knockout-run", { axis: axisKey });
  btnRow.appendChild(backBtn);
  btnRow.appendChild(againBtn);
  app.appendChild(btnRow);
}

/* ---------- Allergy Sort: survival streak, drag real dishes into "contains X" /
   "X-free" bins. A random allergen each round (never the same as the round
   just played); one wrong card on the guess ends the run. Round data comes
   from allergy-sort-engine.js (window.ChiriusAllergySort), built from DISHES'
   real allergensInRecipe field -- dishes with no allergen data are never
   shown, never assumed allergen-free. Session progress (streak, previous
   allergen) lives in current.params so it survives the go() call between
   rounds; everything within a single round is managed by direct DOM
   mutation, not repeated calls to the global render() -- a mid-drag
   render() would tear down the very card being dragged, same reasoning as
   the existing Test Me swipe screen. */

function renderAllergyIntro() {
  header("Allergy Sort", true, () => go("game-room"));

  const eyebrow = document.createElement("p");
  eyebrow.className = "hero-meta strong";
  eyebrow.style.textAlign = "center";
  eyebrow.textContent = "Survival Streak";
  app.appendChild(eyebrow);

  const title = document.createElement("p");
  title.className = "hero-name";
  title.style.textAlign = "center";
  title.textContent = "Sort by allergen.";
  app.appendChild(title);

  const sub = document.createElement("p");
  sub.className = "testme-counter";
  sub.style.textTransform = "none";
  sub.style.letterSpacing = "normal";
  sub.style.fontFamily = "var(--font-body)";
  sub.style.fontSize = "13px";
  sub.style.lineHeight = "1.5";
  sub.style.margin = "0 0 18px";
  sub.textContent = "Six real dishes, one allergen. Drag each into the right bin. Clear all six and the streak continues with a new allergen \u2014 one miss ends it.";
  app.appendChild(sub);

  const best = getAllergyBestStreak();
  if (best > 0) {
    const bestLine = document.createElement("p");
    bestLine.className = "testme-counter";
    bestLine.textContent = "Best streak: " + best;
    app.appendChild(bestLine);
  }

  const playBtn = document.createElement("button");
  playBtn.className = "btn-start";
  playBtn.style.width = "100%";
  playBtn.style.marginTop = "8px";
  playBtn.textContent = "Play";
  playBtn.onclick = () => go("allergy-sort-run", { streak: 0, prevAllergen: null });
  app.appendChild(playBtn);
}

const ALLERGY_BEST_STREAK_KEY = "p131-best-allergy-streak";
function getAllergyBestStreak() {
  try { return parseInt(localStorage.getItem(ALLERGY_BEST_STREAK_KEY)) || 0; } catch (e) { return 0; }
}
function setAllergyBestStreak(val) {
  try { localStorage.setItem(ALLERGY_BEST_STREAK_KEY, String(val)); } catch (e) {}
}

function pickRandomAllergen(excludeAllergen) {
  const pool = ChiriusAllergySort.ALLERGY_SORT_PLAYABLE.filter((a) => {
    if (a === excludeAllergen) return false;
    const p = ChiriusAllergySort.buildAllergenPool(DISHES, a);
    return p.has.length >= 3 && p.without.length >= 3;
  });
  const finalPool = pool.length > 0 ? pool : ChiriusAllergySort.ALLERGY_SORT_PLAYABLE;
  return finalPool[Math.floor(Math.random() * finalPool.length)];
}

function renderAllergySortRun() {
  const streak = current.params.streak || 0;
  const prevAllergen = current.params.prevAllergen || null;
  const allergen = pickRandomAllergen(prevAllergen);
  const label = ChiriusAllergySort.ALLERGY_SORT_LABELS[allergen];
  header("Allergy Sort", true, () => go("allergy-sort"));

  let round;
  try {
    round = ChiriusAllergySort.buildSortRound(DISHES, allergen, 6);
  } catch (e) {
    go("game-room", {}, false);
    return;
  }

  const streakLine = document.createElement("p");
  streakLine.className = "testme-counter";
  streakLine.textContent = "Round " + (streak + 1) + " \u00b7 streak: " + streak;
  app.appendChild(streakLine);

  const prompt = document.createElement("p");
  prompt.className = "hero-name";
  prompt.style.textAlign = "center";
  prompt.style.marginBottom = "2px";
  prompt.textContent = "Contains " + label + "?";
  app.appendChild(prompt);

  const deckCountLine = document.createElement("p");
  deckCountLine.className = "testme-counter";
  app.appendChild(deckCountLine);

  const bins = document.createElement("div");
  bins.className = "asort-bins";
  bins.innerHTML = `
    <div class="asort-bin">
      <p class="asort-bin-header">Contains ${label}</p>
      <div class="asort-well" data-bin="has"><div class="asort-count">0</div></div>
    </div>
    <div class="asort-bin">
      <p class="asort-bin-header">${label}-Free</p>
      <div class="asort-well" data-bin="without"><div class="asort-count">0</div></div>
    </div>
  `;
  app.appendChild(bins);
  const binHas = bins.querySelector('[data-bin="has"]');
  const binWithout = bins.querySelector('[data-bin="without"]');
  const countHas = binHas.querySelector(".asort-count");
  const countWithout = binWithout.querySelector(".asort-count");

  const deckZone = document.createElement("div");
  deckZone.className = "asort-deck-zone";
  app.appendChild(deckZone);

  const guessBtn = document.createElement("button");
  guessBtn.className = "footer-btn footer-btn-home";
  guessBtn.style.width = "100%";
  guessBtn.style.marginTop = "14px";
  guessBtn.disabled = true;
  guessBtn.textContent = "Sort all 6 to guess";
  app.appendChild(guessBtn);

  const verdictArea = document.createElement("div");
  app.appendChild(verdictArea);

  // ---- state local to this round (intentionally not in current.params --
  // only streak/prevAllergen need to survive the jump to the next round) ----
  let deckIndex = 0;
  const placements = {};

  function allCorrect() {
    return round.cards.every((c) => placements[c.id] === c.truth);
  }

  function renderCounts() {
    countHas.textContent = Object.values(placements).filter((v) => v === "has").length;
    countWithout.textContent = Object.values(placements).filter((v) => v === "without").length;
    deckCountLine.textContent = (round.cards.length - deckIndex) + " of " + round.cards.length + " left to sort";
    guessBtn.disabled = deckIndex < round.cards.length;
    guessBtn.textContent = deckIndex < round.cards.length ? "Sort all 6 to guess" : "Guess";
  }

  function placedCardEl(dish, revealed) {
    const el = document.createElement("div");
    el.className = "asort-placed";
    if (revealed) {
      const isCorrect = placements[dish.id] === dish.truth;
      el.classList.add(isCorrect ? "correct" : "wrong");
      el.innerHTML = `<span class="asort-badge">${isCorrect ? "&#10003;" : "&#10005;"}</span>${dish.name}`;
      el.classList.add("learn");
      el.onclick = () => {
        learnPanelFor(dish);
      };
    } else {
      el.textContent = dish.name;
    }
    return el;
  }

  let learnPanel = null;
  function learnPanelFor(dish) {
    if (learnPanel) learnPanel.remove();
    learnPanel = document.createElement("div");
    learnPanel.className = "asort-learn-panel show";
    learnPanel.innerHTML = `<b>${dish.name}</b> (${dish.section}) contains: ${dish.allergens.join(", ")}.`;
    verdictArea.appendChild(learnPanel);
  }

  function renderBins(revealed) {
    binHas.querySelectorAll(".asort-placed").forEach((e) => e.remove());
    binWithout.querySelectorAll(".asort-placed").forEach((e) => e.remove());
    round.cards.forEach((dish) => {
      if (!(dish.id in placements)) return;
      const target = placements[dish.id] === "has" ? binHas : binWithout;
      target.appendChild(placedCardEl(dish, revealed));
    });
  }

  function commitPlacement(dish, bin) {
    placements[dish.id] = bin;
    deckIndex++;
    renderBins(false);
    renderCounts();
    spawnActiveCard();
  }

  function spawnActiveCard() {
    deckZone.querySelectorAll(".asort-active, .asort-fallback-row").forEach((e) => e.remove());
    if (deckIndex >= round.cards.length) return;
    const dish = round.cards[deckIndex];
    const card = document.createElement("div");
    card.className = "asort-active";
    card.innerHTML = `
      <p class="asort-active-section">${dish.section}</p>
      <p class="asort-active-name">${dish.name}</p>
      <p class="asort-active-desc">${dish.desc}</p>
    `;
    const fallbackRow = document.createElement("div");
    fallbackRow.className = "asort-fallback-row";
    const hasBtn = document.createElement("button");
    hasBtn.className = "asort-fallback-btn";
    hasBtn.textContent = "\u2190 Contains it";
    hasBtn.onclick = () => commitPlacement(dish, "has");
    const withoutBtn = document.createElement("button");
    withoutBtn.className = "asort-fallback-btn";
    withoutBtn.textContent = "Free of it \u2192";
    withoutBtn.onclick = () => commitPlacement(dish, "without");
    fallbackRow.appendChild(hasBtn);
    fallbackRow.appendChild(withoutBtn);

    deckZone.appendChild(card);
    deckZone.appendChild(fallbackRow);
    attachDrag(card, dish);
  }

  function attachDrag(card, dish) {
    let startX = 0, startY = 0, dragging = false;
    const threshold = 55;

    function onDown(e) {
      const p = e.touches ? e.touches[0] : e;
      startX = p.clientX; startY = p.clientY; dragging = true;
      card.style.transition = "none";
    }
    function onMove(e) {
      if (!dragging) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - startX, dy = p.clientY - startY;
      card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 20}deg)`;
      binHas.classList.toggle("drag-over", dx < -threshold);
      binWithout.classList.toggle("drag-over", dx > threshold);
      if (e.cancelable) e.preventDefault();
    }
    function onUp(e) {
      if (!dragging) return;
      dragging = false;
      const p = e.changedTouches ? e.changedTouches[0] : e;
      const dx = p.clientX - startX;
      binHas.classList.remove("drag-over");
      binWithout.classList.remove("drag-over");
      if (Math.abs(dx) > threshold) {
        const bin = dx < 0 ? "has" : "without";
        card.style.transition = "transform 180ms ease, opacity 180ms ease";
        card.style.transform = `translate(${dx < 0 ? -260 : 260}px, -40px) rotate(${dx < 0 ? -20 : 20}deg)`;
        card.style.opacity = "0";
        setTimeout(() => commitPlacement(dish, bin), 160);
      } else {
        card.style.transition = "transform 180ms ease";
        card.style.transform = "translate(0,0) rotate(0)";
      }
    }

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onUp);
    card.addEventListener("pointercancel", onUp);
    card.addEventListener("touchstart", onDown, { passive: true });
    card.addEventListener("touchmove", onMove, { passive: false });
    card.addEventListener("touchend", onUp);
  }

  guessBtn.onclick = () => {
    if (deckIndex < round.cards.length) return;
    renderBins(true);
    verdictArea.innerHTML = "";
    guessBtn.disabled = true;
    const win = allCorrect();

    if (win) {
      const v = document.createElement("p");
      v.className = "tot-verdict";
      v.style.textAlign = "center";
      v.textContent = "\u2705 That's right!";
      const sub = document.createElement("p");
      sub.className = "asort-verdict-sub";
      sub.textContent = "Streak: " + (streak + 1) + ". On to the next allergen.";
      verdictArea.appendChild(v);
      verdictArea.appendChild(sub);
      const nextBtn = document.createElement("button");
      nextBtn.className = "footer-btn footer-btn-home";
      nextBtn.style.width = "100%";
      nextBtn.style.marginTop = "10px";
      nextBtn.textContent = "Next Round \u2192";
      nextBtn.onclick = () => go("allergy-sort-run", { streak: streak + 1, prevAllergen: allergen });
      verdictArea.appendChild(nextBtn);
    } else {
      const best = getAllergyBestStreak();
      const isRecord = streak > best;
      if (isRecord) { setAllergyBestStreak(streak); celebrate(); }
      const v = document.createElement("p");
      v.className = "tot-verdict";
      v.style.textAlign = "center";
      v.textContent = "\u274c Streak over";
      const sub = document.createElement("p");
      sub.className = "asort-verdict-sub";
      sub.textContent = `You cleared ${streak} round${streak === 1 ? "" : "s"} before this one. ${isRecord ? "New personal best!" : "Best streak: " + best}. Tap any card to see what's really in it.`;
      verdictArea.appendChild(v);
      verdictArea.appendChild(sub);
      const btnRow = document.createElement("div");
      btnRow.className = "card-footer-nav";
      const homeBtn = document.createElement("button");
      homeBtn.className = "footer-btn";
      homeBtn.textContent = "Game Room";
      homeBtn.onclick = () => go("game-room");
      const againBtn = document.createElement("button");
      againBtn.className = "footer-btn footer-btn-home";
      againBtn.textContent = "Play Again";
      againBtn.onclick = () => go("allergy-sort-run", { streak: 0, prevAllergen: null });
      btnRow.appendChild(homeBtn);
      btnRow.appendChild(againBtn);
      verdictArea.appendChild(btnRow);
    }
  };

  renderCounts();
  spawnActiveCard();
}

/* ---------- Learning: modules/courses, same engine for every restaurant ---------- */

function learningRowHTML(mod) {
  const status = moduleStatus(mod);
  const locked = status === "locked";
  const dotClass = status === "completed" ? "done" : (locked ? "locked" : "");
  const totalContent = moduleTotalContent(mod);
  const hasTest = mod.test && mod.test.length > 0;
  let metaText;
  if (status === "completed") metaText = "Completed \u00b7 100%";
  else if (status === "in-progress") {
    const p = getLearningProgress()[mod.id];
    const pct = Math.round(((p.furthest + 1) / totalContent) * 100);
    metaText = `${p.furthest + 1} of ${totalContent} sections \u00b7 ${pct}%`;
  } else if (locked) {
    const req = findLearningModule(mod.unlockAfter);
    metaText = `Unlocks after ${req ? req.title : "a previous module"}`;
  } else {
    metaText = `${totalContent} sections${hasTest ? " + test" : ""}`;
  }
  const pct = status === "completed" ? 100
    : status === "in-progress" ? Math.round(((getLearningProgress()[mod.id].furthest + 1) / totalContent) * 100)
    : 0;
  const rightHTML = status === "completed"
    ? `<span class="chev">&#10003;</span>`
    : locked
      ? `<span class="lock-ic">&#128274;</span>`
      : `<div class="mini-track"><div class="mini-fill" style="width:${pct}%"></div></div>`;
  return `
    <div class="list-row ${locked ? "locked" : ""}" data-module="${mod.id}" ${locked ? 'tabindex="-1" aria-disabled="true"' : ""}>
      <div class="list-row-main">
        <span class="mod-dot ${dotClass}"></span>
        <div class="list-row-text">
          <p>${mod.title}</p>
          <span>${metaText}</span>
        </div>
      </div>
      ${rightHTML}
    </div>
  `;
}

function renderLearningHub() {
  header("Learning");

  const groups = { "in-progress": [], "not-started": [], "locked": [], "completed": [] };
  LEARNING_MODULES.forEach(m => groups[moduleStatus(m)].push(m));

  const wrap = document.createElement("div");
  let html = "";
  if (groups["in-progress"].length) {
    html += `<p class="section-label">In Progress</p>` + groups["in-progress"].map(learningRowHTML).join("");
  }
  if (groups["not-started"].length || groups["locked"].length) {
    html += `<p class="section-label">Not Started</p>` + groups["not-started"].concat(groups["locked"]).map(learningRowHTML).join("");
  }
  if (groups["completed"].length) {
    html += `<p class="section-label">Completed</p>` + groups["completed"].map(learningRowHTML).join("");
  }
  wrap.innerHTML = html;
  wrap.querySelectorAll(".list-row").forEach(row => {
    if (row.classList.contains("locked")) return;
    row.onclick = () => go("learning-intro", { moduleId: row.dataset.module });
  });
  app.appendChild(wrap);
}

function renderLearningIntro(moduleId) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod) { go("learning-hub"); return; }

  const status = moduleStatus(mod);
  const p = getLearningProgress()[mod.id];
  const totalContent = moduleTotalContent(mod);
  const hasTest = mod.test && mod.test.length > 0;
  const pct = status === "completed" ? 100 : status === "in-progress" ? Math.round(((p.furthest + 1) / totalContent) * 100) : 0;
  const minutes = Math.max(1, Math.round((totalContent + (hasTest ? mod.test.length : 0)) * 1.5));
  const startLabel = status === "completed" ? "Review Module" : status === "in-progress" ? "Resume Module" : "Start Module";

  const wrap = document.createElement("div");
  wrap.className = "intro-wrap";
  wrap.innerHTML = `
    <p class="intro-eyebrow">${mod.category} \u00b7 Module</p>
    <h1 class="intro-title">${mod.title}</h1>
    <div class="intro-meta-row">
      <div class="intro-meta"><b>${totalContent}</b><span>Sections</span></div>
      ${hasTest ? `<div class="intro-meta"><b>${mod.test.length}</b><span>Test Qs</span></div>` : ""}
      <div class="intro-meta"><b>~${minutes}</b><span>Minutes</span></div>
      <div class="intro-meta"><b>${pct}%</b><span>Complete</span></div>
    </div>
    <button class="btn-start">${startLabel}</button>
  `;
  wrap.querySelector(".btn-start").onclick = () => {
    const pos = status === "completed" ? { chapterIndex: 0, sectionIndex: 0 } : resumeChapterPosition(mod);
    go("learning-chapter", { moduleId, chapterIndex: pos.chapterIndex, sectionIndex: pos.sectionIndex }, false);
  };
  app.appendChild(wrap);
}

function renderLearningChapter(moduleId, chapterIndex, sectionIndex) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod) { go("learning-hub"); return; }
  const chapters = moduleChapters(mod);
  if (!chapters.length) { go("learning-hub"); return; }
  chapterIndex = Math.max(0, Math.min(chapterIndex, chapters.length - 1));
  const chapter = chapters[chapterIndex];
  sectionIndex = Math.max(0, Math.min(sectionIndex, chapter.sections.length - 1));
    const section = chapter.sections[sectionIndex];
  if (sectionIndex === 0) {
    ChiriusAnalytics.track('learning_chapter_start', { module_id: moduleId, chapter_index: chapterIndex });
  }

  if (chapters.length > 1) {
    const chapterKicker = document.createElement("p");
    chapterKicker.className = "chapter-kicker";
    chapterKicker.textContent = `Chapter ${chapterIndex + 1} of ${chapters.length} \u00b7 ${chapter.title}`;
    app.appendChild(chapterKicker);
  }

  const dots = document.createElement("div");
  dots.className = "dots-row";
  dots.innerHTML = chapter.sections.map((_, i) => `<div class="dot-seg ${i <= sectionIndex ? "filled" : ""}"></div>`).join("");
  app.appendChild(dots);

  const body = document.createElement("div");
  body.className = "slide-body";
  const kicker = `Section ${sectionIndex + 1} of ${chapter.sections.length}`;

  if (section.type === "text") {
    body.innerHTML = `
      <p class="slide-kicker">${kicker}</p>
      <h2 class="slide-title">${section.title}</h2>
      <p class="slide-text">${section.body}</p>
      ${section.note ? `<div class="fact-block"><b>Why it matters</b><p>${section.note}</p></div>` : ""}
    `;
  } else if (section.type === "image") {
    body.innerHTML = `
      <p class="slide-kicker">${kicker}</p>
      <h2 class="slide-title">${section.title}</h2>
      <div class="illo-frame">
        ${section.imageUrl
          ? `<img src="${section.imageUrl}" alt="${section.title}" style="width:100%; display:block;">`
          : `<p class="empty-note">Image not yet added.</p>`}
      </div>
      ${section.caption ? `<p class="slide-text">${section.caption}</p>` : ""}
    `;
  } else if (section.type === "video") {
    body.innerHTML = `
      <p class="slide-kicker">${kicker}</p>
      <h2 class="slide-title">${section.title}</h2>
      <div class="video-frame" data-role="video-slot">
        ${section.videoUrl
          ? `<div class="play-btn"></div><span class="video-caption">${section.title}</span>`
          : `<p class="empty-note">Video not yet added.</p>`}
      </div>
      ${section.duration ? `<p class="video-time">${section.duration}</p>` : ""}
    `;
    const slot = body.querySelector('[data-role="video-slot"]');
    if (section.videoUrl) {
      slot.onclick = () => {
        slot.innerHTML = `<iframe src="${section.videoUrl}" style="width:100%; height:100%; border:none;" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        slot.onclick = null;
      };
    }
  }
  app.appendChild(body);

  const flat = flattenModuleContent(mod);
  const flatIdx = flat.findIndex(f => f.chapterIndex === chapterIndex && f.sectionIndex === sectionIndex);
  setLearningFurthest(moduleId, flatIdx);

  const isFirstOverall = chapterIndex === 0 && sectionIndex === 0;
  const isLastSectionInChapter = sectionIndex === chapter.sections.length - 1;
  const isLastChapter = chapterIndex === chapters.length - 1;
  const isVeryLast = isLastSectionInChapter && isLastChapter;
  const hasTest = mod.test && mod.test.length > 0;

  const nav = document.createElement("div");
  nav.className = "card-footer-nav";
  const prevBtn = document.createElement("button");
  prevBtn.className = "footer-btn";
  prevBtn.textContent = "\u2039 Previous";
  if (isFirstOverall) {
    prevBtn.disabled = true;
  } else if (sectionIndex === 0) {
    const prevChapter = chapters[chapterIndex - 1];
    prevBtn.onclick = () => go("learning-chapter", { moduleId, chapterIndex: chapterIndex - 1, sectionIndex: prevChapter.sections.length - 1 }, false);
  } else {
    prevBtn.onclick = () => go("learning-chapter", { moduleId, chapterIndex, sectionIndex: sectionIndex - 1 }, false);
  }
  const nextBtn = document.createElement("button");
  nextBtn.className = "footer-btn footer-btn-home";
  nextBtn.textContent = isVeryLast ? "Finish \u203a" : "Next \u203a";
    nextBtn.onclick = () => {
    if (!isLastSectionInChapter) {
      go("learning-chapter", { moduleId, chapterIndex, sectionIndex: sectionIndex + 1 }, false);
      return;
    }
    const chapterQuiz = chapter.quiz || [];
    if (chapterQuiz.length && !isChapterQuizPassed(moduleId, chapterIndex)) {
      go("learning-chapter-quiz", { moduleId, chapterIndex, quizIndex: 0 }, false);
      return;
    }
    if (!isLastChapter) {
      ChiriusAnalytics.track('learning_chapter_complete', { module_id: moduleId, chapter_index: chapterIndex });
      go("learning-chapter", { moduleId, chapterIndex: chapterIndex + 1, sectionIndex: 0 }, false);
    } else if (hasTest && mod.preTestVideo) {
      ChiriusAnalytics.track('learning_chapter_complete', { module_id: moduleId, chapter_index: chapterIndex });
      go("learning-pretest-video", { moduleId }, false);
    } else if (hasTest) {
      ChiriusAnalytics.track('learning_chapter_complete', { module_id: moduleId, chapter_index: chapterIndex });
      go("learning-test-intro", { moduleId }, false);
    } else {
      ChiriusAnalytics.track('learning_chapter_complete', { module_id: moduleId, chapter_index: chapterIndex });
      go("learning-complete", { moduleId }, false);
    }
  };
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  app.appendChild(nav);
}

/* ---------- Chapter mini-quizzes: mcq / sequence / sort ----------
   Each chapter can carry its own `quiz` array (separate from the module's
   trailing `test`). Every item must be answered correctly before the
   learner can continue -- wrong answers get feedback and another try,
   never a penalty. Once every item in a chapter's quiz has been passed
   once, that chapter is marked done and future visits skip straight
   through to the next chapter. */

function advanceAfterChapterQuiz(moduleId, chapterIndex) {
  setChapterQuizPassed(moduleId, chapterIndex);
  const mod = findLearningModule(moduleId);
  const chapters = moduleChapters(mod);
  const isLastChapter = chapterIndex === chapters.length - 1;
  const hasTest = mod.test && mod.test.length > 0;
  ChiriusAnalytics.track('learning_chapter_complete', { module_id: moduleId, chapter_index: chapterIndex });
  if (!isLastChapter) {
    go("learning-chapter", { moduleId, chapterIndex: chapterIndex + 1, sectionIndex: 0 }, false);
  } else if (hasTest && mod.preTestVideo) {
    go("learning-pretest-video", { moduleId }, false);
  } else if (hasTest) {
    go("learning-test-intro", { moduleId }, false);
  } else {
    go("learning-complete", { moduleId }, false);
  }
}

function renderChapterQuiz(moduleId, chapterIndex, quizIndex) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod) { go("learning-hub"); return; }
  const chapters = moduleChapters(mod);
  const chapter = chapters[chapterIndex];
  if (!chapter) { go("learning-hub"); return; }
  const quiz = chapter.quiz || [];
  if (!quiz.length) { advanceAfterChapterQuiz(moduleId, chapterIndex); return; }
  quizIndex = Math.max(0, Math.min(quizIndex, quiz.length - 1));
  const item = quiz[quizIndex];

  const kicker = document.createElement("p");
  kicker.className = "chapter-kicker";
  kicker.textContent = `${chapter.title} \u00b7 Chapter Quiz \u2014 ${quizIndex + 1} of ${quiz.length}`;
  app.appendChild(kicker);

  const dots = document.createElement("div");
  dots.className = "dots-row";
  dots.innerHTML = quiz.map((_, i) => `<div class="dot-seg ${i <= quizIndex ? "filled" : ""}"></div>`).join("");
  app.appendChild(dots);

  const onPass = () => {
    if (quizIndex === quiz.length - 1) advanceAfterChapterQuiz(moduleId, chapterIndex);
    else go("learning-chapter-quiz", { moduleId, chapterIndex, quizIndex: quizIndex + 1 }, false);
  };

  if (item.type === "mcq") renderChapterQuizMCQ(item, onPass);
  else if (item.type === "sequence") renderChapterQuizSequence(item, onPass);
  else if (item.type === "sort") renderChapterQuizSort(item, onPass);
}

function renderChapterQuizMCQ(item, onPass) {
  const body = document.createElement("div");
  body.className = "slide-body";
  body.innerHTML = `
    <h2 class="slide-title">${item.question}</h2>
    <div data-role="cq-opts"></div>
    <p class="quiz-feedback" data-role="cq-feedback" style="display:none"></p>
  `;
  const optsWrap = body.querySelector('[data-role="cq-opts"]');
  const feedback = body.querySelector('[data-role="cq-feedback"]');
  let solved = false;
  item.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    btn.textContent = opt;
    btn.onclick = () => {
      if (solved) return;
      if (i === item.correctIndex) {
        solved = true;
        btn.classList.add("correct");
        feedback.textContent = "Correct \u2014 nice.";
        feedback.style.display = "block";
        optsWrap.querySelectorAll(".quiz-opt").forEach(b => { b.style.opacity = b === btn ? "1" : "0.5"; });
        showChapterQuizContinue(body, onPass);
      } else {
        btn.classList.add("picked-wrong");
        feedback.textContent = "Not quite \u2014 give it another shot.";
        feedback.style.display = "block";
        setTimeout(() => btn.classList.remove("picked-wrong"), 500);
      }
    };
    optsWrap.appendChild(btn);
  });
  app.appendChild(body);
}

function showChapterQuizContinue(container, onPass) {
  const nav = document.createElement("div");
  nav.className = "card-footer-nav";
  const nextBtn = document.createElement("button");
  nextBtn.className = "footer-btn footer-btn-home";
  nextBtn.style.width = "100%";
  nextBtn.textContent = "Continue \u203a";
  nextBtn.onclick = onPass;
  nav.appendChild(nextBtn);
  container.appendChild(nav);
}

function renderChapterQuizSequence(item, onPass) {
  const body = document.createElement("div");
  body.className = "slide-body";
  body.innerHTML = `
    <h2 class="slide-title">${item.prompt}</h2>
    <p class="slide-text" style="margin-bottom:10px;">Tap each step in the correct order.</p>
    <div class="seq-slots" data-role="seq-slots"></div>
    <div class="seq-pool" data-role="seq-pool"></div>
    <p class="quiz-feedback" data-role="seq-feedback" style="display:none"></p>
  `;
  const slotsWrap = body.querySelector('[data-role="seq-slots"]');
  const poolWrap = body.querySelector('[data-role="seq-pool"]');
  const feedback = body.querySelector('[data-role="seq-feedback"]');

  const total = item.items.length;
  let placed = []; // ids in slot order

  function renderSlots() {
    slotsWrap.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const slot = document.createElement("div");
      slot.className = "seq-slot" + (placed[i] ? " filled" : "");
      if (placed[i]) {
        const label = item.items.find(it => it.id === placed[i]).label;
        slot.innerHTML = `<span class="seq-slot-num">${i + 1}</span><span>${label}</span>`;
        slot.onclick = () => { placed.splice(i, 1); renderSlots(); renderPool(); };
      } else {
        slot.innerHTML = `<span class="seq-slot-num">${i + 1}</span>`;
      }
      slotsWrap.appendChild(slot);
    }
  }
  const poolOrder = shuffleArr(item.items);
  function renderPool() {
    poolWrap.innerHTML = "";
    poolOrder.forEach(it => {
      if (placed.includes(it.id)) return;
      const chip = document.createElement("button");
      chip.className = "seq-chip";
      chip.textContent = it.label;
      chip.onclick = () => {
        if (placed.length >= total) return;
        placed.push(it.id);
        renderSlots();
        renderPool();
        if (placed.length === total) checkSequence();
      };
      poolWrap.appendChild(chip);
    });
  }
  function checkSequence() {
    const correct = placed.every((id, i) => id === item.correctOrder[i]);
    if (correct) {
      feedback.textContent = "That's the chain \u2014 correct.";
      feedback.style.display = "block";
      slotsWrap.querySelectorAll(".seq-slot").forEach(s => s.classList.add("correct"));
      showChapterQuizContinue(body, onPass);
    } else {
      feedback.textContent = "Not quite the right order \u2014 resetting, give it another go.";
      feedback.style.display = "block";
      slotsWrap.querySelectorAll(".seq-slot").forEach(s => s.classList.add("wrong"));
      setTimeout(() => { placed = []; feedback.style.display = "none"; renderSlots(); renderPool(); }, 900);
    }
  }

  renderSlots();
  renderPool();
  app.appendChild(body);
}

function renderChapterQuizSort(item, onPass) {
  const body = document.createElement("div");
  body.className = "slide-body";
  body.innerHTML = `
    <h2 class="slide-title">${item.prompt}</h2>
    <p class="testme-counter" data-role="sort-counter"></p>
    <div class="asort-bins">
      <div class="asort-bin">
        <p class="asort-bin-header">${item.groupALabel}</p>
        <div class="asort-well" data-bin="a"><div class="asort-count">0</div></div>
      </div>
      <div class="asort-bin">
        <p class="asort-bin-header">${item.groupBLabel}</p>
        <div class="asort-well" data-bin="b"><div class="asort-count">0</div></div>
      </div>
    </div>
    <div data-role="sort-deck"></div>
    <p class="quiz-feedback" data-role="sort-feedback" style="display:none"></p>
  `;
  app.appendChild(body);

  const counter = body.querySelector('[data-role="sort-counter"]');
  const binA = body.querySelector('[data-bin="a"]');
  const binB = body.querySelector('[data-bin="b"]');
  const countA = binA.querySelector(".asort-count");
  const countB = binB.querySelector(".asort-count");
  const deckZone = body.querySelector('[data-role="sort-deck"]');
  const feedback = body.querySelector('[data-role="sort-feedback"]');

  let queue = shuffleArr(item.chips);
  let deckIndex = 0;
  const results = {}; // id -> "a"|"b"

  function renderBin(bin, groupKey) {
    bin.querySelectorAll(".asort-placed").forEach(e => e.remove());
    queue.forEach(chip => {
      if (results[chip.id] !== groupKey) return;
      const el = document.createElement("div");
      el.className = "asort-placed";
      const isCorrect = chip.group === groupKey;
      el.classList.add(isCorrect ? "correct" : "wrong");
      el.innerHTML = `<span class="asort-badge">${isCorrect ? "&#10003;" : "&#10005;"}</span>${chip.label}`;
      bin.appendChild(el);
    });
  }

  function spawnCard() {
    deckZone.innerHTML = "";
    counter.textContent = (queue.length - deckIndex) + " of " + queue.length + " left";
    if (deckIndex >= queue.length) { finishPass(); return; }
    const chip = queue[deckIndex];
    const card = document.createElement("div");
    card.className = "asort-active";
    card.innerHTML = `<p class="asort-active-name">${chip.label}</p>`;
    const row = document.createElement("div");
    row.className = "asort-fallback-row";
    const btnA = document.createElement("button");
    btnA.className = "asort-fallback-btn";
    btnA.textContent = "\u2190 " + item.groupALabel;
    btnA.onclick = () => place("a");
    const btnB = document.createElement("button");
    btnB.className = "asort-fallback-btn";
    btnB.textContent = item.groupBLabel + " \u2192";
    btnB.onclick = () => place("b");
    row.appendChild(btnA);
    row.appendChild(btnB);
    deckZone.appendChild(card);
    deckZone.appendChild(row);

    function place(groupKey) {
      results[chip.id] = groupKey;
      deckIndex++;
      renderBin(binA, "a");
      renderBin(binB, "b");
      countA.textContent = Object.values(results).filter(v => v === "a").length;
      countB.textContent = Object.values(results).filter(v => v === "b").length;
      spawnCard();
    }
  }

  function finishPass() {
    const wrong = queue.filter(chip => results[chip.id] !== chip.group);
    if (!wrong.length) {
      feedback.textContent = "All sorted correctly.";
      feedback.style.display = "block";
      showChapterQuizContinue(body, onPass);
    } else {
      feedback.textContent = `${wrong.length} to fix \u2014 here they come again.`;
      feedback.style.display = "block";
      setTimeout(() => {
        queue = shuffleArr(wrong);
        deckIndex = 0;
        wrong.forEach(chip => { delete results[chip.id]; });
        renderBin(binA, "a"); renderBin(binB, "b");
        countA.textContent = "0"; countB.textContent = "0";
        feedback.style.display = "none";
        spawnCard();
      }, 1100);
    }
  }

  spawnCard();
}

function renderLearningPreTestVideo(moduleId) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod || !mod.preTestVideo) { go("learning-test-intro", { moduleId }, false); return; }
  const video = mod.preTestVideo;

  const wrap = document.createElement("div");
  wrap.className = "intro-wrap";
  wrap.innerHTML = `
    <p class="intro-eyebrow">${mod.category} \u00b7 Before the Test</p>
    <h1 class="intro-title">${video.title}</h1>
    <div class="video-embed-wrap">
      <iframe
        src="https://www.youtube.com/embed/${video.youtubeId}"
        title="${video.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
    <button class="btn-start" data-role="video-continue-btn">Continue to Final Test</button>
  `;
  wrap.querySelector('[data-role="video-continue-btn"]').onclick = () => go("learning-test-intro", { moduleId }, false);
  app.appendChild(wrap);
}

function renderLearningTestIntro(moduleId) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod) { go("learning-hub"); return; }
  const test = mod.test || [];
  if (!test.length) { go("learning-complete", { moduleId }, false); return; }

  const lock = finalTestLockStatus(moduleId);
  const wrap = document.createElement("div");
  wrap.className = "intro-wrap";

  if (lock.locked) {
    wrap.innerHTML = `
      <p class="intro-eyebrow">${mod.category} \u00b7 Final Test</p>
      <h1 class="intro-title">Locked for a Bit</h1>
      <p class="slide-text">Two attempts didn't clear 100% on this one. Take ${formatMmSs(lock.remainingMs)} to read back through the chapters \u2014 the test unlocks again after that.</p>
      <button class="btn-start" data-role="reread-btn">Review the Lessons</button>
      <button class="footer-btn" data-role="refresh-btn" style="margin-top:8px;">Check Again</button>
    `;
    wrap.querySelector('[data-role="reread-btn"]').onclick = () => go("learning-chapter", { moduleId, chapterIndex: 0, sectionIndex: 0 }, false);
    wrap.querySelector('[data-role="refresh-btn"]').onclick = () => go("learning-test-intro", { moduleId }, false);
    app.appendChild(wrap);
    return;
  }

  const attemptsUsed = lock.state.attemptsUsed || 0;
  const attemptsLeftLine = attemptsUsed === 0
    ? `${test.length} question${test.length === 1 ? "" : "s"} \u2014 you need every one right to pass.`
    : `You need 100% to pass. This is your last attempt before a 10-minute cooldown.`;

  wrap.innerHTML = `
    <p class="intro-eyebrow">${mod.category} \u00b7 Final Test</p>
    <h1 class="intro-title">Ready for the Test?</h1>
    <p class="slide-text">You've finished every chapter of ${mod.title}. ${attemptsLeftLine}</p>
    <div class="intro-meta-row">
      <div class="intro-meta"><b>${test.length}</b><span>Questions</span></div>
      <div class="intro-meta"><b>100%</b><span>To Pass</span></div>
    </div>
    <button class="btn-start">Start Test</button>
  `;
     wrap.querySelector(".btn-start").onclick = () => {
    clearFinalTestAnswers(moduleId);
    // Analytics: any new/alternate test-flow function (different pass
    // threshold, different UI) must carry this same track() call, with
    // the matching learning_test_complete call at its own pass/fail point.
    ChiriusAnalytics.track('learning_test_start', { module_id: moduleId, attempt_number: attemptsUsed + 1 });
    go("learning-test", { moduleId, index: 0 }, false);
  };
  app.appendChild(wrap);
}

function renderLearningTest(moduleId, index) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod) { go("learning-hub"); return; }
  const test = mod.test || [];
  if (!test.length) { go("learning-complete", { moduleId }, false); return; }

  const lock = finalTestLockStatus(moduleId);
  if (lock.locked) { go("learning-test-intro", { moduleId }, false); return; }

  index = Math.max(0, Math.min(index, test.length - 1));
  const q = test[index];
  const answers = getFinalTestAnswers(moduleId);

  const testKicker = document.createElement("p");
  testKicker.className = "chapter-kicker";
  testKicker.textContent = "Final Test \u2014 100% required";
  app.appendChild(testKicker);

  const dots = document.createElement("div");
  dots.className = "dots-row";
  dots.innerHTML = test.map((_, i) => `<div class="dot-seg ${i <= index ? "filled" : ""} ${answers[i] !== undefined ? "answered" : ""}"></div>`).join("");
  app.appendChild(dots);

  const body = document.createElement("div");
  body.className = "slide-body";
  const kicker = `Question ${index + 1} of ${test.length}`;
  body.innerHTML = `
    <p class="slide-kicker">${kicker}</p>
    <h2 class="slide-title">${q.question}</h2>
    <div data-role="quiz-opts"></div>
  `;
  const optsWrap = body.querySelector('[data-role="quiz-opts"]');
  let chosen = answers[index] !== undefined ? answers[index] : null;
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt" + (chosen === i ? " selected" : "");
    btn.textContent = opt;
    btn.onclick = () => {
      chosen = i;
      setFinalTestAnswer(moduleId, index, i);
      optsWrap.querySelectorAll(".quiz-opt").forEach((b, bi) => b.classList.toggle("selected", bi === i));
      nextBtn.disabled = false;
    };
    optsWrap.appendChild(btn);
  });
  app.appendChild(body);

  const isLast = index === test.length - 1;
  const nav = document.createElement("div");
  nav.className = "card-footer-nav";
  const prevBtn = document.createElement("button");
  prevBtn.className = "footer-btn";
  prevBtn.textContent = "\u2039 Previous";
  if (index === 0) { prevBtn.disabled = true; }
  else prevBtn.onclick = () => go("learning-test", { moduleId, index: index - 1 }, false);
  const nextBtn = document.createElement("button");
  nextBtn.className = "footer-btn footer-btn-home";
  nextBtn.textContent = isLast ? "Submit Test" : "Next \u203a";
  nextBtn.disabled = chosen === null;
  nextBtn.onclick = () => {
    if (chosen === null) return;
    if (isLast) {
      const finalAnswers = getFinalTestAnswers(moduleId);
      const wrongIndices = [];
      test.forEach((tq, i) => { if (finalAnswers[i] !== tq.correctIndex) wrongIndices.push(i); });
      const correctCount = test.length - wrongIndices.length;
            const passed = wrongIndices.length === 0;
      if (passed) {
        recordFinalTestPass(moduleId);
      } else {
        recordFinalTestFailure(moduleId);
      }
            const stateAfter = getFinalTestState(moduleId);
      // Analytics: see note at learning_test_start above -- any alternate
      // test-flow function needs this same call at its pass/fail point.
      ChiriusAnalytics.track('learning_test_complete', {
        module_id: moduleId,
        passed,
        correct_count: correctCount,
        total: test.length,
        attempts_used: stateAfter.attemptsUsed || 0,
        locked_out: !!stateAfter.lockedUntil
      });
      go("learning-test-result", { moduleId, correctCount, total: test.length, passed, wrongIndices }, false);
    } else {
      go("learning-test", { moduleId, index: index + 1 }, false);
    }
  };
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  app.appendChild(nav);
}

function renderLearningTestResult(moduleId, correctCount, total, passed, wrongIndices) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod) { go("learning-hub"); return; }
  wrongIndices = wrongIndices || [];

  const wrap = document.createElement("div");
  wrap.className = "complete-wrap";

  if (passed) {
    wrap.innerHTML = `
      <div class="complete-badge">&#127881;</div>
      <h2 class="complete-title">Congratulations!</h2>
      <p class="complete-sub">${correctCount} of ${total} \u2014 perfect score.</p>
    `;
    app.appendChild(wrap);

    const nav = document.createElement("div");
    nav.className = "card-footer-nav";
    const continueBtn = document.createElement("button");
    continueBtn.className = "footer-btn footer-btn-home";
    continueBtn.style.width = "100%";
    continueBtn.textContent = "Continue \u203a";
    continueBtn.onclick = () => go("learning-complete", { moduleId }, false);
    nav.appendChild(continueBtn);
    app.appendChild(nav);
    return;
  }

  const lock = finalTestLockStatus(moduleId);
  const test = mod.test || [];
  const missedList = wrongIndices.map(i => `<li>Question ${i + 1}: ${test[i] ? test[i].question : ""}</li>`).join("");

  if (lock.locked) {
    wrap.innerHTML = `
      <div class="complete-badge" style="background:var(--sumi-900); color:var(--error-500);">&#10005;</div>
      <h2 class="complete-title">${correctCount} of ${total} \u2014 Not Yet</h2>
      <p class="complete-sub">That was your second attempt without a perfect score. Take ${formatMmSs(lock.remainingMs)} to go back through the chapters before trying again.</p>
      <p class="slide-text" style="text-align:left; margin-top:10px;">You missed:</p>
      <ul class="missed-list">${missedList}</ul>
    `;
  } else {
    wrap.innerHTML = `
      <div class="complete-badge" style="background:var(--sumi-900); color:var(--error-500);">&#10005;</div>
      <h2 class="complete-title">${correctCount} of ${total} \u2014 Not Yet</h2>
      <p class="complete-sub">You need every question right to pass. Give it one more shot.</p>
      <p class="slide-text" style="text-align:left; margin-top:10px;">You missed:</p>
      <ul class="missed-list">${missedList}</ul>
    `;
  }
  app.appendChild(wrap);

  const nav = document.createElement("div");
  nav.className = "card-footer-nav";
  const hubBtn = document.createElement("button");
  hubBtn.className = "footer-btn";
  hubBtn.textContent = "Learning Hub";
  hubBtn.onclick = () => go("learning-hub");
  nav.appendChild(hubBtn);
  if (!lock.locked) {
    const retryBtn = document.createElement("button");
    retryBtn.className = "footer-btn footer-btn-home";
    retryBtn.textContent = "Try Again";
    retryBtn.onclick = () => go("learning-test-intro", { moduleId });
    nav.appendChild(retryBtn);
  } else {
    const reviewBtn = document.createElement("button");
    reviewBtn.className = "footer-btn footer-btn-home";
    reviewBtn.textContent = "Review the Lessons";
    reviewBtn.onclick = () => go("learning-chapter", { moduleId, chapterIndex: 0, sectionIndex: 0 });
    nav.appendChild(reviewBtn);
  }
  app.appendChild(nav);
}

function renderLearningComplete(moduleId) {
  header("Learning");
  const mod = findLearningModule(moduleId);
  if (!mod) { go("learning-hub"); return; }

  const firstTime = markLearningComplete(moduleId);
  if (firstTime) celebrate();

  const unlocked = LEARNING_MODULES.find(m => m.unlockAfter === moduleId && isModuleUnlocked(m));

  const wrap = document.createElement("div");
  wrap.className = "complete-wrap";
  wrap.innerHTML = `
    <div class="complete-badge">&#10003;</div>
    <h2 class="complete-title">Module Complete</h2>
    <p class="complete-sub">You finished ${mod.title}.</p>
    ${unlocked ? `<div class="milestone-strip"><p class="milestone-line">${unlocked.title} unlocked</p></div>` : ""}
  `;
  app.appendChild(wrap);

  const nav = document.createElement("div");
  nav.className = "card-footer-nav";
  const hubBtn = document.createElement("button");
  hubBtn.className = "footer-btn";
  hubBtn.textContent = "Learning Hub";
  hubBtn.onclick = () => go("learning-hub");
  nav.appendChild(hubBtn);
  if (unlocked) {
    const nextBtn = document.createElement("button");
    nextBtn.className = "footer-btn footer-btn-home";
    nextBtn.textContent = "Next Module \u203a";
    nextBtn.onclick = () => go("learning-intro", { moduleId: unlocked.id });
    nav.appendChild(nextBtn);
  }
  app.appendChild(nav);
}

/* ---------- This or That: judgment calls from real pairings ---------- */

/* This or That: dedicated progress store (a different skill than Test Me's recall) */
const TOT_PROGRESS_KEY = "p131-tot-progress";
function getTotProgress() {
  try { return JSON.parse(localStorage.getItem(TOT_PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function setTotProgress(dishId, status) {
  const p = getTotProgress();
  p[dishId] = status;
  try { localStorage.setItem(TOT_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}

let totPref = { difficulty: "easy", rounds: 10 };
let totQueues = {};

function totPool(focus) {
  let pool = DISHES.filter(d => d.pairedWineIds && d.pairedWineIds.length >= 2);
  if (focus && focus !== "all") pool = pool.filter(d => d.section === focus);
  return pool;
}

function structDist(a, b) {
  const s1 = a.structure, s2 = b.structure;
  return Math.abs(s1.tannin - s2.tannin) + Math.abs(s1.acidity - s2.acidity) + Math.abs(s1.body - s2.body) + Math.abs(s1.alcohol - s2.alcohol);
}

function buildTotQueue(focus) {
  const progress = getTotProgress();
  const learning = [], unseen = [], known = [];
  totPool(focus).forEach(d => {
    const status = progress[d.id];
    if (status === "learning") learning.push(d.id);
    else if (status === "known") known.push(d.id);
    else unseen.push(d.id);
  });
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  return [...shuffle(learning), ...shuffle(unseen), ...shuffle(known)];
}

function buildThisOrThatRound(dish, difficulty) {
  const correctWine = findWine(dish.pairedWineIds[0]);
  const sameStyle = WINES.filter(w => !dish.pairedWineIds.includes(w.id) && w.style === correctWine.style);
  const pool = sameStyle.length ? sameStyle : WINES.filter(w => !dish.pairedWineIds.includes(w.id));
  const sorted = [...pool].sort((a, b) =>
    difficulty === "hard"
      ? structDist(a, correctWine) - structDist(b, correctWine)
      : structDist(b, correctWine) - structDist(a, correctWine)
  );
  const distractor = sorted[0] || pool[Math.floor(Math.random() * pool.length)];
  return { dish, correctWine, distractor };
}

function contrastReason(correctWine, distractorWine) {
  const trait = getDominantTrait(correctWine);
  const dVal = distractorWine.structure[trait.trait];
  const cVal = correctWine.structure[trait.trait];
  const lack = {
    tannin: `${distractorWine.name} doesn't have enough tannin to cut through the richness here the way ${correctWine.name} does.`,
    acidity: `${distractorWine.name}'s acidity isn't bright enough to keep up with this dish the way ${correctWine.name}'s does.`,
    body: `${distractorWine.name} is too light on its own to stand up to this dish the way ${correctWine.name} does.`
  };
  const excess = {
    tannin: `${distractorWine.name}'s tannin would actually overpower this dish rather than complement it &mdash; more grip than this needs.`,
    acidity: `${distractorWine.name} is sharper than this dish calls for, cutting against flavors that don't need cutting.`,
    body: `${distractorWine.name} is heavier than this dish can support &mdash; it would bury the more delicate parts of the plate.`
  };
  if (dVal < cVal) return lack[trait.trait] || `${distractorWine.name} doesn't have quite the structure this dish is asking for.`;
  if (dVal > cVal) return excess[trait.trait] || `${distractorWine.name} brings more structure than this dish is actually asking for.`;
  return `${distractorWine.name} is close in style, but ${correctWine.name} still has the edge on real flavor affinity with this dish.`;
}

function totToggleRow() {
  const row = document.createElement("div");
  row.className = "speed-toggle" + (totPref.difficulty === "hard" ? " active" : "");
  row.innerHTML = `<span class="speed-icon">&#9878;&#65039;</span><span class="speed-text">Difficulty: ${totPref.difficulty === "hard" ? "Hard \u2014 closest structural match" : "Easy \u2014 obvious mismatch"}</span><span class="speed-state">${totPref.difficulty === "hard" ? "HARD" : "EASY"}</span>`;
  row.onclick = () => {
    totPref.difficulty = totPref.difficulty === "hard" ? "easy" : "hard";
    render();
  };
  return row;
}

function renderThisOrThat() {
  header("This or That");

  const progress = getTotProgress();
  const allPool = totPool("all");
  const knownCount = allPool.filter(d => progress[d.id] === "known").length;
  const status = document.createElement("p");
  status.className = "testme-counter";
  status.textContent = `${knownCount} of ${allPool.length} judgment calls mastered`;
  app.appendChild(status);

  app.appendChild(totToggleRow());

  const roundsLabel = document.createElement("p");
  roundsLabel.className = "testme-counter";
  roundsLabel.textContent = "How many rounds?";
  app.appendChild(roundsLabel);

  const options = document.createElement("div");
  options.className = "home-options";
  [5, 10, 15].forEach(n => {
    const opt = document.createElement("div");
    opt.className = "home-option";
    opt.innerHTML = `
      <div class="home-icon-circle">&#9878;&#65039;</div>
      <div class="home-option-text"><p>${n} rounds</p><span>${n <= 5 ? "Quick session" : n <= 10 ? "The standard" : "Full focus session"}</span></div>
    `;
    opt.onclick = () => { totPref.rounds = n; go("this-or-that-focus"); };
    options.appendChild(opt);
  });
  app.appendChild(options);
}

function renderThisOrThatFocus() {
  header("This or That");

  const intro = document.createElement("p");
  intro.className = "testme-counter";
  intro.textContent = "Focus on one section, or test the whole menu";
  app.appendChild(intro);

  const options = document.createElement("div");
  options.className = "home-options";

  const allOpt = document.createElement("div");
  allOpt.className = "home-option";
  allOpt.innerHTML = `<div class="home-icon-circle">&#127760;</div><div class="home-option-text"><p>All dishes</p><span>Everything in the pool</span></div>`;
  allOpt.onclick = () => go("this-or-that-run", { focus: "all" });
  options.appendChild(allOpt);

  const categories = SECTION_ORDER.filter(s => totPool(s).length >= 1);
  categories.forEach(cat => {
    const opt = document.createElement("div");
    opt.className = "home-option";
    opt.innerHTML = `<div class="home-icon-circle">${getSectionIcon(cat)}</div><div class="home-option-text"><p>${cat}</p><span>Just this section</span></div>`;
    opt.onclick = () => go("this-or-that-run", { focus: cat });
    options.appendChild(opt);
  });
  app.appendChild(options);
}

function renderThisOrThatRun() {
  const focus = current.params.focus || "all";
  const qKey = focus;
  header("This or That");

  if (typeof current.params.roundNum !== "number") {
    current.params.roundNum = 1;
    current.params.correct = 0;
  }
  if (!totQueues[qKey] || !totQueues[qKey].length) totQueues[qKey] = buildTotQueue(focus);

  if (current.params.roundNum > totPref.rounds) {
    renderTotEnd(focus, current.params.correct, totPref.rounds);
    return;
  }

  const dishId = totQueues[qKey][0];
  const dish = findDish(dishId);
  if (!dish) { totQueues[qKey] = []; go("game-room", {}, false); return; }
  const round = buildThisOrThatRound(dish, totPref.difficulty);
  const { correctWine, distractor } = round;
  const options = Math.random() < 0.5 ? [correctWine, distractor] : [distractor, correctWine];

  const progressLine = document.createElement("p");
  progressLine.className = "testme-counter";
  progressLine.textContent = `Round ${current.params.roundNum} of ${totPref.rounds} \u00b7 ${current.params.correct} correct so far`;
  app.appendChild(progressLine);

  const prompt = document.createElement("div");
  prompt.innerHTML = `
    <p class="testme-counter">A guest orders the&hellip;</p>
    <p class="hero-name" style="text-align:center; margin-bottom:4px;">${dish.name}</p>
    <p class="hero-meta" style="text-align:center; margin-bottom:16px;">${dish.dropLine || dish.description || ""}</p>
    <p class="testme-counter">Which pour do you reach for?</p>
  `;
  app.appendChild(prompt);

  const optWrap = document.createElement("div");
  optWrap.className = "home-options";

  const explain = document.createElement("div");
  explain.className = "tot-explain";
  explain.style.display = "none";

  options.forEach(wine => {
    const opt = document.createElement("div");
    opt.className = "home-option";
    opt.innerHTML = `
      <div class="home-icon-circle">${wine.style === "sake" ? "\u{1F376}" : wine.style === "sparkling" ? "\u{1F942}" : "\u{1F377}"}</div>
      <div class="home-option-text"><p>${wine.name}</p><span>${wine.grape}</span></div>
    `;
    opt.onclick = () => {
      if (explain.style.display !== "none") return;
      const isCorrect = wine.id === correctWine.id;
      opt.classList.add(isCorrect ? "tot-correct" : "tot-wrong");
      setTotProgress(dish.id, isCorrect ? "known" : "learning");
      if (isCorrect) current.params.correct++;
      const reason = pairingReason(correctWine, dish);
      explain.innerHTML = `
        <p class="tot-verdict">${isCorrect ? "&#9989; That's the one." : `&#10060; The stronger call is <b>${correctWine.name}</b>.`}</p>
        <p class="pairing-reason">${reason.text}</p>
        <p class="tot-contrast-label">Why not the ${distractor.name}?</p>
        <p class="pairing-reason tot-contrast">${contrastReason(correctWine, distractor)}</p>
        <button class="footer-btn footer-btn-home tot-next">Next round &rarr;</button>
      `;
      explain.style.display = "block";
      explain.querySelector(".tot-next").onclick = () => {
        totQueues[qKey].shift();
        if (!isCorrect) totQueues[qKey].push(dish.id);
        if (!totQueues[qKey].length) totQueues[qKey] = buildTotQueue(focus);
        current.params.roundNum++;
        render();
      };
    };
    optWrap.appendChild(opt);
  });

  app.appendChild(optWrap);
  app.appendChild(explain);
}

function renderTotEnd(focus, correct, total) {
  app.innerHTML = "";
  header("This or That");
  const bestKey = "p131-best-tot-" + totPref.difficulty + "-" + total;
  let best = 0;
  try { best = parseInt(localStorage.getItem(bestKey)) || 0; } catch (e) {}
  const isRecord = correct > best;
  if (isRecord) {
    try { localStorage.setItem(bestKey, String(correct)); } catch (e) {}
    celebrate();
  }
  const progress = getTotProgress();
  const pool = totPool(focus);
  if (pool.length && pool.every(d => progress[d.id] === "known")) {
    markMilestone("tot-" + focus + "-complete");
  }

  const wrap = document.createElement("div");
  wrap.className = "speed-end";
  wrap.innerHTML = `
    <p class="speed-end-icon">&#9878;&#65039;</p>
    <p class="speed-end-score">${correct}<span class="speed-end-total">/${total}</span></p>
    <p class="speed-end-label">correct calls &middot; ${totPref.difficulty} difficulty</p>
    <p class="speed-end-best">${isRecord ? "&#127942; New personal best!" : `Personal best (${totPref.difficulty}, ${total} rounds): ${best}`}</p>
  `;
  app.appendChild(wrap);

  const btnRow = document.createElement("div");
  btnRow.className = "card-footer-nav";
  const againBtn = document.createElement("button");
  againBtn.className = "footer-btn footer-btn-home";
  againBtn.textContent = "Run it back \u2696\ufe0f";
  againBtn.onclick = () => go("this-or-that-run", { focus });
  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "Game Room";
  backBtn.onclick = () => go("game-room");
  btnRow.appendChild(backBtn);
  btnRow.appendChild(againBtn);
  app.appendChild(btnRow);
}

/* ---------- Match It: memory matching with rotating or chosen types ---------- */

const MATCH_TYPES = [
  { id: "region", label: "Wine \u2194 Region", icon: "\u{1F5FA}\uFE0F" },
  { id: "flavor", label: "Wine \u2194 Flavor", icon: "\u{1F347}" },
  { id: "pairing", label: "Wine \u2194 Dish", icon: "\u{1F37D}\uFE0F" },
  { id: "food", label: "Dish \u2194 Allergen", icon: "\u26A0\uFE0F" },
  { id: "cocktail", label: "Cocktail \u2194 Flavor", icon: "\u{1F378}" }
];
const MATCH_DIFFICULTIES = [
  { pairs: 3, label: "3 pairs", sub: "Warm-up" },
  { pairs: 4, label: "4 pairs", sub: "Standard" },
  { pairs: 6, label: "6 pairs", sub: "Full board" }
];

/* Dedicated progress store: matching is a recognition/association skill, distinct from recall (Test Me) or judgment (This or That) */
const MATCH_PROGRESS_KEY = "p131-match-progress";
function getMatchProgress() {
  try { return JSON.parse(localStorage.getItem(MATCH_PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function setMatchProgress(itemId, status) {
  const p = getMatchProgress();
  p[itemId] = status;
  try { localStorage.setItem(MATCH_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}

let matchPref = { pairs: 4 };

function matchEligiblePool(typeId) {
  if (typeId === "pairing") return WINES.filter(w => w.pairingDishIds.length);
  if (typeId === "food") return DISHES.filter(d => d.quizClue && d.allergensInRecipe && d.allergensInRecipe.length);
  if (typeId === "cocktail") return COCKTAILS;
  return WINES;
}

function renderMatchItPicker() {
  header("Match It");

  const progress = getMatchProgress();
  const allWines = WINES.filter(w => progress[w.id] === "known").length;
  const status = document.createElement("p");
  status.className = "testme-counter";
  status.textContent = `${allWines} of ${WINES.length} wines matched clean (no mistakes)`;
  app.appendChild(status);

  const diffLabel = document.createElement("p");
  diffLabel.className = "testme-counter";
  diffLabel.textContent = "Board size";
  app.appendChild(diffLabel);

  const diffRow = document.createElement("div");
  diffRow.className = "home-options";
  MATCH_DIFFICULTIES.forEach(d => {
    const opt = document.createElement("div");
    opt.className = "home-option" + (matchPref.pairs === d.pairs ? " tot-correct" : "");
    opt.innerHTML = `<div class="home-icon-circle">&#127183;</div><div class="home-option-text"><p>${d.label}</p><span>${d.sub}</span></div>`;
    opt.onclick = () => { matchPref.pairs = d.pairs; render(); };
    diffRow.appendChild(opt);
  });
  app.appendChild(diffRow);

  const intro = document.createElement("p");
  intro.className = "testme-counter";
  intro.textContent = "Pick a match type, or let it rotate";
  app.appendChild(intro);

  const options = document.createElement("div");
  options.className = "home-options";
  const rotate = document.createElement("div");
  rotate.className = "home-option";
  rotate.innerHTML = `
    <div class="home-icon-circle">&#128256;</div>
    <div class="home-option-text"><p>Rotate</p><span>A different match type every round</span></div>
  `;
  rotate.onclick = () => go("match-it", { matchType: "rotate" });
  options.appendChild(rotate);

  MATCH_TYPES.forEach(t => {
    const opt = document.createElement("div");
    opt.className = "home-option";
    opt.innerHTML = `
      <div class="home-icon-circle">${t.icon}</div>
      <div class="home-option-text"><p>${t.label}</p><span>Match only this type</span></div>
    `;
    opt.onclick = () => go("match-it", { matchType: t.id });
    options.appendChild(opt);
  });
  app.appendChild(options);
}

function buildMatchPairs(typeId, count) {
  const progress = getMatchProgress();
  const pool = matchEligiblePool(typeId);
  const learning = [], unseen = [], known = [];
  pool.forEach(item => {
    const status = progress[item.id];
    if (status === "learning") learning.push(item);
    else if (status === "known") known.push(item);
    else unseen.push(item);
  });
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const ordered = [...shuffle(learning), ...shuffle(unseen), ...shuffle(known)];

  const pairs = [];
  for (const item of ordered) {
    if (pairs.length >= count) break;
    if (typeId === "region") {
      pairs.push({ a: item.name, b: item.region, key: item.id });
    } else if (typeId === "flavor") {
      pairs.push({ a: item.name, b: item.flavorTags[0], key: item.id });
    } else if (typeId === "food") {
      const allergen = item.allergensInRecipe[0];
      pairs.push({ a: item.name, b: allergen.charAt(0).toUpperCase() + allergen.slice(1), key: item.id });
    } else if (typeId === "cocktail") {
      pairs.push({ a: item.name, b: item.flavorTags[0], key: item.id });
    } else {
      const dish = findDish(item.pairingDishIds[Math.floor(Math.random() * item.pairingDishIds.length)]);
      if (!dish) continue;
      pairs.push({ a: item.name, b: dish.name, key: item.id });
    }
  }
  return pairs;
}

function renderMatchIt(matchType) {
  const typeId = (matchType === "rotate" || !matchType)
    ? MATCH_TYPES[Math.floor(Math.random() * MATCH_TYPES.length)].id
    : matchType;
  const typeDef = MATCH_TYPES.find(t => t.id === typeId);
  const pairCount = matchPref.pairs;

  header("Match It");

  const label = document.createElement("p");
  label.className = "testme-counter";
  label.innerHTML = `${typeDef.icon} ${typeDef.label} &middot; ${pairCount} pairs`;
  app.appendChild(label);

  const moveCounter = document.createElement("p");
  moveCounter.className = "testme-counter";
  let moves = 0;
  let mistakes = 0;
  moveCounter.textContent = "0 moves";
  app.appendChild(moveCounter);

  const pairs = buildMatchPairs(typeId, pairCount);
  const mistakenKeys = new Set();
  let tiles = [];
  pairs.forEach(p => {
    tiles.push({ text: p.a, key: p.key, side: "a" });
    tiles.push({ text: p.b, key: p.key, side: "b" });
  });
  tiles.sort(() => Math.random() - 0.5);

  const grid = document.createElement("div");
  grid.className = "match-grid";
  let firstPick = null;
  let lock = false;
  let matchedCount = 0;

  tiles.forEach(t => {
    const tile = document.createElement("button");
    tile.className = "match-tile";
    tile.textContent = t.text;
    tile.dataset.key = t.key;
    tile.onclick = () => {
      if (lock || tile.classList.contains("matched") || tile === firstPick) return;
      tile.classList.add("picked");
      if (!firstPick) {
        firstPick = tile;
        return;
      }
      lock = true;
      moves++;
      moveCounter.textContent = moves + (moves === 1 ? " move" : " moves");
      if (firstPick.dataset.key === tile.dataset.key) {
        firstPick.classList.remove("picked");
        tile.classList.remove("picked");
        firstPick.classList.add("matched");
        tile.classList.add("matched");
        setMatchProgress(tile.dataset.key, mistakenKeys.has(tile.dataset.key) ? "learning" : "known");
        matchedCount++;
        firstPick = null;
        lock = false;
        if (matchedCount === pairs.length) {
          setTimeout(() => renderMatchEnd(typeId, pairCount, moves, mistakes), 500);
        }
      } else {
        mistakes++;
        mistakenKeys.add(firstPick.dataset.key);
        mistakenKeys.add(tile.dataset.key);
        setTimeout(() => {
          firstPick.classList.remove("picked");
          tile.classList.remove("picked");
          firstPick = null;
          lock = false;
        }, 650);
      }
    };
    grid.appendChild(tile);
  });

  app.appendChild(grid);
}

function renderMatchEnd(typeId, pairCount, moves, mistakes) {
  app.innerHTML = "";
  header("Match It");
  const bestKey = "p131-best-match-" + typeId + "-" + pairCount;
  let best = null;
  try { const v = localStorage.getItem(bestKey); best = v ? parseInt(v) : null; } catch (e) {}
  const isRecord = best === null || moves < best;
  if (isRecord) {
    try { localStorage.setItem(bestKey, String(moves)); } catch (e) {}
    celebrate();
  }
  markMilestone("match-" + typeId + "-" + pairCount + "-cleared");

  const wrap = document.createElement("div");
  wrap.className = "speed-end";
  wrap.innerHTML = `
    <p class="speed-end-icon">&#127183;</p>
    <p class="speed-end-score">${moves}</p>
    <p class="speed-end-label">moves \u00b7 ${mistakes} mismatch${mistakes === 1 ? "" : "es"}</p>
    <p class="speed-end-best">${isRecord ? "&#127942; New personal best!" : `Personal best: ${best} moves`}</p>
  `;
  app.appendChild(wrap);

  const btnRow = document.createElement("div");
  btnRow.className = "card-footer-nav";
  const againBtn = document.createElement("button");
  againBtn.className = "footer-btn footer-btn-home";
  againBtn.textContent = "Play again \u2192";
  againBtn.onclick = () => go("match-it", { matchType: typeId });
  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "Game Room";
  backBtn.onclick = () => go("game-room");
  btnRow.appendChild(backBtn);
  btnRow.appendChild(againBtn);
  app.appendChild(btnRow);
}

/* ---------- Speed round end screen ---------- */

function renderSpeedEnd(mode, score) {
  app.innerHTML = "";
  header("Quiz tool");
  const bestKey = "p131-best-speed-" + mode;
  let best = 0;
  try { best = parseInt(localStorage.getItem(bestKey)) || 0; } catch (e) {}
  const isRecord = score > best;
  if (isRecord) {
    try { localStorage.setItem(bestKey, String(score)); } catch (e) {}
    celebrate();
  }

  const wrap = document.createElement("div");
  wrap.className = "speed-end";
  wrap.innerHTML = `
    <p class="speed-end-icon">&#9889;</p>
    <p class="speed-end-score">${score}</p>
    <p class="speed-end-label">${mode === "food" ? "dishes" : mode === "mixed" ? "items" : mode === "cocktail" ? "cocktails" : "wines"} nailed in 60 seconds</p>
    <p class="speed-end-best">${isRecord ? "&#127942; New personal best!" : `Personal best: ${best}`}</p>
  `;
  app.appendChild(wrap);

  const btnRow = document.createElement("div");
  btnRow.className = "card-footer-nav";
  const againBtn = document.createElement("button");
  againBtn.className = "footer-btn footer-btn-home";
  againBtn.textContent = "Run it back \u26A1";
  againBtn.onclick = () => go("test-me-run", { mode });
  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "Game Room";
  backBtn.onclick = () => go("game-room");
  btnRow.appendChild(backBtn);
  btnRow.appendChild(againBtn);
  app.appendChild(btnRow);
}

/* ---------- Imposter: three share a trait, one doesn't ---------- */

/* Dedicated per-rule-type progress store: the skill here is spotting a category of pattern, not memorizing one item */
const IMPOSTER_PROGRESS_KEY = "p131-imposter-progress";
function getImposterProgress() {
  try { return JSON.parse(localStorage.getItem(IMPOSTER_PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function setImposterProgress(ruleType, status) {
  const p = getImposterProgress();
  p[ruleType] = status;
  try { localStorage.setItem(IMPOSTER_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}

let imposterPref = { difficulty: "easy", rounds: 10 };

function buildImposterRules(difficulty) {
  const rules = [];
  const allWines = WINES.concat(BOTTLE_WINES); // BTG + bottle list: full 167-wine pool

  // Region: data-driven, any region shared by 3+ wines (was hardcoded to Napa only)
  const regionCounts = {};
  allWines.forEach(w => { regionCounts[w.region] = (regionCounts[w.region] || 0) + 1; });
  Object.keys(regionCounts).filter(r => regionCounts[r] >= 3).forEach(region => {
    rules.push({ type: "region", pick: allWines.filter(w => w.region === region),
      exclude: allWines.filter(w => w.region !== region),
      why: `The other three are all from ${region}.` });
  });

  // Grape: single-varietal wines (grape field starts "100% X"), 3+ sharing the same grape
  const singleGrape = allWines.filter(w => /^100% /.test(w.grape));
  const grapeCounts = {};
  singleGrape.forEach(w => { grapeCounts[w.grape] = (grapeCounts[w.grape] || 0) + 1; });
  Object.keys(grapeCounts).filter(g => grapeCounts[g] >= 3).forEach(grape => {
    rules.push({ type: "grape", pick: allWines.filter(w => w.grape === grape),
      exclude: allWines.filter(w => w.grape !== grape),
      why: `The other three are all ${grape.replace("100% ", "")} &mdash; the imposter is a different grape or a blend.` });
  });

  // Style: sparkling / white / red / dessert / sake
  STYLE_ORDER.forEach(style => {
    const has = allWines.filter(w => w.style === style);
    const notHave = allWines.filter(w => w.style !== style);
    if (has.length >= 3 && notHave.length >= 1) {
      rules.push({ type: "style", pick: has, exclude: notHave,
        why: `The other three are all ${STYLE_LABELS[style].toLowerCase()} &mdash; the imposter is a different style entirely.` });
    }
  });

  if (difficulty === "hard") {
    rules.push({ type: "tannin", pick: allWines.filter(w => w.structure.tannin === 3), exclude: allWines.filter(w => w.structure.tannin === 2),
      why: "The other three all sit right at medium(+) tannin &mdash; the imposter is a notch softer, at medium." });
    rules.push({ type: "acidity", pick: allWines.filter(w => w.structure.acidity === 3), exclude: allWines.filter(w => w.structure.acidity === 2),
      why: "The other three all sit right at medium acidity &mdash; the imposter is a notch softer." });
    rules.push({ type: "body", pick: allWines.filter(w => w.structure.body === 3), exclude: allWines.filter(w => w.structure.body === 2),
      why: "The other three are all medium body &mdash; the imposter is a notch lighter." });
  } else {
    rules.push({ type: "tannin", pick: allWines.filter(w => w.structure.tannin >= 3), exclude: allWines.filter(w => w.structure.tannin <= 1),
      why: "The other three are structured, tannic reds &mdash; the imposter barely has any grip." });
    rules.push({ type: "acidity", pick: allWines.filter(w => w.structure.acidity >= 4), exclude: allWines.filter(w => w.structure.acidity <= 2),
      why: "The other three are all high-acid, fresh-style pours &mdash; the imposter is soft and round." });
    rules.push({ type: "body", pick: allWines.filter(w => w.structure.body >= 4), exclude: allWines.filter(w => w.structure.body <= 2),
      why: "The other three are all full-bodied &mdash; the imposter is noticeably lighter on the palate." });
    rules.push({ type: "body", pick: allWines.filter(w => w.structure.body <= 2), exclude: allWines.filter(w => w.structure.body >= 4),
      why: "The other three are all light-bodied &mdash; the imposter is much fuller and richer." });
  }

  DISHES.filter(d => d.pairedWineIds && d.pairedWineIds.length >= 3).forEach(dish => {
    rules.push({ type: "pairing", pick: dish.pairedWineIds.map(findWine).filter(Boolean),
      exclude: WINES.filter(w => !dish.pairedWineIds.includes(w.id)),
      why: `The other three are all listed pairings for the ${dish.name}.` });
  });

  const foodPool = DISHES.filter(d => d.quizClue);
  const allergenSet = [...new Set(foodPool.flatMap(d => d.allergensInRecipe || []))];
  allergenSet.forEach(a => {
    const has = foodPool.filter(d => (d.allergensInRecipe || []).includes(a));
    const notHave = foodPool.filter(d => !(d.allergensInRecipe || []).includes(a));
    if (has.length >= 3 && notHave.length >= 1) {
      rules.push({ type: "allergen", pick: has, exclude: notHave, itemType: "food",
        why: `The other three all contain ${a} &mdash; the imposter doesn't.` });
    }
  });

  ["sparkling", "white", "red", "sake"].forEach(style => {
    const has = foodPool.filter(d => d.pairedWineIds.length && findWine(d.pairedWineIds[0])?.style === style);
    const notHave = foodPool.filter(d => d.pairedWineIds.length && findWine(d.pairedWineIds[0])?.style !== style);
    if (has.length >= 3 && notHave.length >= 1) {
      rules.push({ type: "wine-style", pick: has, exclude: notHave, itemType: "food",
        why: `The other three are all primarily paired with a ${STYLE_LABELS[style].toLowerCase()} &mdash; the imposter's primary pairing is a different style.` });
    }
  });

  // Food section: 3+ dishes sharing a menu section (Starters, Sushi, Steaks, etc.)
  const sectionCounts = {};
  foodPool.forEach(d => { sectionCounts[d.section] = (sectionCounts[d.section] || 0) + 1; });
  Object.keys(sectionCounts).filter(s => sectionCounts[s] >= 3).forEach(section => {
    const has = foodPool.filter(d => d.section === section);
    const notHave = foodPool.filter(d => d.section !== section);
    if (notHave.length >= 1) {
      rules.push({ type: "food-section", pick: has, exclude: notHave, itemType: "food",
        why: `The other three are all from ${section} &mdash; the imposter comes from a different part of the menu.` });
    }
  });

  return rules.filter(r => r.pick.length >= 3 && r.exclude.length >= 1);
}

function buildImposterRound(difficulty) {
  const rules = buildImposterRules(difficulty);
  const progress = getImposterProgress();
  const types = [...new Set(rules.map(r => r.type))];
  const learning = types.filter(t => progress[t] === "learning");
  const other = types.filter(t => progress[t] !== "learning");
  const orderedTypes = Math.random() < 0.6 && learning.length ? learning : (learning.length && Math.random() < 0.35 ? learning : other.length ? other : types);
  const chosenType = orderedTypes[Math.floor(Math.random() * orderedTypes.length)];
  const candidates = rules.filter(r => r.type === chosenType);
  const rule = candidates[Math.floor(Math.random() * candidates.length)];
  const trio = [...rule.pick].sort(() => Math.random() - 0.5).slice(0, 3);
  const imposter = rule.exclude[Math.floor(Math.random() * rule.exclude.length)];
  return { trio, imposter, why: rule.why, type: rule.type, itemType: rule.itemType || "wine" };
}

function imposterToggleRow() {
  const row = document.createElement("div");
  row.className = "speed-toggle" + (imposterPref.difficulty === "hard" ? " active" : "");
  row.innerHTML = `<span class="speed-icon">&#128373;&#65039;</span><span class="speed-text">Difficulty: ${imposterPref.difficulty === "hard" ? "Hard \u2014 tight structural gaps" : "Easy \u2014 obvious mismatches"}</span><span class="speed-state">${imposterPref.difficulty === "hard" ? "HARD" : "EASY"}</span>`;
  row.onclick = () => { imposterPref.difficulty = imposterPref.difficulty === "hard" ? "easy" : "hard"; render(); };
  return row;
}

function renderImposterSetup() {
  header("Imposter");
  app.appendChild(imposterToggleRow());

  const roundsLabel = document.createElement("p");
  roundsLabel.className = "testme-counter";
  roundsLabel.textContent = "How many rounds?";
  app.appendChild(roundsLabel);

  const options = document.createElement("div");
  options.className = "home-options";
  [5, 10, 15].forEach(n => {
    const opt = document.createElement("div");
    opt.className = "home-option";
    opt.innerHTML = `<div class="home-icon-circle">&#128373;&#65039;</div><div class="home-option-text"><p>${n} rounds</p><span>${n <= 5 ? "Quick session" : n <= 10 ? "The standard" : "Full session"}</span></div>`;
    opt.onclick = () => { imposterPref.rounds = n; go("imposter-run"); };
    options.appendChild(opt);
  });
  app.appendChild(options);
}

function renderImposter() {
  if (typeof current.params.roundNum !== "number") {
    current.params.roundNum = 1;
    current.params.correct = 0;
  }
  header("Imposter");

  if (current.params.roundNum > imposterPref.rounds) {
    renderImposterEnd(current.params.correct, imposterPref.rounds);
    return;
  }

  const round = buildImposterRound(imposterPref.difficulty);
  if (!round) { go("game-room", {}, false); return; }
  const tiles = [...round.trio, round.imposter].sort(() => Math.random() - 0.5);

  const progressLine = document.createElement("p");
  progressLine.className = "testme-counter";
  progressLine.textContent = `Round ${current.params.roundNum} of ${imposterPref.rounds} \u00b7 ${current.params.correct} correct so far`;
  app.appendChild(progressLine);

  const intro = document.createElement("p");
  intro.className = "testme-counter";
  intro.textContent = "Three of these belong together. Tap the imposter.";
  app.appendChild(intro);

  const grid = document.createElement("div");
  grid.className = "match-grid";
  let done = false;

  const explain = document.createElement("div");
  explain.className = "tot-explain";
  explain.style.display = "none";

  tiles.forEach(item => {
    const tile = document.createElement("button");
    tile.className = "match-tile imposter-tile";
    const displayName = round.itemType === "food" ? item.name : item.producer;
    tile.innerHTML = `<b>${displayName}</b>`;
    tile.onclick = () => {
      if (done) return;
      done = true;
      const correct = item.id === round.imposter.id;
      setImposterProgress(round.type, correct ? "known" : "learning");
      if (correct) current.params.correct++;
      grid.querySelectorAll(".imposter-tile").forEach((t, i) => {
        t.classList.add("revealed");
        const full = tiles[i];
        t.innerHTML = round.itemType === "food"
          ? `<b>${full.name}</b>`
          : `<b>${full.producer}</b><br><span class="imposter-sub">${full.name}</span>`;
      });
      tile.classList.add(correct ? "matched" : "tot-wrong-tile");
      if (!correct) {
        [...grid.children].forEach((t, i) => {
          if (tiles[i].id === round.imposter.id) t.classList.add("matched");
        });
      }
      explain.innerHTML = `
        <p class="tot-verdict">${correct ? "&#9989; Found it." : `&#10060; The imposter was <b>${round.imposter.name}</b>.`}</p>
        <p class="pairing-reason">${round.why}</p>
        <button class="footer-btn footer-btn-home tot-next">Next round &rarr;</button>
      `;
      explain.style.display = "block";
      explain.querySelector(".tot-next").onclick = () => {
        current.params.roundNum++;
        render();
      };
    };
    grid.appendChild(tile);
  });

  app.appendChild(grid);
  app.appendChild(explain);
}

function renderImposterEnd(correct, total) {
  app.innerHTML = "";
  header("Imposter");
  const bestKey = "p131-best-imposter-" + imposterPref.difficulty + "-" + total;
  let best = 0;
  try { best = parseInt(localStorage.getItem(bestKey)) || 0; } catch (e) {}
  const isRecord = correct > best;
  if (isRecord) {
    try { localStorage.setItem(bestKey, String(correct)); } catch (e) {}
    celebrate();
  }

  const wrap = document.createElement("div");
  wrap.className = "speed-end";
  wrap.innerHTML = `
    <p class="speed-end-icon">&#128373;&#65039;</p>
    <p class="speed-end-score">${correct}<span class="speed-end-total">/${total}</span></p>
    <p class="speed-end-label">imposters found \u00b7 ${imposterPref.difficulty} difficulty</p>
    <p class="speed-end-best">${isRecord ? "&#127942; New personal best!" : `Personal best (${imposterPref.difficulty}, ${total} rounds): ${best}`}</p>
  `;
  app.appendChild(wrap);

  const btnRow = document.createElement("div");
  btnRow.className = "card-footer-nav";
  const againBtn = document.createElement("button");
  againBtn.className = "footer-btn footer-btn-home";
  againBtn.textContent = "Run it back \u{1F575}\uFE0F";
  againBtn.onclick = () => go("imposter-run");
  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "Game Room";
  backBtn.onclick = () => go("game-room");
  btnRow.appendChild(backBtn);
  btnRow.appendChild(againBtn);
  app.appendChild(btnRow);
}

/* ---------- Sommelier Says: rapid-fire true/false against the clock ---------- */

/* Dedicated per-statement-type progress store: the skill is discriminating fact categories, not memorizing one wine */
const SOMM_PROGRESS_KEY = "p131-somm-progress";
function getSommProgress() {
  try { return JSON.parse(localStorage.getItem(SOMM_PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}
function setSommProgress(type, status) {
  const p = getSommProgress();
  p[type] = status;
  try { localStorage.setItem(SOMM_PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
}
let sommPref = { difficulty: "easy" };

function buildCocktailStatement(difficulty) {
  const cocktail = COCKTAILS[Math.floor(Math.random() * COCKTAILS.length)];
  const isTrue = Math.random() < 0.5;
  const types = ["cocktail-glass", "cocktail-method"];
  const progress = getSommProgress();
  const learningTypes = types.filter(t => progress[t] === "learning");
  const pickFrom = learningTypes.length && Math.random() < 0.6 ? learningTypes : types;
  const type = pickFrom[Math.floor(Math.random() * pickFrom.length)];

  function otherCocktail(fieldFn) {
    let candidates = COCKTAILS.filter(c => c.id !== cocktail.id && fieldFn(c) !== fieldFn(cocktail));
    if (difficulty === "hard") {
      const sameMethod = candidates.filter(c => c.method === cocktail.method);
      if (sameMethod.length) candidates = sameMethod;
    }
    if (!candidates.length) return cocktail;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  if (type === "cocktail-glass") {
    const shown = isTrue ? cocktail.glassware : otherCocktail(c => c.glassware).glassware;
    return { type, text: `The ${cocktail.name} is served in a ${shown}.`, isTrue, correctText: `The ${cocktail.name} is served in a ${cocktail.glassware}.` };
  }
  const shown = isTrue ? cocktail.method : otherCocktail(c => c.method).method;
  return { type, text: `The ${cocktail.name} is built ${shown}.`, isTrue, correctText: `The ${cocktail.name} is built ${cocktail.method}.` };
}

function buildSommStatement(difficulty) {
  if (Math.random() < 0.3) return buildCocktailStatement(difficulty);

  const wine = WINES[Math.floor(Math.random() * WINES.length)];
  const isTrue = Math.random() < 0.5;
  const types = ["region", "grape", "pairing"];
  if (!wine.winemaker.toLowerCase().includes("team") && !wine.winemaker.toLowerCase().includes("toji")) types.push("winemaker");

  const progress = getSommProgress();
  const learningTypes = types.filter(t => progress[t] === "learning");
  const pickFrom = learningTypes.length && Math.random() < 0.6 ? learningTypes : types;
  const type = pickFrom[Math.floor(Math.random() * pickFrom.length)];

  function otherWine(fieldFn) {
    let candidates = WINES.filter(w => w.id !== wine.id && fieldFn(w) !== fieldFn(wine));
    if (difficulty === "hard") {
      const sameStyle = candidates.filter(w => w.style === wine.style);
      if (sameStyle.length) candidates = sameStyle;
    }
    if (!candidates.length) return wine;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  if (type === "region") {
    const shown = isTrue ? wine.region : otherWine(w => w.region).region;
    return { type, text: `${wine.name} comes from ${shown}.`, isTrue, correctText: `${wine.name} comes from ${wine.region}.` };
  }
  if (type === "grape") {
    const shown = isTrue ? wine.grape : otherWine(w => w.grape).grape;
    return { type, text: `${wine.name} is made from ${shown}.`, isTrue, correctText: `${wine.name} is made from ${wine.grape}.` };
  }
  if (type === "winemaker") {
    let namedOthers = WINES.filter(w => w.id !== wine.id && !w.winemaker.toLowerCase().includes("team") && !w.winemaker.toLowerCase().includes("toji") && w.winemaker !== wine.winemaker);
    if (difficulty === "hard") {
      const sameStyle = namedOthers.filter(w => w.style === wine.style);
      if (sameStyle.length) namedOthers = sameStyle;
    }
    if (isTrue || !namedOthers.length) {
      return { type, text: `${wine.name} is made by ${wine.winemaker}.`, isTrue: true, correctText: `${wine.name} is made by ${wine.winemaker}.` };
    }
    const other = namedOthers[Math.floor(Math.random() * namedOthers.length)];
    return { type, text: `${wine.name} is made by ${other.winemaker}.`, isTrue: false, correctText: `${wine.name} is made by ${wine.winemaker}.` };
  }
  // pairing
  const correctDish = wine.pairingDishIds.length ? findDish(wine.pairingDishIds[Math.floor(Math.random() * wine.pairingDishIds.length)]) : null;
  const correctPairingText = correctDish ? `${wine.name} is a listed pairing for the ${correctDish.name}.` : `${wine.name} has no listed pairings yet.`;
  if (isTrue && correctDish) {
    return { type, text: correctPairingText, isTrue: true, correctText: correctPairingText };
  }
  let nonPaired = DISHES.filter(d => d.pairedWineIds && d.pairedWineIds.length && !wine.pairingDishIds.includes(d.id));
  if (difficulty === "hard") {
    const sameStylePool = nonPaired.filter(d => findWine(d.pairedWineIds[0])?.style === wine.style);
    if (sameStylePool.length) nonPaired = sameStylePool;
  }
  const dish = nonPaired[Math.floor(Math.random() * nonPaired.length)];
  return { type, text: `${wine.name} is a listed pairing for the ${dish.name}.`, isTrue: false, correctText: correctPairingText };
}

function sommToggleRow() {
  const row = document.createElement("div");
  row.className = "speed-toggle" + (sommPref.difficulty === "hard" ? " active" : "");
  row.innerHTML = `<span class="speed-icon">&#9889;</span><span class="speed-text">Difficulty: ${sommPref.difficulty === "hard" ? "Hard \u2014 false swaps stay same style" : "Easy \u2014 false swaps from anywhere"}</span><span class="speed-state">${sommPref.difficulty === "hard" ? "HARD" : "EASY"}</span>`;
  row.onclick = () => { sommPref.difficulty = sommPref.difficulty === "hard" ? "easy" : "hard"; render(); };
  return row;
}

function renderSommSays() {
  header("Sommelier Says");

  const intro = document.createElement("p");
  intro.className = "testme-counter";
  intro.textContent = "True or false, as fast as you can.";
  app.appendChild(intro);

  app.appendChild(sommToggleRow());

  const durLabel = document.createElement("p");
  durLabel.className = "testme-counter";
  durLabel.textContent = "How long do you want?";
  app.appendChild(durLabel);

  const options = document.createElement("div");
  options.className = "home-options";
  [15, 30, 60, 90].forEach(s => {
    const opt = document.createElement("div");
    opt.className = "home-option";
    opt.innerHTML = `
      <div class="home-icon-circle">&#9200;</div>
      <div class="home-option-text"><p>${s} seconds</p><span>${s <= 15 ? "Lightning round" : s <= 30 ? "Quick hit" : s <= 60 ? "The standard" : "The marathon"}</span></div>
    `;
    opt.onclick = () => go("somm-says-run", { seconds: s });
    options.appendChild(opt);
  });
  app.appendChild(options);
}

function renderSommSaysRun(seconds) {
  seconds = [15, 30, 60, 90].includes(seconds) ? seconds : 30;
  header("Sommelier Says");

  if (typeof current.params.score !== "number") {
    current.params.score = 0;
    current.params.total = 0;
    current.params.streak = 0;
    current.params.bestStreak = 0;
    current.params.missed = [];
    current.params.endsAt = Date.now() + seconds * 1000;
  }
  const remaining = Math.max(0, current.params.endsAt - Date.now());
  if (remaining <= 0) { renderSommEnd(seconds, current.params); return; }

  const timerWrap = document.createElement("div");
  timerWrap.className = "timer-wrap";
  timerWrap.innerHTML = `
    <div class="timer-row"><span class="timer-score">&#9889; ${current.params.score}/${current.params.total}</span><span class="timer-count">${Math.ceil(remaining / 1000)}s</span></div>
    <div class="timer-track"><div class="timer-fill" style="width:${(remaining / (seconds * 1000)) * 100}%;"></div></div>
  `;
  app.appendChild(timerWrap);
  activeTimer = setInterval(() => {
    const left = Math.max(0, current.params.endsAt - Date.now());
    const countEl = timerWrap.querySelector(".timer-count");
    const fillEl = timerWrap.querySelector(".timer-fill");
    if (countEl) countEl.textContent = Math.ceil(left / 1000) + "s";
    if (fillEl) fillEl.style.width = (left / (seconds * 1000)) * 100 + "%";
    if (left <= 0) {
      clearInterval(activeTimer); activeTimer = null;
      renderSommEnd(seconds, current.params);
    }
  }, 250);

  if (current.params.streak >= 2) {
    const streakLine = document.createElement("p");
    streakLine.className = "somm-streak";
    streakLine.textContent = `\u{1F525} ${current.params.streak} in a row`;
    app.appendChild(streakLine);
  }

  const statement = buildSommStatement(sommPref.difficulty);
  const card = document.createElement("div");
  card.className = "somm-card";
  card.innerHTML = `<p class="somm-statement">${statement.text}</p>`;
  app.appendChild(card);

  const btnRow = document.createElement("div");
  btnRow.className = "somm-btn-row";
  const falseBtn = document.createElement("button");
  falseBtn.className = "somm-btn somm-false";
  falseBtn.textContent = "FALSE";
  const trueBtn = document.createElement("button");
  trueBtn.className = "somm-btn somm-true";
  trueBtn.textContent = "TRUE";

  function answer(saidTrue) {
    current.params.total++;
    const right = saidTrue === statement.isTrue;
    setSommProgress(statement.type, right ? "known" : "learning");
    if (right) {
      current.params.score++;
      current.params.streak++;
      if (current.params.streak > current.params.bestStreak) current.params.bestStreak = current.params.streak;
    } else {
      current.params.streak = 0;
      current.params.missed.push({ shown: statement.text, correct: statement.correctText });
    }
    card.classList.add(right ? "somm-flash-right" : "somm-flash-wrong");
    setTimeout(() => render(), 260);
  }
  falseBtn.onclick = () => answer(false);
  trueBtn.onclick = () => answer(true);
  btnRow.appendChild(falseBtn);
  btnRow.appendChild(trueBtn);
  app.appendChild(btnRow);
}

function renderSommEnd(seconds, params) {
  const { score, total, missed, bestStreak } = params;
  app.innerHTML = "";
  header("Sommelier Says");
  const bestKey = "p131-best-somm-" + sommPref.difficulty + "-" + seconds;
  let best = 0;
  try { best = parseInt(localStorage.getItem(bestKey)) || 0; } catch (e) {}
  const isRecord = score > best;
  if (isRecord) {
    try { localStorage.setItem(bestKey, String(score)); } catch (e) {}
    celebrate();
  }

  const wrap = document.createElement("div");
  wrap.className = "speed-end";
  wrap.innerHTML = `
    <p class="speed-end-icon">&#9889;</p>
    <p class="speed-end-score">${score}<span class="speed-end-total">/${total}</span></p>
    <p class="speed-end-label">correct in ${seconds} seconds &middot; best streak ${bestStreak || 0}</p>
    <p class="speed-end-best">${isRecord ? "&#127942; New personal best!" : `Personal best (${sommPref.difficulty}, ${seconds}s): ${best}`}</p>
  `;
  app.appendChild(wrap);

  if (missed && missed.length) {
    const reviewTitle = document.createElement("p");
    reviewTitle.className = "detail-h3";
    reviewTitle.innerHTML = `<span>&#128269;</span> What you missed`;
    app.appendChild(reviewTitle);
    missed.forEach(m => {
      const block = document.createElement("div");
      block.className = "somm-review-block";
      block.innerHTML = `
        <p class="somm-review-shown">${m.shown}</p>
        <p class="somm-review-correct">&#10003; ${m.correct}</p>
      `;
      app.appendChild(block);
    });
  }

  const btnRow = document.createElement("div");
  btnRow.className = "card-footer-nav";
  const againBtn = document.createElement("button");
  againBtn.className = "footer-btn footer-btn-home";
  againBtn.textContent = "Run it back \u26A1";
  againBtn.onclick = () => go("somm-says-run", { seconds });
  const backBtn = document.createElement("button");
  backBtn.className = "footer-btn";
  backBtn.textContent = "Game Room";
  backBtn.onclick = () => go("game-room");
  btnRow.appendChild(backBtn);
  btnRow.appendChild(againBtn);
  app.appendChild(btnRow);
}

migrateProgressToConfidence();

if (getStoredAuth()) {
  render();
} else {
  renderAuthScreen(render);
}
