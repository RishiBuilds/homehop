import { Train } from "lucide-react";

interface TransitDistanceBadgeProps {
  station: string;
  className?: string;
}

export function TransitDistanceBadge({ station, className = "" }: TransitDistanceBadgeProps) {
  let line = "Suburban Line";
  const stLower = station.toLowerCase();

  if (stLower.includes("harbour") || stLower.includes("chembur")) {
    line = "Harbour Line";
  } else if (
    stLower.includes("thane") ||
    stLower.includes("mulund") ||
    stLower.includes("ghatkopar") ||
    stLower.includes("vikhroli") ||
    stLower.includes("kanjurmarg")
  ) {
    line = "Central Line";
  } else if (
    stLower.includes("andheri") ||
    stLower.includes("bandra") ||
    stLower.includes("borivali") ||
    stLower.includes("malad") ||
    stLower.includes("goregaon") ||
    stLower.includes("kandivali")
  ) {
    line = "Western Line";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70 ${className}`}
    >
      <Train className="h-3 w-3 text-emerald-600 shrink-0" />
      <span>Near {station} ({line})</span>
    </span>
  );
}

