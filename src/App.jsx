import { useState, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import { movies } from './data/movies';
import { MovieCard } from './components/MovieCard';
import { MovieDialog } from './components/MovieDialog';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { AdminPanel } from './components/AdminPanel';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useAuthStore(state => state.user);

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user?.isAdmin && <AdminPanel />}
        
        <SearchBar onSearch={handleSearch} />

        {filteredMovies.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No movies found{searchQuery ? ` for "${searchQuery}"` : ''}.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </main>

      {selectedMovie && (
        <MovieDialog
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default App;