import { useState } from "react";
import { MessageCircle, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/shared/PageContainer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const phoneEnv = import.meta.env.VITE_WHATSAPP_NUMBER ?? "919876543210";
  const whatsAppDirectUrl = `https://wa.me/${phoneEnv}?text=${encodeURIComponent("Hi HomeHop Team, I need assistance with rentals in Mumbai.")}`;

  function validate() {
    const next: { name?: string; phone?: string; message?: string } = {};
    if (!name.trim()) next.name = "Name is required";
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      next.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      next.phone = "Enter a valid 10-digit Indian phone number";
    }
    if (!message.trim()) next.message = "Message cannot be empty";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  return (
    <div className="py-12 sm:py-16 bg-background">
      <PageContainer>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Get In Touch</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Contact HomeHop Mumbai
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Need help listing your property, scheduling accompanied visits, or clarifying brokerage terms?
            We are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-5 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-foreground">WhatsApp Direct Support</h2>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Fastest way to get answers regarding property references and owner contact.
                  </p>
                  <a
                    href={whatsAppDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block"
                  >
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs gap-1.5">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-foreground">Email Support</h2>
                  <p className="mt-1 text-xs text-muted-foreground">help@homehop.in</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Response within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-foreground">Mumbai Office</h2>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Bandra Kurla Complex (BKC), G Block, Bandra East, Mumbai, Maharashtra 400051
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border bg-card p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-foreground mb-1">Send a Message</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Fill out the form below and our Mumbai team will reach back shortly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-accent rounded-xl border border-primary/20">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-base font-bold text-foreground">Message Received</h3>
                <p className="mt-2 text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-foreground">{name}</strong>. Your message has been noted.
                  We will contact you at <span className="font-mono">{phone}</span>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-foreground mb-1">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Amit Kulkarni"
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
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-foreground mb-1">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contact-phone"
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
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-foreground mb-1">
                    Email Address <span className="text-xs text-muted-foreground">(Optional)</span>
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="e.g. amit@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-foreground mb-1">
                    How can we help you? <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Describe your query, locality requirements, or listing assistance..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    className="flex w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto gap-2">
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
