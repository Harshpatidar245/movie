import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

export function AdminPanel() {
  const [newMovie, setNewMovie] = useState({
    title: '',
    imageUrl: '',
    description: '',
    releaseYear: new Date().getFullYear(),
    genre: '',
    rating: '',
    runtime: '',
    director: '',
    cast: ''
  });

  const { addMovie, removeMovie, user } = useAuthStore();

  if (!user?.isAdmin) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const movieData = {
        ...newMovie,
        votes: 0,
        genre: newMovie.genre.split(',').map(g => g.trim()),
        cast: newMovie.cast.split(',').map(c => c.trim()),
      };
      
      addMovie(movieData);
      toast.success('Movie added successfully!');
      
      // Reset form
      setNewMovie({
        title: '',
        imageUrl: '',
        description: '',
        releaseYear: new Date().getFullYear(),
        genre: '',
        rating: '',
        runtime: '',
        director: '',
        cast: ''
      });
    } catch (error) {
      toast.error('Failed to add movie');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={newMovie.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={newMovie.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Release Year</label>
            <input
              type="number"
              name="releaseYear"
              value={newMovie.releaseYear}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="text"
              name="rating"
              value={newMovie.rating}
              onChange={handleChange}
              placeholder="e.g., 8.5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Runtime (minutes)</label>
            <input
              type="number"
              name="runtime"
              value={newMovie.runtime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Director</label>
            <input
              type="text"
              name="director"
              value={newMovie.director}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Genres (comma-separated)</label>
          <input
            type="text"
            name="genre"
            value={newMovie.genre}
            onChange={handleChange}
            placeholder="Action, Drama, Sci-Fi"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cast (comma-separated)</label>
          <input
            type="text"
            name="cast"
            value={newMovie.cast}
            onChange={handleChange}
            placeholder="Actor 1, Actor 2, Actor 3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
}