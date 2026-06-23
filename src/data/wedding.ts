/**
 * Single source of truth for the entire invitation.
 * Edit values here — every section reads from this object,
 * so the couple's details never drift out of sync.
 */

export type CeremonyEvent = {
  /** Machine key, also used as the #id anchor. */
  key: string;
  /** Devanagari display title. */
  title: string;
  /** English label shown under the title. */
  englishLabel: string;
  /** Calendar date. */
  date: string;
  /** Start time. */
  time: string;
  /** Venue / hall line. */
  venue: string;
  /** Short poetic description. */
  description: string;
  /** Accent theme per event for visual variety. */
  accent: "maroon" | "emerald" | "gold" | "bronze" | "rose" | "ivory";
  /** Decorative emoji/glyph used as a motif. */
  motif: string;
};

export const couple = {
  bride: {
    title: "आयुष्मती कुमारी",
    name: "रितिका",
    englishName: "Ritika",
    role: "सुपुत्री",
    monogram: "R",
    parents: ["श्रीमती ज्योति देवी एवं", "श्री विनोद चौधरी (पप्पू)"],
    residence: ["चिमनापुर, लालगंज,", "वैशाली, बिहार"],
  },
  groom: {
    title: "आयुष्मान कुमार",
    name: "प्रतीक",
    englishName: "Pratik",
    role: "सुपुत्र",
    monogram: "P",
    parents: ["श्रीमती सुमित्रा जैसवाल एवं", "श्री प्रभात जैसवाल"],
    residence: ["दिलदारनगर, गाजीपुर,", "उत्तर प्रदेश"],
  },
  /** Monogram shown in gates + finale. */
  monogram: "R&P",
  blessing: "एक नई कहानी का शुभ आरम्भ...",
} as const;

export const weddingDate = {
  /** ISO for the countdown / JSON-LD. */
  iso: "2026-07-11T00:00:00",
  /** Human date. */
  display: "11 July 2026",
};

export const venue = {
  name: "Pearl Marriage Vatika",
  area: "Lalganj, Vaishali, Bihar",
  mapsQuery: "Pearl Marriage Vatika Lalganj Vaishali",
  mapEmbed:
    "https://www.google.com/maps?q=Pearl%20Marriage%20Vatika%20Lalganj%20Vaishali&z=13&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Pearl+Marriage+Vatika+Lalganj+Vaishali",
};

export const events: CeremonyEvent[] = [
  {
    key: "satya-narayan-pujan",
    title: "श्री सत्यनारायण पूजन",
    englishLabel: "Satya Narayan Pujan",
    date: "08 July 2026",
    time: "8:00 AM onwards",
    venue: "आयुष्मती का आवास, चिमनापुर",
    description:
      "शुभ कार्य का विधिवत आरंभ भगवान विष्णु के सत्यनारायण स्वरूप के पूजन एवं कथा श्रवण से होता है।",
    accent: "gold",
    motif: "🪔",
  },
  {
    key: "matkor",
    title: "मंडवा मत्कोर",
    englishLabel: "Matkor Ceremony",
    date: "08 July 2026",
    time: "11:00 AM",
    venue: "आयुष्मती का आवास, चिमनापुर",
    description:
      "माटी के कलशों को सजाकर लाया जाता है — सुख-समृद्धि और गृहस्थी की शुभ शुरुआत का प्रतीक।",
    accent: "bronze",
    motif: "🏺",
  },
  {
    key: "mehendi",
    title: "मेहंदी समारोह",
    englishLabel: "Mehendi Ceremony",
    date: "10 July 2026",
    time: "4:00 PM",
    venue: "आयुष्मती का आवास, चिमनापुर",
    description:
      "हाथों पर रची मेहंदी के साथ हंसी, गीत और रंगों का उत्सव — दुल्हन के लिए विशेष।",
    accent: "emerald",
    motif: "🌿",
  },
  {
    key: "sangeet",
    title: "संगीत संध्या",
    englishLabel: "Sangeet Night",
    date: "10 July 2026",
    time: "8:00 PM",
    venue: "आयुष्मती का आवास, चिमनापुर",
    description:
      "परिवारों की धमाकेदार प्रस्तुतियाँ, संगीत की ताल और रात भर चलने वाला नाच-गाना।",
    accent: "rose",
    motif: "🎶",
  },
  {
    key: "wedding",
    title: "शुभ विवाह एवं प्रीति भोज",
    englishLabel: "Wedding Ceremony",
    date: "11 July 2026",
    time: "11:00 AM (विवाह मुहूर्त)",
    venue: "Pearl Marriage Vatika",
    description:
      "कन्यादान, मंगलफेरे और सात वचनों के साथ दो आत्माओं का पावन मिलन।",
    accent: "maroon",
    motif: "💍",
  },
  {
    key: "reception",
    title: "स्वागत समारोह",
    englishLabel: "Reception",
    date: "11 July 2026",
    time: "7:00 PM",
    venue: "Pearl Marriage Vatika",
    description:
      "नवदंपति का राजसी अभिनंदन — भव्य भोज, आशीर्वाद और यादगार शाम।",
    accent: "ivory",
    motif: "💐",
  },
];

export type FamilyGroup = {
  title: string;
  english: string;
  names: string[];
  note?: string;
  /** Contact block shown for the host family. */
  contact?: {
    name: string;
    address: string[];
    phone: string;
  };
};

export const family: FamilyGroup[] = [
  {
    title: "स्वागतकर्ता",
    english: "Hosts",
    names: [
      "Shankar Chaudhary",
      "Manoj Kumar (Munna)",
      "Pramod Kumar (Lallu)",
      "Sanoj Kumar (Pintu)",
      "Rajkumar",
    ],
  },
  {
    title: "दर्शनाभिलाषी",
    english: "With Blessings",
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
    english: "Aakankshi",
    names: [],
    contact: {
      name: "Shri Kamal Chaudhary",
      address: ["Chimanapur", "Lalganj", "Vaishali, Bihar"],
      phone: "93041 99495",
    },
  },
];

/** Accent color map keyed by CeremonyEvent["accent"]. */
export const accentHex: Record<CeremonyEvent["accent"], { from: string; to: string; soft: string }> = {
  maroon: { from: "#7a1f2b", to: "#d4af7a", soft: "rgba(122,31,43,0.18)" },
  emerald: { from: "#0f5132", to: "#d4af7a", soft: "rgba(15,81,50,0.18)" },
  gold: { from: "#c9a24a", to: "#f0d9a8", soft: "rgba(212,175,122,0.18)" },
  bronze: { from: "#6e4a1f", to: "#d4af7a", soft: "rgba(110,74,31,0.18)" },
  rose: { from: "#9d3b54", to: "#f0d9a8", soft: "rgba(157,59,84,0.18)" },
  ivory: { from: "#b8a878", to: "#fff1be", soft: "rgba(184,168,120,0.18)" },
};
