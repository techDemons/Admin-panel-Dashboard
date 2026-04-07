// ─── Projects ────────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  totalVideos: number;
  combinationMultiplier: number;
  createdAt: string;
  status: "generated" | "generating" | "failed";
  videos: Video[];
  hooks: string[];
  ctas: string[];
  subtitles: string[];
  totalCombinations: number;
}

export interface Video {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
  videoUrl: string;
  resolution: string;
  hook: string;
  cta: string;
  subtitle: string;
}

// Local video files from public folder
const LOCAL_VIDEOS = [
  "/videoplayback.mp4",
  "/videoplayback (1).mp4",
];

const dummyHooks = [
  "Wait till you see this...",
  "You won't believe what happens next!",
  "Stop scrolling — this is for you",
  "This changes everything",
  "The secret nobody tells you",
  "Don't miss out!",
  "Here's what nobody tells you",
  "3 things you need to know",
  "Watch before it's too late",
  "POV: You found the perfect product",
  "I tested this for 30 days",
  "Last chance! Only 2 hours left",
  "This is the only guide you need",
  "My dog reacted to this",
  "POV: You finally found what you needed",
];

const dummyCTAs = [
  "Subscribe now!",
  "Swipe up to learn more",
  "Buy now — 50% off",
  "Get yours today",
  "Limited time offer",
  "Shop the sale",
  "Follow for more",
  "Link in bio",
  "Use code SAVE20",
  "Tap to shop",
  "Subscribe for more!",
  "Swipe up now",
  "Buy now — limited stock!",
  "Grab yours today",
  "Don't wait — act now",
];

const dummySubtitles = [
  "Bold White",
  "Neon Glow",
  "Classic Black",
  "Gradient Pop",
  "Minimal Sans",
];

function generate15Videos(prefix: string): Video[] {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `${prefix}-vid-${i + 1}`,
    thumbnail: "",
    title: `${prefix} Video ${i + 1}`,
    duration: `0:${String(15 + (i % 30)).padStart(2, "0")}`,
    videoUrl: LOCAL_VIDEOS[i % LOCAL_VIDEOS.length],
    resolution: "1080 x 1920",
    hook: dummyHooks[i % dummyHooks.length],
    cta: dummyCTAs[i % dummyCTAs.length],
    subtitle: dummySubtitles[i % dummySubtitles.length],
  }));
}

export const mockProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "Summer Campaign 2025",
    totalVideos: 15,
    combinationMultiplier: 4,
    createdAt: "2025-06-15",
    status: "generated",
    videos: generate15Videos("SC"),
    hooks: [
      "Wait till you see this...",
      "You won't believe what happens next!",
      "Stop scrolling — this is for you",
    ],
    ctas: ["Subscribe now!", "Swipe up to learn more", "Buy now — 50% off"],
    subtitles: ["Bold White", "Neon Glow"],
    totalCombinations: 60,
  },
  {
    id: "PRJ-002",
    name: "Product Launch Q3",
    totalVideos: 15,
    combinationMultiplier: 3,
    createdAt: "2025-07-02",
    status: "generating",
    videos: generate15Videos("PL"),
    hooks: ["This changes everything", "The secret nobody tells you"],
    ctas: ["Get yours today", "Limited time offer"],
    subtitles: ["Classic Black", "Gradient Pop"],
    totalCombinations: 24,
  },
  {
    id: "PRJ-003",
    name: "Holiday Promo",
    totalVideos: 15,
    combinationMultiplier: 2,
    createdAt: "2025-08-20",
    status: "failed",
    videos: generate15Videos("HP"),
    hooks: ["Don't miss out!"],
    ctas: ["Shop the sale"],
    subtitles: ["Minimal Sans"],
    totalCombinations: 10,
  },
  {
    id: "PRJ-004",
    name: "Brand Awareness Series",
    totalVideos: 15,
    combinationMultiplier: 5,
    createdAt: "2025-09-01",
    status: "generated",
    videos: generate15Videos("BA"),
    hooks: [
      "Here's what nobody tells you",
      "3 things you need to know",
      "Watch before it's too late",
      "This is the only guide you need",
    ],
    ctas: ["Follow for more", "Link in bio", "Subscribe now"],
    subtitles: ["Bold White", "Neon Glow", "Classic Black"],
    totalCombinations: 100,
  },
  {
    id: "PRJ-005",
    name: "Influencer Collab Pack",
    totalVideos: 15,
    combinationMultiplier: 3,
    createdAt: "2025-09-10",
    status: "generated",
    videos: generate15Videos("IC"),
    hooks: ["POV: You found the perfect product", "I tested this for 30 days"],
    ctas: ["Use code SAVE20", "Tap to shop"],
    subtitles: ["Gradient Pop"],
    totalCombinations: 18,
  },
];

// ─── Users ───────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Prime";
  joinedDate: string;
  lastActive: string;
  status: "Active" | "Suspended" ;
}

export const mockUsers: User[] = [
  { id: "USR-001", name: "Alice Johnson", email: "alice@example.com", plan: "Pro", joinedDate: "2024-01-15", lastActive: "2025-09-28", status: "Active" },
  { id: "USR-002", name: "Bob Smith", email: "bob@example.com", plan: "Free", joinedDate: "2024-03-22", lastActive: "2025-09-25", status: "Active" },
  { id: "USR-003", name: "Carol White", email: "carol@example.com", plan: "Prime", joinedDate: "2024-05-10", lastActive: "2025-09-20", status: "Suspended" },
  { id: "USR-004", name: "David Lee", email: "david@example.com", plan: "Pro", joinedDate: "2024-06-05", lastActive: "2025-08-15", status: "Active" },
  { id: "USR-005", name: "Eva Martinez", email: "eva@example.com", plan: "Free", joinedDate: "2024-07-18", lastActive: "2025-09-27", status: "Active" },
  { id: "USR-006", name: "Frank Chen", email: "frank@example.com", plan: "Prime", joinedDate: "2024-08-01", lastActive: "2025-09-26", status: "Active" },
  { id: "USR-007", name: "Grace Kim", email: "grace@example.com", plan: "Pro", joinedDate: "2024-09-12", lastActive: "2025-09-22", status: "Active" },
  { id: "USR-008", name: "Henry Brown", email: "henry@example.com", plan: "Free", joinedDate: "2024-10-03", lastActive: "2025-07-10", status: "Active" },
  { id: "USR-009", name: "Ivy Patel", email: "ivy@example.com", plan: "Pro", joinedDate: "2024-11-15", lastActive: "2025-09-28", status: "Active" },
  { id: "USR-010", name: "Jack Wilson", email: "jack@example.com", plan: "Prime", joinedDate: "2025-01-08", lastActive: "2025-09-24", status: "Suspended" },
];

// ─── User ↔ Project mapping ─────────────────────────────────────────
export const userProjects: Record<string, string[]> = {
  "USR-001": ["PRJ-001", "PRJ-004"],
  "USR-002": ["PRJ-002"],
  "USR-003": ["PRJ-003", "PRJ-005"],
  "USR-004": ["PRJ-001"],
  "USR-005": ["PRJ-002", "PRJ-003"],
  "USR-006": ["PRJ-004", "PRJ-005"],
  "USR-007": ["PRJ-001", "PRJ-002", "PRJ-004"],
  "USR-008": [],
  "USR-009": ["PRJ-005"],
  "USR-010": ["PRJ-003"],
};

// ─── Content Library ─────────────────────────────────────────────────
export interface ContentVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  project: string;
  createdAt: string;
  videoUrl: string;
}

export const mockContentVideos: ContentVideo[] = Array.from({ length: 15 }, (_, i) => ({
  id: `CV-${i + 1}`,
  title: `UGC Ad Variation ${i + 1}`,
  thumbnail: "",
  duration: `0:${15 + (i % 20)}`,
  project: mockProjects[i % mockProjects.length].name,
  createdAt: `2025-09-${String(10 + i).padStart(2, "0")}`,
  videoUrl: LOCAL_VIDEOS[i % LOCAL_VIDEOS.length],
}));

export interface Hook {
  id: string;
  text: string;
  category: string;
  usedInProjects: number;
  conversionRate: string;
  createdBy: string;
  createdAt: string;
  status: "Active" | "Flagged";
}

export const mockHooks: Hook[] = [
  { id: "H-001", text: "Wait till you see this...", category: "#curiosity", usedInProjects: 14, conversionRate: "8.2%", createdBy: "Alice Johnson", createdAt: "2025-06-10", status: "Active" },
  { id: "H-002", text: "You won't believe what happens next!", category: "#curiosity", usedInProjects: 22, conversionRate: "12.4%", createdBy: "Bob Smith", createdAt: "2025-06-15", status: "Active" },
  { id: "H-003", text: "Stop scrolling — this is for you", category: "#urgency", usedInProjects: 9, conversionRate: "6.1%", createdBy: "Carol White", createdAt: "2025-07-01", status: "Active" },
  { id: "H-004", text: "Last chance! Only 2 hours left", category: "#urgency", usedInProjects: 18, conversionRate: "15.3%", createdBy: "Alice Johnson", createdAt: "2025-07-10", status: "Active" },
  { id: "H-005", text: "My dog reacted to this and I can't stop laughing", category: "#funny", usedInProjects: 7, conversionRate: "4.8%", createdBy: "Eva Martinez", createdAt: "2025-07-20", status: "Flagged" },
  { id: "H-006", text: "POV: You finally found what you needed", category: "#curiosity", usedInProjects: 31, conversionRate: "11.7%", createdBy: "Frank Chen", createdAt: "2025-08-01", status: "Active" },
];

export interface CTA {
  id: string;
  text: string;
  type: string;
  usedInProjects: number;
  clickRate: string;
  createdBy: string;
  createdAt: string;
  status: "Active" | "Flagged";
}

export const mockCTAs: CTA[] = [
  { id: "C-001", text: "Subscribe for more!", type: "#subscribe", usedInProjects: 28, clickRate: "5.4%", createdBy: "Alice Johnson", createdAt: "2025-06-10", status: "Active" },
  { id: "C-002", text: "Swipe up to learn more", type: "#swipeup", usedInProjects: 19, clickRate: "7.8%", createdBy: "Bob Smith", createdAt: "2025-06-20", status: "Active" },
  { id: "C-003", text: "Buy now — 50% off today!", type: "#buynow", usedInProjects: 35, clickRate: "12.1%", createdBy: "Carol White", createdAt: "2025-07-05", status: "Active" },
  { id: "C-004", text: "Tap the link in bio", type: "#subscribe", usedInProjects: 12, clickRate: "3.2%", createdBy: "David Lee", createdAt: "2025-07-15", status: "Flagged" },
  { id: "C-005", text: "Limited time — grab yours now", type: "#buynow", usedInProjects: 24, clickRate: "9.6%", createdBy: "Eva Martinez", createdAt: "2025-08-01", status: "Active" },
];

export interface Subtitle {
  id: string;
  styleName: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  bgColor: string;
  usedInProjects: number;
  createdBy: string;
  createdAt: string;
  status: "Active" | "Flagged";
}

export const mockSubtitles: Subtitle[] = [
  { id: "S-001", styleName: "Bold White", fontFamily: "Inter", fontWeight: "700", color: "#ffffff", bgColor: "#000000", usedInProjects: 42, createdBy: "Alice Johnson", createdAt: "2025-05-01", status: "Active" },
  { id: "S-002", styleName: "Neon Glow", fontFamily: "Poppins", fontWeight: "600", color: "#39ff14", bgColor: "transparent", usedInProjects: 18, createdBy: "Bob Smith", createdAt: "2025-05-15", status: "Active" },
  { id: "S-003", styleName: "Classic Black", fontFamily: "Roboto", fontWeight: "400", color: "#000000", bgColor: "#ffffff", usedInProjects: 31, createdBy: "Carol White", createdAt: "2025-06-01", status: "Active" },
  { id: "S-004", styleName: "Gradient Pop", fontFamily: "Montserrat", fontWeight: "800", color: "#ff6b6b", bgColor: "transparent", usedInProjects: 15, createdBy: "David Lee", createdAt: "2025-06-20", status: "Flagged" },
  { id: "S-005", styleName: "Minimal Sans", fontFamily: "DM Sans", fontWeight: "500", color: "#e2e8f0", bgColor: "rgba(0,0,0,0.6)", usedInProjects: 27, createdBy: "Eva Martinez", createdAt: "2025-07-10", status: "Active" },
];

// ─── Subscriptions ───────────────────────────────────────────────────
export interface Subscriber {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Prime";
  billingCycle:  "Yearly";
  startDate: string;
  nextBilling: string;
  status: "Active" | "Cancelled" | "Expired";
}

export const mockSubscribers: Subscriber[] = [
  { id: "SUB-001", name: "Alice Johnson", email: "alice@example.com", plan: "Pro", billingCycle: "Yearly", startDate: "2025-01-15", nextBilling: "2025-10-15", status: "Active" },
  { id: "SUB-002", name: "Bob Smith", email: "bob@example.com", plan: "Free", billingCycle: "Yearly", startDate: "2025-03-22", nextBilling: "—", status: "Active" },
  { id: "SUB-003", name: "Carol White", email: "carol@example.com", plan: "Prime", billingCycle: "Yearly", startDate: "2025-01-10", nextBilling: "2026-01-10", status: "Active" },
  { id: "SUB-004", name: "David Lee", email: "david@example.com", plan: "Pro", billingCycle: "Yearly", startDate: "2025-04-05", nextBilling: "—", status: "Cancelled" },
  { id: "SUB-005", name: "Eva Martinez", email: "eva@example.com", plan: "Free", billingCycle: "Yearly", startDate: "2025-05-18", nextBilling: "—", status: "Active" },
  { id: "SUB-006", name: "Frank Chen", email: "frank@example.com", plan: "Prime", billingCycle: "Yearly", startDate: "2024-08-01", nextBilling: "—", status: "Expired" },
  { id: "SUB-007", name: "Grace Kim", email: "grace@example.com", plan: "Pro", billingCycle: "Yearly", startDate: "2025-06-12", nextBilling: "2025-10-12", status: "Active" },
  { id: "SUB-008", name: "Henry Brown", email: "henry@example.com", plan: "Free", billingCycle: "Yearly", startDate: "2025-07-03", nextBilling: "—", status: "Active" },
];
