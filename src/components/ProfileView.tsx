
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Calendar, Trophy, Zap, BookOpen, Settings } from 'lucide-react';
import { UserData, UserProgress } from '../utils/storage';

interface ProfileViewProps {
  user: UserData;
  userProgress: UserProgress;
  onBack: () => void;
  onSettingsClick: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ 
  user, 
  userProgress, 
  onBack,
  onSettingsClick 
}) => {
  const joinDate = new Date(user.createdAt).toLocaleDateString('pt-BR');
  const lastLogin = new Date(user.lastLogin).toLocaleDateString('pt-BR');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-3xl font-bold text-primary">Perfil</h1>
        </div>
        <button
          onClick={onSettingsClick}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
        >
          <Settings className="w-4 h-4" />
          <span>Configurações</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Usuário */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-primary">{user.username}</h2>
              <p className="text-secondary">{user.email}</p>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-secondary">Membro desde</p>
                  <p className="font-medium text-primary">{joinDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-secondary">Último acesso</p>
                  <p className="font-medium text-primary">{lastLogin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-primary mb-6">Estatísticas de Progresso</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{userProgress.level}</div>
                <p className="text-sm text-secondary">Nível</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{userProgress.xp}</div>
                <p className="text-sm text-secondary">XP Total</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{userProgress.completedLessons.length}</div>
                <p className="text-sm text-secondary">Lições</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{userProgress.currentStreak}</div>
                <p className="text-sm text-secondary">Sequência</p>
              </div>
            </div>

            {/* Progresso por Nível */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-secondary">Progresso para o próximo nível</span>
                <span className="text-secondary">
                  {userProgress.xp % 200} / 200 XP
                </span>
              </div>
              <div className="w-full h-3 bg-accent/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
                  style={{ width: `${(userProgress.xp % 200) / 200 * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Conquistas */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-primary mb-6">Conquistas Recentes</h3>
            
            {userProgress.achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProgress.achievements.slice(0, 4).map((achievementId, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl">
                    <Trophy className="w-8 h-8 text-secondary" />
                    <div>
                      <p className="font-medium text-primary">Conquista Desbloqueada</p>
                      <p className="text-sm text-secondary">{achievementId}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-accent mx-auto mb-3" />
                <p className="text-secondary">Nenhuma conquista ainda</p>
                <p className="text-sm text-secondary">Complete lições para desbloquear conquistas!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
