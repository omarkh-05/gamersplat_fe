import center1 from "@/assets/images/center-1.jpg";
import center2 from "@/assets/images/center-2.jpg";
import center3 from "@/assets/images/center-3.jpg";
import center4 from "@/assets/images/center-4.jpg";
import center5 from "@/assets/images/center-5.jpg";
import center6 from "@/assets/images/center-6.jpg";

export type Center = {
  id: string;
  name: string;
  city: string;
  country: string;
  status: "Open" | "Closed" | "Busy";
  rating: number;
  reviews: number;
  image: string;
  logo: string;
  tag: string;
  description: string;
};

export const countries = ["Egypt", "UAE", "Saudi Arabia", "Morocco", "Jordan"];
export const cities = [
  "Cairo",
  "Alexandria",
  "Dubai",
  "Riyadh",
  "Casablanca",
  "Amman",
];

export const centers: Center[] = [
  {
    id: "c1",
    name: "Neon Arena",
    city: "Cairo",
    country: "Egypt",
    status: "Open",
    rating: 4.8,
    reviews: 312,
    image: center1.src,
    logo: "NA",
    tag: "Esports",
    description:
      "Premier esports arena with 200+ stations and a tournament stage.",
  },
  {
    id: "c2",
    name: "Pixel Lounge",
    city: "Alexandria",
    country: "Egypt",
    status: "Busy",
    rating: 4.6,
    reviews: 187,
    image: center2.src,
    logo: "PL",
    tag: "Console",
    description: "Cozy console lounge focused on PlayStation and co-op gaming.",
  },
  {
    id: "c3",
    name: "Gold Tier VIP",
    city: "Dubai",
    country: "UAE",
    status: "Open",
    rating: 4.9,
    reviews: 421,
    image: center3.src,
    logo: "GT",
    tag: "VIP",
    description:
      "Luxury VIP rooms with curved ultrawides and concierge service.",
  },
  {
    id: "c4",
    name: "Retro Republic",
    city: "Casablanca",
    country: "Morocco",
    status: "Open",
    rating: 4.4,
    reviews: 96,
    image: center4.src,
    logo: "RR",
    tag: "Arcade",
    description: "Classic cabinets meet modern lighting. A nostalgia paradise.",
  },
  {
    id: "c5",
    name: "Green Net",
    city: "Amman",
    country: "Jordan",
    status: "Closed",
    rating: 4.2,
    reviews: 64,
    image: center5.src,
    logo: "GN",
    tag: "Net Cafe",
    description: "High-speed fiber, comfortable chairs, study & play vibes.",
  },
  {
    id: "c6",
    name: "Cobalt Esports",
    city: "Riyadh",
    country: "Saudi Arabia",
    status: "Open",
    rating: 4.7,
    reviews: 245,
    image: center6.src,
    logo: "CE",
    tag: "Pro",
    description:
      "Pro training facility used by competitive teams in the region.",
  },
];

/** Services configured per center, displayed in the Center Details About section. */
export type CenterService = {
  id: string;
  centerId: string;
  name: string;
  icon: string;
  description: string;
  image?: string;
  status: "Active" | "Disabled";
};

export const centerServices: Record<string, CenterService[]> = {
  c1: [
    {
      id: "cs1",
      centerId: "c1",
      name: "10Gbps Fiber",
      icon: "internet",
      description: "Ultra-fast fiber for smooth gaming and streaming.",
      status: "Active",
    },
    {
      id: "cs2",
      centerId: "c1",
      name: "Gamer Lounge",
      icon: "lounge",
      description: "Comfortable lounge space for teams and spectators.",
      status: "Active",
    },
    {
      id: "cs3",
      centerId: "c1",
      name: "Climate Control",
      icon: "climate",
      description: "Reliable cooling and climate control in every room.",
      status: "Active",
    },
    {
      id: "cs4",
      centerId: "c1",
      name: "Gear Storage",
      icon: "storage",
      description: "Safe storage for bags, gear, and accessories.",
      status: "Active",
    },
  ],
  c2: [
    {
      id: "cs5",
      centerId: "c2",
      name: "High-Speed Internet",
      icon: "internet",
      description: "Low-latency internet for tournaments and pair play.",
      status: "Active",
    },
    {
      id: "cs6",
      centerId: "c2",
      name: "Chill Lounge",
      icon: "lounge",
      description: "Casual lounge area for players and friends.",
      status: "Active",
    },
    {
      id: "cs7",
      centerId: "c2",
      name: "Air Conditioning",
      icon: "climate",
      description: "Comfortable environment throughout the day.",
      status: "Active",
    },
  ],
  c3: [
    {
      id: "cs8",
      centerId: "c3",
      name: "VIP Experience",
      icon: "vip",
      description: "Premium lounge access for VIP guests.",
      status: "Active",
    },
    {
      id: "cs9",
      centerId: "c3",
      name: "Climate Control",
      icon: "climate",
      description: "Luxury-level airflow and comfort throughout the center.",
      status: "Active",
    },
    {
      id: "cs10",
      centerId: "c3",
      name: "Gear Storage",
      icon: "storage",
      description: "Dedicated secure gear and accessory storage.",
      status: "Active",
    },
  ],
};

/** Feature/facility keys available per center (used by Center Details). */
export const centerFeatures: Record<string, string[]> = {
  c1: [
    "internet",
    "lounge",
    "climate",
    "vip",
    "storage",
    "parking",
    "cafeteria",
  ],
  c2: ["internet", "lounge", "climate", "cafeteria", "parking"],
  c3: ["internet", "vip", "climate", "storage", "cafeteria", "parking"],
  c4: ["internet", "lounge", "climate", "cafeteria"],
  c5: ["internet", "lounge", "climate", "parking"],
  c6: ["internet", "lounge", "climate", "vip", "storage", "parking"],
};

/** Resource highlights shown in the About section. */
export const centerHighlights: Record<string, string[]> = {
  c1: ["Gaming PC", "PlayStation 5", "VIP Rooms", "Tournament Stage"],
  c2: ["PlayStation 5", "Xbox Series X", "Co-op Booths", "Cafeteria"],
  c3: ["VIP Rooms", "Ultrawide PCs", "Concierge", "Lounge"],
  c4: ["Arcade Cabinets", "Retro Consoles", "Lounge", "Cafeteria"],
  c5: ["Gaming PC", "Fiber Internet", "Study Zone", "Cafeteria"],
  c6: ["Gaming PC", "VR Station", "Bootcamp Rooms", "Analyst Desks"],
};

export const devices = [
  {
    id: "d1",
    name: "PS5 Pro",
    type: "Console",
    pricePerHour: 60,
    qty: 12,
    section: "VIP" as const,
    game: "EA FC 25",
  },
  {
    id: "d2",
    name: "RTX 4080 PC",
    type: "PC",
    pricePerHour: 90,
    qty: 20,
    section: "VIP" as const,
    game: "Valorant",
  },
  {
    id: "d3",
    name: "Xbox Series X",
    type: "Console",
    pricePerHour: 50,
    qty: 8,
    section: "Normal" as const,
    game: "Halo Infinite",
  },
  {
    id: "d4",
    name: "RTX 3060 PC",
    type: "PC",
    pricePerHour: 45,
    qty: 30,
    section: "Normal" as const,
    game: "CS2",
  },
];

export const tournaments = [
  {
    id: "t1",
    name: "Valorant Open Cup",
    prize: "$1,200",
    entry: 25,
    slots: "32 / 64",
  },
  {
    id: "t2",
    name: "EA FC Showdown",
    prize: "$500",
    entry: 15,
    slots: "12 / 16",
  },
];
export const sessions = [
  { id: "s1", name: "5v5 Apex Night", price: 30, players: "7 / 10" },
  { id: "s2", name: "FIFA Co-op", price: 20, players: "3 / 4" },
];
export const offers = [
  { id: "o1", name: "Happy Hour 2-5pm", discount: "30% OFF", price: 35 },
  { id: "o2", name: "Weekend Pass", discount: "Bundle", price: 120 },
];

export const analyticsBookings = [
  { day: "Mon", bookings: 24 },
  { day: "Tue", bookings: 32 },
  { day: "Wed", bookings: 28 },
  { day: "Thu", bookings: 45 },
  { day: "Fri", bookings: 68 },
  { day: "Sat", bookings: 82 },
  { day: "Sun", bookings: 71 },
];
export const analyticsDevices = [
  { name: "PS5 Pro", value: 320 },
  { name: "RTX 4080", value: 280 },
  { name: "Xbox X", value: 180 },
  { name: "RTX 3060", value: 240 },
];
export const analyticsActivity = [
  { hour: "10", players: 12 },
  { hour: "12", players: 28 },
  { hour: "14", players: 42 },
  { hour: "16", players: 56 },
  { hour: "18", players: 88 },
  { hour: "20", players: 120 },
  { hour: "22", players: 96 },
];

/* ---------------- Tournaments ---------------- */
export type Tournament = {
  id: string;
  name: string;
  game: string;
  description: string;
  date: string;
  center: string;
  maxPlayers: number;
  joined: number;
  prize: string;
  entry: number;
  status: "Open" | "Almost Full" | "Closed";
  rules: string[];
  schedule: { time: string; label: string }[];
  participants: { name: string; tag: string }[];
};

export const tournamentList: Tournament[] = [
  {
    id: "tr1",
    name: "Valorant Open Cup",
    game: "Valorant",
    description:
      "Regional 5v5 open bracket. Single elimination until semis, then Bo3.",
    date: "Aug 22, 2026 · 17:00",
    center: "Neon Arena",
    maxPlayers: 64,
    joined: 32,
    prize: "$1,200",
    entry: 25,
    status: "Open",
    rules: [
      "Teams of 5 (+1 sub allowed)",
      "No coaching during live rounds",
      "Check-in closes 30 min before start",
      "Any cheating results in permanent ban",
    ],
    schedule: [
      { time: "16:30", label: "Check-in" },
      { time: "17:00", label: "Round of 64" },
      { time: "19:00", label: "Quarter finals" },
      { time: "21:00", label: "Grand final" },
    ],
    participants: [
      { name: "Sand Kings", tag: "SK" },
      { name: "Delta Six", tag: "D6" },
      { name: "Nile Wolves", tag: "NW" },
      { name: "Zero Ping", tag: "0P" },
    ],
  },
  {
    id: "tr2",
    name: "EA FC Showdown",
    game: "EA FC 25",
    description: "1v1 knockout on PS5 Pro. Classic controls, 6-minute halves.",
    date: "Aug 29, 2026 · 19:00",
    center: "Pixel Lounge",
    maxPlayers: 16,
    joined: 14,
    prize: "$500",
    entry: 15,
    status: "Almost Full",
    rules: [
      "1v1 knockout",
      "6-minute halves",
      "Custom teams disabled",
      "Disconnects count as a loss after 2 attempts",
    ],
    schedule: [
      { time: "18:30", label: "Check-in" },
      { time: "19:00", label: "Round of 16" },
      { time: "20:30", label: "Final" },
    ],
    participants: [
      { name: "Omar A.", tag: "OA" },
      { name: "Karim H.", tag: "KH" },
      { name: "Yousef M.", tag: "YM" },
    ],
  },
  {
    id: "tr3",
    name: "CS2 Night Clash",
    game: "Counter-Strike 2",
    description: "Late-night 5v5 with a live shoutcast on the main stage.",
    date: "Sep 05, 2026 · 21:00",
    center: "Cobalt Esports",
    maxPlayers: 40,
    joined: 40,
    prize: "$900",
    entry: 20,
    status: "Closed",
    rules: ["MR12 competitive rules", "Active duty map pool", "Overtime MR3"],
    schedule: [
      { time: "20:30", label: "Check-in" },
      { time: "21:00", label: "Group stage" },
      { time: "00:00", label: "Final" },
    ],
    participants: [
      { name: "Dust Riders", tag: "DR" },
      { name: "Mirage Co.", tag: "MC" },
    ],
  },
  {
    id: "tr4",
    name: "Apex Legends Rumble",
    game: "Apex Legends",
    description:
      "Trios battle royale across 4 matches, points-based leaderboard.",
    date: "Sep 12, 2026 · 18:00",
    center: "Gold Tier VIP",
    maxPlayers: 60,
    joined: 21,
    prize: "$750",
    entry: 18,
    status: "Open",
    rules: [
      "Trios only",
      "4 matches, cumulative points",
      "Placement + kill points",
    ],
    schedule: [
      { time: "17:30", label: "Lobby open" },
      { time: "18:00", label: "Match 1" },
      { time: "21:00", label: "Match 4" },
    ],
    participants: [
      { name: "Apex Owls", tag: "AO" },
      { name: "Red Sands", tag: "RS" },
    ],
  },
];

/* ---------------- Player data ---------------- */
export type PlayerBooking = {
  id: string;
  center: string;
  device: string;
  date: string;
  time: string;
  total: number;
  status: "Upcoming" | "Completed" | "Cancelled";
};

export const playerBookings: PlayerBooking[] = [
  {
    id: "b1",
    center: "Neon Arena",
    device: "PS5 Pro · VIP Room 2",
    date: "Aug 12, 2026",
    time: "18:00 – 20:00",
    total: 120,
    status: "Upcoming",
  },
  {
    id: "b2",
    center: "Gold Tier VIP",
    device: "RTX 4080 PC · Station 7",
    date: "Aug 18, 2026",
    time: "20:00 – 23:00",
    total: 270,
    status: "Upcoming",
  },
  {
    id: "b3",
    center: "Pixel Lounge",
    device: "Xbox Series X · Booth 3",
    date: "Jul 28, 2026",
    time: "16:00 – 17:00",
    total: 50,
    status: "Completed",
  },
  {
    id: "b4",
    center: "Cobalt Esports",
    device: "RTX 3060 PC · Row B",
    date: "Jul 14, 2026",
    time: "14:00 – 17:00",
    total: 135,
    status: "Completed",
  },
  {
    id: "b5",
    center: "Retro Republic",
    device: "Arcade Pass",
    date: "Jul 02, 2026",
    time: "12:00 – 14:00",
    total: 60,
    status: "Cancelled",
  },
];

export const rewardHistory = [
  {
    id: "r1",
    label: "Session at Neon Arena",
    date: "Jul 28, 2026",
    points: 120,
    type: "Earned" as const,
  },
  {
    id: "r2",
    label: "Free hour redeemed",
    date: "Jul 20, 2026",
    points: -500,
    type: "Redeemed" as const,
  },
  {
    id: "r3",
    label: "Tournament participation",
    date: "Jul 11, 2026",
    points: 300,
    type: "Earned" as const,
  },
  {
    id: "r4",
    label: "Referral bonus",
    date: "Jun 30, 2026",
    points: 250,
    type: "Earned" as const,
  },
];

export const availableRewards = [
  {
    id: "ar1",
    name: "1 Free Hour · Normal",
    cost: 500,
    desc: "Redeem at any partner center.",
  },
  {
    id: "ar2",
    name: "VIP Room Upgrade",
    cost: 1200,
    desc: "Upgrade any booking to a VIP room.",
  },
  {
    id: "ar3",
    name: "Tournament Entry",
    cost: 900,
    desc: "Free entry to one open tournament.",
  },
];

export const playerReviews = [
  {
    id: "pr1",
    center: "Neon Arena",
    rating: 5,
    date: "Jul 29, 2026",
    text: "Perfect setups and zero lag. Staff was super helpful.",
  },
  {
    id: "pr2",
    center: "Pixel Lounge",
    rating: 4,
    date: "Jul 15, 2026",
    text: "Great couch area, could use more PS5 stations.",
  },
  {
    id: "pr3",
    center: "Cobalt Esports",
    rating: 5,
    date: "Jun 22, 2026",
    text: "Pro-level peripherals. Best place to scrim in Riyadh.",
  },
];

/* ---------------- Owner / Admin data ---------------- */
export const ownerBookings = [
  {
    id: "ob1",
    player: "Omar Ahmed",
    center: "Neon Arena",
    device: "PS5 Pro · VIP 2",
    date: "Aug 12, 2026",
    time: "18:00",
    status: "Pending" as const,
    total: 120,
  },
  {
    id: "ob2",
    player: "Sara Nabil",
    center: "Neon Arena",
    device: "RTX 4080 · St. 7",
    date: "Aug 12, 2026",
    time: "19:00",
    status: "Confirmed" as const,
    total: 270,
  },
  {
    id: "ob3",
    player: "Karim Hassan",
    center: "Pixel Lounge",
    device: "Xbox X · Booth 3",
    date: "Aug 11, 2026",
    time: "16:00",
    status: "Completed" as const,
    total: 50,
  },
  {
    id: "ob4",
    player: "Lina Farouk",
    center: "Gold Tier VIP",
    device: "VIP Room 1",
    date: "Aug 10, 2026",
    time: "21:00",
    status: "Cancelled" as const,
    total: 300,
  },
];

export const employees = [
  {
    id: "e1",
    name: "Mostafa Adel",
    role: "Shift Manager",
    center: "Neon Arena",
    phone: "+20 100 111 2233",
    status: "Active",
  },
  {
    id: "e2",
    name: "Nour Salem",
    role: "Cashier",
    center: "Neon Arena",
    phone: "+20 100 444 5566",
    status: "Active",
  },
  {
    id: "e3",
    name: "Hassan Tarek",
    role: "Technician",
    center: "Pixel Lounge",
    phone: "+20 101 777 8899",
    status: "On leave",
  },
];

export const platformUsers = [
  {
    id: "u1",
    name: "Omar Ahmed",
    email: "omar@gamersplat.io",
    role: "Player",
    joined: "Jan 2026",
    status: "Active",
  },
  {
    id: "u2",
    name: "Omar Wahid",
    email: "owner@gamersplat.io",
    role: "Owner",
    joined: "Feb 2025",
    status: "Active",
  },
  {
    id: "u3",
    name: "Sara Nabil",
    email: "sara@mail.com",
    role: "Player",
    joined: "Mar 2026",
    status: "Active",
  },
  {
    id: "u4",
    name: "Lina Farouk",
    email: "lina@mail.com",
    role: "Player",
    joined: "Apr 2026",
    status: "Suspended",
  },
  {
    id: "u5",
    name: "Yara Adel",
    email: "yara@centers.io",
    role: "Owner",
    joined: "May 2026",
    status: "Pending",
  },
];

export const revenueSeries = [
  { month: "Feb", revenue: 12400 },
  { month: "Mar", revenue: 15200 },
  { month: "Apr", revenue: 14100 },
  { month: "May", revenue: 18900 },
  { month: "Jun", revenue: 21300 },
  { month: "Jul", revenue: 24800 },
];
