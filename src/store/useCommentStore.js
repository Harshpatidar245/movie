import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCommentStore = create()(
  persist(
    (set, get) => ({
      comments: [],
      addComment: (movieId, content, user) => {
        const newComment = {
          id: crypto.randomUUID(),
          movieId,
          userId: user.id,
          username: user.username,
          content,
          timestamp: Date.now(),
        };
        set((state) => ({
          comments: [...state.comments, newComment],
        }));
      },
      updateComment: (commentId, content) => {
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content, timestamp: Date.now() }
              : comment
          ),
        }));
      },
      deleteComment: (commentId) => {
        set((state) => ({
          comments: state.comments.filter((comment) => comment.id !== commentId),
        }));
      },
      getComments: (movieId) => {
        return get().comments.filter((comment) => comment.movieId === movieId);
      },
      getUserComments: (userId) => {
        return get().comments.filter((comment) => comment.userId === userId);
      },
    }),
    {
      name: 'comments-storage',
    }
  )
);