
import React, { useState } from 'react';
import { Zap, Trophy, Star, User, Settings, LogOut, Menu } from 'lucide-react';
import { UserData, UserProgress } from '../utils/storage';

interface HeaderProps {
  user: UserData;
  userProgress: UserProgress;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, userProgress, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const xpToNextLevel = userProgress.level * 200;
  const currentLevelXp = userProgress.xp % 200;
  const xpProgress = (currentLevelXp / 200) * 100;

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-accent/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">ElectroGuitar Academy</h1>
              <p className="text-sm text-secondary">Eletrônica para Pedais</p>
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="flex items-center space-x-6">
            {/* Progresso XP */}
            <div className="hidden md:flex items-center space-x-3">
              <Star className="w-5 h-5 text-secondary" />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-primary">Nível {userProgress.level}</span>
                  <span className="text-xs text-secondary">{userProgress.xp} XP</span>
                </div>
                <div className="w-32 h-2 bg-accent/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-300"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <span className="text-xs text-secondary mt-1">
                  {200 - currentLevelXp} XP para o próximo nível
                </span>
              </div>
            </div>

            {/* Conquistas */}
            <div className="flex items-center space-x-1">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-primary">{userProgress.achievements.length}</span>
            </div>

            {/* Sequência */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="w-6 h-6 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{userProgress.currentStreak}</span>
              </div>
              <span className="text-sm text-secondary">dias</span>
            </div>

            {/* Menu do Usuário */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-xl hover:bg-accent/20 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden md:block text-sm font-medium text-primary">{user.username}</span>
                <Menu className="w-4 h-4 text-secondary" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-accent/20 py-2 z-50">
                  <div className="px-4 py-2 border-b border-accent/20">
                    <p className="text-sm font-medium text-primary">{user.username}</p>
                    <p className="text-xs text-secondary">{user.email}</p>
                  </div>
                  
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-accent/10 transition-colors">
                    <Settings className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-primary">Configurações</span>
                  </button>
                  
                  <button 
                    onClick={onLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">Sair</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
