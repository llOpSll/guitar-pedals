
import React from 'react';
import { Play, CheckCircle, Lock, Trophy, Zap, User, Calendar } from 'lucide-react';
import { UserProgress } from '../utils/storage';
import { courseData } from '../data/courseData';
import { PracticeMode } from './PracticeMode';
import { isModuleUnlocked, calculateModuleProgress } from '../utils/progressValidation';

interface DashboardProps {
  onModuleSelect: (moduleId: number) => void;
  userProgress: UserProgress;
  onPracticeMode?: (moduleId: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onModuleSelect, 
  userProgress, 
  onPracticeMode 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return difficulty;
    }
  };

  const getStreakText = (streak: number) => {
    if (streak === 0) return 'Comece hoje!';
    if (streak === 1) return '1 dia';
    return `${streak} dias`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-2">
              Bem-vindo de volta!
            </h1>
            <p className="text-secondary">
              Continue aprendendo sobre eletrônica para guitarra
            </p>
            <p className="text-sm text-secondary mt-2">
              <span className="font-semibold text-primary">{courseData.length} módulos</span> disponíveis para dominar
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-1">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-xs text-secondary">Nível</p>
              <p className="font-bold text-primary">{userProgress.level}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-1">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-xs text-secondary">Sequência</p>
              <p className="font-bold text-primary">{getStreakText(userProgress.currentStreak)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stats - Moved before modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <Trophy className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-primary">Conquistas</h3>
          </div>
          
          {userProgress.achievements.length > 0 ? (
            <div className="space-y-3">
              {userProgress.achievements.slice(0, 3).map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-primary">{achievement}</span>
                </div>
              ))}
              {userProgress.achievements.length > 3 && (
                <p className="text-xs text-secondary text-center">
                  +{userProgress.achievements.length - 3} mais conquistas
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Trophy className="w-10 h-10 text-accent/50 mx-auto mb-2" />
              <p className="text-secondary">Nenhuma conquista ainda</p>
              <p className="text-xs text-secondary mt-1">Complete lições para desbloquear!</p>
            </div>
          )}
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-primary">Progresso Geral</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">XP Total</span>
                <span className="font-medium text-primary">{userProgress.xp} XP</span>
              </div>
              <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-accent"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Lições Completadas</span>
                <span className="font-medium text-primary">
                  {userProgress.completedLessons.length} / {courseData.reduce((acc, module) => acc + module.lessons.length, 0)}
                </span>
              </div>
              <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-accent"
                  style={{ 
                    width: `${(userProgress.completedLessons.length / 
                      courseData.reduce((acc, module) => acc + module.lessons.length, 0)) * 100}%` 
                  }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Módulos Completados</span>
                <span className="font-medium text-primary">
                  {userProgress.completedModules.length} / {courseData.length}
                </span>
              </div>
              <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-accent"
                  style={{ 
                    width: `${(userProgress.completedModules.length / courseData.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <User className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-primary">Próximo Nível</h3>
          </div>
          
          <div className="text-center py-2">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">{userProgress.level}</span>
              </div>
              <div className="w-8 text-secondary">→</div>
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{userProgress.level + 1}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Progresso</span>
                <span className="font-medium text-primary">
                  {userProgress.xp % 200} / 200 XP
                </span>
              </div>
              <div className="w-full h-3 bg-accent/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-accent"
                  style={{ width: `${(userProgress.xp % 200) / 200 * 100}%` }}
                />
              </div>
            </div>
            
            <p className="text-sm text-secondary">
              Faltam <span className="font-medium text-primary">{200 - (userProgress.xp % 200)} XP</span> para o próximo nível
            </p>
          </div>
        </div>
      </div>

      {/* Módulos Section - Now shows ALL modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Todos os Módulos</h2>
          <div className="text-sm text-secondary">
            {userProgress.completedModules.length} de {courseData.length} concluídos
          </div>
        </div>
        
        {/* Módulos Grid - Shows ALL 20 modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courseData.map((module) => {
            const isUnlocked = isModuleUnlocked(module.id, userProgress);
            const progress = calculateModuleProgress(module.id, userProgress);
            const isCompleted = userProgress.completedModules.includes(module.id);
            
            return (
              <div
                key={module.id}
                className={`glass-card rounded-xl p-4 transition-all duration-300 ${
                  isUnlocked 
                    ? 'cursor-pointer hover:shadow-lg hover:scale-105' 
                    : 'opacity-60 cursor-not-allowed'
                } ${isCompleted ? 'ring-2 ring-secondary/50' : ''}`}
                onClick={() => isUnlocked && onModuleSelect(module.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    isCompleted 
                      ? 'bg-secondary text-white' 
                      : isUnlocked 
                        ? 'bg-secondary/10 text-secondary' 
                        : 'bg-accent/20 text-accent'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : isUnlocked ? (
                      <Play className="w-5 h-5" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {getDifficultyText(module.difficulty)}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-primary mb-2 line-clamp-2">{module.title}</h3>
                <p className="text-secondary text-xs mb-3 line-clamp-2">{module.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-secondary">Progresso</span>
                    <span className="font-medium text-primary">{Math.round(progress)}%</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-accent/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-secondary">
                    <span>{module.lessons.length} lições</span>
                    <span>{module.totalXP} XP</span>
                  </div>
                  
                  {isUnlocked && progress > 0 && onPracticeMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPracticeMode(module.id);
                      }}
                      className="w-full mt-2 py-1.5 px-3 bg-accent/20 text-secondary rounded-md hover:bg-accent/30 transition-colors text-xs font-medium"
                    >
                      🎯 Prática
                    </button>
                  )}
                </div>
                
                {isCompleted && (
                  <div className="mt-3 flex items-center space-x-2 text-secondary">
                    <Trophy className="w-3 h-3" />
                    <span className="text-xs font-medium">Concluído!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
