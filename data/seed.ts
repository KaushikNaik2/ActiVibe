// Hardcoded seed data from PRD Section 12

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'volunteer' | 'ngo';
  bio?: string;
  location?: string;
  joinedDate?: string;
  totalActiveHours?: number;
  drivesCompleted?: number;
  endorsementCount?: number;
  skills?: SkillTag[];
}

export interface SkillTag {
  category: string;
  tier: 'endorsed' | 'inferred' | 'self';
  endorsedBy?: string;
  endorsedAt?: string;
}

export interface Drive {
  id: string;
  name: string;
  ngoId: string;
  ngoName: string;
  ngoLogo: string;
  date: string;
  time: string;
  location: string;
  lat: number;
  lng: number;
  geofenceRadius: number;
  registeredCount: number;
  maxVolunteers: number;
  postLimit: number;
  status: 'upcoming' | 'live' | 'ended';
  causeArea: string;
  description?: string;
}

export interface FeedPost {
  id: string;
  type: 'ngo_drive' | 'volunteer_live' | 'recommendation' | 'ngo_update' | 'volunteer_post_event';
  authorName: string;
  authorAvatar: string;
  authorRole: 'volunteer' | 'ngo';
  driveName?: string;
  ngoName?: string;
  caption: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  verifiedBadge?: 'live' | 'post_event' | null;
  ctaLabel?: string;
  timestamp: string;
  skillMatch?: string;
}

export interface Endorsement {
  id: string;
  badgeId: string;
  emoji: string;
  badgeName: string;
  ngoName: string;
  driveName: string;
  date: string;
}

export interface NotificationItem {
  id: string;
  type: 'drive_confirmed' | 'drive_reminder' | 'endorsement' | 'drive_update';
  title: string;
  body: string;
  ctaLabel: string;
  read: boolean;
  timestamp: string;
}

export interface AnalyticsVolunteer {
  id: string;
  name: string;
  avatar: string;
  role: string;
  activeTime: string;
  activeMinutes: number;
  tasksDone: string;
  endorsements: number;
}

// ─── Volunteer: Arjun Mehta ───
export const SEED_VOLUNTEER: User = {
  id: 'vol-arjun-001',
  name: 'Arjun Mehta',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/png?seed=Arjun',
  role: 'volunteer',
  bio: 'Passionate about sustainable development and community action. Available weekends.',
  location: 'Mumbai, Maharashtra',
  joinedDate: 'March 2024',
  totalActiveHours: 142,
  drivesCompleted: 8,
  endorsementCount: 4,
  skills: [
    { category: 'Tech & IT', tier: 'endorsed', endorsedBy: 'Greenpeace Mumbai', endorsedAt: 'Jun 2025' },
    { category: 'Logistics & Ops', tier: 'inferred' },
    { category: 'Environment', tier: 'self' },
  ],
};

// ─── NGO: Greenpeace Mumbai ───
export const SEED_NGO: User = {
  id: 'ngo-gp-001',
  name: 'Greenpeace Mumbai',
  avatarUrl: 'https://api.dicebear.com/7.x/identicon/png?seed=Greenpeace',
  role: 'ngo',
  location: 'Mumbai, Maharashtra',
  joinedDate: 'January 2024',
};

export const SEED_NGO_KPIS = {
  activeDrives: 3,
  totalVolunteers: 247,
  avgCheckinRate: 82,
  endorsementsAwarded: 34,
};

// ─── Active Demo Drive ───
export const SEED_DRIVE: Drive = {
  id: 'drive-versova-001',
  name: 'Versova Beach Cleanup Drive',
  ngoId: 'ngo-gp-001',
  ngoName: 'Greenpeace Mumbai',
  ngoLogo: 'https://api.dicebear.com/7.x/identicon/png?seed=Greenpeace',
  date: '15 June 2025',
  time: '8:00 AM – 12:00 PM',
  location: 'Versova Beach, Mumbai',
  lat: 19.1236,
  lng: 72.8175,
  geofenceRadius: 500,
  registeredCount: 23,
  maxVolunteers: 30,
  postLimit: 5,
  status: 'live',
  causeArea: 'Environment & Climate',
  description: 'Join us for our monthly beach cleanup. Bring gloves and sunscreen! Equipment provided on-site.',
};

// ─── Feed Posts (5 cards) ───
export const SEED_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    type: 'ngo_drive',
    authorName: 'Greenpeace Mumbai',
    authorAvatar: 'https://api.dicebear.com/7.x/identicon/png?seed=Greenpeace',
    authorRole: 'ngo',
    driveName: 'Versova Beach Cleanup',
    caption: 'Join us for Versova Beach Cleanup on 15 June! 🏖️ Help us restore our coastline. Register now — 7 spots left.',
    imageUrl: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=600&q=80',
    likes: 34,
    comments: 8,
    ctaLabel: 'Register for Drive',
    timestamp: '2h ago',
  },
  {
    id: 'post-2',
    type: 'volunteer_live',
    authorName: 'Arjun Mehta',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Arjun',
    authorRole: 'volunteer',
    driveName: 'Versova Beach Cleanup',
    ngoName: 'Greenpeace Mumbai',
    caption: 'Live from the beach! This is what community looks like. 🌊 So many amazing volunteers out here today!',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&q=80',
    likes: 12,
    comments: 3,
    verifiedBadge: 'live',
    timestamp: '45min ago',
  },
  {
    id: 'post-3',
    type: 'recommendation',
    authorName: 'ActiVibe',
    authorAvatar: '',
    authorRole: 'ngo',
    driveName: 'Tree Plantation Drive',
    ngoName: 'Greenpeace',
    caption: 'Greenpeace needs Logistics & Ops skills at Tree Plantation Drive on 22 Jun.',
    likes: 0,
    comments: 0,
    skillMatch: 'Logistics & Ops',
    timestamp: '',
  },
  {
    id: 'post-4',
    type: 'ngo_update',
    authorName: 'Teach For India',
    authorAvatar: 'https://api.dicebear.com/7.x/identicon/png?seed=TeachForIndia',
    authorRole: 'ngo',
    caption: 'We completed our 10th literacy session this month! 📖 45 children attended and showed incredible progress. Thank you to all our volunteers!',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    likes: 28,
    comments: 5,
    timestamp: '4h ago',
  },
  {
    id: 'post-5',
    type: 'volunteer_post_event',
    authorName: 'Priya Sharma',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Priya',
    authorRole: 'volunteer',
    driveName: 'Literacy Sessions',
    ngoName: 'Teach For India',
    caption: 'Just wrapped 4 hours of tutoring. Exhausted but fulfilled. These kids are incredible! 📚✨',
    likes: 9,
    comments: 2,
    verifiedBadge: 'post_event',
    timestamp: '6h ago',
  },
];

// ─── Endorsements ───
export const SEED_ENDORSEMENTS: Endorsement[] = [
  { id: 'end-1', badgeId: 'star', emoji: '🌟', badgeName: 'Star Volunteer', ngoName: 'Greenpeace Mumbai', driveName: 'Versova Cleanup', date: 'Jun 2025' },
  { id: 'end-2', badgeId: 'quick', emoji: '⚡', badgeName: 'Quick Responder', ngoName: 'Teach For India', driveName: 'Literacy Sessions', date: 'May 2025' },
  { id: 'end-3', badgeId: 'top', emoji: '🎯', badgeName: 'Top Performer', ngoName: 'iVolunteer', driveName: 'City Cleanup', date: 'Apr 2025' },
  { id: 'end-4', badgeId: 'first', emoji: '🌱', badgeName: 'First Drive', ngoName: 'NSS Mumbai', driveName: 'Orientation Drive', date: 'Mar 2024' },
];

// ─── Notifications (4 items) ───
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1', type: 'drive_confirmed', read: false, timestamp: '1h ago',
    title: 'Drive Confirmed',
    body: 'Greenpeace Mumbai confirmed your registration for Versova Beach Cleanup on 15 Jun.',
    ctaLabel: 'View Drive →',
  },
  {
    id: 'notif-2', type: 'drive_reminder', read: false, timestamp: '3h ago',
    title: 'Drive Reminder',
    body: 'Versova Beach Cleanup starts in 2 hours. Get there early!',
    ctaLabel: 'Get Directions →',
  },
  {
    id: 'notif-3', type: 'endorsement', read: true, timestamp: '1d ago',
    title: 'Endorsement Received! 🌟',
    body: 'Greenpeace Mumbai endorsed you with "Star Volunteer" for Versova Cleanup.',
    ctaLabel: 'View Endorsement →',
  },
  {
    id: 'notif-4', type: 'drive_update', read: true, timestamp: '2d ago',
    title: 'Drive Update',
    body: 'Greenpeace Mumbai posted an update: "Bring gloves and sunscreen!"',
    ctaLabel: 'View Post →',
  },
];

// ─── Analytics Seed Data — Versova Drive ───
export const SEED_ANALYTICS_SUMMARY = {
  totalVolunteers: 23,
  avgActiveTime: '2 hrs 41 min',
  totalCollectiveHours: 61.5,
  attendanceRate: 82,
  registeredCount: 28,
  checkedInCount: 23,
  completedCount: 19,
};

export const SEED_ANALYTICS_VOLUNTEERS: AnalyticsVolunteer[] = [
  { id: 'av-1', name: 'Rohan Desai', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Rohan', role: 'Waste Sorter', activeTime: '2:58:01', activeMinutes: 178, tasksDone: '5 of 5', endorsements: 2 },
  { id: 'av-2', name: 'Arjun Mehta', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Arjun', role: 'Logistics Coord.', activeTime: '2:47:23', activeMinutes: 167, tasksDone: '4 of 5', endorsements: 1 },
  { id: 'av-3', name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Priya', role: 'Media & Content', activeTime: '2:31:09', activeMinutes: 151, tasksDone: '3 of 3', endorsements: 1 },
  { id: 'av-4', name: 'Aisha Khan', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Aisha', role: 'Team Coordinator', activeTime: '2:15:44', activeMinutes: 136, tasksDone: '4 of 4', endorsements: 1 },
  { id: 'av-5', name: 'Vikram Nair', avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Vikram', role: 'Equipment Setup', activeTime: '1:52:33', activeMinutes: 113, tasksDone: '3 of 5', endorsements: 0 },
];

export const SEED_ZONE_TIME_DISTRIBUTION = [
  { hour: '6am', count: 0 }, { hour: '7am', count: 3 }, { hour: '8am', count: 18 },
  { hour: '9am', count: 22 }, { hour: '10am', count: 23 }, { hour: '11am', count: 20 },
  { hour: '12pm', count: 15 }, { hour: '1pm', count: 8 }, { hour: '2pm', count: 2 },
];

export const SEED_ROLE_FILL = [
  { role: 'Logistics Coordinator', filled: 3, total: 4, avgHours: 2.6, category: 'Logistics & Ops' },
  { role: 'Media & Content', filled: 2, total: 3, avgHours: 2.3, category: 'Media & Content' },
  { role: 'Waste Sorter', filled: 8, total: 10, avgHours: 2.8, category: 'Environment' },
  { role: 'Team Coordinator', filled: 2, total: 2, avgHours: 2.1, category: 'Community' },
  { role: 'Equipment Setup', filled: 4, total: 6, avgHours: 1.7, category: 'Logistics & Ops' },
];
