import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { MENU, CATEGORIES, type Category } from "@/data/menu";
import { MenuCard } from "@/components/menu/MenuCard";

type Sort = "name-asc" | "price-asc" | "price-desc";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Mogodu Monday" },
      { name: "description", content: "Explore our Mogodu, Beef, Chicken, Traditional dishes and drinks. Fresh, slow-cooked South African flavour." },
      { property: "og:title", content: "Menu — Mogodu Monday" },
      { property: "og:description", content: "Mogodu, beef, chicken, traditional dishes and drinks — straight from Soweto." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("name-asc");

  const items = useMemo(() => {
    let list = MENU.slice();
    if (cat !== "All") list = list.filter((m) => m.category === cat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [query, cat, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our menu</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Slow-cooked. Honestly priced.</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          From signature mogodu to chakalaka, every plate is made fresh in our kitchen.
        </p>
      </header>

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          >
            <option value="name-asc">Sort: Name (A–Z)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "border border-border bg-card text-foreground hover:border-accent"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => <MenuCard key={m.id} item={m} />)}
      </div>

      {items.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">No dishes match your search.</p>
      )}
    </div>
  );
}
