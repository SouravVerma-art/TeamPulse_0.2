interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accentPct?: number;
}

export function StatCard({ label, value, sub, accentPct }: StatCardProps) {
  return (
    <div
      className="bg-white border border-[#E5DED5] p-6 hover:border-[#C8BFB5] transition-all duration-200"
      style={{ borderRadius: 16 }}
    >
      <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B] mb-3 font-medium">
        {label}
      </p>
      <p className="text-3xl font-bold text-[#1F1F1F] mb-1">{value}</p>
      {sub && <p className="text-sm text-[#6B6B6B]">{sub}</p>}
      {accentPct !== undefined && (
        <div
          className="mt-4 h-[3px] bg-[#F0EBE3]"
          style={{ borderRadius: 2 }}
        >
          <div
            className="h-[3px] bg-[#BFE7C6]"
            style={{
              width: `${accentPct}%`,
              borderRadius: 2,
              transition: "width 1s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}
