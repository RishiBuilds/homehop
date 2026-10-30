import { useState, useEffect, useRef, useCallback } from "react";
import { formatCurrency } from "@/lib/utils";

interface BudgetSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
}

export function BudgetSlider({
  value,
  min = 5000,
  max = 200000,
  step = 1000,
  onChange,
  label = "Max Budget",
}: BudgetSliderProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      setLocalValue(v);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onChange(v), 120);
    },
    [onChange]
  );

  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground">{label}</label>
        <span className="text-sm font-extrabold text-primary tabular-nums">
          {localValue === max ? `${formatCurrency(max)}+` : formatCurrency(localValue)}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={localValue}
          aria-valuetext={formatCurrency(localValue)}
        />
        <div
          className="absolute h-4 w-4 rounded-full bg-primary border-2 border-white shadow-md pointer-events-none"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{formatCurrency(min)}</span>
        <span>{formatCurrency(max)}+</span>
      </div>
    </div>
  );
}

