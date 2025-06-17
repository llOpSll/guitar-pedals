
export interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'circuit-analysis';
  question: string;
  options?: string[];
  correctAnswer: number | string;
  explanation: string;
  image?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LessonStep {
  id: number;
  type: 'theory' | 'exercise' | 'circuit' | 'simulation';
  title: string;
  content?: string;
  image?: string;
  questions?: Question[];
  circuitData?: {
    components: string[];
    schematic: string;
    description: string;
  };
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: LessonStep[];
  prerequisites: number[];
  xpReward: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  category: 'fundamentals' | 'components' | 'circuits' | 'projects';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  prerequisites: number[];
  totalXP: number;
}

export const courseData: Module[] = [
  {
    id: 1,
    title: "Fundamentos da Eletrônica",
    description: "Conceitos básicos essenciais para entender circuitos eletrônicos",
    category: "fundamentals",
    difficulty: "beginner",
    prerequisites: [],
    totalXP: 500,
    lessons: [
      {
        id: 1,
        title: "O que é Corrente Elétrica",
        description: "Entenda o conceito fundamental de corrente elétrica",
        duration: "15 min",
        difficulty: "beginner",
        prerequisites: [],
        xpReward: 25,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Conceito de Corrente Elétrica",
            content: "A corrente elétrica é o fluxo ordenado de cargas elétricas através de um condutor. Imagine água fluindo por um cano - a corrente elétrica é similar, mas com elétrons se movendo através de um fio. A unidade de medida da corrente é o Ampère (A), que representa a quantidade de carga que passa por um ponto em um segundo.",
            image: "/placeholder.svg"
          },
          {
            id: 2,
            type: "exercise",
            title: "Teste seus conhecimentos",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                question: "Qual é a unidade de medida da corrente elétrica?",
                options: ["Volts (V)", "Ampères (A)", "Ohms (Ω)", "Watts (W)"],
                correctAnswer: 1,
                explanation: "A corrente elétrica é medida em Ampères (A), em homenagem ao físico André-Marie Ampère.",
                difficulty: "easy"
              },
              {
                id: 2,
                type: "true-false",
                question: "A corrente elétrica é o movimento de elétrons através de um condutor.",
                correctAnswer: "true",
                explanation: "Correto! A corrente elétrica convencional é definida como o fluxo de cargas positivas, mas fisicamente são os elétrons (cargas negativas) que se movem.",
                difficulty: "easy"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Tensão e Diferença de Potencial",
        description: "Aprenda sobre tensão elétrica e como ela impulsiona a corrente",
        duration: "18 min",
        difficulty: "beginner",
        prerequisites: [1],
        xpReward: 30,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que é Tensão Elétrica",
            content: "A tensão elétrica, também chamada de diferença de potencial, é a 'força' que empurra os elétrons através de um circuito. É como a pressão da água em um cano - quanto maior a pressão, mais forte o fluxo. A tensão é medida em Volts (V) e é a diferença de energia entre dois pontos de um circuito.",
            image: "/placeholder.svg"
          },
          {
            id: 2,
            type: "exercise",
            title: "Exercícios sobre Tensão",
            questions: [
              {
                id: 3,
                type: "multiple-choice",
                question: "A tensão elétrica é medida em:",
                options: ["Ampères", "Volts", "Ohms", "Watts"],
                correctAnswer: 1,
                explanation: "A tensão elétrica é medida em Volts (V), em homenagem ao físico Alessandro Volta.",
                difficulty: "easy"
              },
              {
                id: 4,
                type: "fill-blank",
                question: "A tensão é a _____ de potencial entre dois pontos.",
                correctAnswer: "diferença",
                explanation: "A tensão é sempre uma diferença de potencial elétrico entre dois pontos de um circuito.",
                difficulty: "medium"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Lei de Ohm",
        description: "A lei fundamental que relaciona tensão, corrente e resistência",
        duration: "25 min",
        difficulty: "beginner",
        prerequisites: [1, 2],
        xpReward: 40,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "A Lei de Ohm",
            content: "A Lei de Ohm é uma das leis mais importantes da eletrônica. Ela estabelece que a corrente (I) em um circuito é diretamente proporcional à tensão (V) e inversamente proporcional à resistência (R). A fórmula é: V = I × R. Esta lei é fundamental para calcular valores em circuitos eletrônicos.",
            image: "/placeholder.svg"
          },
          {
            id: 2,
            type: "exercise",
            title: "Cálculos com Lei de Ohm",
            questions: [
              {
                id: 5,
                type: "multiple-choice",
                question: "Se temos 12V e 2Ω, qual a corrente?",
                options: ["4A", "6A", "8A", "10A"],
                correctAnswer: 1,
                explanation: "Usando V = I × R, temos I = V/R = 12V/2Ω = 6A",
                difficulty: "medium"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Componentes Passivos",
    description: "Resistores, capacitores e indutores - os blocos fundamentais",
    category: "components",
    difficulty: "beginner",
    prerequisites: [1],
    totalXP: 600,
    lessons: [
      {
        id: 4,
        title: "Resistores e Código de Cores",
        description: "Entenda resistores e como ler seus valores",
        duration: "20 min",
        difficulty: "beginner",
        prerequisites: [3],
        xpReward: 35,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que são Resistores",
            content: "Resistores são componentes que limitam o fluxo de corrente elétrica. Eles são essenciais em circuitos de pedais para controlar ganho, volume e tonalidade. O valor do resistor é indicado por faixas coloridas que seguem um código específico.",
            image: "/placeholder.svg"
          },
          {
            id: 2,
            type: "exercise",
            title: "Código de Cores",
            questions: [
              {
                id: 6,
                type: "multiple-choice",
                question: "Um resistor com faixas Marrom-Preto-Vermelho tem qual valor?",
                options: ["100Ω", "1kΩ", "10kΩ", "100kΩ"],
                correctAnswer: 1,
                explanation: "Marrom=1, Preto=0, Vermelho=×100 = 1000Ω = 1kΩ",
                difficulty: "medium"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Circuitos de Pedais Básicos",
    description: "Aprenda a construir seus primeiros circuitos de efeitos",
    category: "circuits",
    difficulty: "intermediate",
    prerequisites: [1, 2],
    totalXP: 800,
    lessons: [
      {
        id: 5,
        title: "Buffer de Guitarra",
        description: "Construa um buffer simples para preservar o sinal",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [4],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que é um Buffer",
            content: "Um buffer é um amplificador com ganho unitário (1x) que serve para isolar o pickup da guitarra do resto do circuito, preservando o sinal de alta impedância.",
            image: "/placeholder.svg"
          },
          {
            id: 2,
            type: "circuit",
            title: "Circuito Buffer com Op-Amp",
            circuitData: {
              components: ["TL072", "Resistor 1MΩ", "Capacitor 100nF", "Jack de entrada", "Jack de saída"],
              schematic: "buffer_opamp.svg",
              description: "Buffer simples usando amplificador operacional em configuração seguidor de tensão"
            }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Distorção e Overdrive",
    description: "Construa circuitos clássicos de distorção",
    category: "projects",
    difficulty: "intermediate",
    prerequisites: [3],
    totalXP: 1000,
    lessons: [
      {
        id: 6,
        title: "Tube Screamer Clone",
        description: "Construa um clone do famoso Ibanez Tube Screamer",
        duration: "45 min",
        difficulty: "intermediate",
        prerequisites: [5],
        xpReward: 75,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Análise do Tube Screamer",
            content: "O Tube Screamer é um dos overdrives mais famosos. Usa um amplificador operacional com clipping por diodos para criar distorção suave, com corte de graves e realce de médios característicos.",
            image: "/placeholder.svg"
          },
          {
            id: 2,
            type: "circuit",
            title: "Esquemático Completo",
            circuitData: {
              components: ["TL072", "Diodos 1N4148", "Potenciômetros", "Capacitores diversos", "Resistores"],
              schematic: "tubescreamer.svg",
              description: "Circuito completo do Tube Screamer com controles de Drive, Tone e Level"
            }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Fuzz Clássicos",
    description: "Os pedais de fuzz mais icônicos da história",
    category: "projects",
    difficulty: "advanced",
    prerequisites: [4],
    totalXP: 1200,
    lessons: [
      {
        id: 7,
        title: "Fuzz Face Clone",
        description: "Recrie o som clássico do Fuzz Face com transistores",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [6],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Fuzz Face",
            content: "O Fuzz Face é um dos primeiros pedais de fuzz, usando apenas dois transistores em configuração simples mas efetiva. O segredo está no bias correto dos transistores de germânio.",
            image: "/placeholder.svg"
          },
          {
            id: 2,
            type: "circuit",
            title: "Esquemático e Montagem",
            circuitData: {
              components: ["Transistores de Germânio", "Resistores", "Capacitores", "Potenciômetros Volume e Fuzz"],
              schematic: "fuzzface.svg",
              description: "Circuito clássico de dois transistores com controles minimalistas"
            }
          }
        ]
      }
    ]
  }
];

export const achievements = [
  { id: 'first_lesson', title: 'Primeira Lição', description: 'Complete sua primeira lição', xp: 10 },
  { id: 'first_module', title: 'Primeiro Módulo', description: 'Complete seu primeiro módulo', xp: 50 },
  { id: 'week_streak', title: 'Sequência de 7 dias', description: 'Estude por 7 dias seguidos', xp: 100 },
  { id: 'circuit_master', title: 'Mestre dos Circuitos', description: 'Complete 10 lições de circuitos', xp: 200 },
  { id: 'fuzz_builder', title: 'Construtor de Fuzz', description: 'Complete todos os circuitos de fuzz', xp: 300 }
];
