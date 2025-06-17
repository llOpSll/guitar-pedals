
import React from 'react';
import { BookOpen, Zap, Trophy, Star, Play, Lock, Target, Calendar, Wrench, Cpu, CircuitBoard } from 'lucide-react';
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

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'fundamentals': return Zap;
      case 'components': return CircuitBoard;
      case 'circuits': return Target;
      case 'projects': return Wrench;
      case 'advanced': return Cpu;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fundamentals': return 'text-blue-600 bg-blue-100';
      case 'components': return 'text-green-600 bg-green-100';
      case 'circuits': return 'text-purple-600 bg-purple-100';
      case 'projects': return 'text-orange-600 bg-orange-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
              Bem-vindo ao ElectroGuitar Academy!
            </h2>
            <p className="text-secondary text-lg mb-6">
              Sua jornada na construção de pedais de guitarra começa aqui
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{userProgress.level}</div>
                <p className="text-sm text-secondary">Nível</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{userProgress.xp}</div>
                <p className="text-sm text-secondary">XP Total</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{completedLessonsCount}</div>
                <p className="text-sm text-secondary">Lições</p>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-primary">{userProgress.currentStreak}</div>
                <p className="text-sm text-secondary">Sequência</p>
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
              <div className="absolute inset-0 rounded-full border-4 border-white/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <BookOpen className="w-8 h-8 text-secondary mx-auto mb-2" />
          <div className="text-xl font-bold text-primary">{courseData.length}</div>
          <div className="text-sm text-secondary">Módulos Disponíveis</div>
        </div>
        <div className="glass-card p-4 text-center">
          <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
          <div className="text-xl font-bold text-primary">{totalLessons}</div>
          <div className="text-sm text-secondary">Lições Totais</div>
        </div>
        <div className="glass-card p-4 text-center">
          <Wrench className="w-8 h-8 text-secondary mx-auto mb-2" />
          <div className="text-xl font-bold text-primary">{courseData.length}</div>
          <div className="text-sm text-secondary">Projetos de Pedais</div>
        </div>
        <div className="glass-card p-4 text-center">
          <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
          <div className="text-xl font-bold text-primary">{allAchievements.length}</div>
          <div className="text-sm text-secondary">Conquistas</div>
        </div>
      </div>

      {/* Módulos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-primary">Módulos de Aprendizado</h3>
          <div className="flex items-center space-x-2 text-sm text-secondary">
            <Calendar className="w-4 h-4" />
            <span>Do básico ao avançado</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((module) => {
            const IconComponent = getIconForCategory(module.category);
            const progress = getModuleProgress(module.id);
            const isUnlocked = isModuleUnlocked(module.id);
            const isCompleted = userProgress.completedModules.includes(module.id);
            
            return (
              <div
                key={module.id}
                className={`module-card relative group ${!isUnlocked ? 'opacity-60 cursor-not-allowed' : ''} ${isCompleted ? 'border-2 border-secondary/50' : ''}`}
                onClick={() => isUnlocked && onModuleSelect(module.id)}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isUnlocked ? getCategoryColor(module.category) : 'bg-accent/10'}`}>
                    <IconComponent className={`w-6 h-6 ${isUnlocked ? '' : 'text-accent'}`} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {getDifficultyText(module.difficulty)}
                    </span>
                    {isUnlocked ? (
                      <Play className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                    ) : (
                      <Lock className="w-5 h-5 text-accent" />
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {module.title}
                  </h4>
                  <p className="text-secondary text-sm mb-3">
                    {module.description}
                  </p>
                  
                  {/* Projeto do Pedal */}
                  <div className="bg-accent/10 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Wrench className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium text-primary">Projeto:</span>
                    </div>
                    <div className="text-sm text-secondary">
                      {module.pedalProject.name}
                    </div>
                  </div>
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
                  
                  <div className="flex justify-between text-xs text-secondary">
                    <span>{module.totalXP} XP total</span>
                    <span>{module.lessons.length} lições</span>
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
          <h3 className="text-2xl font-bold text-primary">Conquistas</h3>
          <span className="text-sm text-secondary">
            {userAchievements.length} de {allAchievements.length} desbloqueadas
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {allAchievements.slice(0, 10).map((achievement) => {
            const isUnlocked = userProgress.achievements.includes(achievement.id);
            
            return (
              <div 
                key={achievement.id} 
                className={`achievement-badge ${isUnlocked ? 'bg-gradient-to-br from-accent to-secondary text-white' : 'bg-accent/20 opacity-50'}`}
              >
                <Trophy className={`w-8 h-8 mx-auto mb-2 ${isUnlocked ? 'text-white' : 'text-accent'}`} />
                <h4 className={`font-semibold text-sm mb-1 ${isUnlocked ? 'text-white' : 'text-primary'}`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${isUnlocked ? 'text-white/80' : 'text-secondary'}`}>
                  {achievement.description}
                </p>
                {isUnlocked && (
                  <div className="mt-2 text-xs font-medium text-white/90">
                    +{achievement.xp} XP
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {allAchievements.length > 10 && (
          <div className="text-center mt-4">
            <span className="text-sm text-secondary">
              E mais {allAchievements.length - 10} conquistas para desbloquear...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
