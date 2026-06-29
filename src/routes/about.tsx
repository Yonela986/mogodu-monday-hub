import { createFileRoute } from "@tanstack/react-router";
import { Heart, Sparkles, Star, Users } from "lucide-react";
import interior from "@/assets/gallery-interior.jpg";
import dishMogodu from "@/assets/dish-mogodu.jpg";
import dishBeef from "@/assets/dish-beef.jpg";
import dishChicken from "@/assets/dish-chicken.jpg";
import dishSamp from "@/assets/dish-samp.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mogodu Monday" },
      { name: "description", content: "The story, mission and team behind Soweto's beloved mogodu kitchen." },
      { property: "og:title", content: "About — Mogodu Monday" },
      { property: "og:description", content: "Family-run, slow-cooked, proudly South African." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our story</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">A pot of memories, simmered in Soweto</h1>
          <p className="mt-4 text-muted-foreground">
            Mogodu Monday started in 2014 from a small kitchen on Vilakazi Street, where Mama Lerato cooked the mogodu she had eaten as a child every Monday. Word spread fast, and what began as a weekly tradition is today a beloved gathering place for families, friends and travellers.
          </p>
        </div>
        <img src={interior} alt="Inside the restaurant" loading="lazy" width={1200} height={800} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[var(--shadow-elevated)]" />
      </header>

      <section className="mt-20 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><Heart className="h-5 w-5" /></div>
          <h2 className="mt-5 font-display text-2xl font-semibold">Our mission</h2>
          <p className="mt-3 text-muted-foreground">
            To preserve and celebrate traditional South African cooking — one slow-simmered pot, one welcoming table at a time.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground"><Sparkles className="h-5 w-5" /></div>
          <h2 className="mt-5 font-display text-2xl font-semibold">Our vision</h2>
          <p className="mt-3 text-muted-foreground">
            To be Africa's most-loved destination for authentic township cuisine, served with pride and warmth.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Meet the team</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Our chefs</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Mama Lerato", role: "Founder & Head Chef", bio: "30+ years perfecting mogodu the old way." },
            { name: "Chef Sipho", role: "Sous Chef", bio: "Master of the braai pit and our grilled meats." },
            { name: "Chef Naledi", role: "Pastry & Sides", bio: "Pap, dumplings, chakalaka — all made by hand." },
          ].map((c) => (
            <article key={c.name} className="rounded-3xl border border-border bg-card p-6 text-center shadow-[var(--shadow-soft)]">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[image:var(--gradient-warm)] font-display text-2xl font-bold text-accent">
                {c.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{c.name}</h3>
              <p className="text-sm text-accent">{c.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Inside the kitchen</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Gallery</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[interior, dishMogodu, dishBeef, dishChicken, dishSamp].slice(0, 4).map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]" />
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl bg-[image:var(--gradient-warm)] p-10 text-primary-foreground sm:p-14">
        <div className="flex items-center gap-3 text-accent"><Users className="h-5 w-5" /><span className="text-xs font-semibold uppercase tracking-[0.2em]">Testimonials</span></div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { q: "I came for the mogodu and stayed for the love.", n: "Naledi K." },
            { q: "Tastes exactly like home. Plates always come back empty.", n: "Mandla R." },
            { q: "The warmest welcome in Soweto. Don't miss it.", n: "Anesu T." },
          ].map((t) => (
            <figure key={t.n} className="rounded-2xl bg-white/5 p-6 backdrop-blur">
              <div className="flex gap-0.5 text-accent">{[0,1,2,3,4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-3 text-sm">"{t.q}"</blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-wider text-primary-foreground/70">— {t.n}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
