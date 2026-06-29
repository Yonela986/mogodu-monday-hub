import type { Availability } from "@/data/menu";
import { cn } from "@/lib/utils";

const styles: Record<Availability, { label: string; cls: string }> = {
  available: { label: "Available", cls: "bg-success/15 text-success ring-success/30" },
  limited: { label: "Limited stock", cls: "bg-warning/15 text-warning ring-warning/30" },
  "sold-out": { label: "Sold out", cls: "bg-destructive/10 text-destructive ring-destructive/30" },
};

export function AvailabilityBadge({ status }: { status: Availability }) {
  const s = styles[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1", s.cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", status === "available" ? "bg-success" : status === "limited" ? "bg-warning" : "bg-destructive")} />
      {s.label}
    </span>
  );
}
