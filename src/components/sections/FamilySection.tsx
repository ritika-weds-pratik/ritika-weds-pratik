"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, UserRound } from "lucide-react";

const groups = [
  {
    title: "स्वागतकर्ता",
    names: ["Shankar Chaudhary", "Manoj Kumar (Munna)", "Pramod Kumar (Lallu)", "Sanoj Kumar (Pintu)", "Rajkumar"],
  },
  {
    title: "दर्शनाभिलाषी",
    names: [
      "Amarnath",
      "Rajesh",
      "Brijesh",
      "Indresh",
      "Ujjwal",
      "Adarsh",
      "Priyanshu",
      "Pratik",
      "Ashrit",
      "Aditya",
      "Anuj",
      "Golu",
      "Shivansh",
      "And all the Chaudhary family",
    ],
  },
  {
    title: "आकांक्षी",
    names: ["Shri Kamal Chaudhary", "Chimanapur", "Lalganj", "Vaishali, Bihar", "93041 99495"],
  },
];

export function FamilySection() {
  return (
    <section className="relative overflow-hidden bg-[#060914] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,122,0.05),transparent_18%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-sm uppercase tracking-[0.55em] text-[#f0d9a8]"
        >
          With Love & Blessings
        </motion.p>
        <div className="mt-12 space-y-8">
          {groups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-[1.75rem] border p-8 shadow-[0_25px_65px_rgba(0,0,0,0.38)] backdrop-blur-sm ${
                group.title === "Aakankshi"
                  ? "border-[#d4af7a]/25 bg-[linear-gradient(180deg,rgba(15,27,73,0.88),rgba(5,9,19,0.82))]"
                  : "border-[#d4af7a]/10 bg-gradient-to-b from-[#0f1b49]/65 to-[#060914]/70"
              }`}
            >
              {group.title === "आकांक्षी" && (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.08),transparent_18%)]" />
                  <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-[#d4af7a]/8 blur-3xl" />
                </>
              )}
              <div className="relative">
                {group.title === "आकांक्षी" ? (
                  <div className="mx-auto max-w-md rounded-[1.5rem] border border-[#d4af7a]/15 bg-[linear-gradient(180deg,rgba(15,27,73,0.78),rgba(7,10,25,0.88))] p-8 shadow-[inset_0_0_40px_rgba(212,175,122,0.04)]">
                    <div className="flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af7a]/30 bg-[#f0d9a8]/10 shadow-[0_0_25px_rgba(212,175,122,0.08)]">
                        <UserRound className="h-7 w-7 text-[#f0d9a8]" />
                      </div>
                    </div>
                    <h3 className="mt-5 text-center font-serif text-3xl text-[#f0d9a8]">{group.title}</h3>
                    <div className="mt-7 space-y-4 text-left">
                      <div className="rounded-2xl border border-[#d4af7a]/10 bg-white/5 p-4">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Name</p>
                        <p className="mt-1 text-base leading-7 text-[#f5efe0]">{group.names[0]}</p>
                      </div>
                      <div className="rounded-2xl border border-[#d4af7a]/10 bg-white/5 p-4">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Address</p>
                        <div className="mt-1 space-y-1 text-sm leading-6 text-[#f5efe0]/90">
                          <p>{group.names[1]}</p>
                          <p>{group.names[2]}</p>
                          <p>{group.names[3]}</p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-[#d4af7a]/10 bg-white/5 p-4">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-[#f0d9a8]/80">Number</p>
                        <a
                          href={`tel:${group.names[4]}`}
                          className="mt-1 block text-base tracking-[0.18em] text-[#f0d9a8] transition hover:text-[#fff1be]"
                        >
                          {group.names[4]}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif text-2xl text-[#f0d9a8]">{group.title}</h3>
                    <div className="mt-5 flex flex-wrap justify-center gap-3 text-[#f5efe0]/80">
                      {group.names.map((name) => (
                        <span key={name} className="rounded-full border border-[#d4af7a]/15 bg-[#0b1027]/50 px-3 py-1.5 text-sm backdrop-blur-sm">
                          {name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
