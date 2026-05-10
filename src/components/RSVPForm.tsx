import { motion } from "motion/react";

export function RSVPForm() {
  // Replace this URL with your actual Google Form embed URL
  // To get the embed URL: Go to your Google Form > Send > Embed HTML > Copy the src from the iframe
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdON0EN_ggJYi8X6ymmPGPDRVhfmw8uyv_CL7R_mePJVGAVBQ/viewform?embedded=true";

  return (
    <section id="rsvp" className="bg-ivory px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-redwood/60">
            RSVP for May 10, 2026
          </p>
          <p className="mt-2 text-sm text-ink/55">请回复 2026年5月10日 的出席情况</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold text-redwood md:text-7xl">
            Will You Join Us?
          </h2>
          <p className="mt-3 text-2xl text-gold">您会出席吗？</p>
          <p className="mt-5 text-sm leading-7 text-ink/60">
            Please respond by 15 August 2026.
            <br />
            请于2026年8月15日前回复。
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-redwood/15 bg-white/85 p-6 shadow-[0_20px_80px_rgba(117,30,31,0.08)] md:p-10"
        >
          <div className="mb-6 text-center">
            <p className="text-sm text-ink/70">
              Please fill out the form below to RSVP for our wedding.
            </p>
            <p className="text-sm text-ink/70">
              请填写以下表格来回复我们的婚礼邀请。
            </p>
          </div>

          <iframe
            src={googleFormUrl}
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full"
            title="Wedding RSVP Form"
          >
            Loading...
          </iframe>

          <div className="mt-6 text-center text-xs text-ink/50">
            <p>
              If the form doesn't load, you can also{" "}
              <a
                href={googleFormUrl.replace("?embedded=true", "")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-redwood hover:text-gold underline"
              >
                open it directly in Google Forms
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}