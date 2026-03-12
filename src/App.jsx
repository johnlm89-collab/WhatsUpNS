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
];

const REGIONS = [
  { id: "Halifax", name: "Halifax", blurb: "Nova Scotia's vibrant capital city blends urban energy with coastal charm. Home to a world-class waterfront boardwalk, a thriving food and music scene, and over 250 years of maritime history. From craft breweries on the harbour to live Celtic music in downtown pubs, Halifax is where tradition meets innovation." },
  { id: "South Shore", name: "South Shore", blurb: "A stunning stretch of coastline from Peggy's Cove to Shelburne, dotted with colourful fishing villages, lighthouses, and UNESCO World Heritage Lunenburg. The South Shore is known for its artisan communities, pristine beaches, and some of the best sailing waters in Atlantic Canada." },
  { id: "Cape Breton", name: "Cape Breton", blurb: "An island of dramatic highlands, Celtic culture, and the world-famous Cabot Trail. Cape Breton's rugged beauty, Gaelic traditions, and warm hospitality have earned it recognition as one of the top island destinations on the planet. Come for the scenery, stay for the kitchen parties." },
  { id: "Bay of Fundy", name: "Bay of Fundy", blurb: "Home to the highest tides on Earth, the Bay of Fundy is a natural wonder that reshapes the coastline twice daily. Explore sea caves at low tide, ride the tidal bore, spot whales, and feast on the freshest seafood you'll ever taste. A UNESCO Biosphere Reserve of incredible ecological diversity." },
  { id: "Annapolis Valley", name: "Annapolis Valley", blurb: "Nova Scotia's agricultural heartland and wine country, nestled between the North and South Mountains. The Valley is famous for its award-winning wineries, apple orchards, farm-to-table dining, and charming university town of Wolfville. A four-season destination for food and nature lovers." },
  { id: "Acadian Shore", name: "Acadian Shore", blurb: "The vibrant heart of Nova Scotia's Acadian culture stretches along the southwestern coast. Rich in French-Acadian heritage, this region celebrates its history through music, cuisine (don't miss the rappie pie!), and colourful festivals. The warmth of Acadian hospitality is legendary." },
  { id: "Northumberland Shore", name: "Northumberland Shore", blurb: "Nova Scotia's warmest beaches line the Northumberland Strait, with sandy shores and water temperatures that rival the Carolinas in summer. Charming towns like Pictou and Pugwash offer Scottish heritage, lobster suppers, and a slower pace of life." },
  { id: "Eastern Shore", name: "Eastern Shore", blurb: "One of Nova Scotia's best-kept secrets — a wild, unspoiled coastline of rugged headlands, secluded beaches, and tiny fishing communities. Paddle pristine waterways, hike coastal trails, and experience authentic Maritime culture far from the crowds." },
];

const VENUES = [
  { name: "The Carleton", type: "Music Venue", area: "Halifax", description: "Halifax's premier intimate live music room, hosting local and touring artists in a warm, welcoming atmosphere. Full bar and kitchen." },
  { name: "Neptune Theatre", type: "Performing Arts", area: "Halifax", description: "Atlantic Canada's largest professional theatre, presenting world-class productions in the heart of downtown Halifax since 1963." },
  { name: "Bishop's Landing", type: "Outdoor Venue", area: "Halifax", description: "A waterfront gathering space on the Halifax boardwalk, hosting markets, festivals, and community events year-round." },
  { name: "Halifax Forum", type: "Multi-Purpose Arena", area: "Halifax", description: "A versatile community arena hosting concerts, trade shows, sporting events, and large-scale gatherings." },
  { name: "The Marquee Ballroom", type: "Music Venue", area: "Halifax", description: "A legendary Halifax nightclub and concert venue known for hosting breakthrough indie, rock, and electronic acts." },
  { name: "Lunenburg School of the Arts", type: "Arts Centre", area: "South Shore", description: "A creative hub in UNESCO Lunenburg offering workshops, exhibitions, and performances in a beautifully restored heritage building." },
  { name: "Mahone Bay Centre", type: "Community Centre", area: "South Shore", description: "The heart of Mahone Bay's community life, hosting craft fairs, concerts, and seasonal events overlooking the famous three churches." },
  { name: "Highland Arts Theatre", type: "Performing Arts", area: "Cape Breton", description: "A beautifully restored 1930s cinema in downtown Sydney, now one of Cape Breton's top venues for theatre, music, and film." },
  { name: "Gaelic College", type: "Cultural Centre", area: "Cape Breton", description: "The only institution in North America dedicated to the study of Scottish Gaelic language and culture. Hosts concerts, ceilidhs, and workshops." },
  { name: "Hall's Harbour Lobster Pound", type: "Restaurant & Venue", area: "Bay of Fundy", description: "An iconic seaside lobster restaurant overlooking one of the Bay of Fundy's most photogenic harbours." },
  { name: "Lightfoot & Wolfville Vineyards", type: "Winery", area: "Annapolis Valley", description: "A stunning hilltop winery offering tastings, vineyard tours, and events with panoramic views of the Annapolis Valley." },
  { name: "La Cuisine Robicheau", type: "Cooking School", area: "Acadian Shore", description: "A family-run Acadian cooking school in Clare, offering hands-on workshops in traditional Maritime cuisine." },
  { name: "Pictou Lodge", type: "Resort & Venue", area: "Northumberland Shore", description: "A waterfront lodge on the Northumberland Strait hosting retreats, weddings, and seasonal events surrounded by nature." },
  { name: "Memory Lane Heritage Village", type: "Museum & Venue", area: "Eastern Shore", description: "A living history village in Lake Charlotte that brings Nova Scotia's rural past to life through interactive exhibits and seasonal events." },
];

const MONTHS = [
  { id: "all", label: "All Months" },
  { id: "mar", label: "March" },
  { id: "apr", label: "April" },
  { id: "may", label: "May" },
  { id: "jun", label: "June" },
  { id: "jul", label: "July" },
  { id: "aug", label: "August" },
  { id: "sep", label: "September" },
];

const EVENTS = [
  {
    id: 1, title: "Halifax Waterfront Night Market", category: "markets",
    date: "Mar 14", month: "mar", day: "Saturday", time: "5:00 PM – 10:00 PM",
    location: "Bishop's Landing, Halifax", area: "Halifax",
    description: "Local artisans, street food, and live music along the waterfront. Over 60 vendors featuring Nova Scotia crafts, seafood, and baked goods.",
    longDescription: "The Halifax Waterfront Night Market returns to Bishop's Landing for another spectacular evening of local culture. Stroll along the boardwalk and browse over 60 vendors showcasing handmade Nova Scotia crafts, jewellery, pottery, and textiles.\n\nThe food lineup features some of Halifax's best street food vendors, with everything from fresh lobster rolls and fish tacos to wood-fired pizza and artisan donuts. Local breweries and wineries will be pouring tastings throughout the evening.\n\nLive music kicks off at 6 PM with a rotating lineup of Atlantic Canadian artists on the waterfront stage. Bring the whole family — there's a dedicated kids' area with face painting and crafts.\n\nFree parking is available at the waterfront lot after 5 PM. The market runs rain or shine, with covered areas throughout.",
    featured: true, price: "Free",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
    organizer: "Halifax Waterfront Development Corp", contact: "info@halifaxwaterfront.ca",
    website: "https://halifaxwaterfront.ca",
    accessibility: "Wheelchair accessible. Service animals welcome.",
    tags: ["Family Friendly", "Free Entry", "Food", "Live Music", "Shopping"]
  },
  {
    id: 2, title: "Celtic Colours After-Party: The Barra MacNeils", category: "music",
    date: "Mar 15", month: "mar", day: "Sunday", time: "8:00 PM",
    location: "The Carleton, Halifax", area: "Halifax",
    description: "Cape Breton's beloved family band brings their signature blend of Celtic, folk, and pop to an intimate venue.",
    longDescription: "The Barra MacNeils have been one of Cape Breton's most treasured musical families for over three decades. This intimate after-party show at The Carleton brings their electrifying Celtic sound to one of Halifax's best live music rooms.\n\nExpect a mix of traditional Cape Breton fiddle tunes, original compositions, and crowd-pleasing covers that have made them festival favourites worldwide. With multiple vocalists and multi-instrumentalists, every show is a dynamic, joyful experience.\n\nThe Carleton's cozy atmosphere makes this a rare chance to see the band up close. Full bar and kitchen available. Doors open at 7 PM, show starts at 8 PM.\n\nThis is a 19+ event. Early ticket purchase is strongly recommended as The Carleton shows sell out quickly.",
    featured: true, price: "$35",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
    organizer: "The Carleton Music Bar & Grill", contact: "booking@thecarleton.ca",
    website: "https://thecarleton.ca",
    accessibility: "Main floor accessible. Contact venue for specific needs.",
    tags: ["19+", "Live Music", "Celtic", "Indoor"]
  },
  {
    id: 3, title: "Lobster Supper at Hall's Harbour", category: "food",
    date: "Mar 14", month: "mar", day: "Saturday", time: "12:00 PM – 8:00 PM",
    location: "Hall's Harbour Lobster Pound", area: "Bay of Fundy",
    description: "Fresh-off-the-boat lobster with all the fixings. Watch the famous Fundy tides roll in while you dine at picnic tables overlooking the wharf.",
    longDescription: "There's nothing quite like a lobster supper on the Bay of Fundy. Hall's Harbour Lobster Pound has been serving the freshest lobster in Nova Scotia for decades, pulled straight from the cold Atlantic waters just steps from your table.\n\nChoose your lobster from the pound and watch it being prepared while you take in the stunning views of the harbour. The full supper includes fresh-cooked lobster, homemade coleslaw, rolls, corn on the cob, and your choice of dessert.\n\nHall's Harbour is also one of the best places to witness the Bay of Fundy's legendary tides. At low tide, fishing boats rest on the ocean floor — a surreal sight that draws photographers from around the world.\n\nNo reservations needed. Arrive early on weekends to avoid the rush.",
    featured: true, price: "$40–$65",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80",
    organizer: "Hall's Harbour Lobster Pound", contact: "info@hallsharbourlobster.com",
    website: "https://hallsharbourlobster.com",
    accessibility: "Partially accessible. Uneven terrain near wharf.",
    tags: ["Family Friendly", "Seafood", "Outdoor Dining", "Scenic"]
  },
  {
    id: 4, title: "Peggy's Cove Sunrise Yoga", category: "outdoors",
    date: "Mar 15", month: "mar", day: "Sunday", time: "6:00 AM",
    location: "Peggy's Cove", area: "South Shore",
    description: "Greet the dawn with a guided yoga session on the iconic granite rocks. All levels welcome. Bring a mat and layers.",
    longDescription: "Start your Sunday with one of the most unforgettable yoga experiences in Atlantic Canada. As the sun rises over the Atlantic, you'll flow through a gentle 75-minute yoga class on the smooth granite rocks of Peggy's Cove.\n\nLed by certified instructor Sarah Morrison, this all-levels class combines gentle vinyasa flow with breathwork and meditation. The sound of the ocean and the changing colours of the sunrise create a naturally immersive experience.\n\nWhat to bring: yoga mat, warm layers (it's cool at dawn!), water bottle, and a sense of adventure. We'll meet at the main parking lot at 5:45 AM and walk to our spot together.\n\nLight refreshments and hot tea are provided after the session. Space is limited to 20 participants.",
    featured: false, price: "$20",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    organizer: "East Coast Wellness Co.", contact: "hello@eastcoastwellness.ca",
    website: "https://eastcoastwellness.ca",
    accessibility: "Uneven rocky terrain. Not wheelchair accessible.",
    tags: ["Wellness", "Outdoors", "Sunrise", "All Levels"]
  },
  {
    id: 5, title: "Annapolis Valley Wine & Art Walk", category: "arts",
    date: "Apr 21", month: "apr", day: "Saturday", time: "1:00 PM – 5:00 PM",
    location: "Wolfville", area: "Annapolis Valley",
    description: "Stroll through Wolfville galleries with tastings from five local wineries. Meet the artists and winemakers behind the Valley's creative spirit.",
    longDescription: "The Annapolis Valley Wine & Art Walk is an afternoon celebration of two things the Valley does best: world-class wine and vibrant visual art.\n\nYour self-guided tour takes you through five Wolfville galleries, each paired with a local winery pouring their latest releases. Sip Tidal Bay alongside contemporary paintings, sample reserve reds while browsing sculpture, and discover emerging Nova Scotia artists in intimate gallery settings.\n\nParticipating wineries include Luckett Vineyards, Benjamin Bridge, Lightfoot & Wolfville, Blomidon Estate, and Domaine de Grand Pré.\n\nYour ticket includes a souvenir wine glass, a tasting passport, and access to all five locations. A shuttle runs between stops every 20 minutes.",
    featured: true, price: "$45",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80",
    organizer: "Wolfville Arts Council", contact: "events@wolfvillearts.ca",
    website: "https://wolfvillearts.ca",
    accessibility: "Most galleries are wheelchair accessible.",
    tags: ["Wine Tasting", "Art", "Self-Guided", "19+"]
  },
  {
    id: 6, title: "Lunenburg Folk Harbour Festival", category: "festivals",
    date: "Apr 18–20", month: "apr", day: "Friday–Sunday", time: "All Day",
    location: "Old Town Lunenburg", area: "South Shore",
    description: "Three days of folk, roots, and world music in the UNESCO World Heritage town. Workshops, concerts, and harbour-side sessions.",
    longDescription: "The Lunenburg Folk Harbour Festival transforms this UNESCO World Heritage town into a three-day celebration of folk, roots, and world music.\n\nOver 30 artists from across Canada and beyond perform on multiple stages throughout the town — from the main concert hall to intimate harbour-side sessions where musicians play just steps from the water.\n\nBeyond the concerts, the festival features songwriting workshops, instrument circles, a craft fair, and a legendary Saturday night kitchen party. The daytime harbour-side sessions are free and open to all.\n\nFestival passes give you access to all ticketed performances. Single-show tickets also available.",
    featured: true, price: "$75–$180",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    organizer: "Lunenburg Folk Harbour Society", contact: "info@folkharbour.com",
    website: "https://folkharbour.com",
    accessibility: "Main venues accessible. Some outdoor venues on uneven ground.",
    tags: ["Multi-Day", "Live Music", "Folk", "Workshops", "Family Friendly"]
  },
  {
    id: 7, title: "Cape Breton Highlands Trail Run", category: "outdoors",
    date: "May 10", month: "may", day: "Sunday", time: "8:00 AM",
    location: "Cabot Trail, Ingonish", area: "Cape Breton",
    description: "A challenging 15km trail run through some of Atlantic Canada's most dramatic coastal scenery. Routes for all skill levels.",
    longDescription: "Lace up and take on one of the most scenic trail runs in Eastern Canada. The Cape Breton Highlands Trail Run follows a spectacular 15km route through Cape Breton Highlands National Park, with ocean views, forested switchbacks, and rolling highland terrain.\n\nThree route options are available: the full 15km challenge route with 600m elevation gain, a 10km intermediate route, and a 5km introductory route perfect for beginners.\n\nAid stations are positioned every 3km with water, electrolytes, and snacks. A post-race celebration includes a hot chowder lunch, awards ceremony, and live music.\n\nRegistration includes race bib, chip timing, course support, post-race meal, and a finisher's medal.",
    featured: false, price: "$50",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    organizer: "Cape Breton Trail Running Club", contact: "run@cbtrailrunning.ca",
    website: "https://cbtrailrunning.ca",
    accessibility: "Trails are not wheelchair accessible.",
    tags: ["Running", "Outdoors", "National Park", "All Levels"]
  },
  {
    id: 8, title: "Family Lighthouse Tour", category: "family",
    date: "May 18", month: "may", day: "Sunday", time: "10:00 AM – 2:00 PM",
    location: "Sambro Island Lighthouse", area: "Halifax",
    description: "Visit the oldest surviving lighthouse in North America. Guided tour with maritime history, crafts for kids, and chowder lunch.",
    longDescription: "Step back in time and visit the oldest surviving lighthouse in North America. The Sambro Island Lighthouse has been guiding ships safely into Halifax harbour since 1758, and this special family tour brings its remarkable history to life.\n\nThe guided tour covers the lighthouse's fascinating past, from its role in the age of sail to its importance during both World Wars. Kids will love the hands-on activities, including a maritime craft station, a mini scavenger hunt, and the chance to blow a real foghorn.\n\nA hearty seafood chowder lunch is included, served in the keeper's cottage with views of the open Atlantic.\n\nThe tour departs by boat from the Sambro wharf at 10 AM sharp. Dress warmly and wear sturdy shoes.",
    featured: false, price: "$15/adult, kids free",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    organizer: "Nova Scotia Lighthouse Preservation Society", contact: "tours@nslighthouse.ca",
    website: "https://nslighthouse.ca",
    accessibility: "Boat transfer required. Lighthouse has steep stairs.",
    tags: ["Family Friendly", "History", "Boat Tour", "Kids Free"]
  },
  {
    id: 9, title: "Acadian Kitchen: Rappie Pie Workshop", category: "food",
    date: "Jun 7", month: "jun", day: "Saturday", time: "2:00 PM – 5:00 PM",
    location: "La Cuisine Robicheau, Clare", area: "Acadian Shore",
    description: "Learn to make traditional Acadian rappie pie from scratch. Take home your creation and a piece of living culinary history.",
    longDescription: "Rappie pie (pâté à la rapure) is one of Nova Scotia's most iconic Acadian dishes — and this hands-on workshop teaches you how to make it the traditional way.\n\nJoin chef Marie-Claire Robicheau in her family kitchen in Clare, the heart of Nova Scotia's Acadian community. You'll learn the full process: grating the potatoes, extracting the starch, layering the chicken, and baking it to golden perfection.\n\nMarie-Claire shares stories of Acadian food traditions passed down through generations. You'll sit down to enjoy your creation together, accompanied by homemade bread and molasses cookies.\n\nEach participant takes home a full rappie pie, a printed recipe card, and a jar of Marie-Claire's signature chicken broth.",
    featured: false, price: "$55",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    organizer: "La Cuisine Robicheau", contact: "marieclair@lacuisinerobicheau.ca",
    website: "https://lacuisinerobicheau.ca",
    accessibility: "Ground floor kitchen. Wheelchair accessible.",
    tags: ["Cooking Class", "Acadian Culture", "Hands-On", "Take Home"]
  },
  {
    id: 10, title: "Halifax Comedy Fest: Opening Night", category: "arts",
    date: "Jun 14", month: "jun", day: "Saturday", time: "9:00 PM",
    location: "Neptune Theatre, Halifax", area: "Halifax",
    description: "Kick off a week of laughs with a stacked lineup of Canadian comedians at Halifax's premier performing arts venue.",
    longDescription: "The Halifax Comedy Fest returns to Neptune Theatre with an opening night lineup that's guaranteed to leave you in stitches. Five of Canada's funniest comedians take the stage for an evening of stand-up.\n\nThis year's opening night features a mix of established headliners and rising stars from the Canadian comedy scene.\n\nNeptune Theatre's gorgeous main stage provides the perfect backdrop for a night out. The venue's bar opens at 8 PM, and the show kicks off at 9 PM sharp. Expect roughly two hours of comedy with a brief intermission.\n\nThis is a 19+ event. The comedy fest runs all week with shows at various Halifax venues.",
    featured: false, price: "$30–$60",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    organizer: "Halifax Comedy Festival Society", contact: "laughs@halifaxcomedyfest.ca",
    website: "https://halifaxcomedyfest.ca",
    accessibility: "Neptune Theatre is fully wheelchair accessible.",
    tags: ["19+", "Comedy", "Stand-Up", "Indoor"]
  },
  {
    id: 11, title: "Mahone Bay Scarecrow & Craft Fair", category: "markets",
    date: "Jul 12–13", month: "jul", day: "Saturday–Sunday", time: "9:00 AM – 4:00 PM",
    location: "Mahone Bay Centre", area: "South Shore",
    description: "Whimsical scarecrow displays line the streets while local crafters and makers fill the community centre with handmade treasures.",
    longDescription: "Every year, the charming town of Mahone Bay transforms into a whimsical wonderland of creative scarecrow displays. Local businesses, families, and community groups compete to build the most imaginative scarecrows.\n\nInside the Mahone Bay Centre, over 40 local artisans and makers set up shop for the weekend craft fair. Browse handmade pottery, quilts, knitted goods, wooden toys, candles, soaps, and much more.\n\nThe food court features local favourites: fish cakes, chowder, meat pies, and fresh-baked treats. Don't miss the pie auction on Saturday afternoon.\n\nFree admission and free parking throughout town. A scarecrow building workshop for kids runs both days from 10 AM to noon.",
    featured: false, price: "Free",
    image: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=800&q=80",
    organizer: "Mahone Bay Community Events", contact: "events@mahonebay.ca",
    website: "https://mahonebay.ca",
    accessibility: "Town centre and community centre are wheelchair accessible.",
    tags: ["Family Friendly", "Free Entry", "Shopping", "Crafts"]
  },
  {
    id: 12, title: "Tidal Bore Rafting Adventure", category: "outdoors",
    date: "Jul–Sep", month: "jul", day: "Daily", time: "Various",
    location: "Shubenacadie River", area: "Bay of Fundy",
    description: "Ride the famous Fundy tidal bore on a thrilling zodiac adventure. The world's highest tides create a natural rollercoaster.",
    longDescription: "Hold on tight — this is one of the wildest natural rides on the planet. Twice a day, the Bay of Fundy's legendary tides push a wall of water up the Shubenacadie River, creating a tidal bore that turns the river into a churning, mud-splashing adventure.\n\nYou'll board a sturdy zodiac and ride the incoming bore wave, surfing standing waves, splashing through rapids, and getting gloriously muddy in the chocolate-brown Fundy waters.\n\nTrips run approximately 2 hours and depart based on the daily tide schedule. All safety equipment is provided, including wetsuits on cooler days. You will get soaked — that's the whole point.\n\nMinimum age is 5 for family rafts, 12 for adventure rafts. Hot showers and changing facilities are available at the base.",
    featured: false, price: "$70–$90",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    organizer: "Fundy Tidal Bore Adventures", contact: "book@fundyrafting.ca",
    website: "https://fundyrafting.ca",
    accessibility: "Requires mobility to board zodiac.",
    tags: ["Adventure", "Outdoors", "Tides", "Family Options"]
  },
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
  background: active ? "#003366" : "#fff",
  border: "1px solid", borderColor: active ? "#003366" : "rgba(0,51,102,0.12)",
  color: active ? "#fff" : "rgba(0,51,102,0.55)",
  padding: isMobile ? "7px 14px" : "8px 18px",
  fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.7rem" : "0.75rem",
  fontWeight: 500, cursor: "pointer", borderRadius: "100px", transition: "all 0.25s",
  flexShrink: 0,
});

const inputStyle = (isMobile) => ({
  width: "100%", background: "#fff",
  border: "1px solid rgba(0,51,102,0.12)", borderRadius: "10px",
  padding: isMobile ? "12px 14px" : "14px 16px",
  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
  color: "#003366", outline: "none",
});

const labelStyle = {
  fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
  fontWeight: 600, color: "#003366", marginBottom: "6px", display: "block",
  letterSpacing: "0.03em",
};

/* ============ HEADER ============ */
function Header({ scrolled, isMobile, onNav, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const alwaysScrolled = scrolled || currentPage !== "home";
  const navItems = [
    { label: "Events", action: () => { setMenuOpen(false); onNav("events"); } },
    { label: "Venues", action: () => { setMenuOpen(false); onNav("venues"); } },
    { label: "Regions", action: () => { setMenuOpen(false); onNav("regions"); } },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: alwaysScrolled || menuOpen ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: alwaysScrolled || menuOpen ? "blur(20px)" : "none",
      borderBottom: alwaysScrolled ? "1px solid rgba(0,51,102,0.08)" : "none",
      transition: "all 0.4s ease", padding: alwaysScrolled ? "10px 0" : "16px 0",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => onNav("home")} style={{ display: "flex", alignItems: "baseline", gap: "8px", cursor: "pointer" }}>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "1.25rem" : "1.5rem",
            fontWeight: 700, color: alwaysScrolled || menuOpen ? "#003366" : "#fff", transition: "color 0.4s"
          }}>what's up</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.55rem" : "0.65rem",
            fontWeight: 600, color: alwaysScrolled || menuOpen ? "#2a7fff" : "rgba(255,255,255,0.8)",
            letterSpacing: "0.25em", textTransform: "uppercase", transition: "color 0.4s"
          }}>Nova Scotia</span>
        </div>
        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem",
            padding: "4px 8px", color: alwaysScrolled || menuOpen ? "#003366" : "#fff",
          }}>{menuOpen ? "✕" : "☰"}</button>
        ) : (
          <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {navItems.map(item => (
              <a key={item.label} onClick={item.action} style={{
                color: alwaysScrolled ? "rgba(0,51,102,0.5)" : "rgba(255,255,255,0.7)",
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
                letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
                cursor: "pointer", transition: "color 0.3s"
              }}>{item.label}</a>
            ))}
            <button onClick={() => onNav("submit")} style={{
              background: alwaysScrolled ? "#003366" : "#fff",
              color: alwaysScrolled ? "#fff" : "#003366",
              border: "none", padding: "9px 22px", fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
              fontWeight: 600, cursor: "pointer", borderRadius: "100px",
            }}>Submit Event</button>
          </nav>
        )}
      </div>
      {isMobile && menuOpen && (
        <div style={{ background: "#fff", padding: "16px 20px 24px", borderTop: "1px solid rgba(0,51,102,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>
          {navItems.map(item => (
            <a key={item.label} onClick={item.action} style={{ color: "#003366", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 500, cursor: "pointer" }}>{item.label}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); onNav("submit"); }} style={{
            background: "#003366", color: "#fff", border: "none", padding: "12px 24px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600,
            borderRadius: "100px", cursor: "pointer", width: "100%"
          }}>Submit Event</button>
        </div>
      )}
    </header>
  );
}

/* ============ HERO ============ */
function Hero({ isMobile, onSearch, onNav }) {
  const [q, setQ] = useState("");
  const eventsCount = EVENTS.length;
  const venuesCount = VENUES.length;
  const regionsCount = REGIONS.length;

  const handleSearch = () => { if (q.trim()) onSearch(q.trim()); };
  const handleKey = (e) => { if (e.key === "Enter") handleSearch(); };

  return (
    <section style={{
      position: "relative", minHeight: isMobile ? "80vh" : "90vh",
      display: "flex", alignItems: "center", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center 40%", filter: "brightness(0.35)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, rgba(0,30,70,0.85) 0%, rgba(0,51,102,0.7) 40%, rgba(10,80,150,0.5) 70%, rgba(0,40,90,0.8) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to top, #f4f8fc, transparent)" }} />
      <div style={{ position: "absolute", bottom: "-2px", left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 100" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0,60 C320,100 640,20 960,60 C1120,80 1280,50 1440,65 L1440,100 L0,100 Z" fill="#f4f8fc" opacity="0.5"/>
          <path d="M0,75 C360,95 720,55 1080,75 C1260,85 1380,70 1440,75 L1440,100 L0,100 Z" fill="#f4f8fc"/>
        </svg>
      </div>
      {!isMobile && <>
        <div style={{ position: "absolute", top: "12%", right: "6%", width: "400px", height: "400px", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", animation: "float 20s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "45%", right: "18%", width: "200px", height: "200px", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "50%", animation: "float 14s ease-in-out infinite reverse" }} />
      </>}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 24px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.6rem" : "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: isMobile ? "16px" : "24px", display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ display: "inline-block", width: "40px", height: "1.5px", background: "rgba(255,255,255,0.5)" }} /> Discover Atlantic Canada
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "2.5rem" : "clamp(3rem, 6.5vw, 5.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.05, margin: isMobile ? "0 0 20px 0" : "0 0 28px 0", letterSpacing: "-0.03em" }}>
            What's up in<br /><span style={{ background: "linear-gradient(135deg, #88c8ff, #b8dfff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Nova Scotia</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "1rem" : "1.15rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "520px", margin: isMobile ? "0 0 32px 0" : "0 0 48px 0" }}>
            From Halifax harbour to the Cabot Trail — find live music, festivals, markets, outdoor adventures, and everything happening across the province.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 5px 5px 18px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "100px", maxWidth: "480px", backdropFilter: "blur(10px)" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>⌕</span>
            <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={handleKey}
              type="text" placeholder="Search events, venues, artists..."
              style={{ background: "none", border: "none", color: "#fff", flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.85rem" : "0.9rem", padding: isMobile ? "10px 6px" : "12px 8px", outline: "none", minWidth: 0 }} />
            <button onClick={handleSearch} style={{ background: "#fff", color: "#003366", border: "none", padding: isMobile ? "10px 18px" : "11px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: "100px", whiteSpace: "nowrap" }}>Search</button>
          </div>
          <div style={{ display: "flex", gap: isMobile ? "20px" : "32px", marginTop: isMobile ? "32px" : "52px", fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? "0.7rem" : "0.78rem", color: "rgba(255,255,255,0.4)", flexWrap: "wrap" }}>
            <span onClick={() => onNav("events")} style={{ cursor: "pointer" }}><strong style={{ color: "#fff", fontSize: isMobile ? "1.1rem" : "1.3rem", fontFamily: "'Playfair Display', serif" }}>{eventsCount}</strong> events</span>
            <span onClick={() => onNav("venues")} style={{ cursor: "pointer" }}><strong style={{ color: "#fff", fontSize: isMobile ? "1.1rem" : "1.3rem", fontFamily: "'Playfair Display', serif" }}>{venuesCount}</strong> venues</span>
            <span onClick={() => onNav("regions")} style={{ cursor: "pointer" }}><strong style={{ color: "#fff", fontSize: isMobile ? "1.1rem" : "1.3rem", fontFamily: "'Playfair Display', serif" }}>{regionsCount}</strong> regions</span>
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
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActive(cat.id)} style={{
            background: active === cat.id ? "rgba(0,51,102,0.06)" : "transparent", border: "none",
            borderBottom: active === cat.id ? "2.5px solid #003366" : "2.5px solid transparent",
            color: active === cat.id ? "#003366" : "rgba(0,51,102,0.4)",
            padding: "14px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem",
            fontWeight: active === cat.id ? 600 : 500, cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px", flexShrink: 0
          }}><span style={{ fontSize: "0.85rem" }}>{cat.icon}</span>{cat.label}</button>
        ))}
      </div>
    </div>
  );
}

/* ============ EVENT CARD ============ */
function EventCard({ event, featured, isMobile, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const big = featured && !isMobile;
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", border: "1px solid", borderColor: hovered ? "rgba(0,51,102,0.15)" : "rgba(0,51,102,0.06)",
        cursor: "pointer", transition: "all 0.35s ease", transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,51,102,0.12)" : "0 2px 8px rgba(0,51,102,0.04)",
        display: "flex", flexDirection: "column", borderRadius: "12px", overflow: "hidden"
      }}>
      <div style={{ height: big ? "260px" : isMobile ? "180px" : "200px", overflow: "hidden", position: "relative", background: "#e8f0f8" }}>
        <img src={event.image} alt={event.title} onLoad={() => setImgLoaded(true)} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease, opacity 0.4s", transform: hovered ? "scale(1.06)" : "scale(1)", opacity: imgLoaded ? 1 : 0 }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "#003366" }}>{event.price}</div>
        <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(0,51,102,0.85)", backdropFilter: "blur(8px)", padding: "5px 12px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>{event.area}</div>
      </div>
      <div style={{ padding: big ? "24px" : isMobile ? "16px" : "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.63rem", fontWeight: 600, color: "#2a7fff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>{CATEGORIES.find(c => c.id === event.category)?.label}</div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: big ? "1.45rem" : isMobile ? "1.1rem" : "1.15rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0", lineHeight: 1.25 }}>{event.title}</h3>
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const related = EVENTS.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [event.id]);

  return (
    <div>
      <div style={{ position: "sticky", top: "52px", zIndex: 90, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,51,102,0.06)", padding: "12px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#003366", fontWeight: 500, padding: "4px 0" }}>
            <span style={{ fontSize: "1.1rem" }}>←</span> Back to Events
          </button>
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1.4fr 1fr", gap: isMobile ? "24px" : "40px" }}>
          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", height: isMobile ? "240px" : "420px", background: "#e8f0f8", marginBottom: "28px" }}>
              <img src={event.image} alt={event.title} onLoad={() => setImgLoaded(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s" }} />
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
              {event.tags.map(tag => (
                <span key={tag} style={{ background: "linear-gradient(135deg, #e8f1ff, #dce9fa)", color: "#003366", padding: "6px 16px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 600, color: "#2a7fff", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>{CATEGORIES.find(c => c.id === event.category)?.label}</div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? "1.8rem" : "2.6rem", fontWeight: 700, color: "#003366", margin: "0 0 20px 0", lineHeight: 1.15 }}>{event.title}</h1>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(0,51,102,0.6)", lineHeight: 1.8 }}>
              {event.longDescription.split("\n\n").map((p, i) => <p key={i} style={{ margin: "0 0 18px 0" }}>{p}</p>)}
            </div>
            <div style={{ background: "#f0f6ff", borderRadius: "12px", padding: "20px 24px", marginTop: "28px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>♿</span>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: "#003366", marginBottom: "4px" }}>Accessibility</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(0,51,102,0.55)", lineHeight: 1.5 }}>{event.accessibility}</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid rgba(0,51,102,0.08)", boxShadow: "0 4px 20px rgba(0,51,102,0.06)", padding: "28px", ...(isMobile || isTablet ? {} : { position: "sticky", top: "110px" }) }}>
              <div style={{ background: "linear-gradient(135deg, #003366, #004d99)", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>Admission</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{event.price}</div>
              </div>
              {[
                { icon: "📅", label: "Date", value: `${event.day}, ${event.date}` },
                { icon: "🕐", label: "Time", value: event.time },
                { icon: "📍", label: "Location", value: event.location },
                { icon: "🗺", label: "Region", value: event.area },
                { icon: "👤", label: "Organizer", value: event.organizer },
                { icon: "✉️", label: "Contact", value: event.contact },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 0", borderBottom: i < 5 ? "1px solid rgba(0,51,102,0.06)" : "none" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#f0f6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(0,51,102,0.4)", fontWeight: 500, marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "#003366", fontWeight: 500 }}>{item.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
                <button onClick={() => window.open(event.website, "_blank")} style={{ background: "#003366", color: "#fff", border: "none", padding: "16px 24px", borderRadius: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer" }}>Visit Website →</button>
                <button onClick={() => { if (navigator.share) navigator.share({ title: event.title, url: window.location.href }); else navigator.clipboard.writeText(window.location.href); }} style={{ background: "#f0f6ff", color: "#003366", border: "none", padding: "14px 24px", borderRadius: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>Share Event</button>
              </div>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.4rem" : "1.8rem", fontWeight: 700, color: "#003366", margin: "0 0 24px 0" }}>More {CATEGORIES.find(c => c.id === event.category)?.label}</h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "20px" }}>
              {related.map(e => <EventCard key={e.id} event={e} featured={false} isMobile={isMobile} onClick={() => onEventClick(e)} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ VENUES PAGE ============ */
function VenuesPage({ isMobile, isTablet }) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.4rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0" }}>Venues</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(0,51,102,0.45)", margin: "0 0 32px 0" }}>{VENUES.length} venues across Nova Scotia</p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "20px" }}>
        {VENUES.map((v, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,51,102,0.06)", padding: "24px", boxShadow: "0 2px 8px rgba(0,51,102,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#003366", margin: 0 }}>{v.name}</h3>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
              <span style={{ background: "#e8f1ff", color: "#003366", padding: "4px 12px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 600 }}>{v.type}</span>
              <span style={{ background: "rgba(0,51,102,0.06)", color: "rgba(0,51,102,0.6)", padding: "4px 12px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 500 }}>{v.area}</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(0,51,102,0.5)", lineHeight: 1.6, margin: 0 }}>{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ REGIONS PAGE ============ */
function RegionsPage({ isMobile, isTablet, onSelectRegion }) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.4rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0" }}>Regions of Nova Scotia</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(0,51,102,0.45)", margin: "0 0 32px 0" }}>Explore {REGIONS.length} unique regions</p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(2, 1fr)", gap: "20px" }}>
        {REGIONS.map(r => {
          const count = EVENTS.filter(e => e.area === r.id).length;
          return (
            <div key={r.id} onClick={() => onSelectRegion(r.id)} style={{
              background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,51,102,0.06)",
              padding: "28px", boxShadow: "0 2px 8px rgba(0,51,102,0.04)", cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,51,102,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,51,102,0.04)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#003366", margin: 0 }}>{r.name}</h3>
                <span style={{ background: "#e8f1ff", color: "#003366", padding: "4px 14px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600 }}>{count} event{count !== 1 ? "s" : ""}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(0,51,102,0.5)", lineHeight: 1.7, margin: "0 0 16px 0" }}>{r.blurb}</p>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#2a7fff" }}>Explore events →</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ SUBMIT EVENT PAGE ============ */
function SubmitPage({ isMobile, onBack }) {
  const [form, setForm] = useState({ name: "", venue: "", date: "", startTime: "", endTime: "", location: "", area: "", category: "", price: "", description: "", organizer: "", contact: "", website: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (submitted) {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: isMobile ? "60px 20px" : "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎉</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#003366", margin: "0 0 12px 0" }}>Event Submitted!</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(0,51,102,0.5)", lineHeight: 1.6, margin: "0 0 32px 0" }}>Thank you for submitting your event. Our team will review it and get back to you shortly.</p>
        <button onClick={onBack} style={{ background: "#003366", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "100px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Back to Events</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: isMobile ? "24px 16px" : "40px 24px" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.8rem" : "2.2rem", fontWeight: 700, color: "#003366", margin: "0 0 8px 0" }}>Submit an Event</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(0,51,102,0.45)", margin: "0 0 36px 0" }}>Share your event with the Nova Scotia community.</p>
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
          <div>
            <label style={labelStyle}>Region *</label>
            <select value={form.area} onChange={e => set("area", e.target.value)} style={{ ...inputStyle(isMobile), appearance: "auto" }}>
              <option value="">Select a region</option>
              {REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            <select value={form.category} onChange={e => set("category", e.target.value)} style={{ ...inputStyle(isMobile), appearance: "auto" }}>
              <option value="">Select a category</option>
              {CATEGORIES.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Price</label><input value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. $25 or Free" style={inputStyle(isMobile)} /></div>
        </div>
        <div>
          <label style={labelStyle}>Event Description *</label>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Tell people about your event..." rows={5} style={{ ...inputStyle(isMobile), resize: "vertical", fontFamily: "'DM Sans', sans-serif" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Organizer Name</label><input value={form.organizer} onChange={e => set("organizer", e.target.value)} placeholder="Your name or org" style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>Contact Email</label><input value={form.contact} onChange={e => set("contact", e.target.value)} type="email" placeholder="email@example.com" style={inputStyle(isMobile)} /></div>
          <div><label style={labelStyle}>Website</label><input value={form.website} onChange={e => set("website", e.target.value)} type="url" placeholder="https://..." style={inputStyle(isMobile)} /></div>
        </div>
        <button onClick={() => {
          if (form.name && form.venue && form.date && form.startTime && form.location && form.area && form.category && form.description) setSubmitted(true);
          else alert("Please fill in all required fields marked with *");
        }} style={{ background: "#003366", color: "#fff", border: "none", padding: "16px 32px", borderRadius: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", marginTop: "8px", alignSelf: "flex-start" }}>Submit Event</button>
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
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>Stay in the loop</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 700, color: "#fff", margin: "0 0 12px 0" }}>Never miss what's happening</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.55)", maxWidth: "440px", margin: "0 auto 28px", lineHeight: 1.6 }}>Weekly picks, hidden gems, and last-minute events — straight to your inbox every Thursday.</p>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "8px", maxWidth: "440px", margin: "0 auto", background: isMobile ? "transparent" : "rgba(255,255,255,0.1)", padding: isMobile ? "0" : "5px", borderRadius: "100px", border: isMobile ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
          <input type="email" placeholder="your@email.com" style={{ background: isMobile ? "rgba(255,255,255,0.1)" : "none", border: isMobile ? "1px solid rgba(255,255,255,0.15)" : "none", color: "#fff", flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", padding: isMobile ? "14px 18px" : "12px 18px", outline: "none", borderRadius: isMobile ? "100px" : "0" }} />
          <button style={{ background: "#fff", color: "#003366", border: "none", padding: isMobile ? "14px 32px" : "12px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: "100px" }}>Subscribe</button>
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
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: "#88c8ff", letterSpacing: "0.25em", textTransform: "uppercase" }}>Nova Scotia</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "280px" }}>Your guide to events, experiences, and adventures across Nova Scotia. Made with love on the East Coast.</p>
          </div>
          {[
            { title: "Explore", links: [{ l: "Events", a: "events" }, { l: "Venues", a: "venues" }, { l: "Regions", a: "regions" }] },
            { title: "Regions", links: REGIONS.slice(0, 4).map(r => ({ l: r.name, a: "region:" + r.id })) },
            { title: "Connect", links: [{ l: "Submit Event", a: "submit" }, { l: "Newsletter", a: "events" }] }
          ].map(section => (
            <div key={section.title}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#88c8ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>{section.title}</h4>
              <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? "8px 16px" : "12px" }}>
                {section.links.map(link => (
                  <a key={link.l} onClick={() => {
                    if (link.a.startsWith("region:")) onNav("home", link.a.split(":")[1]);
                    else onNav(link.a);
                  }} style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", cursor: "pointer" }}>{link.l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: "8px" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>© 2026 What's Up Nova Scotia. All rights reserved.</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.18)" }}>Built on the unceded territory of the Mi'kmaq people</span>
        </div>
      </div>
    </footer>
  );
}

/* ============ MAIN APP ============ */
export default function WhatsUpNovaScotia() {
  const [page, setPage] = useState("home"); // home, event, venues, regions, submit
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
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(meta);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (target, regionId) => {
    if (target === "home") {
      setPage("home");
      setSelectedEvent(null);
      setSearchQuery("");
      if (regionId) { setArea(regionId); } else { setArea("All Areas"); }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "events") {
      setPage("home");
      setSelectedEvent(null);
      setSearchQuery("");
      setTimeout(() => {
        eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (target === "venues") {
      setPage("venues");
      setSelectedEvent(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "regions") {
      setPage("regions");
      setSelectedEvent(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "submit") {
      setPage("submit");
      setSelectedEvent(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    setPage("home");
    setSelectedEvent(null);
    setCategory("all");
    setArea("All Areas");
    setMonth("all");
    setTimeout(() => {
      eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const filtered = EVENTS.filter(e => {
    const catMatch = category === "all" || e.category === category;
    const areaMatch = area === "All Areas" || e.area === area;
    const monthMatch = month === "all" || e.month === month;
    const searchMatch = !searchQuery || [e.title, e.description, e.location, e.area, e.tags.join(" "), e.organizer, CATEGORIES.find(c => c.id === e.category)?.label].join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && areaMatch && monthMatch && searchMatch;
  });

  const featuredEvents = filtered.filter(e => e.featured);
  const regularEvents = filtered.filter(e => !e.featured);
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  const featuredCols = isMobile ? "1fr" : "repeat(2, 1fr)";

  return (
    <div style={{ background: "#f4f8fc", minHeight: "100vh" }}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(1.5deg); } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        ::placeholder { color: rgba(0,51,102,0.3); }
        html { scroll-behavior: smooth; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: rgba(0,51,102,0.3) !important; }
      `}</style>

      <Header scrolled={scrolled} isMobile={isMobile} onNav={handleNav} currentPage={page} />

      {page === "home" && selectedEvent && (
        <div style={{ paddingTop: "52px" }}>
          <EventDetail event={selectedEvent} onBack={() => setSelectedEvent(null)} isMobile={isMobile} isTablet={isTablet} onEventClick={e => setSelectedEvent(e)} />
          <Footer isMobile={isMobile} onNav={handleNav} />
        </div>
      )}

      {page === "home" && !selectedEvent && (
        <>
          <Hero isMobile={isMobile} onSearch={handleSearch} onNav={handleNav} />
          <CategoryBar active={category} setActive={(c) => { setCategory(c); setSearchQuery(""); }} />
          <main style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "28px 16px" : "40px 24px" }}>
            <div ref={eventsRef} style={{ scrollMarginTop: "120px" }} />

            {/* Search indicator */}
            {searchQuery && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", padding: "14px 20px", background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,51,102,0.06)" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(0,51,102,0.6)" }}>
                  Showing results for "<strong style={{ color: "#003366" }}>{searchQuery}</strong>"
                </span>
                <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#2a7fff", fontWeight: 500, marginLeft: "auto" }}>Clear search</button>
              </div>
            )}

            {/* Filters row */}
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: "28px", gap: "16px" }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.5rem" : "1.8rem", fontWeight: 700, color: "#003366", margin: "0 0 4px 0" }}>
                  {category === "all" ? "All Events" : CATEGORIES.find(c => c.id === category)?.label}
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(0,51,102,0.4)" }}>{filtered.length} event{filtered.length !== 1 ? "s" : ""} found</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: isMobile ? "flex-start" : "flex-end" }}>
                {/* Month filter */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {MONTHS.map(m => (
                    <button key={m.id} onClick={() => setMonth(m.id)} style={pill(month === m.id, isMobile)}>{m.label}</button>
                  ))}
                </div>
                {/* Area filter */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {["All Areas", ...AREA_LIST].map(a => (
                    <button key={a} onClick={() => setArea(a)} style={pill(area === a, isMobile)}>{a}</button>
                  ))}
                </div>
              </div>
            </div>

            {featuredEvents.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: featuredCols, gap: isMobile ? "16px" : "24px", marginBottom: isMobile ? "16px" : "24px" }}>
                {featuredEvents.map(e => <EventCard key={e.id} event={e} featured isMobile={isMobile} onClick={() => setSelectedEvent(e)} />)}
              </div>
            )}
            {regularEvents.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? "16px" : "24px" }}>
                {regularEvents.map(e => <EventCard key={e.id} event={e} featured={false} isMobile={isMobile} onClick={() => setSelectedEvent(e)} />)}
              </div>
            )}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.4 }}>⛵</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "rgba(0,51,102,0.45)", marginBottom: "8px" }}>No events found</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(0,51,102,0.3)" }}>Try adjusting your filters or check back soon.</p>
              </div>
            )}
            <Newsletter isMobile={isMobile} />
          </main>
          <Footer isMobile={isMobile} onNav={handleNav} />
        </>
      )}

      {page === "venues" && (
        <div style={{ paddingTop: "52px" }}>
          <VenuesPage isMobile={isMobile} isTablet={isTablet} />
          <Footer isMobile={isMobile} onNav={handleNav} />
        </div>
      )}

      {page === "regions" && (
        <div style={{ paddingTop: "52px" }}>
          <RegionsPage isMobile={isMobile} isTablet={isTablet} onSelectRegion={(r) => { handleNav("home", r); setTimeout(() => eventsRef.current?.scrollIntoView({ behavior: "smooth" }), 200); }} />
          <Footer isMobile={isMobile} onNav={handleNav} />
        </div>
      )}

      {page === "submit" && (
        <div style={{ paddingTop: "52px" }}>
          <SubmitPage isMobile={isMobile} onBack={() => handleNav("home")} />
          <Footer isMobile={isMobile} onNav={handleNav} />
        </div>
      )}
    </div>
  );
}