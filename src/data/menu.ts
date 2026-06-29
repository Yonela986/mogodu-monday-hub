import dishMogodu from "@/assets/dish-mogodu.jpg";
import dishBeef from "@/assets/dish-beef.jpg";
import dishChicken from "@/assets/dish-chicken.jpg";
import dishSamp from "@/assets/dish-samp.jpg";

export type Availability = "available" | "limited" | "sold-out";
export type Category = "Mogodu" | "Beef" | "Chicken" | "Traditional" | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // ZAR
  category: Category;
  availability: Availability;
  image: string;
  featured?: boolean;
}

export const CATEGORIES: Category[] = ["Mogodu", "Beef", "Chicken", "Traditional", "Drinks"];

export const MENU: MenuItem[] = [
  // Mogodu
  { id: "plain-mogodu", name: "Plain Mogodu", description: "Slow-cooked tender tripe in a rich, savoury house broth.", price: 70, category: "Mogodu", availability: "available", image: dishMogodu, featured: true },
  { id: "mogodu-pap", name: "Mogodu & Pap", description: "Our signature mogodu served with creamy white pap.", price: 85, category: "Mogodu", availability: "available", image: dishMogodu, featured: true },
  { id: "mogodu-dumplings", name: "Mogodu & Dumplings", description: "Tripe stew topped with fluffy steamed dumplings.", price: 95, category: "Mogodu", availability: "limited", image: dishMogodu },
  { id: "mogodu-deluxe", name: "Mogodu Deluxe", description: "Premium platter with mogodu, pap, dumplings & chakalaka.", price: 120, category: "Mogodu", availability: "available", image: dishMogodu, featured: true },

  // Beef
  { id: "beef-stew", name: "Beef Stew", description: "Slow-braised beef in a hearty tomato & onion gravy.", price: 95, category: "Beef", availability: "available", image: dishBeef, featured: true },
  { id: "grilled-steak", name: "Grilled Steak", description: "Flame-grilled rump steak with monkey-gland sauce.", price: 145, category: "Beef", availability: "limited", image: dishBeef },
  { id: "beef-curry", name: "Beef Curry", description: "Aromatic Durban-style curry with soft potatoes.", price: 105, category: "Beef", availability: "available", image: dishBeef },

  // Chicken
  { id: "fried-chicken", name: "Fried Chicken", description: "Golden, crispy fried chicken seasoned just right.", price: 80, category: "Chicken", availability: "available", image: dishChicken, featured: true },
  { id: "grilled-chicken", name: "Grilled Chicken", description: "Peri-peri marinated grilled chicken with lemon.", price: 90, category: "Chicken", availability: "available", image: dishChicken },
  { id: "chicken-curry", name: "Chicken Curry", description: "Mild, fragrant chicken curry served with rice.", price: 90, category: "Chicken", availability: "available", image: dishChicken },

  // Traditional
  { id: "samp-beans", name: "Samp & Beans", description: "Umngqusho — slow-cooked samp and sugar beans.", price: 65, category: "Traditional", availability: "available", image: dishSamp },
  { id: "pap-chakalaka", name: "Pap & Chakalaka", description: "Creamy pap with spicy vegetable chakalaka.", price: 55, category: "Traditional", availability: "available", image: dishSamp },
  { id: "ox-liver", name: "Ox Liver", description: "Pan-fried ox liver with caramelised onions.", price: 80, category: "Traditional", availability: "limited", image: dishBeef },
  { id: "cow-heels", name: "Cow Heels", description: "Slow-cooked cow heels in a rich, sticky gravy.", price: 110, category: "Traditional", availability: "sold-out", image: dishBeef },

  // Drinks
  { id: "coke", name: "Coke", description: "Ice-cold 330ml Coca-Cola.", price: 22, category: "Drinks", availability: "available", image: dishSamp },
  { id: "sprite", name: "Sprite", description: "Ice-cold 330ml Sprite.", price: 22, category: "Drinks", availability: "available", image: dishSamp },
  { id: "fanta", name: "Fanta", description: "Ice-cold 330ml Fanta Orange.", price: 22, category: "Drinks", availability: "available", image: dishSamp },
  { id: "water", name: "Still Water", description: "500ml bottled still water.", price: 20, category: "Drinks", availability: "available", image: dishSamp },
  { id: "juice", name: "Fresh Juice", description: "Seasonal freshly-pressed fruit juice.", price: 35, category: "Drinks", availability: "available", image: dishSamp },
];

export const RESTAURANT = {
  name: "Mogodu Monday",
  tagline: "Authentic South African Cuisine Every Monday",
  phone: "+27 82 555 0184",
  whatsapp: "27825550184",
  email: "hello@mogodumonday.co.za",
  address: "84 Vilakazi Street, Orlando West, Soweto, 1804",
  hours: [
    { day: "Monday", time: "11:00 – 22:00" },
    { day: "Tuesday – Thursday", time: "11:00 – 21:00" },
    { day: "Friday – Saturday", time: "11:00 – 23:00" },
    { day: "Sunday", time: "12:00 – 20:00" },
  ],
  social: {
    instagram: "https://instagram.com/mogodumonday",
    facebook: "https://facebook.com/mogodumonday",
    tiktok: "https://tiktok.com/@mogodumonday",
  },
};

export const formatZAR = (n: number) => `R${n}`;
