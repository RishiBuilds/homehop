import { useState } from "react";
import { Calculator, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function RentAffordabilityCalculator() {
  const [salary, setSalary] = useState<number>(75000);

  const recommendedRent = Math.round(salary * 0.3);
  const stretchRent = Math.round(salary * 0.4);
  const estimatedDeposit = recommendedRent * 2;
  const estimatedBrokerage = Math.round(recommendedRent * 0.5);
  const estimatedUpfront = recommendedRent + estimatedDeposit + estimatedBrokerage;

  return (
    <Card className="border-primary/20 bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Mumbai Rent Affordability Guide</h3>
            <p className="text-[11px] text-muted-foreground">Based on the standard 30% take-home income rule</p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="calculator-salary" className="block text-xs font-medium text-foreground mb-1">
              Monthly In-Hand Income (₹)
            </label>
            <Input
              id="calculator-salary"
              type="number"
              step="5000"
              min="15000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value) || 0)}
              className="h-10 text-sm font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl bg-accent p-3 border border-primary/20">
              <span className="text-[10px] text-muted-foreground block font-medium">Safe Rent (30%)</span>
              <p className="text-base font-bold text-primary mt-0.5">{formatCurrency(recommendedRent)}</p>
              <span className="text-[10px] text-muted-foreground">Ideal budget</span>
            </div>

            <div className="rounded-xl bg-muted/50 p-3 border border-border">
              <span className="text-[10px] text-muted-foreground block font-medium">Max Stretch (40%)</span>
              <p className="text-base font-bold text-foreground mt-0.5">{formatCurrency(stretchRent)}</p>
              <span className="text-[10px] text-muted-foreground">Upper limit</span>
            </div>

            <div className="rounded-xl bg-muted/50 p-3 border border-border">
              <span className="text-[10px] text-muted-foreground block font-medium">Est. 2-Mo Deposit</span>
              <p className="text-base font-bold text-foreground mt-0.5">{formatCurrency(estimatedDeposit)}</p>
              <span className="text-[10px] text-muted-foreground">Refundable</span>
            </div>

            <div className="rounded-xl bg-muted/50 p-3 border border-border">
              <span className="text-[10px] text-muted-foreground block font-medium">Est. Total Upfront</span>
              <p className="text-base font-bold text-primary mt-0.5">{formatCurrency(estimatedUpfront)}</p>
              <span className="text-[10px] text-muted-foreground">Rent + Dep + Brok</span>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-3 border border-border/60 text-xs text-muted-foreground flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              In Mumbai, landlords typically expect 2 to 3 months of rent as security deposit. Ensure your initial savings
              account covers at least <strong className="text-foreground">{formatCurrency(estimatedUpfront)}</strong> before scheduling in-person visits.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
