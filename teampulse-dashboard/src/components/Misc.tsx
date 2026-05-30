const FEATURES = [
  {
    icon: "🎙",
    label: "Meeting Agent",
    title: "Transcripts → Decisions",
    desc: "Parses meeting notes to extract decisions, blockers, and owners automatically.",
  },
  {
    icon: "📬",
    label: "Inbox Agent",
    title: "Emails → Actions",
    desc: "Triages your inbox and surfaces threads that need your attention today.",
  },
  {
    icon: "🎫",
    label: "Ticket Agent",
    title: "Tickets → Blockers",
    desc: "Scans Jira/DevOps for stale tasks, conflicts, and dependency chains.",
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {FEATURES.map((f, i) => (
        <div
          key={i}
          className="bg-white border border-[#E5DED5] p-6 hover:border-[#C8BFB5] transition-all duration-200"
          style={{ borderRadius: 16 }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          }}
        >
          <span className="text-[22px] block mb-4">{f.icon}</span>
          <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-medium mb-1.5">
            {f.label}
          </p>
          <h4 className="text-base font-semibold text-[#1F1F1F] mb-2">
            {f.title}
          </h4>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function CTASection() {
  return (
    <div
      className="flex items-center justify-between flex-wrap gap-6 px-8 py-10"
      style={{ background: "#1F1F1F", borderRadius: 16 }}
    >
      <div>
        <p
          className="text-[11px] uppercase tracking-widest font-medium mb-2"
          style={{ color: "#555" }}
        >
          Ready to build
        </p>
        <h3 className="text-[22px] font-bold text-white m-0">
          Start your 10-day sprint.
        </h3>
        <p className="mt-1 text-sm" style={{ color: "#888" }}>
          Go backend · GitHub Models · Next.js frontend · SSE trace logs.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          className="text-[13px] font-semibold transition-all duration-150"
          style={{
            background: "#BFE7C6",
            color: "#2D6A4F",
            borderRadius: 10,
            padding: "9px 18px",
            border: "none",
            cursor: "pointer",
          }}
        >
          View roadmap
        </button>
        <button
          className="text-[13px] transition-all duration-150"
          style={{
            background: "transparent",
            border: "1px solid #333",
            color: "#fff",
            borderRadius: 10,
            padding: "9px 18px",
            cursor: "pointer",
          }}
        >
          Clone repo
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #E5DED5", padding: "20px 24px" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center"
            style={{
              width: 20, height: 20,
              borderRadius: 5,
              background: "#1F1F1F",
            }}
          >
            <span style={{ color: "#fff", fontSize: 10 }}>⚡</span>
          </div>
          <span className="text-[13px] font-medium text-[#1F1F1F]">
            TeamPulse
          </span>
          <span className="text-[13px] text-[#6B6B6B]">
            · Microsoft Hackathon 2026
          </span>
        </div>
        <p
          className="text-xs text-[#6B6B6B]"
          style={{ fontFamily: "IBM Plex Mono, monospace" }}
        >
          4 agents · Go backend · GitHub Models · Next.js
        </p>
      </div>
    </footer>
  );
}
