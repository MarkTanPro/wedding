import { motion } from "motion/react";
import { WEDDING_DETAILS } from "../constants";

export function Hero() {
  return (
    <section id="invitation" className="relative min-h-screen overflow-hidden bg-redwood text-ivory">
      <img
        src="/images/DSC_4054.jpg"
        alt="Kah Wei and Wan Yi"
        className="absolute inset-0 h-full w-full object-cover object-[54%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-redwood/55 via-redwood/10 to-redwood/90" />
      <div className="absolute inset-x-5 top-5 bottom-5 border border-gold/45" />
      <div className="absolute inset-x-8 top-8 bottom-8 border border-white/20" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-between px-5 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-ivory/80">
            Wedding Invitation
          </p>
          <p className="mt-2 text-sm text-ivory/75">婚礼邀请函</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="w-full"
        >
          <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-gold/70 bg-redwood/70 font-serif text-5xl text-gold shadow-2xl backdrop-blur-sm">
            囍
          </div>
          <p className="mb-4 font-serif text-2xl italic text-gold md:text-4xl">
            {WEDDING_DETAILS.couple.fullNameChinese}
          </p>
          <h1 className="mx-auto max-w-4xl font-serif text-6xl font-semibold leading-[0.9] tracking-normal md:text-8xl lg:text-9xl">
            {WEDDING_DETAILS.couple.groom}
            <span className="mx-3 text-gold">&</span>
            {WEDDING_DETAILS.couple.bride}
          </h1>
          <div className="mx-auto my-8 h-px w-28 bg-gold/70" />
          <p className="text-2xl font-medium tracking-normal md:text-4xl">
            {WEDDING_DETAILS.date.full}
          </p>
          <p className="mt-2 text-lg text-ivory/80">{WEDDING_DETAILS.date.fullChinese}</p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.32em] text-ivory/70">
            {WEDDING_DETAILS.venue.name} | {WEDDING_DETAILS.venue.chineseName}
          </p>
        </motion.div>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ivory/60"
          >
            <span>Scroll to open the invitation</span>
            <span className="normal-case tracking-normal">向下滑动开启邀请</span>
            <span className="mt-1 h-10 w-px overflow-hidden bg-white/25">
              <motion.span
                animate={{ y: [-16, 40] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="block h-4 w-px bg-gold"
              />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
