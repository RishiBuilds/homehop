import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EnquiryFormProps {
  propertyReferenceId: string;
  propertyTitle: string;
}

export function EnquiryForm({ propertyReferenceId, propertyTitle }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    `Hi, I am interested in ${propertyTitle} (Ref: ${propertyReferenceId}). Please share availability and visit options.`
  );
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const nextErrors: { name?: string; phone?: string; email?: string } = {};
    if (!name.trim()) {
      nextErrors.name = "Full name is required";
    }
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      nextErrors.phone = "Enter a valid 10-digit Indian phone number (e.g. 9876543210)";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-accent p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-3" />
        <h4 className="font-semibold text-foreground text-base">Enquiry Sent Successfully</h4>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          Thank you, <strong className="text-foreground">{name}</strong>. Your enquiry for{" "}
          <span className="font-mono">{propertyReferenceId}</span> has been received. Our team or the
          assigned broker will reach out on <span className="font-mono">{phone}</span>.
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground bg-card/60 p-2 rounded border border-border">
          Note: This is a prototype interface. No live server enquiry was stored.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setPhone("");
            setEmail("");
          }}
        >
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      <div>
        <label htmlFor="enquiry-name" className="block text-xs font-medium text-foreground mb-1">
          Full Name <span className="text-destructive">*</span>
        </label>
        <Input
          id="enquiry-name"
          type="text"
          placeholder="e.g. Rahul Sharma"
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
        <label htmlFor="enquiry-phone" className="block text-xs font-medium text-foreground mb-1">
          WhatsApp / Mobile Number <span className="text-destructive">*</span>
        </label>
        <Input
          id="enquiry-phone"
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

      <div>
        <label htmlFor="enquiry-email" className="block text-xs font-medium text-foreground mb-1">
          Email Address <span className="text-xs text-muted-foreground">(Optional)</span>
        </label>
        <Input
          id="enquiry-email"
          type="email"
          placeholder="e.g. rahul@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="enquiry-message" className="block text-xs font-medium text-foreground mb-1">
          Message
        </label>
        <textarea
          id="enquiry-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <Button type="submit" className="w-full gap-2">
        <Send className="h-4 w-4" />
        <span>Submit Enquiry</span>
      </Button>

      <p className="text-[11px] text-muted-foreground text-center">
        No login required. We protect your privacy and never spam.
      </p>
    </form>
  );
}

