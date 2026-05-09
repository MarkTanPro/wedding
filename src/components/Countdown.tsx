import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { WEDDING_DETAILS } from "../constants";
import { cn } from "../lib/utils";

interface CountdownProps {
  targetDate: string;
  variant?: "light" | "dark";
}

export function Countdown({ targetDate, variant = "light" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      setTimeLeft({
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Days", unit: "天", value: timeLeft.days },
    { label: "Hours", unit: "时", value: timeLeft.hours },
    { label: "Minutes", unit: "分", value: timeLeft.minutes },
    { label: "Seconds", unit: "秒", value: timeLeft.seconds },
  ];

  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={cn(
        "mx-auto w-full max-w-3xl border px-4 py-6 shadow-[0_20px_80px_rgba(117,30,31,0.12)] backdrop-blur md:px-8",
        isDark ? "border-white/20 bg-white/10 text-white" : "border-redwood/15 bg-ivory/90 text-redwood"
      )}
    >
      <div className="mb-5 text-center">
        <p className={cn("text-[10px] font-semibold uppercase tracking-[0.35em]", isDark ? "text-white/70" : "text-redwood/60")}>
          Countdown to {WEDDING_DETAILS.date.full}
        </p>
        <p className={cn("mt-1 text-xs", isDark ? "text-white/70" : "text-ink/55")}>
          距离 {WEDDING_DETAILS.date.fullChinese} 婚礼倒计时
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-5">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className={cn(
              "flex min-h-24 flex-col items-center justify-center border px-2 py-4 text-center",
              isDark ? "border-white/15 bg-black/10" : "border-redwood/10 bg-white/65"
            )}
          >
            <span className="font-serif text-4xl leading-none tracking-normal md:text-6xl">
              {item.value.toString().padStart(2, "0")}
            </span>
            <span className={cn("mt-2 text-[9px] font-semibold uppercase tracking-[0.18em]", isDark ? "text-white/65" : "text-redwood/60")}>
              {item.label}
            </span>
            <span className={cn("mt-1 text-sm font-medium", isDark ? "text-white/75" : "text-gold")}>
              {item.unit}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
