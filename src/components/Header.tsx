
import React from 'react';
import { Zap, User, LogOut, Trophy } from 'lucide-react';
import { UserData, UserProgress } from '../utils/storage';

interface HeaderProps {
  user: UserData;
  userProgress: UserProgress;
  onLogout: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, userProgress, onLogout, onProfileClick }) => {
  const xpForNextLevel = userProgress.level * 200;
  const currentLevelXP = userProgress.xp % 200;
  const progressPercentage = (currentLevelXP / 200) * 100;

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-accent/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">ElectroGuitar Academy</h1>
              <p className="text-xs text-secondary">Aprenda a construir pedais de guitarra</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-primary">Nível {userProgress.level}</p>
                <p className="text-xs text-secondary">{currentLevelXP} / 200 XP</p>
              </div>
              <div className="w-32 h-2 bg-accent/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Achievements Count */}
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-primary">{userProgress.achievements.length}</span>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-primary">{user.username}</p>
              <p className="text-xs text-secondary">{userProgress.xp} XP total</p>
            </div>
            
            <button
              onClick={onProfileClick}
              className="p-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
            >
              <User className="w-5 h-5 text-primary" />
            </button>
            
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
