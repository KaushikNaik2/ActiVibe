import { create } from 'zustand';
import { SEED_DRIVE } from '@/data/seed';

interface ActiveDrive {
  driveId: string;
  driveName: string;
  ngoId: string;
  ngoName: string;
  checkinId: string;
}

interface ActiveEventState {
  activeDrive: ActiveDrive | null;
  timerSeconds: number;
  inZone: boolean;
  postCount: number;
  postLimit: number;
  isEventEnded: boolean;

  // Actions
  simulateEntry: () => void;
  simulateExit: () => void;
  simulatePost: () => void;
  endEvent: () => void;
  checkout: () => void;
  incrementTimer: () => void;
  reset: () => void;
}

export const useActiveEventStore = create<ActiveEventState>((set, get) => ({
  activeDrive: null,
  timerSeconds: 0,
  inZone: false,
  postCount: 0,
  postLimit: SEED_DRIVE.postLimit,
  isEventEnded: false,

  simulateEntry: () => set({
    activeDrive: {
      driveId: SEED_DRIVE.id,
      driveName: SEED_DRIVE.name,
      ngoId: SEED_DRIVE.ngoId,
      ngoName: SEED_DRIVE.ngoName,
      checkinId: `checkin-${Date.now()}`,
    },
    inZone: true,
    isEventEnded: false,
  }),

  simulateExit: () => set({ inZone: false }),

  simulatePost: () => {
    const { postCount, postLimit } = get();
    if (postCount < postLimit) {
      set({ postCount: postCount + 1 });
    }
  },

  endEvent: () => set({ isEventEnded: true, inZone: false }),

  checkout: () => set({
    activeDrive: null,
    timerSeconds: 0,
    inZone: false,
    postCount: 0,
    isEventEnded: false,
  }),

  incrementTimer: () => {
    const { inZone, activeDrive } = get();
    if (inZone && activeDrive) {
      set((state) => ({ timerSeconds: state.timerSeconds + 1 }));
    }
  },

  reset: () => set({
    activeDrive: null,
    timerSeconds: 0,
    inZone: false,
    postCount: 0,
    isEventEnded: false,
  }),
}));
