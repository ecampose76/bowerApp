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
const APP_VERSION = "v2";

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
const SECTION_ICON_MAP = {
  "From the Garden": "\u{1F331}", "Starters": "\u{1F35E}", "Soups & Salads": "\u{1F957}",
  "Entr\u00E9es": "\u{1F37D}\uFE0F", "Accompaniments": "\u{1F955}", "Sauces & Butters": "\u{1F9C8}",
  "Desserts": "\u{1F370}"
};

// Zero-star review streak — home screen counter.
// Bower doesn't exist, so this is explicitly illustrative demo data
// (see the "(illustrative demo data)" label in app.js's home render),
// not a real operational metric like it is for Prime131.
const REVIEW_STREAK_RECORD = {
  start: "2026-06-01T00:00:00",
  best: 106,
  lastEndedDays: null
};

// Bower has no Houston Restaurant Weeks-style promo wine list (that's a
// Prime131-specific feature). Stubbed empty so findWine()'s HRW_WINES
// fallback in app.js never throws, even though no UI links to it.
const HRW_WINES = [];

// Prime131's deep-dive staff "Learning" curriculum (multi-chapter training
// modules like the Olive Wagyu article) is a separate, large content system
// tied to Prime131's real dishes — out of scope for this Bower build unless
// requested. Stubbed empty so the Learning section's engine code (which
// .forEach's and .find's over this array) never throws; it'll just show
// an empty state.
const LEARNING_MODULES = [];
