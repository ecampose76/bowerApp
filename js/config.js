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
const APP_VERSION = "v3";

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
// modules like the Olive Wagyu article) is a separate, large content system.
// One sample module lives below — built the same way Prime131's are, tied
// to an actual Bower dish (the Foie Gras Torchon in data.js) — to show the
// Learning engine end-to-end rather than leave it stubbed empty. It's a
// single demo module, not a full curriculum; add more LEARNING_MODULES
// entries the same shape to build that out.
const LEARNING_MODULES = [
  {
    id: "foie-gras-torchon-service",
    title: "Foie Gras Torchon: Selling the Signature Starter",
    category: "Food",
    unlockAfter: null,
    chapters: [
      {
        title: "Selling the Torchon",
        sections: [
          {
            type: "text",
            title: "Why This Dish Opens the Menu",
            body: "The foie gras torchon is Bower's most composed starter — a technique dish built to signal, in the first course, exactly what kind of kitchen this is. This module covers what a torchon actually is, why it's built the way it is, and how to talk about it at the table.",
            note: "“Torchon” is French for the cloth the foie is rolled tight in to set its shape — it's a technique name, not a brand."
          },
          {
            type: "text",
            title: "How It's Built",
            body: "The foie is cured, rolled into a tight cylinder, and poached gently sous vide until just set — never seared. It's sliced to order and plated with roasted plum, a sauternes gelée, hazelnut praline, and warm brioche.",
            note: "Because it's poached rather than seared, the torchon has a smooth, custard-like texture edge to edge — there's no seared crust here, so don't reach for pan-sear language when you describe it."
          },
          {
            type: "text",
            title: "Words to Use at the Table",
            body: "Silken, not seared. The roasted plum and sauternes gelée are there to cut the richness with fruit and acid, and the hazelnut praline adds the only crunch on the plate. Warm brioche is the vehicle, not a side.",
            note: "Guests who've only had seared foie gras elsewhere are usually surprised by the texture — say so before they are."
          },
          {
            type: "text",
            title: "The Pitch & Common Questions",
            body: "“Isn't foie gras always seared?” is the most common question — no, and that's the point: a torchon is a different preparation, built for a different texture. “Is it very rich?” — yes, which is exactly why the plate is built with fruit and acid to keep it in balance, not a heavier, unaccompanied portion.",
            note: "Frame richness as something the dish already accounts for, not something the guest has to manage alone."
          },
          {
            type: "text",
            title: "What to Pour",
            body: "The plate is already built around a sauternes gelée, so a glass of the Château Coutet Barsac alongside it doesn't compete with the dish — it completes it. It's the classic Sauternes-family pairing for exactly this reason: sweetness balancing foie gras's richness.",
            note: "Pour a small glass, not a full one — this is a pairing for one course, not the rest of the meal."
          }
        ]
      }
    ],
    test: [
      {
        question: "What makes a torchon preparation different from a seared foie gras preparation?",
        options: [
          "It uses a different animal fat",
          "It's cured, rolled, and poached gently rather than seared",
          "It's always served cold as an amuse-bouche",
          "It skips curing entirely"
        ],
        correctIndex: 1
      },
      {
        question: "A guest asks if the torchon is very rich. What's the best response?",
        options: [
          "Downplay it and say it's actually quite light",
          "Acknowledge the richness and point to how the plate (fruit, gelée, praline) is built to balance it",
          "Recommend they order something else instead",
          "Explain that richness is subjective and change the subject"
        ],
        correctIndex: 1
      },
      {
        question: "Which wine is the torchon paired with on Bower's list, and why?",
        options: [
          "A high-tannin Cabernet, to cut through the fat",
          "A dry, high-acid Sancerre, for contrast",
          "The Château Coutet Barsac, a dessert wine that echoes the plate's own sauternes gelée",
          "A light sparkling wine, to cleanse the palate"
        ],
        correctIndex: 2
      }
    ]
  }
];
