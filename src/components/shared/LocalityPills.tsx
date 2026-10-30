import { Link } from "react-router-dom";
import { Train, MapPin } from "lucide-react";

interface Corridor {
  name: string;
  line: string;
  localities: string[];
}

const corridors: Corridor[] = [
  {
    name: "Western Line Transit Hubs",
    line: "Churchgate – Virar",
    localities: ["Andheri East", "Andheri West", "Bandra West", "Borivali West", "Goregaon East", "Malad West"],
  },
  {
    name: "Central Line Tech & Family Pockets",
    line: "CSMT – Kalyan",
    localities: ["Powai", "Thane West", "Mulund West", "Ghatkopar East", "Vikhroli East"],
  },
  {
    name: "South Central & Harbour Corridors",
    line: "Harbour & Monorail",
    localities: ["Lower Parel", "Dadar East", "Chembur"],
  },
];

export function LocalityPills() {
  return (
    <div className="space-y-6">
      {corridors.map((c) => (
        <div key={c.name} className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Train className="h-3.5 w-3.5 text-primary" />
              {c.name}
            </span>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono">
              {c.line}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {c.localities.map((loc) => (
              <Link
                key={loc}
                to={`/explore?locality=${encodeURIComponent(loc)}`}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-border bg-muted/40 hover:bg-accent hover:text-primary hover:border-primary/40 transition-colors"
              >
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span>{loc}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
