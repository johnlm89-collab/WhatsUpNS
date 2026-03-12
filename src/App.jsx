import { useState, useEffect, useRef } from "react";

/* ============ DATA ============ */
const CATEGORIES = [
  { id: "all", label: "All Events", icon: "✦" },
  { id: "music", label: "Music & Live", icon: "♪" },
  { id: "food", label: "Food & Drink", icon: "🦞" },
  { id: "arts", label: "Arts & Culture", icon: "◈" },
  { id: "outdoors", label: "Outdoors", icon: "⛵" },
  { id: "festivals", label: "Festivals", icon: "✺" },
  { id: "family", label: "Family", icon: "☀" },
  { id: "markets", label: "Markets", icon: "⬡" },
  { id: "sports", label: "Sports", icon: "🏅" },
];

const REGIONS = [
  { id: "Halifax", name: "Halifax", blurb: "Nova Scotia's vibrant capital city blends urban energy with coastal charm. Home to a world-class waterfront boardwalk, a thriving food and music scene, and over 250 years of maritime history." },
  { id: "South Shore", name: "South Shore", blurb: "A stunning stretch of coastline from Peggy's Cove to Shelburne, dotted with colourful fishing villages, lighthouses, and UNESCO World Heritage Lunenburg." },
  { id: "Cape Breton", name: "Cape Breton", blurb: "An island of dramatic highlands, Celtic culture, and the world-famous Cabot Trail. Cape Breton's rugged beauty and Gaelic traditions have earned it recognition as one of the top island destinations on the planet." },
  { id: "Bay of Fundy", name: "Bay of Fundy", blurb: "Home to the highest tides on Earth, the Bay of Fundy is a natural wonder that reshapes the coastline twice daily. Explore sea caves, ride the tidal bore, and feast on fresh seafood." },
  { id: "Annapolis Valley", name: "Annapolis Valley", blurb: "Nova Scotia's agricultural heartland and wine country, nestled between the North and South Mountains. Famous for award-winning wineries, apple orchards, and farm-to-table dining." },
  { id: "Acadian Shore", name: "Acadian Shore", blurb: "The vibrant heart of Nova Scotia's Acadian culture stretches along the southwestern coast. Rich in French-Acadian heritage, celebrated through music, cuisine, and colourful festivals." },
  { id: "Northumberland Shore", name: "Northumberland Shore", blurb: "Nova Scotia's warmest beaches line the Northumberland Strait, with sandy shores and water temperatures that rival the Carolinas in summer." },
  { id: "Eastern Shore", name: "Eastern Shore", blurb: "One of Nova Scotia's best-kept secrets — a wild, unspoiled coastline of rugged headlands, secluded beaches, and tiny fishing communities." },
];

const VENUE_TYPES = ["All Types", "Music Venue", "Performing Arts", "Outdoor Venue", "Multi-Purpose Arena", "Arts Centre", "Community Centre", "Cultural Centre", "Restaurant & Venue", "Winery", "Cooking School", "Resort & Venue", "Museum & Venue", "Dance Hall", "Theatre"];

const VENUES = [
  { name: "The Carleton", type: "Music Venue", area: "Halifax", description: "Halifax's premier intimate live music room, hosting local and touring artists in a warm, welcoming atmosphere." },
  { name: "Neptune Theatre", type: "Performing Arts", area: "Halifax", description: "Atlantic Canada's largest professional theatre, presenting world-class productions in the heart of downtown Halifax since 1963." },
  { name: "Bishop's Landing", type: "Outdoor Venue", area: "Halifax", description: "A waterfront gathering space on the Halifax boardwalk, hosting markets, festivals, and community events year-round." },
  { name: "Scotiabank Centre", type: "Multi-Purpose Arena", area: "Halifax", description: "Halifax's largest event venue hosting major concerts, sporting events, and the Royal Nova Scotia International Tattoo." },
  { name: "The Marquee Ballroom", type: "Music Venue", area: "Halifax", description: "A legendary Halifax nightclub and concert venue known for hosting breakthrough indie, rock, and electronic acts." },
  { name: "Light House Arts Centre", type: "Performing Arts", area: "Halifax", description: "A downtown Halifax venue for concerts, comedy, and performance art. One of the city's most versatile live event spaces." },
  { name: "Casino Nova Scotia", type: "Performing Arts", area: "Halifax", description: "Home to the Bruce Guthro Theatre, hosting touring musicians, comedians, and special events on the Halifax waterfront." },
  { name: "Halifax Waterfront", type: "Outdoor Venue", area: "Halifax", description: "The iconic boardwalk stretching along Halifax Harbour, home to the Jazz Festival main stage, Busker Festival, and seasonal markets." },
  { name: "The Shore Club", type: "Dance Hall", area: "South Shore", description: "Nova Scotia's Last Great Dance Hall in Hubbards, celebrating 90 years of lobster suppers and live music on the shore." },
  { name: "Lunenburg School of the Arts", type: "Arts Centre", area: "South Shore", description: "A creative hub in UNESCO Lunenburg offering workshops, exhibitions, and performances in a beautifully restored heritage building." },
  { name: "Mahone Bay Centre", type: "Community Centre", area: "South Shore", description: "The heart of Mahone Bay's community life, hosting craft fairs, concerts, and seasonal events." },
  { name: "Highland Arts Theatre", type: "Performing Arts", area: "Cape Breton", description: "A beautifully restored 1930s cinema in downtown Sydney, now one of Cape Breton's top venues for theatre, music, and film." },
  { name: "Gaelic College", type: "Cultural Centre", area: "Cape Breton", description: "The only institution in North America dedicated to Scottish Gaelic language and culture. Hosts concerts, ceilidhs, and workshops." },
  { name: "Hall's Harbour Lobster Pound", type: "Restaurant & Venue", area: "Bay of Fundy", description: "An iconic seaside lobster restaurant overlooking one of the Bay of Fundy's most photogenic harbours." },
  { name: "Lightfoot & Wolfville Vineyards", type: "Winery", area: "Annapolis Valley", description: "A stunning hilltop winery with panoramic views of the Annapolis Valley, hosting tastings, tours, and events." },
  { name: "La Cuisine Robicheau", type: "Cooking School", area: "Acadian Shore", description: "A family-run Acadian cooking school in Clare, offering hands-on workshops in traditional Maritime cuisine." },
  { name: "Pictou Lodge", type: "Resort & Venue", area: "Northumberland Shore", description: "A waterfront lodge on the Northumberland Strait hosting retreats, weddings, and seasonal events." },
  { name: "Memory Lane Heritage Village", type: "Museum & Venue", area: "Eastern Shore", description: "A living history village in Lake Charlotte that brings Nova Scotia's rural past to life through interactive exhibits." },
  { name: "Th'YARC", type: "Performing Arts", area: "Acadian Shore", description: "Yarmouth Arts Regional Centre — a vibrant performing arts venue hosting theatre, music, and community events in southwestern Nova Scotia." },
];

const MONTHS = [
  { id: "all", label: "All Months" },
  { id: "mar", label: "March" }, { id: "apr", label: "April" }, { id: "may", label: "May" },
  { id: "jun", label: "June" }, { id: "jul", label: "July" }, { id: "aug", label: "August" },
];

const EVENTS = [
  // MARCH
  { id: 1, title: "Savour Food & Wine Festival", category: "food", date: "Mar 28–29", month: "mar", day: "Saturday–Sunday", time: "Various", location: "Halifax Waterfront", area: "Halifax", description: "A celebration of Nova Scotia's finest food and wine, featuring tastings, chef demos, and pairings from the province's best restaurants and wineries.", longDescription: "The Savour Food & Wine Festival brings together Nova Scotia's top chefs, winemakers, and food producers for a weekend celebration of local flavour.\n\nSample dishes from the province's best restaurants, taste wines from Annapolis Valley vineyards, and watch live cooking demonstrations from award-winning chefs. The festival features over 50 vendors, a grand tasting hall, and special multi-course dinners.\n\nHighlights include the Savour Chef Challenge, vineyard-paired tasting sessions, and a Saturday night gala dinner featuring a six-course meal with wine pairings.\n\nVIP passes include early entry, access to the premium tasting lounge, and a take-home Savour wine glass.", featured: true, price: "$45–$120", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", organizer: "Taste of Nova Scotia", contact: "info@savourns.ca", website: "https://savourns.ca", accessibility: "Fully wheelchair accessible.", tags: ["Food", "Wine", "Chef Demos", "19+"] },
  { id: 2, title: "Halifax Waterfront Night Market", category: "markets", date: "Mar 14", month: "mar", day: "Saturday", time: "5:00 PM – 10:00 PM", location: "Bishop's Landing, Halifax", area: "Halifax", description: "Local artisans, street food, and live music along the waterfront. Over 60 vendors featuring Nova Scotia crafts, seafood, and baked goods.", longDescription: "The Halifax Waterfront Night Market returns to Bishop's Landing for another spectacular evening of local culture. Browse over 60 vendors showcasing handmade crafts, jewellery, pottery, and textiles.\n\nThe food lineup features Halifax's best street food — lobster rolls, fish tacos, wood-fired pizza, and artisan donuts. Local breweries pour tastings throughout the evening.\n\nLive music kicks off at 6 PM on the waterfront stage. Bring the whole family — there's a kids' area with face painting and crafts.\n\nFree parking available at the waterfront lot after 5 PM. Runs rain or shine.", featured: true, price: "Free", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80", organizer: "Halifax Waterfront Development Corp", contact: "info@halifaxwaterfront.ca", website: "https://halifaxwaterfront.ca", accessibility: "Wheelchair accessible. Service animals welcome.", tags: ["Family Friendly", "Free Entry", "Food", "Live Music"] },
  { id: 3, title: "The Curio Collective Vintage Show", category: "markets", date: "Mar 21–22", month: "mar", day: "Saturday–Sunday", time: "10:00 AM – 5:00 PM", location: "Various Downtown Halifax", area: "Halifax", description: "Halifax's beloved vintage market returns with curated clothing, vinyl, furniture, and collectibles from dozens of local vendors.", longDescription: "The Curio Collective brings together Halifax's best vintage and secondhand dealers for a weekend of treasure hunting.\n\nBrowse curated racks of vintage clothing from the '60s through the '00s, dig through crates of vinyl records, and discover mid-century furniture, antique jewellery, and one-of-a-kind collectibles.\n\nOver 30 vendors set up across multiple downtown locations. The market celebrates sustainable shopping and Halifax's thriving vintage community.\n\nFree admission. Cash and card accepted at most vendors.", featured: false, price: "Free", image: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=800&q=80", organizer: "The Curio Collective", contact: "hello@curiocollective.ca", website: "https://curiocollective.ca", accessibility: "Most locations are accessible.", tags: ["Free Entry", "Shopping", "Vintage", "Sustainable"] },

  // APRIL
  { id: 4, title: "Goo Goo Dolls", category: "music", date: "Apr 10", month: "apr", day: "Friday", time: "7:30 PM", location: "Scotiabank Centre, Halifax", area: "Halifax", description: "Multi-platinum rock band Goo Goo Dolls bring their iconic hits to Halifax's biggest stage.", longDescription: "The Goo Goo Dolls bring decades of chart-topping rock to Scotiabank Centre. Known for anthems that have defined a generation, the band delivers an unforgettable live experience.\n\nExpect a setlist spanning their career, from early favourites to the songs that made them a household name. The band's live shows are known for their energy and connection with the audience.\n\nDoors open at 6:30 PM, show starts at 7:30 PM. Full concessions available inside the venue.\n\nTickets range from floor seats to upper bowl. VIP packages include early entry and a meet-and-greet.", featured: true, price: "$59–$149", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80", organizer: "Scotiabank Centre", contact: "info@scotiabank-centre.com", website: "https://scotiabank-centre.com", accessibility: "Fully accessible. Contact venue for accessible seating.", tags: ["Concert", "Rock", "All Ages", "Indoor"] },
  { id: 5, title: "Stars On Ice", category: "arts", date: "Apr 23", month: "apr", day: "Thursday", time: "7:00 PM", location: "Scotiabank Centre, Halifax", area: "Halifax", description: "Canada's premier figure skating tour featuring Olympic and World champion skaters in a spectacular ice show.", longDescription: "Stars On Ice brings the world's greatest figure skaters to Halifax for one spectacular evening of artistry and athleticism.\n\nFeaturing Olympic medallists and World champions, the show combines breathtaking jumps, spins, and choreography with stunning production values — lighting, music, and costumes that transform the ice into a stage.\n\nA beloved Canadian tradition for decades, Stars On Ice is a family-friendly event that appeals to skating fans and newcomers alike.\n\nDoors open at 6 PM. Concessions and merchandise available.", featured: false, price: "$45–$125", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", organizer: "IMG", contact: "info@starsonice.ca", website: "https://starsonice.ca", accessibility: "Scotiabank Centre is fully accessible.", tags: ["Family Friendly", "Figure Skating", "All Ages"] },
  { id: 6, title: "Triumph", category: "music", date: "Apr 28", month: "apr", day: "Tuesday", time: "7:30 PM", location: "Scotiabank Centre, Halifax", area: "Halifax", description: "Canadian rock legends Triumph return to the stage with their explosive live show.", longDescription: "Canadian rock icons Triumph bring their legendary live show to Halifax. Known for their powerful arena rock sound and spectacular stage production, Triumph remains one of Canada's most beloved rock bands.\n\nThe band's catalogue spans decades of Canadian rock history, and their live shows are known for their intensity and musicianship.\n\nDoors open at 6:30 PM. Full venue concessions available.\n\nReserved seating. VIP packages available with premium views and exclusive merchandise.", featured: false, price: "$69–$159", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", organizer: "Scotiabank Centre", contact: "info@scotiabank-centre.com", website: "https://scotiabank-centre.com", accessibility: "Fully accessible venue.", tags: ["Concert", "Rock", "All Ages"] },

  // MAY
  { id: 7, title: "Scotia Festival of Music", category: "music", date: "May 25 – Jun 7", month: "may", day: "Various", time: "Various", location: "Various Halifax Venues", area: "Halifax", description: "Two weeks of world-class live chamber music featuring over 20 of the best classical musicians on the planet.", longDescription: "Since 1980, the Scotia Festival of Music has been one of Nova Scotia's premier cultural events. Each year, over 20 world-class classical musicians and dozens of talented Young Artists gather for two weeks of intimate, collaborative performances.\n\nConcerts take place across Halifax's finest performance spaces, from concert halls to historic churches. The program features masterworks of the chamber music repertoire alongside new commissions and bold programming.\n\nThe festival also includes open rehearsals, pre-concert talks, and a Young Artist Program showcasing the next generation of classical talent.\n\nSingle tickets and festival passes available. Many events are free or pay-what-you-can.", featured: true, price: "Free–$45", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80", organizer: "Scotia Festival of Music", contact: "info@scotiafestival.com", website: "https://scotiafestival.com", accessibility: "Most venues are accessible. Check individual events.", tags: ["Classical Music", "Chamber Music", "Multi-Day", "Young Artists"] },
  { id: 8, title: "Annapolis Valley Apple Blossom Festival", category: "festivals", date: "May 27 – Jun 1", month: "may", day: "Wednesday–Monday", time: "Various", location: "Kentville & Annapolis Valley", area: "Annapolis Valley", description: "An annual springtime celebration with parades, live music, entertainment, and the famous coronation of the Apple Blossom Queen.", longDescription: "The Annapolis Valley Apple Blossom Festival is one of Nova Scotia's oldest and most beloved annual traditions, celebrating the arrival of spring in the Valley.\n\nThe week-long festival features a grand parade through Kentville, live music concerts, family entertainment, fireworks, and the iconic coronation ceremony. The apple orchards of the Valley burst into bloom, creating a stunning natural backdrop.\n\nCommunity events include pancake breakfasts, craft fairs, barn dances, and orchard tours. It's a celebration of Valley culture, agriculture, and community spirit.\n\nMost events are free. Some ticketed concerts and dinners.", featured: true, price: "Free–$30", image: "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=800&q=80", organizer: "Apple Blossom Festival Society", contact: "info@appleblossom.com", website: "https://appleblossom.com", accessibility: "Most outdoor events are accessible. Parade route is flat.", tags: ["Family Friendly", "Parade", "Free Events", "Tradition"] },
  { id: 9, title: "Peggy's Cove Sunrise Yoga", category: "outdoors", date: "May 18", month: "may", day: "Sunday", time: "5:30 AM", location: "Peggy's Cove", area: "South Shore", description: "Greet the dawn with a guided yoga session on the iconic granite rocks. All levels welcome.", longDescription: "Start your Sunday with one of the most unforgettable yoga experiences in Atlantic Canada. As the sun rises over the Atlantic, you'll flow through a gentle 75-minute class on the smooth granite rocks of Peggy's Cove.\n\nLed by certified instructor Sarah Morrison, this all-levels class combines vinyasa flow with breathwork and meditation.\n\nBring a yoga mat, warm layers, and water bottle. Meet at the main parking lot at 5:15 AM. Light refreshments and hot tea provided after.\n\nSpace limited to 20 participants. Rain date: the following Sunday.", featured: false, price: "$25", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80", organizer: "East Coast Wellness Co.", contact: "hello@eastcoastwellness.ca", website: "https://eastcoastwellness.ca", accessibility: "Uneven rocky terrain. Not wheelchair accessible.", tags: ["Wellness", "Outdoors", "Sunrise", "All Levels"] },

  // JUNE
  { id: 10, title: "Canada SailGP Grand Prix", category: "sports", date: "Jun 21–26", month: "jun", day: "Sunday–Friday", time: "Various", location: "Halifax Harbour", area: "Halifax", description: "International sailing's most exciting league comes to Halifax Harbour, with 12 teams racing high-performance F50 catamarans at thrilling speeds.", longDescription: "SailGP returns to Halifax Harbour for the Canada Grand Prix, pitting 12 international teams — including Canada's NorthStar team — against each other in the world's most exciting sailing competition.\n\nWatch from the waterfront as F50 catamarans fly across the harbour at speeds exceeding 100 km/h. The cutting-edge foiling boats are powered entirely by nature, making this one of the most sustainable major sporting events in the world.\n\nThe event village on the Halifax waterfront features live music, food vendors, interactive exhibits, and big-screen viewing areas. VIP grandstand tickets offer the closest views of the racing.\n\nFree waterfront viewing available. Premium tickets for grandstand and hospitality.", featured: true, price: "Free–$200", image: "https://images.unsplash.com/photo-1534854638093-bada1813ca19?w=800&q=80", organizer: "SailGP", contact: "info@sailgp.com", website: "https://sailgp.com", accessibility: "Waterfront village is accessible. Grandstand has accessible seating.", tags: ["Sailing", "International", "Waterfront", "Free Viewing"] },
  { id: 11, title: "KitchenFest! | Féis a' Chidsin!", category: "festivals", date: "Jun 26 – Jul 4", month: "jun", day: "Friday–Saturday", time: "Various", location: "Various Cape Breton Venues", area: "Cape Breton", description: "Dozens of concerts and events across Cape Breton kick off summer with traditional Celtic music, kitchen parties, and ceilidhs.", longDescription: "KitchenFest! is Cape Breton's beloved kickoff to summer — a nine-day celebration of the island's legendary music and hospitality.\n\nDozens of concerts, ceilidhs, square dances, and kitchen parties take place in community halls, churches, pubs, and living rooms across the island. From traditional Cape Breton fiddle to Gaelic singing to contemporary Celtic fusion, the music is authentic and electric.\n\nMany events are intimate gatherings where you'll find yourself dancing alongside locals. The festival captures what makes Cape Breton special — the music, the warmth, and the community.\n\nMost events are affordable or free. Check the schedule for individual event details.", featured: true, price: "$10–$30", image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80", organizer: "Celtic Colours International Festival", contact: "info@kitchenfest.ca", website: "https://kitchenfest.ca", accessibility: "Varies by venue. Contact for specific accessibility info.", tags: ["Celtic Music", "Kitchen Parties", "Multi-Day", "Traditional"] },
  { id: 12, title: "Acadian Kitchen: Rappie Pie Workshop", category: "food", date: "Jun 14", month: "jun", day: "Saturday", time: "2:00 PM – 5:00 PM", location: "La Cuisine Robicheau, Clare", area: "Acadian Shore", description: "Learn to make traditional Acadian rappie pie from scratch. Take home your creation and a piece of living culinary history.", longDescription: "Rappie pie (pâté à la rapure) is one of Nova Scotia's most iconic Acadian dishes — and this hands-on workshop teaches you how to make it the traditional way.\n\nJoin chef Marie-Claire Robicheau in her family kitchen in Clare. You'll learn the full process: grating the potatoes, extracting the starch, layering the chicken, and baking it to perfection.\n\nMarie-Claire shares stories of Acadian food traditions passed down through generations. You'll sit down to enjoy your creation with homemade bread and molasses cookies.\n\nEach participant takes home a full rappie pie, a recipe card, and a jar of chicken broth. Limited to 12 participants.", featured: false, price: "$55", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80", organizer: "La Cuisine Robicheau", contact: "marieclair@lacuisinerobicheau.ca", website: "https://lacuisinerobicheau.ca", accessibility: "Ground floor. Wheelchair accessible.", tags: ["Cooking Class", "Acadian Culture", "Hands-On", "Take Home"] },

  // JULY
  { id: 13, title: "Royal Nova Scotia International Tattoo", category: "festivals", date: "Jul 1–6", month: "jul", day: "Wednesday–Monday", time: "Various", location: "Scotiabank Centre, Halifax", area: "Halifax", description: "One of the world's premiere indoor shows featuring over 2,000 military and civilian performers from around the globe.", longDescription: "The Royal Nova Scotia International Tattoo is Nova Scotia's premier summer spectacle and one of the largest indoor shows on Earth.\n\nOver 2,000 Canadian and international military and civilian performers fill the Scotiabank Centre with music, dance, acrobatics, comedy, and military precision. Pipe and drum bands, military displays, gymnasts, and cultural performers create a show that is uniquely Nova Scotian in spirit and international in scope.\n\nThe Tattoo celebrates Nova Scotia's military heritage while showcasing talent from across the globe. Multiple performances over six days ensure everyone can experience this beloved tradition.\n\nTickets sell out quickly — early booking recommended.", featured: true, price: "$35–$85", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", organizer: "Royal Nova Scotia International Tattoo", contact: "info@nstattoo.ca", website: "https://nstattoo.ca", accessibility: "Scotiabank Centre is fully accessible.", tags: ["Military", "International", "Family Friendly", "Indoor"] },
  { id: 14, title: "Pictou Lobster Carnival", category: "food", date: "Jul 3–5", month: "jul", day: "Friday–Sunday", time: "Various", location: "Pictou Waterfront", area: "Northumberland Shore", description: "Celebrate lobster season with boat races, banding competitions, trap hauling contests, parades, live music, and legendary lobster suppers.", longDescription: "The Pictou Lobster Carnival celebrates another successful lobster fishing season in the town of Pictou on the Northumberland Shore.\n\nLobster lovers can take part in all the festivities — from lobster boat races and lobster banding competitions to trap hauling contests and, of course, legendary lobster suppers.\n\nThe carnival also features live music, a grand parade through town, carnival rides, craft vendors, and family entertainment. It's a true Maritime celebration of community and the sea.\n\nFree admission to the carnival grounds. Lobster suppers and some events ticketed separately.", featured: true, price: "Free–$50", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80", organizer: "Pictou Lobster Carnival Society", contact: "info@pictoulobstercarnival.ca", website: "https://pictoulobstercarnival.ca", accessibility: "Waterfront grounds are mostly accessible.", tags: ["Seafood", "Family Friendly", "Parade", "Carnival"] },
  { id: 15, title: "Digby Lobster Bash", category: "food", date: "Jul 3–5", month: "jul", day: "Friday–Sunday", time: "Various", location: "Digby Waterfront", area: "Acadian Shore", description: "A celebration of the lobster industry in South West Nova Scotia with fresh seafood, entertainment, and waterfront festivities.", longDescription: "The Digby Lobster Bash is a three-day celebration promoting the lobster industry in southwestern Nova Scotia.\n\nFeast on freshly caught lobster, enjoy live entertainment, and take in the beautiful Digby waterfront. The event brings together fishers, families, and visitors for a true Maritime seafood celebration.\n\nActivities include cooking demos, live music, craft vendors, and plenty of opportunities to enjoy Nova Scotia's famous crustacean in every way imaginable.\n\nMost events are family-friendly and free to attend. Seafood meals available for purchase.", featured: false, price: "Free–$40", image: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&q=80", organizer: "Digby & Area Board of Trade", contact: "info@digbylobsterbash.ca", website: "https://digbylobsterbash.ca", accessibility: "Waterfront grounds are mostly accessible.", tags: ["Seafood", "Family Friendly", "Waterfront", "Free Entry"] },
  { id: 16, title: "TD Halifax Jazz Festival", category: "music", date: "Jul 7–12", month: "jul", day: "Tuesday–Sunday", time: "Various", location: "Halifax Waterfront & Various Venues", area: "Halifax", description: "Six days of world-class jazz, blues, and soul on the Halifax waterfront with international headliners and free outdoor stages.", longDescription: "The TD Halifax Jazz Festival returns for six electrifying days of music across Halifax. The main stage on the waterfront offers free outdoor concerts with harbour views and fresh ocean air.\n\nThe festival features a mix of international headliners, Canadian stars, and rising talent across jazz, blues, soul, funk, and world music. Indoor club shows at intimate venues across the city complement the big outdoor performances.\n\nWorkshops, jam sessions, and late-night sets round out the programming. The atmosphere on the waterfront is electric — bring a blanket, grab some food from local vendors, and enjoy the music.\n\nMain stage events are free. Indoor and premium shows are ticketed.", featured: true, price: "Free–$65", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80", organizer: "Halifax Jazz Festival Society", contact: "info@halifaxjazzfestival.ca", website: "https://halifaxjazzfestival.ca", accessibility: "Main stage area is accessible. Indoor venues vary.", tags: ["Jazz", "Free Outdoor Shows", "Multi-Day", "Waterfront"] },
  { id: 17, title: "Heartland Tour", category: "outdoors", date: "Jul 11–18", month: "jul", day: "Saturday–Saturday", time: "All Day", location: "Various Nova Scotia", area: "Annapolis Valley", description: "A week-long cycling tour through Nova Scotia's most scenic regions, from the Valley to the coast.", longDescription: "The Heartland Tour is a week-long supported cycling adventure through some of Nova Scotia's most beautiful countryside.\n\nRiders pedal through the Annapolis Valley, along the Bay of Fundy coast, through historic towns, and past rolling farmland and vineyards. Daily distances are manageable for intermediate cyclists, with options for shorter routes.\n\nFull support includes luggage transport, rest stops, mechanical assistance, and catered meals featuring local food. Overnight stays in communities along the route offer a chance to experience small-town Nova Scotia hospitality.\n\nRegistration includes all meals, accommodation, route support, and a finisher's jersey.", featured: false, price: "$1,200", image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80", organizer: "Heartland Tour", contact: "info@heartlandtour.ca", website: "https://heartlandtour.ca", accessibility: "Contact organizer for adaptive cycling options.", tags: ["Cycling", "Multi-Day", "Supported Tour", "Scenic"] },
  { id: 18, title: "Mahone Bay Scarecrow & Craft Fair", category: "markets", date: "Jul 19–20", month: "jul", day: "Saturday–Sunday", time: "9:00 AM – 4:00 PM", location: "Mahone Bay Centre", area: "South Shore", description: "Whimsical scarecrow displays line the streets while 40+ crafters fill the community centre with handmade treasures.", longDescription: "The charming town of Mahone Bay transforms into a whimsical wonderland of creative scarecrow displays. Local businesses, families, and community groups compete for the most imaginative scarecrows.\n\nInside the Mahone Bay Centre, over 40 artisans sell handmade pottery, quilts, knitted goods, wooden toys, candles, and soaps — all made in Nova Scotia.\n\nThe food court features fish cakes, chowder, meat pies, and fresh-baked treats. Don't miss the pie auction on Saturday afternoon.\n\nFree admission. Kids' scarecrow building workshop runs both days 10 AM – noon.", featured: false, price: "Free", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80", organizer: "Mahone Bay Community Events", contact: "events@mahonebay.ca", website: "https://mahonebay.ca", accessibility: "Accessible throughout.", tags: ["Family Friendly", "Free Entry", "Crafts", "Shopping"] },
  { id: 19, title: "Tidal Bore Rafting Adventure", category: "outdoors", date: "Jul–Aug (Daily)", month: "jul", day: "Daily", time: "Varies with tides", location: "Shubenacadie River", area: "Bay of Fundy", description: "Ride the famous Fundy tidal bore on a thrilling zodiac adventure. The world's highest tides create a natural rollercoaster.", longDescription: "Twice a day, the Bay of Fundy's legendary tides push a wall of water up the Shubenacadie River, creating a tidal bore that turns the river into a churning, mud-splashing adventure.\n\nBoard a sturdy zodiac and ride the incoming bore wave, surfing standing waves, splashing through rapids, and getting gloriously muddy.\n\nTrips run approximately 2 hours. All safety equipment provided, including wetsuits on cooler days. You will get soaked — that's the whole point.\n\nMinimum age 5 for family rafts, 12 for adventure rafts. Hot showers and changing facilities at the base.", featured: false, price: "$70–$90", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", organizer: "Fundy Tidal Bore Adventures", contact: "book@fundyrafting.ca", website: "https://fundyrafting.ca", accessibility: "Requires mobility to board zodiac.", tags: ["Adventure", "Outdoors", "Tides", "Family Options"] },

  // AUGUST
  { id: 20, title: "Jubilee East Coast Music Festival", category: "music", date: "Jul 31 – Aug 2", month: "aug", day: "Friday–Sunday", time: "Various", location: "New Glasgow", area: "Northumberland Shore", description: "Rising stars perform alongside seasoned musicians in an eclectic mix of rock, blues, folk, and country music.", longDescription: "The Jubilee East Coast Music Festival sets the stage for the region's rising stars to perform alongside seasoned local and international musicians.\n\nThis popular summertime music event offers an eclectic mix of rock, blues, folk, and country music in the heart of New Glasgow. Multiple stages and intimate performance spaces create a festival experience that's both exciting and personal.\n\nBeyond the music, enjoy food vendors, craft beer gardens, and the welcoming atmosphere of the Northumberland Shore.\n\nWeekend passes and single-day tickets available.", featured: true, price: "$40–$120", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80", organizer: "Jubilee Festival Society", contact: "info@thejubilee.ca", website: "https://thejubilee.ca", accessibility: "Main venues are accessible.", tags: ["Multi-Day", "Live Music", "Rock", "Folk"] },
  { id: 21, title: "Festival acadien de Clare", category: "festivals", date: "Aug 2–15", month: "aug", day: "Various", time: "Various", location: "Clare, Baie Sainte-Marie", area: "Acadian Shore", description: "The oldest Acadian festival in the world — two weeks of concerts, art, nature hikes, and the famous Tintamarre noise parade on August 15.", longDescription: "The Festival acadien de Clare is the oldest Acadian festival in the world, where the modern marries with the traditional in a vibrant two-week celebration.\n\nTake in concerts featuring Acadian musicians from across the Maritimes, explore art and quilt expositions, enjoy nature hikes showcasing the beauty of Baie Sainte-Marie, and experience local cuisine at its finest.\n\nThe highlight is the Tintamarre — a joyous noise parade and walk on National Acadian Day, August 15. Participants bang pots, blow horns, and parade through the streets in a celebration of Acadian identity and resilience.\n\nMany events are free. Some concerts and dinners are ticketed.", featured: true, price: "Free–$35", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80", organizer: "Festival acadien de Clare", contact: "info@festivalacadiendeclare.ca", website: "https://festivalacadiendeclare.ca", accessibility: "Most venues accessible. Outdoor events on varied terrain.", tags: ["Acadian Culture", "Multi-Day", "Tintamarre", "Free Events"] },
  { id: 22, title: "Halifax Busker Festival", category: "festivals", date: "Aug 1–6", month: "aug", day: "Saturday–Thursday", time: "12:00 PM – 10:00 PM", location: "Halifax Waterfront", area: "Halifax", description: "Six days of street performers, acrobats, comedians, and magicians transform the Halifax waterfront into a carnival of talent.", longDescription: "The Halifax Busker Festival fills the waterfront with energy and excitement over Nova Scotia's Natal Day long weekend. Hundreds of performances across multiple stages transform the boardwalk into a vibrant hub of entertainment.\n\nStreet performers from around the world bring their acts — acrobats, jugglers, magicians, comedians, fire-eaters, and musicians. The festival is free to attend, with audiences encouraged to tip performers.\n\nIt's a one-of-a-kind summer experience. Grab an ice cream, find a spot on the boardwalk, and let the performers amaze you.\n\nFree admission. Tip the buskers!", featured: true, price: "Free", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", organizer: "Halifax Busker Festival Society", contact: "info@buskers.ca", website: "https://buskers.ca", accessibility: "Waterfront is wheelchair accessible.", tags: ["Free Entry", "Family Friendly", "Street Performers", "Waterfront"] },
  { id: 23, title: "Lunenburg Folk Harbour Festival", category: "music", date: "Aug 6–9", month: "aug", day: "Thursday–Sunday", time: "Various", location: "Old Town Lunenburg", area: "South Shore", description: "Nova Scotia's longest-running folk festival brings the best in traditional and contemporary music to scenic UNESCO Lunenburg.", longDescription: "The Lunenburg Folk Harbour Festival is Nova Scotia's longest-running folk festival, transforming the UNESCO World Heritage town into a celebration of music.\n\nOver 30 artists from across Canada and beyond perform on multiple stages — from the main concert hall to intimate harbour-side sessions just steps from the water.\n\nThe festival features songwriting workshops, instrument circles, a craft fair, and a legendary Saturday night kitchen party. Daytime harbour-side sessions are free.\n\nFestival passes and single-show tickets available. Book accommodation early — Lunenburg fills up fast.", featured: true, price: "$75–$180", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80", organizer: "Lunenburg Folk Harbour Society", contact: "info@folkharbour.com", website: "https://folkharbour.com", accessibility: "Main venues accessible. Some outdoor areas on uneven ground.", tags: ["Folk Music", "Multi-Day", "Workshops", "UNESCO"] },
  { id: 24, title: "Digby Scallop Days", category: "food", date: "Aug 6–9", month: "aug", day: "Thursday–Sunday", time: "Various", location: "Digby Waterfront", area: "Bay of Fundy", description: "The longest-running festival in the Digby area — a celebration of scallops, the fishing industry, and the people who brave the seas.", longDescription: "Digby Scallop Days is one of the longest-running festivals in southwestern Nova Scotia, celebrating the famous Digby scallop and the fishing industry that harvests them.\n\nThe four-day festival features scallop dinners, cooking competitions, live entertainment, a parade, fireworks, and family activities along the beautiful Digby waterfront.\n\nWatch scallop shucking contests, enjoy fresh-off-the-boat scallop dishes prepared every way imaginable, and take in the charm of this historic fishing town on the Bay of Fundy.\n\nMost events are free. Scallop dinners and some events ticketed.", featured: false, price: "Free–$40", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80", organizer: "Digby Scallop Days Society", contact: "info@digbyscallopdays.com", website: "https://digbyscallopdays.com", accessibility: "Waterfront grounds mostly accessible.", tags: ["Seafood", "Family Friendly", "Parade", "Tradition"] },
  { id: 25, title: "Nova Scotia Gem and Mineral Show", category: "family", date: "Aug 21–23", month: "aug", day: "Friday–Sunday", time: "9:00 AM – 5:00 PM", location: "Parrsboro", area: "Bay of Fundy", description: "Explore stunning gems, minerals, and fossils from around the world at this beloved annual show on the Bay of Fundy.", longDescription: "The Nova Scotia Gem and Mineral Show in Parrsboro is a beloved annual event that draws rock hounds, gem enthusiasts, and families from across the Maritimes.\n\nParrsboro sits on the Bay of Fundy shore, an area famous for its geological treasures — amethyst, agate, zeolites, and fossils dating back hundreds of millions of years. The show features vendors, exhibits, educational displays, and guided beach walks to search for your own gems.\n\nKids love the rock identification stations and the chance to find their own treasures on the beach at low tide.\n\nAffordable admission. Family passes available.", featured: false, price: "$10/adult, kids $5", image: "https://images.unsplash.com/photo-1511406361295-0a1ff814a0ce?w=800&q=80", organizer: "Nova Scotia Gem and Mineral Society", contact: "info@novascotiagemshow.com", website: "https://novascotiagemshow.com", accessibility: "Indoor show is accessible. Beach walks on uneven terrain.", tags: ["Family Friendly", "Educational", "Geology", "Beach"] },
  { id: 26, title: "Shore Club 90th Anniversary Season", category: "music", date: "Aug (Various)", month: "aug", day: "Various", time: "Evenings", location: "The Shore Club, Hubbards", area: "South Shore", description: "Nova Scotia's Last Great Dance Hall celebrates 90 years of lobster suppers and live music, featuring the annual Matt Mays concert series.", longDescription: "The Shore Club in Hubbards is marking a major milestone — 90 years of welcoming people for the kind of summer night that feels uniquely Nova Scotian.\n\nKnown as Nova Scotia's Last Great Dance Hall and the home of the Original Lobster Supper, the venue has paired fresh lobster with live music for generations. The 2026 season features the annual Matt Mays concert series and a full lineup of live shows.\n\nDine on a classic lobster supper — a full pound-and-a-half lobster with all the fixings — then dance the night away. It doesn't get more Nova Scotian than this.\n\nDinner and show packages available. Individual event tickets vary.", featured: false, price: "$30–$80", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", organizer: "The Shore Club", contact: "info@theshoreclub.ca", website: "https://theshoreclub.ca", accessibility: "Main hall is accessible. Contact for specific needs.", tags: ["Live Music", "Lobster Supper", "Dance Hall", "Historic"] },
];

const AREA_LIST = [...new Set(EVENTS.map(e => e.area))];

/* ============ HOOKS ============ */
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ============ STYLES ============ */
const pill = (active, isMobile) => ({
  background: active ? "#003366" : "#fff", border: "1px solid",
  borderColor: active ? "#003366" : "rgba(0,51,102,0.12)",
  color: active ? "#fff" : "rgba(0,51,102,0.55)",
  padding: isMobile ? "7px 12px" : "8px 18px",
  fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.68rem" : "0.75rem",
  fontWeight: 500, cursor: "pointer", borderRadius: "100px", transition: "all 0.25s", flexShrink: 0,
});
const inputStyle = (m) => ({ width: "100%", background: "#fff", border: "1px solid rgba(0,51,102,0.12)", borderRadius: "10px", padding: m ? "12px 14px" : "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#003366", outline: "none" });
const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#003366", marginBottom: "6px", display: "block" };

/* ============ HEADER ============ */
function Header({ scrolled, isMobile, onNav, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const s = scrolled || currentPage !== "home";
  const items = [
    { label: "Events", action: () => { setMenuOpen(false); onNav("events"); } },
    { label: "Venues", action: () => { setMenuOpen(false); onNav("venues"); } },
    { label: "Regions", action: () => { setMenuOpen(false); onNav("regions"); } },
  ];
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: s || menuOpen ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: s || menuOpen ? "blur(20px)" : "none", borderBottom: s ? "1px solid rgba(0,51,102,0.08)" : "none", transition: "all 0.4s", padding: s ? "10px 0" : "16px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => onNav("home")} style={{ display: "flex", alignItems: "baseline", gap: "8px", cursor: "pointer" }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "1.25rem" : "1.5rem", fontWeight: 700, color: s || menuOpen ? "#003366" : "#fff", transition: "color 0.4s" }}>what's up</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.55rem" : "0.65rem", fontWeight: 600, color: s || menuOpen ? "#2a7fff" : "rgba(255,255,255,0.8)", letterSpacing: "0.25em", textTransform: "uppercase", transition: "color 0.4s" }}>Nova Scotia</span>
        </div>
        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", padding: "4px 8px", color: s || menuOpen ? "#003366" : "#fff" }}>{menuOpen ? "✕" : "☰"}</button>
        ) : (
          <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {items.map(i => <a key={i.label} onClick={i.action} style={{ color: s ? "rgba(0,51,102,0.5)" : "rgba(255,255,255,0.7)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", transition: "color 0.3s" }}>{i.label}</a>)}
            <button onClick={() => onNav("submit")} style={{ background: s ? "#003366" : "#fff", color: s ? "#fff" : "#003366", border: "none", padding: "9px 22px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", borderRadius: "100px" }}>Submit Event</button>
          </nav>
        )}
      </div>
      {isMobile && menuOpen && (
        <div style={{ background: "#fff", padding: "16px 20px 24px", borderTop: "1px solid rgba(0,51,102,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>
          {items.map(i => <a key={i.label} onClick={i.action} style={{ color: "#003366", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 500, cursor: "pointer" }}>{i.label}</a>)}
          <button onClick={() => { setMenuOpen(false); onNav("submit"); }} style={{ background: "#003366", color: "#fff", border: "none", padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, borderRadius: "100px", cursor: "pointer", width: "100%" }}>Submit Event</button>
        </div>
      )}
    </header>
  );
}

/* ============ HERO ============ */
function Hero({ isMobile, onSearch, onNav }) {
  const [q, setQ] = useState("");
  const go = () => { if (q.trim()) onSearch(q.trim()); };
  return (
    <section style={{ position: "relative", minHeight: isMobile ? "80vh" : "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center 40%", filter: "brightness(0.35)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, rgba(0,30,70,0.85) 0%, rgba(0,51,102,0.7) 40%, rgba(10,80,150,0.5) 70%, rgba(0,40,90,0.8) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, #f4f8fc, transparent)" }} />
      <div style={{ position: "absolute", bottom: "-2px", left: 0, right: 0 }}><svg viewBox="0 0 1440 100" fill="none" style={{ display: "block", width: "100%" }}><path d="M0,60 C320,100 640,20 960,60 C1120,80 1280,50 1440,65 L1440,100 L0,100 Z" fill="#f4f8fc" opacity="0.5"/><path d="M0,75 C360,95 720,55 1080,75 C1260,85 1380,70 1440,75 L1440,100 L0,100 Z" fill="#f4f8fc"/></svg></div>
      {!isMobile && <><div style={{ position: "absolute", top: "12%", right: "6%", width: "400px", height: "400px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", animation: "float 20s ease-in-out infinite" }} /><div style={{ position: "absolute", top: "45%", right: "18%", width: "200px", height: "200px", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "50%", animation: "float 14s ease-in-out infinite reverse" }} /></>}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 24px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.6rem" : "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: isMobile ? "16px" : "24px", display: "flex", alignItems: "center", gap: "14px" }}><span style={{ display: "inline-block", width: "40px", height: "1.5px", background: "rgba(255,255,255,0.5)" }} /> Discover Atlantic Canada</div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "2.5rem" : "clamp(3rem, 6.5vw, 5.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.05, margin: isMobile ? "0 0 20px 0" : "0 0 28px 0", letterSpacing: "-0.03em" }}>What's up in<br /><span style={{ background: "linear-gradient(135deg, #88c8ff, #b8dfff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Nova Scotia</span></h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "1rem" : "1.15rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "520px", margin: isMobile ? "0 0 32px 0" : "0 0 48px 0" }}>From Halifax harbour to the Cabot Trail — find live music, festivals, markets, outdoor adventures, and everything happening across the province.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 5px 5px 18px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "100px", maxWidth: "480px", backdropFilter: "blur(10px)" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>⌕</span>
            <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} type="text" placeholder="Search events, venues, artists..." style={{ background: "none", border: "none", color: "#fff", flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.85rem" : "0.9rem", padding: isMobile ? "10px 6px" : "12px 8px", outline: "none", minWidth: 0 }} />
            <button onClick={go} style={{ background: "#fff", color: "#003366", border: "none", padding: isMobile ? "10px 18px" : "11px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: "100px", whiteSpace: "nowrap" }}>Search</button>
          </div>
          <div style={{ display: "flex", gap: isMobile ? "20px" : "32px", marginTop: isMobile ? "32px" : "52px", fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.7rem" : "0.78rem", color: "rgba(255,255,255,0.4)", flexWrap: "wrap" }}>
            <span onClick={() => onNav("events")} style={{ cursor: "pointer" }}><strong style={{ color: "#fff", fontSize: isMobile ? "1.1rem" : "1.3rem", fontFamily: "'Playfair Display', serif" }}>{EVENTS.length}</strong> events</span>
            <span onClick={() => onNav("venues")} style={{ cursor: "pointer" }}><strong style={{ color: "#fff", fontSize: isMobile ? "1.1rem" : "1.3rem", fontFamily: "'Playfair Display', serif" }}>{VENUES.length}</strong> venues</span>
            <span onClick={() => onNav("regions")} style={{ cursor: "pointer" }}><strong style={{ color: "#fff", fontSize: isMobile ? "1.1rem" : "1.3rem", fontFamily: "'Playfair Display', serif" }}>{REGIONS.length}</strong> regions</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CATEGORY BAR ============ */
function CategoryBar({ active, setActive }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid rgba(0,51,102,0.08)", position: "sticky", top: "52px", zIndex: 90, boxShadow: "0 2px 12px rgba(0,51,102,0.04)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", display: "flex", gap: "2px", overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)} style={{ background: active === c.id ? "rgba(0,51,102,0.06)" : "transparent", border: "none", borderBottom: active === c.id ? "2.5px solid #003366" : "2.5px solid transparent", color: active === c.id ? "#003366" : "rgba(0,51,102,0.4)", padding: "14px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", fontWeight: active === c.id ? 600 : 500, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}><span style={{ fontSize: "0.85rem" }}>{c.icon}</span>{c.label}</button>
        ))}
      </div>
    </div>
  );
}

/* ============ EVENT CARD ============ */
function EventCard({ event, featured, isMobile, onClick }) {
  const [h, setH] = useState(false);
  const [il, setIl] = useState(false);
  const big = featured && !isMobile;
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: "#fff", border: "1px solid", borderColor: h ? "rgba(0,51,102,0.15)" : "rgba(0,51,102,0.06)", cursor: "pointer", transition: "all 0.35s", transform: h ? "translateY(-6px)" : "none", boxShadow: h ? "0 16px 40px rgba(0,51,102,0.12)" : "0 2px 8px rgba(0,51,102,0.04)", display: "flex", flexDirection: "column", borderRadius: "12px", overflow: "hidden" }}>
      <div style={{ height: big ? "260px" : isMobile ? "180px" : "200px", overflow: "hidden", position: "relative", background: "#e8f0f8" }}>
        <img src={event.image} alt={event.title} onLoad={() => setIl(true)} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s, opacity 0.4s", transform: h ? "scale(1.06)" : "scale(1)", opacity: il ? 1 : 0 }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#003366" }}>{event.price}</div>
        <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,51,102,0.85)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>{event.area}</div>
      </div>
      <div style={{ padding: big ? "24px" : isMobile ? "16px" : "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.63rem", fontWeight: 600, color: "#2a7fff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>{CATEGORIES.find(c => c.id === event.category)?.label}</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: big ? "1.45rem" : isMobile ? "1.1rem" : "1.15rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0", lineHeight: 1.25 }}>{event.title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.82rem" : "0.88rem", color: "rgba(0,51,102,0.5)", lineHeight: 1.65, margin: "0 0 14px 0", flex: 1, display: big ? "block" : "-webkit-box", WebkitLineClamp: big ? "none" : 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{event.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "12px", borderTop: "1px solid rgba(0,51,102,0.06)" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg, #e8f1ff, #d4e6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>📅</div>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.78rem" : "0.82rem", color: "#003366", fontWeight: 600, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{event.date} · {event.time}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.7rem" : "0.75rem", color: "rgba(0,51,102,0.4)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ EVENT DETAIL ============ */
function EventDetail({ event, onBack, isMobile, isTablet, onEventClick }) {
  const [il, setIl] = useState(false);
  const related = EVENTS.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);
  return (
    <div>
      <div style={{ position: "sticky", top: "52px", zIndex: 90, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,51,102,0.06)", padding: "12px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}><button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#003366", fontWeight: 500, padding: "4px 0" }}>← Back to Events</button></div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1.4fr 1fr", gap: isMobile ? "24px" : "40px" }}>
          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", height: isMobile ? "240px" : "420px", background: "#e8f0f8", marginBottom: "28px" }}><img src={event.image} alt={event.title} onLoad={() => setIl(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: il ? 1 : 0, transition: "opacity 0.4s" }} /></div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>{event.tags.map(t => <span key={t} style={{ background: "linear-gradient(135deg, #e8f1ff, #dce9fa)", color: "#003366", padding: "6px 16px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}>{t}</span>)}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 600, color: "#2a7fff", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>{CATEGORIES.find(c => c.id === event.category)?.label}</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.6rem", fontWeight: 700, color: "#003366", margin: "0 0 20px 0", lineHeight: 1.15 }}>{event.title}</h1>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(0,51,102,0.6)", lineHeight: 1.8 }}>{event.longDescription.split("\n\n").map((p, i) => <p key={i} style={{ margin: "0 0 18px 0" }}>{p}</p>)}</div>
            <div style={{ background: "#f0f6ff", borderRadius: "12px", padding: "20px 24px", marginTop: "28px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>♿</span>
              <div><div style={{ fontFamily: "'DM Sans'", fontSize: "0.82rem", fontWeight: 600, color: "#003366", marginBottom: "4px" }}>Accessibility</div><div style={{ fontFamily: "'DM Sans'", fontSize: "0.88rem", color: "rgba(0,51,102,0.55)", lineHeight: 1.5 }}>{event.accessibility}</div></div>
            </div>
          </div>
          <div>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,51,102,0.08)", boxShadow: "0 4px 20px rgba(0,51,102,0.06)", padding: "28px", ...(isMobile || isTablet ? {} : { position: "sticky", top: "110px" }) }}>
              <div style={{ background: "linear-gradient(135deg, #003366, #004d99)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Admission</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{event.price}</div>
              </div>
              {[{ icon: "📅", label: "Date", value: `${event.day}, ${event.date}` }, { icon: "🕐", label: "Time", value: event.time }, { icon: "📍", label: "Location", value: event.location }, { icon: "🗺", label: "Region", value: event.area }, { icon: "👤", label: "Organizer", value: event.organizer }, { icon: "✉️", label: "Contact", value: event.contact }].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 0", borderBottom: i < 5 ? "1px solid rgba(0,51,102,0.06)" : "none" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#f0f6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{item.icon}</div>
                  <div><div style={{ fontFamily: "'DM Sans'", fontSize: "0.72rem", color: "rgba(0,51,102,0.4)", fontWeight: 500, marginBottom: "2px" }}>{item.label}</div><div style={{ fontFamily: "'DM Sans'", fontSize: "0.92rem", color: "#003366", fontWeight: 500 }}>{item.value}</div></div>
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
                <button onClick={() => window.open(event.website, "_blank")} style={{ background: "#003366", color: "#fff", border: "none", padding: "16px 24px", borderRadius: "12px", fontFamily: "'DM Sans'", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Visit Website →</button>
                <button onClick={() => { if (navigator.share) navigator.share({ title: event.title, url: window.location.href }); else { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } }} style={{ background: "#f0f6ff", color: "#003366", border: "none", padding: "14px 24px", borderRadius: "12px", fontFamily: "'DM Sans'", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>Share Event</button>
              </div>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.4rem" : "1.8rem", fontWeight: 700, color: "#003366", margin: "0 0 24px 0" }}>More {CATEGORIES.find(c => c.id === event.category)?.label}</h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "20px" }}>{related.map(e => <EventCard key={e.id} event={e} featured={false} isMobile={isMobile} onClick={() => onEventClick(e)} />)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ VENUES PAGE (FILTERABLE) ============ */
function VenuesPage({ isMobile, isTablet }) {
  const [areaFilter, setAreaFilter] = useState("All Areas");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const venueAreas = ["All Areas", ...new Set(VENUES.map(v => v.area))];
  const filtered = VENUES.filter(v => {
    const a = areaFilter === "All Areas" || v.area === areaFilter;
    const t = typeFilter === "All Types" || v.type === typeFilter;
    return a && t;
  });
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.4rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0" }}>Venues</h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: "0.95rem", color: "rgba(0,51,102,0.45)", margin: "0 0 24px 0" }}>{filtered.length} of {VENUES.length} venues</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "0.72rem", fontWeight: 600, color: "#003366", padding: "8px 0", marginRight: "4px" }}>Region:</span>
          {venueAreas.map(a => <button key={a} onClick={() => setAreaFilter(a)} style={pill(areaFilter === a, isMobile)}>{a}</button>)}
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "0.72rem", fontWeight: 600, color: "#003366", padding: "8px 0", marginRight: "4px" }}>Type:</span>
          {VENUE_TYPES.filter(t => t === "All Types" || VENUES.some(v => v.type === t)).map(t => <button key={t} onClick={() => setTypeFilter(t)} style={pill(typeFilter === t, isMobile)}>{t}</button>)}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "20px" }}>
        {filtered.map((v, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,51,102,0.06)", padding: "24px", boxShadow: "0 2px 8px rgba(0,51,102,0.04)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#003366", margin: "0 0 10px 0" }}>{v.name}</h3>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              <span style={{ background: "#e8f1ff", color: "#003366", padding: "4px 12px", borderRadius: "100px", fontFamily: "'DM Sans'", fontSize: "0.68rem", fontWeight: 600 }}>{v.type}</span>
              <span style={{ background: "rgba(0,51,102,0.06)", color: "rgba(0,51,102,0.6)", padding: "4px 12px", borderRadius: "100px", fontFamily: "'DM Sans'", fontSize: "0.68rem", fontWeight: 500 }}>{v.area}</span>
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "0.88rem", color: "rgba(0,51,102,0.5)", lineHeight: 1.6, margin: 0 }}>{v.description}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 0" }}><p style={{ fontFamily: "'DM Sans'", color: "rgba(0,51,102,0.4)" }}>No venues match your filters.</p></div>}
    </div>
  );
}

/* ============ REGIONS PAGE ============ */
function RegionsPage({ isMobile, isTablet, onSelectRegion }) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.4rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0" }}>Regions of Nova Scotia</h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: "0.95rem", color: "rgba(0,51,102,0.45)", margin: "0 0 32px 0" }}>Explore {REGIONS.length} unique regions</p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "20px" }}>
        {REGIONS.map(r => {
          const count = EVENTS.filter(e => e.area === r.id).length;
          return (
            <div key={r.id} onClick={() => onSelectRegion(r.id)} style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,51,102,0.06)", padding: "28px", boxShadow: "0 2px 8px rgba(0,51,102,0.04)", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,51,102,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,51,102,0.04)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#003366", margin: 0 }}>{r.name}</h3>
                <span style={{ background: "#e8f1ff", color: "#003366", padding: "4px 14px", borderRadius: "100px", fontFamily: "'DM Sans'", fontSize: "0.72rem", fontWeight: 600 }}>{count} event{count !== 1 ? "s" : ""}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "rgba(0,51,102,0.5)", lineHeight: 1.7, margin: "0 0 16px 0" }}>{r.blurb}</p>
              <span style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", fontWeight: 600, color: "#2a7fff" }}>Explore events →</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ SUBMIT PAGE ============ */
function SubmitPage({ isMobile, onBack }) {
  const [form, setForm] = useState({ name: "", venue: "", date: "", startTime: "", endTime: "", location: "", area: "", category: "", price: "", description: "", organizer: "", contact: "", website: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  if (submitted) return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: isMobile ? "60px 20px" : "80px 24px", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎉</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#003366", margin: "0 0 12px 0" }}>Event Submitted!</h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: "1rem", color: "rgba(0,51,102,0.5)", margin: "0 0 32px 0" }}>Thank you! Our team will review it shortly.</p>
      <button onClick={onBack} style={{ background: "#003366", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "100px", fontFamily: "'DM Sans'", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Back to Events</button>
    </div>
  );
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.2rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0" }}>Submit an Event</h1>
      <p style={{ fontFamily: "'DM Sans'", fontSize: "0.95rem", color: "rgba(0,51,102,0.45)", margin: "0 0 36px 0" }}>Share your event with the Nova Scotia community.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Event Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Halifax Jazz Festival" style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>Venue Name *</label><input value={form.venue} onChange={e => set("venue", e.target.value)} placeholder="e.g. The Carleton" style={inputStyle(isMobile)} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Date(s) *</label><input value={form.date} onChange={e => set("date", e.target.value)} type="date" style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>Start Time *</label><input value={form.startTime} onChange={e => set("startTime", e.target.value)} type="time" style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>End Time</label><input value={form.endTime} onChange={e => set("endTime", e.target.value)} type="time" style={inputStyle(isMobile)} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Full Address *</label><input value={form.location} onChange={e => set("location", e.target.value)} placeholder="e.g. 1685 Argyle St, Halifax" style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>Region *</label><select value={form.area} onChange={e => set("area", e.target.value)} style={{ ...inputStyle(isMobile), appearance: "auto" }}><option value="">Select</option>{REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Category *</label><select value={form.category} onChange={e => set("category", e.target.value)} style={{ ...inputStyle(isMobile), appearance: "auto" }}><option value="">Select</option>{CATEGORIES.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
          <div><label style={labelStyle}>Price</label><input value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. $25 or Free" style={inputStyle(isMobile)} /></div>
        </div>
        <div><label style={labelStyle}>Description *</label><textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Tell people about your event..." rows={5} style={{ ...inputStyle(isMobile), resize: "vertical", fontFamily: "'DM Sans'" }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Organizer</label><input value={form.organizer} onChange={e => set("organizer", e.target.value)} style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>Email</label><input value={form.contact} onChange={e => set("contact", e.target.value)} type="email" style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>Website</label><input value={form.website} onChange={e => set("website", e.target.value)} type="url" style={inputStyle(isMobile)} /></div>
        </div>
        <button onClick={() => { if (form.name && form.venue && form.date && form.startTime && form.location && form.area && form.category && form.description) setSubmitted(true); else alert("Please fill in all required fields *"); }} style={{ background: "#003366", color: "#fff", border: "none", padding: "16px 32px", borderRadius: "12px", fontFamily: "'DM Sans'", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", marginTop: "8px", alignSelf: "flex-start" }}>Submit Event</button>
      </div>
    </div>
  );
}

/* ============ NEWSLETTER ============ */
function Newsletter({ isMobile }) {
  return (
    <section style={{ background: "linear-gradient(135deg, #003366, #004d99)", borderRadius: isMobile ? "12px" : "16px", padding: isMobile ? "40px 24px" : "64px 56px", textAlign: "center", margin: "60px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)", backgroundSize: "30px 30px" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: "0.65rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>Stay in the loop</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 700, color: "#fff", margin: "0 0 12px 0" }}>Never miss what's happening</h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: "0.92rem", color: "rgba(255,255,255,0.55)", maxWidth: "440px", margin: "0 auto 28px", lineHeight: 1.6 }}>Weekly picks and hidden gems — straight to your inbox every Thursday.</p>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "8px", maxWidth: "440px", margin: "0 auto", background: isMobile ? "transparent" : "rgba(255,255,255,0.1)", padding: isMobile ? "0" : "5px", borderRadius: "100px", border: isMobile ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
          <input type="email" placeholder="your@email.com" style={{ background: isMobile ? "rgba(255,255,255,0.1)" : "none", border: isMobile ? "1px solid rgba(255,255,255,0.15)" : "none", color: "#fff", flex: 1, fontFamily: "'DM Sans'", fontSize: "0.88rem", padding: isMobile ? "14px 18px" : "12px 18px", outline: "none", borderRadius: isMobile ? "100px" : "0" }} />
          <button style={{ background: "#fff", color: "#003366", border: "none", padding: isMobile ? "14px 32px" : "12px 32px", fontFamily: "'DM Sans'", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: "100px" }}>Subscribe</button>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer({ isMobile, onNav }) {
  return (
    <footer style={{ background: "#003366", padding: isMobile ? "40px 0 32px" : "56px 0 40px", marginTop: "40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? "32px" : "48px", marginBottom: isMobile ? "32px" : "48px" }}>
          <div>
            <div onClick={() => onNav("home")} style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "14px", cursor: "pointer" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>what's up</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: "0.6rem", fontWeight: 600, color: "#88c8ff", letterSpacing: "0.25em", textTransform: "uppercase" }}>Nova Scotia</span>
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "280px" }}>Your guide to events, experiences, and adventures across Nova Scotia.</p>
          </div>
          {[
            { title: "Explore", links: [{ l: "Events", a: "events" }, { l: "Venues", a: "venues" }, { l: "Regions", a: "regions" }] },
            { title: "Regions", links: REGIONS.slice(0, 4).map(r => ({ l: r.name, a: "region:" + r.id })) },
            { title: "Connect", links: [{ l: "Submit Event", a: "submit" }] }
          ].map(s => (
            <div key={s.title}>
              <h4 style={{ fontFamily: "'DM Sans'", fontSize: "0.65rem", fontWeight: 600, color: "#88c8ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>{s.title}</h4>
              <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", flexWrap: "wrap", gap: isMobile ? "8px 16px" : "12px" }}>
                {s.links.map(lnk => <a key={lnk.l} onClick={() => { if (lnk.a.startsWith("region:")) onNav("home", lnk.a.split(":")[1]); else onNav(lnk.a); }} style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "'DM Sans'", fontSize: "0.84rem", cursor: "pointer" }}>{lnk.l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: "8px" }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>© 2026 What's Up Nova Scotia</span>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "0.72rem", color: "rgba(255,255,255,0.18)" }}>Built on the unceded territory of the Mi'kmaq people</span>
        </div>
      </div>
    </footer>
  );
}

/* ============ MAIN APP ============ */
export default function App() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState("All Areas");
  const [month, setMonth] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsRef = useRef(null);
  const width = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet"; document.head.appendChild(link);
    let meta = document.querySelector("meta[name=viewport]");
    if (!meta) { meta = document.createElement("meta"); meta.name = "viewport"; document.head.appendChild(meta); }
    meta.content = "width=device-width, initial-scale=1";
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleNav = (target, regionId) => {
    if (target === "home") { setPage("home"); setSelectedEvent(null); setSearchQuery(""); if (regionId) setArea(regionId); else setArea("All Areas"); window.scrollTo(0, 0); }
    else if (target === "events") { setPage("home"); setSelectedEvent(null); setSearchQuery(""); setTimeout(() => eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); }
    else if (target === "venues") { setPage("venues"); setSelectedEvent(null); window.scrollTo(0, 0); }
    else if (target === "regions") { setPage("regions"); setSelectedEvent(null); window.scrollTo(0, 0); }
    else if (target === "submit") { setPage("submit"); setSelectedEvent(null); window.scrollTo(0, 0); }
  };

  const handleSearch = (q) => { setSearchQuery(q); setPage("home"); setSelectedEvent(null); setCategory("all"); setArea("All Areas"); setMonth("all"); setTimeout(() => eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
  };

  const filtered = EVENTS.filter(e => {
    const catM = category === "all" || e.category === category;
    const areaM = area === "All Areas" || e.area === area;
    const monthM = month === "all" || e.month === month;
    const searchM = !searchQuery || [e.title, e.description, e.location, e.area, e.tags.join(" "), e.organizer, CATEGORIES.find(c => c.id === e.category)?.label].join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    return catM && areaM && monthM && searchM;
  });

  const featuredEvents = filtered.filter(e => e.featured);
  const regularEvents = filtered.filter(e => !e.featured);
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  return (
    <div style={{ background: "#f4f8fc", minHeight: "100vh" }}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px) rotate(1.5deg); } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        ::placeholder { color: rgba(0,51,102,0.3); }
        html { scroll-behavior: smooth; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: rgba(0,51,102,0.3) !important; }
      `}</style>

      <Header scrolled={scrolled} isMobile={isMobile} onNav={handleNav} currentPage={page} />

      {page === "home" && selectedEvent && (
        <div style={{ paddingTop: "52px" }}>
          <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} isMobile={isMobile} isTablet={isTablet} onEventClick={handleEventClick} />
          <Footer isMobile={isMobile} onNav={handleNav} />
        </div>
      )}

      {page === "home" && !selectedEvent && (
        <>
          <Hero isMobile={isMobile} onSearch={handleSearch} onNav={handleNav} />
          <CategoryBar active={category} setActive={c => { setCategory(c); setSearchQuery(""); }} />
          <main style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "28px 16px" : "40px 24px" }}>
            <div ref={eventsRef} style={{ scrollMarginTop: "120px" }} />
            {searchQuery && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", padding: "14px 20px", background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,51,102,0.06)", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "rgba(0,51,102,0.6)" }}>Results for "<strong style={{ color: "#003366" }}>{searchQuery}</strong>"</span>
                <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: "0.82rem", color: "#2a7fff", fontWeight: 500, marginLeft: "auto" }}>Clear</button>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: "28px", gap: "16px" }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.5rem" : "1.8rem", fontWeight: 700, color: "#003366", margin: "0 0 4px 0" }}>{category === "all" ? "All Events" : CATEGORIES.find(c => c.id === category)?.label}</h2>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(0,51,102,0.4)" }}>{filtered.length} event{filtered.length !== 1 ? "s" : ""} found</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: isMobile ? "flex-start" : "flex-end" }}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>{MONTHS.map(m => <button key={m.id} onClick={() => setMonth(m.id)} style={pill(month === m.id, isMobile)}>{m.label}</button>)}</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>{["All Areas", ...AREA_LIST].map(a => <button key={a} onClick={() => setArea(a)} style={pill(area === a, isMobile)}>{a}</button>)}</div>
              </div>
            </div>
            {featuredEvents.length > 0 && <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "16px" : "24px", marginBottom: isMobile ? "16px" : "24px" }}>{featuredEvents.map(e => <EventCard key={e.id} event={e} featured isMobile={isMobile} onClick={() => handleEventClick(e)} />)}</div>}
            {regularEvents.length > 0 && <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? "16px" : "24px" }}>{regularEvents.map(e => <EventCard key={e.id} event={e} featured={false} isMobile={isMobile} onClick={() => handleEventClick(e)} />)}</div>}
            {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px 0" }}><div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.4 }}>⛵</div><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "rgba(0,51,102,0.45)", marginBottom: "8px" }}>No events found</h3><p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "rgba(0,51,102,0.3)" }}>Try adjusting your filters.</p></div>}
            <Newsletter isMobile={isMobile} />
          </main>
          <Footer isMobile={isMobile} onNav={handleNav} />
        </>
      )}

      {page === "venues" && <div style={{ paddingTop: "52px" }}><VenuesPage isMobile={isMobile} isTablet={isTablet} /><Footer isMobile={isMobile} onNav={handleNav} /></div>}
      {page === "regions" && <div style={{ paddingTop: "52px" }}><RegionsPage isMobile={isMobile} isTablet={isTablet} onSelectRegion={r => { handleNav("home", r); setTimeout(() => eventsRef.current?.scrollIntoView({ behavior: "smooth" }), 200); }} /><Footer isMobile={isMobile} onNav={handleNav} /></div>}
      {page === "submit" && <div style={{ paddingTop: "52px" }}><SubmitPage isMobile={isMobile} onBack={() => handleNav("home")} /><Footer isMobile={isMobile} onNav={handleNav} /></div>}
    </div>
  );
}
