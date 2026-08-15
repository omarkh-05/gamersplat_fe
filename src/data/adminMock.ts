// Mock data powering the Admin (platform control) dashboard.

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "Player" | "Owner" | "Admin";
  joined: string;
  status: "Active" | "Pending" | "Suspended";
  bookings: number;
  city: string;
};

export const adminUsers: AdminUser[] = [
  { id: "U-1041", name: "Youssef Adel", email: "youssef@mail.com", phone: "+20 100 221 8890", type: "Player", joined: "2026-01-12", status: "Active", bookings: 42, city: "Cairo" },
  { id: "U-1042", name: "Lina Haddad", email: "lina@mail.com", phone: "+962 79 445 1120", type: "Player", joined: "2026-02-03", status: "Active", bookings: 18, city: "Amman" },
  { id: "U-1043", name: "Omar Wahid", email: "owner@gamersplat.io", phone: "+20 100 555 7788", type: "Owner", joined: "2025-09-21", status: "Active", bookings: 0, city: "Cairo" },
  { id: "U-1044", name: "Sara Nassar", email: "sara.n@mail.com", phone: "+971 50 118 2244", type: "Owner", joined: "2026-03-11", status: "Pending", bookings: 0, city: "Dubai" },
  { id: "U-1045", name: "Karim Fathy", email: "karim.f@mail.com", phone: "+20 102 776 3311", type: "Player", joined: "2026-03-28", status: "Suspended", bookings: 7, city: "Alexandria" },
  { id: "U-1046", name: "Noor Alami", email: "noor@mail.com", phone: "+212 6 55 22 88 10", type: "Player", joined: "2026-04-14", status: "Active", bookings: 31, city: "Casablanca" },
  { id: "U-1047", name: "Faisal Otaibi", email: "faisal@mail.com", phone: "+966 55 990 1122", type: "Owner", joined: "2026-05-02", status: "Active", bookings: 0, city: "Riyadh" },
  { id: "U-1048", name: "Omar Admin", email: "admin@gamersplat.io", phone: "+20 100 000 1111", type: "Admin", joined: "2025-06-01", status: "Active", bookings: 0, city: "Cairo" },
];

export type AdminCenter = {
  id: string;
  name: string;
  owner: string;
  ownerEmail: string;
  city: string;
  country: string;
  status: "Active" | "Pending" | "Suspended" | "Rejected";
  rating: number;
  reviews: number;
  registered: string;
  devices: number;
  services: string[];
  bookings: number;
  revenue: number;
  image: string;
};

export const adminCenters: AdminCenter[] = [
  { id: "C-01", name: "Neon Arena", owner: "Omar Wahid", ownerEmail: "owner@gamersplat.io", city: "Cairo", country: "Egypt", status: "Active", rating: 4.8, reviews: 412, registered: "2025-09-22", devices: 48, services: ["PC", "PS5", "VR", "Private rooms"], bookings: 3120, revenue: 84200, image: "/placeholder.svg" },
  { id: "C-02", name: "Pixel Bay", owner: "Omar Wahid", ownerEmail: "owner@gamersplat.io", city: "Alexandria", country: "Egypt", status: "Active", rating: 4.5, reviews: 218, registered: "2025-11-04", devices: 30, services: ["PC", "PS5"], bookings: 1840, revenue: 41800, image: "/placeholder.svg" },
  { id: "C-03", name: "Dune Esports", owner: "Faisal Otaibi", ownerEmail: "faisal@mail.com", city: "Riyadh", country: "Saudi Arabia", status: "Active", rating: 4.9, reviews: 507, registered: "2025-12-18", devices: 64, services: ["PC", "PS5", "VR", "Racing sim"], bookings: 4210, revenue: 112400, image: "/placeholder.svg" },
  { id: "C-04", name: "Marina Gaming Hub", owner: "Sara Nassar", ownerEmail: "sara.n@mail.com", city: "Dubai", country: "UAE", status: "Pending", rating: 0, reviews: 0, registered: "2026-03-12", devices: 22, services: ["PC", "VR"], bookings: 0, revenue: 0, image: "/placeholder.svg" },
  { id: "C-05", name: "Atlas Play", owner: "Noor Alami", ownerEmail: "noor@mail.com", city: "Casablanca", country: "Morocco", status: "Pending", rating: 0, reviews: 0, registered: "2026-04-19", devices: 16, services: ["PS5", "Private rooms"], bookings: 0, revenue: 0, image: "/placeholder.svg" },
  { id: "C-06", name: "Cedar LAN", owner: "Lina Haddad", ownerEmail: "lina@mail.com", city: "Amman", country: "Jordan", status: "Suspended", rating: 3.6, reviews: 74, registered: "2026-01-08", devices: 18, services: ["PC"], bookings: 460, revenue: 9800, image: "/placeholder.svg" },
];

export type AdminBooking = {
  id: string;
  player: string;
  center: string;
  city: string;
  resource: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  total: number;
};

export const adminBookings: AdminBooking[] = [
  { id: "BK-9001", player: "Youssef Adel", center: "Neon Arena", city: "Cairo", resource: "PC #14", date: "2026-08-04", time: "18:00", status: "Confirmed", total: 24 },
  { id: "BK-9002", player: "Lina Haddad", center: "Cedar LAN", city: "Amman", resource: "PC #03", date: "2026-08-04", time: "20:00", status: "Pending", total: 16 },
  { id: "BK-9003", player: "Noor Alami", center: "Atlas Play", city: "Casablanca", resource: "PS5 Room 2", date: "2026-08-03", time: "21:30", status: "Completed", total: 38 },
  { id: "BK-9004", player: "Karim Fathy", center: "Pixel Bay", city: "Alexandria", resource: "VR Pod 1", date: "2026-08-02", time: "17:00", status: "Cancelled", total: 30 },
  { id: "BK-9005", player: "Youssef Adel", center: "Dune Esports", city: "Riyadh", resource: "Racing sim", date: "2026-08-05", time: "19:00", status: "Confirmed", total: 45 },
  { id: "BK-9006", player: "Faisal Otaibi", center: "Dune Esports", city: "Riyadh", resource: "Private room A", date: "2026-08-06", time: "22:00", status: "Pending", total: 60 },
];

export type AdminTournament = {
  id: string;
  name: string;
  center: string;
  game: string;
  date: string;
  participants: number;
  maxParticipants: number;
  prize: string;
  status: "Pending" | "Published" | "Live" | "Finished" | "Rejected";
  winner?: string;
};

export const adminTournaments: AdminTournament[] = [
  { id: "T-501", name: "Valorant Summer Clash", center: "Neon Arena", game: "Valorant", date: "2026-08-15", participants: 48, maxParticipants: 64, prize: "$2,000", status: "Published" },
  { id: "T-502", name: "FIFA Desert Cup", center: "Dune Esports", game: "EA FC 26", date: "2026-08-09", participants: 32, maxParticipants: 32, prize: "$1,200", status: "Live" },
  { id: "T-503", name: "Rocket League Night", center: "Pixel Bay", game: "Rocket League", date: "2026-07-21", participants: 24, maxParticipants: 24, prize: "$600", status: "Finished", winner: "Team Falcon" },
  { id: "T-504", name: "Apex Rookie Series", center: "Atlas Play", game: "Apex Legends", date: "2026-09-02", participants: 6, maxParticipants: 40, prize: "$800", status: "Pending" },
  { id: "T-505", name: "CS2 Amman Open", center: "Cedar LAN", game: "Counter-Strike 2", date: "2026-08-28", participants: 12, maxParticipants: 32, prize: "$1,000", status: "Pending" },
];

export type AdminOffer = {
  id: string;
  name: string;
  center: string;
  discount: string;
  start: string;
  end: string;
  status: "Pending" | "Active" | "Disabled" | "Rejected" | "Expired";
};

export const adminOffers: AdminOffer[] = [
  { id: "O-301", name: "Happy Hour 30%", center: "Neon Arena", discount: "30%", start: "2026-08-01", end: "2026-08-31", status: "Active" },
  { id: "O-302", name: "Student Weekdays", center: "Pixel Bay", discount: "20%", start: "2026-07-15", end: "2026-09-15", status: "Active" },
  { id: "O-303", name: "VR Launch Deal", center: "Marina Gaming Hub", discount: "40%", start: "2026-08-10", end: "2026-08-24", status: "Pending" },
  { id: "O-304", name: "Night Owl Pass", center: "Dune Esports", discount: "25%", start: "2026-06-01", end: "2026-07-01", status: "Expired" },
  { id: "O-305", name: "Squad of 5", center: "Cedar LAN", discount: "15%", start: "2026-08-05", end: "2026-09-05", status: "Disabled" },
];

export type AdminReview = {
  id: string;
  player: string;
  center: string;
  rating: number;
  date: string;
  status: "Published" | "Pending" | "Hidden";
  text: string;
};

export const adminReviews: AdminReview[] = [
  { id: "R-701", player: "Youssef Adel", center: "Neon Arena", rating: 5, date: "2026-08-01", status: "Published", text: "Best rigs in Cairo, zero lag and great staff." },
  { id: "R-702", player: "Lina Haddad", center: "Cedar LAN", rating: 2, date: "2026-07-28", status: "Pending", text: "Booking was double-assigned and nobody helped." },
  { id: "R-703", player: "Noor Alami", center: "Atlas Play", rating: 4, date: "2026-07-25", status: "Published", text: "Comfy private rooms, could use better AC." },
  { id: "R-704", player: "Karim Fathy", center: "Pixel Bay", rating: 1, date: "2026-07-19", status: "Hidden", text: "Flagged for abusive language." },
  { id: "R-705", player: "Faisal Otaibi", center: "Dune Esports", rating: 5, date: "2026-07-11", status: "Published", text: "Tournament organisation was flawless." },
];

export const userGrowth = [
  { month: "Mar", users: 4200, newUsers: 320 },
  { month: "Apr", users: 5100, newUsers: 900 },
  { month: "May", users: 6400, newUsers: 1300 },
  { month: "Jun", users: 8200, newUsers: 1800 },
  { month: "Jul", users: 10500, newUsers: 2300 },
  { month: "Aug", users: 12400, newUsers: 1900 },
];

export const bookingGrowth = [
  { month: "Mar", bookings: 2100 },
  { month: "Apr", bookings: 2700 },
  { month: "May", bookings: 3400 },
  { month: "Jun", bookings: 4100 },
  { month: "Jul", bookings: 5200 },
  { month: "Aug", bookings: 5900 },
];

export const centerGrowth = [
  { month: "Mar", centers: 18 },
  { month: "Apr", centers: 22 },
  { month: "May", centers: 27 },
  { month: "Jun", centers: 33 },
  { month: "Jul", centers: 38 },
  { month: "Aug", centers: 44 },
];

export const platformRevenue = [
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 12400 },
  { month: "May", revenue: 15600 },
  { month: "Jun", revenue: 18900 },
  { month: "Jul", revenue: 22400 },
  { month: "Aug", revenue: 26800 },
];

export const popularGamesPlatform = [
  { name: "Valorant", value: 32 },
  { name: "EA FC 26", value: 24 },
  { name: "CS2", value: 18 },
  { name: "Fortnite", value: 14 },
  { name: "Rocket League", value: 12 },
];

export const popularLocations = [
  { name: "Cairo", value: 38 },
  { name: "Riyadh", value: 26 },
  { name: "Dubai", value: 16 },
  { name: "Amman", value: 12 },
  { name: "Casablanca", value: 8 },
];

export const popularDevicesPlatform = [
  { name: "PC", value: 46 },
  { name: "PS5", value: 28 },
  { name: "VR", value: 14 },
  { name: "Racing sim", value: 12 },
];

export const peakBookingHours = [
  { hour: "12:00", bookings: 120 },
  { hour: "15:00", bookings: 210 },
  { hour: "18:00", bookings: 420 },
  { hour: "21:00", bookings: 520 },
  { hour: "00:00", bookings: 180 },
];

export const revenueByCenter = adminCenters
  .filter((c) => c.revenue > 0)
  .map((c) => ({ name: c.name, revenue: c.revenue }));
