"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import {
  DIMENSION_LABELS,
  DIMENSION_DESCRIPTIONS,
  normalizeScores,
} from "@/lib/vocation-scoring";
import type { RiasecProfile, Career, Dimension } from "@/lib/vocation-scoring";

interface QuizResult {
  profile: RiasecProfile;
  careers: Career[];
}

// Palette colorblind-safe (Wong) — aucun pair rouge/vert
const DIMENSION_COLOR: Record<Dimension, string> = {
  R: "bg-blue-700",
  I: "bg-sky-700",
  A: "bg-violet-700",
  S: "bg-teal-700",
  E: "bg-orange-700",
  C: "bg-pink-700",
};

const FILIERES: Record<Dimension, { generale: string[]; techno: string[]; pro: string[] }> = {
  R: {
    generale: ["Maths", "Physique-Chimie", "Sciences de l'Ingénieur"],
    techno: ["STI2D"],
    pro: ["Bac Pro Maintenance Industrielle", "Bac Pro Électrotechnique"],
  },
  I: {
    generale: ["Maths", "SVT", "Physique-Chimie", "NSI"],
    techno: ["STL"],
    pro: ["Bac Pro Laboratoire Contrôle Qualité"],
  },
  A: {
    generale: ["Arts plastiques", "Humanités, Litt. & Philo.", "LLCE"],
    techno: ["STD2A"],
    pro: ["Bac Pro Artisanat et Métiers d'Art"],
  },
  S: {
    generale: ["SES", "HGGSP", "SVT"],
    techno: ["ST2S", "STHR"],
    pro: ["Bac Pro ASSP"],
  },
  E: {
    generale: ["SES", "HGGSP", "Maths"],
    techno: ["STMG"],
    pro: ["Bac Pro Commerce", "Bac Pro Management"],
  },
  C: {
    generale: ["Maths", "SES", "NSI"],
    techno: ["STMG"],
    pro: ["Bac Pro Gestion-Administration"],
  },
};

function getFiliereSuggestions(dominants: Dimension[]) {
  const top2 = dominants.slice(0, 2);
  const merge = (key: "generale" | "techno" | "pro") => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const d of top2) {
      for (const item of FILIERES[d][key]) {
        if (!seen.has(item)) { seen.add(item); result.push(item); }
      }
    }
    return result.slice(0, 5);
  };
  return { generale: merge("generale"), techno: merge("techno"), pro: merge("pro") };
}

const SECTOR_ICONS: Record<string, string> = {
  "Tech": "⬡",
  "Design / Tech": "◈",
  "Tech / Finance": "◎",
  "Santé": "◇",
  "Accompagnement": "◉",
  "Finance / Gestion": "⬢",
  "Vente / Business": "△",
  "BTP / Design": "◻",
  "Éducation": "○",
  "Transversal": "✦",
  "Créatif / Communication": "✧",
  "Santé / Accompagnement": "◉",
  "BTP / Technique": "⬡",
  "Médias / Communication": "◈",
  "Ressources Humaines": "◎",
  "Entrepreneuriat": "△",
  "Supply Chain": "⬢",
  "Communication / Digital": "◈",
  "Recherche / Académique": "◎",
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showLead, setShowLead] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("quiz_result");
    if (!raw) { router.replace("/quiz"); return; }
    setResult(JSON.parse(raw));
  }, [router]);

  if (!result) return null;

  const { profile, careers } = result;
  const normalized = normalizeScores(profile.scores);
  const sortedDimensions = (Object.keys(profile.scores) as Dimension[]).sort(
    (a, b) => profile.scores[b] - profile.scores[a]
  );

  return (
    <div className="min-h-screen">

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-violet-100 dark:bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-sky-100 dark:bg-cyan-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-12">

        {/* Nav */}
        <div className="flex items-center justify-between mb-12">
          <span className="text-base font-bold">
            <span className="text-violet-600 dark:text-violet-400">ma</span>
            <span>vocation</span>
          </span>
          <Link href="/quiz" className="text-xs text-zinc-500 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors">
            ← Refaire le quiz
          </Link>
        </div>

        {/* Profile hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-300 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-[10px] font-bold tracking-[0.15em] uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            Profil RIASEC calculé
          </div>

          <div className="mb-3">
            <span className="text-7xl sm:text-8xl font-extrabold font-mono text-violet-600 dark:text-violet-400 tracking-widest">
              {profile.code}
            </span>
          </div>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm tracking-wide">
            {profile.dominants.map((d) => DIMENSION_LABELS[d]).join(" · ")}
          </p>
        </div>

        {/* Dominant traits */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03] p-6 mb-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-600 uppercase mb-5">Tes traits dominants</p>
          <div className="space-y-4">
            {profile.dominants.map((dim, i) => (
              <div key={dim} className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg ${DIMENSION_COLOR[dim]} flex items-center justify-center text-white text-xs font-bold font-mono`}>
                  {dim}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">{DIMENSION_LABELS[dim]}</span>
                    {i === 0 && <span className="text-[9px] font-bold text-violet-700 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/15 px-1.5 py-0.5 rounded-full tracking-wider">DOMINANT</span>}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{DIMENSION_DESCRIPTIONS[dim]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score bars */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03] p-6 mb-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-600 uppercase mb-5">Spectre des 6 dimensions</p>
          <div className="space-y-3">
            {sortedDimensions.map((dim) => (
              <div key={dim} className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-500 w-4">{dim}</span>
                <div className="flex-1 h-2 bg-zinc-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${DIMENSION_COLOR[dim]} transition-all duration-700`}
                    style={{ width: `${normalized[dim]}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-500 w-8 text-right">{normalized[dim]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career matches */}
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-600 uppercase mb-4">Métiers compatibles</p>
          <div className="space-y-3">
            {careers.map((career, idx) => (
              <div
                key={career.id}
                className={`rounded-2xl border p-5 transition-all duration-300 ${
                  idx === 0
                    ? "border-violet-300 dark:border-violet-500/40 bg-violet-50 dark:bg-violet-500/[0.07]"
                    : "border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-light border ${
                      idx === 0
                        ? "border-violet-300 dark:border-violet-500/40 bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-400"
                        : "border-zinc-200 dark:border-white/[0.08] bg-zinc-100 dark:bg-white/[0.04] text-zinc-400 dark:text-zinc-500"
                    }`}>
                      {SECTOR_ICONS[career.sector] ?? "◎"}
                    </div>
                    <div>
                      {idx === 0 && (
                        <div className="text-[9px] font-bold text-violet-700 dark:text-violet-400 tracking-widest uppercase mb-0.5">
                          Meilleure correspondance
                        </div>
                      )}
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{career.title}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500">{career.sector}</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-xs font-mono font-bold text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.06] px-2.5 py-1 rounded-lg">
                    {career.hollandCode}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">{career.description}</p>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    {career.avgSalary}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {career.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filières recommandées */}
        {(() => {
          const { generale, techno, pro } = getFiliereSuggestions(profile.dominants);
          return (
            <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03] p-6 mb-6">
              <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-600 uppercase mb-5">
                Filières recommandées
              </p>
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 mb-2">
                    Voie générale <span className="font-normal normal-case text-zinc-400 dark:text-zinc-600">· spécialités</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {generale.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-lg border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-2">
                    Voie technologique
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techno.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
                    Voie professionnelle
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pro.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[10px] text-zinc-400 dark:text-zinc-600 leading-relaxed">
                Indicatif, basé sur ton profil <span className="font-mono">{profile.code}</span>. Consulte un conseiller d&apos;orientation pour un avis personnalisé.
              </p>
            </div>
          );
        })()}

        {/* Lead capture */}
        <div className="rounded-2xl border border-violet-300 dark:border-violet-500/20 bg-violet-50 dark:bg-gradient-to-br dark:from-violet-950/60 dark:to-slate-950/60 p-7 mb-8">
          {!showLead ? (
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-violet-700 dark:text-violet-400 uppercase mb-3">Rapport complet gratuit</p>
              <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-2">
                Va plus loin avec ton profil{" "}
                <span className="font-mono text-violet-600 dark:text-violet-400">
                  {profile.code}
                </span>
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Analyse détaillée, parcours types, formations finançables CPF, conseils personnalisés — livré directement dans ta boîte mail.
              </p>
              <ul className="space-y-2 mb-7">
                {[
                  "Fiches détaillées pour chaque métier recommandé",
                  "Sélection de formations adaptées à ton profil",
                  "Financement CPF si tu es en reconversion",
                  "Gratuit, sans engagement",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="text-violet-600 dark:text-violet-400 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowLead(true)}
                className="group w-full py-3.5 rounded-xl font-bold text-sm text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-colors shadow-lg shadow-violet-600/20"
              >
                Recevoir mon rapport gratuit →
              </button>
            </div>
          ) : (
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-violet-700 dark:text-violet-400 uppercase mb-3">Plus qu&apos;une étape</p>
              <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white mb-5">Où t&apos;envoyer le rapport ?</h2>
              <LeadForm
                profileCode={profile.code}
                topCareer={careers[0]?.title ?? ""}
                dominants={profile.dominants}
                normalizedScores={normalized}
                careers={careers.map(c => ({
                  title: c.title,
                  hollandCode: c.hollandCode,
                  sector: c.sector,
                  description: c.description,
                  avgSalary: c.avgSalary,
                }))}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
