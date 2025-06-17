
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Play, RotateCcw } from 'lucide-react';
import { AppState } from '../pages/Index';

interface LessonViewProps {
  moduleId: number;
  lessonId: number;
  onBack: () => void;
  userProgress: AppState['userProgress'];
}

export const LessonView: React.FC<LessonViewProps> = ({ 
  moduleId, 
  lessonId, 
  onBack, 
  userProgress 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const lessonData = {
    1: {
      title: "O que é Corrente Elétrica",
      steps: [
        {
          type: "theory",
          title: "Conceito de Corrente Elétrica",
          content: "A corrente elétrica é o fluxo de cargas elétricas através de um condutor. É medida em Ampères (A) e representa a quantidade de carga que passa por um ponto em um determinado tempo.",
          image: "/placeholder.svg"
        },
        {
          type: "exercise",
          question: "Qual é a unidade de medida da corrente elétrica?",
          options: [
            "Volts (V)",
            "Ampères (A)", 
            "Ohms (Ω)",
            "Watts (W)"
          ],
          correctAnswer: 1,
          explanation: "A corrente elétrica é medida em Ampères (A), em homenagem ao físico André-Marie Ampère."
        }
      ]
    }
  };

  const currentLesson = lessonData[lessonId as keyof typeof lessonData];
  
  if (!currentLesson) {
    return <div>Lição não encontrada</div>;
  }

  const currentStepData = currentLesson.steps[currentStep];
  const isLastStep = currentStep === currentLesson.steps.length - 1;

  const handleNextStep = () => {
    if (currentStepData.type === "exercise" && selectedAnswer === null) {
      return;
    }
    
    if (isLastStep) {
      onBack();
    } else {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const isCorrectAnswer = selectedAnswer === currentStepData.correctAnswer;

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
            <p className="text-secondary">
              Passo {currentStep + 1} de {currentLesson.steps.length}
            </p>
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
        {currentStepData.type === "theory" ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">
              {currentStepData.title}
            </h2>
            <div className="prose prose-lg text-secondary max-w-none">
              <p>{currentStepData.content}</p>
            </div>
            {currentStepData.image && (
              <div className="bg-accent/10 rounded-xl p-8 text-center">
                <div className="w-64 h-40 bg-accent/20 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-secondary">Diagrama Ilustrativo</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-primary">
              Exercício
            </h2>
            <p className="text-lg text-secondary">
              {currentStepData.question}
            </p>
            
            <div className="space-y-3">
              {currentStepData.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? isCorrectAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-secondary bg-secondary/10'
                      : showResult && index === currentStepData.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-accent/50 bg-white hover:border-secondary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? showResult
                          ? isCorrectAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : 'border-secondary bg-secondary'
                        : showResult && index === currentStepData.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-accent'
                    }`}>
                      {(selectedAnswer === index && showResult && isCorrectAnswer) || 
                       (showResult && index === currentStepData.correctAnswer) ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : null}
                    </div>
                    <span className="text-primary">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {showResult && (
              <div className={`p-4 rounded-xl ${
                isCorrectAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`font-semibold ${
                  isCorrectAnswer ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrectAnswer ? 'Correto!' : 'Incorreto'}
                </p>
                <p className="text-sm text-secondary mt-1">
                  {currentStepData.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentStep(0);
            setSelectedAnswer(null);
            setShowResult(false);
          }}
          className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-primary transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </button>
        
        <button
          onClick={handleNextStep}
          disabled={currentStepData.type === "exercise" && selectedAnswer === null}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? 'Finalizar' : 'Próximo'}
          <Play className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
