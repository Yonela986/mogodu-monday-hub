import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { MENU, RESTAURANT, formatZAR } from "@/data/menu";

function buildSystemPrompt() {
  const menuByCat = MENU.reduce<Record<string, string[]>>((acc, item) => {
    (acc[item.category] ||= []).push(
      `- ${item.name} — ${formatZAR(item.price)} (${item.availability}) — ${item.description}`,
    );
    return acc;
  }, {});

  const menuText = Object.entries(menuByCat)
    .map(([cat, items]) => `### ${cat}\n${items.join("\n")}`)
    .join("\n\n");

  const hoursText = RESTAURANT.hours.map((h) => `- ${h.day}: ${h.time}`).join("\n");

  return `You are the friendly virtual host for **${RESTAURANT.name}**, an authentic South African restaurant in Soweto famous for our Monday mogodu.

Tone: warm, welcoming, concise. Use light Markdown (bold, short lists). Greet first-time users.

## Restaurant info
- Address: ${RESTAURANT.address}
- Phone: ${RESTAURANT.phone} | WhatsApp: +${RESTAURANT.whatsapp}
- Email: ${RESTAURANT.email}
- Payments: cash, card, SnapScan, Zapper.

## Opening hours
${hoursText}

## Menu (prices in ZAR)
${menuText}

## How to help
- **Menu / prices / availability**: answer from the list above. Mention if something is "limited" or "sold out".
- **Booking**: direct the guest to the **Book a Table** page, or take their preferred date, time and party size and confirm we will hold the table.
- **Location**: share the Soweto address and offer the Contact page for the map.
- **Popular meals**: Mogodu & Pap, Mogodu Deluxe, Beef Stew, Fried Chicken.
- **Off-topic / unknown**: politely steer back to menu, bookings, hours, or location. Never invent menu items or prices.

Keep replies under ~120 words unless the guest asks for detail.`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages?: UIMessage[] };
          if (!Array.isArray(messages)) {
            return new Response("Messages are required", { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          }

          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system: buildSystemPrompt(),
            messages: convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err) {
          console.error("[api/chat]", err);
          return new Response("Chat error", { status: 500 });
        }
      },
    },
  },
});
