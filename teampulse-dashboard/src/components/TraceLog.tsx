"use client";

import { useEffect, useRef } from "react";
import { TraceEvent } from "@/types";

interface TraceLogProps {
  lines: TraceEvent[];
  running: boolean;
}

const TYPE_COLORS: Record<string, string> = {
  system:   "#555",
  agent:    "#5B9BD5",
  done:     "#4A9B6F",
  conflict: "#C05050",
  complete: "#4A9B6F",
  error:    "#C05050",
};

export function TraceLog({ lines, running }: TraceLogProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as new lines arrive
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      ref={ref}
      className="h-64 overflow-y-auto p-5 text-xs leading-relaxed"
      style={{
        background: "#161616",
        borderRadius: 16,
        fontFamily: "IBM Plex Mono, monospace",
      }}
    >
      {lines.length === 0 ? (
        <p style={{ color: "#444" }}>// trace output will appear here...</p>
      ) : (
        lines.map((line, i) => (
          <div
            key={i}
            className="mb-1.5"
            style={{ color: TYPE_COLORS[line.type] ?? "#888" }}
          >
            <span style={{ color: "#3A3A3A", marginRight: 14, userSelect: "none" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {line.agent && line.agent !== "" && (
              <span style={{ color: "#888", marginRight: 8 }}>
                [{line.agent}]
              </span>
            )}
            {line.message}
          </div>
        ))
      )}

      {/* Blinking cursor while running */}
      {running && lines.length > 0 && (
        <span
          className="inline-block animate-pulse"
          style={{
            width: 7,
            height: 13,
            background: "#BFE7C6",
            marginLeft: 4,
            borderRadius: 1,
            verticalAlign: "middle",
          }}
        />
      )}
    </div>
  );
}
