// Bower — mocktail list draft (5 non-alcoholic, same garden/French-technique thinking as the cocktail program)

const MOCKTAILS = [
  {
    id: "m1", name: "Garden Cordial", glassware: "Collins", method: "Build", category: "mocktail",
    flavorTags: ["Cucumber", "Mint", "Elderflower", "Citrus"],
    ingredients: ["2 oz Cucumber-Mint Cordial (house prep)", "0.5 oz Fresh Lime Juice", "Soda Water, Top"],
    garnish: "Cucumber Ribbon, Mint Sprig",
    directions: "Build cordial and lime juice over fresh ice in a Collins glass. Top with soda water. Garnish and serve.",
    prep: "Cucumber-Mint Cordial: juice and strain 2 English cucumbers, combine with 1 cup sugar, 1 cup water, and a large handful of mint leaves, warm gently until sugar dissolves, cool, strain, bottle, refrigerate.",
    funFact: "A cordial in the classic sense — fruit or herb juice preserved with sugar — is the same technique that eventually gave rise to the modern syrup-based soda fountain.",
    bestFor: "The table's non-alcoholic opener, or anyone who wants something bright and green with the raw bar."
  },
  {
    id: "m2", name: "Smoked Peach Iced Tea", glassware: "Rocks Glass", method: "Build", category: "mocktail",
    flavorTags: ["Peach", "Black Tea", "Lemon", "Smoke"],
    ingredients: ["4 oz Brewed Black Tea (chilled)", "1 oz Peach Purée", "0.5 oz Fresh Lemon Juice", "0.25 oz Simple Syrup"],
    garnish: "Peach Slice, Torched Rosemary Sprig",
    directions: "Build all ingredients over fresh ice in a rocks glass and stir gently. Garnish with a peach slice and, tableside, briefly torch a rosemary sprig to release aroma before setting it across the glass.",
    prep: "",
    funFact: "Torching a fresh herb without letting it fully catch fire releases its essential oils as aroma without any actual smoke flavor transferring to the drink — a technique borrowed directly from perfumery.",
    bestFor: "A guest who wants something that still feels like a real cocktail experience without any alcohol at all."
  },
  {
    id: "m3", name: "Seedlip Garden Fizz", glassware: "Wine Glass", method: "Build", category: "mocktail",
    flavorTags: ["Herbal", "Cucumber", "Botanical", "Crisp"],
    ingredients: ["2 oz Seedlip Garden 108", "0.5 oz Fresh Lime Juice", "3 oz Tonic Water"],
    garnish: "Cucumber Ribbon, Basil Leaf",
    directions: "Build Seedlip and lime juice over fresh ice in a wine glass. Top with tonic water. Garnish and serve.",
    prep: "",
    funFact: "Seedlip, launched in 2015, is widely credited as the product that kicked off the modern non-alcoholic spirits category, distilled using the same copper pot stills as gin, minus the alcohol.",
    bestFor: "A gin drinker who wants the same botanical, herbal experience without the alcohol."
  },
  {
    id: "m4", name: "Hibiscus & Ginger Shrub Spritz", glassware: "Wine Glass", method: "Build", category: "mocktail",
    flavorTags: ["Hibiscus", "Ginger", "Tart", "Effervescent"],
    ingredients: ["2 oz Chilled Hibiscus Tea", "0.75 oz Ginger Shrub (house prep)", "Soda Water, Top"],
    garnish: "Dried Hibiscus Flower, Lime Wheel",
    directions: "Build hibiscus tea and ginger shrub over fresh ice in a wine glass. Top with soda water. Garnish and serve.",
    prep: "Ginger Shrub: combine equal parts fresh ginger juice, apple cider vinegar, and sugar, whisk until sugar dissolves, bottle, refrigerate at least 24 hours before use.",
    funFact: "Shrubs — vinegar-based fruit or herb syrups — were originally a preservation technique from before refrigeration existed, and have made a genuine comeback in modern non-alcoholic drink programs specifically because they add real acidity and complexity.",
    bestFor: "A guest who wants something tart and complex, closer to a cocktail's acid balance than a simple juice drink."
  },
  {
    id: "m5", name: "Chamomile Honey Lemonade", glassware: "Collins", method: "Build", category: "mocktail",
    flavorTags: ["Chamomile", "Honey", "Lemon", "Soft"],
    ingredients: ["4 oz Fresh Lemon Juice and Water (1:3)", "1 oz Chamomile Honey Syrup (house prep)", "Sparkling Water, Top"],
    garnish: "Dried Chamomile Flower, Lemon Wheel",
    directions: "Build lemon-water, chamomile honey syrup, and sparkling water over fresh ice in a Collins glass. Stir gently. Garnish and serve.",
    prep: "Chamomile Honey Syrup: steep 3 chamomile tea bags in 1 cup hot honey-water simple syrup (1:1) for 10 minutes, strain, cool, bottle, refrigerate.",
    funFact: "This uses the same chamomile honey syrup as the bar's Honey Chamomile Sour, just without the bourbon and egg white — a genuinely shared build between the two programs.",
    bestFor: "A guest who wants something soft, floral, and not too tart to close out the meal alongside dessert."
  }
];
