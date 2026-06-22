"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
];

export function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#0a1028] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.04),transparent_16%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.4em] text-[#f0d9a8]">Gallery</p>
          <h2 className="mt-4 font-serif text-4xl text-[#f5efe0] md:text-5xl">Moments in Frame</h2>
        </motion.div>
        <div className="mt-14 columns-1 gap-5 sm:columns-2 xl:columns-3">
          {galleryImages.map((src, index) => (
            <motion.button
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setSelected(src)}
              className="mb-5 block w-full overflow-hidden rounded-2xl border border-[#d4af7a]/15 bg-[#0b1027]"
            >
              <Image
                src={src}
                alt="Wedding gallery"
                width={900}
                height={1200}
                className="h-auto w-full object-cover transition duration-700 hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6" onClick={() => setSelected(null)}>
          <button className="absolute right-6 top-6 rounded-full border border-[#d4af7a]/30 bg-[#0b1027] p-3 text-[#f5efe0]" onClick={() => setSelected(null)}>
            <X className="h-5 w-5" />
          </button>
          <Image src={selected} alt="Selected wedding photo" width={1200} height={1600} className="max-h-[90vh] w-auto rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
}
