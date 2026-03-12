import { useState, useEffect } from "react";

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
    featured: true, price: "Free",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80"
  },
  {
    id: 2, title: "Celtic Colours After-Party: The Barra MacNeils", category: "music",
    date: "Mar 15", day: "Sun", time: "8:00 PM",
    location: "The Carleton, Halifax", area: "Halifax",
    description: "Cape Breton's beloved family band brings their signature blend of Celtic, folk, and pop to an intimate venue.",
    featured: true, price: "$35",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80"
  },
  {
    id: 3, title: "Lobster Supper at Hall's Harbour", category: "food",
    date: "Mar 14", day: "Sat", time: "12:00 PM – 8:00 PM",
    location: "Hall's Harbour Lobster Pound", area: "Bay of Fundy",
    description: "Fresh-off-the-boat lobster with all the fixings. Watch the famous Fundy tides roll in while you dine at picnic tables overlooking the wharf.",
    featured: true, price: "$40–$65",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80"
  },
  {
    id: 4, title: "Peggy's Cove Sunrise Yoga", category: "outdoors",
    date: "Mar 15", day: "Sun", time: "6:00 AM",
    location: "Peggy's Cove", area: "South Shore",
    description: "Greet the dawn with a guided yoga session on the iconic granite rocks. All levels welcome. Bring a mat and layers.",
    featured: false, price: "$20",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
  },
  {
    id: 5, title: "Annapolis Valley Wine & Art Walk", category: "arts",
    date: "Mar 21", day: "Sat", time: "1:00 PM – 5:00 PM",
    location: "Wolfville", area: "Annapolis Valley",
    description: "Stroll through Wolfville galleries with tastings from five local wineries. Meet the artists and winemakers behind the Valley's creative spirit.",
    featured: true, price: "$45",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80"
  },
  {
    id: 6, title: "Lunenburg Folk Harbour Festival", category: "festivals",
    date: "Mar 20–22", day: "Fri–Sun", time: "All Day",
    location: "Old Town Lunenburg", area: "South Shore",
    description: "Three days of folk, roots, and world music in the UNESCO World Heritage town. Workshops, concerts, and harbour-side sessions.",
    featured: true, price: "$75–$180",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80"
  },
  {
    id: 7, title: "Cape Breton Highlands Trail Run", category: "outdoors",
    date: "Mar 22", day: "Sun", time: "8:00 AM",
    location: "Cabot Trail, Ingonish", area: "Cape Breton",
    description: "A challenging 15km trail run through some of Atlantic Canada's most dramatic coastal scenery. Routes for all skill levels.",
    featured: false, price: "$50",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
  },
  {
    id: 8, title: "Family Lighthouse Tour", category: "family",
    date: "Mar 15", day: "Sun", time: "10:00 AM – 2:00 PM",
    location: "Sambro Island Lighthouse", area: "Halifax",
    description: "Visit the oldest surviving lighthouse in North America. Guided tour with maritime history, crafts for kids, and chowder lunch.",
    featured: false, price: "$15/adult, kids free",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
  },
  {
    id: 9, title: "Acadian Kitchen: Rappie Pie Workshop", category: "food",
    date: "Mar 21", day: "Sat", time: "2:00 PM – 5:00 PM",
    location: "La Cuisine Robicheau, Clare", area: "Acadian Shore",
    description: "Learn to make traditional Acadian rappie pie from scratch. Take home your creation and a piece of living culinary history.",
    featured: false, price: "$55",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
  },
  {
    id: 10, title: "Halifax Comedy Fest: Opening Night", category: "arts",
    date: "Mar 14", day: "Sat", time: "9:00 PM",
    location: "Neptune Theatre, Halifax", area: "Halifax",
    description: "Kick off a week of laughs with a stacked lineup of Canadian comedians at Halifax's premier performing arts venue.",
    featured: false, price: "$30–$60",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80"
  },
  {
    id: 11, title: "Mahone Bay Scarecrow & Craft Fair", category: "markets",
    date: "Mar 21–22", day: "Sat–Sun", time: "9:00 AM – 4:00 PM",
    location: "Mahone Bay Centre", area: "South Shore",
    description: "Whimsical scarecrow displays line the streets while local crafters and makers fill the community centre with handmade treasures.",
    featured: false, price: "Free",
    image: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=800&q=80"
  },
  {
    id: 12, title: "Tidal Bore Rafting Adventure", category: "outdoors",
    date: "Daily", day: "Daily", time: "Various",
    location: "Shubenacadie River", area: "Bay of Fundy",
    description: "Ride the famous Fundy tidal bore on a thrilling zodiac adventure. The world's highest tides create a natural rollercoaster.",
    featured: false, price: "$70–$90",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
  },
];

const AREAS = ["All Areas", "Halifax", "South Shore", "Cape Breton", "Bay of Fundy", "Annapolis Valley", "Acadian Shore"];

function Header({ scrolled }) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255, 255, 255, 0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0, 51, 102, 0.08)" : "none",
      transition: "all 0.4s ease",
      padding: scrolled ? "10px 0" : "18px 0",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem",
            fontWeight: 700, color: scrolled ? "#003366" : "#fff", letterSpacing: "-0.02em",
            transition: "color 0.4s"
          }}>
            what's up
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
            color: scrolled ? "#2a7fff" : "rgba(255,255,255,0.8)",
            letterSpacing: "0.25em", textTransform: "uppercase", transition: "color 0.4s"
          }}>
            Nova Scotia
          </span>
        </div>
        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {["Events", "Venues", "About"].map(item => (
            <a key={item} href="#" style={{
              color: scrolled ? "rgba(0,51,102,0.5)" : "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
              letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500,
              transition: "color 0.3s"
            }}
            onMouseEnter={e => e.target.style.color = scrolled ? "#003366" : "#fff"}
            onMouseLeave={e => e.target.style.color = scrolled ? "rgba(0,51,102,0.5)" : "rgba(255,255,255,0.7)"}
            >{item}</a>
          ))}
          <button style={{
            background: scrolled ? "#003366" : "#fff",
            color: scrolled ? "#fff" : "#003366",
            border: "none",
            padding: "9px 22px", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
            fontWeight: 600, cursor: "pointer", borderRadius: "100px",
            transition: "all 0.4s"
          }}>Submit Event</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{
      position: "relative", minHeight: "90vh", display: "flex", alignItems: "center",
      overflow: "hidden"
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80')",
        backgroundSize: "cover", backgroundPosition: "center 40%",
        filter: "brightness(0.35)"
      }} />
      {/* Blue overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(165deg, rgba(0,30,70,0.85) 0%, rgba(0,51,102,0.7) 40%, rgba(10,80,150,0.5) 70%, rgba(0,40,90,0.8) 100%)"
      }} />
      {/* Bottom fade to white */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
        background: "linear-gradient(to top, #f4f8fc, transparent)"
      }} />
      {/* Wave SVG */}
      <div style={{ position: "absolute", bottom: "-2px", left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 100" fill="none" style={{ display: "block", width: "100%" }}>
          <path d="M0,60 C320,100 640,20 960,60 C1120,80 1280,50 1440,65 L1440,100 L0,100 Z" fill="#f4f8fc" opacity="0.5"/>
          <path d="M0,75 C360,95 720,55 1080,75 C1260,85 1380,70 1440,75 L1440,100 L0,100 Z" fill="#f4f8fc"/>
        </svg>
      </div>
      {/* Decorative circles */}
      <div style={{
        position: "absolute", top: "12%", right: "6%", width: "400px", height: "400px",
        border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%",
        animation: "float 20s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", top: "45%", right: "18%", width: "200px", height: "200px",
        border: "1px solid rgba(255,255,255,0.04)", borderRadius: "50%",
        animation: "float 14s ease-in-out infinite reverse"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 600,
            color: "rgba(255,255,255,0.7)", letterSpacing: "0.3em", textTransform: "uppercase",
            marginBottom: "24px", display: "flex", alignItems: "center", gap: "14px"
          }}>
            <span style={{ display: "inline-block", width: "40px", height: "1.5px", background: "rgba(255,255,255,0.5)" }} />
            Discover Atlantic Canada
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
            fontWeight: 700, color: "#fff", lineHeight: 1.05, margin: "0 0 28px 0",
            letterSpacing: "-0.03em"
          }}>
            What's up in<br />
            <span style={{
              background: "linear-gradient(135deg, #88c8ff, #b8dfff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontStyle: "italic"
            }}>Nova Scotia</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "1.15rem", lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)", maxWidth: "520px", margin: "0 0 48px 0", fontWeight: 400
          }}>
            From Halifax harbour to the Cabot Trail — find live music, festivals, markets, outdoor adventures, and everything happening across the province.
          </p>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "5px 5px 5px 22px",
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "100px", maxWidth: "480px",
            backdropFilter: "blur(10px)"
          }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>⌕</span>
            <input
              type="text" placeholder="Search events, venues, artists..."
              style={{
                background: "none", border: "none", color: "#fff", flex: 1,
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", padding: "12px 8px",
                outline: "none"
              }}
            />
            <button style={{
              background: "#fff", color: "#003366", border: "none", padding: "11px 28px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              borderRadius: "100px"
            }}>Search</button>
          </div>
          <div style={{
            display: "flex", gap: "32px", marginTop: "52px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.03em"
          }}>
            <span><strong style={{ color: "#fff", fontSize: "1.3rem", fontFamily: "'Playfair Display', serif" }}>240+</strong> events this month</span>
            <span><strong style={{ color: "#fff", fontSize: "1.3rem", fontFamily: "'Playfair Display', serif" }}>85</strong> venues</span>
            <span><strong style={{ color: "#fff", fontSize: "1.3rem", fontFamily: "'Playfair Display', serif" }}>12</strong> regions</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBar({ active, setActive }) {
  return (
    <div style={{
      background: "#fff",
      borderBottom: "1px solid rgba(0,51,102,0.08)",
      position: "sticky", top: "52px", zIndex: 90,
      boxShadow: "0 2px 12px rgba(0,51,102,0.04)"
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        display: "flex", gap: "2px", overflowX: "auto",
        scrollbarWidth: "none"
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            style={{
              background: active === cat.id ? "rgba(0, 51, 102, 0.06)" : "transparent",
              border: "none",
              borderBottom: active === cat.id ? "2.5px solid #003366" : "2.5px solid transparent",
              color: active === cat.id ? "#003366" : "rgba(0,51,102,0.4)",
              padding: "16px 18px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
              letterSpacing: "0.04em", fontWeight: active === cat.id ? 600 : 500,
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
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1px solid",
        borderColor: hovered ? "rgba(0,51,102,0.15)" : "rgba(0,51,102,0.06)",
        cursor: "pointer", transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,51,102,0.12)" : "0 2px 8px rgba(0,51,102,0.04)",
        gridColumn: featured ? "span 2" : "span 1",
        display: "flex", flexDirection: "column",
        borderRadius: "12px", overflow: "hidden"
      }}
    >
      {/* Image */}
      <div style={{
        height: featured ? "260px" : "200px",
        overflow: "hidden", position: "relative",
        background: "#e8f0f8"
      }}>
        <img
          src={event.image}
          alt={event.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.5s ease, opacity 0.4s",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            opacity: imgLoaded ? 1 : 0
          }}
        />
        {/* Price badge */}
        <div style={{
          position: "absolute", top: "14px", right: "14px",
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
          padding: "5px 14px", borderRadius: "100px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
          fontWeight: 600, color: "#003366", letterSpacing: "0.02em"
        }}>
          {event.price}
        </div>
        {/* Area badge */}
        <div style={{
          position: "absolute", bottom: "14px", left: "14px",
          background: "rgba(0,51,102,0.85)", backdropFilter: "blur(8px)",
          padding: "5px 14px", borderRadius: "100px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem",
          fontWeight: 600, color: "#fff", letterSpacing: "0.06em",
          textTransform: "uppercase"
        }}>
          {event.area}
        </div>
      </div>

      <div style={{ padding: featured ? "26px" : "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
          color: "#2a7fff", letterSpacing: "0.15em", textTransform: "uppercase",
          marginBottom: "10px"
        }}>
          {CATEGORIES.find(c => c.id === event.category)?.label}
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: featured ? "1.5rem" : "1.15rem",
          fontWeight: 700, color: "#003366", margin: "0 0 10px 0",
          lineHeight: 1.25, letterSpacing: "-0.01em"
        }}>
          {event.title}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
          color: "rgba(0,51,102,0.5)", lineHeight: 1.65, margin: "0 0 16px 0",
          flex: 1,
          display: featured ? "block" : "-webkit-box",
          WebkitLineClamp: featured ? "none" : 3,
          WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>
          {event.description}
        </p>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          paddingTop: "14px", borderTop: "1px solid rgba(0,51,102,0.06)"
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "8px",
            background: "linear-gradient(135deg, #e8f1ff, #d4e6ff)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.85rem", flexShrink: 0
          }}>📅</div>
          <div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
              color: "#003366", fontWeight: 600, display: "block"
            }}>
              {event.date} <span style={{ color: "rgba(0,51,102,0.25)", margin: "0 3px" }}>·</span> {event.time}
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
              color: "rgba(0,51,102,0.4)"
            }}>
              {event.location}
            </span>
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
            background: active === area ? "#003366" : "#fff",
            border: "1px solid",
            borderColor: active === area ? "#003366" : "rgba(0,51,102,0.12)",
            color: active === area ? "#fff" : "rgba(0,51,102,0.55)",
            padding: "8px 18px", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.04em",
            cursor: "pointer", borderRadius: "100px", transition: "all 0.25s"
          }}
        >{area}</button>
      ))}
    </div>
  );
}

function Newsletter() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #003366, #004d99)",
      borderRadius: "16px", padding: "64px 56px", textAlign: "center",
      margin: "60px 0", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)",
        backgroundSize: "30px 30px"
      }} />
      <div style={{
        position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px",
        border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%"
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 600,
          color: "rgba(255,255,255,0.6)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px"
        }}>
          Stay in the loop
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.2rem",
          fontWeight: 700, color: "#fff", margin: "0 0 12px 0", letterSpacing: "-0.02em"
        }}>
          Never miss what's happening
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
          color: "rgba(255,255,255,0.55)", maxWidth: "440px", margin: "0 auto 32px", lineHeight: 1.6
        }}>
          Weekly picks, hidden gems, and last-minute events — straight to your inbox every Thursday.
        </p>
        <div style={{
          display: "flex", gap: "8px", maxWidth: "440px", margin: "0 auto",
          background: "rgba(255,255,255,0.1)", padding: "5px",
          borderRadius: "100px", border: "1px solid rgba(255,255,255,0.12)"
        }}>
          <input
            type="email" placeholder="your@email.com"
            style={{
              background: "none", border: "none", color: "#fff", flex: 1,
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
              padding: "12px 18px", outline: "none"
            }}
          />
          <button style={{
            background: "#fff", color: "#003366", border: "none", padding: "12px 32px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
            borderRadius: "100px"
          }}>Subscribe</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#003366", padding: "56px 0 40px", marginTop: "40px"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>
                what's up
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: "#88c8ff", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Nova Scotia
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "280px"
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
                color: "#88c8ff", letterSpacing: "0.2em", textTransform: "uppercase",
                marginBottom: "20px"
              }}>{section.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {section.links.map(link => (
                  <a key={link} href="#" style={{
                    color: "rgba(255,255,255,0.4)", textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
            © 2026 What's Up Nova Scotia. All rights reserved.
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.18)" }}>
            Built on the unceded territory of the Mi'kmaq people
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function WhatsUpNovaScotia() {
  const [category, setCategory] = useState("all");
  const [area, setArea] = useState("All Areas");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

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
    <div style={{ background: "#f4f8fc", minHeight: "100vh" }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1.5deg); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        ::placeholder { color: rgba(255,255,255,0.35); }
        html { scroll-behavior: smooth; }
        input:focus { outline: none; }
      `}</style>

      <Header scrolled={scrolled} />
      <Hero />
      <CategoryBar active={category} setActive={setCategory} />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Controls */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: "32px", flexWrap: "wrap", gap: "16px"
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.8rem",
              fontWeight: 700, color: "#003366", margin: "0 0 4px 0", letterSpacing: "-0.02em"
            }}>
              {category === "all" ? "All Events" : CATEGORIES.find(c => c.id === category)?.label}
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              color: "rgba(0,51,102,0.4)"
            }}>
              {filtered.length} event{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <AreaFilter active={area} setActive={setArea} />
        </div>

        {/* Featured */}
        {featuredEvents.length > 0 && (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px", marginBottom: "24px"
          }}>
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} featured={true} />
            ))}
          </div>
        )}

        {/* Regular */}
        {regularEvents.length > 0 && (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px"
          }}>
            {regularEvents.map(event => (
              <EventCard key={event.id} event={event} featured={false} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px", opacity: 0.4 }}>⛵</div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem",
              color: "rgba(0,51,102,0.45)", marginBottom: "8px"
            }}>No events found</h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
              color: "rgba(0,51,102,0.3)"
            }}>Try adjusting your filters or check back soon.</p>
          </div>
        )}

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
