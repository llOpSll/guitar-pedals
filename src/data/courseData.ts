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
    pedalName?: string;
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
  category: 'fundamentals' | 'components' | 'circuits' | 'projects' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  prerequisites: number[];
  totalXP: number;
  pedalProject: {
    name: string;
    description: string;
    difficulty: string;
  };
}

export const courseData: Module[] = [
  {
    id: 1,
    title: "Fundamentos da Eletrônica",
    description: "Aprenda os conceitos básicos de eletrônica aplicados aos pedais de guitarra",
    category: "fundamentals",
    difficulty: "beginner",
    prerequisites: [],
    totalXP: 1000,
    pedalProject: {
      name: "Buffer Básico",
      description: "Construa seu primeiro circuito: um buffer para guitarra",
      difficulty: "Iniciante"
    },
    lessons: [
      {
        id: 101,
        title: "O que é Eletrônica?",
        description: "Introdução aos conceitos fundamentais da eletrônica",
        difficulty: "beginner",
        duration: "15 min",
        xpReward: 50,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Conceitos Básicos",
            content: "A eletrônica é a ciência que estuda o comportamento dos elétrons em circuitos. Em pedais de guitarra, manipulamos o sinal elétrico da guitarra para criar diferentes efeitos sonoros."
          },
          {
            id: 2,
            type: "exercise",
            title: "Teste de Conhecimento",
            questions: [
              {
                id: 1011,
                type: "multiple-choice",
                question: "O que é um sinal elétrico?",
                options: ["Uma onda sonora", "Um fluxo de elétrons", "Uma vibração mecânica", "Um campo magnético"],
                correctAnswer: 1,
                explanation: "Um sinal elétrico é o fluxo controlado de elétrons através de um condutor.",
                difficulty: "easy"
              }
            ]
          }
        ]
      },
      {
        id: 102,
        title: "Tensão e Corrente",
        description: "Entenda os conceitos de tensão (voltagem) e corrente elétrica",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [101],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tensão Elétrica",
            content: "A tensão é a diferença de potencial elétrico entre dois pontos. É medida em Volts (V). Nos pedais de guitarra, geralmente trabalhamos com tensões de 9V."
          },
          {
            id: 2,
            type: "exercise",
            title: "Exercícios de Tensão",
            questions: [
              {
                id: 1021,
                type: "multiple-choice",
                question: "Qual é a unidade de medida da tensão?",
                options: ["Ampère", "Volt", "Ohm", "Watt"],
                correctAnswer: 1,
                explanation: "A tensão é medida em Volts (V), em homenagem ao físico Alessandro Volta.",
                difficulty: "easy"
              }
            ]
          }
        ]
      },
      {
        id: 103,
        title: "Resistência e Lei de Ohm",
        description: "Aprenda sobre resistência elétrica e a fundamental Lei de Ohm",
        difficulty: "beginner",
        duration: "25 min",
        xpReward: 70,
        prerequisites: [102],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "A Lei de Ohm",
            content: "A Lei de Ohm estabelece que V = I × R, onde V é tensão, I é corrente e R é resistência. Esta é uma das leis mais importantes na eletrônica."
          },
          {
            id: 2,
            type: "exercise",
            title: "Calculando com a Lei de Ohm",
            questions: [
              {
                id: 1031,
                type: "fill-blank",
                question: "Se temos 9V e uma resistência de 1000Ω, qual é a corrente? (resposta em mA)",
                correctAnswer: "9",
                explanation: "I = V/R = 9V/1000Ω = 0.009A = 9mA",
                difficulty: "medium"
              }
            ]
          }
        ]
      },
      {
        id: 104,
        title: "Capacitores em Pedais",
        description: "Entenda como os capacitores funcionam em circuitos de guitarra",
        difficulty: "beginner",
        duration: "30 min",
        xpReward: 80,
        prerequisites: [103],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que são Capacitores",
            content: "Capacitores armazenam energia elétrica temporariamente. Em pedais de guitarra, são usados para filtrar frequências e acoplar sinais."
          },
          {
            id: 2,
            type: "circuit",
            title: "Circuito com Capacitor",
            circuitData: {
              pedalName: "Filtro Passa-Alta",
              description: "Um simples filtro que deixa passar frequências agudas",
              components: ["Capacitor 100nF", "Resistor 10kΩ", "Conectores de entrada e saída"],
              schematic: "Entrada → [Capacitor 100nF] → [Resistor 10kΩ para terra] → Saída"
            }
          }
        ]
      },
      {
        id: 105,
        title: "Amplificadores Operacionais",
        description: "Introdução aos op-amps, componentes essenciais em pedais",
        difficulty: "intermediate",
        duration: "35 min",
        xpReward: 90,
        prerequisites: [104],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que é um Op-Amp",
            content: "Amplificadores operacionais são circuitos integrados que amplificam sinais. O TL072 é muito usado em pedais de guitarra."
          }
        ]
      },
      {
        id: 106,
        title: "Tipos de Sinais de Guitarra",
        description: "Características do sinal da guitarra elétrica",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [105],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Sinal da Guitarra",
            content: "O sinal da guitarra elétrica é um sinal AC de baixa amplitude, geralmente entre 100mV a 1V pico a pico."
          }
        ]
      },
      {
        id: 107,
        title: "Impedância em Circuitos",
        description: "Conceito de impedância e casamento de impedâncias",
        difficulty: "intermediate",
        duration: "25 min",
        xpReward: 70,
        prerequisites: [106],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Impedância",
            content: "Impedância é a oposição total ao fluxo de corrente AC. É importante casar impedâncias entre equipamentos."
          }
        ]
      },
      {
        id: 108,
        title: "Fontes de Alimentação",
        description: "Como funcionam as fontes de 9V para pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [107],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Alimentação de Pedais",
            content: "A maioria dos pedais usa fonte de 9V DC. É importante ter uma fonte estável e com baixo ruído."
          }
        ]
      },
      {
        id: 109,
        title: "Aterramento e Blindagem",
        description: "Técnicas para reduzir ruído em circuitos",
        difficulty: "intermediate",
        duration: "30 min",
        xpReward: 80,
        prerequisites: [108],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Aterramento",
            content: "Um bom aterramento é essencial para reduzir ruído e zumbidos em pedais de guitarra."
          }
        ]
      },
      {
        id: 110,
        title: "Projeto: Buffer Básico",
        description: "Construa seu primeiro pedal: um buffer para guitarra",
        difficulty: "beginner",
        duration: "45 min",
        xpReward: 150,
        prerequisites: [109],
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Montagem do Buffer",
            circuitData: {
              pedalName: "Buffer Básico",
              description: "Um buffer simples usando op-amp TL072 para isolar o sinal da guitarra",
              components: [
                "Op-amp TL072",
                "Resistor 1MΩ (entrada)",
                "Resistor 100Ω (saída)",
                "Capacitor 100nF (acoplamento)",
                "Capacitor 10µF (fonte)",
                "LED indicador",
                "Chave 3PDT"
              ],
              schematic: "Entrada → TL072 (pino 3) → TL072 (pino 1) → Resistor 100Ω → Saída"
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Componentes Eletrônicos",
    description: "Conheça em detalhes os componentes usados em pedais",
    category: "components",
    difficulty: "beginner",
    prerequisites: [1],
    totalXP: 1200,
    pedalProject: {
      name: "Booster Simples",
      description: "Um boost clean usando transistor",
      difficulty: "Iniciante"
    },
    lessons: [
      {
        id: 201,
        title: "Resistores",
        description: "Tipos e aplicações de resistores em pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Resistores",
            content: "Resistores limitam a corrente em circuitos. Existem resistores de carbono, filme metálico e wirewound."
          }
        ]
      },
      {
        id: 202,
        title: "Capacitores",
        description: "Tipos e aplicações de capacitores em pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Capacitores",
            content: "Capacitores armazenam energia elétrica. Existem capacitores eletrolíticos, cerâmicos e de filme."
          }
        ]
      },
      {
        id: 203,
        title: "Indutores",
        description: "Tipos e aplicações de indutores em pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Indutores",
            content: "Indutores são componentes que se opõem a mudanças de corrente. São usados em filtros e wahs."
          }
        ]
      },
      {
        id: 204,
        title: "Transistores",
        description: "Tipos e aplicações de transistores em pedais",
        difficulty: "intermediate",
        duration: "25 min",
        xpReward: 70,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Transistores",
            content: "Transistores são componentes de três terminais: base, coletor e emissor. Podem ser BJT ou JFET."
          }
        ]
      },
      {
        id: 205,
        title: "Op-Amps",
        description: "Tipos e aplicações de op-amps em pedais",
        difficulty: "intermediate",
        duration: "25 min",
        xpReward: 70,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Op-Amps",
            content: "Op-amps são amplificadores de alta impedância. TL072, NE5532 e OPA2134 são populares em áudio."
          }
        ]
      },
      {
        id: 206,
        title: "Diodos",
        description: "Tipos e aplicações de diodos em pedais",
        difficulty: "intermediate",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Diodos",
            content: "Diodos permitem fluxo de corrente em uma direção. São usados para clipping e retificação."
          }
        ]
      },
      {
        id: 207,
        title: "Transformadores",
        description: "Tipos e aplicações de transformadores em pedais",
        difficulty: "intermediate",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Transformadores",
            content: "Transformadores alteram tensão através de indução magnética. Usados em fontes e isolamento."
          }
        ]
      },
      {
        id: 208,
        title: "LEDs",
        description: "Tipos e aplicações de LEDs em pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de LEDs",
            content: "LEDs são diodos que emitem luz. Usados como indicadores visuais em pedais."
          }
        ]
      },
      {
        id: 209,
        title: "Chaves",
        description: "Tipos e aplicações de chaves em pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Chaves",
            content: "Chaves interrompem ou conectam circuitos. 3PDT é padrão para true bypass em pedais."
          }
        ]
      },
      {
        id: 210,
        title: "Potenciômetros",
        description: "Tipos e aplicações de potenciômetros em pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Potenciômetros",
            content: "Potenciômetros são resistores variáveis. Lineares (B) e logarítmicos (A) têm curvas diferentes."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Amplificadores Operacionais",
    description: "O coração dos circuitos modernos de pedais",
    category: "components",
    difficulty: "intermediate",
    prerequisites: [2],
    totalXP: 1400,
    pedalProject: {
      name: "Clean Boost",
      description: "Amplificador limpo usando op-amp",
      difficulty: "Fácil"
    },
    lessons: [
      {
        id: 301,
        title: "Introdução aos Op-Amps",
        description: "Conceitos básicos de amplificadores operacionais",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que são Op-Amps",
            content: "Amplificadores operacionais são circuitos integrados versáteis com ganho muito alto. Têm duas entradas (+ e -) e uma saída."
          }
        ]
      },
      {
        id: 302,
        title: "Configuração Inversor",
        description: "Amplificador inversor com op-amp",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [301],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Amplificador Inversor",
            content: "Na configuração inversora, o sinal é aplicado na entrada negativa, resultando em saída invertida."
          }
        ]
      },
      {
        id: 303,
        title: "Configuração Não-Inversor",
        description: "Amplificador não-inversor com op-amp",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [302],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Amplificador Não-Inversor",
            content: "Na configuração não-inversora, o sinal é aplicado na entrada positiva, mantendo a fase."
          }
        ]
      },
      {
        id: 304,
        title: "Buffer com Op-Amp",
        description: "Seguidor de tensão para isolamento",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [303],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Seguidor de Tensão",
            content: "Um buffer tem ganho unitário mas alta impedância de entrada e baixa de saída."
          }
        ]
      },
      {
        id: 305,
        title: "Somador com Op-Amp",
        description: "Circuito somador para misturar sinais",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [304],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Somador",
            content: "O somador permite combinar múltiplos sinais em um só, usado em mixers."
          }
        ]
      },
      {
        id: 306,
        title: "Integrador com Op-Amp",
        description: "Circuito integrador para formar ondas",
        duration: "25 min",
        difficulty: "advanced",
        prerequisites: [305],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Integrador",
            content: "O integrador converte ondas quadradas em triangulares, usado em osciladores."
          }
        ]
      },
      {
        id: 307,
        title: "Diferenciador com Op-Amp",
        description: "Circuito diferenciador para detectar mudanças",
        duration: "25 min",
        difficulty: "advanced",
        prerequisites: [306],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Diferenciador",
            content: "O diferenciador detecta mudanças rápidas no sinal, usado em detectores de ataque."
          }
        ]
      },
      {
        id: 308,
        title: "Comparador com Op-Amp",
        description: "Circuito comparador para decisões digitais",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [307],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Comparador",
            content: "O comparador compara dois sinais e decide qual é maior, base para gates."
          }
        ]
      },
      {
        id: 309,
        title: "Oscilador com Op-Amp",
        description: "Gerando sinais com op-amps",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [308],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Osciladores",
            content: "Op-amps podem gerar ondas senoidais, quadradas e triangulares para LFOs."
          }
        ]
      },
      {
        id: 310,
        title: "Projeto: Clean Boost",
        description: "Construindo um boost limpo com op-amp",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [309],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Clean Boost",
            circuitData: {
              components: ["TL072", "Resistores diversos", "Capacitores", "Potenciômetro"],
              schematic: "Entrada → Capacitor → Op-amp não-inversor → Capacitor → Saída",
              description: "Amplificador limpo com ganho ajustável",
              pedalName: "Clean Boost"
            }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Filtros Ativos",
    description: "Controle de frequências com amplificação",
    category: "circuits",
    difficulty: "intermediate",
    prerequisites: [3],
    totalXP: 1500,
    pedalProject: {
      name: "Tone Control",
      description: "Controle de tom ativo com op-amp",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 401,
        title: "Teoria dos Filtros",
        description: "Fundamentos de filtragem de frequências",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Filtros",
            content: "Filtros passa-baixa, passa-alta, passa-banda e rejeita-banda controlam quais frequências passam."
          }
        ]
      },
      {
        id: 402,
        title: "Filtro Passa-Baixa Ativo",
        description: "Removendo frequências agudas",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [401],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Passa-Baixa",
            content: "Filtros passa-baixa deixam passar graves e cortam agudos, usados para suavizar o som."
          }
        ]
      },
      {
        id: 403,
        title: "Filtro Passa-Alta Ativo",
        description: "Removendo frequências graves",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [402],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Passa-Alta",
            content: "Filtros passa-alta deixam passar agudos e cortam graves, removem ruído de baixa frequência."
          }
        ]
      },
      {
        id: 404,
        title: "Filtro Passa-Banda Ativo",
        description: "Isolando uma faixa de frequências",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [403],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Passa-Banda",
            content: "Filtros passa-banda isolam uma faixa específica, base para wahs e vocoders."
          }
        ]
      },
      {
        id: 405,
        title: "Filtro Notch (Rejeita-Banda)",
        description: "Removendo frequências específicas",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [404],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filtro Notch",
            content: "Filtros notch removem frequências específicas, usados para eliminar ruído de 60Hz."
          }
        ]
      },
      {
        id: 406,
        title: "Controle de Tom Ativo",
        description: "EQ ativo com op-amps",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [405],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "EQ Ativo",
            content: "Controles de tom ativos podem amplificar além de cortar frequências."
          }
        ]
      },
      {
        id: 407,
        title: "Filtro Sallen-Key",
        description: "Topologia clássica de filtros ativos",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [406],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Topologia Sallen-Key",
            content: "Sallen-Key é uma configuração eficiente para filtros de 2ª ordem."
          }
        ]
      },
      {
        id: 408,
        title: "Filtro de Múltipla Realimentação",
        description: "MFB - Multiple Feedback Filter",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [407],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "MFB Filter",
            content: "Filtros MFB oferecem controle independente de ganho e frequência."
          }
        ]
      },
      {
        id: 409,
        title: "Filtros de Estado Variável",
        description: "SVF - State Variable Filter",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [408],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "State Variable Filter",
            content: "SVF produz simultaneamente saídas passa-baixa, passa-alta e passa-banda."
          }
        ]
      },
      {
        id: 410,
        title: "Projeto: EQ 3 Bandas",
        description: "Equalizador ativo completo",
        duration: "45 min",
        difficulty: "intermediate",
        prerequisites: [409],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: EQ de 3 Bandas",
            circuitData: {
              components: ["TL072", "Resistores", "Capacitores", "Potenciômetros de Graves/Médios/Agudos"],
              schematic: "Entrada → Filtro Graves → Filtro Médios → Filtro Agudos → Saída",
              description: "Equalizador ativo de 3 bandas",
              pedalName: "3-Band EQ"
            }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Circuitos de Distorção",
    description: "Criando distorção harmônica controlada",
    category: "circuits",
    difficulty: "intermediate",
    prerequisites: [4],
    totalXP: 1600,
    pedalProject: {
      name: "Soft Clipping Overdrive",
      description: "Overdrive suave com diodos",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 501,
        title: "Teoria da Distorção",
        description: "Como criar e controlar distorção harmônica",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Clipping",
            content: "Existem dois tipos principais: hard clipping (corte abrupto) e soft clipping (corte suave)."
          }
        ]
      },
      {
        id: 502,
        title: "Soft Clipping com Diodos",
        description: "Distorção suave no feedback",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [501],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Soft Clipping",
            content: "Soft clipping usa diodos no feedback do op-amp, criando distorção mais musical."
          }
        ]
      },
      {
        id: 503,
        title: "Hard Clipping com Diodos",
        description: "Distorção agressiva direta",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [502],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Hard Clipping",
            content: "Hard clipping usa diodos direto no sinal, criando distorção mais agressiva."
          }
        ]
      },
      {
        id: 504,
        title: "Tipos de Diodos para Clipping",
        description: "Germânio, silício e LED",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [503],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Diodos para Clipping",
            content: "Diodos de germânio são suaves, silício mais duros, LEDs têm threshold alto."
          }
        ]
      },
      {
        id: 505,
        title: "Controle de Drive",
        description: "Ajustando a quantidade de distorção",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [504],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Controle de Drive",
            content: "O controle de drive ajusta o ganho antes do clipping, controlando a distorção."
          }
        ]
      },
      {
        id: 506,
        title: "Controle de Tom em Overdrives",
        description: "Moldando o som após a distorção",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [505],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Controle de Tom",
            content: "O controle de tom geralmente vem após o clipping para moldar o som final."
          }
        ]
      },
      {
        id: 507,
        title: "Assimetria no Clipping",
        description: "Criando harmônicos pares e ímpares",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [506],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Clipping Assimétrico",
            content: "Clipping assimétrico usa diodos diferentes para criar harmônicos únicos."
          }
        ]
      },
      {
        id: 508,
        title: "Cascata de Estágios",
        description: "Múltiplos estágios de ganho",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [507],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Estágios em Cascata",
            content: "Múltiplos estágios permitem mais ganho e complexidade harmônica."
          }
        ]
      },
      {
        id: 509,
        title: "Tube Screamer Análise",
        description: "Analisando o overdrive mais famoso",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [508],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Tube Screamer",
            content: "O TS808 usa soft clipping com diodos 1N914 e filtro passa-baixa."
          }
        ]
      },
      {
        id: 510,
        title: "Projeto: Tube Screamer Clone",
        description: "Construindo o overdrive clássico",
        duration: "50 min",
        difficulty: "intermediate",
        prerequisites: [509],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Tube Screamer Clone",
            circuitData: {
              components: ["TL072", "Diodos 1N4148", "Resistores", "Capacitores", "Potenciômetros Drive/Tone/Level"],
              schematic: "Entrada → Buffer → Ganho → Clipping → Filtro → Buffer → Saída",
              description: "Clone do famoso Ibanez Tube Screamer",
              pedalName: "TS Clone"
            }
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Transistores e Amplificação",
    description: "Componentes ativos fundamentais",
    category: "components",
    difficulty: "intermediate",
    prerequisites: [5],
    totalXP: 1400,
    pedalProject: {
      name: "Booster a Transistor",
      description: "Amplificador simples com transistor",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 601,
        title: "Transistores BJT Básico",
        description: "Funcionamento de transistores bipolares",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Como Funcionam os Transistores",
            content: "Transistores são componentes de três terminais: base, coletor e emissor."
          }
        ]
      },
      {
        id: 602,
        title: "Configuração Emissor Comum",
        description: "Amplificador básico com transistor",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [601],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Emissor Comum",
            content: "Configuração que oferece ganho de tensão e corrente."
          }
        ]
      },
      {
        id: 603,
        title: "Configuração Coletor Comum",
        description: "Seguidor de emissor para buffer",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [602],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Coletor Comum",
            content: "Configuração para alta impedância de entrada."
          }
        ]
      },
      {
        id: 604,
        title: "Configuração Base Comum",
        description: "Amplificador de corrente",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [603],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Base Comum",
            content: "Configuração para altas frequências."
          }
        ]
      },
      {
        id: 605,
        title: "Bias de Transistores",
        description: "Polarização para operação linear",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [604],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Polarização",
            content: "Bias correto é essencial para operação linear."
          }
        ]
      },
      {
        id: 606,
        title: "Transistores de Germânio",
        description: "Características dos transistores vintage",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [605],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Germânio vs Silício",
            content: "Germânio tem menor tensão de junção e mais vazamento."
          }
        ]
      },
      {
        id: 607,
        title: "JFETs em Pedais",
        description: "Transistores de efeito de campo",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [606],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "JFETs",
            content: "JFETs têm alta impedância e som mais suave."
          }
        ]
      },
      {
        id: 608,
        title: "MOSFETs em Áudio",
        description: "FETs de potência em distorção",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [607],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "MOSFETs",
            content: "MOSFETs podem simular distorção valvulada."
          }
        ]
      },
      {
        id: 609,
        title: "Fuzz Face Análise",
        description: "O fuzz mais famoso com transistores",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [608],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Fuzz Face",
            content: "Dois transistores em configuração simples mas genial."
          }
        ]
      },
      {
        id: 610,
        title: "Projeto: Rangemaster Booster",
        description: "Booster clássico com transistor",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [609],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Rangemaster Booster",
            circuitData: {
              components: ["Transistor AC128", "Resistores", "Capacitores", "Potenciômetro"],
              schematic: "Entrada → Capacitor → Base do Transistor → Coletor → Saída",
              description: "Booster clássico com transistor de germânio",
              pedalName: "Rangemaster Clone"
            }
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Fuzz Clássicos",
    description: "Os pedais de fuzz mais icônicos",
    category: "projects",
    difficulty: "intermediate",
    prerequisites: [6],
    totalXP: 1500,
    pedalProject: {
      name: "Fuzz Face",
      description: "O clássico fuzz de dois transistores",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 701,
        title: "História do Fuzz",
        description: "Como surgiu a distorção por acidente",
        duration: "20 min",
        difficulty: "beginner",
        prerequisites: [],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Origem do Fuzz",
            content: "O fuzz nasceu por acidente em gravações dos anos 50."
          }
        ]
      },
      {
        id: 702,
        title: "Fuzz Face Circuito",
        description: "Análise completa do circuito",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [701],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "A Magia do Fuzz Face",
            content: "Dois transistores em configuração que cria distorção única."
          }
        ]
      },
      {
        id: 703,
        title: "Bias no Fuzz Face",
        description: "Ajustando para o som perfeito",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [702],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Ajuste de Bias",
            content: "O bias correto é crucial para o som do Fuzz Face."
          }
        ]
      },
      {
        id: 704,
        title: "Big Muff Circuito",
        description: "O sustain infinito russo",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [703],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Big Muff Pi",
            content: "Quatro estágios para sustain e volume imensos."
          }
        ]
      },
      {
        id: 705,
        title: "Tonebender Mk2",
        description: "O fuzz britânico dos anos 60",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [704],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tonebender",
            content: "Três transistores para o som britânico clássico."
          }
        ]
      },
      {
        id: 706,
        title: "Octavia/Green Ringer",
        description: "Fuzz com oitava acima",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [705],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Octave Fuzz",
            content: "Ring modulator adiciona oitava ao fuzz."
          }
        ]
      },
      {
        id: 707,
        title: "Superfuzz/FZ-2",
        description: "Fuzz com múltiplas oitavas",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [706],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Super Fuzz",
            content: "Múltiplos flip-flops criam harmônicos únicos."
          }
        ]
      },
      {
        id: 708,
        title: "Fuzz Factory Análise",
        description: "Fuzz moderno com controles únicos",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [707],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Fuzz Factory",
            content: "Controles interativos para sons experimentais."
          }
        ]
      },
      {
        id: 709,
        title: "Modificações em Fuzz",
        description: "Customizando seu fuzz",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [708],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Mods Comuns",
            content: "Capacitores de input, resistores de bias, switches."
          }
        ]
      },
      {
        id: 710,
        title: "Projeto: Fuzz Face Clone",
        description: "Construindo o fuzz lendário",
        duration: "50 min",
        difficulty: "intermediate",
        prerequisites: [709],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Fuzz Face Clone",
            circuitData: {
              components: ["2x Transistores AC128", "Resistores", "Capacitores", "Potenciômetros Volume/Fuzz"],
              schematic: "Entrada → Q1 (Amplificador) → Q2 (Saturação) → Saída",
              description: "Fuzz clássico de dois transistores",
              pedalName: "Fuzz Face Clone"
            }
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Delays e Reverbs",
    description: "Efeitos de tempo e espaço",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [7],
    totalXP: 1800,
    pedalProject: {
      name: "Analog Delay",
      description: "Delay analógico com bucket brigade",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 801,
        title: "Princípios do Delay",
        description: "Como funciona o atraso de sinal",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Conceito de Delay",
            content: "Delay é a repetição do sinal original após um tempo determinado."
          }
        ]
      },
      {
        id: 802,
        title: "Bucket Brigade Devices",
        description: "BBDs para delay analógico",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [801],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "BBD Chips",
            content: "BBDs transferem o sinal através de capacitores em série."
          }
        ]
      },
      {
        id: 803,
        title: "Clock para BBD",
        description: "Gerando o clock de controle",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [802],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito de Clock",
            content: "Oscilador controla a velocidade do BBD."
          }
        ]
      },
      {
        id: 804,
        title: "Filtragem em Delays",
        description: "Removendo artefatos do BBD",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [803],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filtros Anti-Aliasing",
            content: "Filtros remove ruído de clock e aliasing."
          }
        ]
      },
      {
        id: 805,
        title: "Feedback em Delays",
        description: "Criando repetições múltiplas",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [804],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Controle de Feedback",
            content: "Feedback determina quantas repetições ocorrem."
          }
        ]
      },
      {
        id: 806,
        title: "Mix Wet/Dry",
        description: "Balanceando sinal direto e delay",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [805],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Controle de Mix",
            content: "Mix controla a proporção entre sinal original e delay."
          }
        ]
      },
      {
        id: 807,
        title: "DM-2 Boss Análise",
        description: "Delay analógico clássico",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [806],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Boss DM-2",
            content: "MN3005 BBD com circuito de companding."
          }
        ]
      },
      {
        id: 808,
        title: "Memory Man Análise",
        description: "Delay com chorus integrado",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [807],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Deluxe Memory Man",
            content: "Delay com vibrato e chorus modulado."
          }
        ]
      },
      {
        id: 809,
        title: "Reverb por Springs",
        description: "Reverb mecânico clássico",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [808],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Spring Reverb",
            content: "Molas criam reverberação natural."
          }
        ]
      },
      {
        id: 810,
        title: "Projeto: Analog Delay",
        description: "Delay BBD completo",
        duration: "60 min",
        difficulty: "advanced",
        prerequisites: [809],
        xpReward: 150,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: DM-2 Clone",
            circuitData: {
              components: ["MN3005", "MN3101", "TL072", "Resistores", "Capacitores", "Potenciômetros"],
              schematic: "Entrada → BBD → Filtro → Mix → Saída, com Clock e Feedback",
              description: "Clone do Boss DM-2 Delay",
              pedalName: "Analog Delay"
            }
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Chorus e Modulação",
    description: "Efeitos de modulação de frequência",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [8],
    totalXP: 1700,
    pedalProject: {
      name: "Analog Chorus",
      description: "Chorus analógico clássico",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 901,
        title: "Teoria da Modulação",
        description: "Como funciona a modulação de delay",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Modulação de Delay",
            content: "Variação contínua do tempo de delay cria efeitos espaciais."
          }
        ]
      },
      {
        id: 902,
        title: "LFO - Low Frequency Oscillator",
        description: "Gerando modulação lenta",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [901],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuitos LFO",
            content: "LFO varia o clock do BBD criando modulação."
          }
        ]
      },
      {
        id: 903,
        title: "Chorus vs Vibrato",
        description: "Diferenças entre os efeitos",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [902],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Chorus vs Vibrato",
            content: "Chorus mistura sinal direto, vibrato só modulado."
          }
        ]
      },
      {
        id: 904,
        title: "CE-1 Boss Análise",
        description: "O primeiro chorus comercial",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [903],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Boss CE-1",
            content: "Primeiro chorus comercial com preamp integrado."
          }
        ]
      },
      {
        id: 905,
        title: "CE-2 Boss Análise",
        description: "Chorus compacto que mudou tudo",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [904],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Boss CE-2",
            content: "MN3007 BBD com LFO triangular."
          }
        ]
      },
      {
        id: 906,
        title: "Small Clone Análise",
        description: "Chorus simples mas efetivo",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [905],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "EHX Small Clone",
            content: "Circuito simples com som distintivo."
          }
        ]
      },
      {
        id: 907,
        title: "Flanger vs Chorus",
        description: "Diferenças nos tempos de delay",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [906],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Flanger",
            content: "Flanger usa delays mais curtos que chorus."
          }
        ]
      },
      {
        id: 908,
        title: "Controles de Chorus",
        description: "Rate, Depth e Mix explicados",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [907],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Controles",
            content: "Rate=velocidade, Depth=intensidade, Mix=proporção."
          }
        ]
      },
      {
        id: 909,
        title: "Stereo Chorus",
        description: "Chorus estéreo para amplificação dupla",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [908],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Efeito Estéreo",
            content: "Duas saídas com fases opostas criam espacialidade."
          }
        ]
      },
      {
        id: 910,
        title: "Projeto: CE-2 Chorus Clone",
        description: "Chorus analógico completo",
        duration: "55 min",
        difficulty: "advanced",
        prerequisites: [909],
        xpReward: 140,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: CE-2 Chorus",
            circuitData: {
              components: ["MN3007", "TL022", "LFO Circuit", "Resistores", "Capacitores"],
              schematic: "Entrada → BBD com LFO → Mix com sinal direto → Saída",
              description: "Clone do Boss CE-2 Chorus",
              pedalName: "Analog Chorus"
            }
          }
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Wahs e Filtros Dinâmicos",
    description: "Filtros controlados por pedal",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [9],
    totalXP: 1600,
    pedalProject: {
      name: "Cry Baby Wah",
      description: "O wah mais famoso do mundo",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 1001,
        title: "Teoria do Wah-Wah",
        description: "Como funciona o filtro variável",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filtro Passa-Banda Variável",
            content: "Wah varia a frequência central de um filtro passa-banda."
          }
        ]
      },
      {
        id: 1002,
        title: "Indutores em Wahs",
        description: "O coração do circuito wah",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [1001],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Indutor no Wah",
            content: "Indutor e potenciômetro criam filtro ressonante."
          }
        ]
      },
      {
        id: 1003,
        title: "Cry Baby Original",
        description: "Análise do wah mais famoso",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [1002],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Circuito Cry Baby",
            content: "Transistor 2N5089 com indutor e pot especial."
          }
        ]
      },
      {
        id: 1004,
        title: "Vox V846 vs Dunlop",
        description: "Diferenças entre os wahs clássicos",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1003],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "V846 vs Cry Baby",
            content: "Vox usa indutor menor, som mais nasal."
          }
        ]
      },
      {
        id: 1005,
        title: "Auto-Wah/Envelope Filter",
        description: "Wah controlado por dinâmica",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1004],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Envelope Filter",
            content: "Detector de envelope controla frequência do filtro."
          }
        ]
      },
      {
        id: 1006,
        title: "Mutron III Análise",
        description: "O auto-wah que definiu o funk",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1005],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Mutron III",
            content: "Filtro passa-banda com envelope detector."
          }
        ]
      },
      {
        id: 1007,
        title: "Talk Box Funcionamento",
        description: "Modulação vocal do som",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1006],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Talk Box",
            content: "Driver de compressão modula som através da boca."
          }
        ]
      },
      {
        id: 1008,
        title: "Modificações em Wahs",
        description: "Customizando seu wah",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1007],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Mods Comuns",
            content: "True bypass, vocal/tight switch, range pot."
          }
        ]
      },
      {
        id: 1009,
        title: "Wah de Baixo",
        description: "Adaptações para baixo elétrico",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1008],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Bass Wah",
            content: "Componentes ajustados para frequências graves."
          }
        ]
      },
      {
        id: 1010,
        title: "Projeto: Cry Baby Clone",
        description: "Construindo o wah clássico",
        duration: "45 min",
        difficulty: "intermediate",
        prerequisites: [1009],
        xpReward: 110,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Cry Baby Clone",
            circuitData: {
              components: ["Indutor", "Transistor 2N5089", "Potenciômetro", "Resistores", "Capacitores"],
              schematic: "Entrada → Indutor + Pot (filtro) → Transistor (buffer) → Saída",
              description: "Clone do Dunlop Cry Baby",
              pedalName: "Wah-Wah"
            }
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Compressores e Limitadores",
    description: "Controle de dinâmica do sinal",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [10],
    totalXP: 1700,
    pedalProject: {
      name: "Orange Squeezer",
      description: "Compressor ótico clássico",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 1101,
        title: "Teoria da Compressão",
        description: "Controle automático de dinâmica",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que é Compressão",
            content: "Compressão reduz a diferença entre sons altos e baixos."
          }
        ]
      },
      {
        id: 1102,
        title: "VCA - Voltage Controlled Amplifier",
        description: "Amplificador controlado por tensão",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1101],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "VCA Chips",
            content: "VCAs como CA3080 controlam ganho eletronicamente."
          }
        ]
      },
      {
        id: 1103,
        title: "Compressor Ótico",
        description: "LED/LDR para compressão suave",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [1102],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Opto-Compressor",
            content: "LED+LDR criam compressão musical e suave."
          }
        ]
      },
      {
        id: 1104,
        title: "MXR Dyna Comp",
        description: "Compressor com CA3080",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1103],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Dyna Comp",
            content: "CA3080 VCA com detector de envelope."
          }
        ]
      },
      {
        id: 1105,
        title: "Orange Squeezer",
        description: "Compressor ótico clássico",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [1104],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Orange Squeezer",
            content: "JFET controlado por opto-isolador."
          }
        ]
      },
      {
        id: 1106,
        title: "Ross Compressor",
        description: "Compressor ótico melhorado",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [1105],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Ross Compressor",
            content: "Melhorias no Orange Squeezer original."
          }
        ]
      },
      {
        id: 1107,
        title: "Compressor de Tubo",
        description: "Compressão valvulada vintage",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1106],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tube Compressor",
            content: "Válvulas como elemento de controle de ganho."
          }
        ]
      },
      {
        id: 1108,
        title: "Controles de Compressor",
        description: "Threshold, Ratio, Attack, Release",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1107],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Parâmetros",
            content: "Threshold=limiar, Ratio=proporção, Attack/Release=tempo."
          }
        ]
      },
      {
        id: 1109,
        title: "Limitador vs Compressor",
        description: "Diferenças na aplicação",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1108],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Limiter",
            content: "Limitador é compressor com ratio alto (∞:1)."
          }
        ]
      },
      {
        id: 1110,
        title: "Projeto: Dyna Comp Clone",
        description: "Compressor VCA completo",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [1109],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Dyna Comp Clone",
            circuitData: {
              components: ["CA3080", "Resistores", "Capacitores", "LED", "LDR"],
              schematic: "Entrada → VCA → Saída, com Detector de Envelope controlando VCA",
              description: "Clone do MXR Dyna Comp",
              pedalName: "Compressor"
            }
          }
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Phasers e Flangers",
    description: "Efeitos de cancelamento de fase",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [11],
    totalXP: 1800,
    pedalProject: {
      name: "Phase 90",
      description: "Phaser de 4 estágios clássico",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 1201,
        title: "Teoria de Fase",
        description: "Entendendo cancelamento e reforço",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Cancelamento de Fase",
            content: "Sinais fora de fase se cancelam, em fase se reforçam."
          }
        ]
      },
      {
        id: 1202,
        title: "All-Pass Filters",
        description: "Filtros que alteram só a fase",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1201],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filtros All-Pass",
            content: "Mantêm amplitude, mudam fase de frequências específicas."
          }
        ]
      },
      {
        id: 1203,
        title: "JFET como Resistor Variável",
        description: "Controlando filtros com JFETs",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1202],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "JFET Variable Resistor",
            content: "Tensão no gate controla resistência drain-source."
          }
        ]
      },
      {
        id: 1204,
        title: "MXR Phase 90",
        description: "O phaser que definiu o som dos anos 70",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [1203],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Phase 90",
            content: "4 estágios all-pass com JFETs modulados por LFO."
          }
        ]
      },
      {
        id: 1205,
        title: "Small Stone Phaser",
        description: "Phaser com controle de cor",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1204],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "EHX Small Stone",
            content: "4 estágios com switch de cor (feedback)."
          }
        ]
      },
      {
        id: 1206,
        title: "Script vs Block Phase 90",
        description: "Diferenças nas versões do Phase 90",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1205],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Script vs Block",
            content: "Script usa JFETs, Block usa FETs integrados."
          }
        ]
      },
      {
        id: 1207,
        title: "Flanger Elétrico",
        description: "Flanger com BBD",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1206],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Electric Flanger",
            content: "BBD com delay muito curto e modulação."
          }
        ]
      },
      {
        id: 1208,
        title: "Flanger vs Phaser",
        description: "Diferenças técnicas e sonoras",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1207],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Flanger vs Phaser",
            content: "Flanger usa delay real, phaser usa deslocamento de fase."
          }
        ]
      },
      {
        id: 1209,
        title: "Uni-Vibe/Vibrato",
        description: "Phaser com LFO lento",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1208],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Uni-Vibe",
            content: "4 estágios all-pass com LFO lento e lamp+LDR."
          }
        ]
      },
      {
        id: 1210,
        title: "Projeto: Phase 90 Clone",
        description: "4 estágios all-pass modulados",
        duration: "60 min",
        difficulty: "advanced",
        prerequisites: [1209],
        xpReward: 150,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Phase 90 Clone",
            circuitData: {
              components: ["4x JFETs", "TL022", "LFO", "Resistores", "Capacitores"],
              schematic: "Entrada → 4x All-Pass stages → Mix → Saída, com LFO controlando JFETs",
              description: "Clone do MXR Phase 90",
              pedalName: "4-Stage Phaser"
            }
          }
        ]
      }
    ]
  },
  {
    id: 13,
    title: "Octavers e Pitch Shifters",
    description: "Efeitos de mudança de frequência",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [12],
    totalXP: 1600,
    pedalProject: {
      name: "Green Ringer",
      description: "Octaver analógico com diodos",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 1301,
        title: "Teoria do Pitch Shifting",
        description: "Mudando a frequência fundamental",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Pitch Shifting",
            content: "Mudar pitch sem alterar duração é complexo tecnicamente."
          }
        ]
      },
      {
        id: 1302,
        title: "Ring Modulation",
        description: "Multiplicação de frequências",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1301],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Ring Modulators",
            content: "Multiplicam duas frequências gerando soma e diferença."
          }
        ]
      },
      {
        id: 1303,
        title: "Green Ringer Análise",
        description: "Octaver analógico simples",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [1302],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Green Ringer",
            content: "Ring modulator com transformador e diodos."
          }
        ]
      },
      {
        id: 1304,
        title: "Blue Box Octaver",
        description: "Oitava abaixo com flip-flops",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1303],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Blue Box",
            content: "Flip-flops dividem frequência por 2 (oitava abaixo)."
          }
        ]
      },
      {
        id: 1305,
        title: "Micro POG Análise",
        description: "Octaver polifônico moderno",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1304],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "POG",
            content: "DSP analisa harmônicos para octaver polifônico."
          }
        ]
      },
      {
        id: 1306,
        title: "Whammy Pedal",
        description: "Pitch shift com pedal de expressão",
        duration: "25 min",
        difficulty: "advanced",
        prerequisites: [1305],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "DigiTech Whammy",
            content: "DSP com pedal de expressão para pitch bend."
          }
        ]
      },
      {
        id: 1307,
        title: "Harmonist/Intelligent Pitch",
        description: "Harmonias automáticas",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1306],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Harmonist",
            content: "Gera harmonias baseadas em escala selecionada."
          }
        ]
      },
      {
        id: 1308,
        title: "Tracking em Octavers",
        description: "Problemas de rastreamento",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1307],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tracking Issues",
            content: "Octavers analógicos têm problemas com acordes."
          }
        ]
      },
      {
        id: 1309,
        title: "Octaver para Baixo",
        description: "Adaptações para baixo elétrico",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1308],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Bass Octaver",
            content: "Componentes ajustados para frequências graves."
          }
        ]
      },
      {
        id: 1310,
        title: "Projeto: Green Ringer Clone",
        description: "Octaver analógico clássico",
        duration: "45 min",
        difficulty: "intermediate",
        prerequisites: [1309],
        xpReward: 110,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Green Ringer Clone",
            circuitData: {
              components: ["4x Diodos 1N914", "Transformador", "Resistores", "Capacitores"],
              schematic: "Entrada → Transformador → Ring Modulator (diodos) → Saída",
              description: "Octaver com ring modulator",
              pedalName: "Octave Up"
            }
          }
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Tremolo e Vibrato",
    description: "Modulação de amplitude e frequência",
    category: "circuits",
    difficulty: "intermediate",
    prerequisites: [13],
    totalXP: 1400,
    pedalProject: {
      name: "Optical Tremolo",
      description: "Tremolo ótico suave",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 1401,
        title: "Tremolo vs Vibrato",
        description: "Modulação de amplitude vs frequência",
        duration: "25 min",
        difficulty: "beginner",
        prerequisites: [],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tremolo vs Vibrato",
            content: "Tremolo modula amplitude (volume), vibrato modula frequência (pitch)."
          }
        ]
      },
      {
        id: 1402,
        title: "Tremolo Ótico",
        description: "LED/LDR para modulação suave",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [1401],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Opto-Tremolo",
            content: "LED+LDR modulados por LFO criam tremolo suave."
          }
        ]
      },
      {
        id: 1403,
        title: "Tremolo com VCA",
        description: "Modulação por tensão",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [1402],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "VCA Tremolo",
            content: "VCA controlado por LFO para tremolo preciso."
          }
        ]
      },
      {
        id: 1404,
        title: "Tremolo Valvulado",
        description: "Tremolo em amplificadores vintage",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1403],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tube Tremolo",
            content: "Válvula modulada por LFO em amps vintage."
          }
        ]
      },
      {
        id: 1405,
        title: "Boss PN-2 Tremolo/Pan",
        description: "Tremolo estéreo com pan",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [1404],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tremolo/Pan",
            content: "Duas saídas com LFOs opostos criam pan automático."
          }
        ]
      },
      {
        id: 1406,
        title: "EA Tremolo",
        description: "Tremolo com múltiplas ondas",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1405],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Multi-Wave Tremolo",
            content: "Seleção entre ondas senoidal, quadrada, triangular."
          }
        ]
      },
      {
        id: 1407,
        title: "Vibrato Analógico",
        description: "Modulação de pitch real",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1406],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "True Vibrato",
            content: "BBD modulado cria vibrato real (pitch)."
          }
        ]
      },
      {
        id: 1408,
        title: "Chopito/Stutter",
        description: "Tremolo extremo tipo gate",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1407],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Chopito Effect",
            content: "Tremolo com onda quadrada cria efeito stutter."
          }
        ]
      },
      {
        id: 1409,
        title: "Harmonic Tremolo",
        description: "Tremolo em diferentes frequências",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1408],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Harmonic Tremolo",
            content: "Separa graves e agudos, modula alternadamente."
          }
        ]
      },
      {
        id: 1410,
        title: "Projeto: Tremolo Ótico",
        description: "Tremolo suave com fotoresistor",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [1409],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Tremolo Ótico",
            circuitData: {
              components: ["TL072", "LED", "LDR", "LFO Circuit", "Resistores", "Capacitores"],
              schematic: "Entrada → Divisor com LDR → Saída, LED modulado por LFO",
              description: "Tremolo suave com fotoresistor",
              pedalName: "Optical Tremolo"
            }
          }
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Ring Modulators",
    description: "Efeitos de modulação extrema",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [14],
    totalXP: 1500,
    pedalProject: {
      name: "Frequency Analyzer",
      description: "Ring modulator com oscilador interno",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 1501,
        title: "Ring Modulation Theory",
        description: "Multiplicação de sinais",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Ring Modulation",
            content: "Multiplicação de dois sinais gera soma e diferença das frequências."
          }
        ]
      },
      {
        id: 1502,
        title: "Diode Ring",
        description: "Ring modulator com diodos",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1501],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Diode Ring",
            content: "4 diodos em anel criam modulação balanceada."
          }
        ]
      },
      {
        id: 1503,
        title: "CMOS Ring Modulator",
        description: "Ring modulator digital",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1502],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "CMOS Ring Mod",
            content: "4066 CMOS switches fazem ring modulation digital."
          }
        ]
      },
      {
        id: 1504,
        title: "Frequency Analyzer",
        description: "Ring mod com oscilador interno",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1503],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Frequency Analyzer",
            content: "Oscilador interno modulado com sinal da guitarra."
          }
        ]
      },
      {
        id: 1505,
        title: "Moogerfooger Ring Mod",
        description: "Ring modulator profissional",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1504],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Moogerfooger",
            content: "Ring mod com VCO e LFO integrados."
          }
        ]
      },
      {
        id: 1506,
        title: "Ring Mod para Efeitos Vocais",
        description: "Sons robóticos e de sci-fi",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1505],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Robot Voice",
            content: "Ring mod com frequência fixa cria voz robótica."
          }
        ]
      },
      {
        id: 1507,
        title: "AM vs Ring Modulation",
        description: "Diferenças na modulação",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1506],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "AM vs Ring Mod",
            content: "AM preserva portadora, ring mod a cancela."
          }
        ]
      },
      {
        id: 1508,
        title: "Balanced vs Unbalanced",
        description: "Tipos de modulação",
        duration: "25 min",
        difficulty: "advanced",
        prerequisites: [1507],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Balanced Modulation",
            content: "Modulação balanceada suprime a portadora."
          }
        ]
      },
      {
        id: 1509,
        title: "Tracking Ring Modulator",
        description: "Ring mod que segue a nota",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1508],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tracking Ring Mod",
            content: "PLL segue frequência fundamental da guitarra."
          }
        ]
      },
      {
        id: 1510,
        title: "Projeto: Frequency Analyzer",
        description: "Ring modulator completo",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [1509],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Frequency Analyzer",
            circuitData: {
              components: ["4066 CMOS", "Oscilador", "Resistores", "Capacitores", "Potenciômetros"],
              schematic: "Entrada + Oscilador → 4066 Switches → Filtro → Saída",
              description: "Ring modulator com oscilador ajustável",
              pedalName: "Ring Modulator"
            }
          }
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Noise Gates",
    description: "Controle de ruído e silêncio",
    category: "circuits",
    difficulty: "intermediate",
    prerequisites: [15],
    totalXP: 1300,
    pedalProject: {
      name: "Noise Gate",
      description: "Gate para eliminar ruído",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 1601,
        title: "Teoria do Noise Gate",
        description: "Eliminando ruído automaticamente",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Como Funciona um Gate",
            content: "Gate monitora nível do sinal e corta quando abaixo do threshold."
          }
        ]
      },
      {
        id: 1602,
        title: "Detector de Envelope",
        description: "Medindo o nível do sinal",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [1601],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Envelope Detection",
            content: "Retificador e filtro extraem envelope do sinal."
          }
        ]
      },
      {
        id: 1603,
        title: "Comparador para Gate",
        description: "Decisão de abrir/fechar",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1602],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Threshold Comparator",
            content: "Comparador decide se sinal está acima do threshold."
          }
        ]
      },
      {
        id: 1604,
        title: "VCA para Gating",
        description: "Controlando o ganho",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [1603],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "VCA Gate",
            content: "VCA controlado por detector corta o sinal."
          }
        ]
      },
      {
        id: 1605,
        title: "Boss NS-2 Análise",
        description: "Noise suppressor profissional",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [1604],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Boss NS-2",
            content: "Gate com send/return para posicionamento flexível."
          }
        ]
      },
      {
        id: 1606,
        title: "Gate com Hysteresis",
        description: "Evitando oscilação no threshold",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1605],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Hysteresis",
            content: "Dois thresholds evitam liga/desliga rápido."
          }
        ]
      },
      {
        id: 1607,
        title: "Attack e Release",
        description: "Controles de tempo",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1606],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Attack/Release Times",
            content: "Attack=tempo para abrir, Release=tempo para fechar."
          }
        ]
      },
      {
        id: 1608,
        title: "Gate para Baixo",
        description: "Adaptações para baixo elétrico",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1607],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Bass Gate",
            content: "Threshold e filtros ajustados para graves."
          }
        ]
      },
      {
        id: 1609,
        title: "Sidechain Gate",
        description: "Gate controlado por sinal externo",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1608],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Sidechain",
            content: "Sinal externo controla gate do sinal principal."
          }
        ]
      },
      {
        id: 1610,
        title: "Projeto: Simple Gate",
        description: "Gate básico mas efetivo",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [1609],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Simple Gate",
            circuitData: {
              components: ["TL072", "4066", "Comparadores", "Resistores", "Capacitores"],
              schematic: "Entrada → Detector → Comparador → 4066 Switch → Saída",
              description: "Gate simples com threshold ajustável",
              pedalName: "Noise Gate"
            }
          }
        ]
      }
    ]
  },
  {
    id: 17,
    title: "Synth Filters",
    description: "Filtros para sons sintéticos",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [16],
    totalXP: 1900,
    pedalProject: {
      name: "Moog Filter",
      description: "Filtro passa-baixa clássico",
      difficulty: "Muito Difícil"
    },
    lessons: [
      {
        id: 1701,
        title: "Ladder Filters",
        description: "O filtro Moog transistorizado",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Transistor Ladder",
            content: "4 transistores em 'escada' criam filtro -24dB/oitava."
          }
        ]
      },
      {
        id: 1702,
        title: "VCF - Voltage Controlled Filter",
        description: "Filtro controlado por tensão",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1701],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "VCF Basics",
            content: "Tensão de controle varia frequência de corte."
          }
        ]
      },
      {
        id: 1703,
        title: "Resonance/Q Factor",
        description: "Realimentação para ressonância",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1702],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filter Resonance",
            content: "Feedback da saída para entrada cria ressonância."
          }
        ]
      },
      {
        id: 1704,
        title: "CEM3320 Filter",
        description: "Filtro integrado Curtis",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1703],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "CEM3320",
            content: "Chip de filtro com VCF e VCA integrados."
          }
        ]
      },
      {
        id: 1705,
        title: "State Variable Filter",
        description: "Filtro com múltiplas saídas",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1704],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "SVF Design",
            content: "Saídas simultâneas low-pass, high-pass e band-pass."
          }
        ]
      },
      {
        id: 1706,
        title: "MS-20 Filter",
        description: "Filtro Korg agressivo",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1705],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Korg MS-20",
            content: "Filtro high-pass + low-pass com som distintivo."
          }
        ]
      },
      {
        id: 1707,
        title: "TB-303 Filter",
        description: "O filtro que criou o acid house",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1706],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "TB-303 Filter",
            content: "Filtro passa-baixa com envelope próprio."
          }
        ]
      },
      {
        id: 1708,
        title: "Envelope Follower Filter",
        description: "Filtro que segue dinâmica",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1707],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Auto-Filter",
            content: "Envelope do sinal controla frequência do filtro."
          }
        ]
      },
      {
        id: 1709,
        title: "Multi-Mode Filters",
        description: "Filtros com múltiplos tipos",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1708],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Multi-Mode",
            content: "Seleção entre low-pass, high-pass, band-pass, notch."
          }
        ]
      },
      {
        id: 1710,
        title: "Projeto: Moog Filter Clone",
        description: "Filtro transistor ladder",
        duration: "70 min",
        difficulty: "advanced",
        prerequisites: [1709],
        xpReward: 180,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: Moog Filter Clone",
            circuitData: {
              components: ["4x Transistores", "Op-amps", "Resistores", "Capacitores", "Potenciômetros Cutoff/Resonance"],
              schematic: "Entrada → 4x Transistor Stages → Feedback → Saída",
              description: "Filtro Moog de 4 polos",
              pedalName: "Moog Filter"
            }
          }
        ]
      }
    ]
  },
  {
    id: 18,
    title: "Sequencers e Arpeggiators",
    description: "Circuitos de sequência automática",
    category: "circuits",
    difficulty: "advanced",
    prerequisites: [17],
    totalXP: 2000,
    pedalProject: {
      name: "Step Sequencer",
      description: "Sequenciador de 8 passos",
      difficulty: "Muito Difícil"
    },
    lessons: [
      {
        id: 1801,
        title: "Digital Logic em Áudio",
        description: "Contadores e multiplexers",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Contadores Digitais",
            content: "4017 e 4040 contam pulsos de clock para sequências."
          }
        ]
      },
      {
        id: 1802,
        title: "Clock Generation",
        description: "Gerando pulsos de tempo",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [1801],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Clock Circuits",
            content: "555 timer ou osciladores RC geram clock estável."
          }
        ]
      },
      {
        id: 1803,
        title: "4017 Decade Counter",
        description: "Contador de 10 estágios",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [1802],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "4017 Counter",
            content: "Cada pulso ativa saída sequencial, retorna ao zero."
          }
        ]
      },
      {
        id: 1804,
        title: "Voltage Storage",
        description: "Armazenando tensões de controle",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [1803],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Sample & Hold",
            content: "Capacitores armazenam tensões, FETs fazem switching."
          }
        ]
      },
      {
        id: 1805,
        title: "8-Step Sequencer",
        description: "Sequenciador básico",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [1804],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "8-Step Design",
            content: "4017 + potenciômetros criam 8 tensões diferentes."
          }
        ]
      },
      {
        id: 1806,
        title: "16-Step Sequencer",
        description: "Sequências mais longas",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1805],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "16-Step Design",
            content: "Dois 4017 em cascata para 16 passos."
          }
        ]
      },
      {
        id: 1807,
        title: "Pattern Programming",
        description: "Programando sequências",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [1806],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Programming Patterns",
            content: "Potenciômetros ou switches programam cada passo."
          }
        ]
      },
      {
        id: 1808,
        title: "Reset e Length Control",
        description: "Controlando tamanho da sequência",
        duration: "25 min",
        difficulty: "intermediate",
        prerequisites: [1807],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Sequence Length",
            content: "Reset manual permite sequências de 1-8 passos."
          }
        ]
      },
      {
        id: 1809,
        title: "Arpeggiator Design",
        description: "Arpejo automático de acordes",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1808],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Arpeggiator",
            content: "Sequenciador que toca notas de acorde automaticamente."
          }
        ]
      },
      {
        id: 1810,
        title: "Projeto: 8-Step Sequencer",
        description: "Sequenciador CV completo",
        duration: "80 min",
        difficulty: "advanced",
        prerequisites: [1809],
        xpReward: 200,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: 8-Step Sequencer",
            circuitData: {
              components: ["4017 Counter", "4051 Multiplexer", "Clock Circuit", "Potenciômetros", "LEDs"],
              schematic: "Clock → 4017 → 4051 → Voltage Out, com Reset e Pots para cada step",
              description: "Sequenciador de 8 passos com clock ajustável",
              pedalName: "Step Sequencer"
            }
          }
        ]
      }
    ]
  },
  {
    id: 19,
    title: "Vocoders e Speech Synthesis",
    description: "Síntese de voz e efeitos robóticos",
    category: "advanced",
    difficulty: "advanced",
    prerequisites: [18],
    totalXP: 2100,
    pedalProject: {
      name: "Simple Vocoder",
      description: "Vocoder básico com filtros",
      difficulty: "Muito Difícil"
    },
    lessons: [
      {
        id: 1901,
        title: "Análise e Síntese de Voz",
        description: "Como funcionam os vocoders",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Vocoder Principle",
            content: "Análise espectral da voz controla síntese de carrier."
          }
        ]
      },
      {
        id: 1902,
        title: "Filter Banks",
        description: "Bancos de filtros para análise",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [1901],
        xpReward: 110,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filter Bank Design",
            content: "Múltiplos filtros passa-banda analisam voz."
          }
        ]
      },
      {
        id: 1903,
        title: "Envelope Following",
        description: "Extraindo envelope de cada banda",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [1902],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Envelope Followers",
            content: "Cada banda tem detector de envelope próprio."
          }
        ]
      },
      {
        id: 1904,
        title: "VCA Array",
        description: "Controlando síntese por banda",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1903],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "VCA Control",
            content: "Envelopes controlam VCAs de cada banda do carrier."
          }
        ]
      },
      {
        id: 1905,
        title: "4-Band Vocoder",
        description: "Vocoder simples mas funcional",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [1904],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "4-Band Design",
            content: "4 bandas são mínimo para inteligibilidade."
          }
        ]
      },
      {
        id: 1906,
        title: "8-Band Vocoder",
        description: "Vocoder de qualidade profissional",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [1905],
        xpReward: 110,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "8-Band Design",
            content: "8 bandas oferecem melhor inteligibilidade."
          }
        ]
      },
      {
        id: 1907,
        title: "Carrier Oscillators",
        description: "Gerando portadoras",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [1906],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Carrier Generation",
            content: "Osciladores ou ruído branco como carrier."
          }
        ]
      },
      {
        id: 1908,
        title: "EMS Vocoder 2000",
        description: "Vocoder clássico dos anos 70",
        duration: "35 min",
        difficulty: "advanced",
        prerequisites: [1907],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "EMS 2000",
            content: "22 bandas com formant synthesis."
          }
        ]
      },
      {
        id: 1909,
        title: "Talk Box vs Vocoder",
        description: "Diferenças técnicas",
        duration: "20 min",
        difficulty: "intermediate",
        prerequisites: [1908],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Talk Box vs Vocoder",
            content: "Talk box usa boca física, vocoder é eletrônico."
          }
        ]
      },
      {
        id: 1910,
        title: "Projeto: 4-Band Vocoder",
        description: "Vocoder básico funcional",
        duration: "90 min",
        difficulty: "advanced",
        prerequisites: [1909],
        xpReward: 220,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: 4-Band Vocoder",
            circuitData: {
              components: ["Múltiplos Op-amps", "Filtros passa-banda", "Envelope Followers", "VCAs"],
              schematic: "Voz → 4x Filters → 4x Envelopes → 4x VCAs → Sum → Saída",
              description: "Vocoder simples de 4 bandas",
              pedalName: "Vocoder"
            }
          }
        ]
      }
    ]
  },
  {
    id: 20,
    title: "Projeto Final: Multi-FX Unit",
    description: "Unidade completa com múltiplos efeitos",
    category: "advanced",
    difficulty: "advanced",
    prerequisites: [19],
    totalXP: 2500,
    pedalProject: {
      name: "Multi-Effects Processor",
      description: "Processador com 8 efeitos diferentes",
      difficulty: "Mestre"
    },
    lessons: [
      {
        id: 2001,
        title: "System Design Principles",
        description: "Planejando sistema complexo",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [],
        xpReward: 110,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "System Architecture",
            content: "Planejamento é crucial para sistemas complexos."
          }
        ]
      },
      {
        id: 2002,
        title: "Signal Routing",
        description: "Roteamento flexível de sinal",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [2001],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Signal Routing",
            content: "Switches analógicos permitem roteamento flexível."
          }
        ]
      },
      {
        id: 2003,
        title: "Effect Switching",
        description: "Chaveamento entre efeitos",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [2002],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Analog Switching",
            content: "4066, 4051, 4052 fazem switching de áudio."
          }
        ]
      },
      {
        id: 2004,
        title: "Buffering Stages",
        description: "Isolamento entre efeitos",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [2003],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Buffer Stages",
            content: "Buffers isolam cada efeito dos outros."
          }
        ]
      },
      {
        id: 2005,
        title: "Power Distribution",
        description: "Alimentação para múltiplos circuitos",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [2004],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Power Supply Design",
            content: "Fonte robusta com filtragem adequada."
          }
        ]
      },
      {
        id: 2006,
        title: "Digital Control",
        description: "Microcontrolador para automação",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [2005],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "MCU Control",
            content: "Arduino ou PIC controla switches e parâmetros."
          }
        ]
      },
      {
        id: 2007,
        title: "User Interface",
        description: "Controles e display",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [2006],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "UI Design",
            content: "LCD, encoders e footswitches para controle."
          }
        ]
      },
      {
        id: 2008,
        title: "Preset Management",
        description: "Salvando e carregando configurações",
        duration: "30 min",
        difficulty: "advanced",
        prerequisites: [2007],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Preset System",
            content: "EEPROM armazena configurações de efeitos."
          }
        ]
      },
      {
        id: 2009,
        title: "MIDI Implementation",
        description: "Controle MIDI externo",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [2008],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "MIDI Control",
            content: "MIDI permite controle remoto de parâmetros."
          }
        ]
      },
      {
        id: 2010,
        title: "Projeto: Multi-FX Processor",
        description: "Unidade completa de efeitos",
        duration: "120 min",
        difficulty: "advanced",
        prerequisites: [2009],
        xpReward: 300,
        steps: [
          {
            id: 1,
            type: "circuit",
            title: "Projeto: 8-FX Processor",
            circuitData: {
              components: ["Múltiplos CIs", "Switches analógicos", "Microcontrolador", "LCD", "Footswitches"],
              schematic: "Entrada → Router → 8x Efeitos → Mixer → Saída, MCU controla tudo",
              description: "Processador com overdrive, delay, chorus, reverb, EQ, compressor, gate e boost",
              pedalName: "Multi-FX Unit"
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
  { id: 'fuzz_builder', title: 'Construtor de Fuzz', description: 'Complete todos os circuitos de fuzz', xp: 300 },
  { id: 'overdrive_expert', title: 'Expert em Overdrive', description: 'Complete 5 pedais de overdrive', xp: 250 },
  { id: 'modulation_master', title: 'Mestre da Modulação', description: 'Complete chorus, phaser e flanger', xp: 400 },
  { id: 'delay_designer', title: 'Designer de Delay', description: 'Complete 3 tipos diferentes de delay', xp: 350 },
  { id: 'filter_wizard', title: 'Mago dos Filtros', description: 'Complete 10 circuitos de filtros', xp: 300 },
  { id: 'transistor_guru', title: 'Guru dos Transistores', description: 'Complete 15 circuitos com transistores', xp: 450 },
  { id: 'opamp_master', title: 'Mestre dos Op-Amps', description: 'Complete 20 circuitos com op-amps', xp: 500 },
  { id: 'analog_expert', title: 'Expert Analógico', description: 'Complete todos os efeitos analógicos', xp: 600 },
  { id: 'boutique_builder', title: 'Construtor Boutique', description: 'Complete 10 projetos avançados', xp: 700 },
  { id: 'synth_master', title: 'Mestre dos Synths', description: 'Complete filtros e sequencers', xp: 800 },
  { id: 'grand_master', title: 'Grão-Mestre', description: 'Complete todos os 20 módulos', xp: 1000 }
];
