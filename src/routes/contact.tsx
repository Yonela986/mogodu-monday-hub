import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { RESTAURANT } from "@/data/menu";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mogodu Monday" },
      { name: "description", content: "Visit Mogodu Monday in Orlando West, Soweto. Call, WhatsApp, email or drop us a message." },
      { property: "og:title", content: "Contact — Mogodu Monday" },
      { property: "og:description", content: "Get in touch with Mogodu Monday." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(2000),
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapsQuery = encodeURIComponent(RESTAURANT.address);
  const waLink = `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent("Hi Mogodu Monday!")}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      setError("Please fill in all fields correctly.");
      return;
    }
    setSending(true);
    const { error: insertError } = await supabase.from("contact_messages").insert(parsed.data);
    setSending(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSent(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Get in touch</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">We'd love to hear from you</h1>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Info */}
        <div className="space-y-4">
          <InfoCard icon={MapPin} title="Address" body={RESTAURANT.address} />
          <InfoCard icon={Phone} title="Phone" body={RESTAURANT.phone} href={`tel:${RESTAURANT.phone}`} />
          <InfoCard icon={Mail} title="Email" body={RESTAURANT.email} href={`mailto:${RESTAURANT.email}`} />
          <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-3xl bg-success p-5 text-white shadow-[var(--shadow-soft)] transition hover:opacity-90">
            <MessageCircle className="h-6 w-6" />
            <div>
              <p className="font-semibold">WhatsApp us</p>
              <p className="text-sm opacity-90">Tap to chat — replies within minutes</p>
            </div>
          </a>
          <div className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 text-primary">
              <Clock className="h-5 w-5" />
              <h3 className="font-display text-base font-semibold">Business hours</h3>
            </div>
            <ul className="mt-3 divide-y divide-border text-sm">
              {RESTAURANT.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-2.5">
                  <span className="font-medium">{h.day}</span>
                  <span className="text-muted-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <a href={RESTAURANT.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary transition hover:bg-accent hover:text-accent-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={RESTAURANT.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary transition hover:bg-accent hover:text-accent-foreground">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Map + form */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <iframe
              title="Map"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              loading="lazy"
              className="h-72 w-full"
            />
          </div>
          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <h2 className="font-display text-xl font-semibold">Send us a message</h2>
            <div className="mt-5 space-y-4">
              <input name="full_name" required placeholder="Full name" className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
              <input name="email" required type="email" placeholder="Email" className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
              <textarea name="message" required rows={5} placeholder="How can we help?" className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30" />
            </div>
            {error && <p className="mt-3 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
            {sent && <p className="mt-3 rounded-xl bg-success/10 px-4 py-3 text-sm text-success">Thanks! We'll get back to you shortly.</p>}
            <button
              type="submit"
              disabled={sending}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
            >
              {sending && <Loader2 className="h-4 w-4 animate-spin" />}
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, body, href }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string; href?: string }) {
  const inner = (
    <>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-0.5 text-sm font-medium text-foreground">{body}</p>
      </div>
    </>
  );
  const cls = "flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition hover:border-accent";
  return href ? <a href={href} className={cls}>{inner}</a> : <div className={cls}>{inner}</div>;
}
