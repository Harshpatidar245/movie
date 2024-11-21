import { formatDistance } from 'date-fns';
import { Clock, Edit2, Star, Trash2, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useCommentStore } from '../store/useCommentStore';
import { useReviewStore } from '../store/useReviewStore';

export function MovieDialog({ movie, onClose }) {
  const [comment, setComment] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [editingComment, setEditingComment] = useState(null);
  
  const { user, isAuthenticated } = useAuthStore();
  const { addComment, getComments, updateComment, deleteComment } = useCommentStore();
  const { addReview, getReviews, updateReview, deleteReview } = useReviewStore();
  
  const comments = getComments(movie.id);
  const reviews = getReviews(movie.id);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;
    
    if (editingComment) {
      updateComment(editingComment.id, comment.trim());
      setEditingComment(null);
    } else {
      addComment(movie.id, comment.trim(), user);
    }
    setComment('');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user || !review.trim()) return;
    
    addReview(movie.id, review.trim(), rating, user);
    setReview('');
    setRating(5);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setComment(comment.content);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="relative h-64">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {movie.runtime} min
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {movie.rating}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="space-y-6">
            <p className="text-gray-600">{movie.description}</p>
            
            {/* Reviews Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Reviews</h3>
              
              {isAuthenticated && (
                <form onSubmit={handleSubmitReview} className="mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{rating} / 10</span>
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!review.trim()}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Post Review
                  </button>
                </form>
              )}
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">{review.username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{review.rating}/10</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                    <span className="text-sm text-gray-500">
                      {formatDistance(review.timestamp, new Date(), { addSuffix: true })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Comments</h3>
              
              {isAuthenticated && (
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {editingComment ? 'Update Comment' : 'Post Comment'}
                  </button>
                  {editingComment && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingComment(null);
                        setComment('');
                      }}
                      className="mt-2 ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  )}
                </form>
              )}
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">{comment.username}</span>
                        <span className="text-sm text-gray-500">
                          {formatDistance(comment.timestamp, new Date(), { addSuffix: true })}
                        </span>
                      </div>
                      {user?.id === comment.userId && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditComment(comment)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Edit2 className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}