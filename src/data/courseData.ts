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
              },
              {
                id: 1022,
                type: "true-false",
                question: "A maioria dos pedais de guitarra funciona com 9V",
                correctAnswer: "true",
                explanation: "Sim, a grande maioria dos pedais utiliza fonte de 9V DC.",
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
    totalXP: 700,
    pedalProject: {
      name: "Clean Boost",
      description: "Amplificador limpo usando op-amp",
      difficulty: "Fácil"
    },
    lessons: [
      {
        id: 6,
        title: "Introdução aos Op-Amps",
        description: "Conceitos básicos de amplificadores operacionais",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [5],
        xpReward: 50,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que são Op-Amps",
            content: "Amplificadores operacionais são circuitos integrados versáteis com ganho muito alto. Têm duas entradas (+ e -) e uma saída. O princípio básico: a saída tenta fazer com que as duas entradas tenham a mesma tensão. São usados em configurações como buffer, amplificador não-inversor e inversor."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Clean Boost",
            circuitData: {
              components: ["TL072", "Resistores diversos", "Capacitores", "Potenciômetro"],
              schematic: "clean_boost.svg",
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
    totalXP: 800,
    pedalProject: {
      name: "Tone Control",
      description: "Controle de tom ativo com op-amp",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 7,
        title: "Filtros com Op-Amp",
        description: "Criando filtros ativos para controle de tom",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [6],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Vantagens dos Filtros Ativos",
            content: "Filtros ativos usam amplificação para superar as limitações dos filtros passivos. Permitem ganho, isolamento entre estágios e resposta de frequência mais precisa. São ideais para controles de tom em pedais."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: EQ de 3 Bandas",
            circuitData: {
              components: ["TL072", "Resistores", "Capacitores", "Potenciômetros de Graves/Médios/Agudos"],
              schematic: "eq_3band.svg",
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
    totalXP: 900,
    pedalProject: {
      name: "Soft Clipping Overdrive",
      description: "Overdrive suave com diodos",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 8,
        title: "Teoria da Distorção",
        description: "Como criar e controlar distorção harmônica",
        duration: "40 min",
        difficulty: "intermediate",
        prerequisites: [7],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Clipping",
            content: "Existem dois tipos principais de clipping: hard clipping (corte abrupto) e soft clipping (corte suave). Soft clipping usa diodos no feedback do op-amp, criando distorção mais musical. Hard clipping usa diodos direto no sinal, criando distorção mais agressiva."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Tube Screamer Clone",
            circuitData: {
              components: ["TL072", "Diodos 1N4148", "Resistores", "Capacitores", "Potenciômetros Drive/Tone/Level"],
              schematic: "tubescreamer.svg",
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
    totalXP: 850,
    pedalProject: {
      name: "Booster a Transistor",
      description: "Amplificador simples com transistor",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 9,
        title: "Transistores BJT",
        description: "Transistores bipolares em circuitos de áudio",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [8],
        xpReward: 65,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Como Funcionam os Transistores",
            content: "Transistores são componentes de três terminais: base, coletor e emissor. Podem amplificar corrente e tensão. O transistor funciona como uma 'torneira controlada' - a corrente na base controla a corrente entre coletor e emissor."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Booster Rangemaster",
            circuitData: {
              components: ["Transistor AC128", "Resistores", "Capacitores", "Potenciômetro"],
              schematic: "rangemaster.svg",
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
    totalXP: 1000,
    pedalProject: {
      name: "Fuzz Face",
      description: "O clássico fuzz de dois transistores",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 10,
        title: "Circuito Fuzz Face",
        description: "Análise do fuzz mais famoso da história",
        duration: "45 min",
        difficulty: "intermediate",
        prerequisites: [9],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "A Magia do Fuzz Face",
            content: "O Fuzz Face usa apenas dois transistores em uma configuração simples mas genial. O primeiro transistor amplifica o sinal, o segundo adiciona mais ganho e distorção. O segredo está no bias correto e na interação entre os transistores."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Fuzz Face Clone",
            circuitData: {
              components: ["2x Transistores AC128", "Resistores", "Capacitores", "Potenciômetros Volume/Fuzz"],
              schematic: "fuzzface.svg",
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
    totalXP: 1200,
    pedalProject: {
      name: "Analog Delay",
      description: "Delay analógico com bucket brigade",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 11,
        title: "Princípios do Delay",
        description: "Como funcionam os delays analógicos",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [10],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Bucket Brigade Devices",
            content: "BBDs são chips especiais que criam delay analógico transferindo o sinal através de uma cadeia de capacitores. O tempo de delay depende da frequência de clock. Quanto menor a frequência, maior o delay, mas menor a qualidade."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: DM-2 Clone",
            circuitData: {
              components: ["MN3005", "MN3101", "TL072", "Resistores", "Capacitores", "Potenciômetros"],
              schematic: "dm2_delay.svg",
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
    totalXP: 1100,
    pedalProject: {
      name: "Analog Chorus",
      description: "Chorus analógico clássico",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 12,
        title: "LFO e Modulação",
        description: "Osciladores de baixa frequência em efeitos",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [11],
        xpReward: 85,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Como Funciona o Chorus",
            content: "Chorus mistura o sinal original com uma versão atrasada e modulada. Um LFO (Low Frequency Oscillator) varia o tempo de delay continuamente, criando o efeito de múltiplas vozes."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: CE-2 Chorus",
            circuitData: {
              components: ["MN3007", "TL022", "LFO Circuit", "Resistores", "Capacitores"],
              schematic: "ce2_chorus.svg",
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
    totalXP: 1000,
    pedalProject: {
      name: "Cry Baby Wah",
      description: "O wah mais famoso do mundo",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 13,
        title: "Circuito Wah-Wah",
        description: "Filtros variáveis com indutor",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [12],
        xpReward: 75,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filtro com Indutor",
            content: "O wah usa um indutor e um potenciômetro para criar um filtro passa-banda variável. Quando o pedal se move, muda a frequência de ressonância do filtro, criando o som característico 'wah'."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Cry Baby Clone",
            circuitData: {
              components: ["Indutor", "Transistor 2N5089", "Potenciômetro", "Resistores", "Capacitores"],
              schematic: "crybaby_wah.svg",
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
    totalXP: 1150,
    pedalProject: {
      name: "Orange Squeezer",
      description: "Compressor ótico clássico",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 14,
        title: "Teoria da Compressão",
        description: "Como funcionam os compressores",
        duration: "50 min",
        difficulty: "advanced",
        prerequisites: [13],
        xpReward: 95,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "VCA e Compressão",
            content: "Compressores usam VCAs (Voltage Controlled Amplifiers) para reduzir automaticamente o ganho quando o sinal está alto. Isso nivela a dinâmica, tornando sons baixos mais audíveis e altos mais controlados."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Dyna Comp Clone",
            circuitData: {
              components: ["CA3080", "Resistores", "Capacitores", "LED", "LDR"],
              schematic: "dynacomp.svg",
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
    totalXP: 1200,
    pedalProject: {
      name: "Phase 90",
      description: "Phaser de 4 estágios clássico",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 15,
        title: "All-Pass Filters",
        description: "Filtros que alteram fase sem afetar amplitude",
        duration: "55 min",
        difficulty: "advanced",
        prerequisites: [14],
        xpReward: 100,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Cancelamento de Fase",
            content: "Phasers usam filtros all-pass que mudam a fase do sinal sem alterar a amplitude. Quando misturados com o sinal original, certas frequências se cancelam, criando o efeito 'swoosh' característico."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Phase 90 Clone",
            circuitData: {
              components: ["4x JFETs", "TL022", "LFO", "Resistores", "Capacitores"],
              schematic: "phase90.svg",
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
    totalXP: 1300,
    pedalProject: {
      name: "Green Ringer",
      description: "Octaver analógico com diodos",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 16,
        title: "Multiplicação de Frequência",
        description: "Criando oitavas com circuitos analógicos",
        duration: "45 min",
        difficulty: "advanced",
        prerequisites: [15],
        xpReward: 90,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Ring Modulators",
            content: "Ring modulators usam diodos para multiplicar frequências. Quando você toca uma nota, o circuito gera harmonics que incluem a oitava. É um efeito wild e não perfeitamente tracking."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Green Ringer Clone",
            circuitData: {
              components: ["4x Diodos 1N914", "Transformador", "Resistores", "Capacitores"],
              schematic: "green_ringer.svg",
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
    totalXP: 950,
    pedalProject: {
      name: "Optical Tremolo",
      description: "Tremolo ótico suave",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 17,
        title: "LDR e Modulação Ótica",
        description: "Usando fotoresistores para modulação",
        duration: "35 min",
        difficulty: "intermediate",
        prerequisites: [16],
        xpReward: 70,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tremolo vs Vibrato",
            content: "Tremolo modula a amplitude (volume), vibrato modula a frequência (pitch). Muitos pedais chamados 'vibrato' são na verdade tremolo. O tremolo ótico usa LED+LDR para modulação suave e musical."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Tremolo Ótico",
            circuitData: {
              components: ["TL072", "LED", "LDR", "LFO Circuit", "Resistores", "Capacitores"],
              schematic: "optical_tremolo.svg",
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
    totalXP: 1100,
    pedalProject: {
      name: "Frequency Analyzer",
      description: "Ring modulator com oscilador interno",
      difficulty: "Difícil"
    },
    lessons: [
      {
        id: 18,
        title: "Ring Modulation Theory",
        description: "Modulação em anel para efeitos robóticos",
        duration: "40 min",
        difficulty: "advanced",
        prerequisites: [17],
        xpReward: 80,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Soma e Diferença de Frequências",
            content: "Ring modulators multiplicam duas frequências, criando a soma e diferença delas. Isso gera sons harmônicos complexos, metálicos e robóticos. É usado em sons de sci-fi e efeitos experimentais."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Frequency Analyzer",
            circuitData: {
              components: ["4066 CMOS", "Oscilador", "Resistores", "Capacitores", "Potenciômetros"],
              schematic: "ring_modulator.svg",
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
    totalXP: 800,
    pedalProject: {
      name: "Noise Gate",
      description: "Gate para eliminar ruído",
      difficulty: "Médio"
    },
    lessons: [
      {
        id: 19,
        title: "Threshold e Gating",
        description: "Eliminando ruído automaticamente",
        duration: "30 min",
        difficulty: "intermediate",
        prerequisites: [18],
        xpReward: 60,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Como Funciona um Gate",
            content: "Um noise gate monitora o nível do sinal. Quando está abaixo do threshold, corta o som. Quando está acima, deixa passar. É essencial para eliminar ruído entre notas, especialmente com alta distorção."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Simple Gate",
            circuitData: {
              components: ["TL072", "4066", "Comparadores", "Resistores", "Capacitores"],
              schematic: "noise_gate.svg",
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
    totalXP: 1250,
    pedalProject: {
      name: "Moog Filter",
      description: "Filtro passa-baixa clássico",
      difficulty: "Muito Difícil"
    },
    lessons: [
      {
        id: 20,
        title: "Ladder Filters",
        description: "O filtro Moog e suas variações",
        duration: "60 min",
        difficulty: "advanced",
        prerequisites: [19],
        xpReward: 110,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Transistor Ladder",
            content: "O filtro Moog usa uma 'escada' de transistores para criar um filtro passa-baixa com resposta muito musical. Cada estágio adiciona -6dB/oitava, totalizando -24dB/oitava. O feedback controla a ressonância."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Moog Filter Clone",
            circuitData: {
              components: ["4x Transistores", "Op-amps", "Resistores", "Capacitores", "Potenciômetros Cutoff/Resonance"],
              schematic: "moog_filter.svg",
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
    totalXP: 1400,
    pedalProject: {
      name: "Step Sequencer",
      description: "Sequenciador de 8 passos",
      difficulty: "Muito Difícil"
    },
    lessons: [
      {
        id: 21,
        title: "Digital Logic em Áudio",
        description: "Contadores e multiplexers para sequências",
        duration: "55 min",
        difficulty: "advanced",
        prerequisites: [20],
        xpReward: 105,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Contadores e Clock",
            content: "Sequencers usam contadores digitais que avançam com um clock. Cada passo pode ter uma tensão diferente, criando melodias automáticas. Multiplexers selecionam qual passo está ativo."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: 8-Step Sequencer",
            circuitData: {
              components: ["4017 Counter", "4051 Multiplexer", "Clock Circuit", "Potenciômetros", "LEDs"],
              schematic: "step_sequencer.svg",
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
    totalXP: 1500,
    pedalProject: {
      name: "Simple Vocoder",
      description: "Vocoder básico com filtros",
      difficulty: "Muito Difícil"
    },
    lessons: [
      {
        id: 22,
        title: "Análise e Síntese de Voz",
        description: "Como funcionam os vocoders",
        duration: "65 min",
        difficulty: "advanced",
        prerequisites: [21],
        xpReward: 120,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Envelope Following",
            content: "Vocoders analisam o envelope de um sinal de voz através de múltiplos filtros passa-banda. Cada banda controla a amplitude de uma banda correspondente em um sinal de síntese, criando voz robótica."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: 4-Band Vocoder",
            circuitData: {
              components: ["Múltiplos Op-amps", "Filtros passa-banda", "Envelope Followers", "VCAs"],
              schematic: "vocoder.svg",
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
    totalXP: 2000,
    pedalProject: {
      name: "Multi-Effects Processor",
      description: "Processador com 8 efeitos diferentes",
      difficulty: "Mestre"
    },
    lessons: [
      {
        id: 23,
        title: "System Design",
        description: "Integrando múltiplos efeitos",
        duration: "90 min",
        difficulty: "advanced",
        prerequisites: [22],
        xpReward: 150,
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Signal Routing e Switching",
            content: "Multi-efeitos precisam de sistema de roteamento complexo. Switches analógicos controlam o caminho do sinal. Buffers isolam cada efeito. Microcontroladores podem automatizar o switching."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: 8-FX Processor",
            circuitData: {
              components: ["Múltiplos CIs", "Switches analógicos", "Microcontrolador", "LCD", "Footswitches"],
              schematic: "multi_fx.svg",
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
