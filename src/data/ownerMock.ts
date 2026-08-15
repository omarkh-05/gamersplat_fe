/* ---------------- Owner dashboard mock data ---------------- */
import center1 from "@/assets/images/center-1.jpg";
import center2 from "@/assets/images/center-2.jpg";
import center6 from "@/assets/images/center-6.jpg";
import resPc from "@/assets/images/resource-pc.jpg";
import resConsole from "@/assets/images/resource-console.jpg";
import resVr from "@/assets/images/resource-vr.jpg";
import resVipRoom from "@/assets/images/resource-vip-room.jpg";
import resRoom from "@/assets/images/resource-room.jpg";
import resCafeteria from "@/assets/images/resource-cafeteria.jpg";

/** Default imagery per resource category / name keyword. */
export const resourceImages = {
  PC: resPc.src,
  Console: resConsole.src,
  VR: resVr.src,
  Room: resRoom.src,
  VipRoom: resVipRoom.src,
  Food: resCafeteria.src,
} as const;

export const resourceImageFor = (name: string, category: string) => {
  const n = name.toLowerCase();
  if (n.includes("vip")) return resourceImages.VipRoom;
  if (n.includes("cafeteria") || n.includes("food")) return resourceImages.Food;
  if (n.includes("vr") || n.includes("quest")) return resourceImages.VR;
  if (n.includes("room")) return resourceImages.Room;
  if (n.includes("xbox") || n.includes("playstation") || n.includes("ps5"))
    return resourceImages.Console;
  if (n.includes("pc")) return resourceImages.PC;
  return resourceImages[category as keyof typeof resourceImages] ?? resPc;
};

export type OwnerCenter = {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
  address: string;
  coords: string;
  phone: string;
  hours: string;
  status: "Open" | "Busy" | "Closed" | "Pending";
  devices: number;
  rating: number;
  services: string[];
  branches: string[];
  gallery: number;
  image: string;
};

export const ownerCenters: OwnerCenter[] = [
  {
    id: "oc1",
    name: "Neon Arena",
    description:
      "Premier esports arena with 200+ stations and a tournament stage.",
    country: "Egypt",
    city: "Cairo",
    address: "14 Tahrir St., Downtown",
    coords: "30.0444, 31.2357",
    phone: "+20 100 555 7788",
    hours: "10:00 – 02:00",
    status: "Open",
    devices: 62,
    rating: 4.8,
    services: ["Gaming PC", "PlayStation 5", "VIP Rooms", "Cafeteria"],
    branches: ["Downtown", "Nasr City"],
    gallery: 8,
    image: center1.src,
  },
  {
    id: "oc2",
    name: "Pixel Lounge",
    description: "Cozy console lounge focused on PlayStation and co-op gaming.",
    country: "Egypt",
    city: "Alexandria",
    address: "5 Corniche Rd., Sidi Gaber",
    coords: "31.2001, 29.9187",
    phone: "+20 101 222 3344",
    hours: "12:00 – 00:00",
    status: "Busy",
    devices: 28,
    rating: 4.6,
    services: ["PlayStation 5", "Xbox", "Cafeteria"],
    branches: ["Sidi Gaber"],
    gallery: 5,
    image: center2.src,
  },
  {
    id: "oc3",
    name: "Cobalt Esports",
    description:
      "Pro training facility used by competitive teams in the region.",
    country: "Saudi Arabia",
    city: "Riyadh",
    address: "Olaya District, Tower 3",
    coords: "24.7136, 46.6753",
    phone: "+966 55 887 1200",
    hours: "24 hours",
    status: "Pending",
    devices: 40,
    rating: 4.7,
    services: ["Gaming PC", "VR", "VIP Devices"],
    branches: ["Olaya"],
    gallery: 6,
    image: center6.src,
  },
];

export type ServiceType = {
  id: string;
  centerId: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  total: number;
  available: number;
  reserved: number;
  maintenance: number;
  active: boolean;
  image?: string;
};

export const serviceTypes: ServiceType[] = [
  {
    id: "sv1",
    centerId: "oc1",
    name: "Gaming PC",
    category: "PC",
    unit: "per hour",
    basePrice: 45,
    total: 30,
    available: 18,
    reserved: 10,
    maintenance: 2,
    active: true,
    image: resourceImageFor("Gaming PC", "PC"),
  },
  {
    id: "sv2",
    centerId: "oc1",
    name: "PlayStation 5",
    category: "Console",
    unit: "per hour",
    basePrice: 60,
    total: 14,
    available: 8,
    reserved: 5,
    maintenance: 1,
    active: true,
    image: resourceImageFor("PlayStation 5", "Console"),
  },
  {
    id: "sv3",
    centerId: "oc1",
    name: "VIP Room",
    category: "Room",
    unit: "per hour",
    basePrice: 220,
    total: 4,
    available: 2,
    reserved: 2,
    maintenance: 0,
    active: true,
    image: resourceImageFor("VIP Room", "Room"),
  },
  {
    id: "sv4",
    centerId: "oc1",
    name: "Cafeteria",
    category: "Food",
    unit: "per order",
    basePrice: 25,
    total: 1,
    available: 1,
    reserved: 0,
    maintenance: 0,
    active: false,
    image: resourceImageFor("Cafeteria", "Food"),
  },
  {
    id: "sv5",
    centerId: "oc2",
    name: "PlayStation 5",
    category: "Console",
    unit: "per hour",
    basePrice: 55,
    total: 16,
    available: 9,
    reserved: 6,
    maintenance: 1,
    active: true,
    image: resourceImageFor("PlayStation 5", "Console"),
  },
  {
    id: "sv6",
    centerId: "oc2",
    name: "Xbox Series X",
    category: "Console",
    unit: "per hour",
    basePrice: 50,
    total: 8,
    available: 5,
    reserved: 3,
    maintenance: 0,
    active: true,
    image: resourceImageFor("Xbox Series X", "Console"),
  },
  {
    id: "sv7",
    centerId: "oc2",
    name: "Private Room",
    category: "Room",
    unit: "per hour",
    basePrice: 150,
    total: 3,
    available: 2,
    reserved: 1,
    maintenance: 0,
    active: true,
    image: resourceImageFor("Private Room", "Room"),
  },
  {
    id: "sv8",
    centerId: "oc3",
    name: "Gaming PC",
    category: "PC",
    unit: "per hour",
    basePrice: 50,
    total: 24,
    available: 14,
    reserved: 8,
    maintenance: 2,
    active: true,
    image: resourceImageFor("Gaming PC", "PC"),
  },
  {
    id: "sv9",
    centerId: "oc3",
    name: "VR Station",
    category: "VR",
    unit: "per 30 min",
    basePrice: 80,
    total: 6,
    available: 4,
    reserved: 1,
    maintenance: 1,
    active: true,
    image: resourceImageFor("VR Station", "VR"),
  },
  {
    id: "sv10",
    centerId: "oc3",
    name: "VIP Device",
    category: "PC",
    unit: "per hour",
    basePrice: 90,
    total: 10,
    available: 6,
    reserved: 4,
    maintenance: 0,
    active: true,
    image: resourceImageFor("VIP Device", "PC"),
  },
];

export type OwnerDevice = {
  id: string;
  centerId: string;
  name: string;
  type: string;
  serial: string;
  center: string;
  status: "Available" | "Reserved" | "Maintenance" | "Disabled";
  pricePerHour: number;
};

export const ownerDevices: OwnerDevice[] = [
  {
    id: "dv1",
    centerId: "oc1",
    name: "PS5 Pro · VIP 2",
    type: "PlayStation 5",
    serial: "PS5-2291-A",
    center: "Neon Arena",
    status: "Reserved",
    pricePerHour: 60,
  },
  {
    id: "dv2",
    centerId: "oc1",
    name: "RTX 4080 · Station 7",
    type: "Gaming PC",
    serial: "PC-4080-07",
    center: "Neon Arena",
    status: "Available",
    pricePerHour: 90,
  },
  {
    id: "dv3",
    centerId: "oc1",
    name: "VIP Room 1",
    type: "VIP Room",
    serial: "RM-VIP-01",
    center: "Neon Arena",
    status: "Available",
    pricePerHour: 220,
  },
  {
    id: "dv4",
    centerId: "oc2",
    name: "Xbox Series X · Booth 3",
    type: "Xbox Series X",
    serial: "XB-1043-C",
    center: "Pixel Lounge",
    status: "Available",
    pricePerHour: 50,
  },
  {
    id: "dv5",
    centerId: "oc2",
    name: "PS5 · Booth 9",
    type: "PlayStation 5",
    serial: "PS5-1180-D",
    center: "Pixel Lounge",
    status: "Disabled",
    pricePerHour: 55,
  },
  {
    id: "dv6",
    centerId: "oc3",
    name: "RTX 3060 · Row B",
    type: "Gaming PC",
    serial: "PC-3060-B2",
    center: "Cobalt Esports",
    status: "Maintenance",
    pricePerHour: 45,
  },
  {
    id: "dv7",
    centerId: "oc3",
    name: "Meta Quest 3 · VR 1",
    type: "VR Station",
    serial: "VR-Q3-001",
    center: "Cobalt Esports",
    status: "Available",
    pricePerHour: 80,
  },
];

export type OwnerBookingRow = {
  id: string;
  centerId: string;
  player: string;
  device: string;
  center: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  total: number;
  hours: number;
  notes: string;
};

export const ownerBookingRows: OwnerBookingRow[] = [
  {
    id: "bk1",
    centerId: "oc1",
    player: "Omar Ahmed",
    device: "PS5 Pro · VIP 2",
    center: "Neon Arena",
    date: "2026-08-12",
    time: "18:00 – 20:00",
    status: "Pending",
    total: 120,
    hours: 2,
    notes: "Requests two controllers.",
  },
  {
    id: "bk2",
    centerId: "oc1",
    player: "Sara Nabil",
    device: "RTX 4080 · Station 7",
    center: "Neon Arena",
    date: "2026-08-12",
    time: "19:00 – 22:00",
    status: "Confirmed",
    total: 270,
    hours: 3,
    notes: "Valorant scrim block.",
  },
  {
    id: "bk3",
    centerId: "oc2",
    player: "Karim Hassan",
    device: "Xbox Series X · Booth 3",
    center: "Pixel Lounge",
    date: "2026-08-11",
    time: "16:00 – 17:00",
    status: "Completed",
    total: 50,
    hours: 1,
    notes: "—",
  },
  {
    id: "bk4",
    centerId: "oc1",
    player: "Lina Farouk",
    device: "VIP Room 1",
    center: "Neon Arena",
    date: "2026-08-10",
    time: "21:00 – 23:00",
    status: "Cancelled",
    total: 300,
    hours: 2,
    notes: "Cancelled by player.",
  },
  {
    id: "bk5",
    centerId: "oc3",
    player: "Yousef Magdy",
    device: "Meta Quest 3 · VR 1",
    center: "Cobalt Esports",
    date: "2026-08-14",
    time: "13:00 – 14:00",
    status: "Pending",
    total: 80,
    hours: 1,
    notes: "First-time VR user.",
  },
  {
    id: "bk6",
    centerId: "oc3",
    player: "Nour Salem",
    device: "RTX 3060 · Row B",
    center: "Cobalt Esports",
    date: "2026-08-15",
    time: "20:00 – 23:00",
    status: "Confirmed",
    total: 135,
    hours: 3,
    notes: "—",
  },
];

export type CustomerRequest = {
  id: string;
  type: "Booking Request" | "Cancellation Request" | "Inquiry";
  player: string;
  subject: string;
  message: string;
  date: string;
  status: "Pending" | "Accepted" | "Rejected";
};

export const customerRequests: CustomerRequest[] = [
  {
    id: "rq1",
    type: "Booking Request",
    player: "Omar Ahmed",
    subject: "VIP Room 2 · Friday night",
    message: "Can I book VIP Room 2 from 20:00 to 23:00 for 5 players?",
    date: "Aug 09, 2026",
    status: "Pending",
  },
  {
    id: "rq2",
    type: "Cancellation Request",
    player: "Lina Farouk",
    subject: "Cancel booking #bk4",
    message: "Something came up, I need to cancel and get a refund.",
    date: "Aug 08, 2026",
    status: "Pending",
  },
  {
    id: "rq3",
    type: "Inquiry",
    player: "Karim Hassan",
    subject: "Do you have racing wheels?",
    message: "Planning a sim-racing night for 6 friends.",
    date: "Aug 07, 2026",
    status: "Accepted",
  },
  {
    id: "rq4",
    type: "Booking Request",
    player: "Yara Adel",
    subject: "Weekly PC block",
    message: "Looking for a recurring 3-hour PC block every Sunday.",
    date: "Aug 05, 2026",
    status: "Rejected",
  },
];

export type Offer = {
  id: string;
  centerId: string;
  title: string;
  description: string;
  benefit: string;
  start: string;
  end: string;
  audience: string;
  status: "Active" | "Scheduled" | "Expired" | "Draft";
  used: number;
};

export const ownerOffers: Offer[] = [
  {
    id: "of1",
    centerId: "oc1",
    title: "Happy Hour",
    description: "30% off all PC stations between 14:00 and 17:00.",
    benefit: "30% OFF",
    start: "2026-08-01",
    end: "2026-09-30",
    audience: "All players",
    status: "Active",
    used: 214,
  },
  {
    id: "of2",
    centerId: "oc1",
    title: "Weekend VIP Pass",
    description: "5 hours in any VIP room for a flat price.",
    benefit: "Bundle · $120",
    start: "2026-08-05",
    end: "2026-08-31",
    audience: "VIP members",
    status: "Active",
    used: 78,
  },
  {
    id: "of3",
    centerId: "oc2",
    title: "Student Tuesdays",
    description: "Half price with a valid student ID.",
    benefit: "50% OFF",
    start: "2026-09-01",
    end: "2026-12-31",
    audience: "Students",
    status: "Scheduled",
    used: 0,
  },
  {
    id: "of4",
    centerId: "oc3",
    title: "Ramadan Nights",
    description: "Late-night sessions at reduced rates.",
    benefit: "25% OFF",
    start: "2026-03-01",
    end: "2026-04-01",
    audience: "All players",
    status: "Expired",
    used: 342,
  },
];

export type OwnerTournament = {
  id: string;
  centerId: string;
  name: string;
  game: string;
  description: string;
  date: string;
  center: string;
  maxPlayers: number;
  joined: number;
  prize: string;
  entry: number;
  status: "Draft" | "Published" | "Live" | "Finished";
  winner?: string;
};

export const ownerTournaments: OwnerTournament[] = [
  {
    id: "ot1",
    centerId: "oc1",
    name: "Valorant Open Cup",
    game: "Valorant",
    description: "Regional 5v5 open bracket.",
    date: "2026-08-22 17:00",
    center: "Neon Arena",
    maxPlayers: 64,
    joined: 32,
    prize: "$1,200",
    entry: 25,
    status: "Published",
  },
  {
    id: "ot2",
    centerId: "oc2",
    name: "EA FC Showdown",
    game: "EA FC 25",
    description: "1v1 knockout on PS5 Pro.",
    date: "2026-08-29 19:00",
    center: "Pixel Lounge",
    maxPlayers: 16,
    joined: 14,
    prize: "$500",
    entry: 15,
    status: "Live",
  },
  {
    id: "ot3",
    centerId: "oc3",
    name: "CS2 Night Clash",
    game: "Counter-Strike 2",
    description: "Late-night 5v5 with live shoutcast.",
    date: "2026-07-05 21:00",
    center: "Cobalt Esports",
    maxPlayers: 40,
    joined: 40,
    prize: "$900",
    entry: 20,
    status: "Finished",
    winner: "Dust Riders",
  },
  {
    id: "ot4",
    centerId: "oc1",
    name: "Apex Rumble",
    game: "Apex Legends",
    description: "Trios battle royale, points based.",
    date: "2026-09-12 18:00",
    center: "Neon Arena",
    maxPlayers: 60,
    joined: 0,
    prize: "$750",
    entry: 18,
    status: "Draft",
  },
];

export type OwnerEmployee = {
  id: string;
  centerId: string;
  name: string;
  phone: string;
  role: string;
  center: string;
  permissions: string[];
  status: "Active" | "On leave" | "Suspended";
};

export const allPermissions = [
  "Bookings",
  "Devices",
  "Offers",
  "Tournaments",
  "Revenue",
  "Employees",
];

export const ownerEmployees: OwnerEmployee[] = [
  {
    id: "em1",
    centerId: "oc1",
    name: "Mostafa Adel",
    phone: "+20 100 111 2233",
    role: "Shift Manager",
    center: "Neon Arena",
    permissions: ["Bookings", "Devices", "Offers"],
    status: "Active",
  },
  {
    id: "em2",
    centerId: "oc1",
    name: "Nour Salem",
    phone: "+20 100 444 5566",
    role: "Cashier",
    center: "Neon Arena",
    permissions: ["Bookings"],
    status: "Active",
  },
  {
    id: "em3",
    centerId: "oc2",
    name: "Hassan Tarek",
    phone: "+20 101 777 8899",
    role: "Technician",
    center: "Pixel Lounge",
    permissions: ["Devices"],
    status: "On leave",
  },
  {
    id: "em4",
    centerId: "oc3",
    name: "Dalia Sameh",
    phone: "+966 55 900 1122",
    role: "Community Manager",
    center: "Cobalt Esports",
    permissions: ["Tournaments", "Offers"],
    status: "Active",
  },
];

export const revenueByDevice = [
  { name: "Gaming PC", revenue: 18400 },
  { name: "PlayStation 5", revenue: 12800 },
  { name: "VIP Rooms", revenue: 9600 },
  { name: "Xbox", revenue: 5200 },
  { name: "VR", revenue: 3100 },
];

export const revenueByPeriod = {
  "7d": [
    { label: "Mon", revenue: 1200 },
    { label: "Tue", revenue: 1580 },
    { label: "Wed", revenue: 1340 },
    { label: "Thu", revenue: 2100 },
    { label: "Fri", revenue: 3200 },
    { label: "Sat", revenue: 3980 },
    { label: "Sun", revenue: 3420 },
  ],
  "30d": [
    { label: "W1", revenue: 9800 },
    { label: "W2", revenue: 11200 },
    { label: "W3", revenue: 10450 },
    { label: "W4", revenue: 13600 },
  ],
  "12m": [
    { label: "Sep", revenue: 18200 },
    { label: "Oct", revenue: 19400 },
    { label: "Nov", revenue: 21100 },
    { label: "Dec", revenue: 26800 },
    { label: "Jan", revenue: 22400 },
    { label: "Feb", revenue: 12400 },
    { label: "Mar", revenue: 15200 },
    { label: "Apr", revenue: 14100 },
    { label: "May", revenue: 18900 },
    { label: "Jun", revenue: 21300 },
    { label: "Jul", revenue: 24800 },
    { label: "Aug", revenue: 16900 },
  ],
} as const;

export const profitableSessions = [
  {
    id: "ps1",
    label: "Friday VIP Night · Neon Arena",
    revenue: 4200,
    sessions: 38,
  },
  {
    id: "ps2",
    label: "Saturday Esports Block · Cobalt",
    revenue: 3650,
    sessions: 44,
  },
  {
    id: "ps3",
    label: "Weekend Co-op · Pixel Lounge",
    revenue: 2480,
    sessions: 51,
  },
  {
    id: "ps4",
    label: "Late Night PC · Neon Arena",
    revenue: 1980,
    sessions: 33,
  },
];

export const peakHours = [
  { hour: "12", bookings: 14 },
  { hour: "14", bookings: 22 },
  { hour: "16", bookings: 34 },
  { hour: "18", bookings: 58 },
  { hour: "20", bookings: 76 },
  { hour: "22", bookings: 61 },
  { hour: "00", bookings: 29 },
];

export const ratingTrend = [
  { month: "Mar", rating: 4.3 },
  { month: "Apr", rating: 4.4 },
  { month: "May", rating: 4.5 },
  { month: "Jun", rating: 4.6 },
  { month: "Jul", rating: 4.7 },
  { month: "Aug", rating: 4.8 },
];

export const popularGames = [
  { name: "Valorant", players: 320 },
  { name: "EA FC 25", players: 265 },
  { name: "CS2", players: 210 },
  { name: "Apex Legends", players: 145 },
  { name: "Fortnite", players: 98 },
];
