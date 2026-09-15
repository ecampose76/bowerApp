// Bower — coffee program draft. Real roaster/producer (Belleville Brûlerie,
// Paris — founded 2013 by David Flynn, Thomas Lehoux, Anselme Blayney; head
// roaster Mihaela Iordache) and real direct-trade producers (the Moreno
// family, El Cedral, Santa Barbara, Honduras; Neptaly Bautista, Honduras).
// Facts verified via search rather than assumed.

const COFFEE_BY_THE_CUP = [
  { id: "cf1", name: "Espresso", price: 6, description: "Château Belleville, Belleville Brûlerie's signature assemblage, pulled short and concentrated." },
  { id: "cf2", name: "Macchiato", price: 7, description: "Espresso marked with a small dollop of steamed milk foam." },
  { id: "cf3", name: "Cappuccino", price: 8, description: "Espresso with steamed milk and a deep layer of foam." },
  { id: "cf4", name: "Café Crème", price: 9, description: "The classic French milk coffee — espresso lengthened with steamed milk, a size below a latte, the way it's served at Belleville's own Parisian café." },
  { id: "cf5", name: "Filtre", price: 6, description: "Slow filter coffee, brewed from Belleville's Château Belleville assemblage." },
  { id: "cf6", name: "Cold Brew", price: 9, description: "Steeped cold for 16 hours and served over ice." }
];

const COFFEE_SIPHON = [
  {
    id: "cs1", name: "Miguel Moreno, El Filo", price: 28, region: "Santa Barbara, Honduras",
    producer: "Miguel Moreno & the Moreno family", process: "Washed, Pacas variety",
    flavorTags: ["Red Apple", "Brown Sugar", "Orange Blossom", "Toasted Almond"],
    structure: { acidity: 4, sweetness: 4, body: 3, complexity: 5, finish: 4 },
    guestDescription: "Brewed tableside in a siphon — an immersion method that pulls out a bolder, more textured cup than drip. From Miguel Moreno's family farm in Santa Barbara, Honduras, sourced directly by our roasting partner since 2013.",
    sellingPoints: ["From one of the most decorated families in Honduran specialty coffee", "Direct-trade relationship dating back over a decade", "The siphon method genuinely changes the texture, not just the ceremony"],
    originNote: "The Moreno family — patriarch Daniel and his five sons — farms several plots on the hillsides around El Cedral, grouped under the name \"El Filo\" (the ridge), a reference to their hillside position.",
    brewingNote: "Siphon brewing uses vapor pressure and gravity rather than gravity alone — as the lower chamber heats, pressure pushes water up into the coffee, then as it cools, the brewed coffee is pulled back down through a filter, producing a fuller-bodied, cleaner cup than drip.",
    moment: "A table of two who want an actual moment at the end of the meal, not just a coffee order.",
    memory: "Brown sugar and orange blossom, brewed tableside from one of Honduras's most respected coffee families.",
    pairingDishIds: ["d-pear-frangipane", "d-fromage-plate"],
    arsenal: "Miguel Moreno placed 4th in Honduras's Cup of Excellence competition in 2007, scoring over 90 points — that's the level of farm this coffee comes from.",
    funFact: "The Moreno family has farmed in El Cedral, Santa Barbara for generations, and several of Daniel Moreno's five sons — including Miguel and his brother Jesus — now farm individually recognized plots.",
    funFact2: "Miguel Moreno's early interest in specialty coffee was sparked by picking up a Cup of Excellence award on a neighbor's behalf in 2005 — he was hooked before he'd even entered his own coffee in competition.",
    shortStory: "Miguel Moreno returned to his family's village in Santa Barbara, Honduras in 2005 to help on the family farm. A neighbor's Cup of Excellence win that same year pulled him into specialty coffee, and after convincing his father Daniel to commit fully to quality production, the Moreno family built out the plots now known collectively as El Filo — a name that's become genuinely respected across Honduran specialty coffee.",
    recommendedFor: "Recommended for two guests"
  },
  {
    id: "cs2", name: "Neptaly Bautista", price: 26, region: "Honduras",
    producer: "Neptaly Bautista", process: "Natural",
    flavorTags: ["Tropical Fruit", "Honey", "Dried Mango", "Caramel"],
    structure: { acidity: 3, sweetness: 5, body: 4, complexity: 4, finish: 4 },
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
