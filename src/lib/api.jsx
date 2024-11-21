import axios from 'axios';

const TMDB_API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

export const getMovies = async (page = 1) => {
  try {
    const { data } = await api.get('/movie/now_playing', { params: { page } });
    return {
      ...data,
      results: data.results.map(formatMovie),
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies. Please try again later.');
  }
};

export const searchMovies = async (query) => {
  if (!query?.trim()) {
    return getMovies();
  }
  
  try {
    const { data } = await api.get('/search/movie', { params: { query } });
    return {
      ...data,
      results: data.results.map(formatMovie),
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies. Please try again later.');
  }
};

const formatMovie = (movie) => ({
  id: String(movie.id),
  title: movie.title,
  imageUrl: movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image',
  description: movie.overview || 'No description available',
  releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
  genre: [], // We'll get genres from the genres array if needed
  votes: movie.vote_count || 0,
  rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
  runtime: 120, // Default runtime as we don't have this in the list response
  cast: [], // We would need an additional API call to get the cast
});