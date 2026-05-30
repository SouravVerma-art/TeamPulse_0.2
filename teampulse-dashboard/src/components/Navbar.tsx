"use client";

import { useState } from "react";
import { SwarmStatus } from "@/types";

const NAV_LINKS = ["Dashboard", "Agents", "Insights", "Settings"];

interface NavbarProps {
  swarmStatus: SwarmStatus;
  agentCount: number;
}

export function Navbar({ swarmStatus, agentCount }: NavbarProps) {
  const [active, setActive] = useState("Dashboard");

  const isLive = swarmStatus === "running";

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#E5DED5]"
      style={{ backgroundColor: "#F5F1EB" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center"
            style={{
              width: 26, height: 26,
              borderRadius: 7,
              background: "#1F1F1F",
            }}
          >
            <span style={{ color: "#fff", fontSize: 12 }}>⚡</span>
          </div>
          <span className="font-semibold text-[14px] text-[#1F1F1F] tracking-tight">
            TeamPulse
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className="transition-all duration-150"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: active === link ? 500 : 400,
                padding: "6px 14px",
                borderRadius: 8,
                background: active === link ? "#fff" : "transparent",
                border: active === link ? "1px solid #E5DED5" : "1px solid transparent",
                color: active === link ? "#1F1F1F" : "#6B6B6B",
                cursor: "pointer",
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Status indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: isLive ? "#F1D89C" : "#BFE7C6",
            padding: "5px 10px",
            borderRadius: 6,
            transition: "background 0.3s",
          }}
        >
          <span
            style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: isLive ? "#7D5A1E" : "#2D6A4F",
              display: "inline-block",
              animation: isLive ? "pulse 1s infinite" : "none",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: isLive ? "#7D5A1E" : "#2D6A4F",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {isLive ? "swarm running" : `${agentCount} agents live`}
          </span>
        </div>
      </div>
    </nav>
  );
}
