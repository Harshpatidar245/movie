import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const user = {
          id: email.toLowerCase(),
          username: email.split('@')[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUserComment: (commentId, newContent) => {
        set((state) => ({
          user: {
            ...state.user,
            comments: state.user.comments?.map(comment =>
              comment.id === commentId ? { ...comment, content: newContent } : comment
            ),
          },
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);