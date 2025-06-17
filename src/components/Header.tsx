
import React from 'react';
import { Zap, Trophy, Star, User, Settings } from 'lucide-react';
import { AppState } from '../pages/Index';

interface HeaderProps {
  userProgress: AppState['userProgress'];
}

export const Header: React.FC<HeaderProps> = ({ userProgress }) => {
  const xpToNextLevel = 200; // XP necessário para o próximo nível
  const xpProgress = (userProgress.xp % xpToNextLevel) / xpToNextLevel * 100;

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
              </div>
            </div>

            {/* Conquistas */}
            <div className="flex items-center space-x-1">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-primary">{userProgress.achievements.length}</span>
            </div>

            {/* Avatar do Usuário */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <Settings className="w-5 h-5 text-secondary cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
