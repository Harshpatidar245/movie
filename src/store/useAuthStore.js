import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_EMAIL = 'admin@movies.com';
const ADMIN_PASSWORD = 'admin123';

// Simulate a users database
const initialUsers = [
  {
    id: '1',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    username: 'Admin',
    isAdmin: true,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${ADMIN_EMAIL}`,
  }
];

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      users: initialUsers,
      isAuthenticated: false,

      register: async (email, password, username) => {
        const users = get().users;
        
        if (users.some(user => user.email === email)) {
          throw new Error('Email already registered');
        }

        const newUser = {
          id: crypto.randomUUID(),
          email,
          password,
          username,
          isAdmin: false,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };

        set(state => ({ 
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true
        }));
      },

      login: async (email, password) => {
        const user = get().users.find(
          u => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // Admin functions
      addMovie: (movie) => {
        if (!get().user?.isAdmin) return;
        set(state => ({
          movies: [...state.movies, { ...movie, id: crypto.randomUUID() }]
        }));
      },

      removeMovie: (movieId) => {
        if (!get().user?.isAdmin) return;
        set(state => ({
          movies: state.movies.filter(movie => movie.id !== movieId)
        }));
      },

      editMovie: (movieId, updates) => {
        if (!get().user?.isAdmin) return;
        set(state => ({
          movies: state.movies.map(movie =>
            movie.id === movieId ? { ...movie, ...updates } : movie
          )
        }));
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);