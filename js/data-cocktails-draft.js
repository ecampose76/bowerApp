// Bower — cocktail program draft (Phase 3c of data.js)

const COCKTAILS = [
  {
    id: "c1", name: "Le Jardin Spritz", glassware: "Wine Glass", method: "Build", category: "house",
    flavorTags: ["Elderflower", "Cucumber", "Citrus", "Herbal"],
    ingredients: ["2 oz Lillet Blanc", "0.5 oz Suze", "0.5 oz St-Germain Elderflower Liqueur", "3 oz Sparkling Wine", "Soda Water, Splash"],
    garnish: "Cucumber Ribbon, Mint Sprig",
    directions: "Build over ice in a wine glass: Lillet Blanc, Suze, and St-Germain first, then top with sparkling wine and a splash of soda water. Stir gently once. Garnish and serve.",
    prep: "", funFact: "Suze is a gentian-root aperitif that was reportedly the inspiration behind Andy Warhol's Campbell's Soup Can series after he spotted its bottle in a French kitchen.", bestFor: "The table's opening round, or a guest who wants something low-proof and garden-bright."
  },
  {
    id: "c2", name: "Cucumber-Basil Collins", glassware: "Collins", method: "Shake & Strain", category: "house",
    flavorTags: ["Cucumber", "Basil", "Citrus", "Crisp"],
    ingredients: ["2 oz Gin", "0.75 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "3 Cucumber Slices", "5 Basil Leaves"],
    garnish: "Cucumber Ribbon, Basil Leaf",
    directions: "Muddle cucumber and basil in a shaker. Add gin, lemon juice, and simple syrup with ice. Shake hard and double strain over fresh ice into a Collins glass. Top with a splash of soda if desired.",
    prep: "", funFact: "Cucumber and gin have a natural affinity because many gins are distilled with botanicals from the same cucurbit and citrus-peel family.", bestFor: "A guest who wants something bright, green, and easy-drinking with the raw bar or garden starters."
  },
  {
    id: "c3", name: "Lavender 75", glassware: "Flute", method: "Shake & Strain", category: "house",
    flavorTags: ["Lavender", "Citrus", "Floral", "Bubbles"],
    ingredients: ["1 oz Gin", "0.5 oz Fresh Lemon Juice", "0.5 oz Lavender Honey Syrup (house prep)", "3 oz Sparkling Wine"],
    garnish: "Dried Lavender Sprig, Lemon Twist",
    directions: "Shake gin, lemon juice, and lavender honey syrup with ice. Strain into a flute and top with sparkling wine. Garnish and serve.",
    prep: "Lavender Honey Syrup: steep 2 tbsp dried culinary lavender in 1 cup hot honey-water simple syrup (1:1) for 15 minutes, strain, cool, bottle, and refrigerate.", funFact: "The classic French 75, which this riffs on, is named after a French 75mm field gun — supposedly because the drink hits just as hard.", bestFor: "A celebration table, or a guest who wants a floral spin on a classic Champagne cocktail."
  },
  {
    id: "c4", name: "Fig Leaf Daiquiri", glassware: "Coupe", method: "Shake & Strain", category: "house",
    flavorTags: ["Fig", "Coconut", "Lime", "Subtly Herbal"],
    ingredients: ["2 oz White Rum", "0.75 oz Fresh Lime Juice", "0.75 oz Fig Leaf Syrup (house prep)"],
    garnish: "Lime Wheel",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Garnish and serve.",
    prep: "Fig Leaf Syrup: gently warm 4-5 fresh fig leaves in 2 cups simple syrup (1:1) for 10 minutes without boiling, off heat and steep 30 minutes, strain, bottle, refrigerate.", funFact: "Fig leaves, when warmed rather than boiled, release a distinctive coconut-and-vanilla aroma that has nothing to do with the fruit itself.", bestFor: "A guest who loves daiquiris but wants something more layered than straight lime and rum."
  },
  {
    id: "c5", name: "Bower Negroni", glassware: "Rocks Glass", method: "Stir & Strain", category: "house",
    flavorTags: ["Bitter", "Botanical", "Citrus Peel", "Herbal"],
    ingredients: ["1 oz Gin", "1 oz Suze", "1 oz Cocchi Americano"],
    garnish: "Large Format Ice, Grapefruit Peel",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Cocchi Americano is the aperitif wine most food historians believe Ian Fleming actually meant by \"Kina Lillet\" in the original Vesper recipe from Casino Royale.", bestFor: "A Negroni drinker who wants something a shade lighter and more citrus-forward than the classic Campari version."
  },
  {
    id: "c6", name: "Brown Butter Old Fashioned", glassware: "Rocks Glass", method: "Stir & Strain", category: "house",
    flavorTags: ["Brown Butter", "Maple", "Oak", "Rich"],
    ingredients: ["2 oz Brown Butter-Washed Bourbon (house prep)", "0.25 oz Maple Syrup", "2 dashes Angostura Bitters"],
    garnish: "Orange Peel",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Express orange peel over the top and drop in. Serve.",
    prep: "Brown Butter-Washed Bourbon: brown 4 oz butter until deep golden and nutty, whisk into a 750ml bottle of bourbon, let sit 4 hours at room temperature, freeze overnight, strain off the solidified fat, bottle.", funFact: "Fat-washing — infusing a spirit with melted fat, then freezing out the solids — is a technique that crosses over directly from pastry work, which is part of why it fits so naturally on a menu built around French technique.", bestFor: "A whiskey drinker who wants something richer and more dessert-adjacent than a standard Old Fashioned."
  },
  {
    id: "c7", name: "Pear & Sage Martini", glassware: "Martini", method: "Shake & Strain", category: "house",
    flavorTags: ["Pear", "Sage", "Citrus", "Crisp"],
    ingredients: ["1.5 oz Vodka", "0.5 oz Pear Eau de Vie", "0.5 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "3 Fresh Sage Leaves"],
    garnish: "Fried Sage Leaf",
    directions: "Muddle sage gently in a shaker. Add remaining ingredients with ice, shake, and double strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "Pear eau de vie is distilled from fermented pears rather than infused after the fact, which is why it carries real pear aromatics without added sugar.", bestFor: "A guest who wants something crisp and autumnal without heavy sweetness."
  },
  {
    id: "c8", name: "Smoked Rosemary Paloma", glassware: "Collins", method: "Build", category: "house",
    flavorTags: ["Grapefruit", "Smoke", "Rosemary", "Agave"],
    ingredients: ["2 oz Mezcal", "0.75 oz Fresh Grapefruit Juice", "0.25 oz Fresh Lime Juice", "0.5 oz Agave Syrup", "Grapefruit Soda, Top"],
    garnish: "Rosemary Sprig, Grapefruit Wheel, Tableside Smoke",
    directions: "Build mezcal, grapefruit juice, lime juice, and agave syrup over fresh ice in a Collins glass. Top with grapefruit soda. Garnish with rosemary and, tableside, torch the rosemary sprig briefly to release smoke and aroma before setting on the glass.",
    prep: "", funFact: "Mezcal's smokiness comes from roasting the agave hearts in earthen pits before distillation — a completely different process from tequila, which is typically steamed.", bestFor: "A guest who wants a smoky, savory riff on a classic Paloma."
  },
  {
    id: "c9", name: "Honey Chamomile Sour", glassware: "Rocks Glass", method: "Shake & Strain", category: "house",
    flavorTags: ["Honey", "Chamomile", "Citrus", "Silky"],
    ingredients: ["2 oz Bourbon", "0.75 oz Fresh Lemon Juice", "0.5 oz Chamomile Honey Syrup (house prep)", "0.5 oz Egg White"],
    garnish: "Dried Chamomile Flower, Lemon Twist",
    directions: "Dry shake all ingredients without ice, then shake again with ice. Strain over fresh ice into a rocks glass. Garnish and serve.",
    prep: "Chamomile Honey Syrup: steep 3 chamomile tea bags in 1 cup hot honey-water simple syrup (1:1) for 10 minutes, strain, cool, bottle, refrigerate.", funFact: "Chamomile's apple-like sweetness is genuinely useful behind the bar — it echoes stone-fruit and honey notes without adding real sugar weight.", bestFor: "A whiskey sour drinker who wants something a little softer and more floral."
  },
  {
    id: "c10", name: "Cognac Peach Smash", glassware: "Rocks Glass", method: "Muddle & Shake", category: "house",
    flavorTags: ["Peach", "Mint", "Citrus", "Warm Spice"],
    ingredients: ["2 oz Cognac", "0.5 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "2 Peach Slices", "6 Mint Leaves"],
    garnish: "Peach Slice, Mint Bouquet",
    directions: "Muddle peach and mint gently in a shaker. Add cognac, lemon juice, and simple syrup with ice. Shake and strain over crushed ice into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Cognac must be distilled twice in copper pot stills and aged in French oak by law — a stricter production standard than most whiskey categories.", bestFor: "A guest who wants a brandy-based drink that leans fruity and refreshing rather than boozy."
  }
];

const CLASSIC_COCKTAILS = [
  {
    id: "cc1", name: "Sazerac", category: "classic", spirit: "Whiskey", glassware: "Rocks (no ice)", method: "Stir & Strain",
    flavorTags: ["Anise", "Spice", "Herbal", "Rye"],
    ingredients: ["2 oz Rye Whiskey", "1/4 oz Simple Syrup", "3 dashes Peychaud's Bitters", "Absinthe Rinse"],
    garnish: "Expressed Lemon Peel (discarded, not left in glass)",
    directions: "Rinse a chilled rocks glass with absinthe, discard excess. Stir rye, simple syrup, and bitters with ice, then strain into the prepared glass. Express lemon peel over the top and discard.",
    prep: "", funFact: "Widely regarded as one of the oldest American cocktails, born in 19th-century New Orleans, and originally made with cognac before rye whiskey took over.", bestFor: "A guest who wants a serious, old-school, spirit-forward drink.", followUp: ["Rye or Cognac?"]
  },
  {
    id: "cc2", name: "Manhattan", category: "classic", spirit: "Whiskey", glassware: "Martini", method: "Stir & Strain",
    flavorTags: ["Rye", "Vermouth", "Cherry", "Bitters"],
    ingredients: ["2 oz Rye Whiskey", "1 oz Sweet Vermouth", "2 dashes Angostura Bitters"],
    garnish: "Brandied Cherry",
    directions: "Stir all ingredients with ice until well chilled. Strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "The Manhattan's exact origin is disputed, but most food historians trace it to New York City in the 1870s or 1880s.", bestFor: "A whiskey drinker who wants a classic, no-nonsense stirred cocktail.", followUp: ["Rye or Bourbon?", "Up or on the rocks?"]
  },
  {
    id: "cc3", name: "Aviation", category: "classic", spirit: "Gin", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Violet", "Cherry", "Citrus", "Floral"],
    ingredients: ["2 oz Gin", "0.5 oz Maraschino Liqueur", "0.5 oz Fresh Lemon Juice", "0.25 oz Crème de Violette"],
    garnish: "Brandied Cherry",
    directions: "Shake all ingredients with ice. Double strain into a chilled coupe. Garnish and serve.",
    prep: "", funFact: "The Aviation's pale lavender hue comes from crème de violette, an ingredient that fell out of production for decades before a modern revival brought the classic recipe back.", bestFor: "A gin drinker who wants something floral and slightly nostalgic."
  },
  {
    id: "cc4", name: "French 75", category: "classic", spirit: "Gin", glassware: "Flute", method: "Shake & Strain",
    flavorTags: ["Citrus", "Bubbles", "Botanical", "Crisp"],
    ingredients: ["1 oz Gin", "0.5 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "3 oz Sparkling Wine"],
    garnish: "Lemon Twist",
    directions: "Shake gin, lemon juice, and simple syrup with ice. Strain into a flute and top with sparkling wine. Garnish and serve.",
    prep: "", funFact: "Named after a French 75mm field gun from World War I, supposedly because the drink hits with similar force.", bestFor: "A celebratory, effervescent gin option for the table."
  },
  {
    id: "cc5", name: "Daiquiri", category: "classic", spirit: "Rum", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Lime", "Rum", "Bright", "Clean"],
    ingredients: ["2 oz White Rum", "1 oz Fresh Lime Juice", "0.75 oz Simple Syrup"],
    garnish: "Lime Wheel",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Garnish and serve.",
    prep: "", funFact: "The daiquiri dates to early 1900s Cuba and takes its name from a beach and iron mine near Santiago de Cuba.", bestFor: "A guest who wants a simple, well-made classic with real rum flavor."
  },
  {
    id: "cc6", name: "Ti' Punch", category: "classic", spirit: "Rum", glassware: "Rocks Glass", method: "Build",
    flavorTags: ["Cane Sugar", "Lime", "Rum-Forward", "Rustic"],
    ingredients: ["2 oz Rhum Agricole", "1 barspoon Cane Syrup", "1 Lime Wedge (squeezed and dropped in)"],
    garnish: "Lime Wedge",
    directions: "Build over a single large ice cube (or no ice, traditionally) in a rocks glass: cane syrup first, then the squeezed lime wedge dropped in, then rhum agricole. Stir briefly and serve, letting the guest adjust sweetness to taste.",
    prep: "", funFact: "Ti' Punch (French Creole for \"little punch\") is the everyday drink of the French Caribbean, traditionally mixed to each drinker's own taste rather than a fixed recipe.", bestFor: "A guest curious about rhum agricole, which is distilled from fresh sugarcane juice rather than molasses."
  },
  {
    id: "cc7", name: "Margarita", category: "classic", spirit: "Tequila", glassware: "Rocks Glass", method: "Shake & Strain",
    flavorTags: ["Lime", "Agave", "Citrus", "Bright"],
    ingredients: ["2 oz Tequila Blanco", "1 oz Fresh Lime Juice", "0.75 oz Orange Liqueur"],
    garnish: "Salt Rim (optional), Lime Wheel",
    directions: "Shake all ingredients with ice. Strain over fresh ice into a rocks glass rimmed with salt if desired. Garnish and serve.",
    prep: "", funFact: "The Margarita's exact origin is fiercely disputed, with at least four different people credited as its inventor in various Mexican and American bar histories.", bestFor: "A guest who wants the most universally recognizable tequila cocktail, done properly."
  },
  {
    id: "cc8", name: "Paloma", category: "classic", spirit: "Tequila", glassware: "Collins", method: "Build",
    flavorTags: ["Grapefruit", "Citrus", "Effervescent", "Crisp"],
    ingredients: ["2 oz Tequila Blanco", "0.5 oz Fresh Lime Juice", "Grapefruit Soda, Top"],
    garnish: "Grapefruit Wheel, Salt Rim (optional)",
    directions: "Build tequila and lime juice over fresh ice in a Collins glass. Top with grapefruit soda. Garnish and serve.",
    prep: "", funFact: "In Mexico, the Paloma is significantly more commonly ordered than the Margarita.", bestFor: "A tequila drinker who wants something lighter and more refreshing than a Margarita."
  },
  {
    id: "cc9", name: "Vesper", category: "classic", spirit: "Vodka", glassware: "Martini", method: "Shake & Strain",
    flavorTags: ["Botanical", "Citrus Peel", "Bittersweet", "Strong"],
    ingredients: ["3 oz Gin", "1 oz Vodka", "0.5 oz Cocchi Americano"],
    garnish: "Lemon Twist",
    directions: "Shake all ingredients with ice. Strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "The Vesper was invented by Ian Fleming for the novel Casino Royale, where James Bond names it after a character; the \"Kina Lillet\" in the original recipe is generally believed to correspond to today's Cocchi Americano.", bestFor: "A guest who wants a genuinely strong, literary classic rather than a standard martini."
  },
  {
    id: "cc10", name: "Cosmopolitan", category: "classic", spirit: "Vodka", glassware: "Martini", method: "Shake & Strain",
    flavorTags: ["Cranberry", "Citrus", "Sweet-Tart", "Bright"],
    ingredients: ["1.5 oz Citrus Vodka", "0.5 oz Orange Liqueur", "0.5 oz Fresh Lime Juice", "0.5 oz Cranberry Juice"],
    garnish: "Orange Twist",
    directions: "Shake all ingredients with ice. Double strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "The Cosmopolitan surged in popularity through the 1990s, largely credited to its recurring appearances on the television series Sex and the City.", bestFor: "A guest who wants a bright, tart, nostalgic classic."
  },
  {
    id: "cc11", name: "Sidecar", category: "classic", spirit: "Brandy/Cognac", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Citrus", "Orange", "Brandy", "Balanced"],
    ingredients: ["2 oz Cognac", "0.75 oz Orange Liqueur", "0.75 oz Fresh Lemon Juice"],
    garnish: "Sugar Rim (optional), Orange Twist",
    directions: "Shake all ingredients with ice. Double strain into a chilled coupe, rimmed with sugar if desired. Garnish and serve.",
    prep: "", funFact: "The Sidecar is generally believed to have originated in Paris around World War I, and remains one of the defining cognac cocktails in the classic canon.", bestFor: "A guest who wants an elegant, citrus-forward brandy cocktail."
  },
  {
    id: "cc12", name: "Vieux Carré", category: "classic", spirit: "Brandy/Cognac", glassware: "Rocks", method: "Stir & Strain",
    flavorTags: ["Herbal", "Spice", "Dried Fruit", "Rich"],
    ingredients: ["3/4 oz Rye Whiskey", "3/4 oz Cognac", "3/4 oz Sweet Vermouth", "1 tsp Bénédictine", "2 dashes Peychaud's Bitters", "2 dashes Angostura Bitters"],
    garnish: "Lemon Twist or Cherry",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Created in the 1930s at the Hotel Monteleone in New Orleans' French Quarter — \"Vieux Carré\" is French for \"old square,\" the historic name for that neighborhood.", bestFor: "A guest who wants something complex and layered, blending two full base spirits."
  },
  {
    id: "cc13", name: "Naked and Famous", category: "classic", spirit: "Mezcal", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Smoke", "Herbal", "Bitter", "Citrus"],
    ingredients: ["0.75 oz Mezcal", "0.75 oz Aperol", "0.75 oz Yellow Chartreuse", "0.75 oz Fresh Lime Juice"],
    garnish: "None",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Serve without garnish.",
    prep: "", funFact: "Created in 2011 at New York's Death & Co, the Naked and Famous is structured as a modern riff on the Last Word, swapping in mezcal, Aperol, and lime for gin, green Chartreuse, and maraschino.", bestFor: "A guest who wants a smoky, bittersweet, equal-parts modern classic."
  },
  {
    id: "cc14", name: "Mezcal Paloma", category: "classic", spirit: "Mezcal", glassware: "Collins", method: "Build",
    flavorTags: ["Grapefruit", "Smoke", "Citrus", "Crisp"],
    ingredients: ["2 oz Mezcal", "0.5 oz Fresh Lime Juice", "Grapefruit Soda, Top"],
    garnish: "Grapefruit Wheel, Salt Rim (optional)",
    directions: "Build mezcal and lime juice over fresh ice in a Collins glass. Top with grapefruit soda. Garnish and serve.",
    prep: "", funFact: "Swapping mezcal for tequila in a Paloma adds a smoky backbone that plays particularly well with grapefruit's natural bitterness.", bestFor: "A tequila-Paloma drinker who wants to try the smokier mezcal version."
  },
  {
    id: "cc15", name: "Negroni", category: "classic", spirit: "Amaro, Bitters & Aperitifs", glassware: "Rocks Glass", method: "Stir & Strain",
    flavorTags: ["Bitter", "Herbal", "Orange", "Bold"],
    ingredients: ["1 oz Gin", "1 oz Campari", "1 oz Sweet Vermouth"],
    garnish: "Orange Peel",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Legend credits Count Camillo Negroni in 1919 Florence, who asked a bartender to strengthen his Americano by swapping soda water for gin.", bestFor: "A guest who wants a bold, bitter, no-apologies aperitif."
  },
  {
    id: "cc16", name: "Aperol Spritz", category: "classic", spirit: "Amaro, Bitters & Aperitifs", glassware: "Wine Glass", method: "Build",
    flavorTags: ["Orange", "Bitter", "Bubbles", "Light"],
    ingredients: ["3 oz Prosecco", "2 oz Aperol", "1 oz Soda Water"],
    garnish: "Orange Slice",
    directions: "Build over ice in a wine glass: Prosecco first, then Aperol, then a splash of soda water. Stir gently. Garnish and serve.",
    prep: "", funFact: "The Aperol Spritz has roots in 19th-century Veneto, when Austrian soldiers reportedly asked local bartenders to lighten their wine with a splash of water — 'spritzen' in German.", bestFor: "A low-proof, bright aperitif for anyone easing into the evening."
  },
  {
    id: "cc17", name: "Last Word", category: "classic", spirit: "Liqueurs & Cordials", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Herbal", "Cherry", "Citrus", "Bold"],
    ingredients: ["0.75 oz Gin", "0.75 oz Green Chartreuse", "0.75 oz Maraschino Liqueur", "0.75 oz Fresh Lime Juice"],
    garnish: "None",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Serve without garnish.",
    prep: "", funFact: "Invented at the Detroit Athletic Club in the 1920s, the Last Word fell into obscurity for decades before a Seattle bartender revived it in the early 2000s, sparking its modern comeback.", bestFor: "A guest who wants something herbal, bold, and equal-parts balanced."
  },
  {
    id: "cc18", name: "Corpse Reviver No. 2", category: "classic", spirit: "Liqueurs & Cordials", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Citrus", "Orange", "Anise", "Bright"],
    ingredients: ["0.75 oz Gin", "0.75 oz Cointreau", "0.75 oz Lillet Blanc", "0.75 oz Fresh Lemon Juice", "Absinthe Rinse"],
    garnish: "None",
    directions: "Rinse a chilled coupe with absinthe and discard excess. Shake remaining ingredients hard with ice. Double strain into the prepared coupe. Serve without garnish.",
    prep: "", funFact: "Corpse Revivers were a whole 19th-century cocktail category meant as hangover cures; No. 2 is the only one that survived into the modern classic canon in wide use.", bestFor: "A guest who wants something bright, citrusy, and a little unusual."
  }
];
