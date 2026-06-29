# Mogodu Monday — Plan

A premium, mobile-first South African restaurant site with warm brown/gold/cream theme, 5 pages, persistent bookings, and a floating AI chatbot.

## Stack & defaults (decided for you)

- **TanStack Start** (already scaffolded), Tailwind v4, shadcn/ui
- **Lovable Cloud** for persisting bookings + contact messages
- **Lovable AI Gateway** (Gemini Flash) for the floating chatbot, with full menu/hours/location context in the system prompt
- **Order button** → opens WhatsApp with a prefilled message (`https://wa.me/...?text=...`)
- **Contact details** → realistic placeholders you can edit (Soweto address, +27 number, hello@mogodumonday.co.za)
- Hero/dish/gallery images **generated** with the image tool (warm, photographic, South African food)

## Design system (`src/styles.css`)

Tokens via `@theme`/`:root`:
- `--brand-brown` #5D4037, `--brand-gold` #D4AF37, `--brand-cream` #FDF6EC, `--brand-charcoal` #222
- Map to semantic shadcn tokens: `primary` = brown, `accent` = gold, `background` = cream/white, `foreground` = charcoal
- Fonts: **Playfair Display** (headings) + **Inter** (body), loaded via `<link>` in `__root.tsx`
- Soft shadows, `rounded-2xl` cards, glassmorphism on sticky nav (`backdrop-blur` + translucent cream)
- Reusable `animate-fade-in`, `hover-scale`, gold gradient button variant

## Routes (`src/routes/`)

- `index.tsx` — Home: hero, featured dishes, ratings, why-choose-us, hours, location teaser, CTA banner
- `menu.tsx` — Menu with search, category filter chips, sort by price/name, availability badges, Order→WhatsApp
- `booking.tsx` — Reservation form → saves to Cloud → success state
- `about.tsx` — Story, mission, vision, chefs, gallery, testimonials
- `contact.tsx` — Map embed placeholder, address, phone, WhatsApp CTA, email, hours, contact form, socials
- `__root.tsx` — sticky glass nav + footer + floating `<Chatbot />` mounted globally

Each route gets its own SEO `head()` (title, description, og:title, og:description).

## Components (`src/components/`)

- `layout/Navbar.tsx` (sticky, glass, mobile sheet menu)
- `layout/Footer.tsx`
- `home/Hero.tsx`, `FeaturedDishes.tsx`, `WhyUs.tsx`, `HoursLocation.tsx`, `CtaBanner.tsx`
- `menu/MenuCard.tsx`, `MenuFilters.tsx`, `AvailabilityBadge.tsx` (green/orange/red)
- `booking/BookingForm.tsx` (zod + react-hook-form validation)
- `about/Gallery.tsx`, `Testimonials.tsx`, `Chefs.tsx`
- `contact/ContactForm.tsx`, `MapEmbed.tsx`, `WhatsAppButton.tsx`
- `chatbot/Chatbot.tsx` — floating gold FAB, glass panel, AI SDK `useChat` → `/api/chat`

## Data

- `src/data/menu.ts` — typed array of all meals (Mogodu, Beef, Chicken, Traditional, Drinks) with name, description, price (ZAR), category, availability, image
- Generate ~8–10 hero/dish/gallery images via image tool, save under `src/assets/`

## Backend (Lovable Cloud)

Migration creates:
- `public.bookings` (id, name, phone, email, date, time, guests, requests, created_at) with grants + RLS allowing anon INSERT only
- `public.contact_messages` (id, name, email, message, created_at) same pattern

Booking + contact forms insert via the browser Supabase client.

## Chatbot

- `src/routes/api/chat.ts` — `streamText` with Gemini Flash, system prompt embedding menu data, hours, location, booking instructions
- Floating button bottom-right (gold, glass), opens a chat panel rendering `message.parts` with markdown
- Quick-reply chips: "View menu", "Book a table", "Opening hours"

## Verification

After build: visual check of home, menu filtering, booking submit → DB row, chatbot reply.

## Files to create/modify

New: ~25 component files, 5 routes, `data/menu.ts`, `api/chat.ts`, 1 migration, ~10 generated images, updated `styles.css` and `__root.tsx`.
