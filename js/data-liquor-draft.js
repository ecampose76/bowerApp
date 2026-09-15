// Bower — back-bar liquor list draft (modest, real/recognizable brands, matching Prime131's LIQUOR schema)
// structure scale 1 (lowest) to 5 (highest): sweetness, smoke, spice, body, finish

const LIQUOR_SUBCATEGORY_ORDER = {
  "Whiskey": ["Bourbon", "Rye", "Scotch — Single Malt"]
};

const LIQUOR = [
  // ---- Whiskey: Bourbon ----
  {
    id: "lq1", name: "Woodford Reserve", price: 16, category: "Whiskey", subcategory: "Bourbon",
    producer: "Woodford Reserve Distillery", region: "Versailles, Kentucky, USA",
    mashBill: "72% corn, 18% rye, 10% malted barley",
    abv: 45.2, ageStatement: "No age statement (typically 6-7 years)",
    flavorTags: ["Dried Fruit", "Vanilla", "Baking Spice", "Oak"],
    structure: { sweetness: 3, smoke: 1, spice: 3, body: 3, finish: 3 },
    guestDescription: "A well-balanced small-batch bourbon &mdash; dried fruit and vanilla up front with real baking-spice warmth. A safe, well-made bourbon for a bar built around French technique rather than a whiskey-first program.",
    sellingPoints: ["One of the few major bourbons still using traditional copper pot-still distillation for part of production", "Balanced enough to work in classics or on its own", "Widely recognized name for guests ordering by brand"],
    distillingNote: "Distilled using a triple-distillation process in copper pot stills, unlike most bourbon, which is typically distilled in column stills.",
    funFact: "Woodford Reserve's distillery sits on the same site used for bourbon production since the 1810s, making it one of the oldest continuously operating distillery sites in Kentucky.",
    funFact2: "Woodford Reserve has been the official bourbon of the Kentucky Derby since 1999.",
    shortStory: "Woodford Reserve revived a historic Versailles, Kentucky distilling site in the mid-1990s, choosing to run copper pot stills rather than the column stills most bourbon producers rely on, aiming for a richer, more textured spirit."
  },
  // ---- Whiskey: Rye ----
  {
    id: "lq2", name: "Michter's US*1 Rye", price: 18, category: "Whiskey", subcategory: "Rye",
    producer: "Michter's Distillery", region: "Louisville, Kentucky, USA",
    mashBill: "Not publicly disclosed; minimum 51% rye per legal definition",
    abv: 42.4, ageStatement: "No age statement",
    flavorTags: ["Black Pepper", "Caramel", "Citrus Peel", "Rye Spice"],
    structure: { sweetness: 2, smoke: 0, spice: 4, body: 3, finish: 3 },
    guestDescription: "A spicy, peppery rye built for cocktails as much as sipping &mdash; the backbone we use for a proper Sazerac or Manhattan.",
    sellingPoints: ["The house rye for the classics program", "Filtered through a proprietary chill-filtering process Michter's is known for", "Peppery enough to stand up in a stirred cocktail"],
    distillingNote: "Michter's uses its own proprietary filtration process at a specific temperature they say preserves more character than standard chill filtration.",
    funFact: "The Michter's name dates back to a distillery in Pennsylvania in the 1750s, though the current company relaunched in Kentucky in the 1990s under new ownership.",
    funFact2: "Michter's does not disclose its mash bill publicly, unusual among modern American whiskey brands.",
    shortStory: "Michter's traces its name to a colonial-era Pennsylvania distillery, but the modern brand was rebuilt from scratch in Kentucky starting in the late 1990s, quickly building a reputation for well-aged, small-batch releases."
  },
  // ---- Whiskey: Scotch — Single Malt ----
  {
    id: "lq3", name: "The Macallan 12 Year Double Cask", price: 22, category: "Whiskey", subcategory: "Scotch — Single Malt",
    producer: "The Macallan Distillery", region: "Speyside, Scotland",
    mashBill: "100% malted barley",
    abv: 43, ageStatement: "12 Years",
    flavorTags: ["Dried Fruit", "Vanilla", "Ginger", "Sherry Oak"],
    structure: { sweetness: 3, smoke: 0, spice: 2, body: 3, finish: 3 },
    guestDescription: "Aged in a mix of American and European oak sherry-seasoned casks &mdash; dried fruit, vanilla, and a little spice from the sherry influence. One of the most recognized single malt names on any back bar.",
    sellingPoints: ["Aged in genuine sherry-seasoned oak, not just finished briefly in it", "A safe, widely recognized name for guests new to single malt", "Balanced enough to work neat or in a whiskey-forward cocktail"],
    distillingNote: "Macallan is known for its unusually small stills relative to most Speyside distilleries, which the brand credits for a richer new-make spirit before it ever touches oak.",
    funFact: "Macallan sources sherry-seasoned oak casks from Spain specifically built and seasoned for the distillery, a considerably more expensive practice than simply buying used bourbon barrels.",
    funFact2: "Macallan is consistently one of the top-selling single malt Scotch brands globally by value.",
    shortStory: "Founded in 1824, Macallan built its reputation on sherry-cask maturation decades before it became a broader industry trend, and remains one of the most collected and widely recognized single malt names in the world."
  },
  // ---- Gin ----
  {
    id: "lq4", name: "The Botanist Islay Dry Gin", price: 15, category: "Gin",
    producer: "Bruichladdich Distillery", region: "Islay, Scotland",
    mashBill: "Neutral grain spirit base", abv: 46, ageStatement: "N/A (unaged)",
    flavorTags: ["Juniper", "Wildflower", "Citrus", "Herbal"],
    structure: { sweetness: 1, smoke: 0, spice: 2, body: 3, finish: 3 },
    guestDescription: "Distilled on Islay, an island better known for smoky whisky, using nine classic gin botanicals plus 22 more foraged from the island itself &mdash; genuinely herbal and complex.",
    sellingPoints: ["31 total botanicals, 22 of them hand-foraged on Islay itself", "Distilled by a whisky distillery, using a slow-vapor method built for gentler extraction", "The house gin across most of our botanical-forward cocktails"],
    distillingNote: "Uses an unusually long, slow vapor-infusion distillation — up to 17 hours — to gently extract delicate botanical character rather than boiling it out quickly.",
    funFact: "The Botanist is made by Bruichladdich, a distillery otherwise known entirely for single malt Scotch whisky.",
    funFact2: "A dedicated forager collects the 22 wild Islay botanicals used in the gin by hand across the island's coastline and machair grasslands.",
    shortStory: "Bruichladdich launched The Botanist in 2011 as a side project built around Islay's wild landscape, hiring a local forager to identify and hand-pick native botanicals rather than sourcing everything commercially."
  },
  {
    id: "lq5", name: "Hendrick's Gin", price: 14, category: "Gin",
    producer: "Hendrick's Distillery (William Grant & Sons)", region: "Girvan, Scotland",
    mashBill: "Neutral grain spirit base", abv: 41.4, ageStatement: "N/A (unaged)",
    flavorTags: ["Cucumber", "Rose", "Juniper", "Citrus"],
    structure: { sweetness: 1, smoke: 0, spice: 1, body: 2, finish: 2 },
    guestDescription: "Famous for its cucumber and rose infusion &mdash; a lighter, more floral gin than a classic juniper-forward London Dry.",
    sellingPoints: ["The gin most guests already recognize by name", "Distinctly floral and cucumber-forward, a genuine departure from classic London Dry style", "Distilled using two entirely different pot still styles blended together"],
    distillingNote: "Blended from spirit made on two different antique pot still designs, a Carter-Head and a traditional copper pot still, before the cucumber and rose infusions are added.",
    funFact: "Hendrick's was launched in 1999 and is credited with helping spark the broader modern gin revival of the 2000s and 2010s.",
    funFact2: "The brand's distinctive apothecary-style bottle was a deliberate choice to stand apart from traditional clear gin bottles on the shelf.",
    shortStory: "Hendrick's launched in 1999 as a deliberate departure from classic juniper-forward gin, betting that cucumber and rose would carve out a new lane — a bet that paid off widely enough to help kick off gin's modern resurgence."
  },
  // ---- Rum ----
  {
    id: "lq6", name: "Plantation Original Dark", price: 14, category: "Rum",
    producer: "Plantation Rum (Maison Ferrand)", region: "Caribbean (blend), aged/finished in Cognac, France",
    mashBill: "Molasses-based, blended from multiple Caribbean islands", abv: 40, ageStatement: "Blended, multi-year",
    flavorTags: ["Molasses", "Caramel", "Baking Spice", "Dried Fruit"],
    structure: { sweetness: 4, smoke: 0, spice: 3, body: 3, finish: 3 },
    guestDescription: "A rich, molasses-driven dark rum finished in Cognac casks in France &mdash; real depth for stirred, spirit-forward rum drinks.",
    sellingPoints: ["Finished in ex-Cognac barrels in France, a genuinely unusual final step for a Caribbean rum", "Made by the same house behind Pierre Ferrand Cognac", "Rich enough to work in place of a spiced rum without added sweetness"],
    distillingNote: "Blended from rum aged in the Caribbean, then shipped to Maison Ferrand's cellars in Cognac, France for an additional finishing period in ex-Cognac barrels.",
    funFact: "Plantation's double-aging process — tropical aging in the Caribbean followed by finishing in France — is a genuinely unusual model most other rum brands don't follow.",
    funFact2: "Maison Ferrand, Plantation's parent company, is the same house behind Pierre Ferrand Cognac.",
    shortStory: "Alexandre Gabriel, who also runs Cognac house Pierre Ferrand, built Plantation around the idea of finishing Caribbean rum in French Cognac casks, applying Cognac-world finishing technique to a category that rarely used it."
  },
  {
    id: "lq7", name: "Diplomático Reserva Exclusiva", price: 17, category: "Rum",
    producer: "Destilerías Unidas (Diplomático)", region: "Venezuela",
    mashBill: "Blend of molasses and sugarcane honey distillates", abv: 40, ageStatement: "Blended, up to 12 years",
    flavorTags: ["Toffee", "Orange Peel", "Dried Fig", "Vanilla"],
    structure: { sweetness: 4, smoke: 0, spice: 2, body: 4, finish: 4 },
    guestDescription: "A dense, almost dessert-like Venezuelan rum &mdash; toffee and dried fig with real weight. One of the most awarded rums in its category.",
    sellingPoints: ["Blended from batches distilled on four different still types, unusual complexity for the category", "Consistently one of the most awarded rums at international spirits competitions", "Rich enough to sip neat, not just mix"],
    distillingNote: "Blended from rum distilled on four different still types — batch kettle, column, and two types of pot still — each contributing different character to the final blend.",
    funFact: "Diplomático is distilled at a former state-run Venezuelan sugar distillery that was privatized and taken over by its own employees in the 1990s.",
    funFact2: "Reserva Exclusiva includes rums aged up to 12 years in the blend, though it carries no formal age statement.",
    shortStory: "Diplomático operates out of one of Venezuela's oldest sugar-growing regions, and its Reserva Exclusiva bottling has become one of the most decorated premium rums in the world, prized for a richness closer to a fine whisky than a typical mixing rum."
  },
  // ---- Tequila ----
  {
    id: "lq8", name: "Casamigos Blanco", price: 15, category: "Tequila",
    producer: "Casamigos", region: "Jalisco, Mexico",
    mashBill: "100% Blue Weber Agave", abv: 40, ageStatement: "Unaged (Blanco)",
    flavorTags: ["Agave", "Citrus", "Vanilla", "Black Pepper"],
    structure: { sweetness: 2, smoke: 0, spice: 2, body: 2, finish: 2 },
    guestDescription: "A smooth, low-heat blanco tequila built for sipping as much as mixing &mdash; light agave and citrus with almost no burn.",
    sellingPoints: ["Co-founded by George Clooney, a name most guests already recognize", "Notably smooth for an unaged blanco", "The house tequila in our Margarita and Paloma"],
    distillingNote: "Cooked in traditional brick ovens and double-distilled, with an unusually long, slow fermentation the brand credits for its smoothness.",
    funFact: "Casamigos was founded in 2013 by George Clooney and two friends — the name translates to \"house of friends.\"",
    funFact2: "Casamigos was sold to Diageo in 2017 for an upfront figure reported around $700 million, one of the largest tequila acquisitions on record.",
    shortStory: "George Clooney and two friends started developing Casamigos as a tequila just for themselves and friends, only turning it into a commercial brand when people kept asking where to buy it."
  },
  {
    id: "lq9", name: "Don Julio 1942 Añejo", price: 32, category: "Tequila",
    producer: "Don Julio", region: "Jalisco, Mexico",
    mashBill: "100% Blue Weber Agave", abv: 40, ageStatement: "Minimum 2.5 Years (Añejo)",
    flavorTags: ["Caramel", "Vanilla", "Toffee", "Roasted Agave"],
    structure: { sweetness: 4, smoke: 0, spice: 2, body: 4, finish: 4 },
    guestDescription: "A rich, barrel-aged tequila with real caramel and toffee depth &mdash; built to sip neat, closer to a fine aged spirit than a mixing tequila.",
    sellingPoints: ["Named for the year Don Julio González began distilling", "Aged well beyond the legal minimum for Añejo classification", "A prestige, sipping-focused tequila for guests who want the top shelf"],
    distillingNote: "Aged a minimum of two and a half years in American oak barrels, considerably longer than the one-year minimum legally required for Añejo classification.",
    funFact: "1942 was released in 2000 to commemorate the year Don Julio González started distilling tequila as a teenager.",
    funFact2: "Don Julio González continued personally overseeing production into his nineties, decades after founding the brand.",
    shortStory: "Don Julio González began distilling tequila in 1942 at just 17 years old and spent decades building a reputation for quality before the brand launched 1942 as a tribute expression at the turn of the millennium."
  },
  // ---- Vodka ----
  {
    id: "lq10", name: "Grey Goose", price: 14, category: "Vodka",
    producer: "Grey Goose (Bacardi)", region: "Cognac region, France",
    mashBill: "French winter wheat", abv: 40, ageStatement: "N/A",
    flavorTags: ["Clean", "Subtle Almond", "Soft Citrus"],
    structure: { sweetness: 1, smoke: 0, spice: 0, body: 2, finish: 2 },
    guestDescription: "A clean, French wheat vodka filtered with limestone-filtered spring water from the Cognac region &mdash; smooth and neutral, built for martinis.",
    sellingPoints: ["Made from French winter wheat rather than potatoes or corn", "Filtered through Champagne limestone, the same geology that filters Champagne's own water table", "A widely recognized name for guests ordering a classic vodka martini"],
    distillingNote: "Distilled from French wheat and filtered using water drawn from a well in the Cognac region, run through Champagne limestone.",
    funFact: "Grey Goose was created in the 1990s by an American entrepreneur specifically to compete in the ultra-premium vodka category, despite having no prior distilling background.",
    funFact2: "Despite the French branding and production, Grey Goose is owned by Bacardi, a company headquartered in Bermuda.",
    shortStory: "Grey Goose launched in 1997, deliberately built around French production and packaging to compete directly against then-dominant vodka brands, and quickly became a fixture of the premium vodka category."
  },
  {
    id: "lq11", name: "Ketel One", price: 13, category: "Vodka",
    producer: "Nolet Distillery", region: "Schiedam, Netherlands",
    mashBill: "100% Wheat", abv: 40, ageStatement: "N/A",
    flavorTags: ["Clean", "Soft Grain", "Faint Citrus"],
    structure: { sweetness: 1, smoke: 0, spice: 0, body: 2, finish: 2 },
    guestDescription: "A classic, family-distilled Dutch wheat vodka &mdash; clean and versatile, equally at home in a martini or a Cosmopolitan.",
    sellingPoints: ["Family-owned and distilled since the 18th century", "A portion is still distilled in traditional copper pot stills alongside column distillation", "Reliable, food-safe neutral character for a wide range of cocktails"],
    distillingNote: "Named after Ketel #1, one of the distillery's original copper pot stills, still used for a portion of production alongside more modern column stills.",
    funFact: "The Nolet family has distilled spirits in Schiedam, Netherlands since 1691, making Ketel One's producer one of the oldest family distilling operations in the world.",
    funFact2: "Ketel One is named directly after a specific still — 'Ketel #1' — that the distillery still uses today.",
    shortStory: "The Nolet family has run their Schiedam distillery since the late 17th century, and Ketel One, launched for export in the 1980s, remains one of the few major vodka brands still tied to a genuinely centuries-old family distilling operation."
  },
  // ---- Brandy/Cognac ----
  {
    id: "lq12", name: "Rémy Martin VSOP", price: 18, category: "Brandy/Cognac",
    producer: "Rémy Martin", region: "Cognac, France",
    mashBill: "100% Ugni Blanc grapes", abv: 40, ageStatement: "VSOP (minimum 4 years, typically longer)",
    flavorTags: ["Dried Apricot", "Vanilla", "Toasted Oak", "Honey"],
    structure: { sweetness: 3, smoke: 0, spice: 2, body: 3, finish: 3 },
    guestDescription: "A classic VSOP Cognac &mdash; dried apricot and vanilla with genuine oak depth. Built from grapes sourced exclusively from Cognac's two best-rated growing zones.",
    sellingPoints: ["Sourced only from Cognac's Grande and Petite Champagne crus, the region's top-rated growing zones", "A reliable house Cognac for the Sidecar and Vieux Carré", "VSOP-level aging gives more depth than a standard VS"],
    distillingNote: "Rémy Martin uses only eaux-de-vie from the Fine Champagne designation, meaning grapes sourced exclusively from Cognac's top two crus, unlike many Cognac houses that blend in lower-rated growing zones.",
    funFact: "Rémy Martin is one of the only major Cognac houses to use exclusively Fine Champagne-designated eaux-de-vie across its entire range.",
    funFact2: "Cognac must legally be distilled twice in copper pot stills and aged in French oak, a stricter standard than most brandy categories worldwide.",
    shortStory: "Founded in 1724, Rémy Martin built its reputation around sourcing exclusively from Cognac's top-rated Grande and Petite Champagne growing zones, a stricter self-imposed standard than the appellation technically requires."
  },
  {
    id: "lq13", name: "Pierre Ferrand 1840", price: 20, category: "Brandy/Cognac",
    producer: "Maison Ferrand", region: "Cognac, France",
    mashBill: "100% Ugni Blanc grapes", abv: 45, ageStatement: "Blended, historically styled",
    flavorTags: ["Dried Fig", "Baking Spice", "Orange Peel", "Oak"],
    structure: { sweetness: 3, smoke: 0, spice: 3, body: 4, finish: 4 },
    guestDescription: "A higher-proof Cognac built specifically to hold up in classic cocktails &mdash; bottled the way Cognac would have been served in the 1840s, before dilution for the American market became standard.",
    sellingPoints: ["Bottled at historic 1840s-style proof, higher than most modern Cognac", "Built specifically for cocktail use, not just sipping", "The house Cognac for our Sidecar when a guest wants more spirit presence"],
    distillingNote: "Bottled at 90 proof, deliberately higher than the roughly 80 proof most Cognac is diluted to today, replicating the strength historically exported before modern market preferences shifted toward lower proof.",
    funFact: "Pierre Ferrand 1840 was created specifically for bartenders, after research showed 19th-century Cognac cocktail recipes assumed a considerably higher-proof spirit than modern Cognac.",
    funFact2: "Maison Ferrand also owns Plantation Rum, giving the same house a hand in both the Cognac and rum programs behind our bar.",
    shortStory: "Alexandre Gabriel of Maison Ferrand developed 1840 after studying historic cocktail recipes and realizing Cognac used to be bottled at a noticeably higher proof — reviving that older style specifically for bartenders rebuilding pre-Prohibition classics."
  },
  // ---- Mezcal ----
  {
    id: "lq14", name: "Del Maguey Vida", price: 15, category: "Mezcal",
    producer: "Del Maguey", region: "San Luis del Río, Oaxaca, Mexico",
    mashBill: "100% Espadín Agave", abv: 42, ageStatement: "Unaged (Joven)",
    flavorTags: ["Smoke", "Roasted Agave", "Citrus", "Mineral"],
    structure: { sweetness: 1, smoke: 4, spice: 2, body: 3, finish: 3 },
    guestDescription: "A genuinely smoky, single-village mezcal from Oaxaca &mdash; roasted agave and citrus with real earthy depth. The house mezcal in our Smoked Rosemary Paloma.",
    sellingPoints: ["Made by a single small palenque, not a large industrial producer", "Del Maguey is widely credited with bringing artisanal mezcal to the US market", "Genuinely smoky, traditional pit-roasted character"],
    distillingNote: "Agave hearts are roasted in traditional earthen pits lined with volcanic rock, which is the source of mezcal's characteristic smokiness, then crushed by a stone tahona wheel and fermented in wood vats.",
    funFact: "Del Maguey was founded in 1995 and is widely credited as the brand that introduced small-batch, single-village mezcal to American bars.",
    funFact2: "Vida is sourced from a single palenque (distillery) in the village of San Luis del Río, rather than blended from multiple producers.",
    shortStory: "Del Maguey's founder began working with small family palenques in Oaxaca in the 1990s, when mezcal was still a niche, largely unexported spirit, and helped build the category that's now standard on serious cocktail menus."
  },
  {
    id: "lq15", name: "Ilegal Mezcal Joven", price: 16, category: "Mezcal",
    producer: "Ilegal Mezcal", region: "Oaxaca, Mexico",
    mashBill: "100% Espadín Agave", abv: 40, ageStatement: "Unaged (Joven)",
    flavorTags: ["Smoke", "Green Vegetable", "Citrus", "Black Pepper"],
    structure: { sweetness: 1, smoke: 3, spice: 2, body: 2, finish: 3 },
    guestDescription: "A brighter, lighter-smoke mezcal than some traditional expressions &mdash; approachable for guests newer to the category.",
    sellingPoints: ["Founded by smuggling mezcal into Guatemala before it was a legal export category, hence the name", "A gentler smoke level, good for mezcal newcomers", "Widely available and consistent batch to batch"],
    distillingNote: "Double-distilled in copper pot stills after traditional pit-roasting, with a shorter roast time than some more heavily smoked expressions.",
    funFact: "Ilegal's name comes from its founder's early practice of physically smuggling mezcal across the border into Guatemala, before it was formally recognized as an export spirit.",
    funFact2: "Ilegal was one of the brands most credited with popularizing mezcal in the U.S. bar scene during the 2010s.",
    shortStory: "Ilegal started as founder John Rexer's personal habit of bringing suitcases of mezcal into Guatemala for his own bar, before demand turned it into a formally exported, internationally distributed brand."
  },
  // ---- Amaro, Bitters & Aperitifs ----
  {
    id: "lq16", name: "Aperol", price: 12, category: "Amaro, Bitters & Aperitifs",
    producer: "Barbieri (Gruppo Campari)", region: "Padua, Italy",
    mashBill: "Bitter orange, rhubarb, gentian, and herbal infusion base", abv: 11, ageStatement: "N/A",
    flavorTags: ["Bitter Orange", "Rhubarb", "Herbal", "Light"],
    structure: { sweetness: 3, smoke: 0, spice: 1, body: 2, finish: 2 },
    guestDescription: "Bright, low-proof, and bittersweet &mdash; the backbone of the classic Aperol Spritz and one of the most recognizable aperitivo brands in the world.",
    sellingPoints: ["Lower proof than most spirits, an easy entry point for lighter drinkers", "The defining ingredient of the modern Aperol Spritz boom", "Recognizable orange color and bottle for guests ordering by name"],
    distillingNote: "Not distilled — Aperol is an infusion of bitter and sweet orange, rhubarb, gentian, and other botanicals into a neutral spirit and sugar base, which is why it carries such a low ABV relative to most bar spirits.",
    funFact: "Aperol was launched in 1919 by the Barbieri brothers in Padua, Italy, decades before it became a global phenomenon through the Aperol Spritz.",
    funFact2: "Aperol's exact herbal recipe remains a closely guarded trade secret even after over a century in production.",
    shortStory: "Aperol has existed since 1919, but stayed a fairly regional Italian aperitivo until the 2000s and 2010s, when the simple Aperol Spritz turned it into one of the best-selling aperitifs in the world."
  },
  {
    id: "lq17", name: "Campari", price: 13, category: "Amaro, Bitters & Aperitifs",
    producer: "Davide Campari-Milano", region: "Milan, Italy",
    mashBill: "Bitter herb, aromatic plant, and fruit infusion base", abv: 24, ageStatement: "N/A",
    flavorTags: ["Bitter Orange", "Herbal", "Cherry", "Bold"],
    structure: { sweetness: 2, smoke: 0, spice: 2, body: 3, finish: 3 },
    guestDescription: "Bold, bitter, and unmistakably red &mdash; the backbone of a proper Negroni and one of the most recognized bitter liqueurs in the world.",
    sellingPoints: ["The defining ingredient of the classic Negroni", "Considerably more bitter and higher-proof than Aperol, for guests who want more intensity", "Over 150 years of continuous production"],
    distillingNote: "An infusion of bitter herbs, aromatic plants, and fruit into alcohol and water, a closely guarded recipe that hasn't been fully published since the brand's founding.",
    funFact: "Campari has been produced since 1860, making it one of the oldest continuously produced bitter liqueurs in the world.",
    funFact2: "Campari's original red color came from a natural dye derived from crushed cochineal insects; the modern formula uses artificial coloring instead, a change made in the 2000s.",
    shortStory: "Gaspare Campari developed the recipe in Novara, Italy in 1860, and the brand has stayed in continuous production ever since, becoming one of the most recognized bitter liqueurs on the planet and the non-negotiable third of a proper Negroni."
  },
  // ---- Liqueurs & Cordials ----
  {
    id: "lq18", name: "Grand Marnier Cordon Rouge", price: 15, category: "Liqueurs & Cordials",
    producer: "Marnier-Lapostolle", region: "Neauphle-le-Château, France",
    mashBill: "Cognac and bitter orange essence blend", abv: 40, ageStatement: "Blended Cognac base",
    flavorTags: ["Orange", "Cognac", "Vanilla", "Caramel"],
    structure: { sweetness: 4, smoke: 0, spice: 1, body: 3, finish: 3 },
    guestDescription: "A blend of Cognac and bitter orange essence &mdash; richer and more spirit-forward than a standard triple sec, and part of what makes our Sidecar taste like Sidecar rather than a simple sour.",
    sellingPoints: ["Built on an actual Cognac base, not neutral spirit like most orange liqueurs", "The defining orange liqueur behind the Sidecar and a proper Margarita", "Over 150 years in continuous production"],
    distillingNote: "Made by macerating bitter orange peels in alcohol, then blending the resulting essence with genuine Cognac, rather than starting from a neutral grain spirit like most orange liqueurs.",
    funFact: "Grand Marnier was created in 1880 by Louis-Alexandre Marnier Lapostolle, who was among the first to blend Cognac directly into an orange liqueur.",
    funFact2: "The bitter oranges historically used in Grand Marnier are sourced from Haiti and other tropical growing regions, not from France itself.",
    shortStory: "Louis-Alexandre Marnier Lapostolle created Grand Marnier in 1880 by combining Cognac with bitter orange essence, a combination that set it apart from lighter, neutral-spirit orange liqueurs and made it a bartender staple ever since."
  },
  {
    id: "lq19", name: "Chartreuse Verte (Green Chartreuse)", price: 17, category: "Liqueurs & Cordials",
    producer: "Chartreuse Diffusion (Carthusian Monks)", region: "Voiron, France",
    mashBill: "130 herbs, plants, and botanicals, recipe held by two monks", abv: 55, ageStatement: "N/A",
    flavorTags: ["Herbal", "Anise", "Mint", "Honey"],
    structure: { sweetness: 3, smoke: 0, spice: 4, body: 4, finish: 5 },
    guestDescription: "An intensely herbal French liqueur made from a 130-plant recipe known only to two monks at a time &mdash; the backbone of a proper Last Word.",
    sellingPoints: ["The full recipe has been a closely guarded secret since the 1700s, known to only two monks at any given time", "Genuinely unlike anything else behind the bar &mdash; high proof and deeply herbal", "The defining ingredient of the Last Word"],
    distillingNote: "Made from macerating and distilling 130 herbs, plants, and flowers according to a recipe dating to a 1605 manuscript, still produced by the Carthusian monastic order.",
    funFact: "The Chartreuse recipe is known to only two monks at any given time, a tradition maintained since the liqueur's creation.",
    funFact2: "Chartreuse's distinctive green color comes entirely from its botanicals, not added dye — the monks have never disclosed which plants create it.",
    shortStory: "Carthusian monks have produced Chartreuse since receiving a manuscript recipe in 1605, and the liqueur remains one of the very few commercial products in the world still made from a centuries-old secret formula passed down within a religious order."
  }
];
