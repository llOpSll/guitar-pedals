
import React from 'react';
import { ArrowLeft, Play, CheckCircle, Clock, Star } from 'lucide-react';
import { AppState } from '../pages/Index';

interface ModuleViewProps {
  moduleId: number;
  onBack: () => void;
  onLessonSelect: (lessonId: number) => void;
  userProgress: AppState['userProgress'];
}

const moduleData = {
  1: {
    title: "Fundamentos da Eletrônica",
    description: "Domine os conceitos básicos que são a base para entender qualquer circuito eletrônico. Você aprenderá sobre corrente, tensão, resistência e como esses elementos interagem nos circuitos.",
    lessons: [
      { id: 1, title: "O que é Eletricidade?", duration: "15 min", type: "teoria" },
      { id: 2, title: "Corrente e Tensão", duration: "20 min", type: "teoria" },
      { id: 3, title: "Lei de Ohm na Prática", duration: "25 min", type: "prática" },
      { id: 4, title: "Exercícios: Cálculos Básicos", duration: "30 min", type: "exercício" },
      { id: 5, title: "Circuitos Série e Paralelo", duration: "22 min", type: "teoria" },
      { id: 6, title: "Simulando Circuitos Básicos", duration: "35 min", type: "prática" },
      { id: 7, title: "Medindo com Multímetro", duration: "18 min", type: "prática" },
      { id: 8, title: "Teste do Módulo", duration: "40 min", type: "teste" }
    ]
  }
};

const lessonTypeColors = {
  teoria: "from-blue-500 to-blue-600",
  prática: "from-green-500 to-green-600", 
  exercício: "from-purple-500 to-purple-600",
  teste: "from-red-500 to-red-600"
};

const lessonTypeIcons = {
  teoria: "📚",
  prática: "🔧",
  exercício: "✏️",
  teste: "🎯"
};

export const ModuleView: React.FC<ModuleViewProps> = ({ 
  moduleId, 
  onBack, 
  onLessonSelect, 
  userProgress 
}) => {
  const module = moduleData[moduleId as keyof typeof moduleData];
  
  if (!module) {
    return (
      <div className="text-center py-20">
        <p className="text-secondary">Módulo não encontrado</p>
        <button onClick={onBack} className="mt-4 text-primary hover:underline">
          Voltar ao Dashboard
        </button>
      </div>
    );
  }

  const completedLessonsInModule = module.lessons.filter(lesson => 
    userProgress.completedLessons.includes(lesson.id)
  ).length;

  const progressPercentage = (completedLessonsInModule / module.lessons.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Cabeçalho do Módulo */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-start justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <div className="text-right">
            <div className="level-badge mb-2">
              Módulo {moduleId}
            </div>
            <div className="text-sm text-secondary">
              {completedLessonsInModule} de {module.lessons.length} lições
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-4">{module.title}</h1>
        <p className="text-secondary text-lg mb-6">{module.description}</p>

        {/* Barra de Progresso */}
        <div className="w-full bg-accent/50 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-right mt-2">
          <span className="text-sm text-secondary">{Math.round(progressPercentage)}% concluído</span>
        </div>
      </div>

      {/* Lista de Lições */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6">Lições do Módulo</h2>
        <div className="space-y-4">
          {module.lessons.map((lesson, index) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !userProgress.completedLessons.includes(module.lessons[index - 1].id);
            const canAccess = !isLocked;

            return (
              <div
                key={lesson.id}
                className={`glass-card rounded-2xl p-6 flex items-center justify-between group ${
                  canAccess ? 'cursor-pointer hover:shadow-xl' : 'opacity-60 cursor-not-allowed'
                } transition-all duration-300`}
                onClick={() => canAccess && onLessonSelect(lesson.id)}
              >
                <div className="flex items-center space-x-4">
                  {/* Ícone de Status */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : canAccess 
                        ? `bg-gradient-to-br ${lessonTypeColors[lesson.type as keyof typeof lessonTypeColors]} text-white`
                        : 'bg-gray-300 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="text-lg">
                        {lessonTypeIcons[lesson.type as keyof typeof lessonTypeIcons]}
                      </span>
                    )}
                  </div>

                  {/* Informações da Lição */}
                  <div>
                    <h3 className="font-semibold text-primary text-lg group-hover:text-secondary transition-colors">
                      {lesson.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-secondary text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      <span className="bg-accent/50 text-primary px-2 py-1 rounded-full text-xs">
                        {lesson.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="flex items-center space-x-3">
                  {isCompleted && (
                    <div className="flex items-center space-x-1 text-green-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">Concluída</span>
                    </div>
                  )}
                  
                  {canAccess && (
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                      <Play className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
