import { Compass, Briefcase, Cpu, IndianRupee, TrainFront, Users } from "lucide-react";

export interface CommuterPreset {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Compass;
  params: {
    locality?: string;
    station?: string;
    type?: string;
    maxBudget?: string;
    bedrooms?: string;
  };
}

export const COMMUTER_PRESETS: CommuterPreset[] = [
  {
    id: "bkc",
    title: "BKC Finance Hub",
    subtitle: "Bandra & Kurla transit corridors",
    icon: Briefcase,
    params: {
      locality: "Bandra West",
    },
  },
  {
    id: "powai",
    title: "Powai Tech Corridor",
    subtitle: "IIT Bombay & Hiranandani offices",
    icon: Cpu,
    params: {
      locality: "Powai",
    },
  },
  {
    id: "budget-suburbs",
    title: "Suburban Value Homes",
    subtitle: "Thane & Borivali under ₹30k",
    icon: IndianRupee,
    params: {
      locality: "Thane West",
      maxBudget: "30000",
    },
  },
  {
    id: "western-express",
    title: "Western Line Direct",
    subtitle: "Andheri & Goregaon hubs",
    icon: TrainFront,
    params: {
      locality: "Andheri East",
    },
  },
  {
    id: "pg-coliving",
    title: "PG & Co-Living",
    subtitle: "Furnished student & starter pads",
    icon: Users,
    params: {
      type: "pg",
    },
  },
];

interface CommuterPresetsProps {
  onApplyPreset: (params: CommuterPreset["params"]) => void;
  activePresetId?: string;
}

export function CommuterPresets({ onApplyPreset, activePresetId }: CommuterPresetsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
        <Compass className="h-3.5 w-3.5 text-primary" />
        <span>Commuter Hub Presets</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {COMMUTER_PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.params)}
              className={`text-left p-2.5 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card hover:bg-accent border-border text-foreground hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                <span className="font-bold text-[11px] truncate">{preset.title}</span>
              </div>
              <p className={`text-[10px] leading-tight ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {preset.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

