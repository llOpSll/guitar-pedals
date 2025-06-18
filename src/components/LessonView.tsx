import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Play, RotateCcw, Clock, Zap, Wrench, BookOpen, Target } from 'lucide-react';
import { AppState } from '../pages/Index';
import { UserProgress } from '../utils/storage';
import { courseData } from '../data/courseData';

interface LessonViewProps {
  moduleId: number;
  lessonId: number;
  onBack: () => void;
  userProgress: AppState['userProgress'];
  onProgressUpdate: (newProgress: UserProgress) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ 
  moduleId, 
  lessonId, 
  onBack, 
  userProgress,
  onProgressUpdate
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number | string }>({});
  const [showResults, setShowResults] = useState<{ [questionId: number]: boolean }>({});

  const currentModule = courseData.find(m => m.id === moduleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === lessonId);
  
  if (!currentLesson) {
    return <div>Lição não encontrada</div>;
  }

  const currentStepData = currentLesson.steps[currentStep];
  const isLastStep = currentStep === currentLesson.steps.length - 1;

  const handleNextStep = () => {
    if (currentStepData.type === "exercise" && currentStepData.questions) {
      // Verifica se todas as perguntas foram respondidas e mostram resultados
      const allAnsweredAndShown = currentStepData.questions.every(q => 
        selectedAnswers[q.id] !== undefined && showResults[q.id] === true
      );
      if (!allAnsweredAndShown) return;
    }
    
    if (isLastStep) {
      // Marca a lição como concluída e adiciona XP
      if (!userProgress.completedLessons.includes(lessonId)) {
        const newProgress = {
          ...userProgress,
          completedLessons: [...userProgress.completedLessons, lessonId],
          xp: userProgress.xp + currentLesson.xpReward,
          level: Math.floor((userProgress.xp + currentLesson.xpReward) / 200) + 1
        };
        
        // Verificar conquistas
        const updatedProgress = checkAchievements(newProgress);
        onProgressUpdate(updatedProgress);
      }
      onBack();
    } else {
      setCurrentStep(currentStep + 1);
      setSelectedAnswers({});
      setShowResults({});
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setShowResults({});
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number | string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleShowResult = (questionId: number) => {
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  const checkAchievements = (progress: UserProgress): UserProgress => {
    const newAchievements = [...progress.achievements];
    
    // Primeira lição completada
    if (progress.completedLessons.length === 1 && !newAchievements.includes('first-lesson')) {
      newAchievements.push('first-lesson');
    }
    
    // 10 lições completadas
    if (progress.completedLessons.length >= 10 && !newAchievements.includes('lesson-master')) {
      newAchievements.push('lesson-master');
    }
    
    // Primeiro módulo completado
    const moduleCompleted = courseData.some(module => 
      module.lessons.every(lesson => progress.completedLessons.includes(lesson.id))
    );
    if (moduleCompleted && !newAchievements.includes('first-module')) {
      newAchievements.push('first-module');
    }

    return { ...progress, achievements: newAchievements };
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'theory': return BookOpen;
      case 'exercise': return Target;
      case 'circuit': return Wrench;
      default: return BookOpen;
    }
  };

  const getStepTypeText = (type: string) => {
    switch (type) {
      case 'theory': return 'Teoria';
      case 'exercise': return 'Exercício';
      case 'circuit': return 'Circuito';
      default: return 'Conteúdo';
    }
  };

  const renderCircuitStep = (stepData: any) => {
    return (
      <div className="space-y-6">
        <div className="bg-accent/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">
            Projeto: {stepData.circuitData.pedalName}
          </h3>
          <p className="text-secondary mb-4">{stepData.circuitData.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-3">Componentes:</h4>
              <ul className="space-y-2">
                {stepData.circuitData.components.map((component: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2 text-secondary">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>{component}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-accent/20">
              <h4 className="font-semibold text-primary mb-3">Esquemático:</h4>
              {stepData.circuitData.schematic ? (
                <div className="space-y-3">
                  <div className="w-full h-48 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-secondary text-center">
                      Diagrama: {stepData.circuitData.pedalName}
                      <br />
                      <small>Veja referência abaixo</small>
                    </span>
                  </div>
                  <a 
                    href={stepData.circuitData.schematic} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-secondary hover:text-primary transition-colors text-sm"
                  >
                    <span>🔗 Ver esquemático completo</span>
                  </a>
                </div>
              ) : (
                <div className="w-full h-48 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-secondary">Esquemático em desenvolvimento</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/80 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-primary">{currentLesson.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-secondary mt-1">
              <span>Etapa {currentStep + 1} de {currentLesson.steps.length}</span>
              <span>•</span>
              <span>{getStepTypeText(currentStepData.type)}</span>
              {currentLesson.xpReward && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>{currentLesson.xpReward} XP</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress */}
        <div className="w-48 h-2 bg-accent/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
            style={{ width: `${((currentStep + 1) / currentLesson.steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="glass-card rounded-2xl p-8">
        {/* Step Header */}
        <div className="flex items-center space-x-3 mb-6">
          {React.createElement(getStepIcon(currentStepData.type), {
            className: "w-6 h-6 text-secondary"
          })}
          <h2 className="text-xl font-semibold text-primary">
            {currentStepData.title}
          </h2>
        </div>

        {currentStepData.type === "theory" ? (
          <div className="space-y-6">
            <div className="prose prose-lg text-secondary max-w-none">
              <p className="text-lg leading-relaxed">{currentStepData.content}</p>
            </div>
          </div>
        ) : currentStepData.type === "circuit" && currentStepData.circuitData ? (
          renderCircuitStep(currentStepData)
        ) : currentStepData.type === "exercise" && currentStepData.questions ? (
          <div className="space-y-8">
            {currentStepData.questions.map((question, qIndex) => (
              <div key={question.id} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-secondary">{qIndex + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-primary font-medium mb-4">
                      {question.question}
                    </p>
                    
                    {question.type === 'multiple-choice' && question.options ? (
                      <div className="space-y-3">
                        {question.options.map((option, index) => {
                          const isSelected = selectedAnswers[question.id] === index;
                          const showResult = showResults[question.id];
                          const isCorrect = index === question.correctAnswer;
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(question.id, index)}
                              disabled={showResult}
                              className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                                isSelected
                                  ? showResult
                                    ? isCorrect
                                      ? 'border-green-500 bg-green-50'
                                      : 'border-red-500 bg-red-50'
                                    : 'border-secondary bg-secondary/10'
                                  : showResult && isCorrect
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-accent/50 bg-white hover:border-secondary/50'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  isSelected
                                    ? showResult
                                      ? isCorrect
                                        ? 'border-green-500 bg-green-500'
                                        : 'border-red-500 bg-red-500'
                                      : 'border-secondary bg-secondary'
                                    : showResult && isCorrect
                                      ? 'border-green-500 bg-green-500'
                                      : 'border-accent'
                                }`}>
                                  {((isSelected && showResult && isCorrect) || 
                                   (showResult && isCorrect)) && (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <span className="text-primary">{option}</span>
                              </div>
                            </button>
                          );
                        })}
                        
                        {selectedAnswers[question.id] !== undefined && !showResults[question.id] && (
                          <button
                            onClick={() => handleShowResult(question.id)}
                            className="mt-3 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                          >
                            Ver Resultado
                          </button>
                        )}
                      </div>
                    ) : question.type === 'fill-blank' ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Digite sua resposta..."
                          onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
                          className="w-full p-4 border-2 border-accent/50 rounded-xl focus:border-secondary outline-none"
                        />
                        {selectedAnswers[question.id] && !showResults[question.id] && (
                          <button
                            onClick={() => handleShowResult(question.id)}
                            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
                          >
                            Verificar Resposta
                          </button>
                        )}
                      </div>
                    ) : null}
                    
                    {showResults[question.id] && (
                      <div className={`mt-4 p-4 rounded-xl ${
                        (question.type === 'multiple-choice' && selectedAnswers[question.id] === question.correctAnswer) ||
                        (question.type === 'fill-blank' && 
                         typeof selectedAnswers[question.id] === 'string' && 
                         typeof question.correctAnswer === 'string' &&
                         (selectedAnswers[question.id] as string).toLowerCase().trim() === 
                         (question.correctAnswer as string).toLowerCase().trim())
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <p className={`font-semibold ${
                          (question.type === 'multiple-choice' && selectedAnswers[question.id] === question.correctAnswer) ||
                          (question.type === 'fill-blank' && 
                           typeof selectedAnswers[question.id] === 'string' && 
                           typeof question.correctAnswer === 'string' &&
                           (selectedAnswers[question.id] as string).toLowerCase().trim() === 
                           (question.correctAnswer as string).toLowerCase().trim())
                            ? 'text-green-800' 
                            : 'text-red-800'
                        }`}>
                          {(question.type === 'multiple-choice' && selectedAnswers[question.id] === question.correctAnswer) ||
                           (question.type === 'fill-blank' && 
                            typeof selectedAnswers[question.id] === 'string' && 
                            typeof question.correctAnswer === 'string' &&
                            (selectedAnswers[question.id] as string).toLowerCase().trim() === 
                            (question.correctAnswer as string).toLowerCase().trim())
                            ? 'Correto!' 
                            : 'Incorreto'}
                        </p>
                        <p className="text-sm text-secondary mt-1">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={handleRestart}
          className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-primary transition-colors border border-secondary/30 rounded-lg hover:border-secondary hover:bg-secondary/10"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar Lição</span>
        </button>
        
        <button
          onClick={handleNextStep}
          disabled={
            currentStepData.type === "exercise" && 
            currentStepData.questions &&
            !currentStepData.questions.every(q => 
              selectedAnswers[q.id] !== undefined && showResults[q.id] === true
            )
          }
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? 'Finalizar Lição' : 'Próxima Etapa'}
          <Play className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
