import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { RESTAURANT } from "@/data/menu";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Table — Mogodu Monday" },
      { name: "description", content: "Reserve your table at Mogodu Monday. Quick, easy online booking for any day of the week." },
      { property: "og:title", content: "Book a Table — Mogodu Monday" },
      { property: "og:description", content: "Reserve your table at Mogodu Monday in Soweto." },
    ],
  }),
  component: BookingPage,
});

const today = new Date().toISOString().slice(0, 10);

const schema = z.object({
  full_name: z.string().trim().min(1, "Required").max(120),
  phone: z.string().trim().min(5, "Required").max(30),
  email: z.string().trim().email("Invalid email").max(254),
  booking_date: z.string().min(1, "Required"),
  booking_time: z.string().min(1, "Required"),
  guests: z.coerce.number().int().min(1).max(50),
  special_requests: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function BookingPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fe: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormErrors;
        fe[k] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      booking_date: parsed.data.booking_date,
      booking_time: parsed.data.booking_time,
      guests: parsed.data.guests,
      special_requests: parsed.data.special_requests || null,
    });
    setSubmitting(false);
    if (error) {
      setServerError(error.message);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-success/15 text-success">
          <CalendarCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Reservation received</h1>
        <p className="mt-3 text-muted-foreground">
          Your reservation has been received. We look forward to serving you.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          A team member will confirm on {RESTAURANT.phone}.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Reserve a table</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Save your seat</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Fill in your details below and we'll have your table ready.
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" name="full_name" error={errors.full_name} required />
          <Field label="Phone number" name="phone" type="tel" error={errors.phone} required />
          <Field label="Email" name="email" type="email" error={errors.email} required className="sm:col-span-2" />
          <Field label="Date" name="booking_date" type="date" defaultValue={today} min={today} error={errors.booking_date} required />
          <Field label="Time" name="booking_time" type="time" defaultValue="18:00" error={errors.booking_time} required />
          <Field label="Number of guests" name="guests" type="number" min={1} max={50} defaultValue={2} error={errors.guests} required />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Special requests</label>
            <textarea
              name="special_requests"
              rows={4}
              maxLength={1000}
              placeholder="Allergies, occasions, seating preferences…"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {serverError && (
          <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Reserve Table
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  className = "",
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}{required && <span className="text-destructive"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 ${
          error ? "border-destructive" : "border-input"
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
