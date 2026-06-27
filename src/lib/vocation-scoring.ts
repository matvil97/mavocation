export type Dimension = "R" | "I" | "A" | "S" | "E" | "C";

export type DimensionWeights = Record<Dimension, number>;

export interface AnswerOption {
  label: string;
  weights: Partial<DimensionWeights>;
}

export interface Question {
  id: string;
  text: string;
  options: AnswerOption[];
}

export interface Career {
  id: string;
  title: string;
  hollandCode: string;
  sector: string;
  avgSalary: string;
  description: string;
  tags: string[];
}

export interface RiasecProfile {
  scores: DimensionWeights;
  dominants: Dimension[];
  code: string;
}

export const DIMENSION_LABELS: Record<Dimension, string> = {
  R: "Réaliste",
  I: "Investigateur",
  A: "Artistique",
  S: "Social",
  E: "Entreprenant",
  C: "Conventionnel",
};

export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> = {
  R: "Tu aimes travailler avec tes mains, les outils, la technique concrète. Tu préfères les résultats tangibles aux théories abstraites.",
  I: "Tu aimes analyser, comprendre, résoudre des problèmes complexes. La curiosité intellectuelle est ton moteur.",
  A: "Tu as besoin de créer, d'exprimer, d'innover. La routine t'étouffe — tu cherches l'originalité.",
  S: "Tu t'épanouis en aidant, enseignant, accompagnant les autres. Les relations humaines sont au cœur de ton travail idéal.",
  E: "Tu aimes diriger, convaincre, prendre des initiatives. Tu es à l'aise pour vendre des idées et mener des projets.",
  C: "Tu aimes organiser, structurer, gérer avec précision. L'ordre et la méthode te rassurent et t'efficacent.",
};

// Palette Wong — testée colorblind-safe (deuteranopie, protanopie, tritanopie)
export const DIMENSION_COLORS: Record<Dimension, string> = {
  R: "bg-blue-700",
  I: "bg-sky-700",
  A: "bg-violet-700",
  S: "bg-teal-700",
  E: "bg-orange-700",
  C: "bg-pink-700",
};

export const CAREERS: Career[] = [
  {
    id: "dev-web",
    title: "Développeur(se) web",
    hollandCode: "IRC",
    sector: "Tech",
    avgSalary: "38 000 – 55 000 €/an",
    description: "Conçois et code des sites et applications web, du back-end au front-end.",
    tags: ["code", "tech", "numérique"],
  },
  {
    id: "designer-ux",
    title: "Designer UX/UI",
    hollandCode: "AIR",
    sector: "Design / Tech",
    avgSalary: "36 000 – 52 000 €/an",
    description: "Crée des interfaces intuitives et esthétiques pour les produits numériques.",
    tags: ["design", "créatif", "tech"],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    hollandCode: "ICR",
    sector: "Tech / Finance",
    avgSalary: "40 000 – 60 000 €/an",
    description: "Analyse de grandes quantités de données pour aider à la prise de décision.",
    tags: ["data", "analyse", "tech"],
  },
  {
    id: "infirmier",
    title: "Infirmier(ère)",
    hollandCode: "SIR",
    sector: "Santé",
    avgSalary: "28 000 – 38 000 €/an",
    description: "Prend en charge les soins des patients et coordonne avec l'équipe médicale.",
    tags: ["santé", "soin", "humain"],
  },
  {
    id: "coach-pro",
    title: "Coach professionnel",
    hollandCode: "SEA",
    sector: "Accompagnement",
    avgSalary: "30 000 – 60 000 €/an",
    description: "Accompagne des individus ou équipes vers leurs objectifs professionnels.",
    tags: ["coaching", "RH", "accompagnement"],
  },
  {
    id: "comptable",
    title: "Comptable",
    hollandCode: "CIE",
    sector: "Finance / Gestion",
    avgSalary: "30 000 – 45 000 €/an",
    description: "Gère la comptabilité des entreprises, établit les bilans et déclarations fiscales.",
    tags: ["finance", "gestion", "chiffres"],
  },
  {
    id: "commercial",
    title: "Commercial / Business Developer",
    hollandCode: "ESC",
    sector: "Vente / Business",
    avgSalary: "35 000 – 65 000 €/an",
    description: "Développe le chiffre d'affaires en prospectant et fidélisant les clients.",
    tags: ["vente", "relation client", "business"],
  },
  {
    id: "architecte",
    title: "Architecte",
    hollandCode: "AIR",
    sector: "BTP / Design",
    avgSalary: "35 000 – 55 000 €/an",
    description: "Conçoit des bâtiments en alliant esthétique, fonctionnalité et contraintes techniques.",
    tags: ["design", "construction", "créatif"],
  },
  {
    id: "enseignant",
    title: "Enseignant(e)",
    hollandCode: "SAI",
    sector: "Éducation",
    avgSalary: "26 000 – 40 000 €/an",
    description: "Transmet des connaissances et accompagne les élèves dans leur développement.",
    tags: ["éducation", "pédagogie", "relation"],
  },
  {
    id: "chef-projet",
    title: "Chef de projet",
    hollandCode: "ECS",
    sector: "Transversal",
    avgSalary: "42 000 – 62 000 €/an",
    description: "Pilote des projets de A à Z : planning, budget, équipes, livraison.",
    tags: ["management", "organisation", "leadership"],
  },
  {
    id: "graphiste",
    title: "Graphiste / Illustrateur(trice)",
    hollandCode: "AER",
    sector: "Créatif / Communication",
    avgSalary: "28 000 – 42 000 €/an",
    description: "Crée des visuels pour la communication, l'identité de marque et les médias.",
    tags: ["design", "illustration", "créatif"],
  },
  {
    id: "psychologue",
    title: "Psychologue",
    hollandCode: "SIA",
    sector: "Santé / Accompagnement",
    avgSalary: "30 000 – 50 000 €/an",
    description: "Évalue et accompagne les personnes en souffrance psychique ou en besoin de développement.",
    tags: ["psychologie", "écoute", "accompagnement"],
  },
  {
    id: "electricien",
    title: "Électricien(ne)",
    hollandCode: "RIC",
    sector: "BTP / Technique",
    avgSalary: "26 000 – 38 000 €/an",
    description: "Installe et entretient les installations électriques dans les bâtiments et industries.",
    tags: ["technique", "manuel", "BTP"],
  },
  {
    id: "journaliste",
    title: "Journaliste",
    hollandCode: "AES",
    sector: "Médias / Communication",
    avgSalary: "28 000 – 48 000 €/an",
    description: "Enquête, rédige et diffuse des informations pour les médias print, web ou audiovisuels.",
    tags: ["écriture", "médias", "enquête"],
  },
  {
    id: "rh",
    title: "Responsable RH",
    hollandCode: "SEC",
    sector: "Ressources Humaines",
    avgSalary: "38 000 – 55 000 €/an",
    description: "Recrute, forme et fidélise les collaborateurs, gère les relations sociales.",
    tags: ["RH", "recrutement", "management"],
  },
  {
    id: "medecin",
    title: "Médecin",
    hollandCode: "ISR",
    sector: "Santé",
    avgSalary: "60 000 – 100 000 €/an",
    description: "Diagnostique et traite les maladies, accompagne les patients dans leur santé.",
    tags: ["médecine", "santé", "science"],
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur(e)",
    hollandCode: "EAI",
    sector: "Entrepreneuriat",
    avgSalary: "Variable",
    description: "Crée et développe sa propre entreprise, en portant une vision et en prenant des risques.",
    tags: ["business", "leadership", "innovation"],
  },
  {
    id: "logisticien",
    title: "Logisticien(ne)",
    hollandCode: "CRE",
    sector: "Supply Chain",
    avgSalary: "32 000 – 50 000 €/an",
    description: "Organise les flux de marchandises, optimise les stocks et les transports.",
    tags: ["logistique", "organisation", "gestion"],
  },
  {
    id: "community-manager",
    title: "Community Manager",
    hollandCode: "ASE",
    sector: "Communication / Digital",
    avgSalary: "28 000 – 42 000 €/an",
    description: "Anime les réseaux sociaux d'une marque, crée du contenu et engage la communauté.",
    tags: ["réseaux sociaux", "contenu", "digital"],
  },
  {
    id: "chercheur",
    title: "Chercheur(se) / Scientifique",
    hollandCode: "IAR",
    sector: "Recherche / Académique",
    avgSalary: "32 000 – 55 000 €/an",
    description: "Mène des expériences et publie des résultats pour faire avancer les connaissances.",
    tags: ["science", "recherche", "analyse"],
  },
];

function hollandDistance(codeA: string, codeB: string): number {
  let score = 0;
  for (let i = 0; i < Math.min(codeA.length, codeB.length); i++) {
    const posInB = codeB.indexOf(codeA[i]);
    if (posInB === -1) continue;
    const diff = Math.abs(i - posInB);
    score += diff === 0 ? 3 : diff === 1 ? 1 : 0;
  }
  return score;
}

export function computeProfile(answers: Partial<DimensionWeights>[]): RiasecProfile {
  const scores: DimensionWeights = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const answer of answers) {
    for (const [dim, weight] of Object.entries(answer) as [Dimension, number][]) {
      scores[dim] += weight;
    }
  }
  const dominants = (Object.keys(scores) as Dimension[])
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3);
  return { scores, dominants, code: dominants.join("") };
}

export function recommendCareers(profile: RiasecProfile, limit = 3): Career[] {
  return [...CAREERS]
    .map((career) => ({ career, score: hollandDistance(profile.code, career.hollandCode) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.career);
}

export function normalizeScores(scores: DimensionWeights): Record<Dimension, number> {
  const max = Math.max(...Object.values(scores));
  if (max === 0) return { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  return Object.fromEntries(
    Object.entries(scores).map(([k, v]) => [k, Math.round((v / max) * 100)])
  ) as Record<Dimension, number>;
}
