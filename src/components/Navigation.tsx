import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAVIGATION_LINKS, WEDDING_DETAILS } from "../constants";
import { cn } from "../lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-ivory/90 py-3 text-redwood shadow-sm backdrop-blur" : "bg-transparent py-6 text-ivory"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#invitation" className="leading-none">
          <span className="block font-serif text-2xl font-semibold tracking-normal">
            KW & WY
          </span>
          <span className={cn("block text-xs", isScrolled ? "text-redwood/60" : "text-ivory/65")}>
            {WEDDING_DETAILS.couple.fullNameChinese}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:text-gold"
            >
              {link.name}
            </a>
          ))}
        </div>

        <a
          href="#rsvp"
          className={cn(
            "hidden rounded-full px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition md:inline-flex",
            isScrolled ? "bg-redwood text-ivory hover:bg-gold hover:text-redwood" : "bg-ivory text-redwood hover:bg-gold"
          )}
        >
          RSVP
        </a>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="md:hidden"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute inset-x-0 top-full bg-ivory px-5 py-7 text-center text-redwood shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-semibold uppercase tracking-[0.22em]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
