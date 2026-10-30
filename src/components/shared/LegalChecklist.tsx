import { ShieldCheck, FileCheck, Landmark, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ChecklistItem {
  title: string;
  desc: string;
  timeline: string;
  mandatory: boolean;
}

const items: ChecklistItem[] = [
  {
    title: "Registered 11-Month Leave & License",
    desc: "Maharashtra Rent Control Act compliant registered agreement with digital biometric verification and stamp duty payment.",
    timeline: "Before move-in",
    mandatory: true,
  },
  {
    title: "Mumbai Police Tenant Intimation",
    desc: "Official tenant police intimation filed via the Mumbai Police citizen portal or local police station.",
    timeline: "Within 7 days of moving in",
    mandatory: true,
  },
  {
    title: "Refundable Deposit Acknowledgement",
    desc: "Signed receipt documenting the security deposit, refund terms, and mutually agreed maintenance deductions.",
    timeline: "At signing",
    mandatory: true,
  },
  {
    title: "Society Move-In NOC & Elevator Booking",
    desc: "Intimation letter to society management committee along with any standard society shifting charge receipts.",
    timeline: "3 days before shifting",
    mandatory: false,
  },
];

export function LegalChecklist() {
  return (
    <Card className="border bg-card shadow-xs">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Maharashtra Rental Compliance Checklist</h3>
            <p className="text-[11px] text-muted-foreground">Key legal standards required for renting homes in Mumbai</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-3.5 rounded-xl border bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item.title}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${
                      item.mandatory
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.mandatory ? "Mandatory" : "Recommended"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Landmark className="h-2.5 w-2.5" />
                  Due: {item.timeline}
                </span>
                <span className="flex items-center gap-1 text-primary font-medium">
                  <FileCheck className="h-2.5 w-2.5" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

