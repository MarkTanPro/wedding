import { APIProvider, AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import type React from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { WEDDING_DETAILS } from "../constants";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";
const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

export function VenueMap() {
  if (!hasValidKey) {
    return (
      <section className="bg-ivory px-5 py-20 text-center text-ink md:py-28">
        <div className="mx-auto max-w-3xl border border-redwood/15 bg-white/80 p-8 shadow-[0_20px_80px_rgba(117,30,31,0.08)]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-redwood text-gold">
            <MapPin className="h-6 w-6" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-redwood/60">
            Venue Location
          </p>
          <p className="mt-2 text-sm text-ink/55">婚礼地点</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold text-redwood">
            {WEDDING_DETAILS.venue.name}
          </h2>
          <p className="mt-2 text-xl text-gold">{WEDDING_DETAILS.venue.chineseName}</p>
          <p className="mt-5 text-sm leading-7 text-ink/65">
            {WEDDING_DETAILS.date.full} | {WEDDING_DETAILS.date.fullChinese}
          </p>
          <p className="mt-2 text-sm leading-7 text-ink/65">
            {WEDDING_DETAILS.venue.address} | {WEDDING_DETAILS.venue.addressChinese}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <DirectionLink href={WEDDING_DETAILS.venue.googleMapsUrl}>Google Maps</DirectionLink>
            <DirectionLink href={WEDDING_DETAILS.venue.wazeUrl}>Waze</DirectionLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-redwood/60">
            Venue Location
          </p>
          <p className="mt-2 text-sm text-ink/55">婚礼地点</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold text-redwood md:text-7xl">
            {WEDDING_DETAILS.date.full}
          </h2>
          <p className="mt-3 text-xl text-gold">{WEDDING_DETAILS.date.fullChinese}</p>
        </div>

        <div className="h-[520px] overflow-hidden border border-redwood/15 shadow-[0_28px_100px_rgba(117,30,31,0.12)]">
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={WEDDING_DETAILS.venue.coordinates}
              defaultZoom={15}
              mapId="WEDDING_MAP_ID"
              internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
              style={{ width: "100%", height: "100%" }}
            >
              <AdvancedMarker position={WEDDING_DETAILS.venue.coordinates}>
                <Pin background="#751e1f" borderColor="#c5a059" glyphColor="#ffffff" />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
}

function DirectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-redwood/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-redwood transition hover:border-gold hover:bg-gold"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}
