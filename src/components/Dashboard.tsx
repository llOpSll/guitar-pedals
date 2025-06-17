
import React from 'react';
import { Play, Lock, CheckCircle, Circuit, Lightbulb, Wrench, Cpu, Zap } from 'lucide-react';
import { AppState } from '../pages/Index';

interface DashboardProps {
  onModuleSelect: (moduleId: number) => void;
  userProgress: AppState['userProgress'];
}

const modules = [
  {
    id: 1,
    title: "Fundamentos da Eletrônica",
    description: "Corrente, tensão, lei de Ohm e componentes básicos",
    icon: Lightbulb,
    lessons: 8,
    difficulty: "Iniciante",
    color: "from-blue-500 to-blue-600",
    unlocked: true
  },
  {
    id: 2,
    title: "Componentes Passivos",
    description: "Resistores, capacitores e indutores em detalhes",
    icon: Circuit,
    lessons: 12,
    difficulty: "Iniciante",
    color: "from-green-500 to-green-600",
    unlocked: true
  },
  {
    id: 3,
    title: "Semicondutores",
    description: "Diodos, transistores e amplificação",
    icon: Cpu,
    lessons: 15,
    difficulty: "Intermediário",
    color: "from-purple-500 to-purple-600",
    unlocked: false
  },
  {
    id: 4,
    title: "Amplificadores Operacionais",
    description: "Op-amps e circuitos de processamento de sinal",
    icon: Zap,
    lessons: 10,
    difficulty: "Intermediário",
    color: "from-orange-500 to-orange-600",
    unlocked: false
  },
  {
    id: 5,
    title: "Circuitos de Distorção",
    description: "Overdrive, distorção e fuzz - teoria e prática",
    icon: Wrench,
    lessons: 18,
    difficulty: "Avançado",
    color: "from-red-500 to-red-600",
    unlocked: false
  },
  {
    id: 6,
    title: "Efeitos Modulados",
    description: "Chorus, flanger, phaser e tremolo",
    icon: Circuit,
    lessons: 14,
    difficulty: "Avançado",
    color: "from-indigo-500 to-indigo-600",
    unlocked: false
  }
];

const achievements = [
  { id: 'first_lesson', name: 'Primeira Lição', icon: '🎯' },
  { id: 'week_streak', name: 'Semana Completa', icon: '🔥' },
  { id: 'module_master', name: 'Mestre do Módulo', icon: '👑' },
  { id: 'circuit_builder', name: 'Construtor de Circuitos', icon: '⚡' }
];

export const Dashboard: React.FC<DashboardProps> = ({ onModuleSelect, userProgress }) => {
  const completedModules = Math.floor(userProgress.completedLessons.length / 8);
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons, 0);
  const progressPercentage = (userProgress.completedLessons.length / totalLessons) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Seção de Progresso Geral */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Bem-vindo de volta! 🎸
            </h2>
            <p className="text-secondary text-lg mb-4">
              Continue sua jornada na eletrônica para pedais de guitarra
            </p>
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="level-badge">
                Nível {userProgress.level}
              </div>
              <div className="text-sm text-secondary">
                {userProgress.completedLessons.length} lições concluídas
              </div>
            </div>
          </div>
          
          <div className="progress-ring">
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos de Aprendizado */}
      <div>
        <h3 className="text-2xl font-bold text-primary mb-6">Módulos de Aprendizado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            const isCompleted = completedModules > module.id;
            
            return (
              <div
                key={module.id}
                className={`module-card group ${module.unlocked ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                onClick={() => module.unlocked && onModuleSelect(module.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {!module.unlocked && <Lock className="w-5 h-5 text-secondary" />}
                    {module.unlocked && !isCompleted && <Play className="w-5 h-5 text-secondary" />}
                  </div>
                </div>
                
                <h4 className="font-semibold text-primary text-lg mb-2">{module.title}</h4>
                <p className="text-secondary text-sm mb-4">{module.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-accent/50 text-primary px-2 py-1 rounded-full">
                    {module.difficulty}
                  </span>
                  <span className="text-secondary">
                    {module.lessons} lições
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conquistas */}
      <div>
        <h3 className="text-2xl font-bold text-primary mb-6">Suas Conquistas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`achievement-badge ${
                userProgress.achievements.includes(achievement.id) 
                  ? 'opacity-100' 
                  : 'opacity-40 grayscale'
              }`}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <div className="text-sm font-medium text-primary">{achievement.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
