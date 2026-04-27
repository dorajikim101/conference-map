export type Tier = "S" | "A" | "B";

export type EventCost = {
  flight: number;
  hotel: number;
  transport: number;
  meals: number;
  ticket: number;
  total: number;
  note?: string;
};

export type Company = {
  name: string;
  tags: string[];
  people: string[];
  role: string;
  isNew?: boolean;
};

export type EventData = {
  id: string;
  name: string;
  city: string;
  country: string;
  date: string;
  days: number;
  tier: Tier;
  autoTier: Tier;
  tierScore: number;
  tierReasons: string[];
  gradient: string;
  cost: EventCost;
  summary: Record<"features" | "difference" | "pros" | "risks" | "expectations", string[]>;
  feed: { label: string; time: string; type: string }[];
  archive: {
    year: string;
    attendees: string;
    sideEvents: number;
    sponsors: number;
    media: number;
    note: string;
  };
  kpis: { label: string; value: string; detail: string }[];
  budget: { label: string; value: number }[];
  sideEventTrend: { label: string; value: number }[];
  actions: string[];
  companies: Company[];
};

export const events: EventData[] = [
  {
    id: "eth-denver",
    name: "ETH Denver",
    city: "Denver",
    country: "United States",
    date: "Feb 23 - Mar 2, 2026",
    days: 8,
    tier: "S",
    autoTier: "S",
    tierScore: 94,
    tierReasons: ["Developer density", "protocol-side access", "large side-event graph"],
    gradient: "from-sky-100 via-white to-emerald-100",
    cost: { flight: 980, hotel: 1440, transport: 180, meals: 520, ticket: 699, total: 3819 },
    summary: {
      features: ["Builder-heavy agenda", "Dense hackathon and grant ecosystem", "Strong L2 and infra presence"],
      difference: ["More technical than sponsor-led", "Best for early protocol signals", "Useful for hiring and BD"],
      pros: ["High meeting efficiency", "Strong public side-event discovery", "Reliable archive baseline"],
      risks: ["Long trip duration raises hotel cost", "Agenda can fragment across venues", "Snow season travel variance"],
      expectations: ["Protocol roadmap conversations", "Developer tool partnerships", "Early ecosystem narratives"],
    },
    feed: [
      { label: "Side event registration window opened", time: "2h ago", type: "Side event" },
      { label: "New L2 infrastructure sponsor added", time: "6h ago", type: "Sponsor" },
      { label: "Venue shuttle note updated", time: "Yesterday", type: "Operations" },
    ],
    archive: {
      year: "2025",
      attendees: "20K+",
      sideEvents: 312,
      sponsors: 148,
      media: 64,
      note: "Best archive signal came from infra, account abstraction, and restaking side events.",
    },
    kpis: [
      { label: "Meeting fit", value: "High", detail: "Infra and founder access" },
      { label: "Archive lift", value: "+18%", detail: "Side events YoY" },
      { label: "Update cadence", value: "3d", detail: "Until 30-day window" },
    ],
    budget: [
      { label: "Flight", value: 980 },
      { label: "Hotel", value: 1440 },
      { label: "Ticket", value: 699 },
      { label: "Local", value: 700 },
    ],
    sideEventTrend: [
      { label: "2023", value: 210 },
      { label: "2024", value: 265 },
      { label: "2025", value: 312 },
    ],
    actions: ["Shortlist infra teams before agenda lock", "Reserve refundable venue hotel block", "Track hackathon sponsor list"],
    companies: [
      { name: "Eigen Labs", tags: ["Protocol", "Restaking"], people: ["Head of BD", "Ecosystem Lead"], role: "Partnership mapping", isNew: true },
      { name: "Base", tags: ["L2", "Ecosystem"], people: ["Developer Relations"], role: "Builder programs" },
      { name: "Celestia", tags: ["Infra", "Modular"], people: ["Partnerships"], role: "Data availability narrative" },
      { name: "a16z crypto", tags: ["VC", "Research"], people: ["Investment Partner"], role: "Market read" },
    ],
  },
  {
    id: "token2049-dubai",
    name: "Token2049 Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    date: "Apr 30 - May 1, 2026",
    days: 2,
    tier: "S",
    autoTier: "A",
    tierScore: 89,
    tierReasons: ["Capital access", "global sponsor density", "manual override for regional priority"],
    gradient: "from-amber-100 via-white to-cyan-100",
    cost: { flight: 760, hotel: 1280, transport: 160, meals: 330, ticket: 799, total: 3329 },
    summary: {
      features: ["Capital and exchange-heavy audience", "Compact main conference window", "Premium sponsor concentration"],
      difference: ["More institutional than developer-led", "Strong MENA expansion signal", "Better for senior BD than recruiting"],
      pros: ["Shorter travel commitment", "High density of funds and exchanges", "Strong hospitality ecosystem"],
      risks: ["Premium pass upsell can distort access", "Hotel pricing moves quickly", "Meeting slots concentrate around evenings"],
      expectations: ["Exchange partnerships", "Market maker intros", "Regional expansion conversations"],
    },
    feed: [
      { label: "Additional side-event venue listed near DIFC", time: "1h ago", type: "Venue" },
      { label: "Market maker sponsor confirmed", time: "5h ago", type: "Sponsor" },
      { label: "Ticket tier price change detected", time: "Yesterday", type: "Cost" },
    ],
    archive: {
      year: "2025",
      attendees: "15K+",
      sideEvents: 186,
      sponsors: 210,
      media: 88,
      note: "Archive skews toward capital, exchange, market structure, and MENA policy conversations.",
    },
    kpis: [
      { label: "Meeting fit", value: "High", detail: "Capital and exchanges" },
      { label: "Archive lift", value: "+24%", detail: "Sponsor count YoY" },
      { label: "Update cadence", value: "Daily", detail: "Inside 14 days" },
    ],
    budget: [
      { label: "Flight", value: 760 },
      { label: "Hotel", value: 1280 },
      { label: "Ticket", value: 799 },
      { label: "Local", value: 490 },
    ],
    sideEventTrend: [
      { label: "2023", value: 90 },
      { label: "2024", value: 150 },
      { label: "2025", value: 186 },
    ],
    actions: ["Confirm MENA target account list", "Hold evening slots for sponsor events", "Monitor hotel discount release"],
    companies: [
      { name: "OKX", tags: ["Exchange", "Sponsor"], people: ["Institutional Lead"], role: "Liquidity routes", isNew: true },
      { name: "Animoca Brands", tags: ["Gaming", "Investor"], people: ["Portfolio Lead"], role: "Portfolio access" },
      { name: "Cypher Capital", tags: ["VC", "MENA"], people: ["Managing Partner"], role: "Regional thesis" },
      { name: "Chainalysis", tags: ["Compliance", "Data"], people: ["Policy Lead"], role: "Regulatory signal" },
    ],
  },
  {
    id: "consensus-hong-kong",
    name: "Consensus Hong Kong",
    city: "Hong Kong",
    country: "Hong Kong",
    date: "Feb 18 - Feb 20, 2026",
    days: 3,
    tier: "A",
    autoTier: "A",
    tierScore: 84,
    tierReasons: ["Asia policy relevance", "media reach", "institutional programming"],
    gradient: "from-rose-100 via-white to-sky-100",
    cost: { flight: 420, hotel: 1180, transport: 120, meals: 310, ticket: 899, total: 2929, note: "Ticket estimated from prior public pricing." },
    summary: {
      features: ["Policy, media, and institution-led agenda", "Strong Asia gateway positioning", "High signal for listed-company interest"],
      difference: ["Less founder-chaotic than ETH events", "More editorial programming", "Better APAC policy context"],
      pros: ["Shorter ICN flight", "Strong venue logistics", "Useful media access"],
      risks: ["Ticket pricing source is thinner", "Side-event map may publish late", "Institutional talks can be less actionable"],
      expectations: ["APAC regulatory reads", "Enterprise adoption contacts", "Media and analyst meetings"],
    },
    feed: [
      { label: "Speaker batch added for policy track", time: "3h ago", type: "Speaker" },
      { label: "Visa-free entry note refreshed", time: "8h ago", type: "Travel" },
      { label: "Archive comparison added for APAC media count", time: "Yesterday", type: "Archive" },
    ],
    archive: {
      year: "2025",
      attendees: "8K+",
      sideEvents: 92,
      sponsors: 96,
      media: 110,
      note: "Previous archive is strongest for media access, policy talks, and exchange-side APAC strategy.",
    },
    kpis: [
      { label: "Meeting fit", value: "Med", detail: "Policy and media" },
      { label: "Archive lift", value: "+11%", detail: "Media mentions" },
      { label: "Update cadence", value: "3d", detail: "Until 30-day window" },
    ],
    budget: [
      { label: "Flight", value: 420 },
      { label: "Hotel", value: 1180 },
      { label: "Ticket", value: 899 },
      { label: "Local", value: 430 },
    ],
    sideEventTrend: [
      { label: "2023", value: 58 },
      { label: "2024", value: 78 },
      { label: "2025", value: 92 },
    ],
    actions: ["Prioritize policy and media meetings", "Validate ticket source before budget lock", "Watch side-event list publication"],
    companies: [
      { name: "HashKey", tags: ["Exchange", "APAC"], people: ["Strategy Lead"], role: "Hong Kong licensing read", isNew: true },
      { name: "SC Ventures", tags: ["Banking", "Venture"], people: ["Digital Assets Lead"], role: "Enterprise access" },
      { name: "CoinDesk", tags: ["Media"], people: ["Editorial Director"], role: "Coverage planning" },
      { name: "CMCC Global", tags: ["VC", "Hong Kong"], people: ["Investment Team"], role: "APAC thesis" },
    ],
  },
  {
    id: "bitcoin-nashville",
    name: "Bitcoin Conference Nashville",
    city: "Nashville",
    country: "United States",
    date: "May 27 - May 29, 2026",
    days: 3,
    tier: "A",
    autoTier: "A",
    tierScore: 82,
    tierReasons: ["Bitcoin-native concentration", "policy visibility", "retail and mining sponsors"],
    gradient: "from-orange-100 via-white to-lime-100",
    cost: { flight: 920, hotel: 1060, transport: 170, meals: 360, ticket: 649, total: 3159 },
    summary: {
      features: ["Bitcoin-native audience", "Policy and mining visibility", "Strong retail brand presence"],
      difference: ["Narrower asset focus", "Better for Bitcoin treasury and mining", "Less useful for broad web3 tooling"],
      pros: ["Clear thesis fit if Bitcoin-focused", "Strong sponsor commitment", "Media moments can be outsized"],
      risks: ["Lower relevance for non-Bitcoin protocols", "Travel logistics require US domestic leg", "VIP programming may gate some access"],
      expectations: ["Mining infrastructure meetings", "Treasury strategy conversations", "Policy and media moments"],
    },
    feed: [
      { label: "Mining sponsor category expanded", time: "4h ago", type: "Sponsor" },
      { label: "Speaker placeholder added for policy keynote", time: "9h ago", type: "Speaker" },
      { label: "Venue hotel block flagged as limited", time: "Yesterday", type: "Cost" },
    ],
    archive: {
      year: "2025",
      attendees: "22K+",
      sideEvents: 140,
      sponsors: 132,
      media: 95,
      note: "Archive signal was strongest around mining, treasury adoption, and US policy attention.",
    },
    kpis: [
      { label: "Meeting fit", value: "Med", detail: "Bitcoin-specific" },
      { label: "Archive lift", value: "+9%", detail: "Sponsor count YoY" },
      { label: "Update cadence", value: "7d", detail: "Outside 30 days" },
    ],
    budget: [
      { label: "Flight", value: 920 },
      { label: "Hotel", value: 1060 },
      { label: "Ticket", value: 649 },
      { label: "Local", value: 530 },
    ],
    sideEventTrend: [
      { label: "2023", value: 96 },
      { label: "2024", value: 128 },
      { label: "2025", value: 140 },
    ],
    actions: ["Confirm Bitcoin thesis fit before booking", "Map mining and custody sponsors", "Hold media slots around keynote window"],
    companies: [
      { name: "Blockstream", tags: ["Bitcoin", "Infra"], people: ["Partnership Lead"], role: "Infrastructure fit" },
      { name: "Marathon Digital", tags: ["Mining"], people: ["Investor Relations"], role: "Mining market read", isNew: true },
      { name: "Strike", tags: ["Payments"], people: ["BD Lead"], role: "Payment rails" },
      { name: "Galaxy", tags: ["Finance", "Mining"], people: ["Research Lead"], role: "Market context" },
    ],
  },
];
