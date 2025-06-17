
import React from 'react';
import { ArrowLeft, Play, CheckCircle, Lock, Clock } from 'lucide-react';
import { AppState } from '../pages/Index';

interface ModuleViewProps {
  moduleId: number;
  onBack: () => void;
  onLessonSelect: (lessonId: number) => void;
  userProgress: AppState['userProgress'];
}

export const ModuleView: React.FC<ModuleViewProps> = ({ 
  moduleId, 
  onBack, 
  onLessonSelect, 
  userProgress 
}) => {
  const moduleData = {
    1: {
      title: "Fundamentos da Eletrônica",
      description: "Aprenda os conceitos básicos da eletrônica que são essenciais para entender como funcionam os pedais de guitarra.",
      lessons: [
        { id: 1, title: "O que é Corrente Elétrica", duration: "15 min", completed: true },
        { id: 2, title: "Tensão e Diferença de Potencial", duration: "12 min", completed: true },
        { id: 3, title: "Resistência e Lei de Ohm", duration: "18 min", completed: true },
        { id: 4, title: "Potência Elétrica", duration: "10 min", completed: false },
        { id: 5, title: "Circuitos Série e Paralelo", duration: "20 min", completed: false },
        { id: 6, title: "Análise de Circuitos Simples", duration: "25 min", completed: false },
      ]
    },
    2: {
      title: "Componentes Passivos",
      description: "Explore resistores, capacitores e indutores e como eles afetam o som nos pedais.",
      lessons: [
        { id: 7, title: "Tipos de Resistores", duration: "14 min", completed: false },
        { id: 8, title: "Capacitores e Filtragem", duration: "16 min", completed: false },
        { id: 9, title: "Indutores e Bobinas", duration: "12 min", completed: false },
      ]
    }
  };

  const currentModule = moduleData[moduleId as keyof typeof moduleData];

  if (!currentModule) {
    return <div>Módulo não encontrado</div>;
  }

  const isLessonUnlocked = (lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    return currentModule.lessons[lessonIndex - 1].completed;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-primary">{currentModule.title}</h1>
          <p className="text-secondary mt-1">{currentModule.description}</p>
        </div>
      </div>

      {/* Lições */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-primary mb-6">Lições</h2>
        <div className="space-y-4">
          {currentModule.lessons.map((lesson, index) => {
            const isCompleted = lesson.completed;
            const isUnlocked = isLessonUnlocked(index);
            
            return (
              <div
                key={lesson.id}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isCompleted 
                    ? 'border-secondary/30 bg-secondary/10' 
                    : isUnlocked 
                      ? 'border-accent/50 bg-white hover:border-secondary/50 hover:shadow-md' 
                      : 'border-accent/20 bg-accent/5 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => isUnlocked && onLessonSelect(lesson.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-secondary text-white' 
                        : isUnlocked 
                          ? 'bg-accent text-primary' 
                          : 'bg-accent/50 text-secondary'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : isUnlocked ? (
                        <Play className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-primary">{lesson.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-secondary">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isCompleted && (
                    <div className="level-badge">
                      Concluída
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
