import { Film, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { AuthModal } from './AuthModal';

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">Movie Voting App</h1>
            </div>
            
            <div>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={user?.avatar}
                      alt={user?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium">{user?.username}</span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <User className="w-5 h-5" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}