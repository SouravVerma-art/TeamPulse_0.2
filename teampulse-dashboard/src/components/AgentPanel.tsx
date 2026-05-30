"use client";

import { AgentStatus } from "@/types";
import { Badge } from "./Badge";

interface AgentPanelProps {
  agents: AgentStatus[];
  lastRun?: string;
}

export function AgentPanel({ agents, lastRun }: AgentPanelProps) {
  return (
    <div
      className="bg-white border border-[#E5DED5] overflow-hidden flex flex-col h-full"
      style={{ borderRadius: 16 }}
    >
      <div className="px-6 py-5 border-b border-[#F0EBE3]">
        <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] font-medium mb-1">
          Swarm Status
        </p>
        <h3 className="text-base font-semibold text-[#1F1F1F]">
          Active Agents
        </h3>
      </div>

      <div className="px-6 py-2 flex-1">
        {agents.map((agent, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3.5 border-b border-[#F0EBE3] last:border-0 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-base w-7 text-center">{agent.icon}</span>
              <div>
                <p className="text-sm font-medium text-[#1F1F1F]">{agent.name}</p>
                <p className="text-xs text-[#6B6B6B] mt-0.5">
                  {agent.parsedN !== undefined
                    ? `${agent.parsedN} items`
                    : "—"}
                  {agent.latency ? ` · ${agent.latency}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {agent.status === "running" && (
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="inline-block w-1 h-1 rounded-full bg-[#F1D89C] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              )}
              <Badge variant={agent.status} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="px-6 py-4 border-t border-[#F0EBE3]"
        style={{ background: "#FAFAF7" }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 7, height: 7,
              borderRadius: "50%",
              background: "#BFE7C6",
              display: "inline-block",
            }}
          />
          <p className="text-xs text-[#6B6B6B]">
            {lastRun
              ? `Last run ${lastRun}`
              : "No runs yet"}
          </p>
        </div>
      </div>
    </div>
  );
}
