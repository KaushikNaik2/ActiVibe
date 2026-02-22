import { create } from 'zustand';
import { SEED_NOTIFICATIONS, type NotificationItem } from '@/data/seed';

interface NotifState {
  items: NotificationItem[];
  unread: number;

  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotifStore = create<NotifState>((set) => ({
  items: SEED_NOTIFICATIONS,
  unread: SEED_NOTIFICATIONS.filter((n) => !n.read).length,

  markRead: (id) =>
    set((state) => {
      const items = state.items.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return { items, unread: items.filter((n) => !n.read).length };
    }),

  markAllRead: () =>
    set((state) => ({
      items: state.items.map((n) => ({ ...n, read: true })),
      unread: 0,
    })),
}));
