
import React from 'react';
import { ArrowLeft, Play, CheckCircle, Lock, Clock, Zap, Wrench } from 'lucide-react';
import { AppState } from '../pages/Index';
import { UserProgress } from '../utils/storage';
import { courseData } from '../data/courseData';

interface ModuleViewProps {
  moduleId: number;
  onBack: () => void;
  onLessonSelect: (lessonId: number) => void;
  userProgress: AppState['userProgress'];
  onProgressUpdate: (newProgress: UserProgress) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ 
  moduleId, 
  onBack, 
  onLessonSelect, 
  userProgress 
}) => {
  const currentModule = courseData.find(m => m.id === moduleId);

  if (!currentModule) {
    return <div>Módulo não encontrado</div>;
  }

  const isLessonUnlocked = (lesson: any, lessonIndex: number) => {
    // Primeira lição está sempre desbloqueada
    if (lessonIndex === 0) return true;
    
    // Verifica se a lição anterior foi completada
    const previousLesson = currentModule.lessons[lessonIndex - 1];
    return userProgress.completedLessons.includes(previousLesson.id);
  };

  const isLessonCompleted = (lessonId: number) => {
    return userProgress.completedLessons.includes(lessonId);
  };

  const getCompletedLessonsCount = () => {
    return currentModule.lessons.filter(lesson => 
      userProgress.completedLessons.includes(lesson.id)
    ).length;
  };

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
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-primary">{currentModule.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentModule.difficulty)}`}>
              {getDifficultyText(currentModule.difficulty)}
            </span>
          </div>
          <p className="text-secondary">{currentModule.description}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-secondary">
            <span>{getCompletedLessonsCount()}/{currentModule.lessons.length} lições concluídas</span>
            <span>•</span>
            <span>{currentModule.totalXP} XP total</span>
          </div>
        </div>
      </div>

      {/* Projeto do Pedal */}
      <div className="glass-card rounded-2xl p-6 border-l-4 border-secondary">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-secondary/10 rounded-xl">
            <Wrench className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Projeto do Módulo: {currentModule.pedalProject.name}
            </h3>
            <p className="text-secondary mb-3">{currentModule.pedalProject.description}</p>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-secondary">Dificuldade:</span>
              <span className="px-2 py-1 bg-accent/20 rounded-lg text-sm font-medium text-primary">
                {currentModule.pedalProject.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lições */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-primary mb-6">Lições do Módulo</h2>
        <div className="space-y-4">
          {currentModule.lessons.map((lesson, index) => {
            const isCompleted = isLessonCompleted(lesson.id);
            const isUnlocked = isLessonUnlocked(lesson, index);
            
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
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-secondary text-white' 
                        : isUnlocked 
                          ? 'bg-accent text-primary' 
                          : 'bg-accent/50 text-secondary'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : isUnlocked ? (
                        <Play className="w-6 h-6" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-primary">{lesson.title}</h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {getDifficultyText(lesson.difficulty)}
                        </span>
                      </div>
                      <p className="text-sm text-secondary mb-2">{lesson.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-secondary">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4" />
                          <span>{lesson.xpReward} XP</span>
                        </div>
                        <span>{lesson.steps.length} etapas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    {isCompleted && (
                      <div className="level-badge">
                        Concluída
                      </div>
                    )}
                    {lesson.prerequisites.length > 0 && !isUnlocked && (
                      <div className="text-xs text-secondary">
                        Requer: Lição {lesson.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
