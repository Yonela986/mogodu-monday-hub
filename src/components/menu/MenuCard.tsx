import { ShoppingBag } from "lucide-react";
import { type MenuItem, RESTAURANT, formatZAR } from "@/data/menu";
import { AvailabilityBadge } from "./AvailabilityBadge";

export function MenuCard({ item }: { item: MenuItem }) {
  const soldOut = item.availability === "sold-out";
  const waText = encodeURIComponent(`Hi Mogodu Monday! I'd like to order: ${item.name} (${formatZAR(item.price)}).`);
  const orderUrl = `https://wa.me/${RESTAURANT.whatsapp}?text=${waText}`;

  return (
    <article className="hover-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <AvailabilityBadge status={item.availability} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
          <span className="shrink-0 rounded-full bg-secondary px-3 py-1 font-display text-base font-bold text-primary">
            {formatZAR(item.price)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <a
          href={soldOut ? undefined : orderUrl}
          target="_blank"
          rel="noreferrer"
          aria-disabled={soldOut}
          onClick={(e) => soldOut && e.preventDefault()}
          className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
            soldOut
              ? "cursor-not-allowed bg-muted text-muted-foreground"
              : "bg-primary text-primary-foreground hover:scale-[1.02] hover:bg-primary/90"
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          {soldOut ? "Unavailable" : "Order via WhatsApp"}
        </a>
      </div>
    </article>
  );
}
