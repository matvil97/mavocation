import type { Question } from "./vocation-scoring";

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Lequel de ces projets te donnerait le plus de satisfaction ?",
    options: [
      { label: "Réparer ou construire quelque chose de mes mains", weights: { R: 3 } },
      { label: "Analyser des données pour trouver une tendance", weights: { I: 3 } },
      { label: "Créer un visuel ou une affiche percutante", weights: { A: 3 } },
      { label: "Aider quelqu'un à traverser une période difficile", weights: { S: 3 } },
    ],
  },
  {
    id: "q2",
    text: "Face à une panne ou un problème technique, tu…",
    options: [
      { label: "Retrousses les manches et règles ça toi-même", weights: { R: 3 } },
      { label: "Cherches méthodiquement la cause avant d'agir", weights: { I: 3 } },
      { label: "Appelles quelqu'un de plus qualifié sans hésiter", weights: { S: 1, C: 1 } },
      { label: "Délègues et passes à autre chose", weights: { E: 2 } },
    ],
  },
  {
    id: "q3",
    text: "Dans ton environnement de travail idéal, tu es…",
    options: [
      { label: "Sur le terrain, en mouvement, dehors", weights: { R: 3 } },
      { label: "Dans un labo ou un bureau calme pour te concentrer", weights: { I: 3 } },
      { label: "Dans un open space créatif et stimulant", weights: { A: 2, S: 1 } },
      { label: "En contact permanent avec des clients ou collègues", weights: { S: 2, E: 1 } },
    ],
  },
  {
    id: "q4",
    text: "Qu'est-ce qui t'attire le plus dans un problème ?",
    options: [
      { label: "Comprendre pourquoi ça se passe comme ça", weights: { I: 3 } },
      { label: "Trouver une solution pratique rapidement", weights: { R: 2, E: 1 } },
      { label: "Imaginer une approche originale et inédite", weights: { A: 3 } },
      { label: "Travailler dessus en équipe", weights: { S: 2, E: 1 } },
    ],
  },
  {
    id: "q5",
    text: "Quand tu apprends quelque chose de nouveau, tu…",
    options: [
      { label: "Veux comprendre les mécanismes en profondeur", weights: { I: 3 } },
      { label: "Veux l'appliquer concrètement au plus vite", weights: { R: 2, E: 1 } },
      { label: "Cherches comment le rendre plus créatif", weights: { A: 3 } },
      { label: "En parles à des gens pour partager et débattre", weights: { S: 2, E: 1 } },
    ],
  },
  {
    id: "q6",
    text: "Pour un week-end, tu choisirais…",
    options: [
      { label: "Un documentaire de science ou un livre technique", weights: { I: 3 } },
      { label: "Un atelier de bricolage, jardinage ou mécanique", weights: { R: 3 } },
      { label: "Un cours de dessin, photo ou musique", weights: { A: 3 } },
      { label: "Une activité sportive ou associative en groupe", weights: { S: 2, E: 1 } },
    ],
  },
  {
    id: "q7",
    text: "Comment tu décris ton rapport à la créativité ?",
    options: [
      { label: "C'est vital, je dois créer régulièrement", weights: { A: 3 } },
      { label: "J'aime l'idée mais je suis plutôt analytique", weights: { I: 2 } },
      { label: "Je préfère exécuter un plan clair plutôt qu'improviser", weights: { C: 2, R: 1 } },
      { label: "Je suis créatif(ve) surtout pour convaincre ou pitcher", weights: { E: 2, A: 1 } },
    ],
  },
  {
    id: "q8",
    text: "Parmi ces métiers, lequel t'attire le plus instinctivement ?",
    options: [
      { label: "Réalisateur(trice) ou photographe", weights: { A: 3 } },
      { label: "Chercheur(se) ou data scientist", weights: { I: 3 } },
      { label: "Infirmier(ère) ou psychologue", weights: { S: 3 } },
      { label: "Chef d'entreprise ou commercial", weights: { E: 3 } },
    ],
  },
  {
    id: "q9",
    text: "Quand tu dois rendre un rapport, une présentation ou un mail, tu…",
    options: [
      { label: "Fais attention à ce que ça soit beau et bien conçu", weights: { A: 2, C: 1 } },
      { label: "Priorises la précision et la rigueur du contenu", weights: { I: 2, C: 1 } },
      { label: "Cherches à marquer les esprits, sortir du lot", weights: { A: 2, E: 1 } },
      { label: "Veux que ce soit clair et utile avant tout", weights: { S: 1, C: 2 } },
    ],
  },
  {
    id: "q10",
    text: "Ce qui te donne le plus d'énergie au travail, c'est…",
    options: [
      { label: "Voir que j'ai aidé quelqu'un concrètement", weights: { S: 3 } },
      { label: "Résoudre un problème complexe tout seul", weights: { I: 3 } },
      { label: "Finir un projet que j'ai créé de zéro", weights: { A: 2, R: 1 } },
      { label: "Closer un deal ou atteindre un objectif business", weights: { E: 3 } },
    ],
  },
  {
    id: "q11",
    text: "Dans un groupe, quel rôle prends-tu naturellement ?",
    options: [
      { label: "Celui qui écoute et soutient les autres", weights: { S: 3 } },
      { label: "Celui qui analyse et propose des solutions", weights: { I: 3 } },
      { label: "Celui qui prend les décisions et donne la direction", weights: { E: 3 } },
      { label: "Celui qui structure, organise, tient les délais", weights: { C: 3 } },
    ],
  },
  {
    id: "q12",
    text: "Quelle phrase te ressemble le plus ?",
    options: [
      { label: "Je suis là pour les autres, c'est ce qui me motive", weights: { S: 3 } },
      { label: "Je veux comprendre le monde autour de moi", weights: { I: 3 } },
      { label: "Je veux laisser une trace, créer quelque chose qui dure", weights: { A: 2, E: 1 } },
      { label: "Je veux construire quelque chose de solide et rentable", weights: { E: 2, C: 1 } },
    ],
  },
  {
    id: "q13",
    text: "Quand une bonne idée te traverse, tu…",
    options: [
      { label: "Passes vite à l'action pour la tester", weights: { E: 3 } },
      { label: "Analyses les risques avant de te lancer", weights: { I: 2, C: 1 } },
      { label: "En parles pour avoir des retours et convaincre", weights: { E: 2, S: 1 } },
      { label: "La notes et la planifies soigneusement", weights: { C: 2, I: 1 } },
    ],
  },
  {
    id: "q14",
    text: "Lancer ta propre entreprise, c'est…",
    options: [
      { label: "Mon objectif, j'y pense sérieusement", weights: { E: 3 } },
      { label: "Séduisant, mais trop risqué pour moi", weights: { I: 1, C: 1 } },
      { label: "Intéressant si c'est un projet créatif ou à impact", weights: { A: 2, S: 1 } },
      { label: "Pas mon truc, je préfère un cadre stable", weights: { C: 2, R: 1 } },
    ],
  },
  {
    id: "q15",
    text: "Dans 10 ans, tu te vois…",
    options: [
      { label: "À la tête d'un projet ou d'une équipe que j'ai bâtie", weights: { E: 3 } },
      { label: "Expert(e) reconnu(e) dans mon domaine technique", weights: { I: 2, R: 1 } },
      { label: "Ayant un impact fort sur les gens autour de moi", weights: { S: 2, E: 1 } },
      { label: "Dans un poste stable avec une belle évolution", weights: { C: 2, S: 1 } },
    ],
  },
  {
    id: "q16",
    text: "Face à une tâche mal définie, tu te sens…",
    options: [
      { label: "Mal à l'aise, j'ai besoin d'un cadre clair", weights: { C: 3 } },
      { label: "Stimulé(e), c'est une opportunité de créer", weights: { A: 3 } },
      { label: "OK si je peux réfléchir et structurer moi-même", weights: { I: 2, C: 1 } },
      { label: "Enthousiaste, j'aime l'imprévu et l'improvisation", weights: { E: 2, A: 1 } },
    ],
  },
  {
    id: "q17",
    text: "Ce qui te dérange le plus au travail, c'est…",
    options: [
      { label: "Le désordre, le manque de méthode", weights: { C: 3 } },
      { label: "La routine, refaire toujours les mêmes choses", weights: { A: 2, E: 1 } },
      { label: "Travailler seul sans contact humain", weights: { S: 3 } },
      { label: "Ne pas avoir assez d'autonomie", weights: { E: 2, A: 1 } },
    ],
  },
  {
    id: "q18",
    text: "Dans un projet d'équipe, tu prends en charge…",
    options: [
      { label: "Le planning, le suivi des tâches, les rapports", weights: { C: 3 } },
      { label: "La recherche, les analyses, les benchmarks", weights: { I: 3 } },
      { label: "La communication, les slides, l'identité visuelle", weights: { A: 2, E: 1 } },
      { label: "Le contact client et la gestion des relations", weights: { S: 2, E: 1 } },
    ],
  },
  {
    id: "q19",
    text: "Quelle reconnaissance te tient le plus à cœur ?",
    options: [
      { label: "Être reconnu(e) pour la qualité technique de mon travail", weights: { R: 2, I: 1 } },
      { label: "Que les gens me remercient pour mon aide", weights: { S: 3 } },
      { label: "Que mon travail soit cité, diffusé, admiré", weights: { A: 2, E: 1 } },
      { label: "Atteindre les objectifs et les chiffres fixés", weights: { C: 2, E: 1 } },
    ],
  },
  {
    id: "q20",
    text: "La phrase qui te ressemble le mieux…",
    options: [
      { label: "\"Je fais, donc je suis.\" — l'action concrète me définit", weights: { R: 3 } },
      { label: "\"Comprendre, c'est pouvoir.\" — la connaissance est ma force", weights: { I: 3 } },
      { label: "\"Je crée donc j'existe.\" — sans créer, je m'ennuie", weights: { A: 3 } },
      { label: "\"Ensemble on va plus loin.\" — le collectif prime", weights: { S: 3 } },
    ],
  },
];
