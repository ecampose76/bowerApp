// Bower — full menu, wine, bar, and coffee data.
// Fictional restaurant (portfolio piece). Food, cocktail, and mocktail
// content is original. Wine, liquor, and coffee content uses real,
// verified producers.

const STYLE_LABELS = {
  sparkling: "Sparkling",
  white: "Whites & Rosés",
  red: "Reds",
  rosé: "Rosé",
  dessert: "Dessert"
};
const STYLE_ORDER = ["sparkling", "white", "rosé", "red", "dessert"];

// Bower — by-the-glass wine list draft (Phase 3b of data.js)
// Real wines/producers, chosen and written by a WSET-3 sommelier's actual
// knowledge. Facts about living winemakers/cellar masters are only stated
// where verified (Domaine Leflaive, Dom Pérignon); elsewhere language stays
// general rather than asserting unverified specifics.
// Structure scale: 1 (lowest) to 5 (highest) for sweetness, acidity, tannin, alcohol, body

const WINES = [
  {
    id: "w1", name: "Ruinart \"R de Ruinart\" Brut", style: "sparkling", price: 26,
    grape: "Chardonnay, Pinot Noir, Pinot Meunier", producer: "Champagne Ruinart", region: "Champagne, France",
    winemaker: "Ruinart's cellar team",
    flavorTags: ["White Peach", "Brioche", "Citrus Zest", "Chalky Mineral"],
    structure: { sweetness: 1, acidity: 4, tannin: 0, alcohol: 2, body: 3 },
    guestDescription: "Ruinart is the oldest Champagne house, founded in 1729 &mdash; this is their signature blend, Chardonnay-led with real depth and a chalky, mineral finish. A beautiful way to open the table.",
    sellingPoints: ["Oldest established Champagne house in the world", "Chardonnay-forward, so more mineral than fruity", "A confident, easy opener for the table"],
    winemakingNote: "Traditional method &mdash; second fermentation happens in the bottle, aged on lees for depth before disgorgement.",
    moment: "The first pour of the night, or anyone who wants real Champagne pedigree without a Grande Marque price tag.",
    memory: "Chalky, citrus-bright, and the house that started it all.",
    pairingDishIds: ["d-scallop-crudo", "d-oyster-mignonette", "d-crudite-royale"],
    pairingReasons: {
      "d-scallop-crudo": "Bright acid and citrus echo the yuzu, cutting through the scallop's natural sweetness.",
      "d-oyster-mignonette": "Chalky minerality is the classic oyster match, mirroring the brine.",
      "d-crudite-royale": "Crisp acid and a light body keep pace with raw vegetables without overpowering them."
    },
    arsenal: "It's literally the oldest Champagne house in existence &mdash; that's a great opening line for a guest who wants to know why it's worth ordering.",
    funFact: "Ruinart was founded in 1729, making it the first officially established Champagne house on record.",
    funFact2: "Much of Ruinart's aging cellar sits in Gallo-Roman chalk quarries beneath Reims, carved out nearly two thousand years ago.",
    shortStory: "Founded by Nicolas Ruinart in 1729, the house predates even Moët. Its chalk-cellar aging and Chardonnay-forward style have kept it a quiet favorite among sommeliers even as it stays smaller than the biggest Champagne names."
  },
  {
    id: "w2", name: "Billecart-Salmon Brut Rosé", style: "sparkling", price: 32,
    grape: "Pinot Noir, Chardonnay, Pinot Meunier", producer: "Champagne Billecart-Salmon", region: "Mareuil-sur-Aÿ, Champagne, France",
    winemaker: "Billecart-Salmon's cellar team",
    flavorTags: ["Wild Strawberry", "Rose Petal", "Blood Orange", "Cream"],
    structure: { sweetness: 1, acidity: 4, tannin: 0, alcohol: 2, body: 3 },
    guestDescription: "A rosé Champagne known for its precision &mdash; pale pink, strawberry and rose petal, with real freshness underneath. It's a favorite among sommeliers for a reason.",
    sellingPoints: ["Family-owned since 1818", "Known for cold, slow fermentation that preserves finesse", "A rosé that leads with elegance, not sweetness"],
    winemakingNote: "Fermented at unusually cold temperatures in small batches, which is part of why the house is known for such precise, delicate fruit.",
    moment: "Celebrations, or a guest who wants rosé Champagne done at the highest level.",
    memory: "Delicate, pale, and precise &mdash; the rosé Champagne other producers measure themselves against.",
    pairingDishIds: ["d-burrata-fig", "d-crudite-royale"],
    pairingReasons: { "d-burrata-fig": "The wine's red berry fruit and acidity balance the fig's sweetness and cut through the burrata's richness.", "d-crudite-royale": "Bright acidity and delicate red fruit keep pace with raw vegetables and the bagna cauda's richness." },
    arsenal: "This is the rosé Champagne a lot of other producers quietly try to copy &mdash; worth mentioning to a guest who already knows Champagne.",
    funFact: "Billecart-Salmon has remained family-owned since its founding in 1818, unusual among Champagne houses of its size.",
    funFact2: "The house is widely credited with pioneering cold-temperature fermentation in Champagne, a technique now common across the region.",
    shortStory: "Founded in 1818 by Nicolas François Billecart and Elisabeth Salmon, the house built its reputation on precision rather than scale, staying independent and family-run through seven generations."
  },
  {
    id: "w3", name: "Domaine Carneros Brut", style: "sparkling", price: 20,
    grape: "Chardonnay, Pinot Noir", producer: "Domaine Carneros", region: "Carneros, Napa Valley, California",
    winemaker: "Domaine Carneros's winemaking team",
    flavorTags: ["Green Apple", "Lemon Curd", "Toasted Almond"],
    structure: { sweetness: 1, acidity: 4, tannin: 0, alcohol: 2, body: 2 },
    guestDescription: "California sparkling wine made in the traditional Champagne method by the Taittinger family &mdash; crisp apple and citrus with a toasty edge. A great domestic option for the table.",
    sellingPoints: ["Made by the Taittinger family's California estate", "Traditional method, same as Champagne", "More approachable price point to open the meal"],
    winemakingNote: "Made using the traditional method, with the second fermentation happening in the bottle, just as it does in Champagne.",
    moment: "Guests who want real technique behind their bubbles without ordering Champagne itself.",
    memory: "Crisp, toasty, and built by real Champagne pedigree on Carneros soil.",
    pairingDishIds: ["d-oyster-mignonette", "d-heirloom-tomato-tart"],
    pairingReasons: { "d-oyster-mignonette": "Citrus and high acidity are a textbook match for briny oysters.", "d-heirloom-tomato-tart": "Crisp acid cuts through the goat cheese while citrus notes echo the balsamic." },
    arsenal: "It's made by the Taittinger family, so it's a good answer for a guest who's hesitant about domestic sparkling wine.",
    funFact: "Domaine Carneros was founded in 1987 by the Taittinger family specifically to make traditional-method sparkling wine in California.",
    funFact2: "The estate's château-style tasting room was modeled after an 18th-century French château.",
    shortStory: "The Taittinger family scouted Carneros for its cool fog and long growing season, close to Champagne's own climate logic, and built a dedicated sparkling house here rather than folding it into an existing Napa winery."
  },
  {
    id: "w4", name: "Domaine Leflaive Mâcon-Verzé", style: "white", price: 28,
    grape: "100% Chardonnay", producer: "Domaine Leflaive", region: "Mâconnais, Burgundy, France",
    winemaker: "Brice de La Morandière, estate director",
    flavorTags: ["Green Apple", "White Flower", "Lemon", "Wet Stone"],
    structure: { sweetness: 1, acidity: 4, tannin: 0, alcohol: 3, body: 3 },
    guestDescription: "This is the accessible side of one of the most famous names in white Burgundy &mdash; Domaine Leflaive, out of Puligny-Montrachet, also makes this bright, mineral Chardonnay in the Mâconnais. Real pedigree at a fair price.",
    sellingPoints: ["From the producer behind some of the most sought-after white Burgundy in the world", "Biodynamically farmed", "Unoaked-leaning, so pure fruit and mineral, not buttery"],
    winemakingNote: "Farmed biodynamically, like all of Leflaive's vineyards &mdash; the estate has been a pioneer of biodynamic viticulture in Burgundy since the 1990s.",
    moment: "Anyone who wants to taste real Burgundy pedigree without ordering off the reserve list.",
    memory: "Mineral, precise, and made by hands that also make some of the world's most collected white wine.",
    pairingDishIds: ["d-scallop-crudo", "d-beet-carpaccio", "d-halibut-nage"],
    pairingReasons: { "d-scallop-crudo": "Stony minerality and citrus mirror the yuzu, while the wine's weight matches the scallop.", "d-beet-carpaccio": "Bright acidity cuts the ricotta's richness and lifts the earthy beet.", "d-halibut-nage": "The wine's citrus and mineral core echo the saffron-fennel nage without overpowering the delicate fish." },
    arsenal: "It's the same family and same farming philosophy behind Leflaive's grand cru Montrachet &mdash; this is the way to taste that hand at the table.",
    funFact: "The Leflaive family has farmed in Puligny-Montrachet since 1717, and has been fully biodynamic since 1997.",
    funFact2: "Domaine Leflaive's top wines, from grand cru sites like Montrachet, are among the most allocated and collected white wines in the world.",
    shortStory: "Best known for grand cru Puligny-Montrachet, Domaine Leflaive also farms sites in the Mâconnais under the same biodynamic philosophy, making this bottling a genuine entry point into the estate's hand and style."
  },
  {
    id: "w5", name: "Henri Bourgeois Sancerre", style: "white", price: 22,
    grape: "100% Sauvignon Blanc", producer: "Henri Bourgeois", region: "Sancerre, Loire Valley, France",
    winemaker: "The Bourgeois family",
    flavorTags: ["Grapefruit", "Gooseberry", "Fresh-Cut Grass", "Flint"],
    structure: { sweetness: 1, acidity: 5, tannin: 0, alcohol: 2, body: 2 },
    guestDescription: "The benchmark for Sauvignon Blanc &mdash; grapefruit and fresh-cut grass with a flinty, mineral edge from the limestone soils. Nine generations of the same family have made wine here.",
    sellingPoints: ["The original home region of Sauvignon Blanc's classic style", "High acid, built for vegetable-forward food", "Family-owned for over 250 years"],
    winemakingNote: "Fermented in stainless steel to preserve the bright, unoaked character that defines the appellation.",
    moment: "Anyone ordering something bright and vegetable-forward off the menu.",
    memory: "Racy, mineral, and the wine every other Sauvignon Blanc in the world gets compared to.",
    pairingDishIds: ["d-chilled-pea-soup", "d-heirloom-tomato-tart", "d-frisee-lardon"],
    pairingReasons: { "d-chilled-pea-soup": "Grassy, high-acid Sauvignon Blanc is a natural mirror for pea and mint.", "d-heirloom-tomato-tart": "Racy acidity cuts the goat cheese and matches the tomato's own brightness.", "d-frisee-lardon": "Cutting acidity balances the bacon and vinaigrette without getting lost." },
    arsenal: "This is the original Sauvignon Blanc region &mdash; New Zealand's whole style was built in reaction to Sancerre.",
    funFact: "The Bourgeois family has been making wine in Sancerre since 1791, across nine generations.",
    funFact2: "Sancerre's distinctive flinty character comes from Kimmeridgian limestone soil, the same seam that runs under Chablis.",
    shortStory: "Sancerre is where Sauvignon Blanc built its reputation for racy, mineral-driven whites, and the Bourgeois family has been part of that story since the late 18th century, still farming as an independent family estate today."
  },
  {
    id: "w6", name: "William Fèvre Chablis", style: "white", price: 26,
    grape: "100% Chardonnay", producer: "Domaine William Fèvre", region: "Chablis, Burgundy, France",
    winemaker: "William Fèvre's winemaking team",
    flavorTags: ["Green Apple", "Lemon Pith", "Oyster Shell", "Wet Stone"],
    structure: { sweetness: 1, acidity: 5, tannin: 0, alcohol: 2, body: 2 },
    guestDescription: "Chablis is Chardonnay with almost none of the buttery, oaky style people expect &mdash; steely, saline, and built entirely around that famous Kimmeridgian limestone. William Fèvre farms more Chablis grand cru than almost anyone.",
    sellingPoints: ["Largest grand cru holder in Chablis", "Unoaked, so pure mineral Chardonnay", "A great answer for guests who say they don't like Chardonnay"],
    winemakingNote: "Aged mostly in stainless steel rather than oak, which is what keeps Chablis so linear and mineral compared to riper, oaked Chardonnay styles.",
    moment: "Guests who love oysters or raw preparations, or who insist they don't like Chardonnay.",
    memory: "Steely, saline, and the clearest expression of Chablis's famous limestone soil.",
    pairingDishIds: ["d-oyster-mignonette", "d-branzino"],
    pairingReasons: { "d-oyster-mignonette": "Literally tastes of oyster shell &mdash; the textbook Chablis-and-oyster pairing.", "d-branzino": "Steely acidity and citrus lift the delicate fish without overwhelming it." },
    arsenal: "If a guest says they don't like Chardonnay, this is usually the bottle that changes their mind &mdash; it doesn't taste anything like an oaked, buttery style.",
    funFact: "William Fèvre is the largest holder of grand cru vineyards in all of Chablis.",
    funFact2: "Chablis sits on Kimmeridgian limestone formed roughly 150 million years ago, rich with fossilized oyster shells.",
    shortStory: "Founded in 1959, William Fèvre grew to become Chablis's largest grand cru landholder, known for a precise, unoaked style that lets the appellation's limestone soils speak for themselves."
  },
  {
    id: "w7", name: "Trimbach Riesling", style: "white", price: 24,
    grape: "100% Riesling", producer: "Maison Trimbach", region: "Alsace, France",
    winemaker: "The Trimbach family",
    flavorTags: ["Lime", "Green Apple", "Petrol", "Wet Slate"],
    structure: { sweetness: 1, acidity: 4, tannin: 0, alcohol: 3, body: 2 },
    guestDescription: "Bone-dry Alsace Riesling &mdash; nothing like the sweet Rieslings most guests expect. Lime and green apple with that classic petrol note Riesling develops with a little age. Twelve generations of the same family behind it.",
    sellingPoints: ["Fully dry, unlike most guests' Riesling expectations", "One of the longest-running family wine estates in France", "Versatile enough to cut through rich or fatty preparations"],
    winemakingNote: "Fermented fully dry in stainless steel and neutral old oak &mdash; Trimbach's house style favors precision and age-worthiness over fruit-forward richness.",
    moment: "Anyone hesitant about Riesling because they assume it's sweet.",
    memory: "Bone-dry, mineral, and proof Riesling doesn't mean sweet.",
    pairingDishIds: ["d-onion-tarte-tatin", "d-mushroom-tart", "d-frog-legs"],
    pairingReasons: { "d-onion-tarte-tatin": "The wine's acid cuts the caramelized onion's sweetness and the comt&eacute;'s richness.", "d-mushroom-tart": "Racy acidity balances the Gruy&egrave;re custard's richness.", "d-frog-legs": "Bright citrus and acid lift the garlic butter without competing with it." },
    arsenal: "This is completely dry &mdash; a great wine to pour for a guest who thinks they don't like Riesling because of sweet supermarket bottles.",
    funFact: "The Trimbach family has been making wine in Alsace since 1626.",
    funFact2: "Alsace is one of the only French regions that labels its wines by grape variety rather than by place, a nod to its German-influenced history.",
    shortStory: "Trimbach has farmed in Ribeauvillé since the 17th century, staying committed to a bone-dry house style even as Riesling's global reputation swung toward sweeter styles &mdash; a choice that's kept the estate a benchmark for dry Riesling."
  },
  {
    id: "w8", name: "Domaine Georges Vernay Condrieu", style: "white", price: 38,
    grape: "100% Viognier", producer: "Domaine Georges Vernay", region: "Condrieu, Northern Rhône, France",
    winemaker: "Christine Vernay",
    flavorTags: ["Apricot", "Honeysuckle", "White Peach", "Beeswax"],
    structure: { sweetness: 1, acidity: 2, tannin: 0, alcohol: 4, body: 4 },
    guestDescription: "Condrieu is the wine that put Viognier on the map &mdash; apricot, honeysuckle, and white peach with real weight on the palate. Georges Vernay is credited with saving the appellation from near-extinction in the 1960s.",
    sellingPoints: ["Made by the producer most credited with saving the Condrieu appellation", "Full-bodied white for guests who want more than a light, crisp pour", "A rich, aromatic match for richer vegetable and shellfish dishes"],
    winemakingNote: "Viognier is a notoriously difficult grape to farm, low-yielding and prone to disease, which is part of why Condrieu nearly disappeared before Vernay's generation replanted it.",
    moment: "A guest who wants something full and aromatic instead of lean and mineral.",
    memory: "Rich, floral, and the wine that brought an entire grape variety back from the brink.",
    pairingDishIds: ["d-foie-torchon", "d-crudite-royale"],
    pairingReasons: { "d-foie-torchon": "The wine's weight and stone-fruit sweetness stand up to foie gras the way only a full-bodied white can.", "d-crudite-royale": "Its richness and orchard-fruit character soften the raw vegetables &mdash; an unexpected, luxurious pairing." },
    arsenal: "Georges Vernay is one of the reasons Condrieu still exists as an appellation &mdash; it had shrunk to a handful of vineyards before his generation replanted it.",
    funFact: "By the 1960s, Condrieu had shrunk to fewer than ten hectares of vines; Georges Vernay was central to its replanting and revival.",
    funFact2: "Viognier is considered one of the more difficult white grapes to farm, with naturally low and inconsistent yields.",
    shortStory: "Georges Vernay took over the family domaine in the 1950s, when Condrieu was nearly extinct as an appellation, and spent decades replanting and championing Viognier. His daughter Christine now runs the estate, continuing that work."
  },
  {
    id: "w9", name: "Domäne Wachau Terrassen Grüner Veltliner", style: "white", price: 20,
    grape: "100% Grüner Veltliner", producer: "Domäne Wachau", region: "Wachau, Austria",
    winemaker: "Domäne Wachau's winemaking team",
    flavorTags: ["White Pepper", "Green Apple", "Lentil", "Citrus Pith"],
    structure: { sweetness: 1, acidity: 4, tannin: 0, alcohol: 3, body: 3 },
    guestDescription: "Grüner Veltliner is Austria's signature grape &mdash; green apple and citrus with a distinctive white pepper spice. Built for exactly the kind of vegetable-forward food we serve here.",
    sellingPoints: ["Austria's most planted and most distinctive grape", "That white pepper note is genuinely built for green, vegetal dishes", "A grower cooperative representing hundreds of small Wachau vineyard families"],
    winemakingNote: "Fermented in stainless steel to preserve the grape's signature peppery spice and fresh green fruit.",
    moment: "The single best glass on the list for anyone ordering off the Garden or Accompaniments sections.",
    memory: "Peppery, green, and built specifically for vegetable-forward cooking.",
    pairingDishIds: ["d-crudite-royale", "d-heirloom-carrot-soup", "d-haricots-verts"],
    pairingReasons: { "d-crudite-royale": "White pepper spice and high acid are a natural match for raw, vegetal flavors.", "d-heirloom-carrot-soup": "The wine's peppery spice echoes the toasted cumin, while acid cuts the cr&egrave;me fra&icirc;che.", "d-haricots-verts": "Green, vegetal notes in the wine mirror the dish; acid balances the brown butter." },
    arsenal: "If a guest is ordering mostly vegetable dishes, this is the pairing &mdash; the white pepper note in Grüner Veltliner is made for green, herbal flavors.",
    funFact: "Grüner Veltliner is Austria's most widely planted grape variety, accounting for roughly a third of the country's vineyards.",
    funFact2: "The Wachau's terraced vineyards along the Danube are steep enough that much of the harvest still has to be done by hand.",
    shortStory: "Domäne Wachau is a growers' cooperative representing hundreds of small family vineyard holdings along the Danube's terraced slopes, farming a grape variety that's become almost synonymous with Austrian wine."
  },
  {
    id: "w10", name: "Domaine Tempier Bandol Rosé", style: "rosé", price: 30,
    grape: "Mourvèdre, Grenache, Cinsault", producer: "Domaine Tempier", region: "Bandol, Provence, France",
    winemaker: "The Peyraud family",
    flavorTags: ["Watermelon", "Wild Herb", "White Pepper", "Dried Strawberry"],
    structure: { sweetness: 1, acidity: 3, tannin: 1, alcohol: 3, body: 3 },
    guestDescription: "This isn't a poolside pink wine &mdash; Bandol rosé has real structure and savory, herbal depth from the Mourvèdre grape. Tempier is the estate most credited with proving rosé could be serious.",
    sellingPoints: ["The estate most credited with elevating rosé's reputation among serious wine drinkers", "Mourvèdre gives it more structure than a typical Provence rosé", "Built for food, not just sipping"],
    winemakingNote: "Mourvèdre is a thick-skinned, late-ripening grape that gives Bandol rosé more color, structure, and savory character than lighter Provençal styles.",
    moment: "A guest who says they don't usually drink rosé.",
    memory: "Herbal, savory, and structured enough to hold up to real food.",
    pairingDishIds: ["d-burrata-fig", "d-endive-walnut-salad"],
    pairingReasons: { "d-burrata-fig": "Dried strawberry and herb notes complement the fig, while the wine's structure stands up to burrata.", "d-endive-walnut-salad": "The ros&eacute;'s fruit and light tannin balance the Roquefort's funk and the walnut's bitterness." },
    arsenal: "This is the rosé that convinced serious collectors rosé was worth cellaring &mdash; a great pour for a rosé skeptic.",
    funFact: "The Peyraud family, who've run Tempier since the 1930s, are widely credited with pioneering rosé as a serious, age-worthy wine style.",
    funFact2: "Bandol's appellation rules require a minimum of Mourvèdre, a grape that struggles to ripen almost anywhere else in France.",
    shortStory: "Lucien and Lulu Peyraud took over Domaine Tempier in the 1930s and spent decades convincing the wine world that Provençal rosé, built on structured Mourvèdre, deserved a serious table &mdash; not just a summer patio."
  },
  {
    id: "w11", name: "Louis Jadot Volnay", style: "red", price: 34,
    grape: "100% Pinot Noir", producer: "Maison Louis Jadot", region: "Volnay, Burgundy, France",
    winemaker: "Louis Jadot's winemaking team",
    flavorTags: ["Red Cherry", "Rose Petal", "Forest Floor", "Baking Spice"],
    structure: { sweetness: 1, acidity: 4, tannin: 2, alcohol: 3, body: 3 },
    guestDescription: "Volnay is known as the most fragrant, silky village in Burgundy &mdash; red cherry and rose petal with soft, fine tannin. Louis Jadot has been making Burgundy since 1859.",
    sellingPoints: ["From one of Burgundy's most historic négociant houses", "Volnay is the softest, most perfumed red Burgundy village", "Light enough in tannin to work with lighter mains, not just steak"],
    winemakingNote: "Aged in French oak, a portion new, to add structure without covering up Pinot Noir's naturally delicate character.",
    moment: "A guest who wants red Burgundy but is nervous about ordering something too austere.",
    memory: "Silky, perfumed, and the most approachable of the great red Burgundy villages.",
    pairingDishIds: ["d-duck-breast", "d-mushroom-veloute", "d-coq-au-vin"],
    pairingReasons: { "d-duck-breast": "Red cherry echoes the gastrique, and the wine's soft tannin doesn't fight the duck's richness.", "d-mushroom-veloute": "Forest floor notes in the wine mirror the truffle and mushroom directly.", "d-coq-au-vin": "Classic regional logic &mdash; the same grape often used to braise the dish, now poured alongside it." },
    arsenal: "Volnay is famous for being the most feminine, perfumed red Burgundy village &mdash; a good way to frame it for a guest new to the region.",
    funFact: "Louis Jadot was founded in 1859 and remains one of Burgundy's most respected négociant-producers.",
    funFact2: "Volnay is one of the few Burgundy villages with no grand cru vineyards at all, yet its premier crus are among the most sought-after in the Côte de Beaune.",
    shortStory: "Louis Jadot has sourced and produced Burgundy since the mid-19th century, and its Volnay bottling reflects the village's reputation as the softest, most fragrant expression of red Burgundy."
  },
  {
    id: "w12", name: "Domaine du Vieux Télégraphe Châteauneuf-du-Pape", style: "red", price: 42,
    grape: "Grenache, Mourvèdre, Syrah, and field blend", producer: "Domaine du Vieux Télégraphe", region: "Châteauneuf-du-Pape, Southern Rhône, France",
    winemaker: "The Brunier family",
    flavorTags: ["Black Cherry", "Garrigue Herb", "White Pepper", "Leather"],
    structure: { sweetness: 1, acidity: 3, tannin: 4, alcohol: 5, body: 5 },
    guestDescription: "Big, warm, and full of the wild herb character locals call garrigue &mdash; this is classic Southern Rhône at full volume. The Brunier family farms one of the most respected estates in the appellation.",
    sellingPoints: ["One of Châteauneuf-du-Pape's most consistently respected estates", "Full-bodied enough to stand up to braised, rich dishes", "A blend of up to 13 permitted grape varieties, though Grenache leads"],
    winemakingNote: "Farmed on the appellation's famous galets roulés &mdash; large rounded stones that store heat during the day and release it at night, helping ripen the grapes fully.",
    moment: "Anyone ordering the short rib or lamb who wants a wine with real weight.",
    memory: "Warm, herbal, and full-bodied &mdash; the Southern Rhône at its most classic.",
    pairingDishIds: ["d-lamb-rack", "d-short-rib"],
    pairingReasons: { "d-lamb-rack": "Garrigue herb notes mirror the herb crust, and the wine's structure matches the lamb's richness.", "d-short-rib": "Full body and firm tannin are built for slow-braised, fatty short rib." },
    arsenal: "Those big round stones in Châteauneuf's vineyards are famous for storing heat overnight &mdash; a fun visual for guests curious about the region.",
    funFact: "Châteauneuf-du-Pape's appellation rules technically permit up to 13 different grape varieties in the blend, though Grenache typically dominates.",
    funFact2: "The vineyard's rounded stones, called galets roulés, were deposited by glacial rivers millions of years ago.",
    shortStory: "The Brunier family has farmed Vieux Télégraphe since 1898, on one of Châteauneuf-du-Pape's highest and stoniest plateaus, and the estate is consistently ranked among the appellation's most serious producers."
  },
  {
    id: "w13", name: "Produttori del Barbaresco Barbaresco", style: "red", price: 36,
    grape: "100% Nebbiolo", producer: "Produttori del Barbaresco", region: "Barbaresco, Piedmont, Italy",
    winemaker: "Produttori del Barbaresco's winemaking team",
    flavorTags: ["Dried Cherry", "Tar", "Rose", "Dried Herb"],
    structure: { sweetness: 1, acidity: 4, tannin: 4, alcohol: 4, body: 4 },
    guestDescription: "Nebbiolo is one of the most food-driven grapes in the world &mdash; high acid, real tannin, dried cherry and rose. This cooperative pools fruit from some of Barbaresco's best growers.",
    sellingPoints: ["A growers' cooperative representing some of Barbaresco's best vineyard sites", "High acid and tannin make it a natural match for rich, earthy dishes", "More accessible pricing than the region's famous single-estate bottles"],
    winemakingNote: "The cooperative model means fruit from dozens of small growers is vinified together, giving consistent quality at a lower price than single-estate Barbaresco.",
    moment: "A guest who wants serious Italian red with the mushroom Wellington or the veal blanquette.",
    memory: "High acid, real tannin, and classic dried-cherry Nebbiolo character.",
    pairingDishIds: ["d-mushroom-wellington", "d-veal-blanquette"],
    pairingReasons: { "d-mushroom-wellington": "High acid cuts the pastry's richness while earthy notes echo the mushroom duxelles.", "d-veal-blanquette": "The wine's firm tannin and acid cut through the cream sauce without overwhelming the delicate veal." },
    arsenal: "This is a growers' co-op, not a single estate &mdash; it's one of the best ways to taste real Barbaresco without the price tag of the famous single-vineyard bottlings.",
    funFact: "Produttori del Barbaresco was founded in 1958 by a group of growers pooling resources, and remains a cooperative today.",
    funFact2: "Nebbiolo takes its name from 'nebbia,' Italian for fog, referring to the autumn mist that settles over Piedmont's hills during harvest.",
    shortStory: "Founded when a handful of Barbaresco growers banded together in 1958, the cooperative has become one of the most respected names in the region, proving that a shared cellar doesn't mean a compromise on quality."
  },
  {
    id: "w14", name: "CVNE Imperial Reserva", style: "red", price: 30,
    grape: "Tempranillo, Graciano, Mazuelo", producer: "CVNE (Compañía Vinícola del Norte de España)", region: "Rioja, Spain",
    winemaker: "CVNE's winemaking team",
    flavorTags: ["Dried Fig", "Vanilla", "Leather", "Red Plum"],
    structure: { sweetness: 1, acidity: 3, tannin: 3, alcohol: 4, body: 4 },
    guestDescription: "A classic Rioja Reserva &mdash; dried fig and leather from extended aging, with Tempranillo's soft red fruit underneath. CVNE has been making wine in Rioja since 1879.",
    sellingPoints: ["One of Rioja's oldest and most respected houses", "Reserva-level aging requirements mean real time in barrel and bottle before release", "Soft enough in tannin to work with a wide range of the menu"],
    winemakingNote: "Reserva designation requires a minimum of three years' aging, including at least one year in oak, before release &mdash; part of why it shows that classic dried-fruit, leathery profile.",
    moment: "A guest who wants a classic, food-friendly red without heavy tannin.",
    memory: "Dried fruit, leather, and the kind of soft, aged character Rioja Reserva is known for.",
    pairingDishIds: ["d-duck-breast", "d-short-rib"],
    pairingReasons: { "d-duck-breast": "Dried fruit and vanilla from oak aging complement the cherry gastrique.", "d-short-rib": "The wine's body and moderate tannin are built for braised, fatty beef." },
    arsenal: "Reserva is a legal aging requirement in Rioja, not just a marketing term &mdash; worth explaining to guests curious about the label.",
    funFact: "CVNE was founded in 1879 and remains one of the handful of historic family-founded houses still shaping Rioja's reputation today.",
    funFact2: "Rioja's Reserva classification legally requires a minimum of three years of aging before the wine can be released, with at least one year in oak.",
    shortStory: "Founded in 1879 during Rioja's rise as a wine region, CVNE has stayed committed to the traditional, extended-aging style that first built Rioja's international reputation."
  },
  {
    id: "w15", name: "Domaine Drouhin Oregon \"Dundee Hills\" Pinot Noir", style: "red", price: 38,
    grape: "100% Pinot Noir", producer: "Domaine Drouhin Oregon", region: "Dundee Hills, Willamette Valley, Oregon",
    winemaker: "Véronique Drouhin-Boss",
    flavorTags: ["Red Cherry", "Cranberry", "Forest Floor", "Baking Spice"],
    structure: { sweetness: 1, acidity: 4, tannin: 2, alcohol: 3, body: 3 },
    guestDescription: "The Oregon outpost of Burgundy's Maison Joseph Drouhin &mdash; bright red cherry and forest floor, made with the same hand that's been farming Burgundy for generations.",
    sellingPoints: ["Built by a historic Burgundy family who chose Oregon specifically for its Pinot Noir potential", "American Pinot Noir made with genuine Burgundian technique", "Fourth-generation Burgundy winemaker at the helm"],
    winemakingNote: "Farmed and vinified with the same restrained, Burgundian approach the Drouhin family uses at home &mdash; whole-cluster fermentation and minimal new oak.",
    moment: "A guest who loves red Burgundy and is curious what Oregon does with the same grape.",
    memory: "Bright, earthy, and Burgundian technique applied to Oregon soil.",
    pairingDishIds: ["d-duck-breast", "d-mushroom-veloute"],
    pairingReasons: { "d-duck-breast": "Bright red fruit and soft tannin are the classic Pinot-and-duck pairing.", "d-mushroom-veloute": "Earthy forest-floor notes in the wine echo the truffle directly." },
    arsenal: "This is made by the same family behind Maison Joseph Drouhin in Burgundy &mdash; they scouted the Willamette Valley in the 1980s specifically because the climate reminded them of home.",
    funFact: "The Drouhin family, longtime Burgundy producers, planted their first Oregon vines in 1988 after years of scouting the Willamette Valley.",
    funFact2: "Véronique Drouhin-Boss, who oversees the Oregon estate, is a fourth-generation winemaker in the Drouhin family.",
    shortStory: "Maison Joseph Drouhin has made Burgundy since 1880. In the 1980s the family bet that Oregon's Willamette Valley could grow serious Pinot Noir, planting Domaine Drouhin Oregon in 1988 &mdash; a bet that's since been widely validated."
  },
  {
    id: "w16", name: "M. Chapoutier \"Les Meysonniers\" Crozes-Hermitage", style: "red", price: 26,
    grape: "100% Syrah", producer: "M. Chapoutier", region: "Crozes-Hermitage, Northern Rhône, France",
    winemaker: "Michel Chapoutier",
    flavorTags: ["Blackberry", "Cracked Pepper", "Smoked Meat", "Violet"],
    structure: { sweetness: 1, acidity: 3, tannin: 3, alcohol: 4, body: 4 },
    guestDescription: "Northern Rhône Syrah at its most peppery and savory &mdash; blackberry and cracked black pepper with a smoky edge. Chapoutier is also known for putting Braille on every one of their labels.",
    sellingPoints: ["Biodynamic since the 1990s, ahead of most of the region", "Classic peppery, savory Northern Rhône Syrah character", "Approachable Crozes-Hermitage pricing next to pricier Hermitage bottlings"],
    winemakingNote: "Farmed biodynamically, a practice Chapoutier adopted earlier than most of the Rhône Valley.",
    moment: "A guest who wants a savory, peppery red with the coq au vin or the mushroom Wellington.",
    memory: "Peppery, smoky Syrah, and a house known for genuine accessibility in more ways than one.",
    pairingDishIds: ["d-coq-au-vin", "d-mushroom-wellington"],
    pairingReasons: { "d-coq-au-vin": "Peppery spice and dark fruit stand up to the wine-braised chicken and bacon.", "d-mushroom-wellington": "Smoked-meat notes in the wine echo the pastry's savory depth." },
    arsenal: "Chapoutier prints every label in Braille, a practice they started decades ago and still carry through their whole range &mdash; a nice detail for guests who ask about the bottle.",
    funFact: "M. Chapoutier began printing Braille on its wine labels in the early 1990s and has continued the practice ever since.",
    funFact2: "Chapoutier was among the first major Rhône houses to convert to biodynamic farming, starting in 1990.",
    shortStory: "Michel Chapoutier took over the family house in the late 1980s and pushed it toward biodynamic farming well ahead of most of the Rhône, while also making the estate one of the wine world's most visible advocates for accessibility."
  },
  {
    id: "w17", name: "Château Coutet, Barsac", style: "dessert", price: 24,
    grape: "Sémillon, Sauvignon Blanc, Muscadelle", producer: "Château Coutet", region: "Barsac, Sauternais, Bordeaux, France",
    winemaker: "Château Coutet's winemaking team",
    flavorTags: ["Apricot", "Honey", "Candied Orange", "Saffron"],
    structure: { sweetness: 5, acidity: 4, tannin: 0, alcohol: 3, body: 4 },
    guestDescription: "A botrytized dessert wine from Barsac, Sauternes' neighboring appellation &mdash; apricot and honey with real acid keeping it from tasting cloying. A classified growth since 1855.",
    sellingPoints: ["Classified growth status since the 1855 Bordeaux classification", "Barsac's style is typically lighter and fresher than Sauternes proper", "High acid keeps the sweetness balanced rather than heavy"],
    winemakingNote: "Made from grapes affected by botrytis cinerea, 'noble rot,' which concentrates sugar and adds a distinctive honeyed, saffron-like character.",
    moment: "The foie gras or the cheese course &mdash; a classic sweet-savory pairing.",
    memory: "Honeyed, apricot-laced, and balanced by real acid.",
    pairingDishIds: ["d-foie-torchon", "d-fromage-plate", "d-pear-frangipane"],
    pairingReasons: { "d-foie-torchon": "The classic Sauternes-family pairing &mdash; sweetness balances foie gras's richness.", "d-fromage-plate": "Honeyed sweetness and acid cut through rich, funky cheese.", "d-pear-frangipane": "Apricot and honey notes mirror the poached pear and almond cream directly." },
    arsenal: "Barsac technically sits within the Sauternes region but is allowed its own appellation name &mdash; its wines tend to be a touch lighter and fresher than Sauternes proper.",
    funFact: "Château Coutet was classified as a premier cru in the original 1855 Bordeaux classification, a ranking still used today.",
    funFact2: "Noble rot, the botrytis fungus responsible for Sauternes and Barsac's concentrated sweetness, only develops properly under a specific combination of morning fog and afternoon sun.",
    shortStory: "One of the oldest estates in Barsac, Château Coutet has carried classified-growth status since 1855 and remains one of the appellation's most consistent producers of age-worthy botrytized wine."
  },
  {
    id: "w18", name: "Royal Tokaji \"Blue Label\" 5 Puttonyos", style: "dessert", price: 28,
    grape: "Furmint, Hárslevelű, Sárga Muskotály", producer: "The Royal Tokaji Wine Company", region: "Tokaj, Hungary",
    winemaker: "Royal Tokaji's winemaking team",
    flavorTags: ["Dried Apricot", "Marmalade", "Candied Ginger", "Honey"],
    structure: { sweetness: 5, acidity: 5, tannin: 0, alcohol: 3, body: 3 },
    guestDescription: "Tokaji is Hungary's answer to Sauternes &mdash; some of the highest natural acid of any dessert wine in the world, which is what keeps it from ever tasting heavy. Dried apricot and marmalade with real cut.",
    sellingPoints: ["Hungary's historic dessert wine, once favored by European royal courts", "Exceptionally high acid for a dessert wine, so it never feels cloying", "'Puttonyos' measures the concentration of botrytized grapes in the blend"],
    winemakingNote: "Puttonyos refers to the traditional baskets of botrytized grapes added to the base wine; 5 puttonyos indicates a higher concentration of that intensely sweet, botrytized fruit.",
    moment: "The lemon tart or the cheese course &mdash; its acid cuts through citrus and salt equally well.",
    memory: "Marmalade-rich but razor-sharp with acid &mdash; nothing else on the list tastes quite like it.",
    pairingDishIds: ["d-lemon-tart", "d-fromage-plate"],
    pairingReasons: { "d-lemon-tart": "High acid keeps the wine from feeling cloying next to the tart's own citrus.", "d-fromage-plate": "Concentrated sweetness and acid are built to cut through rich, salty cheese." },
    arsenal: "Tokaji has one of the longest documented histories of any wine region in the world, with quality classifications dating back to the 1700s, predating even the 1855 Bordeaux system.",
    funFact: "Tokaji's vineyard classification system dates to the early 18th century, making it one of the oldest formal wine classifications in the world.",
    funFact2: "Louis XIV of France reportedly called Tokaji 'the wine of kings, the king of wines.'",
    shortStory: "Tokaji was prized across European royal courts for centuries before phylloxera and, later, Communist-era collectivization nearly ended the region's fine-wine tradition. Royal Tokaji, founded in 1990 with international investment, helped lead its modern revival."
  }
];

// Bower — food menu draft (Phase 3a of data.js)
// Vegetable-forward French technique, Michelin-caliber, relaxed-luxury
// garden aesthetic. Entirely original content — fictional restaurant.
// Season reflected: early autumn.
// pairedWineIds left empty — filled once the wine list (Phase 3b) exists.

const SECTION_ORDER = ["From the Garden", "Starters", "Soups & Salads", "Entrées", "Accompaniments", "Sauces & Butters", "Desserts"];

const DISHES = [
  // ---------- FROM THE GARDEN (raw / crudo / vegetable-led openers) ----------
  { id: "d-heirloom-tomato-tart", price: 22, image: "images/heirloom-tomato-tart.jpg", name: "Heirloom Tomato Tart", section: "From the Garden", description: "Whipped goat cheese, basil oil, aged balsamic, shatter-crust pastry", pairedWineIds: ["w3","w5"], quizClue: "Thin-sliced heirloom tomatoes fanned over a whipped chèvre base on a laminated butter pastry, finished with basil oil and a thread of aged balsamic.", dropLine: "The heirloom tomato tart — whipped goat cheese, basil oil, and a thread of twelve-year balsamic.", ingredients: "Laminated pâte feuilletée, heirloom tomatoes, goat cheese, crème fraîche, basil, extra virgin olive oil, 12-year aged balsamic, Maldon salt", chefPrep: "Pastry blind-baked to a shattering crisp base, spread with whipped goat cheese and crème fraîche, topped with hand-sliced heirloom tomatoes seasoned and left to marinate briefly, finished tableside with basil oil and balsamic reduction.", chefPrepStory: "We start with a butter pastry, baked until it's beautifully crisp. Once it's cooled, we spread it with a whipped goat cheese and crème fraîche, light and tangy. Then come the heirloom tomatoes, hand-sliced and left to marinate for a few minutes so their flavor really comes through. We finish the tart right at the table, with a drizzle of basil oil and a thread of aged balsamic.", allergensInRecipe: ["dairy", "gluten"], allergensRemovable: [] },
  { id: "d-scallop-crudo", price: 26, name: "Scallop Crudo", section: "From the Garden", description: "Yuzu-brown butter, compressed cucumber, finger lime, chive oil", pairedWineIds: ["w1","w4","bw1"], quizClue: "Thin-sliced diver scallops dressed with a nutty brown butter emulsion cut by yuzu, over compressed cucumber and finger lime pearls.", dropLine: "Diver scallop crudo, dressed in yuzu-brown butter over compressed cucumber and finger lime.", ingredients: "Diver scallops, brown butter, yuzu juice, English cucumber, finger lime, chives, olive oil, sea salt", chefPrep: "Scallops sliced paper-thin and arranged in a rosette, dressed with a yuzu-brown butter emulsion, garnished with compressed cucumber batons, finger lime caviar, and chive oil just before service.", allergensInRecipe: ["shellfish", "dairy", "citrus"], allergensRemovable: [] },
  { id: "d-beet-carpaccio", price: 19, name: "Beet Carpaccio", section: "From the Garden", description: "Whipped ricotta, pistachio, sherry vinegar, wild fennel", pairedWineIds: ["w4"], quizClue: "Slow-roasted beets sliced tableside-thin over whipped ricotta, dusted with crushed pistachio and a sherry vinegar gastrique.", dropLine: "Beet carpaccio, sliced tableside over whipped ricotta with pistachio and a sherry gastrique.", ingredients: "Heirloom beets (candy-striped and red), ricotta, heavy cream, pistachio, sherry vinegar, honey, wild fennel fronds, olive oil", chefPrep: "Beets salt-roasted whole, cooled, peeled, and sliced on a mandoline. Ricotta whipped with cream until light, spread as a base, beets fanned over top, finished with crushed pistachio, sherry gastrique, and fennel fronds.", allergensInRecipe: ["dairy", "vinegar"], allergensRemovable: [] },
  { id: "d-oyster-mignonette", price: 24, name: "Garden Oysters", section: "From the Garden", description: "Cucumber-verjus mignonette, dill, pink peppercorn", pairedWineIds: ["w1","w3","w6"], quizClue: "Half-shell oysters dressed with a bright cucumber and verjus mignonette in place of the classic shallot-vinegar version.", dropLine: "Our garden oysters, with a cucumber-verjus mignonette in place of the usual shallot and vinegar.", ingredients: "East Coast oysters, English cucumber, verjus, shallot, dill, pink peppercorn, lemon", allergensRemovable: ["onion"], chefPrep: "Oysters shucked to order over crushed ice. Mignonette made by fine-dicing cucumber and shallot into verjus with cracked pink peppercorn and dill, spooned over each oyster tableside.", allergensInRecipe: ["shellfish", "onion", "citrus"] },
  { id: "d-burrata-fig", price: 21, name: "Burrata & Fig", section: "From the Garden", description: "Charred fig, honeycomb, marcona almond, aged sherry", pairedWineIds: ["w2","w10","bw1","bw5"], quizClue: "A whole burrata split tableside over charred figs, with honeycomb and marcona almonds for texture.", dropLine: "A whole burrata split over charred fig, with honeycomb, marcona almond, and aged sherry.", ingredients: "Burrata, fresh figs, raw honeycomb, marcona almonds, aged sherry vinegar, olive oil, flaky salt, torn basil", chefPrep: "Figs halved and lightly charred on the plancha, plated around a whole burrata, finished with honeycomb, crushed marcona almonds, a drizzle of aged sherry vinegar, and torn basil.", allergensInRecipe: ["dairy"], allergensRemovable: [] },
  { id: "d-crudite-royale", price: 19, name: "Crudité Royale", section: "From the Garden", description: "Market vegetables, whipped bagna cauda, herb ranch, radish butter", pairedWineIds: ["w1","w2","w8","w9","bw5"], quizClue: "A tiered presentation of the day's best raw market vegetables with a trio of house dips built around a warm anchovy-garlic bagna cauda.", dropLine: "The crudité royale — today's market vegetables with a warm whipped bagna cauda.", ingredients: "Seasonal market vegetables, anchovy, garlic, olive oil, butter, crème fraîche, fresh herbs, cultured butter, flaky salt", chefPrep: "Vegetables trimmed and cut fresh to order, bagna cauda warmed gently to keep the emulsion from breaking, radishes served with a quenelle of cultured butter and flaky salt in the Parisian style.", allergensInRecipe: ["fish", "garlic", "dairy"], allergensRemovable: ["garlic"] },

  // ---------- STARTERS ----------
  { id: "d-escargot-toast", price: 22, name: "Escargot Toast", section: "Starters", description: "Garlic-parsley butter, grilled levain, Pernod", pairedWineIds: [], quizClue: "Burgundy snails finished in a classic garlic-parsley butter with a whisper of Pernod, served open-faced over grilled levain instead of the shell.", dropLine: "Escargot on grilled levain, finished in garlic-parsley butter with a touch of Pernod.", ingredients: "Burgundy escargot, cultured butter, garlic, parsley, shallot, Pernod, levain bread", chefPrep: "Escargot warmed through in a garlic-parsley compound butter finished with a splash of Pernod, spooned generously over grilled and buttered levain toast points.", allergensInRecipe: ["gluten", "dairy", "garlic", "onion", "alcohol"], allergensRemovable: ["garlic", "onion"] },
  { id: "d-mushroom-tart", price: 23, name: "Wild Mushroom Tart", section: "Starters", description: "Gruyère custard, thyme, black garlic jus", pairedWineIds: ["w7","bw4"], quizClue: "A savory custard tart layered with sautéed wild mushrooms and Gruyère, finished with a black garlic reduction.", dropLine: "Wild mushroom tart, layered in a Gruyère custard with a black garlic jus.", ingredients: "Wild mushroom medley, Gruyère, eggs, cream, pâte brisée, thyme, black garlic, shallot", chefPrep: "Mushrooms sautéed hard to drive off moisture, folded into a Gruyère custard, baked in a blind-baked tart shell until just set, finished with a black garlic jus and fresh thyme.", allergensInRecipe: ["gluten", "dairy", "eggs", "garlic", "onion"], allergensRemovable: ["garlic", "onion"] },
  { id: "d-foie-torchon", price: 34, name: "Foie Gras Torchon", section: "Starters", description: "Roasted plum, brioche, sauternes gelée, hazelnut praline", pairedWineIds: ["w8","w17","bw4","bw10"], quizClue: "A house-cured foie gras torchon paired with roasted stone fruit, a sauternes gelée, and toasted brioche.", dropLine: "Foie gras torchon, with roasted plum, a sauternes gelée, and warm brioche.", ingredients: "Foie gras, sauternes, plums, brioche, hazelnuts, sugar, flaky salt", chefPrep: "Foie gras cured, rolled into a torchon, and poached gently sous vide, sliced to order. Plated with roasted plum, a sauternes wine gelée, hazelnut praline, and warm brioche.", allergensInRecipe: ["gluten", "dairy", "eggs", "alcohol", "tree nuts"], allergensRemovable: [] },
  { id: "d-frog-legs", price: 26, name: "Provençal Frog Legs", section: "Starters", description: "Garlic-parsley beurre noisette, lemon, fried capers", pairedWineIds: ["w7"], quizClue: "Lightly floured frog legs pan-fried and finished in a nutty brown butter with garlic, parsley, and crisped capers.", dropLine: "Provençal frog legs, finished in a garlic-parsley beurre noisette with fried capers.", ingredients: "Frog legs, flour, butter, garlic, parsley, capers, lemon", chefPrep: "Frog legs dredged lightly and pan-seared, finished in the pan with browned butter, garlic, parsley, and fried capers, brightened with fresh lemon at the pass.", allergensInRecipe: ["gluten", "dairy", "garlic", "citrus"], allergensRemovable: ["garlic"] },
  { id: "d-leek-terrine", price: 19, name: "Leek & Egg Terrine", section: "Starters", description: "Sauce gribiche, brioche crumb, chive", pairedWineIds: [], quizClue: "A classic bistro terrine of poached leeks and soft egg set in aspic, served cold with a mustard-forward sauce gribiche.", dropLine: "A cold leek and egg terrine, with a classic sauce gribiche.", ingredients: "Leeks, eggs, vegetable stock gelée, Dijon mustard, cornichon, capers, parsley, brioche", chefPrep: "Leeks poached and pressed into a terrine with soft-cooked eggs and a light vegetable aspic, chilled, sliced, and served with a classic gribiche and toasted brioche crumb.", allergensInRecipe: ["eggs", "mustard", "gluten", "dairy"], allergensRemovable: [] },
  { id: "d-snail-fritters", price: 21, name: "Snail & Herb Fritters", section: "Starters", description: "Whipped garlic aioli, lemon zest", pairedWineIds: [], quizClue: "Chopped escargot folded into an herbed fritter batter and fried until golden, served with a whipped garlic aioli.", dropLine: "Snail and herb fritters, with a whipped garlic aioli.", ingredients: "Escargot, flour, eggs, parsley, chives, garlic, egg yolk, olive oil, lemon", chefPrep: "Escargot chopped and folded into a light herb batter, fried to order until golden and crisp, served with a fresh whipped garlic aioli and lemon zest.", allergensInRecipe: ["gluten", "eggs", "garlic", "citrus"], allergensRemovable: ["garlic"] },
  { id: "d-onion-tarte-tatin", price: 20, name: "Onion Tarte Tatin", section: "Starters", description: "Caramelized cipollini, aged comté, thyme, sherry caramel", pairedWineIds: ["w7"], quizClue: "A savory riff on the classic tatin — cipollini onions caramelized in butter and sugar, baked under puff pastry, inverted and topped with aged Comté.", dropLine: "An onion tarte tatin — cipollini caramelized under puff pastry, topped with aged Comté.", ingredients: "Cipollini onions, puff pastry, butter, sugar, sherry vinegar, Comté, thyme", chefPrep: "Cipollini onions caramelized slowly in butter and sugar in a cast pan, topped with puff pastry and baked, then inverted onto a plate and finished with shaved Comté and a sherry caramel.", allergensInRecipe: ["onion", "gluten", "dairy", "vinegar"], allergensRemovable: [] },

  // ---------- SOUPS & SALADS ----------
  { id: "d-soupe-oignon", price: 17, name: "Soupe à l'Oignon", section: "Soups & Salads", description: "Caramelized onion, sherry, gruyère crust", pairedWineIds: [], quizClue: "The classic — onions caramelized low and slow for hours in a sherry-beef broth, capped with a bubbling Gruyère crouton.", dropLine: "The onion soup, caramelized for hours in sherry, under a bubbling Gruyère crust.", ingredients: "Yellow onions, beef stock, sherry, thyme, bay leaf, baguette, Gruyère", chefPrep: "Onions caramelized for several hours until deeply browned, deglazed with sherry, simmered in stock with thyme and bay, ladled into crocks, topped with a baguette crouton and Gruyère, broiled until bubbling.", allergensInRecipe: ["onion", "alcohol", "gluten", "dairy"], allergensRemovable: [] },
  { id: "d-chilled-pea-soup", price: 16, name: "Chilled English Pea Soup", section: "Soups & Salads", description: "Mint crème fraîche, pea tendrils, lemon oil", pairedWineIds: ["w5","bw2"], quizClue: "A bright, chilled spring-green soup of blanched English peas and mint, finished with a swirl of crème fraîche.", dropLine: "A chilled English pea soup, finished with mint crème fraîche and lemon oil.", ingredients: "English peas, vegetable stock, mint, crème fraîche, lemon, olive oil, pea tendrils", chefPrep: "Peas blanched and shocked to preserve color, blitzed with stock and mint until silken and passed through a fine chinois, chilled, finished with mint crème fraîche and lemon oil.", allergensInRecipe: ["dairy", "citrus"], allergensRemovable: [] },
  { id: "d-mushroom-veloute", price: 19, name: "Wild Mushroom Velouté", section: "Soups & Salads", description: "Sherry cream, chive oil, black truffle", pairedWineIds: ["w11","w15","bw3"], quizClue: "A silken wild mushroom soup enriched with sherry and cream, finished tableside with shaved black truffle.", dropLine: "Wild mushroom velouté, finished tableside with shaved black truffle.", ingredients: "Wild mushrooms, shallot, sherry, cream, vegetable stock, chives, black truffle", chefPrep: "Mushrooms and shallots sweated, deglazed with sherry, simmered in stock and cream, blended until silken and strained, finished tableside with shaved black truffle and chive oil.", allergensInRecipe: ["onion", "alcohol", "dairy"], allergensRemovable: ["onion"] },
  { id: "d-frisee-lardon", price: 20, name: "Frisée aux Lardons", section: "Soups & Salads", description: "Poached egg, sherry vinaigrette, garlic croutons", pairedWineIds: ["w5","bw2"], quizClue: "The bistro classic — frisée tossed in a warm bacon-sherry vinaigrette, topped with a soft poached egg and garlic croutons.", dropLine: "Frisée aux lardons, with a warm sherry vinaigrette and a soft poached egg.", ingredients: "Frisée, pork lardons, sherry vinegar, Dijon mustard, shallot, eggs, garlic croutons", chefPrep: "Lardons rendered crisp, pan deglazed with sherry vinegar and Dijon for a warm vinaigrette, tossed with frisée, topped with a soft poached egg and garlic croutons.", allergensInRecipe: ["vinegar", "mustard", "onion", "eggs", "gluten", "garlic"], allergensRemovable: ["onion", "garlic"] },
  { id: "d-endive-walnut-salad", price: 18, name: "Endive & Walnut Salad", section: "Soups & Salads", description: "Roquefort, pear, candied walnut, sherry-honey vinaigrette", pairedWineIds: ["w10"], quizClue: "Bitter endive leaves paired with sweet pear, tangy Roquefort, and candied walnuts in a sherry-honey vinaigrette.", dropLine: "Endive and walnut salad, with Roquefort, pear, and a sherry-honey vinaigrette.", ingredients: "Belgian endive, Roquefort, pear, walnuts, sherry vinegar, honey, olive oil", chefPrep: "Endive leaves separated and chilled, tossed with a sherry-honey vinaigrette, plated with thin pear slices, crumbled Roquefort, and candied walnuts.", allergensInRecipe: ["dairy", "tree nuts", "vinegar"], allergensRemovable: [] },
  { id: "d-heirloom-carrot-soup", price: 16, name: "Roasted Heirloom Carrot Soup", section: "Soups & Salads", description: "Brown butter, toasted cumin, crème fraîche, carrot top oil", pairedWineIds: ["w9"], quizClue: "Heirloom carrots roasted until deeply caramelized, then blended with brown butter and toasted cumin into a velvety soup.", dropLine: "Roasted heirloom carrot soup, finished with brown butter and toasted cumin.", ingredients: "Heirloom carrots, butter, cumin, vegetable stock, crème fraîche, carrot tops, olive oil", chefPrep: "Carrots roasted whole until caramelized and tender, blended with brown butter, toasted cumin, and stock until smooth, strained, finished with crème fraîche and carrot-top oil.", allergensInRecipe: ["dairy"], allergensRemovable: [] },

  // ---------- ENTRÉES ----------
  { id: "d-duck-breast", price: 46, name: "Roasted Duck Breast", section: "Entrées", description: "Cherry gastrique, braised endive, duck fat pomme purée", pairedWineIds: ["w11","w14","w15","bw6"], quizClue: "A pan-roasted duck breast with rendered crisp skin, finished with a cherry gastrique and paired with braised endive.", dropLine: "Roasted duck breast, with a cherry gastrique and braised endive.", ingredients: "Duck breast, cherries, red wine vinegar, sugar, endive, potatoes, duck fat, butter, cream", chefPrep: "Duck breast scored and rendered slowly skin-side down until crisp, roasted to medium-rare, rested, sliced. Cherry gastrique built from caramelized sugar and vinegar reduced with cherries; potatoes riced with duck fat, butter, and cream.", allergensInRecipe: ["vinegar", "dairy"], allergensRemovable: [] },
  { id: "d-branzino", price: 48, name: "Whole Roasted Branzino", section: "Entrées", description: "Fennel, Meyer lemon, castelvetrano olive, herb salsa verde", pairedWineIds: ["w6"], quizClue: "A whole Mediterranean sea bass roasted with fennel and Meyer lemon inside the cavity, finished with a bright herb salsa verde.", dropLine: "A whole roasted branzino, stuffed with fennel and Meyer lemon, filleted tableside.", ingredients: "Whole branzino, fennel, Meyer lemon, castelvetrano olives, parsley, capers, garlic, olive oil", chefPrep: "Branzino cleaned and stuffed with fennel fronds and lemon slices, roasted whole until the skin crisps, filleted tableside, finished with a caper-garlic salsa verde and castelvetrano olives.", allergensInRecipe: ["fish", "citrus", "garlic"], allergensRemovable: ["garlic"] },
  { id: "d-veal-blanquette", price: 42, name: "Veal Blanquette", section: "Entrées", description: "Pearl onion, mushroom, crème fraîche, tarragon rice pilaf", pairedWineIds: ["w13","bw3","bw8"], quizClue: "A classic white veal stew, gently poached and finished with a silky crème fraîche and egg yolk liaison.", dropLine: "Veal blanquette, the classic white stew, finished with crème fraîche over tarragon rice.", ingredients: "Veal shoulder, pearl onions, mushrooms, crème fraîche, egg yolk, tarragon, white rice, vegetable stock", chefPrep: "Veal poached gently in aromatic stock without browning, pearl onions and mushrooms added, sauce finished with a crème fraîche and egg yolk liaison off the heat, served over tarragon rice pilaf.", allergensInRecipe: ["onion", "dairy", "eggs"], allergensRemovable: ["onion"] },
  { id: "d-lamb-rack", price: 58, name: "Herb-Crusted Rack of Lamb", section: "Entrées", description: "Dijon-herb crust, ratatouille, rosemary jus", pairedWineIds: ["w12","bw7","bw9"], quizClue: "A Frenched lamb rack coated in a Dijon and herb crust, roasted and sliced into chops, served over a classic ratatouille.", dropLine: "Herb-crusted rack of lamb, with a Dijon crust and a rosemary jus, over ratatouille.", ingredients: "Lamb rack, Dijon mustard, breadcrumbs, parsley, rosemary, garlic, eggplant, zucchini, bell pepper, tomato, lamb jus", chefPrep: "Lamb seared hard, coated in a Dijon-herb-breadcrumb crust, roasted to temperature, rested and sliced into chops. Ratatouille built classically, vegetables cooked separately then combined. Finished with a rosemary lamb jus.", allergensInRecipe: ["mustard", "gluten", "garlic"], allergensRemovable: ["garlic"] },
  { id: "d-coq-au-vin", price: 38, name: "Coq au Vin", section: "Entrées", description: "Red wine braise, pearl onion, mushroom, bacon lardon", pairedWineIds: ["w11","w16","bw6"], quizClue: "A whole chicken leg braised low and slow in red wine with pearl onions, mushrooms, and bacon lardons.", dropLine: "Coq au vin, braised for hours in red wine with pearl onion and bacon lardon.", ingredients: "Chicken leg, red wine, pork lardons, pearl onions, mushrooms, carrot, thyme, bay leaf, butter, flour", chefPrep: "Chicken browned and braised in red wine and stock with aromatics for several hours until falling from the bone, sauce reduced and finished with a butter-flour liaison, pearl onions, mushrooms, and lardons folded in at the end.", allergensInRecipe: ["alcohol", "onion", "dairy", "gluten"], allergensRemovable: ["onion"] },
  { id: "d-seared-scallops", price: 44, name: "Seared Diver Scallops", section: "Entrées", description: "Cauliflower purée, brown butter caper raisin, toasted almond", pairedWineIds: [], quizClue: "Large diver scallops seared to a deep caramelized crust, plated over a silken cauliflower purée with a brown butter caper-raisin sauce.", dropLine: "Seared diver scallops, over cauliflower purée with a brown butter caper-raisin sauce.", ingredients: "Diver scallops, cauliflower, butter, cream, capers, golden raisins, sherry vinegar, almonds", chefPrep: "Cauliflower simmered in cream until tender and blended smooth. Scallops seared hard in a very hot pan for color, finished with a brown butter sauce built with capers, golden raisins, and sherry vinegar, topped with toasted almonds.", allergensInRecipe: ["shellfish", "dairy", "vinegar", "tree nuts"], allergensRemovable: [] },
  { id: "d-mushroom-wellington", price: 36, name: "Wild Mushroom Wellington", section: "Entrées", description: "Chestnut-mushroom duxelles, puff pastry, madeira jus", pairedWineIds: ["w13","w16","bw7","bw8"], quizClue: "A vegetarian riff on beef Wellington — wild mushroom and chestnut duxelles wrapped in puff pastry, sliced tableside.", dropLine: "A wild mushroom Wellington, wrapped in puff pastry, sliced tableside with a madeira jus.", ingredients: "Wild mushrooms, chestnuts, shallot, thyme, puff pastry, egg wash, madeira, vegetable stock", chefPrep: "Mushrooms and chestnuts finely chopped and cooked down into a dense duxelles, wrapped tightly in puff pastry, egg-washed, baked until deep golden, sliced tableside and finished with a madeira jus.", allergensInRecipe: ["gluten", "eggs", "onion", "tree nuts", "alcohol"], allergensRemovable: ["onion"] },
  { id: "d-short-rib", price: 45, name: "Red Wine Braised Short Rib", section: "Entrées", description: "Celery root purée, glazed root vegetable, bordelaise", pairedWineIds: ["w12","w14","bw7","bw9"], quizClue: "A bone-in short rib braised for hours in red wine until fork-tender, plated over celery root purée with a classic bordelaise.", dropLine: "Red wine braised short rib, over celery root purée with a classic bordelaise.", ingredients: "Beef short rib, red wine, beef stock, celery root, cream, butter, glazed carrots and turnips, thyme", chefPrep: "Short ribs seared hard, braised in red wine and stock with aromatics for several hours until falling off the bone, sauce reduced to a glossy bordelaise. Celery root simmered in cream and butter, puréed smooth.", allergensInRecipe: ["alcohol", "dairy"], allergensRemovable: [] },
  { id: "d-halibut-nage", price: 43, name: "Poached Halibut", section: "Entrées", description: "Saffron-fennel nage, baby vegetables, herb oil", pairedWineIds: ["w4"], quizClue: "A thick halibut fillet gently poached in a saffron-scented vegetable nage, served in the broth with baby market vegetables.", dropLine: "Poached halibut, in a saffron-fennel nage with baby market vegetables.", ingredients: "Halibut, saffron, fennel, white wine, vegetable stock, baby carrots, baby turnips, herb oil", chefPrep: "A light nage built from white wine, saffron, and fennel; halibut poached gently in the nage until just cooked through, plated in a shallow bowl with baby vegetables and a drizzle of herb oil.", allergensInRecipe: ["fish", "alcohol"], allergensRemovable: [] },
  { id: "d-ratatouille-galette", price: 32, name: "Provençal Vegetable Galette", section: "Entrées", description: "Rustic buckwheat crust, goat cheese, herbs de Provence", pairedWineIds: [], quizClue: "A rustic free-form galette of layered market vegetables and goat cheese in a buckwheat crust, entirely plant-based.", dropLine: "A Provençal vegetable galette, in a buckwheat crust with goat cheese — entirely plant-based.", ingredients: "Buckwheat flour, butter, zucchini, eggplant, tomato, goat cheese, herbs de Provence, olive oil", chefPrep: "A buckwheat pastry dough rolled out and layered with thin-sliced roasted vegetables and goat cheese, folded rustically at the edges, baked until the crust is deeply golden, finished with herbs de Provence and olive oil.", allergensInRecipe: ["gluten", "dairy"], allergensRemovable: [] },

  // ---------- ACCOMPANIMENTS ----------
  { id: "d-pomme-puree", price: 13, name: "Duck Fat Pomme Purée", section: "Accompaniments", description: "Yukon gold, cultured butter, chive", pairedWineIds: [], quizClue: "Yukon gold potatoes riced fine and finished with duck fat and cultured butter for an ultra-silken purée.", dropLine: "Duck fat pomme purée.", ingredients: "Yukon gold potatoes, duck fat, cultured butter, cream, chives", chefPrep: "Potatoes boiled whole in the skin, riced while hot, worked with duck fat, cultured butter, and warm cream until glossy and smooth, finished with chives.", allergensInRecipe: ["dairy"], allergensRemovable: [] },
  { id: "d-glazed-carrots", price: 12, name: "Honey-Glazed Heirloom Carrots", section: "Accompaniments", description: "Brown butter, dukkah, carrot top gremolata", pairedWineIds: [], quizClue: "Heirloom carrots roasted whole and glazed in honey and brown butter, finished with a crunchy dukkah spice blend.", dropLine: "Honey-glazed heirloom carrots, with brown butter and dukkah.", ingredients: "Heirloom carrots, honey, butter, dukkah (sesame, hazelnut, cumin, coriander), carrot tops, garlic, lemon", chefPrep: "Carrots roasted whole until tender, tossed in a honey-brown butter glaze, finished with dukkah and a carrot-top gremolata.", allergensInRecipe: ["dairy", "sesame", "tree nuts", "garlic", "citrus"], allergensRemovable: ["garlic"] },
  { id: "d-gratin-dauphinois", price: 13, name: "Gratin Dauphinois", section: "Accompaniments", description: "Thin-sliced potato, gruyère, garlic cream", pairedWineIds: [], quizClue: "The classic French potato gratin — thin-sliced potatoes layered and baked slowly in garlic cream and Gruyère.", dropLine: "Gratin dauphinois, potatoes layered slowly in garlic cream and Gruyère.", ingredients: "Yukon gold potatoes, cream, milk, garlic, Gruyère, nutmeg", chefPrep: "Potatoes sliced paper-thin on a mandoline, layered in a gratin dish with garlic-infused cream and milk, topped with Gruyère, baked slowly until the top is deeply golden and the potatoes are tender through.", allergensInRecipe: ["dairy", "garlic"], allergensRemovable: ["garlic"] },
  { id: "d-haricots-verts", price: 12, name: "Haricots Verts Amandine", section: "Accompaniments", description: "Brown butter, toasted almond, shallot", pairedWineIds: ["w9"], quizClue: "Thin French green beans blanched crisp-tender, tossed in brown butter with toasted almonds and shallot.", dropLine: "Haricots verts amandine, in brown butter with toasted almond.", ingredients: "Haricots verts, butter, sliced almonds, shallot, lemon", chefPrep: "Beans blanched in heavily salted water and shocked to preserve color, finished in a hot pan with brown butter, toasted almonds, and shallot just before service.", allergensInRecipe: ["dairy", "tree nuts", "onion"], allergensRemovable: ["onion"] },
  { id: "d-mushroom-fricassee", price: 15, name: "Wild Mushroom Fricassée", section: "Accompaniments", description: "Garlic, thyme, sherry, crème fraîche", pairedWineIds: [], quizClue: "A mix of wild mushrooms sautéed hard with garlic and thyme, deglazed with sherry and finished with crème fraîche.", dropLine: "A wild mushroom fricassée, finished with sherry and crème fraîche.", ingredients: "Wild mushroom medley, garlic, thyme, sherry, crème fraîche, butter", chefPrep: "Mushrooms sautéed in batches over high heat to develop color, combined with garlic and thyme, deglazed with sherry, finished with a touch of crème fraîche.", allergensInRecipe: ["garlic", "alcohol", "dairy"], allergensRemovable: ["garlic"] },
  { id: "d-farro-salad-side", price: 13, name: "Herbed Farro & Root Vegetable", section: "Accompaniments", description: "Roasted root vegetables, preserved lemon, herb oil", pairedWineIds: [], quizClue: "Nutty farro tossed with roasted root vegetables, preserved lemon, and fresh herbs.", dropLine: "Herbed farro, with roasted root vegetable and preserved lemon.", ingredients: "Farro, root vegetables (carrot, parsnip, turnip), preserved lemon, parsley, mint, olive oil", chefPrep: "Farro cooked al dente in vegetable stock, tossed warm with roasted root vegetables, preserved lemon, and fresh herbs, finished with olive oil.", allergensInRecipe: ["gluten", "citrus"], allergensRemovable: [] },

  // ---------- SAUCES & BUTTERS ----------
  { id: "d-sauce-bordelaise", price: 6, name: "Bordelaise", section: "Sauces & Butters", description: "Red wine, shallot, bone marrow, thyme", pairedWineIds: [], quizClue: "A classic red wine reduction sauce built on a veal stock base, enriched with roasted bone marrow.", dropLine: "A classic bordelaise, red wine and shallot, enriched with bone marrow.", ingredients: "Red wine, shallot, veal stock, bone marrow, thyme, butter", chefPrep: "Shallots sweated, deglazed with red wine, reduced with veal stock and thyme, finished with diced roasted bone marrow and a mount of butter.", allergensInRecipe: ["alcohol", "onion", "dairy"], allergensRemovable: ["onion"] },
  { id: "d-sauce-bearnaise", price: 6, name: "Béarnaise", section: "Sauces & Butters", description: "Tarragon, shallot, white wine reduction, egg yolk emulsion", pairedWineIds: [], quizClue: "A warm emulsified butter sauce built from a tarragon-shallot reduction whisked into egg yolks.", dropLine: "Béarnaise, whipped tarragon and egg yolk, off the side.", ingredients: "Egg yolk, clarified butter, tarragon, shallot, white wine vinegar, white wine", chefPrep: "Shallots reduced with white wine and vinegar, strained, whisked into egg yolks over gentle heat, clarified butter emulsified in slowly, finished with fresh tarragon.", allergensInRecipe: ["eggs", "dairy", "onion", "vinegar", "alcohol"], allergensRemovable: ["onion"] },
  { id: "d-salsa-verde", price: 5, name: "Herb Salsa Verde", section: "Sauces & Butters", description: "Parsley, caper, anchovy, garlic, lemon", pairedWineIds: [], quizClue: "A bright, uncooked green sauce of chopped herbs, capers, and anchovy loosened with olive oil and lemon.", dropLine: "An herb salsa verde, hand-chopped, never blended.", ingredients: "Parsley, capers, anchovy, garlic, lemon, olive oil", chefPrep: "All ingredients hand-chopped (never blended, to keep the texture rustic) and bound loosely with olive oil and fresh lemon juice.", allergensInRecipe: ["fish", "garlic", "citrus"], allergensRemovable: ["garlic"] },
  { id: "d-cafe-de-paris-butter", price: 6, name: "Café de Paris Butter", section: "Sauces & Butters", description: "Herb-shallot compound butter, house spice blend", pairedWineIds: [], quizClue: "A classic French compound butter built from a long list of herbs, shallot, capers, and a secret house spice blend, melted over grilled dishes.", dropLine: "Café de Paris butter, our house blend, melted over the top.", ingredients: "Cultured butter, shallot, garlic, parsley, tarragon, chives, capers, Dijon mustard, anchovy, curry powder", chefPrep: "All ingredients finely minced and worked into softened cultured butter, rolled into a log, chilled, and sliced into coins to melt over grilled proteins.", allergensInRecipe: ["dairy", "onion", "garlic", "mustard", "fish"], allergensRemovable: ["onion", "garlic"] },

  // ---------- DESSERTS ----------
  { id: "d-tarte-tatin", price: 16, name: "Apple Tarte Tatin", section: "Desserts", description: "Caramelized apple, vanilla crème fraîche, puff pastry", pairedWineIds: [], quizClue: "The classic upside-down French apple tart, apples caramelized in butter and sugar before the pastry is baked on top and the tart is inverted.", dropLine: "The classic apple tarte tatin, inverted tableside, with vanilla crème fraîche.", ingredients: "Apples, butter, sugar, puff pastry, crème fraîche, vanilla bean", chefPrep: "Apples caramelized in butter and sugar directly in a cast pan, topped with puff pastry, baked until golden, inverted onto a plate, served warm with vanilla-bean crème fraîche.", allergensInRecipe: ["dairy", "gluten"], allergensRemovable: [] },
  { id: "d-chocolate-souffle", price: 18, name: "Dark Chocolate Soufflé", section: "Desserts", description: "Valrhona chocolate, crème anglaise, gold leaf", pairedWineIds: [], quizClue: "A made-to-order dark chocolate soufflé, baked tableside-adjacent to hit the perfect rise, served with a crème anglaise poured through the top.", dropLine: "A dark chocolate soufflé, made to order, with crème anglaise poured through the top.", ingredients: "Valrhona dark chocolate, eggs, sugar, butter, flour, milk, vanilla bean, gold leaf", chefPrep: "A chocolate pastry cream base is lightened with whipped egg whites and folded gently, baked to order in a buttered and sugared ramekin until risen, finished tableside with a pitcher of warm crème anglaise.", allergensInRecipe: ["eggs", "dairy", "gluten"], allergensRemovable: [] },
  { id: "d-lemon-tart", price: 15, name: "Meyer Lemon Tart", section: "Desserts", description: "Toasted meringue, shortbread crust, candied lemon", pairedWineIds: ["w18"], quizClue: "A classic tart of silken Meyer lemon curd in a shortbread crust, topped with torched Italian meringue.", dropLine: "Meyer lemon tart, under a torched Italian meringue.", ingredients: "Meyer lemon, eggs, sugar, butter, flour, candied lemon peel", chefPrep: "Lemon curd cooked slowly to a silken set, poured into a blind-baked shortbread crust, chilled, topped with Italian meringue and torched to order, garnished with candied lemon peel.", allergensInRecipe: ["citrus", "eggs", "dairy", "gluten"], allergensRemovable: [] },
  { id: "d-pear-frangipane", price: 16, name: "Pear Frangipane Tart", section: "Desserts", description: "Poached pear, almond cream, honey lavender", pairedWineIds: ["w17"], quizClue: "Thin-sliced poached pear fanned over a baked almond frangipane in a buttery tart shell, finished with honey and lavender.", dropLine: "Pear frangipane tart, finished with honey and lavender.", ingredients: "Pears, almond flour, butter, eggs, sugar, pâte sucrée, honey, dried lavender", chefPrep: "Pears poached gently in spiced syrup, fanned over an almond frangipane in a par-baked tart shell, baked until the frangipane sets golden, finished with a honey-lavender glaze.", allergensInRecipe: ["tree nuts", "dairy", "eggs", "gluten"], allergensRemovable: [] },
  { id: "d-creme-brulee", price: 14, name: "Vanilla Bean Crème Brûlée", section: "Desserts", description: "Tahitian vanilla, torched sugar crust, shortbread", pairedWineIds: [], quizClue: "The classic custard, scented with Tahitian vanilla bean and finished with a hard, torched sugar shell that cracks under the spoon.", dropLine: "Vanilla bean crème brûlée, the sugar cracked to order.", ingredients: "Cream, egg yolk, Tahitian vanilla bean, sugar, butter, flour", chefPrep: "Cream infused with split Tahitian vanilla bean, tempered into egg yolks, baked slowly in a water bath until just set, chilled, topped with sugar and torched to order for a glass-like crust.", allergensInRecipe: ["dairy", "eggs", "gluten"], allergensRemovable: [] },
  { id: "d-chocolate-terrine", price: 17, name: "Dark Chocolate & Hazelnut Terrine", section: "Desserts", description: "Praline crunch, cocoa nib, espresso crème anglaise", pairedWineIds: [], quizClue: "A dense, flourless dark chocolate terrine layered with a crunchy hazelnut praline, sliced and served with espresso crème anglaise.", dropLine: "A dark chocolate and hazelnut terrine, with espresso crème anglaise.", ingredients: "Dark chocolate, cream, eggs, butter, hazelnuts, cocoa nibs, espresso, milk, vanilla bean", chefPrep: "A flourless chocolate ganache base set with eggs and cream, layered with a hazelnut praline crunch, chilled overnight, sliced and served with an espresso-infused crème anglaise.", allergensInRecipe: ["dairy", "eggs", "tree nuts"], allergensRemovable: [] },
  { id: "d-fromage-plate", price: 19, name: "Selection of French Cheeses", section: "Desserts", description: "Chef's rotating selection, honeycomb, quince, marcona almond", pairedWineIds: ["w17","w18","bw10"], quizClue: "A chef-selected rotating trio of French cheeses served with honeycomb, quince paste, and marcona almonds.", dropLine: "The chef's cheese selection, with honeycomb, quince, and marcona almond.", ingredients: "Rotating French cheese selection, raw honeycomb, quince paste, marcona almonds, grilled levain", chefPrep: "Cheeses selected daily by the chef for balance across soft, semi-hard, and blue styles, brought to room temperature before service, plated with honeycomb, quince paste, marcona almonds, and grilled levain.", allergensInRecipe: ["dairy", "tree nuts", "gluten"], allergensRemovable: [] }
];

// Bower — by-the-bottle wine list draft (modest, curated step-up from the BTG list)

const BOTTLE_CATEGORY_ORDER = [
  "Champagne & Sparkling",
  "Sauvignon Blanc & Loire Whites",
  "Chardonnay & White Burgundy",
  "Aromatic Whites",
  "Rosé",
  "Pinot Noir",
  "Rhône & Grenache Blends",
  "Nebbiolo",
  "Cabernet Sauvignon & Bordeaux",
  "Dessert"
];
const BOTTLE_SUBCATEGORY_ORDER = {};

const BOTTLE_WINES = [
  {
    id: "bw1", name: "Taittinger \"Comtes de Champagne\" Blanc de Blancs", style: "sparkling", price: 195, category: "Champagne & Sparkling",
    grape: "100% Chardonnay", producer: "Champagne Taittinger", region: "Champagne, France",
    winemaker: "Taittinger's cellar team",
    flavorTags: ["White Flower", "Brioche", "Almond", "Citrus"],
    structure: { sweetness: 1, acidity: 4, tannin: 0, alcohol: 2, body: 3 },
    guestDescription: "Taittinger's prestige cuvée, made entirely from Chardonnay grown in the region's top-rated grand cru vineyards. Elegant, structured, and built to age.",
    sellingPoints: ["Taittinger's top prestige cuvée, first made in 1952", "100% grand cru Chardonnay fruit", "A genuine special-occasion Champagne"],
    winemakingNote: "Sourced exclusively from grand cru-rated vineyards in the Côte des Blancs, aged significantly longer on lees than the house's standard Brut before release.",
    moment: "An anniversary, a proposal, or a guest who wants the best Champagne on the list.",
    memory: "Elegant, structured Blanc de Blancs from one of Champagne's most storied family houses.",
    pairingDishIds: ["d-scallop-crudo", "d-burrata-fig"],
    pairingReasons: { "d-scallop-crudo": "Citrus and brioche notes echo the yuzu-brown butter; acid lifts the raw scallop.", "d-burrata-fig": "Toasty almond and brioche notes complement the burrata; acid cuts the richness." },
    arsenal: "This is a single-varietal, single-tier Champagne &mdash; 100% Chardonnay from the region's best-rated vineyards, nothing blended in from a lesser site.",
    funFact: "Comtes de Champagne was first released in 1952 and remains Taittinger's flagship prestige cuvée.",
    funFact2: "Taittinger is one of the few remaining family-owned major Champagne houses, still run by descendants of the founding family.",
    shortStory: "Taittinger has been producing Champagne since the 1930s, when Pierre Taittinger acquired a historic property in Reims. Comtes de Champagne, introduced in the 1950s, remains the house's most acclaimed release."
  },
  {
    id: "bw2", name: "Pascal Jolivet Sancerre \"Les Caillottes\"", style: "white", price: 68, category: "Sauvignon Blanc & Loire Whites",
    grape: "100% Sauvignon Blanc", producer: "Pascal Jolivet", region: "Sancerre, Loire Valley, France",
    winemaker: "Pascal Jolivet",
    flavorTags: ["Grapefruit", "Fresh Herb", "Chalk", "Green Apple"],
    structure: { sweetness: 1, acidity: 5, tannin: 0, alcohol: 2, body: 2 },
    guestDescription: "A single-vineyard step up from our by-the-glass Sancerre &mdash; grown on the chalky 'caillottes' soil that gives the wine its name, with real precision and cut.",
    sellingPoints: ["Single-vineyard bottling from a specific limestone soil type", "Pascal Jolivet is one of the region's most respected independent producers", "A step up in concentration from a village-level Sancerre"],
    winemakingNote: "'Caillottes' refers to the loose, chalky limestone soil of this specific site, which tends to produce Sancerre's most floral, precise expression.",
    moment: "A guest who wants to go deeper into Sancerre after loving the by-the-glass pour.",
    memory: "Precise, chalky, single-vineyard Sancerre from one of the appellation's most serious independent growers.",
    pairingDishIds: ["d-chilled-pea-soup", "d-frisee-lardon"],
    pairingReasons: { "d-chilled-pea-soup": "Herbal, high-acid Sauvignon Blanc is a natural match for pea and mint.", "d-frisee-lardon": "Cutting acidity balances the bacon and vinaigrette." },
    arsenal: "Ask if they've had our Henri Bourgeois Sancerre by the glass &mdash; this is a single-vineyard step up from that same appellation.",
    funFact: "Pascal Jolivet started as a négociant in 1987 before acquiring his own vineyards, and is now considered one of Sancerre's leading independent producers.",
    funFact2: "Sancerre has three distinct soil types &mdash; caillottes, terres blanches, and silex &mdash; each producing a noticeably different style of wine.",
    shortStory: "Pascal Jolivet built his reputation as a négociant before acquiring estate vineyards across Sancerre and Pouilly-Fumé, and today his single-vineyard bottlings are considered some of the region's most terroir-precise wines."
  },
  {
    id: "bw3", name: "Louis Latour Meursault", style: "white", price: 110, category: "Chardonnay & White Burgundy",
    grape: "100% Chardonnay", producer: "Maison Louis Latour", region: "Meursault, Burgundy, France",
    winemaker: "Louis Latour's winemaking team",
    flavorTags: ["Hazelnut", "Baked Apple", "Butter", "Brioche"],
    structure: { sweetness: 1, acidity: 3, tannin: 0, alcohol: 4, body: 4 },
    guestDescription: "Meursault is white Burgundy at its richest &mdash; hazelnut and baked apple with real texture and a buttery finish. Louis Latour has been making Burgundy since 1797.",
    sellingPoints: ["From one of Burgundy's oldest négociant houses, founded 1797", "Meursault is the richest, most textured of the great white Burgundy villages", "Built for guests who want oak and body, not lean minerality"],
    winemakingNote: "Aged in French oak barrels with regular lees stirring, which is what builds Meursault's signature round, buttery texture.",
    moment: "A guest who wants a bigger, richer Chardonnay than our Chablis or Mâcon-Verzé pours by the glass.",
    memory: "Rich, buttery, and the fullest-bodied expression of white Burgundy on the list.",
    pairingDishIds: ["d-mushroom-veloute", "d-veal-blanquette"],
    pairingReasons: { "d-mushroom-veloute": "The wine's buttery richness and hazelnut notes mirror the sherry cream and mushroom.", "d-veal-blanquette": "Full body and brioche-like richness match the cream sauce without disappearing." },
    arsenal: "If a guest loved our Leflaive Mâcon-Verzé by the glass but wants something richer and more textured, this is the move.",
    funFact: "Louis Latour was founded in 1797 and is one of the oldest family-owned wine houses in Burgundy, now led by its eleventh generation.",
    funFact2: "Unlike neighboring Puligny-Montrachet and Chassagne-Montrachet, Meursault has no grand cru vineyards at all, yet its premier crus are just as sought after.",
    shortStory: "Founded in 1797, Louis Latour has stayed a family business for over two centuries, and its Meursault bottling reflects the village's reputation as Burgundy's richest, most generous white."
  },
  {
    id: "bw4", name: "Zind-Humbrecht Alsace Pinot Gris", style: "white", price: 78, category: "Aromatic Whites",
    grape: "100% Pinot Gris", producer: "Domaine Zind-Humbrecht", region: "Alsace, France",
    winemaker: "Olivier Humbrecht MW",
    flavorTags: ["Honeyed Pear", "Smoke", "Ginger", "Dried Apricot"],
    structure: { sweetness: 2, acidity: 3, tannin: 0, alcohol: 4, body: 4 },
    guestDescription: "A rich, textured Alsace Pinot Gris with real weight and a touch of honeyed sweetness &mdash; made by one of only a few hundred Masters of Wine in the world.",
    sellingPoints: ["Made by Olivier Humbrecht, one of the first Masters of Wine to also be a winegrower", "Farmed biodynamically", "Full-bodied enough to stand up to richer starters like foie gras"],
    winemakingNote: "Farmed fully biodynamically since the early 1990s, among the earliest adopters of the practice in Alsace.",
    moment: "A guest who wants a richer, slightly off-dry white alongside the foie gras or mushroom tart.",
    memory: "Honeyed, smoky, full-bodied Pinot Gris from one of Alsace's most decorated producers.",
    pairingDishIds: ["d-foie-torchon", "d-mushroom-tart"],
    pairingReasons: { "d-foie-torchon": "A touch of sweetness and smoky depth stand up to foie gras.", "d-mushroom-tart": "Smoky, honeyed notes complement the Gruy&egrave;re custard and black garlic jus." },
    arsenal: "Olivier Humbrecht was one of the first winemakers in the world to also hold the Master of Wine title &mdash; a nice detail for guests who ask about the producer.",
    funFact: "Olivier Humbrecht became a Master of Wine in 1989, one of the first working winegrowers ever to hold the title.",
    funFact2: "Domaine Zind-Humbrecht was among the earliest Alsace estates to farm fully biodynamically, starting in the early 1990s.",
    shortStory: "Olivier Humbrecht took over his family's estate and combined rigorous, science-backed technique with early biodynamic farming, building Zind-Humbrecht into one of Alsace's most internationally respected names."
  },
  {
    id: "bw5", name: "Château d'Esclans \"Whispering Angel\"", style: "rosé", price: 62, category: "Rosé",
    grape: "Grenache, Cinsault, Rolle, Syrah", producer: "Château d'Esclans", region: "Côtes de Provence, France",
    winemaker: "Sacha Lichine",
    flavorTags: ["White Peach", "Citrus Blossom", "Red Berry", "Melon"],
    structure: { sweetness: 1, acidity: 3, tannin: 0, alcohol: 3, body: 2 },
    guestDescription: "The wine most credited with turning Provence rosé into a global category &mdash; pale, dry, and built for easy drinking without sacrificing real winemaking pedigree.",
    sellingPoints: ["The single best-known Provence rosé in the world by volume", "Made by Sacha Lichine, son of the négociant who helped popularize Bordeaux abroad", "Crowd-pleasing without being simple"],
    winemakingNote: "Blended from multiple estate vineyards and aged partly in oak, which is part of what separates it from simpler, purely stainless-steel rosés.",
    moment: "A table that wants a recognizable name and an easy, crowd-pleasing pour.",
    memory: "Pale, dry, and the rosé that arguably built the entire modern category's popularity.",
    pairingDishIds: ["d-burrata-fig", "d-crudite-royale"],
    pairingReasons: { "d-burrata-fig": "Delicate red fruit and citrus balance the fig's sweetness and burrata's richness.", "d-crudite-royale": "Light body and bright fruit keep pace with raw vegetables." },
    arsenal: "This is widely credited as the wine that turned Provence rosé from a summer afterthought into a serious global category.",
    funFact: "Sacha Lichine purchased Château d'Esclans in 2006 and relaunched Whispering Angel specifically to prove rosé could be taken seriously.",
    funFact2: "Whispering Angel is consistently one of the best-selling rosé wines in the United States.",
    shortStory: "Sacha Lichine, son of the Bordeaux négociant Alexis Lichine, bought the historic Château d'Esclans estate in 2006 and built Whispering Angel into arguably the most recognized rosé label in the world."
  },
  {
    id: "bw6", name: "Domaine Faiveley Nuits-Saint-Georges", style: "red", price: 98, category: "Pinot Noir",
    grape: "100% Pinot Noir", producer: "Domaine Faiveley", region: "Nuits-Saint-Georges, Burgundy, France",
    winemaker: "Erwan Faiveley",
    flavorTags: ["Dark Cherry", "Earth", "Clove", "Dried Rose"],
    structure: { sweetness: 1, acidity: 4, tannin: 3, alcohol: 3, body: 4 },
    guestDescription: "A sturdier, more structured red Burgundy than our by-the-glass Volnay &mdash; dark cherry and earth with real tannic grip. Faiveley has farmed Burgundy since 1825.",
    sellingPoints: ["One of Burgundy's largest and most respected family-owned estates", "Nuits-Saint-Georges is known for the region's most structured, savory Pinot Noir", "A step up in body and tannin from a lighter village wine"],
    winemakingNote: "Aged in a mix of new and neutral French oak, giving the wine enough structure to age well beyond most village-level Burgundy.",
    moment: "A guest who loved the Volnay by the glass and wants something bigger and more structured.",
    memory: "Earthy, structured, and one of the more serious red Burgundies on the list.",
    pairingDishIds: ["d-duck-breast", "d-coq-au-vin"],
    pairingReasons: { "d-duck-breast": "Dark cherry and earthy depth stand up to duck without overwhelming it.", "d-coq-au-vin": "Classic Burgundian logic &mdash; the same regional style the dish is traditionally braised in." },
    arsenal: "If a guest loved the Volnay by the glass, this is the next step up &mdash; same grape, a village known for more structure and grip.",
    funFact: "Domaine Faiveley was founded in 1825 and is now run by its seventh generation, Erwan Faiveley.",
    funFact2: "Nuits-Saint-Georges is traditionally considered Burgundy's most structured, savory red wine village, in contrast to the softer, more floral wines of Volnay or Chambolle-Musigny.",
    shortStory: "Faiveley has farmed in Burgundy since 1825 and remains one of the region's largest family-held domaines, known for a firm, structured style that ages gracefully."
  },
  {
    id: "bw7", name: "Château de Beaucastel Châteauneuf-du-Pape", style: "red", price: 165, category: "Rhône & Grenache Blends",
    grape: "13 permitted varieties, Mourvèdre-led", producer: "Famille Perrin — Château de Beaucastel", region: "Châteauneuf-du-Pape, Southern Rhône, France",
    winemaker: "Marc and César Perrin",
    flavorTags: ["Black Fruit", "Game", "Garrigue Herb", "Smoked Spice"],
    structure: { sweetness: 1, acidity: 3, tannin: 4, alcohol: 5, body: 5 },
    guestDescription: "One of the most celebrated estates in the Southern Rhône &mdash; unusually Mourvèdre-heavy for the appellation, which gives it more structure and savory depth than most Châteauneuf-du-Pape.",
    sellingPoints: ["Farmed organically since 1950 and biodynamically since 1974, decades ahead of the industry", "One of the only estates to farm and blend all 13 permitted Châteauneuf-du-Pape grape varieties", "A significant step up in depth and aging potential from our by-the-glass pour"],
    winemakingNote: "Beaucastel uses an unusually high proportion of Mourvèdre relative to most Châteauneuf-du-Pape estates, giving the wine more structure, game, and savory character.",
    moment: "A guest who wants the most serious Rhône red on the list, ideally with the lamb or short rib.",
    memory: "Structured, savory, and one of the most historically important estates in the Southern Rhône.",
    pairingDishIds: ["d-lamb-rack", "d-short-rib", "d-mushroom-wellington"],
    pairingReasons: { "d-lamb-rack": "Garrigue herb and game notes mirror the lamb's richness and herb crust.", "d-short-rib": "Full body and firm structure are built for slow-braised beef.", "d-mushroom-wellington": "Earthy, game-like depth echoes the mushroom duxelles." },
    arsenal: "Beaucastel converted to biodynamic farming in 1974 &mdash; decades before it became fashionable, and it's still run by the same family five generations later.",
    funFact: "The Perrin family has owned Château de Beaucastel since 1909, with the estate's history tracing back to 1549.",
    funFact2: "Beaucastel is one of the only Châteauneuf-du-Pape estates to plant and vinify all 13 grape varieties permitted under the appellation.",
    shortStory: "Under five generations of the Perrin family, Beaucastel became one of the first Châteauneuf-du-Pape estates to farm organically in 1950 and biodynamically in 1974, building a reputation as one of the Rhône's most serious and age-worthy producers."
  },
  {
    id: "bw8", name: "Vietti Barolo \"Castiglione\"", style: "red", price: 120, category: "Nebbiolo",
    grape: "100% Nebbiolo", producer: "Vietti", region: "Barolo, Piedmont, Italy",
    winemaker: "Luca Currado Vietti",
    flavorTags: ["Dried Cherry", "Tar", "Licorice", "Dried Rose"],
    structure: { sweetness: 1, acidity: 4, tannin: 5, alcohol: 4, body: 4 },
    guestDescription: "A true Barolo, sourced from multiple top vineyard sites rather than a single cru &mdash; big tannin, dried cherry and rose, built to stand up to rich, earthy food.",
    sellingPoints: ["From one of Barolo's most historic and respected family estates", "Blended from several of the appellation's top vineyard sites", "Real Barolo structure and aging potential"],
    winemakingNote: "Sourced from multiple top-tier Barolo vineyard sites and blended, rather than bottled as a single-vineyard cru, for a fuller, more complete expression of the appellation.",
    moment: "A guest who wants the most serious Italian red on the list, ideally with the mushroom Wellington.",
    memory: "High tannin, dried cherry, and classic, structured Barolo character.",
    pairingDishIds: ["d-mushroom-wellington", "d-veal-blanquette"],
    pairingReasons: { "d-mushroom-wellington": "Barolo's firm tannin and earthy depth are built for rich, savory pastry.", "d-veal-blanquette": "High acid and tannin cut through the cream sauce without overwhelming the veal." },
    arsenal: "This is a step up from our by-the-glass Barbaresco &mdash; same grape, the neighboring and generally more powerful, longer-aging appellation.",
    funFact: "Vietti has been producing wine in Piedmont since the 19th century and was among the first estates to bottle and label single-vineyard Barolo.",
    funFact2: "Barolo requires a minimum of 38 months of aging before release, including at least 18 months in oak, by law.",
    shortStory: "The Vietti family has farmed in Barolo since the 1800s and was instrumental in popularizing single-vineyard bottlings in the region during the 1960s, helping establish the modern reputation of Barolo's top sites."
  },
  {
    id: "bw9", name: "Château Léoville Barton, St-Julien", style: "red", price: 145, category: "Cabernet Sauvignon & Bordeaux",
    grape: "Cabernet Sauvignon, Merlot, Cabernet Franc", producer: "Château Léoville Barton", region: "St-Julien, Bordeaux, France",
    winemaker: "Lilian Barton-Sartorius",
    flavorTags: ["Cassis", "Cedar", "Graphite", "Tobacco Leaf"],
    structure: { sweetness: 1, acidity: 3, tannin: 5, alcohol: 4, body: 4 },
    guestDescription: "A classified-growth St-Julien known for consistency and value relative to its neighbors &mdash; cassis and cedar with the structure to age for decades. The same Irish family has owned it since 1826.",
    sellingPoints: ["A second-growth classified estate under the 1855 Bordeaux classification", "The same family has owned it since 1826, unusually long for Bordeaux", "Known among collectors as one of the most consistently well-priced classified growths"],
    winemakingNote: "Notably, the estate has no château building on the property itself &mdash; the wine is made at neighboring Château Langoa Barton, which the same family also owns.",
    moment: "A guest who wants classic, age-worthy Bordeaux structure with the lamb rack or short rib.",
    memory: "Structured, cedar-laced Bordeaux from one of the longest continuously family-owned classified estates.",
    pairingDishIds: ["d-lamb-rack", "d-short-rib"],
    pairingReasons: { "d-lamb-rack": "Cedar and cassis notes are the classic Bordeaux-and-lamb pairing; firm tannin matches the richness.", "d-short-rib": "Full body and structured tannin are built for slow-braised, fatty beef." },
    arsenal: "The Barton family has owned this estate since 1826 &mdash; nearly 200 years, which is unusually long for a classified Bordeaux château.",
    funFact: "Léoville Barton was classified a second growth in the historic 1855 Bordeaux classification and has stayed in the Barton family since 1826.",
    funFact2: "Unusually for Bordeaux, Léoville Barton has no château building of its own &mdash; winemaking happens at the family's neighboring Château Langoa Barton.",
    shortStory: "An Irish family, the Bartons, purchased the estate in 1826 and have held onto it through nearly two centuries of Bordeaux's ups and downs, building a reputation for classified-growth quality at a comparatively fair price."
  },
  {
    id: "bw10", name: "Château Rieussec, Sauternes", style: "dessert", price: 95, category: "Dessert",
    grape: "Sémillon, Sauvignon Blanc", producer: "Château Rieussec", region: "Sauternes, Bordeaux, France",
    winemaker: "Domaines Barons de Rothschild (Lafite) winemaking team",
    flavorTags: ["Apricot", "Honey", "Crème Brûlée", "Candied Citrus"],
    structure: { sweetness: 5, acidity: 4, tannin: 0, alcohol: 3, body: 4 },
    guestDescription: "A first-growth-level Sauternes, owned by the same family behind Château Lafite Rothschild &mdash; rich apricot and honey with the acid to keep it from tasting cloying.", 
    sellingPoints: ["Classified premier cru in the 1855 Bordeaux classification", "Owned by Domaines Barons de Rothschild, the family behind Château Lafite Rothschild", "One of the most age-worthy dessert wines on the list"],
    winemakingNote: "Like all Sauternes, made from grapes affected by noble rot, hand-harvested in multiple passes through the vineyard as botrytis develops unevenly.",
    moment: "The foie gras torchon or the cheese course, for a guest who wants the most serious dessert wine on the list.",
    memory: "Rich, honeyed, and the most prestigious Sauternes we pour.",
    pairingDishIds: ["d-foie-torchon", "d-fromage-plate"],
    pairingReasons: { "d-foie-torchon": "The definitive Sauternes pairing &mdash; sweetness and acid balance foie gras's richness.", "d-fromage-plate": "Honeyed sweetness cuts through rich, salty cheese." },
    arsenal: "This is owned by the same family behind Château Lafite Rothschild &mdash; a great detail for a guest who already knows Bordeaux's top names.",
    funFact: "Château Rieussec was classified a premier cru in the 1855 Bordeaux classification, the same ranking system that classified Château d'Yquem as the sole superior first growth.",
    funFact2: "Domaines Barons de Rothschild, owners of Château Lafite Rothschild, acquired Rieussec in 1984.",
    shortStory: "Classified among Sauternes' top tier in 1855, Château Rieussec came under the ownership of the Rothschild family (of Château Lafite fame) in 1984, who have maintained its reputation as one of the region's most consistently excellent estates."
  }
];

// Bower — cocktail program draft (Phase 3c of data.js)

const COCKTAILS = [
  {
    id: "c1", price: 17, name: "Le Jardin Spritz", glassware: "Wine Glass", method: "Build", category: "house",
    flavorTags: ["Elderflower", "Cucumber", "Citrus", "Herbal"],
    ingredients: ["2 oz Lillet Blanc", "0.5 oz Suze", "0.5 oz St-Germain Elderflower Liqueur", "3 oz Sparkling Wine", "Soda Water, Splash"],
    garnish: "Cucumber Ribbon, Mint Sprig",
    directions: "Build over ice in a wine glass: Lillet Blanc, Suze, and St-Germain first, then top with sparkling wine and a splash of soda water. Stir gently once. Garnish and serve.",
    prep: "", funFact: "Suze is a gentian-root aperitif that was reportedly the inspiration behind Andy Warhol's Campbell's Soup Can series after he spotted its bottle in a French kitchen.", bestFor: "The table's opening round, or a guest who wants something low-proof and garden-bright."
  },
  {
    id: "c2", price: 17, name: "Cucumber-Basil Collins", glassware: "Collins", method: "Shake & Strain", category: "house",
    flavorTags: ["Cucumber", "Basil", "Citrus", "Crisp"],
    ingredients: ["2 oz Gin", "0.75 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "3 Cucumber Slices", "5 Basil Leaves"],
    garnish: "Cucumber Ribbon, Basil Leaf",
    directions: "Muddle cucumber and basil in a shaker. Add gin, lemon juice, and simple syrup with ice. Shake hard and double strain over fresh ice into a Collins glass. Top with a splash of soda if desired.",
    prep: "", funFact: "Cucumber and gin have a natural affinity because many gins are distilled with botanicals from the same cucurbit and citrus-peel family.", bestFor: "A guest who wants something bright, green, and easy-drinking with the raw bar or garden starters."
  },
  {
    id: "c3", price: 19, name: "Lavender 75", glassware: "Flute", method: "Shake & Strain", category: "house",
    flavorTags: ["Lavender", "Citrus", "Floral", "Bubbles"],
    ingredients: ["1 oz Gin", "0.5 oz Fresh Lemon Juice", "0.5 oz Lavender Honey Syrup (house prep)", "3 oz Sparkling Wine"],
    garnish: "Dried Lavender Sprig, Lemon Twist",
    directions: "Shake gin, lemon juice, and lavender honey syrup with ice. Strain into a flute and top with sparkling wine. Garnish and serve.",
    prep: "Lavender Honey Syrup: steep 2 tbsp dried culinary lavender in 1 cup hot honey-water simple syrup (1:1) for 15 minutes, strain, cool, bottle, and refrigerate.", funFact: "The classic French 75, which this riffs on, is named after a French 75mm field gun — supposedly because the drink hits just as hard.", bestFor: "A celebration table, or a guest who wants a floral spin on a classic Champagne cocktail."
  },
  {
    id: "c4", price: 18, name: "Fig Leaf Daiquiri", glassware: "Coupe", method: "Shake & Strain", category: "house",
    flavorTags: ["Fig", "Coconut", "Lime", "Subtly Herbal"],
    ingredients: ["2 oz White Rum", "0.75 oz Fresh Lime Juice", "0.75 oz Fig Leaf Syrup (house prep)"],
    garnish: "Lime Wheel",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Garnish and serve.",
    prep: "Fig Leaf Syrup: gently warm 4-5 fresh fig leaves in 2 cups simple syrup (1:1) for 10 minutes without boiling, off heat and steep 30 minutes, strain, bottle, refrigerate.", funFact: "Fig leaves, when warmed rather than boiled, release a distinctive coconut-and-vanilla aroma that has nothing to do with the fruit itself.", bestFor: "A guest who loves daiquiris but wants something more layered than straight lime and rum."
  },
  {
    id: "c5", price: 18, name: "Bower Negroni", glassware: "Rocks Glass", method: "Stir & Strain", category: "house",
    flavorTags: ["Bitter", "Botanical", "Citrus Peel", "Herbal"],
    ingredients: ["1 oz Gin", "1 oz Suze", "1 oz Cocchi Americano"],
    garnish: "Large Format Ice, Grapefruit Peel",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Cocchi Americano is the aperitif wine most food historians believe Ian Fleming actually meant by \"Kina Lillet\" in the original Vesper recipe from Casino Royale.", bestFor: "A Negroni drinker who wants something a shade lighter and more citrus-forward than the classic Campari version."
  },
  {
    id: "c6", price: 20, name: "Brown Butter Old Fashioned", glassware: "Rocks Glass", method: "Stir & Strain", category: "house",
    flavorTags: ["Brown Butter", "Maple", "Oak", "Rich"],
    ingredients: ["2 oz Brown Butter-Washed Bourbon (house prep)", "0.25 oz Maple Syrup", "2 dashes Angostura Bitters"],
    garnish: "Orange Peel",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Express orange peel over the top and drop in. Serve.",
    prep: "Brown Butter-Washed Bourbon: brown 4 oz butter until deep golden and nutty, whisk into a 750ml bottle of bourbon, let sit 4 hours at room temperature, freeze overnight, strain off the solidified fat, bottle.", funFact: "Fat-washing — infusing a spirit with melted fat, then freezing out the solids — is a technique that crosses over directly from pastry work, which is part of why it fits so naturally on a menu built around French technique.", bestFor: "A whiskey drinker who wants something richer and more dessert-adjacent than a standard Old Fashioned."
  },
  {
    id: "c7", price: 19, name: "Pear & Sage Martini", glassware: "Martini", method: "Shake & Strain", category: "house",
    flavorTags: ["Pear", "Sage", "Citrus", "Crisp"],
    ingredients: ["1.5 oz Vodka", "0.5 oz Pear Eau de Vie", "0.5 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "3 Fresh Sage Leaves"],
    garnish: "Fried Sage Leaf",
    directions: "Muddle sage gently in a shaker. Add remaining ingredients with ice, shake, and double strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "Pear eau de vie is distilled from fermented pears rather than infused after the fact, which is why it carries real pear aromatics without added sugar.", bestFor: "A guest who wants something crisp and autumnal without heavy sweetness."
  },
  {
    id: "c8", price: 18, name: "Smoked Rosemary Paloma", glassware: "Collins", method: "Build", category: "house",
    flavorTags: ["Grapefruit", "Smoke", "Rosemary", "Agave"],
    ingredients: ["2 oz Mezcal", "0.75 oz Fresh Grapefruit Juice", "0.25 oz Fresh Lime Juice", "0.5 oz Agave Syrup", "Grapefruit Soda, Top"],
    garnish: "Rosemary Sprig, Grapefruit Wheel, Tableside Smoke",
    directions: "Build mezcal, grapefruit juice, lime juice, and agave syrup over fresh ice in a Collins glass. Top with grapefruit soda. Garnish with rosemary and, tableside, torch the rosemary sprig briefly to release smoke and aroma before setting on the glass.",
    prep: "", funFact: "Mezcal's smokiness comes from roasting the agave hearts in earthen pits before distillation — a completely different process from tequila, which is typically steamed.", bestFor: "A guest who wants a smoky, savory riff on a classic Paloma."
  },
  {
    id: "c9", price: 18, name: "Honey Chamomile Sour", glassware: "Rocks Glass", method: "Shake & Strain", category: "house",
    flavorTags: ["Honey", "Chamomile", "Citrus", "Silky"],
    ingredients: ["2 oz Bourbon", "0.75 oz Fresh Lemon Juice", "0.5 oz Chamomile Honey Syrup (house prep)", "0.5 oz Egg White"],
    garnish: "Dried Chamomile Flower, Lemon Twist",
    directions: "Dry shake all ingredients without ice, then shake again with ice. Strain over fresh ice into a rocks glass. Garnish and serve.",
    prep: "Chamomile Honey Syrup: steep 3 chamomile tea bags in 1 cup hot honey-water simple syrup (1:1) for 10 minutes, strain, cool, bottle, refrigerate.", funFact: "Chamomile's apple-like sweetness is genuinely useful behind the bar — it echoes stone-fruit and honey notes without adding real sugar weight.", bestFor: "A whiskey sour drinker who wants something a little softer and more floral."
  },
  {
    id: "c10", price: 19, name: "Cognac Peach Smash", glassware: "Rocks Glass", method: "Muddle & Shake", category: "house",
    flavorTags: ["Peach", "Mint", "Citrus", "Warm Spice"],
    ingredients: ["2 oz Cognac", "0.5 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "2 Peach Slices", "6 Mint Leaves"],
    garnish: "Peach Slice, Mint Bouquet",
    directions: "Muddle peach and mint gently in a shaker. Add cognac, lemon juice, and simple syrup with ice. Shake and strain over crushed ice into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Cognac must be distilled twice in copper pot stills and aged in French oak by law — a stricter production standard than most whiskey categories.", bestFor: "A guest who wants a brandy-based drink that leans fruity and refreshing rather than boozy."
  }
];

const CLASSIC_COCKTAILS = [
  {
    id: "cc1", price: 18, name: "Sazerac", category: "classic", spirit: "Whiskey", glassware: "Rocks (no ice)", method: "Stir & Strain",
    flavorTags: ["Anise", "Spice", "Herbal", "Rye"],
    ingredients: ["2 oz Rye Whiskey", "1/4 oz Simple Syrup", "3 dashes Peychaud's Bitters", "Absinthe Rinse"],
    garnish: "Expressed Lemon Peel (discarded, not left in glass)",
    directions: "Rinse a chilled rocks glass with absinthe, discard excess. Stir rye, simple syrup, and bitters with ice, then strain into the prepared glass. Express lemon peel over the top and discard.",
    prep: "", funFact: "Widely regarded as one of the oldest American cocktails, born in 19th-century New Orleans, and originally made with cognac before rye whiskey took over.", bestFor: "A guest who wants a serious, old-school, spirit-forward drink.", followUp: ["Rye or Cognac?"]
  },
  {
    id: "cc2", price: 17, name: "Manhattan", category: "classic", spirit: "Whiskey", glassware: "Martini", method: "Stir & Strain",
    flavorTags: ["Rye", "Vermouth", "Cherry", "Bitters"],
    ingredients: ["2 oz Rye Whiskey", "1 oz Sweet Vermouth", "2 dashes Angostura Bitters"],
    garnish: "Brandied Cherry",
    directions: "Stir all ingredients with ice until well chilled. Strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "The Manhattan's exact origin is disputed, but most food historians trace it to New York City in the 1870s or 1880s.", bestFor: "A whiskey drinker who wants a classic, no-nonsense stirred cocktail.", followUp: ["Rye or Bourbon?", "Up or on the rocks?"]
  },
  {
    id: "cc3", price: 17, name: "Aviation", category: "classic", spirit: "Gin", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Violet", "Cherry", "Citrus", "Floral"],
    ingredients: ["2 oz Gin", "0.5 oz Maraschino Liqueur", "0.5 oz Fresh Lemon Juice", "0.25 oz Crème de Violette"],
    garnish: "Brandied Cherry",
    directions: "Shake all ingredients with ice. Double strain into a chilled coupe. Garnish and serve.",
    prep: "", funFact: "The Aviation's pale lavender hue comes from crème de violette, an ingredient that fell out of production for decades before a modern revival brought the classic recipe back.", bestFor: "A gin drinker who wants something floral and slightly nostalgic."
  },
  {
    id: "cc4", price: 17, name: "French 75", category: "classic", spirit: "Gin", glassware: "Flute", method: "Shake & Strain",
    flavorTags: ["Citrus", "Bubbles", "Botanical", "Crisp"],
    ingredients: ["1 oz Gin", "0.5 oz Fresh Lemon Juice", "0.5 oz Simple Syrup", "3 oz Sparkling Wine"],
    garnish: "Lemon Twist",
    directions: "Shake gin, lemon juice, and simple syrup with ice. Strain into a flute and top with sparkling wine. Garnish and serve.",
    prep: "", funFact: "Named after a French 75mm field gun from World War I, supposedly because the drink hits with similar force.", bestFor: "A celebratory, effervescent gin option for the table."
  },
  {
    id: "cc5", price: 15, name: "Daiquiri", category: "classic", spirit: "Rum", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Lime", "Rum", "Bright", "Clean"],
    ingredients: ["2 oz White Rum", "1 oz Fresh Lime Juice", "0.75 oz Simple Syrup"],
    garnish: "Lime Wheel",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Garnish and serve.",
    prep: "", funFact: "The daiquiri dates to early 1900s Cuba and takes its name from a beach and iron mine near Santiago de Cuba.", bestFor: "A guest who wants a simple, well-made classic with real rum flavor."
  },
  {
    id: "cc6", price: 15, name: "Ti' Punch", category: "classic", spirit: "Rum", glassware: "Rocks Glass", method: "Build",
    flavorTags: ["Cane Sugar", "Lime", "Rum-Forward", "Rustic"],
    ingredients: ["2 oz Rhum Agricole", "1 barspoon Cane Syrup", "1 Lime Wedge (squeezed and dropped in)"],
    garnish: "Lime Wedge",
    directions: "Build over a single large ice cube (or no ice, traditionally) in a rocks glass: cane syrup first, then the squeezed lime wedge dropped in, then rhum agricole. Stir briefly and serve, letting the guest adjust sweetness to taste.",
    prep: "", funFact: "Ti' Punch (French Creole for \"little punch\") is the everyday drink of the French Caribbean, traditionally mixed to each drinker's own taste rather than a fixed recipe.", bestFor: "A guest curious about rhum agricole, which is distilled from fresh sugarcane juice rather than molasses."
  },
  {
    id: "cc7", price: 16, name: "Margarita", category: "classic", spirit: "Tequila", glassware: "Rocks Glass", method: "Shake & Strain",
    flavorTags: ["Lime", "Agave", "Citrus", "Bright"],
    ingredients: ["2 oz Tequila Blanco", "1 oz Fresh Lime Juice", "0.75 oz Orange Liqueur"],
    garnish: "Salt Rim (optional), Lime Wheel",
    directions: "Shake all ingredients with ice. Strain over fresh ice into a rocks glass rimmed with salt if desired. Garnish and serve.",
    prep: "", funFact: "The Margarita's exact origin is fiercely disputed, with at least four different people credited as its inventor in various Mexican and American bar histories.", bestFor: "A guest who wants the most universally recognizable tequila cocktail, done properly."
  },
  {
    id: "cc8", price: 15, name: "Paloma", category: "classic", spirit: "Tequila", glassware: "Collins", method: "Build",
    flavorTags: ["Grapefruit", "Citrus", "Effervescent", "Crisp"],
    ingredients: ["2 oz Tequila Blanco", "0.5 oz Fresh Lime Juice", "Grapefruit Soda, Top"],
    garnish: "Grapefruit Wheel, Salt Rim (optional)",
    directions: "Build tequila and lime juice over fresh ice in a Collins glass. Top with grapefruit soda. Garnish and serve.",
    prep: "", funFact: "In Mexico, the Paloma is significantly more commonly ordered than the Margarita.", bestFor: "A tequila drinker who wants something lighter and more refreshing than a Margarita."
  },
  {
    id: "cc9", price: 19, name: "Vesper", category: "classic", spirit: "Vodka", glassware: "Martini", method: "Shake & Strain",
    flavorTags: ["Botanical", "Citrus Peel", "Bittersweet", "Strong"],
    ingredients: ["3 oz Gin", "1 oz Vodka", "0.5 oz Cocchi Americano"],
    garnish: "Lemon Twist",
    directions: "Shake all ingredients with ice. Strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "The Vesper was invented by Ian Fleming for the novel Casino Royale, where James Bond names it after a character; the \"Kina Lillet\" in the original recipe is generally believed to correspond to today's Cocchi Americano.", bestFor: "A guest who wants a genuinely strong, literary classic rather than a standard martini."
  },
  {
    id: "cc10", price: 16, name: "Cosmopolitan", category: "classic", spirit: "Vodka", glassware: "Martini", method: "Shake & Strain",
    flavorTags: ["Cranberry", "Citrus", "Sweet-Tart", "Bright"],
    ingredients: ["1.5 oz Citrus Vodka", "0.5 oz Orange Liqueur", "0.5 oz Fresh Lime Juice", "0.5 oz Cranberry Juice"],
    garnish: "Orange Twist",
    directions: "Shake all ingredients with ice. Double strain into a chilled martini glass. Garnish and serve.",
    prep: "", funFact: "The Cosmopolitan surged in popularity through the 1990s, largely credited to its recurring appearances on the television series Sex and the City.", bestFor: "A guest who wants a bright, tart, nostalgic classic."
  },
  {
    id: "cc11", price: 18, name: "Sidecar", category: "classic", spirit: "Brandy/Cognac", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Citrus", "Orange", "Brandy", "Balanced"],
    ingredients: ["2 oz Cognac", "0.75 oz Orange Liqueur", "0.75 oz Fresh Lemon Juice"],
    garnish: "Sugar Rim (optional), Orange Twist",
    directions: "Shake all ingredients with ice. Double strain into a chilled coupe, rimmed with sugar if desired. Garnish and serve.",
    prep: "", funFact: "The Sidecar is generally believed to have originated in Paris around World War I, and remains one of the defining cognac cocktails in the classic canon.", bestFor: "A guest who wants an elegant, citrus-forward brandy cocktail."
  },
  {
    id: "cc12", price: 19, name: "Vieux Carré", category: "classic", spirit: "Brandy/Cognac", glassware: "Rocks", method: "Stir & Strain",
    flavorTags: ["Herbal", "Spice", "Dried Fruit", "Rich"],
    ingredients: ["3/4 oz Rye Whiskey", "3/4 oz Cognac", "3/4 oz Sweet Vermouth", "1 tsp Bénédictine", "2 dashes Peychaud's Bitters", "2 dashes Angostura Bitters"],
    garnish: "Lemon Twist or Cherry",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Created in the 1930s at the Hotel Monteleone in New Orleans' French Quarter — \"Vieux Carré\" is French for \"old square,\" the historic name for that neighborhood.", bestFor: "A guest who wants something complex and layered, blending two full base spirits."
  },
  {
    id: "cc13", price: 17, name: "Naked and Famous", category: "classic", spirit: "Mezcal", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Smoke", "Herbal", "Bitter", "Citrus"],
    ingredients: ["0.75 oz Mezcal", "0.75 oz Aperol", "0.75 oz Yellow Chartreuse", "0.75 oz Fresh Lime Juice"],
    garnish: "None",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Serve without garnish.",
    prep: "", funFact: "Created in 2011 at New York's Death & Co, the Naked and Famous is structured as a modern riff on the Last Word, swapping in mezcal, Aperol, and lime for gin, green Chartreuse, and maraschino.", bestFor: "A guest who wants a smoky, bittersweet, equal-parts modern classic."
  },
  {
    id: "cc14", price: 16, name: "Mezcal Paloma", category: "classic", spirit: "Mezcal", glassware: "Collins", method: "Build",
    flavorTags: ["Grapefruit", "Smoke", "Citrus", "Crisp"],
    ingredients: ["2 oz Mezcal", "0.5 oz Fresh Lime Juice", "Grapefruit Soda, Top"],
    garnish: "Grapefruit Wheel, Salt Rim (optional)",
    directions: "Build mezcal and lime juice over fresh ice in a Collins glass. Top with grapefruit soda. Garnish and serve.",
    prep: "", funFact: "Swapping mezcal for tequila in a Paloma adds a smoky backbone that plays particularly well with grapefruit's natural bitterness.", bestFor: "A tequila-Paloma drinker who wants to try the smokier mezcal version."
  },
  {
    id: "cc15", price: 16, name: "Negroni", category: "classic", spirit: "Amaro, Bitters & Aperitifs", glassware: "Rocks Glass", method: "Stir & Strain",
    flavorTags: ["Bitter", "Herbal", "Orange", "Bold"],
    ingredients: ["1 oz Gin", "1 oz Campari", "1 oz Sweet Vermouth"],
    garnish: "Orange Peel",
    directions: "Stir all ingredients with ice until well chilled. Strain over a large ice cube into a rocks glass. Garnish and serve.",
    prep: "", funFact: "Legend credits Count Camillo Negroni in 1919 Florence, who asked a bartender to strengthen his Americano by swapping soda water for gin.", bestFor: "A guest who wants a bold, bitter, no-apologies aperitif."
  },
  {
    id: "cc16", price: 15, name: "Aperol Spritz", category: "classic", spirit: "Amaro, Bitters & Aperitifs", glassware: "Wine Glass", method: "Build",
    flavorTags: ["Orange", "Bitter", "Bubbles", "Light"],
    ingredients: ["3 oz Prosecco", "2 oz Aperol", "1 oz Soda Water"],
    garnish: "Orange Slice",
    directions: "Build over ice in a wine glass: Prosecco first, then Aperol, then a splash of soda water. Stir gently. Garnish and serve.",
    prep: "", funFact: "The Aperol Spritz has roots in 19th-century Veneto, when Austrian soldiers reportedly asked local bartenders to lighten their wine with a splash of water — 'spritzen' in German.", bestFor: "A low-proof, bright aperitif for anyone easing into the evening."
  },
  {
    id: "cc17", price: 17, name: "Last Word", category: "classic", spirit: "Liqueurs & Cordials", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Herbal", "Cherry", "Citrus", "Bold"],
    ingredients: ["0.75 oz Gin", "0.75 oz Green Chartreuse", "0.75 oz Maraschino Liqueur", "0.75 oz Fresh Lime Juice"],
    garnish: "None",
    directions: "Shake all ingredients hard with ice. Double strain into a chilled coupe. Serve without garnish.",
    prep: "", funFact: "Invented at the Detroit Athletic Club in the 1920s, the Last Word fell into obscurity for decades before a Seattle bartender revived it in the early 2000s, sparking its modern comeback.", bestFor: "A guest who wants something herbal, bold, and equal-parts balanced."
  },
  {
    id: "cc18", price: 17, name: "Corpse Reviver No. 2", category: "classic", spirit: "Liqueurs & Cordials", glassware: "Coupe", method: "Shake & Strain",
    flavorTags: ["Citrus", "Orange", "Anise", "Bright"],
    ingredients: ["0.75 oz Gin", "0.75 oz Cointreau", "0.75 oz Lillet Blanc", "0.75 oz Fresh Lemon Juice", "Absinthe Rinse"],
    garnish: "None",
    directions: "Rinse a chilled coupe with absinthe and discard excess. Shake remaining ingredients hard with ice. Double strain into the prepared coupe. Serve without garnish.",
    prep: "", funFact: "Corpse Revivers were a whole 19th-century cocktail category meant as hangover cures; No. 2 is the only one that survived into the modern classic canon in wide use.", bestFor: "A guest who wants something bright, citrusy, and a little unusual."
  }
];

// Bower — mocktail list draft (5 non-alcoholic, same garden/French-technique thinking as the cocktail program)

const MOCKTAILS = [
  {
    id: "m1", price: 11, name: "Garden Cordial", glassware: "Collins", method: "Build", category: "mocktail",
    flavorTags: ["Cucumber", "Mint", "Elderflower", "Citrus"],
    ingredients: ["2 oz Cucumber-Mint Cordial (house prep)", "0.5 oz Fresh Lime Juice", "Soda Water, Top"],
    garnish: "Cucumber Ribbon, Mint Sprig",
    directions: "Build cordial and lime juice over fresh ice in a Collins glass. Top with soda water. Garnish and serve.",
    prep: "Cucumber-Mint Cordial: juice and strain 2 English cucumbers, combine with 1 cup sugar, 1 cup water, and a large handful of mint leaves, warm gently until sugar dissolves, cool, strain, bottle, refrigerate.",
    funFact: "A cordial in the classic sense — fruit or herb juice preserved with sugar — is the same technique that eventually gave rise to the modern syrup-based soda fountain.",
    bestFor: "The table's non-alcoholic opener, or anyone who wants something bright and green with the raw bar."
  },
  {
    id: "m2", price: 12, name: "Smoked Peach Iced Tea", glassware: "Rocks Glass", method: "Build", category: "mocktail",
    flavorTags: ["Peach", "Black Tea", "Lemon", "Smoke"],
    ingredients: ["4 oz Brewed Black Tea (chilled)", "1 oz Peach Purée", "0.5 oz Fresh Lemon Juice", "0.25 oz Simple Syrup"],
    garnish: "Peach Slice, Torched Rosemary Sprig",
    directions: "Build all ingredients over fresh ice in a rocks glass and stir gently. Garnish with a peach slice and, tableside, briefly torch a rosemary sprig to release aroma before setting it across the glass.",
    prep: "",
    funFact: "Torching a fresh herb without letting it fully catch fire releases its essential oils as aroma without any actual smoke flavor transferring to the drink — a technique borrowed directly from perfumery.",
    bestFor: "A guest who wants something that still feels like a real cocktail experience without any alcohol at all."
  },
  {
    id: "m3", price: 13, name: "Seedlip Garden Fizz", glassware: "Wine Glass", method: "Build", category: "mocktail",
    flavorTags: ["Herbal", "Cucumber", "Botanical", "Crisp"],
    ingredients: ["2 oz Seedlip Garden 108", "0.5 oz Fresh Lime Juice", "3 oz Tonic Water"],
    garnish: "Cucumber Ribbon, Basil Leaf",
    directions: "Build Seedlip and lime juice over fresh ice in a wine glass. Top with tonic water. Garnish and serve.",
    prep: "",
    funFact: "Seedlip, launched in 2015, is widely credited as the product that kicked off the modern non-alcoholic spirits category, distilled using the same copper pot stills as gin, minus the alcohol.",
    bestFor: "A gin drinker who wants the same botanical, herbal experience without the alcohol."
  },
  {
    id: "m4", price: 11, name: "Hibiscus & Ginger Shrub Spritz", glassware: "Wine Glass", method: "Build", category: "mocktail",
    flavorTags: ["Hibiscus", "Ginger", "Tart", "Effervescent"],
    ingredients: ["2 oz Chilled Hibiscus Tea", "0.75 oz Ginger Shrub (house prep)", "Soda Water, Top"],
    garnish: "Dried Hibiscus Flower, Lime Wheel",
    directions: "Build hibiscus tea and ginger shrub over fresh ice in a wine glass. Top with soda water. Garnish and serve.",
    prep: "Ginger Shrub: combine equal parts fresh ginger juice, apple cider vinegar, and sugar, whisk until sugar dissolves, bottle, refrigerate at least 24 hours before use.",
    funFact: "Shrubs — vinegar-based fruit or herb syrups — were originally a preservation technique from before refrigeration existed, and have made a genuine comeback in modern non-alcoholic drink programs specifically because they add real acidity and complexity.",
    bestFor: "A guest who wants something tart and complex, closer to a cocktail's acid balance than a simple juice drink."
  },
  {
    id: "m5", price: 11, name: "Chamomile Honey Lemonade", glassware: "Collins", method: "Build", category: "mocktail",
    flavorTags: ["Chamomile", "Honey", "Lemon", "Soft"],
    ingredients: ["4 oz Fresh Lemon Juice and Water (1:3)", "1 oz Chamomile Honey Syrup (house prep)", "Sparkling Water, Top"],
    garnish: "Dried Chamomile Flower, Lemon Wheel",
    directions: "Build lemon-water, chamomile honey syrup, and sparkling water over fresh ice in a Collins glass. Stir gently. Garnish and serve.",
    prep: "Chamomile Honey Syrup: steep 3 chamomile tea bags in 1 cup hot honey-water simple syrup (1:1) for 10 minutes, strain, cool, bottle, refrigerate.",
    funFact: "This uses the same chamomile honey syrup as the bar's Honey Chamomile Sour, just without the bourbon and egg white — a genuinely shared build between the two programs.",
    bestFor: "A guest who wants something soft, floral, and not too tart to close out the meal alongside dessert."
  }
];

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

// Bower — coffee program draft. Real roaster/producer (Belleville Brûlerie,
// Paris — founded 2013 by David Flynn, Thomas Lehoux, Anselme Blayney; head
// roaster Mihaela Iordache) and real direct-trade producers (the Moreno
// family, El Cedral, Santa Barbara, Honduras; Neptaly Bautista, Honduras).
// Facts verified via search rather than assumed.

const COFFEE_BY_THE_CUP = [
  {
    id: "cf1", name: "Espresso", price: 6,
    description: "Ch\u00e2teau Belleville, Belleville Br\u00fblerie's signature assemblage, pulled short and concentrated.",
    method: "Pulled Short",
    flavorTags: ["Dark Chocolate", "Caramelized Sugar", "Toasted Hazelnut", "Dried Fig"],
    structure: { fragrance: 5, acidity: 2, sweetness: 3, body: 5, aftertaste: 4 },
    guestDescription: "The purest expression of the Ch\u00e2teau Belleville blend \u2014 high pressure and short contact time concentrate the syrupy body and caramelized sweetness, with the crema carrying most of the aroma.",
    sellingPoints: ["The most concentrated way to taste the house blend", "Foundation for every milk drink on the list", "Ready in under 30 seconds"],
    brewingNote: "Espresso uses high pressure to force water through finely-ground coffee in roughly 25\u201330 seconds, extracting a small, concentrated shot topped with crema \u2014 the opposite end of the spectrum from Filtre.",
    funFact: "Crema, the reddish-brown foam on top of a well-pulled shot, is an emulsion of CO2 and oils released under pressure \u2014 it doesn't form in any other brewing method."
  },
  {
    id: "cf2", name: "Macchiato", price: 7,
    description: "Espresso marked with a small dollop of steamed milk foam.",
    method: "Espresso, Marked",
    flavorTags: ["Dark Chocolate", "Caramelized Sugar", "Steamed Milk", "Toasted Hazelnut"],
    structure: { fragrance: 5, acidity: 2, sweetness: 3, body: 4, aftertaste: 4 },
    guestDescription: "Espresso \u2018marked\u2019 (macchiato, in Italian) with just enough steamed milk foam to round the sharpest edges without diluting the shot underneath.",
    sellingPoints: ["For guests who want espresso softened, not diluted", "A traditional Italian order, not a milk drink in disguise"],
    brewingNote: "Just a spoonful of milk foam sits on top of a standard shot \u2014 no steamed milk is poured in, so the espresso itself stays fully concentrated.",
    funFact: "In Italy, ordering a plain \u2018espresso\u2019 at the bar and a \u2018macchiato\u2019 are both completely normal any time of day \u2014 unlike cappuccino, which locals rarely order after 11am."
  },
  {
    id: "cf3", name: "Cappuccino", price: 8,
    description: "Espresso with steamed milk and a deep layer of foam.",
    method: "Espresso + Steamed Milk",
    flavorTags: ["Steamed Milk", "Caramelized Sugar", "Dark Chocolate", "Toasted Hazelnut"],
    structure: { fragrance: 4, acidity: 1, sweetness: 4, body: 3, aftertaste: 3 },
    guestDescription: "Espresso built with steamed milk and a thick cap of microfoam \u2014 traditionally one-third each of espresso, steamed milk, and foam.",
    sellingPoints: ["The most familiar order on the list for most guests", "Milk's natural sugars round out the blend's sweetness"],
    brewingNote: "Steaming aerates the milk, folding in air to build the foam while the underlying espresso stays close to full strength \u2014 the foam is what separates a cappuccino from a latte.",
    funFact: "The name comes from the Capuchin friars, whose brown robes were said to resemble the color of espresso lightened with a little milk."
  },
  {
    id: "cf4", name: "Caf\u00e9 Cr\u00e8me", price: 9,
    description: "The classic French milk coffee \u2014 espresso lengthened with steamed milk, a size below a latte, the way it's served at Belleville's own Parisian caf\u00e9.",
    method: "Espresso, Lengthened",
    flavorTags: ["Steamed Milk", "Caramelized Sugar", "Toasted Hazelnut", "Dark Chocolate"],
    structure: { fragrance: 3, acidity: 1, sweetness: 4, body: 3, aftertaste: 2 },
    guestDescription: "The everyday order at any Parisian caf\u00e9 counter \u2014 espresso lengthened with steamed milk into something gentler and more sippable than a cappuccino, without going as large as a latte.",
    sellingPoints: ["The most authentically French order on the menu", "A gentler, more session-able milk coffee than a latte"],
    brewingNote: "More steamed milk goes in than a cappuccino, and it's poured rather than layered \u2014 the result is smoother and less foam-forward.",
    funFact: "In France, this is simply called \u2018un cr\u00e8me\u2019 at the counter \u2014 no one says the full name."
  },
  {
    id: "cf5", name: "Filtre", price: 6,
    description: "Slow filter coffee, brewed from Belleville's Ch\u00e2teau Belleville assemblage.",
    method: "Drip Filter",
    flavorTags: ["Red Apple", "Brown Sugar", "Toasted Hazelnut", "Dried Fig"],
    structure: { fragrance: 3, acidity: 4, sweetness: 3, body: 2, aftertaste: 3 },
    guestDescription: "The same Ch\u00e2teau Belleville blend, brewed slowly through a paper filter instead of forced under pressure \u2014 the clearest, brightest way to taste it, with the fruit and acidity that espresso extraction tends to mute.",
    sellingPoints: ["Shows the blend's brighter, fruitier side that espresso conceals", "The lightest-bodied option on the coffee list", "Brews in a single cup, tableside-appropriate pace"],
    brewingNote: "Gravity, not pressure, pulls water through the grounds over several minutes \u2014 the slower, gentler extraction favors the more delicate acids and aromatics that pressure brewing tends to overshadow.",
    funFact: "Filter and espresso are brewed from the exact same beans here \u2014 the dramatic flavor difference between the two comes entirely from the brewing method, not the coffee itself."
  },
  {
    id: "cf6", name: "Cold Brew", price: 9,
    description: "Steeped cold for 16 hours and served over ice.",
    method: "Cold Steeped, 16 Hours",
    flavorTags: ["Dark Chocolate", "Brown Sugar", "Dried Fig", "Toasted Hazelnut"],
    structure: { fragrance: 2, acidity: 1, sweetness: 4, body: 4, aftertaste: 3 },
    guestDescription: "Coarsely ground Ch\u00e2teau Belleville, steeped in cold water for sixteen hours rather than brewed hot \u2014 the slow cold extraction pulls sweetness and chocolate notes forward while leaving most of the acid behind.",
    sellingPoints: ["Naturally low-acid, a good option for sensitive stomachs", "Smooth and sweet enough to work with no added sugar", "A cold, refreshing option on the list beyond iced espresso"],
    brewingNote: "Cold water dissolves coffee's acidic compounds far less readily than hot water, so a long cold steep extracts sweetness and body while leaving most of the sharper acidity behind \u2014 the opposite trade-off from Filtre.",
    funFact: "Cold brew concentrate can hold in the fridge for up to two weeks without turning bitter \u2014 hot-brewed coffee starts degrading within hours."
  }
];

const COFFEE_SIPHON = [
  {
    id: "cs1", name: "Miguel Moreno, El Filo", price: 28, region: "Santa Barbara, Honduras",
    producer: "Miguel Moreno & the Moreno family", process: "Washed, Pacas variety",
    flavorTags: ["Red Apple", "Brown Sugar", "Orange Blossom", "Toasted Almond"],
    structure: { fragrance: 4, acidity: 4, sweetness: 4, body: 3, aftertaste: 4 },
    guestDescription: "Brewed tableside in a siphon — an immersion method that pulls out a bolder, more textured cup than drip. From Miguel Moreno's family farm in Santa Barbara, Honduras, sourced directly by our roasting partner since 2013.",
    sellingPoints: ["From one of the most decorated families in Honduran specialty coffee", "Direct-trade relationship dating back over a decade"],
    originNote: "The Moreno family farms several plots on the hillsides around El Cedral, grouped under the name \"El Filo\" (the ridge) for their hillside position.",
    brewingNote: "Vapor pressure pushes water up into the coffee as the lower chamber heats; as it cools, the brewed coffee is pulled back through a filter, for a fuller, cleaner cup than drip.",
    moment: "A table of two who want an actual moment at the end of the meal, not just a coffee order.",
    memory: "Brown sugar and orange blossom, brewed tableside from one of Honduras's most respected coffee families.",
    pairingDishIds: ["d-pear-frangipane", "d-fromage-plate"],
    arsenal: "Miguel Moreno placed 4th in Honduras's Cup of Excellence competition in 2007, scoring over 90 points — that's the level of farm this coffee comes from.",
    funFact: "The Moreno family has farmed in El Cedral, Santa Barbara for generations — several of Daniel Moreno's five sons, including Miguel and his brother Jesus, now farm individually recognized plots.",
    funFact2: "Miguel's interest in specialty coffee was sparked in 2005, picking up a neighbor's Cup of Excellence award on their behalf before he'd entered a coffee of his own.",
    shortStory: "Miguel Moreno returned to his family's village in Santa Barbara in 2005 to help on the farm, then convinced his father Daniel to commit fully to quality production — building out the plots now known collectively as El Filo, a name genuinely respected across Honduran specialty coffee.",
    recommendedFor: "Recommended for two guests"
  },
  {
    id: "cs2", name: "Neptaly Bautista", price: 26, region: "Honduras",
    producer: "Neptaly Bautista", process: "Natural",
    flavorTags: ["Tropical Fruit", "Honey", "Dried Mango", "Caramel"],
    structure: { fragrance: 5, acidity: 3, sweetness: 5, body: 4, aftertaste: 4 },
    guestDescription: "Tropical fruit and honey, brewed tableside via siphon. This was the very first coffee Belleville Brûlerie ever purchased — they've bought the grower's entire specialty harvest every year since.",
    sellingPoints: ["The first coffee our roasting partner ever bought, still purchased in full every year", "Naturally processed for a riper, more fruit-forward cup than a washed coffee", "A genuinely different profile from the Moreno lot — brighter and sweeter"],
    originNote: "Neptaly Bautista's coffee holds a specific place in Belleville Brûlerie's history as their first-ever purchase — the relationship has continued long enough that the roaster now buys the grower's full specialty-grade harvest each year rather than sourcing competitively.",
    brewingNote: "Natural processing means the coffee cherry dries whole around the bean rather than being pulped first, which is what pushes the tropical fruit and honey character so far forward in the cup.",
    moment: "A guest who wants something sweeter and more fruit-driven to close a meal that leaned savory.",
    memory: "Dried mango and honey — the coffee our roasting partner has never stopped buying.",
    pairingDishIds: ["d-tarte-tatin", "d-creme-brulee"],
    arsenal: "This was literally the first coffee our roaster ever bought — the relationship has held for over a decade, which says something about consistency.",
    funFact: "Natural-process coffees are dried with the fruit still intact around the bean, sometimes for several weeks, which is what gives them a noticeably sweeter, more fermented-fruit character than washed coffees.",
    funFact2: "Because the relationship has run long enough to become an exclusive full-harvest purchase, this lot isn't available on the open specialty market at all.",
    shortStory: "When Belleville Brûlerie opened in Paris in 2013, Neptaly Bautista's Honduran lot was the very first coffee the roastery bought. More than a decade later, they still purchase his entire specialty-grade harvest each year — a rare kind of loyalty in a market where roasters typically chase new lots every season.",
    recommendedFor: "Recommended for two guests"
  }
];
