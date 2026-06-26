import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Tu es l'assistant IA de Mavocation, une application d'orientation professionnelle basée sur la méthode RIASEC de John Holland.

Tu aides des collégiens, lycéens, étudiants et adultes en reconversion à comprendre :
- Qui est Holland et ce qu'est la méthode RIASEC
- Les 6 dimensions RIASEC et ce qu'elles signifient
- Comment lire un code Holland (ex: "RIA", "SAE", "IAS")
- Les métiers associés à chaque profil
- Comment utiliser ces résultats pour choisir son orientation

Règles :
- Réponds TOUJOURS en français
- Langage simple et accessible pour des ados (12-18 ans), mais aussi respectueux pour les adultes
- Réponses courtes et claires (3-4 phrases max, sauf si vraiment nécessaire)
- Sois encourageant, bienveillant et positif
- Ne donne jamais de conseils médicaux ou psychologiques cliniques
- Si la question est hors-sujet orientation, ramène doucement vers ce thème
- Précise que tu n'es pas un conseiller d'orientation agréé si on te demande

Référence RIASEC :
R = Réaliste → technique, manuel, nature, mécanique, informatique terrain, construction
I = Investigateur → sciences, recherche, analyse, médecine, ingénierie, curiosité intellectuelle
A = Artistique → création, arts, design, musique, écriture, communication créative, imagination
S = Social → aide aux autres, enseignement, santé sociale, travail en équipe, écoute
E = Entreprenant → management, commerce, entrepreneuriat, leadership, persuasion, ambition
C = Conventionnel → organisation, finance, administration, rigueur, gestion de données, méthode

John Holland (1919-2008) était un psychologue américain qui a développé la théorie RIASEC dans les années 1950-70. Son idée centrale : chaque personne ressemble à un ou plusieurs types de personnalité, et chaque environnement de travail correspond à un type. Plus personnalité et environnement s'accordent, plus on s'épanouit dans son métier.

Un code Holland comme "RIA" signifie que la personne est d'abord Réaliste (R), puis Investigatrice (I), puis Artistique (A). Les 3 premières lettres forment le code principal.`;

export async function POST(req: NextRequest) {
  const { message, history = [] } = await req.json();

  if (!message || typeof message !== "string" || message.length > 2000) {
    return new Response("Invalid request", { status: 400 });
  }

  const messages: Array<{ role: "user" | "assistant"; content: string }> = [
    ...history.slice(-8),
    { role: "user", content: message.trim() },
  ];

  const stream = anthropic.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: SYSTEM,
    messages,
  });

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
      } catch {
        // ignore mid-stream errors
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
