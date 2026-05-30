"use client";

import { useState, useEffect } from "react";
import { useSwarm } from "@/hooks/useSwarm";
import { Navbar }       from "@/components/Navbar";
import { StatCard }     from "@/components/StatCard";
import { TraceLog }     from "@/components/TraceLog";
import { BriefingCard } from "@/components/BriefingCard";
import { AgentPanel }   from "@/components/AgentPanel";
import { FeatureCards, CTASection, Footer } from "@/components/Misc";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [showTrace, setShowTrace] = useState(false);
  const [{ status, traceLines, agents, brief, error }, { run, reset }] =
    useSwarm();

  useEffect(() => setMounted(true), []);

  const isRunning = status === "running";

  // Derive stats from brief if available, else show defaults
  const emailCount   = brief?.email_count   ?? 47;
  const meetingCount = brief?.meeting_count ?? 3;
  const ticketCount  = brief?.ticket_count  ?? 12;
  const conflicts    = brief?.conflicts_found ?? 1;

  const lastRunTime = brief
    ? new Date(brief.generated_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : undefined;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F1EB" }}>
      <Navbar swarmStatus={status} agentCount={agents.length} />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Hero ────────────────────────────────────────────────── */}
        <div
          className={`mb-10 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-medium mb-3">
            AI Work Intelligence
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1
                className="font-bold text-[#1F1F1F] leading-tight"
                style={{ fontSize: 38, letterSpacing: "-0.02em" }}
              >
                Your team&apos;s second brain.
              </h1>
              <p className="text-[#6B6B6B] mt-2.5 text-base max-w-lg leading-relaxed">
                A multi-agent swarm that watches your meetings, inbox, and
                tickets — then delivers one clear, actionable morning brief.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTrace((v) => !v)}
                className="transition-all duration-150"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13, fontWeight: 500,
                  borderRadius: 10,
                  padding: "9px 18px",
                  background: "#fff",
                  border: "1px solid #E5DED5",
                  color: "#6B6B6B",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = "#C8BFB5";
                  (e.target as HTMLButtonElement).style.color = "#1F1F1F";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.borderColor = "#E5DED5";
                  (e.target as HTMLButtonElement).style.color = "#6B6B6B";
                }}
              >
                {showTrace ? "Hide trace" : "Show trace"}
              </button>

              {status === "done" && (
                <button
                  onClick={reset}
                  className="transition-all duration-150"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13, fontWeight: 500,
                    borderRadius: 10,
                    padding: "9px 18px",
                    background: "#fff",
                    border: "1px solid #E5DED5",
                    color: "#6B6B6B",
                    cursor: "pointer",
                  }}
                >
                  Reset
                </button>
              )}

              <button
                onClick={run}
                disabled={isRunning}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13, fontWeight: 500,
                  borderRadius: 10,
                  padding: "9px 18px",
                  background: "#1F1F1F",
                  color: "#fff",
                  border: "none",
                  cursor: isRunning ? "not-allowed" : "pointer",
                  opacity: isRunning ? 0.5 : 1,
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isRunning)
                    (e.target as HTMLButtonElement).style.background = "#333";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "#1F1F1F";
                }}
              >
                {isRunning ? "Running swarm…" : "▶  Run swarm"}
              </button>
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div
              className="mt-4 px-4 py-3 text-sm text-[#B03030]"
              style={{
                background: "#FFE5E5",
                borderRadius: 10,
                border: "1px solid #F0B0B0",
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* ── Stat cards ──────────────────────────────────────────── */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <StatCard label="Emails Triaged"   value={emailCount}   sub="This morning"     accentPct={72} />
          <StatCard label="Meetings Parsed"  value={meetingCount} sub="Since Friday"      accentPct={60} />
          <StatCard label="Tickets Scanned"  value={ticketCount}  sub="Open + blocked"   accentPct={40} />
          <StatCard label="Conflicts Found"  value={conflicts}    sub="Detected by swarm" accentPct={conflicts > 0 ? 20 : 0} />
        </div>

        {/* ── Trace log (toggle) ──────────────────────────────────── */}
        {showTrace && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-medium">
                Agent Execution Trace
              </p>
              <span
                className="text-xs text-[#6B6B6B]"
                style={{ fontFamily: "IBM Plex Mono, monospace" }}
              >
                SSE stream · live
              </span>
            </div>
            <TraceLog lines={traceLines} running={isRunning} />
          </div>
        )}

        {/* ── Main 2-col layout ───────────────────────────────────── */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="lg:col-span-2">
            <BriefingCard brief={brief} status={status} />
          </div>
          <div>
            <AgentPanel agents={agents} lastRun={lastRunTime} />
          </div>
        </div>

        {/* ── Feature cards ───────────────────────────────────────── */}
        <div
          className={`mb-10 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <FeatureCards />
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div
          className={`mb-10 transition-all duration-700 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <CTASection />
        </div>

      </main>

      <Footer />
    </div>
  );
}
