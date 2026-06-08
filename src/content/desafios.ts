/**
 * Conteúdo dos 4 desafios da HX. Fonte única e tipada (placeholder editorial —
 * vira CMS no Prompt 11). A home (Capabilities) e as rotas /desafios/[slug]
 * consomem daqui.
 */

export type DesafioAccent = 'lime' | 'cream' | 'ink' | 'paper-lite';

export interface NossoJeito {
  num: string;
  titulo: string;
  texto: string;
}

export interface CaseRelacionado {
  cliente: string;
  setor: string;
  ano: string;
  stat: string;
  statLabel: string;
  titulo: string;
  slug: string;
  cover: string;
}

export interface Desafio {
  slug: string;
  num: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  accent: DesafioAccent;
  narrativa: string;
  sintomas: string[];
  nossoJeito: NossoJeito[];
  entregas: string[];
  caseRelacionado: CaseRelacionado;
  ctaTexto: string;
}

export const DESAFIOS: Desafio[] = [
  {
    slug: 'lancar',
    num: '01',
    eyebrow: 'DESAFIO 01 / LANÇAR UMA MARCA OU PRODUTO',
    titulo: 'Lançar',
    subtitulo: 'Tirar uma marca do zero — e fazer o mundo notar na primeira vez.',
    accent: 'lime',
    narrativa:
      'Lançar é o momento de maior risco e maior liberdade. Não há legado para defender, mas também não há nada onde se apoiar. Cada decisão — nome, forma, primeira frase — define como a marca vai ser lembrada antes mesmo de ser conhecida. A gente trata o lançamento como uma tese: hipótese clara, forma que prova, e leitura do que o mercado devolve.',
    sintomas: [
      'Temos um produto pronto, mas nenhuma história que o sustente.',
      'Sabemos o que fazemos — não sabemos por que alguém deveria se importar.',
      'Cada material parece de uma empresa diferente.',
      'Vamos lançar mês que vem e ainda não temos cara.',
      'Investimos na ideia, não no jeito de apresentá-la.',
    ],
    nossoJeito: [
      { num: '01', titulo: 'Posicionar', texto: 'Antes da estética, a tese: o que essa marca defende e contra o quê.' },
      { num: '02', titulo: 'Dar forma', texto: 'Identidade, narrativa e os primeiros pontos de contato falando a mesma língua.' },
      { num: '03', titulo: 'Estrear', texto: 'Um lançamento desenhado para ser lembrado, com leitura de resposta desde o dia um.' },
    ],
    entregas: [
      'Naming e arquitetura de marca',
      'Posicionamento e território',
      'Identidade visual',
      'Sistema de design',
      'Narrativa e tom de voz',
      'Site ou landing de lançamento',
      'Kit de lançamento',
      'Plano de mídia inicial',
    ],
    caseRelacionado: {
      cliente: 'Clínica Vértix',
      setor: 'Saúde',
      ano: '2025',
      stat: '+2,4x',
      statLabel: 'procura qualificada no 1º trimestre',
      titulo: 'Uma marca de saúde que nasceu soando premium.',
      slug: 'clinica-vertix',
      cover: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    },
    ctaTexto: 'Precisa lançar uma marca? Vamos conversar.',
  },
  {
    slug: 'reposicionar',
    num: '02',
    eyebrow: 'DESAFIO 02 / REPOSICIONAR MARCA EXISTENTE',
    titulo: 'Reposicionar',
    subtitulo: 'Mudar o que a marca significa sem perder quem ela já é.',
    accent: 'cream',
    narrativa:
      'Reposicionar é cirurgia, não demolição. A marca já tem história, clientes e equity — e também amarras. O risco é jogar fora o que funciona junto com o que travou. A gente parte do que já existe: o que ainda significa, o que envelheceu, e o que precisa mudar para a marca voltar a dizer a verdade sobre si mesma.',
    sintomas: [
      'A marca que construímos não conta mais quem nós somos hoje.',
      'Crescemos, mas a percepção das pessoas ficou lá no começo.',
      'Competimos em outro nível — e ainda parecemos os mesmos de antes.',
      'Cada área da empresa enxerga a marca de um jeito.',
      'Temos receio de mudar e perder o que já conquistamos.',
    ],
    nossoJeito: [
      { num: '01', titulo: 'Diagnosticar', texto: 'O que da marca atual ainda trabalha a favor e o que pesa contra.' },
      { num: '02', titulo: 'Redefinir', texto: 'Um novo posicionamento que honra o legado e abre o próximo capítulo.' },
      { num: '03', titulo: 'Migrar', texto: 'Transição planejada, sem rasgar a relação com quem já é cliente.' },
    ],
    entregas: [
      'Auditoria de marca',
      'Novo posicionamento',
      'Evolução ou redesign de identidade',
      'Sistema de design atualizado',
      'Narrativa de transição',
      'Guia de migração',
      'Comunicação interna da mudança',
      'Rollout nos pontos de contato',
    ],
    caseRelacionado: {
      cliente: 'Atelier Norte',
      setor: 'Moda',
      ano: '2025',
      stat: '+38%',
      statLabel: 'recall de marca após o reposicionamento',
      titulo: 'O reposicionamento que devolveu desejo à marca.',
      slug: 'atelier-norte',
      cover: 'linear-gradient(135deg, #f8eadc 0%, #f1e3d2 100%)',
    },
    ctaTexto: 'Hora de reposicionar? Vamos conversar.',
  },
  {
    slug: 'crescer',
    num: '03',
    eyebrow: 'DESAFIO 03 / CRESCER COM MARCA E PERFORMANCE',
    titulo: 'Crescer',
    subtitulo: 'Performance que vende hoje sem queimar a marca amanhã.',
    accent: 'ink',
    narrativa:
      'Crescer costuma virar uma queda de braço: o time de performance quer converter agora, o de marca quer construir sempre. A gente recusa esse trade-off. Marca e mídia no mesmo plano — a forma que diferencia é também a que converte. Cresce de verdade quem mede as duas coisas juntas.',
    sintomas: [
      'Nossos anúncios convertem, mas todos parecem iguais aos do concorrente.',
      'Investimos em mídia e a marca não cresce junto.',
      'Cada campanha recomeça do zero, sem construir nada.',
      'Temos volume de leads e nenhuma preferência real.',
      'Marca e performance brigam pelo mesmo orçamento.',
    ],
    nossoJeito: [
      { num: '01', titulo: 'Alinhar', texto: 'Marca e performance sob a mesma estratégia e as mesmas metas.' },
      { num: '02', titulo: 'Produzir', texto: 'Criativos que diferenciam e convertem, em ritmo de teste.' },
      { num: '03', titulo: 'Otimizar', texto: 'Leitura contínua: o dado de hoje é o criativo de amanhã.' },
    ],
    entregas: [
      'Estratégia de crescimento',
      'Conceitos de campanha',
      'Criativos para mídia paga',
      'Gestão de mídia (Meta e Google)',
      'Landing pages e CRO',
      'Conteúdo orgânico de apoio',
      'Dashboards de performance',
      'Rotina de testes e otimização',
    ],
    caseRelacionado: {
      cliente: 'Setor Financeiro',
      setor: 'Financeiro',
      ano: '2024',
      stat: '−31%',
      statLabel: 'custo por aquisição em 6 meses',
      titulo: 'Marca e mídia puxando para o mesmo lado.',
      slug: 'case-financeiro',
      cover: 'linear-gradient(135deg, #272727 0%, #121212 100%)',
    },
    ctaTexto: 'Quer crescer com método? Vamos conversar.',
  },
  {
    slug: 'conteudo',
    num: '04',
    eyebrow: 'DESAFIO 04 / CONTEÚDO QUE SUSTENTA A MARCA',
    titulo: 'Conteúdo',
    subtitulo: 'Presença que constrói marca todo dia, não só na campanha.',
    accent: 'paper-lite',
    narrativa:
      'Conteúdo virou sinônimo de volume — postar muito, dizer pouco. A gente trata conteúdo como extensão da marca, não como esteira de feed. Menos peças, mais intenção: cada formato existe para sustentar a tese da marca no tempo, entre uma campanha e a próxima.',
    sintomas: [
      'Postamos todo dia e não construímos nada.',
      'Nosso conteúdo poderia ser de qualquer marca do setor.',
      'Corremos atrás de tendência e perdemos a nossa voz.',
      'Produzimos muito e medimos pouco.',
      'A marca some entre uma campanha e a próxima.',
    ],
    nossoJeito: [
      { num: '01', titulo: 'Definir territórios', texto: 'Poucos temas que só a sua marca pode falar com autoridade.' },
      { num: '02', titulo: 'Criar formatos', texto: 'Linhas editoriais e formatos próprios, não cópia de tendência.' },
      { num: '03', titulo: 'Sustentar', texto: 'Calendário e produção com leitura de desempenho, sem perder a voz.' },
    ],
    entregas: [
      'Estratégia de conteúdo',
      'Territórios editoriais',
      'Linhas e formatos próprios',
      'Identidade de conteúdo',
      'Calendário editorial',
      'Produção (vídeo, social, editorial)',
      'Roteiros e copy',
      'Relatórios de desempenho',
    ],
    caseRelacionado: {
      cliente: 'Marca Lifestyle',
      setor: 'Lifestyle',
      ano: '2024',
      stat: '4,1x',
      statLabel: 'mais alcance orgânico com metade das peças',
      titulo: 'Menos posts, mais marca.',
      slug: 'case-lifestyle',
      cover: 'linear-gradient(135deg, #fdfdfd 0%, #f1f1f1 100%)',
    },
    ctaTexto: 'Conteúdo que sustenta a marca? Vamos conversar.',
  },
];

export function getDesafio(slug: string): Desafio | undefined {
  return DESAFIOS.find((d) => d.slug === slug);
}

export const DESAFIO_SLUGS = DESAFIOS.map((d) => d.slug);
