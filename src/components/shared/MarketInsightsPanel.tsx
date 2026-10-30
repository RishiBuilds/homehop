import { TrendingUp, Home, IndianRupee } from "lucide-react";
import type { MarketInsights } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface MarketInsightsPanelProps {
  insights: MarketInsights;
  maxBudget?: number;
}

export function MarketInsightsPanel({ insights, maxBudget }: MarketInsightsPanelProps) {
  if (insights.count === 0) return null;

  return (
    <div className="rounded-xl border bg-card p-4 shadow-xs mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-bold text-foreground">Market Snapshot</span>
        </div>
        <span className="text-[10px] text-muted-foreground bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded font-medium">
          {insights.count} sample listing{insights.count !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-medium">Avg Rent</p>
          <p className="text-sm font-extrabold text-foreground mt-0.5">{formatCurrency(insights.avgRent)}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-medium">Min</p>
          <p className="text-sm font-bold text-primary mt-0.5">{formatCurrency(insights.minRent)}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground font-medium">Max</p>
          <p className="text-sm font-bold text-foreground mt-0.5">{formatCurrency(insights.maxRent)}</p>
        </div>
      </div>

      {maxBudget && maxBudget > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Home className="h-3 w-3" />
              In your budget
            </span>
            <span className="font-bold text-foreground">
              {insights.inBudgetCount} of {insights.count}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${insights.budgetPercentile}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <IndianRupee className="h-2.5 w-2.5" />
            <span>Budget: {formatCurrency(maxBudget)}/mo</span>
            <span className="ml-auto text-primary font-medium">{insights.budgetPercentile}% fit</span>
          </div>
        </div>
      )}
    </div>
  );
}

