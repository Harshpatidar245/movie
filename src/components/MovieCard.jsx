import { Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useVoteStore } from '../store/useVoteStore';
import { useAuthStore } from '../store/useAuthStore';
import { cn, formatNumber } from '../lib/utils';

export function MovieCard({ movie, onSelect }) {
  const { addVote, removeVote, hasVoted } = useVoteStore();
  const { isAuthenticated } = useAuthStore();
  const voted = hasVoted(movie.id);

  const handleVote = (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to vote');
      return;
    }

    if (voted) {
      removeVote(movie.id);
      toast.success('Vote removed!');
    } else {
      addVote(movie.id);
      toast.success('Vote counted!');
    }
  };

  return (
    <div
      onClick={() => onSelect(movie)}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={handleVote}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <Heart
            className={cn(
              'w-6 h-6 transition-colors',
              voted ? 'fill-red-500 text-red-500' : 'text-white'
            )}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{movie.title}</h3>
          <span className="text-sm text-gray-600">
            {formatNumber(movie.votes)} votes
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{movie.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{movie.releaseYear}</span>
          <span>★ {movie.rating}</span>
        </div>
      </div>
    </div>
  );
}