import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Star, Utensils, HeartHandshake, Soup } from "lucide-react";
import heroImg from "@/assets/hero-mogodu.jpg";
import { MENU, RESTAURANT, formatZAR } from "@/data/menu";
import { MenuCard } from "@/components/menu/MenuCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mogodu Monday — Authentic South African Cuisine in Soweto" },
      { name: "description", content: "Slow-cooked mogodu, beef stew, fried chicken and traditional South African favourites. Book your table at Mogodu Monday." },
      { property: "og:title", content: "Mogodu Monday — Authentic South African Cuisine" },
      { property: "og:description", content: "Slow-cooked mogodu and traditional South African favourites in the heart of Soweto." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = MENU.filter((m) => m.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" width={1600} height={1024} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal/85 via-brand-charcoal/55 to-brand-brown/70" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 pb-24 pt-20 text-primary-foreground sm:px-6 sm:pt-28 lg:px-8 lg:pb-32 lg:pt-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur animate-fade-in-up">
            Est. Soweto
          </span>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.05] text-balance sm:text-6xl lg:text-7xl animate-fade-in-up">
            Mogodu Monday
            <span className="mt-2 block bg-[image:var(--gradient-gold)] bg-clip-text text-transparent">
              Slow-cooked. Soulful.
            </span>
          </h1>
          <p className="max-w-xl text-lg text-primary-foreground/85 animate-fade-in-up">
            {RESTAURANT.tagline}. From simmering pots to your table — a taste of home in every bite.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in-up">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-sm font-semibold text-brand-charcoal shadow-[var(--shadow-elevated)] transition hover:scale-[1.03]"
            >
              View Menu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition hover:bg-white/20"
            >
              Book a Table
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-accent">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span>4.9 · 320+ guest reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> Orlando West, Soweto
            </div>
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tasting favourites</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">Loved by our regulars</h2>
          </div>
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((m) => <MenuCard key={m.id} item={m} />)}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why Mogodu Monday</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">A taste worth the trip</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Soup, title: "Slow-cooked tradition", body: "Recipes passed down through generations, simmered the way they should be." },
              { icon: Utensils, title: "Fresh, local ingredients", body: "We source meat and produce from trusted local suppliers, daily." },
              { icon: HeartHandshake, title: "Warm hospitality", body: "Every guest is family. Expect a friendly welcome and a full plate." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & location */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 text-primary">
              <Clock className="h-5 w-5" />
              <h3 className="font-display text-xl font-semibold">Opening hours</h3>
            </div>
            <ul className="mt-5 divide-y divide-border">
              {RESTAURANT.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium">{h.day}</span>
                  <span className="text-muted-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 text-primary">
              <MapPin className="h-5 w-5" />
              <h3 className="font-display text-xl font-semibold">Find us</h3>
            </div>
            <p className="mt-5 text-base text-foreground">{RESTAURANT.address}</p>
            <p className="mt-2 text-sm text-muted-foreground">Easy parking. Walk-ins welcome.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${RESTAURANT.phone}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Call {RESTAURANT.phone}
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-semibold hover:bg-secondary">
                Get directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials sample */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Thandi M.", quote: "Best mogodu in Soweto, hands down. The pap is creamy perfection." },
            { name: "Sipho K.", quote: "Generous portions, warm staff, and prices that respect the customer." },
            { name: "Lerato D.", quote: "Felt like Sunday lunch at gogo's. We'll be back every Monday." },
          ].map((t) => (
            <figure key={t.name} className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex gap-0.5 text-accent">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-sm text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-warm)] p-10 text-primary-foreground sm:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-xl font-display text-3xl font-bold sm:text-4xl">Hungry already? Reserve your table.</h2>
              <p className="mt-3 max-w-xl text-primary-foreground/80">From cosy two-seaters to long family tables — we'll save your spot, plate ready.</p>
            </div>
            <Link to="/booking" className="inline-flex items-center gap-2 self-start rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-sm font-semibold text-brand-charcoal shadow-[var(--shadow-elevated)] transition hover:scale-[1.03] md:self-center">
              Book a table now {formatZAR(0).replace("R0", "")}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
