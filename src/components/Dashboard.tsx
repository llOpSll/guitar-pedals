
import React from 'react';
import { BookOpen, Zap, Trophy, Star, Play, Lock, Target, Calendar } from 'lucide-react';
import { UserProgress } from '../utils/storage';
import { courseData, achievements as allAchievements } from '../data/courseData';

interface DashboardProps {
  onModuleSelect: (moduleId: number) => void;
  userProgress: UserProgress;
}

export const Dashboard: React.FC<DashboardProps> = ({ onModuleSelect, userProgress }) => {
  const getModuleProgress = (moduleId: number) => {
    const module = courseData.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const totalLessons = module.lessons.length;
    const completedLessons = module.lessons.filter(lesson => 
      userProgress.completedLessons.includes(lesson.id)
    ).length;
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const isModuleUnlocked = (moduleId: number) => {
    const module = courseData.find(m => m.id === moduleId);
    if (!module) return false;
    
    // First module is always unlocked
    if (module.prerequisites.length === 0) return true;
    
    // Check if all prerequisite modules are completed
    return module.prerequisites.every(prereqId => 
      userProgress.completedModules.includes(prereqId)
    );
  };

  const getIconForModule = (category: string) => {
    switch (category) {
      case 'fundamentals': return Zap;
      case 'components': return BookOpen;
      case 'circuits': return Target;
      case 'projects': return Star;
      default: return BookOpen;
    }
  };

  const userAchievements = allAchievements.filter(achievement => 
    userProgress.achievements.includes(achievement.id)
  );

  const totalLessons = courseData.reduce((total, module) => total + module.lessons.length, 0);
  const completedLessonsCount = userProgress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Seção de Progresso Geral */}
      <div className="glass-card rounded-3xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-secondary text-lg mb-6">
              Continue sua jornada no aprendizado de eletrônica
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.level}</div>
                <p className="text-sm text-secondary">Nível</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.xp}</div>
                <p className="text-sm text-secondary">XP Total</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{completedLessonsCount}</div>
                <p className="text-sm text-secondary">Lições Concluídas</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.currentStreak}</div>
                <p className="text-sm text-secondary">Dias Seguidos</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-primary">Módulos de Aprendizado</h3>
          <div className="flex items-center space-x-2 text-sm text-secondary">
            <Calendar className="w-4 h-4" />
            <span>{courseData.length} módulos disponíveis</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((module) => {
            const IconComponent = getIconForModule(module.category);
            const progress = getModuleProgress(module.id);
            const isUnlocked = isModuleUnlocked(module.id);
            const isCompleted = userProgress.completedModules.includes(module.id);
            
            return (
              <div
                key={module.id}
                className={`module-card relative ${!isUnlocked ? 'opacity-60 cursor-not-allowed' : ''} ${isCompleted ? 'border-2 border-secondary/50' : ''}`}
                onClick={() => isUnlocked && onModuleSelect(module.id)}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isUnlocked ? 'bg-secondary/10' : 'bg-accent/10'}`}>
                    <IconComponent className={`w-6 h-6 ${isUnlocked ? 'text-secondary' : 'text-accent'}`} />
                  </div>
                  {isUnlocked ? (
                    <Play className="w-5 h-5 text-secondary" />
                  ) : (
                    <Lock className="w-5 h-5 text-accent" />
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-primary">
                      {module.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {module.difficulty === 'beginner' ? 'Iniciante' :
                       module.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                    </span>
                  </div>
                  <p className="text-secondary text-sm">
                    {module.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">
                      {module.lessons.filter(l => userProgress.completedLessons.includes(l.id)).length}/{module.lessons.length} lições
                    </span>
                    <span className="text-secondary">{progress}%</span>
                  </div>
                  
                  <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="text-xs text-secondary">
                    {module.totalXP} XP total • {module.lessons.length} lições
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conquistas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-primary">Suas Conquistas</h3>
          <span className="text-sm text-secondary">
            {userAchievements.length} de {allAchievements.length} desbloqueadas
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {allAchievements.map((achievement) => {
            const isUnlocked = userProgress.achievements.includes(achievement.id);
            
            return (
              <div 
                key={achievement.id} 
                className={`achievement-badge ${isUnlocked ? 'bg-gradient-to-br from-accent to-secondary/50' : 'bg-accent/20 opacity-50'}`}
              >
                <Trophy className={`w-8 h-8 mx-auto mb-2 ${isUnlocked ? 'text-secondary' : 'text-accent'}`} />
                <h4 className="font-semibold text-primary text-sm mb-1">
                  {achievement.title}
                </h4>
                <p className="text-xs text-secondary">
                  {achievement.description}
                </p>
                {isUnlocked && (
                  <div className="mt-2 text-xs font-medium text-secondary">
                    +{achievement.xp} XP
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
