
import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Target, CheckCircle, X } from 'lucide-react';
import { getRandomQuestions } from '../data/courseData';
import { UserProgress } from '../utils/storage';

interface PracticeModeProps {
  moduleId: number;
  onBack: () => void;
  userProgress: UserProgress;
  onProgressUpdate: (progress: UserProgress) => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  moduleId,
  onBack,
  userProgress,
  onProgressUpdate
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const practiceQuestions = getRandomQuestions(moduleId, 10);
    setQuestions(practiceQuestions);
  }, [moduleId]);

  const handleAnswerSelect = (answer: number | string) => {
    setSelectedAnswer(answer);
  };

  const handleShowResult = () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      // Adiciona XP bônus por prática
      const bonusXP = Math.floor(score * 10);
      const updatedProgress = {
        ...userProgress,
        xp: userProgress.xp + bonusXP
      };
      onProgressUpdate(updatedProgress);
    }
  };

  const handleRestart = () => {
    const practiceQuestions = getRandomQuestions(moduleId, 10);
    setQuestions(practiceQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <Target className="w-16 h-16 text-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-primary mb-2">Modo Prática</h2>
        <p className="text-secondary">Carregando questões...</p>
      </div>
    );
  }

  if (completed) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="glass-card rounded-2xl p-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            percentage >= 70 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {percentage >= 70 ? 
              <CheckCircle className="w-10 h-10 text-green-600" /> :
              <X className="w-10 h-10 text-red-600" />
            }
          </div>
          
          <h2 className="text-3xl font-bold text-primary mb-4">
            {percentage >= 70 ? 'Parabéns!' : 'Continue Praticando!'}
          </h2>
          
          <p className="text-xl text-secondary mb-6">
            Você acertou {score} de {questions.length} questões ({percentage.toFixed(0)}%)
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="flex items-center space-x-2 px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Praticar Novamente</span>
            </button>
            
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-6 py-3 bg-accent text-primary rounded-xl hover:bg-accent/80"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
            <h1 className="text-2xl font-bold text-primary">Modo Prática</h1>
            <p className="text-secondary">Questão {currentQuestion + 1} de {questions.length}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-semibold text-primary">Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</p>
          <div className="w-48 h-2 bg-accent/30 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="glass-card rounded-2xl p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-accent/20 rounded-full text-sm font-medium text-primary">
              {question.lessonTitle}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-primary">
            {question.question}
          </h2>
        </div>

        {question.type === 'multiple-choice' && question.options ? (
          <div className="space-y-3 mb-6">
            {question.options.map((option: string, index: number) => {
              const isSelected = selectedAnswer === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    isSelected
                      ? showResult
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-secondary bg-secondary/10'
                      : showResult && index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-accent/50 bg-white hover:border-secondary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? showResult
                          ? index === question.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : 'border-secondary bg-secondary'
                        : showResult && index === question.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-accent'
                    }`}>
                      {((isSelected && showResult && index === question.correctAnswer) || 
                       (showResult && index === question.correctAnswer)) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-primary">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Digite sua resposta..."
              onChange={(e) => handleAnswerSelect(e.target.value)}
              className="w-full p-4 border-2 border-accent/50 rounded-xl focus:border-secondary outline-none"
            />
          </div>
        )}

        {showResult && (
          <div className={`p-4 rounded-xl mb-6 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correto!' : 'Incorreto'}
            </p>
            <p className="text-sm text-secondary mt-1">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={handleRestart}
            className="flex items-center space-x-2 px-4 py-2 text-secondary hover:text-primary transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar</span>
          </button>

          {!showResult ? (
            <button
              onClick={handleShowResult}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 disabled:opacity-50"
            >
              Verificar Resposta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl hover:shadow-lg"
            >
              {currentQuestion < questions.length - 1 ? 'Próxima' : 'Finalizar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
