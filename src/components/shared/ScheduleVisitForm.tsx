import { useState } from "react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface ScheduleVisitFormProps {
  propertyReferenceId: string;
  propertyTitle: string;
}

const timeSlotOptions = [
  { value: "morning", label: "Morning (10:00 AM – 1:00 PM)" },
  { value: "afternoon", label: "Afternoon (1:00 PM – 4:00 PM)" },
  { value: "evening", label: "Evening (4:00 PM – 7:30 PM)" },
];

export function ScheduleVisitForm({ propertyReferenceId, propertyTitle }: ScheduleVisitFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; date?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const nextErrors: { name?: string; phone?: string; date?: string } = {};
    if (!name.trim()) nextErrors.name = "Name is required";
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      nextErrors.phone = "Enter a valid 10-digit Indian phone number";
    }
    if (!date) nextErrors.date = "Please select a preferred date";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  const minDate = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-accent p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-3" />
        <h4 className="font-semibold text-foreground text-base">Visit Request Confirmed</h4>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          Your visit request for <strong className="text-foreground">{propertyTitle}</strong> (
          <span className="font-mono">{propertyReferenceId}</span>) is scheduled for{" "}
          <strong className="text-foreground">{date}</strong> during the{" "}
          <strong className="text-foreground">{timeSlot}</strong> slot.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          We will confirm via WhatsApp/SMS to <span className="font-mono">{phone}</span> 2 hours prior to the visit.
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground bg-card/60 p-2 rounded border border-border">
          Note: This is a prototype interface. No live visit coordinator was dispatched.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setPhone("");
            setDate("");
          }}
        >
          Schedule Another Time
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      <div>
        <label htmlFor="visit-name" className="block text-xs font-medium text-foreground mb-1">
          Full Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="visit-name"
          type="text"
          placeholder="e.g. Priya Patil"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="visit-phone" className="block text-xs font-medium text-foreground mb-1">
          WhatsApp / Mobile Number <span className="text-destructive">*</span>
        </label>
        <Input
          id="visit-phone"
          type="tel"
          placeholder="10-digit mobile number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
          }}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="visit-date" className="block text-xs font-medium text-foreground mb-1">
            Preferred Date <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Input
              id="visit-date"
              type="date"
              min={minDate}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              aria-invalid={!!errors.date}
            />
          </div>
          {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="visit-slot" className="block text-xs font-medium text-foreground mb-1">
            Time Window
          </label>
          <Select
            id="visit-slot"
            options={timeSlotOptions}
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="visit-notes" className="block text-xs font-medium text-foreground mb-1">
          Special Notes or Questions <span className="text-xs text-muted-foreground">(Optional)</span>
        </label>
        <textarea
          id="visit-notes"
          rows={2}
          placeholder="e.g. Need to check two-wheeler parking or vegetarian building rules"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="flex w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <Button type="submit" className="w-full gap-2">
        <Calendar className="h-4 w-4" />
        <span>Request Site Visit</span>
      </Button>

      <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1">
        <Clock className="h-3 w-3" />
        Visits typically confirmed within 2 hours during daytime.
      </p>
    </form>
  );
}

