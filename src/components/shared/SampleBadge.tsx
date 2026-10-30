import { Badge } from "@/components/ui/badge";

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <Badge
      variant="secondary"
      className={`border-amber-200 bg-amber-50 text-amber-800 text-[11px] font-medium tracking-wide ${className}`}
    >
      Sample Listing
    </Badge>
  );
}
