
import React from 'react';
import { BookOpen, Zap, Trophy, Star, Play, Lock } from 'lucide-react';
import { AppState } from '../pages/Index';

interface DashboardProps {
  onModuleSelect: (moduleId: number) => void;
  userProgress: AppState['userProgress'];
}

export const Dashboard: React.FC<DashboardProps> = ({ onModuleSelect, userProgress }) => {
  const modules = [
    {
      id: 1,
      title: "Fundamentos da Eletrônica",
      description: "Aprenda sobre corrente, tensão, resistores e leis básicas",
      progress: 75,
      lessons: 8,
      completedLessons: 6,
      unlocked: true,
      icon: Zap
    },
    {
      id: 2,
      title: "Componentes Passivos",
      description: "Capacitores, indutores e suas aplicações em pedais",
      progress: 45,
      lessons: 10,
      completedLessons: 4,
      unlocked: true,
      icon: BookOpen
    },
    {
      id: 3,
      title: "Componentes Ativos",
      description: "Transistores, op-amps e circuitos amplificadores",
      progress: 0,
      lessons: 12,
      completedLessons: 0,
      unlocked: false,
      icon: Lock
    }
  ];

  const achievements = [
    { id: 'first_lesson', title: 'Primeira Lição', description: 'Complete sua primeira lição' },
    { id: 'week_streak', title: 'Sequência de 7 dias', description: 'Estude por 7 dias seguidos' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Seção de Progresso */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-secondary text-lg">
              Continue sua jornada no aprendizado de eletrônica
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="progress-ring">
                <span className="text-lg font-bold text-white">{userProgress.level}</span>
              </div>
              <p className="mt-2 text-sm text-secondary">Nível</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userProgress.xp}</div>
              <p className="text-sm text-secondary">XP Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos */}
      <div>
        <h3 className="text-2xl font-bold text-primary mb-6">Módulos de Aprendizado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.id}
                className={`module-card ${!module.unlocked ? 'opacity-60' : ''}`}
                onClick={() => module.unlocked && onModuleSelect(module.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8 text-secondary" />
                  {module.unlocked ? (
                    <Play className="w-5 h-5 text-secondary" />
                  ) : (
                    <Lock className="w-5 h-5 text-secondary" />
                  )}
                </div>
                
                <h4 className="text-lg font-semibold text-primary mb-2">
                  {module.title}
                </h4>
                <p className="text-secondary text-sm mb-4">
                  {module.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">
                      {module.completedLessons}/{module.lessons} lições
                    </span>
                    <span className="text-secondary">{module.progress}%</span>
                  </div>
                  
                  <div className="w-full h-2 bg-accent/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conquistas */}
      <div>
        <h3 className="text-2xl font-bold text-primary mb-6">Suas Conquistas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-badge">
              <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
              <h4 className="font-semibold text-primary text-sm mb-1">
                {achievement.title}
              </h4>
              <p className="text-xs text-secondary">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
