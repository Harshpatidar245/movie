import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useVoteStore = create()(
  persist(
    (set, get) => ({
      votes: [],
      addVote: (movieId) => {
        if (get().hasVoted(movieId)) return;
        set((state) => ({
          votes: [...state.votes, { movieId, timestamp: Date.now() }],
        }));
      },
      removeVote: (movieId) =>
        set((state) => ({
          votes: state.votes.filter((vote) => vote.movieId !== movieId),
        })),
      hasVoted: (movieId) =>
        get().votes.some((vote) => vote.movieId === movieId),
    }),
    {
      name: 'movie-votes',
    }
  )
);