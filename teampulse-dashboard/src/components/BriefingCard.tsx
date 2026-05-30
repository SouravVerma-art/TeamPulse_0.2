"use client";

import { MorningBrief, SwarmStatus } from "@/types";
import { PriorityTag, LabelTag } from "./Badge";
import { motion } from "framer-motion";

interface BriefingCardProps {
  brief: MorningBrief | null;
  status: SwarmStatus;
}

function LoadingState() {
  return (
    <div
      className="bg-white border border-[#E5DED5] flex items-center justify-center"
      style={{ borderRadius: 16, minHeight: 320 }}
    >
      <div className="text-center">
        <div className="flex gap-1.5 justify-center mb-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="animate-bounce inline-block rounded-full bg-[#E5DED5]"
              style={{
                width: 8, height: 8,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <p className="text-sm text-[#6B6B6B]">
          Agents synthesising your brief…
        </p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="bg-white border border-[#E5DED5] flex items-center justify-center"
      style={{ borderRadius: 16, minHeight: 320 }}
    >
      <div className="text-center px-8">
        <p className="text-3xl mb-4">🌅</p>
        <p className="text-sm font-medium text-[#1F1F1F] mb-1">
          No brief yet
        </p>
        <p className="text-sm text-[#6B6B6B]">
          Hit Run swarm to generate your morning brief.
        </p>
      </div>
    </div>
  );
}

export function BriefingCard({ brief, status }: BriefingCardProps) {
  if (status === "running" && !brief) return <LoadingState />;
  if (!brief) return <EmptyState />;

  const time = new Date(brief.generated_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-[#E5DED5] overflow-hidden"
      style={{ borderRadius: 16 }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[#F0EBE3]">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-medium">
            Monday Morning Brief
          </p>
          <span className="text-xs text-[#6B6B6B]">Today · {time}</span>
        </div>
        <h2 className="text-xl font-bold text-[#1F1F1F] mt-2">
          Good morning, {brief.user_name} 👋
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-1">
          {brief.meeting_count} meeting{brief.meeting_count !== 1 ? "s" : ""} you missed
          {" · "}
          {brief.email_count} unread emails
          {" · "}
          {brief.ticket_count} open tickets
          {brief.conflicts_found > 0 && (
            <span className="text-[#B03030]">
              {" · "}{brief.conflicts_found} conflict{brief.conflicts_found !== 1 ? "s" : ""} found
            </span>
          )}
        </p>
      </div>

      {/* Insights list */}
      <div className="divide-y divide-[#F0EBE3]">
        {brief.insights.map((ins, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="px-6 py-4 hover:bg-[#FDFCFA] transition-colors duration-150"
          >
            <div className="flex items-start gap-4">
              <div className="pt-0.5 flex-shrink-0 flex flex-col gap-1.5">
                <PriorityTag priority={ins.priority} />
                <LabelTag label={ins.label} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#1F1F1F] leading-relaxed">
                  {ins.text}
                </p>
                <p className="text-xs text-[#6B6B6B] mt-1.5">
                  via {ins.agent}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="px-6 py-3 border-t border-[#F0EBE3] flex items-center justify-between"
        style={{ background: "#FAFAF7" }}
      >
        <p className="text-xs text-[#6B6B6B]">
          {brief.insights.length} insights · {brief.agent_results?.length ?? 0} agents
        </p>
        <p
          className="text-xs text-[#6B6B6B]"
          style={{ fontFamily: "IBM Plex Mono, monospace" }}
        >
          {new Date(brief.generated_at).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}
