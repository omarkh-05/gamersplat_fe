import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import type { Center } from "@/data/mock";
import { StatusBadge } from "./StatusBadge";

export const CenterCard = ({ center }: { center: Center }) => (
  <Link
    href={`/center/${center.id}`}
    className="group relative bg-gradient-surface rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
  >
    <div className="relative aspect-square overflow-hidden">
      <img
        src={center.image}
        alt={center.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <span className="absolute top-3 start-3">
        <StatusBadge status={center.status} />
      </span>
      <span className="absolute top-3 end-3 text-[11px] font-medium px-2.5 py-1 rounded-full glass">
        {center.tag}
      </span>
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center font-display font-bold text-primary-foreground shadow-glow ring-4 ring-background">
        {center.logo}
      </div>
    </div>

    <div className="pt-10 pb-5 px-5 text-center">
      <h3 className="font-display font-semibold text-lg leading-tight">
        {center.name}
      </h3>
      <div className="mt-1.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>
          {center.city}, {center.country}
        </span>
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 text-sm">
        <Star className="h-4 w-4 fill-primary text-primary" />
        <span className="font-semibold">{center.rating}</span>
        <span className="text-muted-foreground">({center.reviews})</span>
      </div>
    </div>
  </Link>
);
