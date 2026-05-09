import { motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Countdown } from "./components/Countdown";
import { Details } from "./components/Details";
import { VenueMap } from "./components/VenueMap";
import { RSVPForm } from "./components/RSVPForm";
import { Gallery } from "./components/Gallery";
import { WEDDING_DETAILS } from "./constants";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ivory">
      <Navigation />

      <main>
        <Hero />

        <section className="bg-ivory px-5 py-20 text-center text-ink md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-redwood/60">
              A Letter of Invitation
            </p>
            <p className="mt-2 text-sm text-ink/55">一封婚礼邀请</p>
            <div className="mx-auto my-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-redwood font-serif text-4xl text-gold">
              囍
            </div>
            <h2 className="font-serif text-5xl font-semibold leading-tight text-redwood md:text-7xl">
              Kah Wei & Wan Yi
            </h2>
            <p className="mt-3 font-serif text-3xl text-gold">贾维 & 菀贻</p>
            <div className="mx-auto my-8 h-px w-24 bg-gold/60" />
            <p className="text-xl leading-8 text-ink/75">
              We are getting married, and we would be honoured to have you with us on
              {` ${WEDDING_DETAILS.date.full}`}.
            </p>
            <p className="mt-4 text-lg leading-8 text-ink/65">
              我们即将步入婚姻的旅程，诚挚邀请您于{WEDDING_DETAILS.date.fullChinese}莅临见证。
            </p>
          </motion.div>
        </section>

        <section
          id="countdown"
          className="relative overflow-hidden bg-ivory px-5 py-20 text-center md:py-28"
        >
          <img
            src="/images/DSC_4078.jpg"
            alt="Wedding scenery"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-ivory/80" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-redwood/60">
              Counting Down to Our Wedding
            </p>
            <p className="mt-2 text-sm text-ink/55">婚礼倒计时</p>
            <h2 className="mt-5 font-serif text-5xl font-semibold text-redwood md:text-7xl">
              {WEDDING_DETAILS.date.full}
            </h2>
            <p className="mb-10 mt-3 text-xl text-gold">{WEDDING_DETAILS.date.fullChinese}</p>
            <Countdown targetDate={`${WEDDING_DETAILS.date.iso}T18:30:00+08:00`} />
          </div>
        </section>

        <Details />

        <section className="relative min-h-[82vh] overflow-hidden bg-ink text-ivory">
          <img
            src="/images/DSC_4218.jpg"
            alt="Kah Wei and Wan Yi by the coast"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-redwood/20 via-redwood/10 to-redwood/85" />
          <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
              Save The Date
            </p>
            <p className="mt-2 text-sm text-ivory/70">请记住这个日子</p>
            <h2 className="mt-8 font-serif text-6xl font-semibold leading-none md:text-8xl">
              {WEDDING_DETAILS.date.full}
            </h2>
            <p className="mt-5 text-2xl text-gold">{WEDDING_DETAILS.date.fullChinese}</p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-ivory/78">
              Your presence will make this celebration warmer, brighter, and more complete.
            </p>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-ivory/78">
              您的到来，将让这一天更加温暖、圆满与难忘。
            </p>
          </div>
        </section>

        <Gallery />
        <VenueMap />
        <RSVPForm />
      </main>

      <footer className="bg-redwood px-5 py-12 text-center text-ivory">
        <p className="font-serif text-4xl font-semibold">{WEDDING_DETAILS.couple.fullName}</p>
        <p className="mt-2 text-xl text-gold">{WEDDING_DETAILS.couple.fullNameChinese}</p>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/60">
          {WEDDING_DETAILS.date.full} | {WEDDING_DETAILS.date.fullChinese}
        </p>
      </footer>
    </div>
  );
}
