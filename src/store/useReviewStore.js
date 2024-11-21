import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useReviewStore = create()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (movieId, content, rating, user) => {
        const newReview = {
          id: crypto.randomUUID(),
          movieId,
          userId: user.id,
          username: user.username,
          content,
          rating,
          timestamp: Date.now(),
        };
        set((state) => ({
          reviews: [...state.reviews, newReview],
        }));
      },
      updateReview: (reviewId, content, rating) => {
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === reviewId
              ? { ...review, content, rating, timestamp: Date.now() }
              : review
          ),
        }));
      },
      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== reviewId),
        }));
      },
      getReviews: (movieId) => {
        return get().reviews.filter((review) => review.movieId === movieId);
      },
      getUserReviews: (userId) => {
        return get().reviews.filter((review) => review.userId === userId);
      },
    }),
    {
      name: 'reviews-storage',
    }
  )
);