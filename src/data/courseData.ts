import { UserProgress } from '../utils/storage';

export const courseData = [
  {
    id: 1,
    title: "Fundamentos da Eletrônica para Guitarra",
    description: "Aprenda os conceitos básicos de eletrônica aplicados a instrumentos musicais",
    difficulty: "beginner",
    totalXP: 1200,
    pedalProject: {
      name: "Buffer Básico",
      description: "Construa seu primeiro buffer para guitarra usando um amplificador operacional",
      difficulty: "Iniciante"
    },
    lessons: [
      {
        id: 101,
        title: "Introdução à Eletrônica Musical",
        description: "Conceitos fundamentais de eletrônica aplicados a instrumentos",
        difficulty: "beginner",
        duration: "15 min",
        xpReward: 50,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que é eletrônica musical?",
            content: "A eletrônica musical é a aplicação de circuitos eletrônicos para processar, amplificar e modificar sinais de instrumentos musicais. Na guitarra, isso inclui captadores, amplificadores, pedais de efeito e sistemas de gravação."
          },
          {
            id: 2,
            type: "exercise",
            title: "Teste seus conhecimentos",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "beginner",
                question: "Qual é a função principal de um captador de guitarra?",
                options: [
                  "Amplificar o som",
                  "Converter vibração em sinal elétrico",
                  "Adicionar distorção",
                  "Filtrar frequências"
                ],
                correctAnswer: 1,
                explanation: "O captador converte as vibrações das cordas em sinais elétricos que podem ser processados."
              },
              {
                id: 2,
                type: "true-false",
                difficulty: "beginner",
                question: "Um sinal de guitarra é naturalmente digital.",
                correctAnswer: "false",
                explanation: "O sinal de guitarra é analógico, representando as vibrações contínuas das cordas."
              }
            ]
          }
        ]
      },
      {
        id: 102,
        title: "Tipos de Sinais: Analógico vs Digital",
        description: "Entenda a diferença entre sinais analógicos e digitais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [101],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Sinais Analógicos",
            content: "Sinais analógicos são contínuos no tempo e amplitude. Na guitarra, o sinal produzido pelos captadores é analógico, variando continuamente conforme as cordas vibram."
          },
          {
            id: 2,
            type: "theory",
            title: "Sinais Digitais",
            content: "Sinais digitais são discretos, representados por valores numéricos. Para processar digitalmente o som da guitarra, precisamos converter o sinal analógico em digital usando conversores A/D."
          },
          {
            id: 3,
            type: "exercise",
            title: "Pratique o conceito",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "beginner",
                question: "Qual dispositivo converte sinal analógico em digital?",
                options: ["DAC", "ADC", "Amplificador", "Buffer"],
                correctAnswer: 1,
                explanation: "ADC (Analog-to-Digital Converter) converte sinais analógicos em digitais."
              },
              {
                id: 2,
                type: "fill-blank",
                difficulty: "beginner",
                question: "Um sinal de guitarra é naturalmente _______.",
                correctAnswer: "analógico",
                explanation: "O sinal produzido pelos captadores é analógico por natureza."
              }
            ]
          }
        ]
      },
      {
        id: 103,
        title: "Tensão, Corrente e Resistência",
        description: "Lei de Ohm aplicada a circuitos de guitarra",
        difficulty: "beginner",
        duration: "25 min",
        xpReward: 70,
        prerequisites: [102],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Lei de Ohm",
            content: "A Lei de Ohm (V = I × R) é fundamental na eletrônica. Em pedais de guitarra, controlamos a tensão e corrente para criar diferentes efeitos sonoros."
          },
          {
            id: 2,
            type: "exercise",
            title: "Cálculos básicos",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "beginner",
                question: "Se uma resistência de 1kΩ tem 5V aplicados, qual a corrente?",
                options: ["5mA", "1mA", "10mA", "0.5mA"],
                correctAnswer: 0,
                explanation: "I = V/R = 5V/1000Ω = 5mA"
              },
              {
                id: 2,
                type: "fill-blank",
                difficulty: "beginner",
                question: "A fórmula da Lei de Ohm é V = I × ___",
                correctAnswer: "R",
                explanation: "V = I × R, onde V é tensão, I é corrente e R é resistência."
              }
            ]
          }
        ]
      },
      {
        id: 104,
        title: "Componentes Básicos: Resistores",
        description: "Entenda resistores e sua aplicação em pedais",
        difficulty: "beginner",
        duration: "20 min",
        xpReward: 60,
        prerequisites: [103],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Resistores",
            content: "Resistores limitam corrente e dividem tensão. Em pedais, usamos resistores de carbono, filme metálico e wirewound para diferentes aplicações."
          },
          {
            id: 2,
            type: "exercise",
            title: "Identificação de resistores",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "beginner",
                question: "Qual resistor é mais preciso?",
                options: ["Carbono", "Filme metálico", "Wirewound", "Todos iguais"],
                correctAnswer: 1,
                explanation: "Resistores de filme metálico têm maior precisão e menor ruído."
              }
            ]
          }
        ]
      },
      {
        id: 105,
        title: "Capacitores em Áudio",
        description: "Como capacitores afetam o som da guitarra",
        difficulty: "beginner",
        duration: "25 min",
        xpReward: 70,
        prerequisites: [104],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Função dos Capacitores",
            content: "Capacitores armazenam energia elétrica e filtram frequências. Em guitarras, controlam tons agudos e criam filtros passa-alta e passa-baixa."
          },
          {
            id: 2,
            type: "exercise",
            title: "Aplicações práticas",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "beginner",
                question: "O que acontece quando aumentamos o capacitor do controle de tom?",
                options: ["Mais agudos", "Menos agudos", "Mais graves", "Sem mudança"],
                correctAnswer: 1,
                explanation: "Capacitores maiores filtram mais frequências agudas."
              }
            ]
          }
        ]
      },
      {
        id: 106,
        title: "Indutores e Transformadores",
        description: "Componentes magnéticos em áudio",
        difficulty: "intermediate",
        duration: "30 min",
        xpReward: 80,
        prerequisites: [105],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Princípios de Indução",
            content: "Indutores usam campos magnéticos para armazenar energia. Em amplificadores valvulados, transformadores são essenciais para conversão de tensão."
          },
          {
            id: 2,
            type: "exercise",
            title: "Transformadores em amplificadores",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Por que amplificadores valvulados usam transformadores de saída?",
                options: ["Isolar o chassis", "Casar impedâncias", "Filtrar ruído", "Amplificar sinal"],
                correctAnswer: 1,
                explanation: "Transformadores casam a alta impedância das válvulas com a baixa impedância dos alto-falantes."
              }
            ]
          }
        ]
      },
      {
        id: 107,
        title: "Semicondutores: Diodos",
        description: "Introdução aos componentes ativos",
        difficulty: "intermediate",
        duration: "25 min",
        xpReward: 75,
        prerequisites: [106],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Como funcionam os diodos",
            content: "Diodos permitem corrente em apenas uma direção. Em pedais, criam distorção por clipping e proteção contra polaridade reversa."
          },
          {
            id: 2,
            type: "exercise",
            title: "Tipos de diodos",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Qual diodo produz distorção mais suave?",
                options: ["Silício", "Germânio", "LED", "Schottky"],
                correctAnswer: 1,
                explanation: "Diodos de germânio têm menor tensão de condução, criando clipping mais suave."
              }
            ]
          }
        ]
      },
      {
        id: 108,
        title: "Transistores Básicos",
        description: "Amplificação com transistores",
        difficulty: "intermediate",
        duration: "35 min",
        xpReward: 90,
        prerequisites: [107],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Transistores BJT",
            content: "Transistores bipolares amplificam corrente. São usados em muitos pedais clássicos como Fuzz Face e Big Muff para criar distorção característica."
          },
          {
            id: 2,
            type: "exercise",
            title: "Configurações básicas",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Qual configuração tem maior ganho de corrente?",
                options: ["Base comum", "Emissor comum", "Coletor comum", "Todas iguais"],
                correctAnswer: 1,
                explanation: "Emissor comum oferece maior ganho de corrente e tensão."
              }
            ]
          }
        ]
      },
      {
        id: 109,
        title: "Amplificadores Operacionais",
        description: "Op-amps em pedais modernos",
        difficulty: "intermediate",
        duration: "40 min",
        xpReward: 100,
        prerequisites: [108],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Funcionamento dos Op-amps",
            content: "Amplificadores operacionais são circuitos integrados versáteis. Usados em buffers, filtros ativos, e pedais modernos como Tube Screamer."
          },
          {
            id: 2,
            type: "circuit",
            title: "Projeto: Buffer com Op-amp",
            circuitData: {
              pedalName: "Buffer TL071",
              description: "Buffer básico usando TL071 para alta impedância de entrada",
              components: [
                "TL071 Op-amp",
                "Resistor 1MΩ",
                "Resistor 10kΩ",
                "Capacitor 100nF",
                "Capacitor 47µF",
                "Fonte 9V"
              ],
              schematic: "Referência: https://www.electrosmash.com/images/tech/guitar-circuits/guitar-buffer-schematic.png"
            }
          },
          {
            id: 3,
            type: "exercise",
            title: "Aplicações práticas",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Por que usar buffer após captadores passivos?",
                options: ["Amplificar sinal", "Baixar impedância", "Adicionar distorção", "Filtrar ruído"],
                correctAnswer: 1,
                explanation: "Buffers convertem alta impedância em baixa, preservando o sinal em cabos longos."
              }
            ]
          }
        ]
      },
      {
        id: 110,
        title: "Projeto Final: Buffer Completo",
        description: "Construa um buffer profissional para guitarra",
        difficulty: "intermediate",
        duration: "60 min",
        xpReward: 150,
        prerequisites: [109],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Especificações do projeto",
            content: "Vamos construir um buffer com impedância de entrada >1MΩ, impedância de saída <100Ω, resposta plana de 20Hz-20kHz e alimentação 9V."
          },
          {
            id: 2,
            type: "circuit",
            title: "Esquemático completo",
            circuitData: {
              pedalName: "Professional Buffer",
              description: "Buffer profissional com bypass true e LED indicador",
              components: [
                "TL071 ou TL081",
                "Resistor 1MΩ (entrada)",
                "Resistor 10kΩ (saída)",
                "Resistor 1kΩ (LED)",
                "Capacitor 100nF (desacoplamento)",
                "Capacitor 47µF (fonte)",
                "LED 5mm",
                "Switch 3PDT",
                "Jacks P10 entrada/saída",
                "Conector 2.1mm (fonte)"
              ],
              schematic: "Referência completa: https://tagboardeffects.blogspot.com/2012/02/simple-buffer.html"
            }
          },
          {
            id: 3,
            type: "exercise",
            title: "Teste final",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Qual é a vantagem do true bypass?",
                options: ["Menor ruído", "Sinal direto quando desligado", "Menor consumo", "Maior ganho"],
                correctAnswer: 1,
                explanation: "True bypass conecta entrada diretamente à saída quando o pedal está desligado."
              },
              {
                id: 2,
                type: "fill-blank",
                difficulty: "intermediate",
                question: "A impedância de entrada ideal para um buffer de guitarra é maior que ___Ω.",
                correctAnswer: "1M",
                explanation: "Alta impedância de entrada (>1MΩ) não carrega os captadores da guitarra."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Distorção e Overdrive",
    description: "Aprenda como criar e controlar distorção analógica",
    difficulty: "intermediate",
    totalXP: 1500,
    pedalProject: {
      name: "Tube Screamer Clone",
      description: "Construa o famoso overdrive Ibanez Tube Screamer",
      difficulty: "Intermediário"
    },
    lessons: [
      {
        id: 201,
        title: "Teoria da Distorção",
        description: "Como a distorção é criada eletronicamente",
        difficulty: "intermediate",
        duration: "20 min",
        xpReward: 80,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "O que é distorção?",
            content: "Distorção ocorre quando um sinal excede os limites do circuito, causando clipping. Isso adiciona harmônicos que criam o som característico da guitarra distorcida."
          },
          {
            id: 2,
            type: "exercise",
            title: "Tipos de distorção",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Qual tipo de clipping é mais musical?",
                options: ["Hard clipping", "Soft clipping", "Digital clipping", "Sem diferença"],
                correctAnswer: 1,
                explanation: "Soft clipping produz transição gradual, mais musical que hard clipping."
              },
              {
                id: 2,
                type: "true-false",
                difficulty: "intermediate",
                question: "Overdrive e distorção são exatamente a mesma coisa.",
                correctAnswer: "false",
                explanation: "Overdrive é distorção suave, enquanto distorção é mais agressiva e saturada."
              }
            ]
          }
        ]
      },
      {
        id: 202,
        title: "Clipping com Diodos",
        description: "Como diodos criam diferentes tipos de distorção",
        difficulty: "intermediate",
        duration: "25 min",
        xpReward: 90,
        prerequisites: [201],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Clipping simétrico vs assimétrico",
            content: "Diodos em configuração simétrica produzem harmônicos pares, enquanto assimétrica produz ímpares, criando diferentes características tonais."
          },
          {
            id: 2,
            type: "exercise",
            title: "Configurações de diodos",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Quantos diodos usa o Tube Screamer?",
                options: ["1", "2", "3", "4"],
                correctAnswer: 1,
                explanation: "O Tube Screamer usa 2 diodos 1N4148 em configuração anti-paralela no feedback do op-amp."
              }
            ]
          }
        ]
      },
      {
        id: 203,
        title: "Amplificação e Ganho",
        description: "Controlando o nível de distorção",
        difficulty: "intermediate",
        duration: "30 min",
        xpReward: 100,
        prerequisites: [202],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Controle de ganho",
            content: "O ganho determina quanta amplificação ocorre antes do clipping. Mais ganho = mais distorção. Usamos potenciômetros para controle variável."
          },
          {
            id: 2,
            type: "exercise",
            title: "Cálculo de ganho",
            questions: [
              {
                id: 1,
                type: "fill-blank",
                difficulty: "intermediate",
                question: "O ganho de um amplificador não-inversor é 1 + (Rf/___).",
                correctAnswer: "Rin",
                explanation: "Ganho = 1 + (Rf/Rin) onde Rf é resistor de feedback e Rin é resistor de entrada."
              }
            ]
          }
        ]
      },
      {
        id: 204,
        title: "Filtros de Tom",
        description: "EQ ativo e passivo em pedais",
        difficulty: "intermediate",
        duration: "35 min",
        xpReward: 110,
        prerequisites: [203],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filtros passa-baixa",
            content: "Filtros removem frequências indesejadas. Passa-baixa corta agudos, passa-alta corta graves. Em overdrive, geralmente cortamos agudos para suavizar."
          },
          {
            id: 2,
            type: "circuit",
            title: "Filtro RC simples",
            circuitData: {
              pedalName: "Filtro Tone",
              description: "Filtro passa-baixa variável para controle de tom",
              components: [
                "Resistor 1kΩ",
                "Potenciômetro 10kΩ (linear)",
                "Capacitor 47nF",
                "Capacitor 22nF"
              ],
              schematic: "Referência: https://www.electrosmash.com/images/tech/tube-screamer/tube-screamer-tone-control-analysis.png"
            }
          }
        ]
      },
      {
        id: 205,
        title: "Análise do Tube Screamer",
        description: "Estudo detalhado do circuito clássico",
        difficulty: "intermediate",
        duration: "40 min",
        xpReward: 120,
        prerequisites: [204],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Topologia do TS",
            content: "O Tube Screamer usa um buffer de entrada, estágio de overdrive com clipping no feedback, filtro de tom ativo e buffer de saída. Isso cria o som mid-forward característico."
          },
          {
            id: 2,
            type: "exercise",
            title: "Componentes chave",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Qual op-amp era usado no TS-808 original?",
                options: ["TL071", "JRC4558", "LM358", "OPA2134"],
                correctAnswer: 1,
                explanation: "O JRC4558 é o op-amp clássico do TS-808, contribuindo para o som único."
              }
            ]
          }
        ]
      },
      {
        id: 206,
        title: "Modificações Clássicas",
        description: "Como modificar o Tube Screamer",
        difficulty: "advanced",
        duration: "30 min",
        xpReward: 100,
        prerequisites: [205],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Mods famosos",
            content: "Modificações incluem: troca de diodos (LED, germânio), bypass do buffer, bass mod (resistor de 220Ω para 1kΩ), e diferentes op-amps para variar o som."
          },
          {
            id: 2,
            type: "exercise",
            title: "Efeito das modificações",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "advanced",
                question: "O que faz o 'Bass Mod'?",
                options: ["Remove graves", "Adiciona graves", "Remove agudos", "Adiciona ganho"],
                correctAnswer: 1,
                explanation: "Bass mod aumenta o resistor de 220Ω para 1kΩ, permitindo mais graves passarem."
              }
            ]
          }
        ]
      },
      {
        id: 207,
        title: "Big Muff vs Tube Screamer",
        description: "Comparação entre topologias diferentes",
        difficulty: "advanced",
        duration: "35 min",
        xpReward: 110,
        prerequisites: [206],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Diferenças fundamentais",
            content: "Big Muff usa múltiplos estágios de ganho com clipping de diodo, enquanto TS usa clipping no feedback. Isso resulta em mais compressão no Big Muff."
          },
          {
            id: 2,
            type: "exercise",
            title: "Características sonoras",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "advanced",
                question: "Qual tem mais sustain?",
                options: ["Tube Screamer", "Big Muff", "Iguais", "Depende do amplificador"],
                correctAnswer: 1,
                explanation: "Big Muff tem mais compressão e sustain devido aos múltiplos estágios de clipping."
              }
            ]
          }
        ]
      },
      {
        id: 208,
        title: "RAT: Distorção com Op-amp",
        description: "Análise do ProCo RAT",
        difficulty: "advanced",
        duration: "30 min",
        xpReward: 100,
        prerequisites: [207],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Topologia única",
            content: "O RAT usa LM308 em configuração única, com feedback através de diodo e filtro variável pós-clipping, criando som agressivo e versátil."
          },
          {
            id: 2,
            type: "circuit",
            title: "Esquemático do RAT",
            circuitData: {
              pedalName: "RAT Distortion",
              description: "Distorção versátil com filtro variável",
              components: [
                "LM308 Op-amp",
                "Diodo 1N914",
                "Potenciômetro 100kΩ (Distortion)",
                "Potenciômetro 100kΩ (Filter)",
                "Potenciômetro 100kΩ (Volume)",
                "Capacitor 47µF",
                "Capacitor 560pF"
              ],
              schematic: "Referência: https://www.electrosmash.com/images/tech/proco-rat/proco-rat-schematic-analysis.png"
            }
          }
        ]
      },
      {
        id: 209,
        title: "Boss DS-1: Distorção Digital",
        description: "Análise da distorção Boss",
        difficulty: "advanced",
        duration: "25 min",
        xpReward: 90,
        prerequisites: [208],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Características do DS-1",
            content: "O DS-1 usa clipping hard com diodos 1N4148, filtro de tom ativo e compressão moderada. É conhecido pelo som cortante e presença nos médios."
          },
          {
            id: 2,
            type: "exercise",
            title: "Modificações populares",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "advanced",
                question: "Qual modificação suaviza o DS-1?",
                options: ["Trocar diodos por LED", "Remover C8", "Adicionar resistor", "Trocar op-amp"],
                correctAnswer: 0,
                explanation: "LEDs têm maior tensão de condução, criando clipping mais suave."
              }
            ]
          }
        ]
      },
      {
        id: 210,
        title: "Projeto: Tube Screamer Clone",
        description: "Construa sua versão do TS-808",
        difficulty: "advanced",
        duration: "90 min",
        xpReward: 200,
        prerequisites: [209],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Especificações do projeto",
            content: "Vamos construir um clone fiel do TS-808 com componentes modernos, incluindo true bypass, LED indicador e fonte externa 9V."
          },
          {
            id: 2,
            type: "circuit",
            title: "Esquemático completo TS Clone",
            circuitData: {
              pedalName: "TS-808 Clone",
              description: "Clone completo do Ibanez Tube Screamer TS-808",
              components: [
                "JRC4558D ou TL072",
                "Diodos 1N4148 (2x)",
                "Potenciômetro 500kΩ (Drive)",
                "Potenciômetro 20kΩ (Tone)",
                "Potenciômetro 100kΩ (Level)",
                "Resistores: 4.7kΩ, 51kΩ, 500kΩ, 10kΩ, 220Ω, 1kΩ",
                "Capacitores: 47nF, 51pF, 220nF, 47µF",
                "Switch 3PDT",
                "LED 5mm",
                "Jacks P10"
              ],
              schematic: "Esquemático completo: https://www.electrosmash.com/images/tech/tube-screamer/tube-screamer-schematic-analysis.png"
            }
          },
          {
            id: 3,
            type: "exercise",
            title: "Teste final - conhecimento completo",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "advanced",
                question: "Por que o TS tem som 'mid-forward'?",
                options: ["Boost nos médios", "Corte nos graves e agudos", "Op-amp usado", "Todas as anteriores"],
                correctAnswer: 3,
                explanation: "O TS corta graves (220Ω) e agudos (tone stack), realçando médios naturalmente."
              },
              {
                id: 2,
                type: "fill-blank",
                difficulty: "advanced",
                question: "O capacitor de ___nF é responsável pelo corte de graves no TS.",
                correctAnswer: "47",
                explanation: "O capacitor de 47nF no estágio de overdrive corta frequências baixas."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Filtros e Equalizadores",
    description: "Domine filtros passivos e ativos para moldagem de som",
    difficulty: "intermediate",
    totalXP: 1400,
    pedalProject: {
      name: "EQ Gráfico 5 Bandas",
      description: "Construa um equalizador gráfico profissional",
      difficulty: "Intermediário"
    },
    lessons: [
      {
        id: 301,
        title: "Teoria de Filtros",
        description: "Fundamentos matemáticos dos filtros eletrônicos",
        difficulty: "intermediate",
        duration: "25 min",
        xpReward: 80,
        prerequisites: [],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Tipos de Filtros",
            content: "Filtros são circuitos que permitem certas frequências passarem enquanto atenuam outras. Os tipos principais são: passa-baixa (corta agudos), passa-alta (corta graves), passa-faixa (permite uma faixa) e rejeita-faixa (bloqueia uma faixa)."
          },
          {
            id: 2,
            type: "exercise",
            title: "Identificação de Filtros",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Qual filtro é usado no controle de tom da guitarra?",
                options: ["Passa-alta", "Passa-baixa", "Passa-faixa", "Rejeita-faixa"],
                correctAnswer: 1,
                explanation: "O controle de tom usa filtro passa-baixa para cortar frequências agudas."
              },
              {
                id: 2,
                type: "fill-blank",
                difficulty: "intermediate",
                question: "A frequência de corte é onde a amplitude cai ___dB.",
                correctAnswer: "3",
                explanation: "Por definição, frequência de corte é onde a amplitude cai 3dB (-3dB)."
              }
            ]
          }
        ]
      },
      {
        id: 302,
        title: "Filtros RC Passivos",
        description: "Construção de filtros usando resistores e capacitores",
        difficulty: "intermediate",
        duration: "30 min",
        xpReward: 90,
        prerequisites: [301],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Filtro RC Passa-Baixa",
            content: "O filtro RC passa-baixa mais simples usa um resistor em série seguido de um capacitor para o terra. A frequência de corte é fc = 1/(2πRC). Referência: https://www.electronics-tutorials.ws/filter/filter_2.html"
          },
          {
            id: 2,
            type: "circuit",
            title: "Calculadora de Frequência de Corte",
            circuitData: {
              pedalName: "Filtro RC Básico",
              description: "Filtro passa-baixa simples para controle de tom",
              components: [
                "Resistor variável 1kΩ-100kΩ",
                "Capacitor 47nF",
                "Capacitor 22nF",
                "Capacitor 10nF"
              ],
              schematic: "https://www.electronics-tutorials.ws/wp-content/uploads/2018/05/filter-fil8.gif"
            }
          },
          {
            id: 3,
            type: "exercise",
            title: "Cálculos Práticos",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Com R=10kΩ e C=47nF, qual a frequência de corte?",
                options: ["159Hz", "338Hz", "1.59kHz", "3.38kHz"],
                correctAnswer: 1,
                explanation: "fc = 1/(2π × 10000 × 47×10⁻⁹) ≈ 338Hz"
              }
            ]
          }
        ]
      },
      {
        id: 303,
        title: "Filtros Ativos com Op-Amp",
        description: "Filtros que amplificam além de filtrar",
        difficulty: "intermediate",
        duration: "35 min",
        xpReward: 100,
        prerequisites: [302],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Topologia Sallen-Key",
            content: "Filtros ativos usando op-amps oferecem ganho e melhor isolamento. A topologia Sallen-Key é popular para filtros de 2ª ordem. Referência: https://www.ti.com/lit/an/sloa049b/sloa049b.pdf"
          },
          {
            id: 2,
            type: "exercise",
            title: "Vantagens dos Filtros Ativos",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Principal vantagem dos filtros ativos?",
                options: ["Menor custo", "Ganho de tensão", "Menor consumo", "Menor ruído"],
                correctAnswer: 1,
                explanation: "Filtros ativos podem amplificar o sinal além de filtrar."
              }
            ]
          }
        ]
      },
      {
        id: 304,
        title: "EQ Paramétrico",
        description: "Controle preciso de frequência, ganho e Q",
        difficulty: "advanced",
        duration: "40 min",
        xpReward: 120,
        prerequisites: [303],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Controles Paramétricos",
            content: "EQ paramétrico permite ajustar frequência central, ganho e largura de banda (Q). Muito usado em mesas de som profissionais. Referência: https://sound.org/articles/parametric-eq.htm"
          },
          {
            id: 2,
            type: "circuit",
            title: "Circuito EQ Paramétrico",
            circuitData: {
              pedalName: "EQ Paramétrico Simples",
              description: "EQ com controle de frequência, ganho e Q",
              components: [
                "TL072 Dual Op-amp",
                "Potenciômetro 10kΩ (Frequency)",
                "Potenciômetro 10kΩ (Gain)",
                "Potenciômetro 10kΩ (Q)",
                "Capacitor variável 470pF-4.7nF",
                "Resistores diversos"
              ],
              schematic: "https://www.sound.org/project56.htm"
            }
          }
        ]
      },
      {
        id: 305,
        title: "Wah-Wah: Filtro Variável",
        description: "Como funciona o pedal wah-wah",
        difficulty: "intermediate",
        duration: "30 min",
        xpReward: 95,
        prerequisites: [304],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Princípio do Wah",
            content: "O wah-wah é um filtro passa-faixa com frequência central controlada por pedal. Usa um indutor e capacitor variável para criar o efeito característico. Referência: https://www.electrosmash.com/cry-baby-gcb-95-analysis"
          },
          {
            id: 2,
            type: "exercise",
            title: "Componentes do Wah",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "intermediate",
                question: "Que componente varia no wah-wah clássico?",
                options: ["Resistor", "Capacitor", "Indutor", "Potenciômetro"],
                correctAnswer: 3,
                explanation: "O potenciômetro controlado pelo pedal varia a frequência central."
              }
            ]
          }
        ]
      },
      {
        id: 306,
        title: "Crossover de Frequências",
        description: "Divisão de sinais por faixas de frequência",
        difficulty: "advanced",
        duration: "35 min",
        xpReward: 110,
        prerequisites: [305],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Crossover Ativo vs Passivo",
            content: "Crossovers dividem o sinal em diferentes faixas de frequência. Usado em caixas de som para separar graves, médios e agudos. Ativos usam op-amps, passivos apenas LC."
          },
          {
            id: 2,
            type: "circuit",
            title: "Crossover 2 Vias",
            circuitData: {
              pedalName: "Crossover Ativo",
              description: "Divisor de frequências para bi-amplificação",
              components: [
                "TL074 Quad Op-amp",
                "Capacitores: 47nF, 22nF, 10nF",
                "Resistores: 10kΩ, 22kΩ, 47kΩ",
                "Potenciômetros de ajuste"
              ],
              schematic: "https://sound.org/project09.htm"
            }
          }
        ]
      },
      {
        id: 307,
        title: "Filtros Digitais vs Analógicos",
        description: "Comparação entre tecnologias",
        difficulty: "advanced",
        duration: "25 min",
        xpReward: 85,
        prerequisites: [306],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Vantagens e Desvantagens",
            content: "Filtros digitais oferecem precisão e flexibilidade, mas introduzem latência. Analógicos têm resposta instantânea mas são menos precisos. Ambos têm seu lugar na música."
          },
          {
            id: 2,
            type: "exercise",
            title: "Características dos Filtros",
            questions: [
              {
                id: 1,
                type: "true-false",
                difficulty: "advanced",
                question: "Filtros digitais sempre têm latência zero.",
                correctAnswer: "false",
                explanation: "Filtros digitais sempre têm alguma latência devido ao processamento."
              }
            ]
          }
        ]
      },
      {
        id: 308,
        title: "Simulação de Amplificadores",
        description: "Filtros que imitam resposta de amplificadores",
        difficulty: "advanced",
        duration: "40 min",
        xpReward: 125,
        prerequisites: [307],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Modelagem de Amplificadores",
            content: "Simuladores usam filtros complexos para imitar a resposta em frequência de amplificadores clássicos. Combinam EQ, compressão e distorção harmônica."
          },
          {
            id: 2,
            type: "circuit",
            title: "Simulador Marshall Stack",
            circuitData: {
              pedalName: "Marshall Sim",
              description: "Simulação da resposta de um Marshall Stack",
              components: [
                "TL072 Op-amp",
                "Filtros passa-alta 80Hz",
                "Filtro passa-baixa 5kHz",
                "Boost em 2.5kHz",
                "Capacitores e resistores diversos"
              ],
              schematic: "https://www.runoffgroove.com/tonemender.html"
            }
          }
        ]
      },
      {
        id: 309,
        title: "Auto-Wah e Envelope Follower",
        description: "Filtros controlados por dinâmica do sinal",
        difficulty: "advanced",
        duration: "35 min",
        xpReward: 115,
        prerequisites: [308],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Envelope Follower",
            content: "Auto-wah usa envelope follower para detectar amplitude do sinal e controlar filtro automaticamente. Mais forte você toca, mais agudo fica o filtro."
          },
          {
            id: 2,
            type: "exercise",
            title: "Funcionamento do Auto-Wah",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "advanced",
                question: "O que controla o filtro no auto-wah?",
                options: ["Frequency", "Amplitude", "Phase", "Harmônicos"],
                correctAnswer: 1,
                explanation: "A amplitude (envelope) do sinal controla a frequência do filtro."
              }
            ]
          }
        ]
      },
      {
        id: 310,
        title: "Projeto: EQ Gráfico 5 Bandas",
        description: "Construa um equalizador gráfico profissional",
        difficulty: "advanced",
        duration: "90 min",
        xpReward: 180,
        prerequisites: [309],
        steps: [
          {
            id: 1,
            type: "theory",
            title: "Especificações do EQ",
            content: "EQ gráfico com 5 bandas: 100Hz, 300Hz, 1kHz, 3kHz, 10kHz. Cada banda com ±15dB de ajuste. Buffer de entrada e saída para isolamento."
          },
          {
            id: 2,
            type: "circuit",
            title: "Esquemático Completo do EQ",
            circuitData: {
              pedalName: "EQ Gráfico 5 Bandas",
              description: "Equalizador gráfico profissional para guitarra",
              components: [
                "TL074 Quad Op-amp (2x)",
                "Potenciômetros deslizantes 10kΩ (5x)",
                "Capacitores: 1µF, 330nF, 100nF, 33nF, 10nF",
                "Resistores: 10kΩ, 22kΩ, 47kΩ, 100kΩ",
                "Chave bypass",
                "LED indicador"
              ],
              schematic: "https://sound.org/project28.htm"
            }
          },
          {
            id: 3,
            type: "exercise",
            title: "Teste Final - EQ Avançado",
            questions: [
              {
                id: 1,
                type: "multiple-choice",
                difficulty: "advanced",
                question: "Por que usar buffer de saída no EQ?",
                options: ["Amplificar sinal", "Isolar carga", "Reduzir ruído", "Economizar energia"],
                correctAnswer: 1,
                explanation: "Buffer de saída isola o EQ da impedância de entrada do próximo equipamento."
              },
              {
                id: 2,
                type: "fill-blank",
                difficulty: "advanced",
                question: "EQ gráfico de boa qualidade deve ter range dinâmico mínimo de ___dB.",
                correctAnswer: "100",
                explanation: "Range dinâmico mínimo de 100dB garante qualidade profissional."
              }
            ]
          }
        ]
      }
    ]
  }
];
