import { create } from 'zustand';
import { SEED_FEED_POSTS, type FeedPost } from '@/data/seed';

type FeedTab = 'all' | 'drives' | 'updates';

interface FeedState {
  posts: FeedPost[];
  feedTab: FeedTab;

  // Actions
  setFeedTab: (tab: FeedTab) => void;
  addPost: (post: FeedPost) => void;
  refreshFeed: () => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  posts: SEED_FEED_POSTS,
  feedTab: 'all',

  setFeedTab: (tab) => set({ feedTab: tab }),

  addPost: (post) => set((state) => ({
    posts: [post, ...state.posts],
  })),

  refreshFeed: () => set({ posts: SEED_FEED_POSTS }),
}));
