import { InsightPriority, InsightLabel } from "@/types";

type BadgeVariant =
  | InsightPriority
  | "delivered"
  | "archived"
  | "active"
  | "idle"
  | "waiting"
  | "running"
  | "done"
  | "error";

const STYLES: Record<BadgeVariant, string> = {
  // priority
  high:      "bg-[#FFE5E5] text-[#B03030]",
  medium:    "bg-[#F1D89C] text-[#7D5A1E]",
  low:       "bg-[#BFE7C6] text-[#2D6A4F]",
  // status
  delivered: "bg-[#BFE7C6] text-[#2D6A4F]",
  archived:  "bg-[#F1D89C] text-[#7D5A1E]",
  active:    "bg-[#BFE7C6] text-[#2D6A4F]",
  idle:      "bg-[#F5F1EB] text-[#6B6B6B] border border-[#E5DED5]",
  waiting:   "bg-[#F5F1EB] text-[#6B6B6B] border border-[#E5DED5]",
  running:   "bg-[#F1D89C] text-[#7D5A1E]",
  done:      "bg-[#BFE7C6] text-[#2D6A4F]",
  error:     "bg-[#FFE5E5] text-[#B03030]",
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
}

export function Badge({ variant, label }: BadgeProps) {
  return (
    <span
      className={`
        inline-block text-[10px] font-medium uppercase tracking-[0.08em]
        px-2 py-[3px] rounded-[4px] whitespace-nowrap
        ${STYLES[variant] ?? STYLES.idle}
      `}
    >
      {label ?? variant}
    </span>
  );
}

// Priority tag — fixed min-width for alignment in briefing card
export function PriorityTag({ priority }: { priority: InsightPriority }) {
  return (
    <span
      className={`
        inline-block text-[10px] font-semibold uppercase tracking-[0.1em]
        px-[10px] py-1 rounded-[4px] whitespace-nowrap min-w-[68px] text-center
        ${STYLES[priority]}
      `}
    >
      {priority}
    </span>
  );
}

// Label tag for insight type (Decision, Blocker, etc.)
export function LabelTag({ label }: { label: InsightLabel }) {
  const labelStyles: Record<InsightLabel, string> = {
    Decision: "bg-[#E6F1FB] text-[#185FA5]",
    Blocker:  "bg-[#FFE5E5] text-[#B03030]",
    Conflict: "bg-[#FFE5E5] text-[#B03030]",
    Action:   "bg-[#F1D89C] text-[#7D5A1E]",
    Update:   "bg-[#F5F1EB] text-[#6B6B6B] border border-[#E5DED5]",
  };
  return (
    <span
      className={`
        inline-block text-[10px] font-semibold uppercase tracking-[0.08em]
        px-2 py-[3px] rounded-[4px] whitespace-nowrap
        ${labelStyles[label] ?? "bg-[#F5F1EB] text-[#6B6B6B]"}
      `}
    >
      {label}
    </span>
  );
}
