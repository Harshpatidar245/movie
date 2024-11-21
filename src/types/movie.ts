export interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  releaseYear: number;
  genre: string[];
  votes: number;
  director: string;
  cast: string[];
  runtime: number;
  rating: string;
}

export interface Vote {
  movieId: string;
  timestamp: number;
}

export interface Comment {
  id: string;
  movieId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}