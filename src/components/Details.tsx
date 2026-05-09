import { motion } from "motion/react";
import type React from "react";
import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";
import { WEDDING_DETAILS } from "../constants";
import { cn } from "../lib/utils";

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);

export function Details() {
  return (
    <section id="details" className="bg-ivory px-5 py-20 text-ink md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-redwood/60">
            Wedding Day Details
          </p>
          <p className="mt-2 text-sm text-ink/55">婚礼详情</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold text-redwood md:text-7xl">
            {WEDDING_DETAILS.date.full}
          </h2>
          <p className="mt-3 text-2xl font-medium text-gold">{WEDDING_DETAILS.date.fullChinese}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[560px] overflow-hidden border border-redwood/15 bg-redwood text-ivory shadow-[0_28px_100px_rgba(117,30,31,0.16)]"
          >
            <img
              src="/images/DSC_4094.jpg"
              alt="Wedding portrait by the sea"
              className="absolute inset-0 h-full w-full object-cover object-[50%_75%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-redwood/10 via-redwood/5 to-redwood/90" />
            <div className="relative z-10 flex h-full min-h-[560px] flex-col justify-end p-8 md:p-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
                15.09.2026
              </p>
              <h3 className="mt-4 font-serif text-5xl font-semibold leading-none md:text-7xl">
                We joyfully invite you
              </h3>
              <p className="mt-3 text-2xl text-gold">诚挚邀请您见证我们的婚礼</p>
              <p className="mt-6 max-w-lg text-sm leading-7 text-ivory/78">
                With gratitude and joy, we invite you to celebrate the wedding of
                Kah Wei & Wan Yi on 15 September 2026.
              </p>
              <p className="mt-3 max-w-lg text-sm leading-7 text-ivory/78">
                怀着感恩与喜悦，我们诚邀您于2026年9月15日，一同见证贾维与菀贻的幸福时刻。
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6">
            <InfoCard
              icon={<CalendarDays className="h-5 w-5" />}
              title="Date"
              titleChinese="日期"
              lines={[WEDDING_DETAILS.date.full, WEDDING_DETAILS.date.fullChinese]}
            >
              <div className="mt-6 border border-redwood/10 bg-white/70 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-serif text-2xl text-redwood">September 2026</span>
                  <span className="text-xs font-medium text-ink/50">2026年9月</span>
                </div>
                <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-semibold uppercase text-ink/40">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  <span />
                  <span />
                  {calendarDays.map((day) => (
                    <span
                      key={day}
                      className={cn(
                        "flex aspect-square items-center justify-center",
                        day === 15
                          ? "rounded-full bg-redwood font-semibold text-ivory shadow-lg shadow-redwood/20"
                          : "text-ink/65"
                      )}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </InfoCard>

            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Time"
              titleChinese="时间"
              lines={[WEDDING_DETAILS.date.time, WEDDING_DETAILS.date.timeChinese]}
            />

            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Venue"
              titleChinese="地点"
              lines={[
                `${WEDDING_DETAILS.venue.name}, ${WEDDING_DETAILS.venue.location}`,
                `${WEDDING_DETAILS.venue.chineseName}，${WEDDING_DETAILS.venue.locationChinese}`,
              ]}
            >
              <div className="mt-6 flex flex-wrap gap-3">
                <DirectionLink href={WEDDING_DETAILS.venue.googleMapsUrl}>Google Maps</DirectionLink>
                <DirectionLink href={WEDDING_DETAILS.venue.wazeUrl}>Waze</DirectionLink>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  titleChinese,
  lines,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  titleChinese: string;
  lines: string[];
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="border border-redwood/12 bg-white/80 p-6 shadow-[0_20px_80px_rgba(117,30,31,0.08)]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-redwood text-gold">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-redwood/55">
            {title}
          </p>
          <h3 className="mt-1 font-serif text-3xl font-semibold text-redwood">{titleChinese}</h3>
          {lines.map((line) => (
            <p key={line} className="mt-2 text-sm leading-6 text-ink/70">
              {line}
            </p>
          ))}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function DirectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-redwood/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-redwood transition hover:border-gold hover:bg-gold hover:text-redwood"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}
