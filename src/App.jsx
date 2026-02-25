import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════
   CONFIG & SEED DATA
═══════════════════════════════════════════════════════════ */

// Prototype "now" — LA stop is live today
const NOW = new Date("2026-02-25T14:00:00");

const CATEGORIES = [
  {
    id: "bus-tour",
    name: "Bus Tour Stop",
    emoji: "🚌",
    color: "#f97316",
    gradient: "linear-gradient(135deg,#f97316 0%,#c2410c 100%)",
    badgeBg: "rgba(249,115,22,.15)",
    badgeText: "#fb923c",
    badgeBorder: "rgba(249,115,22,.35)",
  },
  {
    id: "pop-up",
    name: "Pop-Up Shop",
    emoji: "🛍️",
    color: "#ec4899",
    gradient: "linear-gradient(135deg,#ec4899 0%,#be185d 100%)",
    badgeBg: "rgba(236,72,153,.15)",
    badgeText: "#f472b6",
    badgeBorder: "rgba(236,72,153,.35)",
  },
  {
    id: "launch",
    name: "Launch Event",
    emoji: "🚀",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)",
    badgeBg: "rgba(59,130,246,.15)",
    badgeText: "#60a5fa",
    badgeBorder: "rgba(59,130,246,.35)",
  },
  {
    id: "workshop",
    name: "Workshop",
    emoji: "✂️",
    color: "#10b981",
    gradient: "linear-gradient(135deg,#10b981 0%,#047857 100%)",
    badgeBg: "rgba(16,185,129,.15)",
    badgeText: "#34d399",
    badgeBorder: "rgba(16,185,129,.35)",
  },
];

const getCat = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
const makeId = () => Math.random().toString(36).slice(2, 9);

const INITIAL_SERIES = [
  {
    id: "road-trip-26",
    name: "Road Trip '26",
    subtitle: "Cross-Country Activation Tour",
    description:
      "10 cities. 1 mission. The biggest IRL brand tour we've ever done — coast to coast, every major market.",
    startDate: "2026-02-10",
    endDate: "2026-08-22",
    color: "#f97316",
    gradient: "linear-gradient(135deg,#f97316 0%,#dc2626 100%)",
  },
  {
    id: "summer-drops",
    name: "Summer Drop Series",
    subtitle: "Pop-Ups for Every Summer Release",
    description:
      "Every major product drop this summer comes with a pop-up. Stay locked in.",
    startDate: "2026-06-01",
    endDate: "2026-09-01",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg,#8b5cf6 0%,#2563eb 100%)",
  },
];

const INITIAL_EVENTS = [
  {
    id: "e1",
    title: "NYC Kickoff Pop-Up",
    description:
      "We opened the year with a massive pop-up in SoHo. Exclusive drops, live music, and free merch for the first 100 through the door.",
    categoryId: "pop-up",
    seriesId: null,
    venue: "55 Spring Street",
    city: "New York",
    state: "NY",
    startDate: "2026-01-15T12:00:00",
    endDate: "2026-01-15T20:00:00",
    rsvpUrl: "#",
    rsvpLabel: "View Recap",
    products: ["Drop 001 Hoodie", "Logo Cap", "OG Crewneck"],
    featured: false,
  },
  {
    id: "e2",
    title: "Chicago Road Trip Stop",
    description:
      "The bus rolled into Chicago for a 2-day activation at Millennium Park. Tour-exclusive merch, surprise guests, packed weekend.",
    categoryId: "bus-tour",
    seriesId: "road-trip-26",
    venue: "Millennium Park Pavilion",
    city: "Chicago",
    state: "IL",
    startDate: "2026-02-10T10:00:00",
    endDate: "2026-02-11T18:00:00",
    rsvpUrl: "#",
    rsvpLabel: "View Recap",
    products: ["Tour Exclusive Tee", "Road Trip Pack"],
    featured: false,
  },
  {
    id: "e3",
    title: "LA Road Trip Stop",
    description:
      "Los Angeles, we're here. The biggest stop on the tour is live right now on Fairfax — come through for tour-exclusive drops and surprises all day.",
    categoryId: "bus-tour",
    seriesId: "road-trip-26",
    venue: "433 N Fairfax Ave",
    city: "Los Angeles",
    state: "CA",
    startDate: "2026-02-25T11:00:00",
    endDate: "2026-02-25T21:00:00",
    rsvpUrl: "#",
    rsvpLabel: "Get Directions",
    products: ["LA Collab Hoodie", "Tour Exclusive"],
    featured: true,
  },
  {
    id: "e4",
    title: "Austin Road Trip Stop",
    description:
      "Deep in the heart of Texas. SXSW season and we're bringing the heat to 6th Street. Two-day activation, live sets, and the Drop 002 reveal.",
    categoryId: "bus-tour",
    seriesId: "road-trip-26",
    venue: "6th Street District",
    city: "Austin",
    state: "TX",
    startDate: "2026-03-12T12:00:00",
    endDate: "2026-03-13T20:00:00",
    rsvpUrl: "#",
    rsvpLabel: "RSVP",
    products: ["Drop 002 Jacket", "Tour Tee"],
    featured: false,
  },
  {
    id: "e5",
    title: "Miami Pop-Up",
    description:
      "Wynwood, we're taking over. A full weekend activation with the new Summer Drop, exclusive colorways, and a DJ set until midnight.",
    categoryId: "pop-up",
    seriesId: "summer-drops",
    venue: "Wynwood Walls Area",
    city: "Miami",
    state: "FL",
    startDate: "2026-04-05T12:00:00",
    endDate: "2026-04-06T22:00:00",
    rsvpUrl: "#",
    rsvpLabel: "RSVP",
    products: ["Miami Drop", "Collab Tee", "Limited Print"],
    featured: false,
  },
  {
    id: "e6",
    title: "Seattle Workshop",
    description:
      "An intimate brand storytelling workshop with the founders. 40 seats, application only. Coffee, conversation, and a look behind the curtain.",
    categoryId: "workshop",
    seriesId: null,
    venue: "Capitol Hill Studio",
    city: "Seattle",
    state: "WA",
    startDate: "2026-05-02T10:00:00",
    endDate: "2026-05-02T16:00:00",
    rsvpUrl: "#",
    rsvpLabel: "Apply",
    products: [],
    featured: false,
  },
  {
    id: "e7",
    title: "Denver Road Trip Stop",
    description:
      "Mile High city, we're coming through. The bus makes its Rocky Mountain stop for a weekend takeover at RiNo Art District.",
    categoryId: "bus-tour",
    seriesId: "road-trip-26",
    venue: "RiNo Art District",
    city: "Denver",
    state: "CO",
    startDate: "2026-06-07T12:00:00",
    endDate: "2026-06-08T20:00:00",
    rsvpUrl: "#",
    rsvpLabel: "RSVP",
    products: ["Denver Exclusive", "Road Trip Tee"],
    featured: false,
  },
  {
    id: "e8",
    title: "NYC Road Trip Final Stop",
    description:
      "We started here and we're ending here. The final stop of Road Trip '26 — Brooklyn Navy Yard, 3 days, full collection reveal.",
    categoryId: "bus-tour",
    seriesId: "road-trip-26",
    venue: "Brooklyn Navy Yard",
    city: "New York",
    state: "NY",
    startDate: "2026-08-20T12:00:00",
    endDate: "2026-08-22T22:00:00",
    rsvpUrl: "#",
    rsvpLabel: "RSVP",
    products: ["Final Drop Collection"],
    featured: false,
  },
];

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */

function getStatus(event) {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  if (NOW >= start && NOW <= end) return "live";
  const todayStart = new Date(NOW);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(NOW);
  todayEnd.setHours(23, 59, 59, 999);
  if (start >= todayStart && start <= todayEnd) return "today";
  if (start > NOW) return "upcoming";
  return "past";
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
function formatDateRange(start, end) {
  const s = new Date(start),
    e = new Date(end);
  if (s.toDateString() === e.toDateString())
    return `${formatDate(start)} · ${formatTime(start)}–${formatTime(end)}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}
function formatDatetimeLocal(iso) {
  if (!iso) return "";
  return iso.slice(0, 16);
}

/* ═══════════════════════════════════════════════════════════
   SHARED TINY COMPONENTS
═══════════════════════════════════════════════════════════ */

const STATUS_CONFIG = {
  live: { label: "● LIVE NOW", bg: "#dc2626", text: "#fff", pulse: true },
  today: { label: "TODAY", bg: "#d97706", text: "#fff", pulse: false },
  upcoming: {
    label: "UPCOMING",
    bg: "rgba(255,255,255,0.1)",
    text: "rgba(255,255,255,0.75)",
    pulse: false,
  },
  past: {
    label: "PAST",
    bg: "rgba(255,255,255,0.05)",
    text: "rgba(255,255,255,0.35)",
    pulse: false,
  },
};

function StatusBadge({ status, large }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: cfg.bg,
        color: cfg.text,
        padding: large ? "5px 14px" : "3px 10px",
        borderRadius: 99,
        fontSize: large ? 11 : 10,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {cfg.pulse && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#fff",
            display: "inline-block",
            animation: "pulse 1.5s infinite",
          }}
        />
      )}
      {cfg.pulse ? "LIVE NOW" : cfg.label}
    </span>
  );
}

function CategoryChip({ categoryId }) {
  const cat = getCat(categoryId);
  return (
    <span
      style={{
        background: cat.badgeBg,
        color: cat.badgeText,
        border: `1px solid ${cat.badgeBorder}`,
        padding: "3px 10px",
        borderRadius: 99,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {cat.emoji} {cat.name}
    </span>
  );
}

function SeriesTag({ seriesId, series }) {
  const s = series.find((x) => x.id === seriesId);
  if (!s) return null;
  return (
    <span
      style={{
        color: s.color,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      ↗ {s.name}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   EVENT CARD
═══════════════════════════════════════════════════════════ */

function EventCard({ event, series }) {
  const status = getStatus(event);
  const cat = getCat(event.categoryId);
  const isPast = status === "past";

  return (
    <div
      style={{
        background: isPast ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${isPast ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: isPast ? 0.65 : 1,
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
    >
      {/* Image / gradient area */}
      <div
        style={{
          height: 160,
          background: isPast
            ? "linear-gradient(135deg,#1f1f1f 0%,#111 100%)"
            : cat.gradient,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          padding: 14,
        }}
      >
        {/* Large emoji watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-60%)",
            fontSize: 56,
            opacity: 0.25,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {cat.emoji}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          <StatusBadge status={status} />
          {event.seriesId && <SeriesTag seriesId={event.seriesId} series={series} />}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <CategoryChip categoryId={event.categoryId} />

        <div>
          <h3
            style={{
              color: isPast ? "rgba(255,255,255,0.55)" : "#fff",
              fontSize: 18,
              fontWeight: 700,
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {event.title}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 12,
              lineHeight: 1.5,
              margin: "6px 0 0",
            }}
          >
            {event.description}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span>🗓</span>
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span>📍</span>
            <span>
              {event.venue} · {event.city}, {event.state}
            </span>
          </div>
        </div>

        {event.products.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {event.products.map((p) => (
              <span
                key={p}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.5)",
                  padding: "2px 8px",
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 500,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          <a
            href={event.rsvpUrl}
            style={{
              display: "inline-block",
              background: isPast ? "rgba(255,255,255,0.07)" : cat.color,
              color: "#fff",
              padding: "9px 18px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {event.rsvpLabel || "Learn More"}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — LIVE / FEATURED EVENT
═══════════════════════════════════════════════════════════ */

function HeroSection({ events, series }) {
  const liveEvent = events.find((e) => getStatus(e) === "live" && e.featured);
  const featured = liveEvent || events.find((e) => e.featured) || events.find((e) => getStatus(e) === "live") || null;
  if (!featured) return null;

  const status = getStatus(featured);
  const cat = getCat(featured.categoryId);
  const ser = series.find((s) => s.id === featured.seriesId);

  return (
    <div
      style={{
        background: cat.gradient,
        borderRadius: 20,
        padding: "48px 40px",
        position: "relative",
        overflow: "hidden",
        marginBottom: 48,
      }}
    >
      {/* Background emoji */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 160,
          opacity: 0.12,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {cat.emoji}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
          <StatusBadge status={status} large />
          {ser && (
            <span
              style={{
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              ↗ {ser.name}
            </span>
          )}
        </div>

        <h2 style={{ color: "#fff", fontSize: 40, fontWeight: 800, margin: "0 0 10px", lineHeight: 1.1 }}>
          {featured.title}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px" }}>
          {featured.description}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, display: "flex", gap: 6 }}>
            🗓 {formatDateRange(featured.startDate, featured.endDate)}
          </span>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, display: "flex", gap: 6 }}>
            📍 {featured.venue} · {featured.city}, {featured.state}
          </span>
        </div>
        <a
          href={featured.rsvpUrl}
          style={{
            display: "inline-block",
            background: "#fff",
            color: cat.color,
            padding: "12px 28px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 800,
            textDecoration: "none",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {featured.rsvpLabel || "Learn More"}
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERIES BANNER ROW
═══════════════════════════════════════════════════════════ */

function SeriesBanner({ ser, eventCount }) {
  const statusNow = (() => {
    const s = new Date(ser.startDate), e = new Date(ser.endDate);
    if (NOW < s) return "upcoming";
    if (NOW > e) return "past";
    return "active";
  })();

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.08)`,
        borderLeft: `3px solid ${ser.color}`,
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              background: ser.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "-0.01em",
            }}
          >
            {ser.name}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: statusNow === "active" ? "#22c55e" : statusNow === "upcoming" ? "#60a5fa" : "rgba(255,255,255,0.3)",
              background: statusNow === "active" ? "rgba(34,197,94,0.12)" : statusNow === "upcoming" ? "rgba(96,165,250,0.12)" : "rgba(255,255,255,0.05)",
              padding: "2px 8px",
              borderRadius: 99,
              fontFamily: "monospace",
            }}
          >
            {statusNow === "active" ? "● ACTIVE" : statusNow === "upcoming" ? "UPCOMING" : "ENDED"}
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "3px 0 0" }}>
          {ser.subtitle} · {formatDate(ser.startDate)} – {formatDate(ser.endDate)}
        </p>
      </div>
      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, whiteSpace: "nowrap" }}>
        {eventCount} event{eventCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EVENTS PAGE (CONSUMER)
═══════════════════════════════════════════════════════════ */

const FILTER_STATUS = ["all", "live", "upcoming", "past"];

function EventsPage({ events, series, onSwitchToAdmin }) {
  const [filterSeries, setFilterSeries] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState("grid"); // grid | series

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (filterSeries !== "all" && e.seriesId !== filterSeries) return false;
      if (filterCategory !== "all" && e.categoryId !== filterCategory) return false;
      if (filterStatus !== "all" && getStatus(e) !== filterStatus) return false;
      return true;
    });
  }, [events, filterSeries, filterCategory, filterStatus]);

  // Sort: live first, then upcoming by date, then past by date desc
  const sorted = useMemo(() => {
    const order = { live: 0, today: 1, upcoming: 2, past: 3 };
    return [...filtered].sort((a, b) => {
      const sa = order[getStatus(a)], sb = order[getStatus(b)];
      if (sa !== sb) return sa - sb;
      if (sa <= 2) return new Date(a.startDate) - new Date(b.startDate);
      return new Date(b.startDate) - new Date(a.startDate);
    });
  }, [filtered]);

  const filterPill = (active, label, onClick) => (
    <button
      onClick={onClick}
      style={{
        background: active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${active ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
        color: active ? "#fff" : "rgba(255,255,255,0.5)",
        padding: "6px 14px",
        borderRadius: 99,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
      `}</style>

      {/* Nav */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          position: "sticky",
          top: 0,
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>BRAND<span style={{ color: "#f97316" }}>•</span>CO</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Products", "Collections", "Events", "About"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: item === "Events" ? "#fff" : "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: item === "Events" ? 600 : 400,
                  borderBottom: item === "Events" ? "2px solid #f97316" : "2px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={onSwitchToAdmin}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.7)",
            padding: "7px 16px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          ⚙ ADMIN
        </button>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        {/* Page title */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>
            IRL Activations
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Events
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginTop: 10, lineHeight: 1.5 }}>
            Bus tours, pop-ups, workshops, and drops — happening near you.
          </p>
        </div>

        {/* Hero */}
        <HeroSection events={events} series={series} />

        {/* Series overview */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>
            Active Series
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {series.map((s) => (
              <SeriesBanner
                key={s.id}
                ser={s}
                eventCount={events.filter((e) => e.seriesId === s.id).length}
              />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28, alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace", marginRight: 4 }}>
            Filter:
          </span>
          {filterPill(filterStatus === "all", "All Events", () => setFilterStatus("all"))}
          {filterPill(filterStatus === "live", "🔴 Live", () => setFilterStatus("live"))}
          {filterPill(filterStatus === "upcoming", "Upcoming", () => setFilterStatus("upcoming"))}
          {filterPill(filterStatus === "past", "Past", () => setFilterStatus("past"))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
          {series.map((s) =>
            filterPill(
              filterSeries === s.id,
              s.name,
              () => setFilterSeries(filterSeries === s.id ? "all" : s.id)
            )
          )}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)", margin: "0 4px" }} />
          {CATEGORIES.map((c) =>
            filterPill(
              filterCategory === c.id,
              `${c.emoji} ${c.name}`,
              () => setFilterCategory(filterCategory === c.id ? "all" : c.id)
            )
          )}
        </div>

        {/* Count */}
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 20, fontFamily: "monospace" }}>
          {sorted.length} event{sorted.length !== 1 ? "s" : ""}
        </div>

        {/* Grid */}
        {sorted.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.25)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 14 }}>No events match these filters</div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {sorted.map((e) => (
              <EventCard key={e.id} event={e} series={series} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CMS — EVENT FORM MODAL
═══════════════════════════════════════════════════════════ */

const EMPTY_EVENT = {
  id: null,
  title: "",
  description: "",
  categoryId: "pop-up",
  seriesId: "",
  venue: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  rsvpUrl: "",
  rsvpLabel: "RSVP",
  products: "",
  featured: false,
};

const RSVP_LABELS = ["RSVP", "Apply", "Get Tickets", "Get Directions", "View Recap", "Learn More"];

function EventFormModal({ initial, series, onSave, onClose }) {
  const [form, setForm] = useState(() => {
    if (!initial) return EMPTY_EVENT;
    return {
      ...initial,
      products: initial.products.join(", "),
      startDate: formatDatetimeLocal(initial.startDate),
      endDate: formatDatetimeLocal(initial.endDate),
      seriesId: initial.seriesId || "",
    };
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.startDate || !form.endDate) return;
    onSave({
      ...form,
      id: form.id || makeId(),
      products: form.products
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      seriesId: form.seriesId || null,
      startDate: form.startDate + ":00",
      endDate: form.endDate + ":00",
    });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    color: "#fff",
    padding: "9px 12px",
    fontSize: 13,
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "monospace",
    marginBottom: 5,
    display: "block",
  };

  const Field = ({ label, children }) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#141414",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: "#141414",
            zIndex: 10,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
            {form.id ? "Edit Event" : "New Event"}
          </h3>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Event Title *">
            <input style={inputStyle} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Austin Road Trip Stop" required />
          </Field>

          <Field label="Description">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What's happening at this event?" />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Category *">
              <select style={inputStyle} value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Series">
              <select style={inputStyle} value={form.seriesId} onChange={(e) => set("seriesId", e.target.value)}>
                <option value="">— No Series —</option>
                {series.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Venue / Location">
            <input style={inputStyle} value={form.venue} onChange={(e) => set("venue", e.target.value)} placeholder="e.g. 433 N Fairfax Ave" />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
            <Field label="City">
              <input style={inputStyle} value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Los Angeles" />
            </Field>
            <Field label="State">
              <input style={inputStyle} value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="CA" />
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Start Date & Time *">
              <input type="datetime-local" style={inputStyle} value={form.startDate} onChange={(e) => set("startDate", e.target.value)} required />
            </Field>
            <Field label="End Date & Time *">
              <input type="datetime-local" style={inputStyle} value={form.endDate} onChange={(e) => set("endDate", e.target.value)} required />
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
            <Field label="RSVP / Link URL">
              <input style={inputStyle} value={form.rsvpUrl} onChange={(e) => set("rsvpUrl", e.target.value)} placeholder="https://" />
            </Field>
            <Field label="Button Label">
              <select style={inputStyle} value={form.rsvpLabel} onChange={(e) => set("rsvpLabel", e.target.value)}>
                {RSVP_LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Featured Products (comma-separated)">
            <input style={inputStyle} value={form.products} onChange={(e) => set("products", e.target.value)} placeholder="Drop 002 Jacket, Tour Tee, Road Trip Pack" />
          </Field>

          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} style={{ width: 16, height: 16 }} />
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Feature this event as the hero on the events page</span>
          </label>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <button type="button" onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "9px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" style={{ background: "#f97316", border: "none", color: "#fff", padding: "9px 24px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 700, letterSpacing: "0.03em" }}>
              {form.id ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CMS — SERIES FORM MODAL
═══════════════════════════════════════════════════════════ */

const SERIES_COLORS = [
  { label: "Orange / Red", value: "#f97316", gradient: "linear-gradient(135deg,#f97316,#dc2626)" },
  { label: "Purple / Blue", value: "#8b5cf6", gradient: "linear-gradient(135deg,#8b5cf6,#2563eb)" },
  { label: "Pink / Rose", value: "#ec4899", gradient: "linear-gradient(135deg,#ec4899,#be185d)" },
  { label: "Green / Teal", value: "#10b981", gradient: "linear-gradient(135deg,#10b981,#0891b2)" },
  { label: "Blue / Cyan", value: "#3b82f6", gradient: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
];

function SeriesFormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || { id: null, name: "", subtitle: "", description: "", startDate: "", endDate: "", color: "#f97316", gradient: SERIES_COLORS[0].gradient }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", padding: "9px 12px", fontSize: 13, width: "100%", outline: "none" };
  const labelStyle = { color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 5, display: "block" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.startDate || !form.endDate) return;
    onSave({ ...form, id: form.id || makeId() });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, width: "100%", maxWidth: 480 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{form.id ? "Edit Series" : "New Series"}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={labelStyle}>Series Name *</label><input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Road Trip '26" required /></div>
          <div><label style={labelStyle}>Subtitle</label><input style={inputStyle} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder="e.g. Cross-Country Activation Tour" /></div>
          <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={labelStyle}>Start Date *</label><input type="date" style={inputStyle} value={form.startDate} onChange={(e) => set("startDate", e.target.value)} required /></div>
            <div><label style={labelStyle}>End Date *</label><input type="date" style={inputStyle} value={form.endDate} onChange={(e) => set("endDate", e.target.value)} required /></div>
          </div>
          <div>
            <label style={labelStyle}>Color Theme</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {SERIES_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => set("color", c.value) || set("gradient", c.gradient)}
                  style={{ width: 32, height: 32, borderRadius: 8, background: c.gradient, border: form.color === c.value ? "3px solid #fff" : "3px solid transparent", cursor: "pointer" }}
                  title={c.label}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <button type="button" onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "9px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
            <button type="submit" style={{ background: "#f97316", border: "none", color: "#fff", padding: "9px 24px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 700 }}>{form.id ? "Save Changes" : "Create Series"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CMS — ADMIN PANEL
═══════════════════════════════════════════════════════════ */

function AdminCMS({ events, series, onUpdateEvents, onUpdateSeries, onSwitchToPage }) {
  const [tab, setTab] = useState("events");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingSeries, setEditingSeries] = useState(null);
  const [showSeriesForm, setShowSeriesForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleSaveEvent = (evt) => {
    if (evt.id && events.find((e) => e.id === evt.id)) {
      onUpdateEvents(events.map((e) => (e.id === evt.id ? evt : e)));
    } else {
      onUpdateEvents([...events, evt]);
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    onUpdateEvents(events.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  };

  const handleSaveSeries = (ser) => {
    if (ser.id && series.find((s) => s.id === ser.id)) {
      onUpdateSeries(series.map((s) => (s.id === ser.id ? ser : s)));
    } else {
      onUpdateSeries([...series, ser]);
    }
    setShowSeriesForm(false);
    setEditingSeries(null);
  };

  const handleDeleteSeries = (id) => {
    onUpdateSeries(series.filter((s) => s.id !== id));
    // Unlink events from deleted series
    onUpdateEvents(events.map((e) => (e.seriesId === id ? { ...e, seriesId: null } : e)));
    setDeleteConfirm(null);
  };

  const sortedEvents = useMemo(() => {
    const order = { live: 0, today: 1, upcoming: 2, past: 3 };
    return [...events].sort((a, b) => {
      const sa = order[getStatus(a)], sb = order[getStatus(b)];
      if (sa !== sb) return sa - sb;
      return new Date(a.startDate) - new Date(b.startDate);
    });
  }, [events]);

  const statCounts = useMemo(() => {
    const counts = { live: 0, today: 0, upcoming: 0, past: 0 };
    events.forEach((e) => counts[getStatus(e)]++);
    return counts;
  }, [events]);

  const tabStyle = (active) => ({
    background: active ? "rgba(255,255,255,0.1)" : "none",
    border: "none",
    color: active ? "#fff" : "rgba(255,255,255,0.4)",
    padding: "8px 18px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.03em",
  });

  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#fff", padding: "9px 12px", fontSize: 13, width: "100%", outline: "none" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0a0a; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }`}</style>

      {/* CMS Nav */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, background: "#0f0f0f" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>BRAND<span style={{ color: "#f97316" }}>•</span>CO</span>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }} />
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "monospace" }}>Events CMS</span>
        </div>
        <button onClick={onSwitchToPage} style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.35)", color: "#fb923c", padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}>
          ↗ View Events Page
        </button>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 36 }}>
          {[
            { label: "Live Now", count: statCounts.live, color: "#dc2626" },
            { label: "Upcoming", count: statCounts.upcoming + statCounts.today, color: "#3b82f6" },
            { label: "Past", count: statCounts.past, color: "rgba(255,255,255,0.3)" },
            { label: "Series", count: series.length, color: "#f97316" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.count}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          <button style={tabStyle(tab === "events")} onClick={() => setTab("events")}>Events ({events.length})</button>
          <button style={tabStyle(tab === "series")} onClick={() => setTab("series")}>Series ({series.length})</button>
          <button style={tabStyle(tab === "categories")} onClick={() => setTab("categories")}>Categories</button>
        </div>

        {/* ── EVENTS TAB ── */}
        {tab === "events" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>All Events</h2>
              <button
                onClick={() => { setEditingEvent(null); setShowEventForm(true); }}
                style={{ background: "#f97316", border: "none", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em" }}
              >
                + Add Event
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sortedEvents.map((evt) => {
                const status = getStatus(evt);
                const cat = getCat(evt.categoryId);
                const ser = series.find((s) => s.id === evt.seriesId);
                return (
                  <div key={evt.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Status dot */}
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: status === "live" ? "#dc2626" : status === "today" ? "#d97706" : status === "upcoming" ? "#3b82f6" : "rgba(255,255,255,0.2)", flexShrink: 0 }} />

                    {/* Cat emoji */}
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: cat.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{cat.emoji}</div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{evt.title}</span>
                        {evt.featured && <span style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 99, letterSpacing: "0.08em", textTransform: "uppercase" }}>★ Featured</span>}
                        {ser && <span style={{ color: ser.color, fontSize: 10, fontWeight: 600, fontFamily: "monospace" }}>↗ {ser.name}</span>}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>
                        {evt.city}, {evt.state} · {formatDateRange(evt.startDate, evt.endDate)}
                      </div>
                    </div>

                    {/* Status badge */}
                    <StatusBadge status={status} />

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button onClick={() => { setEditingEvent(evt); setShowEventForm(true); }} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: "6px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Edit</button>
                      <button onClick={() => setDeleteConfirm({ type: "event", id: evt.id, name: evt.title })} style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#f87171", padding: "6px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SERIES TAB ── */}
        {tab === "series" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Event Series</h2>
              <button onClick={() => { setEditingSeries(null); setShowSeriesForm(true); }} style={{ background: "#f97316", border: "none", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em" }}>
                + Add Series
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {series.map((ser) => {
                const eventsInSeries = events.filter((e) => e.seriesId === ser.id);
                return (
                  <div key={ser.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${ser.color}`, borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{ser.name}</span>
                        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>·</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{eventsInSeries.length} event{eventsInSeries.length !== 1 ? "s" : ""}</span>
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 3 }}>
                        {ser.subtitle} · {formatDate(ser.startDate)} – {formatDate(ser.endDate)}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 4 }}>{ser.description}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button onClick={() => { setEditingSeries(ser); setShowSeriesForm(true); }} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", padding: "6px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Edit</button>
                      <button onClick={() => setDeleteConfirm({ type: "series", id: ser.id, name: ser.name })} style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", color: "#f87171", padding: "6px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CATEGORIES TAB ── */}
        {tab === "categories" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Categories</h2>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Pre-defined · contact dev to modify</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {CATEGORIES.map((cat) => {
                const count = events.filter((e) => e.categoryId === cat.id).length;
                return (
                  <div key={cat.id} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${cat.badgeBorder}`, borderRadius: 12, padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: cat.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{cat.emoji}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{cat.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{count} event{count !== 1 ? "s" : ""}</div>
                      </div>
                    </div>
                    <div style={{ background: cat.badgeBg, borderRadius: 6, padding: "6px 10px" }}>
                      <code style={{ color: cat.badgeText, fontSize: 10 }}>{cat.id}</code>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showEventForm && (
        <EventFormModal
          initial={editingEvent}
          series={series}
          onSave={handleSaveEvent}
          onClose={() => { setShowEventForm(false); setEditingEvent(null); }}
        />
      )}
      {showSeriesForm && (
        <SeriesFormModal
          initial={editingSeries}
          onSave={handleSaveSeries}
          onClose={() => { setShowSeriesForm(false); setEditingSeries(null); }}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 28, maxWidth: 380, width: "100%", margin: "0 20px" }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🗑</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>Delete "{deleteConfirm.name}"?</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "0 0 20px", lineHeight: 1.5 }}>
              {deleteConfirm.type === "series"
                ? "This will remove the series and unlink all events from it. Events will not be deleted."
                : "This event will be permanently removed from the page."}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", padding: "9px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
              <button
                onClick={() => deleteConfirm.type === "event" ? handleDeleteEvent(deleteConfirm.id) : handleDeleteSeries(deleteConfirm.id)}
                style={{ background: "#dc2626", border: "none", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 700 }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════ */

export default function App() {
  const [view, setView] = useState("page"); // "page" | "admin"
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [series, setSeries] = useState(INITIAL_SERIES);

  return view === "admin" ? (
    <AdminCMS
      events={events}
      series={series}
      onUpdateEvents={setEvents}
      onUpdateSeries={setSeries}
      onSwitchToPage={() => setView("page")}
    />
  ) : (
    <EventsPage
      events={events}
      series={series}
      onSwitchToAdmin={() => setView("admin")}
    />
  );
}
