import { useState } from "react";
import { TrendingUp, Percent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function RentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(12000000);
  const [expectedRent, setExpectedRent] = useState<number>(35000);

  const annualRent = expectedRent * 12;
  const grossYield = propertyValue > 0 ? ((annualRent / propertyValue) * 100).toFixed(2) : "0.00";

  return (
    <Card className="border bg-card shadow-xs">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Mumbai Rental Yield Estimator</h3>
            <p className="text-[11px] text-muted-foreground">Calculate annual return on residential investment</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="yield-property-val" className="block text-xs font-medium text-foreground mb-1">
              Estimated Property Value (₹)
            </label>
            <Input
              id="yield-property-val"
              type="number"
              step="500000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value) || 0)}
              className="h-9 text-xs"
            />
          </div>

          <div>
            <label htmlFor="yield-expected-rent" className="block text-xs font-medium text-foreground mb-1">
              Expected Monthly Rent (₹)
            </label>
            <Input
              id="yield-expected-rent"
              type="number"
              step="2000"
              value={expectedRent}
              onChange={(e) => setExpectedRent(Number(e.target.value) || 0)}
              className="h-9 text-xs"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 p-3 rounded-xl bg-accent border border-primary/20 text-center">
          <div>
            <span className="text-[10px] text-muted-foreground block font-medium">Annual Rental Income</span>
            <p className="text-sm font-bold text-foreground mt-0.5">{formatCurrency(annualRent)}</p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground block font-medium">Gross Rental Yield</span>
            <p className="text-sm font-extrabold text-primary mt-0.5 flex items-center justify-center gap-0.5">
              <span>{grossYield}</span>
              <Percent className="h-3 w-3" />
            </p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground block font-medium">Mumbai Benchmark</span>
            <p className="text-xs font-semibold text-muted-foreground mt-1">2.5% – 3.8%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
