// ============================================================
// RESTAURANT CONFIG — Bower.
// Bower is a fictional restaurant built purely as a portfolio
// piece; there is no real backend, no real staff, and no real
// reviews. This file replaces Prime131's config.js for this
// deployment. Nothing in app.js (the engine) needed to change,
// aside from one flagged label edit — see app.js's "illustrative
// demo data" note on the review-streak stat.
// ============================================================

const BRAND = {
  fullName: "Bower",
  stampText: "BWR",
  storageKeyPrefix: "bower" // unused directly (no auth.js), kept for consistency with the shared engine's conventions
};

// Bumped alongside sw.js's CACHE_NAME on every deploy.
const APP_VERSION = "v1";

// Which home cards this deployment shows. (Currently informational —
// app.js still renders all five directly, same as Prime131.)
const FEATURES = {
  foodMenu: true,
  wineBTG: true,
  cocktails: true,
  classicCocktails: true,
  mocktails: true,
  gameRoom: true
};

// Base-spirit categories for the Classic Cocktails library.
// TODO: confirm/adjust once Bower's cocktail list (data.js) is built —
// Bower's garden/aperitif-leaning bar program may not need every
// Prime131 spirit category.
const SPIRIT_ORDER = ["Whiskey", "Gin", "Rum", "Tequila", "Vodka", "Brandy/Cognac", "Mezcal", "Amaro, Bitters & Aperitifs", "Liqueurs & Cordials"];
const SPIRIT_ICON_MAP = {
  "Whiskey": "\u{1F943}", "Gin": "\u{1F378}", "Rum": "\u{1F379}",
  "Tequila": "\u{1FAD1}", "Vodka": "\u2744\uFE0F", "Brandy/Cognac": "\u{1F942}",
  "Mezcal": "\u{1F335}", "Amaro, Bitters & Aperitifs": "\u{1F33F}", "Liqueurs & Cordials": "\u{1F36F}"
};

// Icon shown next to each food menu section (must match data.js's SECTION_ORDER).
// PLACEHOLDER — Prime131's steakhouse sections don't fit Bower's
// vegetable-forward French menu. Rebuilding this to match Bower's real
// section names once the menu (data.js) is drafted.
const SECTION_ICON_MAP = {};

// Zero-star review streak — home screen counter.
// Bower doesn't exist, so this is explicitly illustrative demo data
// (see the "(illustrative demo data)" label in app.js's home render),
// not a real operational metric like it is for Prime131.
const REVIEW_STREAK_RECORD = {
  start: "2026-06-01T00:00:00",
  best: 106,
  lastEndedDays: null
};
