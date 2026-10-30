import { useState } from "react";
import { Building, PlusCircle, CheckCircle2, ShieldAlert, KeyRound, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PageContainer } from "@/components/shared/PageContainer";

const propertyTypes = [
  { value: "1rk", label: "1 RK" },
  { value: "1bhk", label: "1 BHK" },
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
  { value: "pg", label: "PG / Co-Living" },
  { value: "room", label: "Private Room" },
];

export default function OwnerPortal() {
  const [locality, setLocality] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [type, setType] = useState("1bhk");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!locality || !rent) return;
    setSubmitted(true);
  }

  return (
    <div className="py-12 bg-background min-h-screen">
      <PageContainer>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Portal Prototype</span>
            <span className="text-xs text-muted-foreground">• Public Preview</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Property Owner Portal
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                List your Mumbai apartment, room, or PG with full control over deposit rules and tenant preferences.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 mb-8 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Placeholder Route (Public Foundation Phase)</p>
            <p className="mt-0.5 leading-relaxed">
              Full landlord identity verification, OTP login, and live listing publishing will be unlocked in upcoming phases.
              Test the prototype listing submission below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-2xl border bg-card p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <PlusCircle className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Post a Rental Listing (Prototype)</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-6">
              Enter your property details below to see how HomeHop structures pricing and deposit disclosures.
            </p>

            {submitted ? (
              <div className="rounded-xl border border-primary/20 bg-accent p-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground text-base">Listing Draft Created</h3>
                <p className="mt-1.5 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Your draft for <strong className="text-foreground">{type.toUpperCase()}</strong> in{" "}
                  <strong className="text-foreground">{locality}</strong> at{" "}
                  <strong className="text-foreground">₹{rent}/month</strong> has been formatted according to HomeHop standards.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setLocality("");
                    setRent("");
                    setDeposit("");
                  }}
                >
                  Create Another Draft
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="owner-type" className="block text-xs font-medium text-foreground mb-1">
                      Configuration
                    </label>
                    <Select
                      id="owner-type"
                      options={propertyTypes}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="owner-locality" className="block text-xs font-medium text-foreground mb-1">
                      Mumbai Suburb / Locality
                    </label>
                    <Input
                      id="owner-locality"
                      placeholder="e.g. Powai, Hiranandani"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="owner-rent" className="block text-xs font-medium text-foreground mb-1">
                      Monthly Rent Expected (₹)
                    </label>
                    <Input
                      id="owner-rent"
                      type="number"
                      placeholder="e.g. 35000"
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="owner-deposit" className="block text-xs font-medium text-foreground mb-1">
                      Security Deposit Demanded (₹)
                    </label>
                    <Input
                      id="owner-deposit"
                      type="number"
                      placeholder="e.g. 70000"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Format & Preview Listing
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-5 shadow-xs">
              <h3 className="font-bold text-sm text-foreground mb-2 flex items-center gap-1.5">
                <KeyRound className="h-4 w-4 text-primary" />
                Why Owners List on HomeHop
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>Zero upfront listing fees or subscription costs</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>Verified tenant inquiries filtered for serious movers</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>Assisted site visits coordinated with society security</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>Standard police verification & digital leave-and-license support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

