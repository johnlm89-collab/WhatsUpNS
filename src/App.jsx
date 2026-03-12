import { useState, useEffect, useRef } from "react";

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

const EVENTS = [
  {
    id: 1, title: "Halifax Waterfront Night Market", category: "markets",
    date: "Mar 14", day: "Sat", time: "5:00 PM – 10:00 PM",
    location: "Bishop's Landing, Halifax", area: "Halifax",
    description: "Local artisans, street food, and live music along the waterfront. Over 60 vendors featuring Nova Scotia crafts, seafood, and baked goods.",
    featured: true, price: "Free", image: "market"
  },
  {
    id: 2, title: "Celtic Colours After-Party: The Barra MacNeils", category: "music",
    date: "Mar 15", day: "Sun", time: "8:00 PM",
    location: "The Carleton, Halifax", area: "Halifax",
    description: "Cape Breton's beloved family band brings their signature blend of Celtic, folk, and pop to an intimate venue.",
    featured: true, price: "$35", image: "music"
  },
  {
    id: 3, title: "Lobster Supper at Hall's Harbour", category: "food",
    date: "Mar 14", day: "Sat", time: "12:00 PM – 8:00 PM",
    location: "Hall's Harbour Lobster Pound", area: "Bay of Fundy",
    description: "Fresh-off-the-boat lobster with all the fixings. Watch the famous Fundy tides roll in while you dine at picnic tables overlooking the wharf.",
    featured: true, price: "$40–$65", image: "lobster"
  },
  {
    id: 4, title: "Peggy's Cove Sunrise Yoga", category: "outdoors",
    date: "Mar 15", day: "Sun", time: "6:00 AM",
    location: "Peggy's Cove", area: "South Shore",
    description: "Greet the dawn with a guided yoga session on the iconic granite rocks. All levels welcome. Bring a mat and layers.",
    featured: false, price: "$20", image: "yoga"
  },
  {
    id: 5, title: "Annapolis Valley Wine & Art Walk", category: "arts",
    date: "Mar 21", day: "Sat", time: "1:00 PM – 5:00 PM",
    location: "Wolfville", area: "Annapolis Valley",
    description: "Stroll through Wolfville galleries with tastings from five local wineries. Meet the artists and winemakers behind the Valley's creative spirit.",
    featured: true, price: "$45", image: "wine"
  },
  {
    id: 6, title: "Lunenburg Folk Harbour Festival", category: "festivals",
    date: "Mar 20–22", day: "Fri–Sun", time: "All Day",
    location: "Old Town Lunenburg", area: "South Shore",
    description: "Three days of folk, roots, and world music in the UNESCO World Heritage town. Workshops, concerts, and harbour-side sessions.",
    featured: true, price: "$75–$180", image: "festival"
  },
  {
    id: 7, title: "Cape Breton Highlands Trail Run", category: "outdoors",
    date: "Mar 22", day: "Sun", time: "8:00 AM",
    location: "Cabot Trail, Ingonish", area: "Cape Breton",
    description: "A challenging 15km trail run through some of Atlantic Canada's most dramatic coastal scenery. Routes for all skill levels.",
    featured: false, price: "$50", image: "trail"
  },
  {
    id: 8, title: "Family Lighthouse Tour", category: "family",
    date: "Mar 15", day: "Sun", time: "10:00 AM – 2:00 PM",
    location: "Sambro Island Lighthouse", area: "Halifax",
    description: "Visit the oldest surviving lighthouse in North America. Guided tour with maritime history, crafts for kids, and chowder lunch.",
    featured: false, price: "$15/adult, kids free", image: "lighthouse"
  },
  {
    id: 9, title: "Acadian Kitchen: Rappie Pie Workshop", category: "food",
    date: "Mar 21", day: "Sat", time: "2:00 PM – 5:00 PM",
    location: "La Cuisine Robicheau, Clare", area: "Acadian Shore",
    description: "Learn to make traditional Acadian rappie pie from scratch. Take home your creation and a piece of living culinary history.",
    featured: false, price: "$55", image: "cooking"
  },
  {
    id: 10, title: "Halifax Comedy Fest: Opening Night", category: "arts",
    date: "Mar 14", day: "Sat", time: "9:00 PM",
    location: "Neptune Theatre, Halifax", area: "Halifax",
    description: "Kick off a week of laughs with a stacked lineup of Canadian comedians at Halifax's premier performing arts venue.",
    featured: false, price: "$30–$60", image: "comedy"
  },
  {
    id: 11, title: "Mahone Bay Scarecrow & Craft Fair", category: "markets",
    date: "Mar 21–22", day: "Sat–Sun", time: "9:00 AM – 4:00 PM",
    location: "Mahone Bay Centre", area: "South Shore",
    description: "Whimsical scarecrow displays line the streets while local crafters and makers fill the community centre with handmade treasures.",
    featured: false, price: "Free", image: "fair"
  },
  {
    id: 12, title: "Tidal Bore Rafting Adventure", category: "outdoors",
    date: "Daily", day: "Daily", time: "Various",
    location: "Shubenacadie River", area: "Bay of Fundy",
    description: "Ride the famous Fundy tidal bore on a thrilling zodiac adventure. The world's highest tides create a natural rollercoaster.",
    featured: false, price: "$70–$90", image: "rafting"
  },
];

const AREAS = ["All Areas", "Halifax", "South Shore", "Cape Breton", "Bay of Fundy", "Annapolis Valley", "Acadian Shore"];

const IMAGE_PATTERNS = {
  market: { bg: "#1a3a5c", accent: "#f4a259", pattern: "◆ ◇ ◆ ◇" },
  music: { bg: "#2d1b3d", accent: "#e07be0", pattern: "♪ ♫ ♪ ♫" },
  lobster: { bg: "#8b1a1a", accent: "#ffcba4", pattern: "~ ~ ~ ~" },
  yoga: { bg: "#1a4a3a", accent: "#a8e6cf", pattern: "○ ○ ○ ○" },
  wine: { bg: "#3d1b2d", accent: "#d4a574", pattern: "◯ ◯ ◯ ◯" },
  festival: { bg: "#1a2d5c", accent: "#ffd700", pattern: "✦ ✦ ✦ ✦" },
  trail: { bg: "#2d4a1a", accent: "#c8e6a0", pattern: "▲ ▲ ▲ ▲" },
  lighthouse: { bg: "#4a3a1a", accent: "#fff4d4", pattern: "| | | |" },
  cooking: { bg: "#5c2d1a", accent: "#ffb088", pattern: "≈ ≈ ≈ ≈" },
  comedy: { bg: "#1a1a3d", accent: "#ff6b6b", pattern: "★ ★ ★ ★" },
  fair: { bg: "#3d3a1a", accent: "#e8d44d", pattern: "✿ ✿ ✿ ✿" },
  rafting: { bg: "#0d3b66", accent: "#61dafb", pattern: "≋ ≋ ≋ ≋" },
};

function EventImage({ type, featured }) {
  const p = IMAGE_PATTERNS[type] || IMAGE_PATTERNS.market;
  const h = featured ? "240px" : "180px";
  return (
    <div style={{
      background: `linear-gradient(135deg, ${p.bg}, ${p.bg}dd)`,
      height: h, display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", borderRadius: "0"
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: `radial-gradient(circle at 2px 2px, ${p.accent} 1px, transparent 0)`,
        backgroundSize: "24px 24px"
      }} />
      <div style={{
        color: p.accent, fontSize: featured ? "2rem" : "1.5rem",
        letterSpacing: "0.5em", opacity: 0.5, fontFamily: "monospace"
      }}>
        {p.pattern}
      </div>
    </div>
  );
}

function Header({ scrolled }) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(8, 18, 30, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      padding: scrolled ? "12px 0" : "20px 0",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
            what's on
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, color: "#e07b4c", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Nova Scotia
          </span>
        </div>
        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {["Events", "Venues", "About"].map(item => (
            <a key={item} href="#" style={{
              color: "rgba(255,255,255,0.55)", textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
              letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
              transition: "color 0.2s"
            }}
            onMouseEnter={e => e.target.style.color = "#fff"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
            >{item}</a>
          ))}
          <button style={{
            background: "#e07b4c", color: "#fff", border: "none",
            padding: "8px 20px", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase",
            fontWeight: 600, cursor: "pointer", borderRadius: "2px"
          }}>Submit Event</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{
      position: "relative", minHeight: "85vh", display: "flex", alignItems: "center",
      background: "linear-gradient(165deg, #08121e 0%, #0f2136 35%, #1a3352 65%, #0d2844 100%)",
      overflow: "hidden"
    }}>
      {/* Atmospheric layers */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "300px",
        background: "linear-gradient(to top, #08121e, transparent)"
      }} />
      {/* Wave SVG decoration */}
      <div style={{ position: "absolute", bottom: "-2px", left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 120" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z" fill="#08121e" opacity="0.5"/>
          <path d="M0,90 C360,110 720,60 1080,90 C1260,100 1380,85 1440,90 L1440,120 L0,120 Z" fill="#08121e"/>
        </svg>
      </div>
      {/* Floating accent shapes */}
      <div style={{
        position: "absolute", top: "15%", right: "8%", width: "350px", height: "350px",
        border: "1px solid rgba(224, 123, 76, 0.08)", borderRadius: "50%",
        animation: "float 20s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", top: "40%", right: "15%", width: "180px", height: "180px",
        border: "1px solid rgba(224, 123, 76, 0.05)", borderRadius: "50%",
        animation: "float 15s ease-in-out infinite reverse"
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "5%", width: "2px", height: "120px",
        background: "linear-gradient(to bottom, transparent, rgba(224, 123, 76, 0.15), transparent)"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: "750px" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 500,
            color: "#e07b4c", letterSpacing: "0.3em", textTransform: "uppercase",
            marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px"
          }}>
            <span style={{ display: "inline-block", width: "40px", height: "1px", background: "#e07b4c" }} />
            Discover Atlantic Canada
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 700, color: "#fff", lineHeight: 1.05, margin: "0 0 24px 0",
            letterSpacing: "-0.03em"
          }}>
            What's on in<br />
            <span style={{ color: "#e07b4c", fontStyle: "italic" }}>Nova Scotia</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)", maxWidth: "520px", margin: "0 0 48px 0", fontWeight: 400
          }}>
            From Halifax harbour to the Cabot Trail — find live music, festivals, markets, outdoor adventures, and everything happening across the province.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 4px 20px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "2px", flex: "1", maxWidth: "420px", minWidth: "280px"
            }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.1rem" }}>⌕</span>
              <input
                type="text" placeholder="Search events, venues, artists..."
                style={{
                  background: "none", border: "none", color: "#fff", flex: 1,
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", padding: "14px 8px",
                  outline: "none", letterSpacing: "0.01em"
                }}
              />
              <button style={{
                background: "#e07b4c", color: "#fff", border: "none", padding: "10px 24px",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px"
              }}>Search</button>
            </div>
          </div>
          <div style={{
            display: "flex", gap: "24px", marginTop: "48px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
            color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em"
          }}>
            <span><strong style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", fontFamily: "'Playfair Display', serif" }}>240+</strong> events this month</span>
            <span><strong style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", fontFamily: "'Playfair Display', serif" }}>85</strong> venues</span>
            <span><strong style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", fontFamily: "'Playfair Display', serif" }}>12</strong> regions</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBar({ active, setActive }) {
  return (
    <div style={{
      background: "#08121e",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      position: "sticky", top: "56px", zIndex: 90
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        display: "flex", gap: "4px", overflowX: "auto",
        scrollbarWidth: "none"
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            style={{
              background: active === cat.id ? "rgba(224, 123, 76, 0.12)" : "transparent",
              border: "none",
              borderBottom: active === cat.id ? "2px solid #e07b4c" : "2px solid transparent",
              color: active === cat.id ? "#e07b4c" : "rgba(255,255,255,0.4)",
              padding: "16px 18px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
              letterSpacing: "0.04em", fontWeight: 500,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "8px"
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EventCard({ event, featured }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: "1px solid",
        borderColor: hovered ? "rgba(224, 123, 76, 0.2)" : "rgba(255,255,255,0.05)",
        cursor: "pointer", transition: "all 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        gridColumn: featured ? "span 2" : "span 1",
        display: "flex", flexDirection: "column",
        borderRadius: "2px", overflow: "hidden"
      }}
    >
      <EventImage type={event.image} featured={featured} />
      <div style={{ padding: featured ? "28px" : "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
            color: "#e07b4c", letterSpacing: "0.15em", textTransform: "uppercase"
          }}>
            {CATEGORIES.find(c => c.id === event.category)?.label}
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
            color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em"
          }}>
            {event.price}
          </div>
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: featured ? "1.55rem" : "1.15rem",
          fontWeight: 700, color: "#fff", margin: "0 0 10px 0",
          lineHeight: 1.25, letterSpacing: "-0.01em"
        }}>
          {event.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
          color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: "0 0 16px 0",
          flex: 1,
          display: featured ? "block" : "-webkit-box",
          WebkitLineClamp: featured ? "none" : 3,
          WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>
          {event.description}
        </p>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
              color: "rgba(255,255,255,0.7)", fontWeight: 500
            }}>
              {event.date} <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 4px" }}>·</span> {event.time}
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)"
            }}>
              {event.location}
            </span>
          </div>
          <div style={{
            background: "rgba(224, 123, 76, 0.1)", color: "#e07b4c",
            padding: "4px 12px", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", borderRadius: "2px"
          }}>
            {event.area}
          </div>
        </div>
      </div>
    </div>
  );
}

function AreaFilter({ active, setActive }) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {AREAS.map(area => (
        <button
          key={area}
          onClick={() => setActive(area)}
          style={{
            background: active === area ? "#e07b4c" : "rgba(255,255,255,0.04)",
            border: "1px solid",
            borderColor: active === area ? "#e07b4c" : "rgba(255,255,255,0.08)",
            color: active === area ? "#fff" : "rgba(255,255,255,0.4)",
            padding: "7px 16px", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.04em",
            cursor: "pointer", borderRadius: "2px", transition: "all 0.2s"
          }}
        >{area}</button>
      ))}
    </div>
  );
}

function Newsletter() {
  return (
    <section style={{
      background: "linear-gradient(135deg, rgba(224, 123, 76, 0.08), rgba(224, 123, 76, 0.02))",
      border: "1px solid rgba(224, 123, 76, 0.12)",
      borderRadius: "2px", padding: "56px", textAlign: "center",
      margin: "60px 0"
    }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
        color: "#e07b4c", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px"
      }}>
        Stay in the loop
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem",
        fontWeight: 700, color: "#fff", margin: "0 0 12px 0", letterSpacing: "-0.02em"
      }}>
        Never miss what's happening
      </h2>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
        color: "rgba(255,255,255,0.4)", maxWidth: "440px", margin: "0 auto 28px", lineHeight: 1.6
      }}>
        Weekly picks, hidden gems, and last-minute events — straight to your inbox every Thursday.
      </p>
      <div style={{
        display: "flex", gap: "8px", maxWidth: "420px", margin: "0 auto",
        background: "rgba(0,0,0,0.3)", padding: "4px", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px"
      }}>
        <input
          type="email" placeholder="your@email.com"
          style={{
            background: "none", border: "none", color: "#fff", flex: 1,
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
            padding: "12px 16px", outline: "none"
          }}
        />
        <button style={{
          background: "#e07b4c", color: "#fff", border: "none", padding: "12px 28px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px"
        }}>Subscribe</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "48px 0 36px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>
                what's on
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, color: "#e07b4c", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Nova Scotia
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: "300px"
            }}>
              Your guide to events, experiences, and adventures across Nova Scotia. Made with love on the East Coast.
            </p>
          </div>
          {[
            { title: "Explore", links: ["Events", "Venues", "Regions", "This Weekend"] },
            { title: "Regions", links: ["Halifax", "Cape Breton", "South Shore", "Annapolis Valley"] },
            { title: "Connect", links: ["Submit Event", "Advertise", "Newsletter", "Contact"] }
          ].map(section => (
            <div key={section.title}>
              <h4 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
                color: "#e07b4c", letterSpacing: "0.2em", textTransform: "uppercase",
                marginBottom: "20px"
              }}>{section.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {section.links.map(link => (
                  <a key={link} href="#" style={{
                    color: "rgba(255,255,255,0.35)", textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.2)"
          }}>
            © 2026 What's On Nova Scotia. All rights reserved.
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.04em"
          }}>
            Built on the unceded territory of the Mi'kmaq people
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function WhatsOnNovaScotia() {
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState("All Areas");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = EVENTS.filter(e => {
    const catMatch = category === "all" || e.category === category;
    const areaMatch = area === "All Areas" || e.area === area;
    return catMatch && areaMatch;
  });

  const featuredEvents = filtered.filter(e => e.featured);
  const regularEvents = filtered.filter(e => !e.featured);

  return (
    <div style={{ background: "#08121e", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        ::placeholder { color: rgba(255,255,255,0.25); }
        html { scroll-behavior: smooth; }
        input:focus { outline: none; }
      `}</style>

      <Header scrolled={scrolled} />
      <Hero />
      <CategoryBar active={category} setActive={setCategory} />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Controls row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "32px", flexWrap: "wrap", gap: "16px"
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.8rem",
              fontWeight: 700, color: "#fff", margin: "0 0 4px 0", letterSpacing: "-0.02em"
            }}>
              {category === "all" ? "All Events" : CATEGORIES.find(c => c.id === category)?.label}
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              color: "rgba(255,255,255,0.35)"
            }}>
              {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <AreaFilter active={area} setActive={setArea} />
        </div>

        {/* Featured grid */}
        {featuredEvents.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginBottom: "20px"
          }}>
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} featured={true} />
            ))}
          </div>
        )}

        {/* Regular grid */}
        {regularEvents.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px"
          }}>
            {regularEvents.map(event => (
              <EventCard key={event.id} event={event} featured={false} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.3 }}>⛵</div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem",
              color: "rgba(255,255,255,0.5)", marginBottom: "8px"
            }}>No events found</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
              color: "rgba(255,255,255,0.25)"
            }}>Try adjusting your filters or check back soon.</p>
          </div>
        )}

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
