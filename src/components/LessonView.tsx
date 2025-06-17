
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, ArrowRight, BookOpen, Wrench, PenTool, Target } from 'lucide-react';
import { AppState } from '../pages/Index';

interface LessonViewProps {
  moduleId: number;
  lessonId: number;
  onBack: () => void;
  userProgress: AppState['userProgress'];
}

const lessonContent = {
  1: {
    title: "O que é Eletricidade?",
    type: "teoria",
    content: {
      introduction: "A eletricidade é o fenômeno físico associado ao movimento de cargas elétricas. É a base de toda a eletrônica moderna e essencial para entender como funcionam os pedais de guitarra.",
      sections: [
        {
          title: "Conceitos Fundamentais",
          content: "A eletricidade envolve três grandezas fundamentais: corrente, tensão e resistência. Essas três grandezas estão intimamente relacionadas pela Lei de Ohm."
        },
        {
          title: "Como se Aplica aos Pedais",
          content: "Nos pedais de guitarra, a eletricidade flui através de componentes como resistores, capacitores e transistores para modificar o sinal da guitarra, criando efeitos únicos."
        }
      ],
      keyPoints: [
        "Corrente elétrica é o fluxo de elétrons",
        "Tensão é a força que move os elétrons",
        "Resistência limita o fluxo de corrente",
        "Esses conceitos são a base de qualquer circuito"
      ]
    },
    quiz: [
      {
        question: "O que é corrente elétrica?",
        options: [
          "O movimento de elétrons através de um condutor",
          "A força que empurra os elétrons",
          "A oposição ao fluxo de elétrons",
          "A energia armazenada em um componente"
        ],
        correct: 0
      },
      {
        question: "Qual grandeza é medida em Volts?",
        options: ["Corrente", "Tensão", "Resistência", "Potência"],
        correct: 1
      }
    ]
  }
};

const typeIcons = {
  teoria: BookOpen,
  prática: Wrench,
  exercício: PenTool,
  teste: Target
};

export const LessonView: React.FC<LessonViewProps> = ({ 
  moduleId, 
  lessonId, 
  onBack, 
  userProgress 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const lesson = lessonContent[lessonId as keyof typeof lessonContent];
  
  if (!lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-secondary">Lição não encontrada</p>
        <button onClick={onBack} className="mt-4 text-primary hover:underline">
          Voltar ao Módulo
        </button>
      </div>
    );
  }

  const TypeIcon = typeIcons[lesson.type as keyof typeof typeIcons];
  const isCompleted = userProgress.completedLessons.includes(lessonId);
  const totalSections = lesson.content.sections.length;

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    // Aqui você adicionaria a lógica para salvar o progresso
  };

  const correctAnswers = lesson.quiz.reduce((count, question, index) => {
    return count + (selectedAnswers[index] === question.correct ? 1 : 0);
  }, 0);

  const renderContent = () => {
    if (showQuiz) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Quiz da Lição</h2>
            <p className="text-secondary">Teste seus conhecimentos sobre o conteúdo estudado</p>
          </div>

          {lesson.quiz.map((question, questionIndex) => (
            <div key={questionIndex} className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-primary text-lg mb-4">
                {questionIndex + 1}. {question.question}
              </h3>
              
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[questionIndex] === optionIndex;
                  const isCorrect = optionIndex === question.correct;
                  const showCorrect = showResults && isCorrect;
                  const showIncorrect = showResults && isSelected && !isCorrect;
                  
                  return (
                    <button
                      key={optionIndex}
                      onClick={() => !showResults && handleQuizAnswer(questionIndex, optionIndex)}
                      disabled={showResults}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        showCorrect 
                          ? 'border-green-500 bg-green-50' 
                          : showIncorrect 
                            ? 'border-red-500 bg-red-50'
                            : isSelected 
                              ? 'border-secondary bg-secondary/10' 
                              : 'border-accent hover:border-secondary'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!showResults && selectedAnswers.length === lesson.quiz.length && (
            <div className="text-center">
              <button
                onClick={handleFinishQuiz}
                className="bg-gradient-to-r from-secondary to-accent text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Finalizar Quiz
              </button>
            </div>
          )}

          {showResults && (
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="mb-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">Quiz Concluído!</h3>
                <p className="text-secondary">
                  Você acertou {correctAnswers} de {lesson.quiz.length} questões
                </p>
              </div>
              
              <button
                onClick={onBack}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Voltar ao Módulo
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Introdução */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Introdução</h2>
          <p className="text-secondary text-lg leading-relaxed">
            {lesson.content.introduction}
          </p>
        </div>

        {/* Seções do Conteúdo */}
        {lesson.content.sections.map((section, index) => (
          <div 
            key={index}
            className={`glass-card rounded-2xl p-8 transition-all duration-300 ${
              currentSection === index ? 'ring-2 ring-secondary' : ''
            }`}
          >
            <h3 className="text-xl font-bold text-primary mb-4">{section.title}</h3>
            <p className="text-secondary leading-relaxed">{section.content}</p>
          </div>
        ))}

        {/* Pontos-Chave */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-xl font-bold text-primary mb-6">Pontos-Chave</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.content.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-secondary">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botão para Quiz */}
        <div className="text-center">
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-gradient-to-r from-secondary to-accent text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <Target className="w-5 h-5" />
            <span>Fazer Quiz da Lição</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Cabeçalho da Lição */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-start justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Módulo</span>
          </button>
          
          {isCompleted && (
            <div className="flex items-center space-x-2 text-green-500">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Concluída</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
            <TypeIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">{lesson.title}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="bg-accent/50 text-primary px-3 py-1 rounded-full text-sm">
                {lesson.type}
              </span>
              <span className="text-secondary text-sm">
                Módulo {moduleId} • Lição {lessonId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo da Lição */}
      {renderContent()}
    </div>
  );
};
