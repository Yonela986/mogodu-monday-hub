import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { RESTAURANT } from "@/data/menu";

export function Footer() {
  return (
    <footer className="mt-24 bg-[oklch(0.22_0.025_40)] text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl font-bold text-accent">Mogodu Monday</h3>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/70">
            Authentic South African cooking, served with warmth from our kitchen to your table — every Monday and beyond.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={RESTAURANT.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-accent hover:text-accent-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={RESTAURANT.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-accent hover:text-accent-foreground">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-accent">Visit</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {RESTAURANT.address}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {RESTAURANT.phone}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {RESTAURANT.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base font-semibold text-accent">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { to: "/menu", l: "Menu" },
              { to: "/booking", l: "Book a table" },
              { to: "/about", l: "Our story" },
              { to: "/contact", l: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/80 transition hover:text-accent">{l.l}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-primary-foreground/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Mogodu Monday. Made with love in Soweto.
        </p>
      </div>
    </footer>
  );
}
