import { motion } from "motion/react";
import { WEDDING_DETAILS } from "../constants";

const GALLERY_IMAGES = [
  {
    url: "/images/DSC_4054.jpg",
    title: "Together, always",
    titleChinese: "相伴一生",
    className: "md:col-span-2",
  },
  {
    url: "/images/DSC_4094.jpg",
    title: "By the sea",
    titleChinese: "海边誓约",
    className: "md:row-span-2",
  },
  {
    url: "/images/DSC_4070.jpg",
    title: "Quiet tenderness",
    titleChinese: "温柔时光",
    className: "",
  },
  {
    url: "/images/DSC_4155.jpg",
    title: "Hand in hand",
    titleChinese: "执手同行",
    className: "",
  },
  {
    url: "/images/DSC_4218.jpg",
    title: "A bright beginning",
    titleChinese: "良辰启程",
    className: "md:col-span-2",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-redwood px-5 py-20 text-ivory md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
            Photo Memories
          </p>
          <p className="mt-2 text-sm text-ivory/65">婚纱相册</p>
          <h2 className="mt-5 font-serif text-5xl font-semibold md:text-7xl">
            {WEDDING_DETAILS.date.full}
          </h2>
          <p className="mt-3 text-xl text-gold">{WEDDING_DETAILS.date.fullChinese}</p>
        </motion.div>

        <div className="mt-14 grid auto-rows-[360px] gap-4 md:grid-cols-3 md:auto-rows-[420px]">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.figure
              key={image.url}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`group relative overflow-hidden border border-gold/25 bg-black/10 ${image.className}`}
            >
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-redwood/90 to-transparent p-6">
                <p className="font-serif text-3xl font-semibold">{image.title}</p>
                <p className="mt-1 text-sm text-gold">{image.titleChinese}</p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/55">
                  15.09.2026
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
