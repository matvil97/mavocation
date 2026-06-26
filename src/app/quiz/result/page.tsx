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

const DIMENSION_GRADIENT: Record<Dimension, string> = {
  R: "from-orange-500 to-amber-400",
  I: "from-blue-500 to-cyan-400",
  A: "from-purple-500 to-pink-400",
  S: "from-emerald-500 to-teal-400",
  E: "from-red-500 to-orange-400",
  C: "from-amber-500 to-yellow-400",
};

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
    <div className="min-h-screen bg-[#07070f] text-white">

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-12">

        {/* Nav */}
        <div className="flex items-center justify-between mb-12">
          <span className="text-base font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">ma</span>
            <span>vocation</span>
          </span>
          <Link href="/quiz" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← Refaire le quiz
          </Link>
        </div>

        {/* Profile hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-bold tracking-[0.15em] uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Profil RIASEC calculé
          </div>

          <div className="mb-3">
            <span className="text-7xl sm:text-8xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 tracking-widest">
              {profile.code}
            </span>
          </div>

          <p className="text-slate-500 text-sm tracking-wide">
            {profile.dominants.map((d) => DIMENSION_LABELS[d]).join(" · ")}
          </p>
        </div>

        {/* Dominant traits */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 mb-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase mb-5">Tes traits dominants</p>
          <div className="space-y-4">
            {profile.dominants.map((dim, i) => (
              <div key={dim} className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br ${DIMENSION_GRADIENT[dim]} flex items-center justify-center text-white text-xs font-bold font-mono`}>
                  {dim}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold text-white">{DIMENSION_LABELS[dim]}</span>
                    {i === 0 && <span className="text-[9px] font-bold text-violet-400 bg-violet-500/15 px-1.5 py-0.5 rounded-full tracking-wider">DOMINANT</span>}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{DIMENSION_DESCRIPTIONS[dim]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score bars */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 mb-5">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase mb-5">Spectre des 6 dimensions</p>
          <div className="space-y-3">
            {sortedDimensions.map((dim) => (
              <div key={dim} className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-slate-600 w-4">{dim}</span>
                <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${DIMENSION_GRADIENT[dim]} transition-all duration-700`}
                    style={{ width: `${normalized[dim]}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-600 w-8 text-right">{normalized[dim]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career matches */}
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase mb-4">Métiers compatibles</p>
          <div className="space-y-3">
            {careers.map((career, idx) => (
              <div
                key={career.id}
                className={`rounded-2xl border p-5 transition-all duration-300 ${
                  idx === 0
                    ? "border-violet-500/40 bg-violet-500/[0.07]"
                    : "border-white/[0.06] bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-light border ${
                      idx === 0 ? "border-violet-500/40 bg-violet-500/15 text-violet-400" : "border-white/[0.08] bg-white/[0.04] text-slate-500"
                    }`}>
                      {SECTOR_ICONS[career.sector] ?? "◎"}
                    </div>
                    <div>
                      {idx === 0 && (
                        <div className="text-[9px] font-bold text-violet-400 tracking-widest uppercase mb-0.5">
                          Meilleure correspondance
                        </div>
                      )}
                      <h3 className="text-sm font-bold text-white">{career.title}</h3>
                      <p className="text-xs text-slate-600">{career.sector}</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-xs font-mono font-bold text-slate-600 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-lg">
                    {career.hollandCode}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-3">{career.description}</p>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    {career.avgSalary}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {career.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-slate-600 bg-white/[0.04] px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead capture */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/60 to-slate-950/60 backdrop-blur p-7 mb-8">
          {!showLead ? (
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-violet-400 uppercase mb-3">Rapport complet gratuit</p>
              <h2 className="text-xl font-extrabold text-white mb-2">
                Va plus loin avec ton profil{" "}
                <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  {profile.code}
                </span>
              </h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Analyse détaillée, parcours types, formations finançables CPF, conseils personnalisés — livré directement dans ta boîte mail.
              </p>
              <ul className="space-y-2 mb-7">
                {[
                  "Fiches détaillées pour chaque métier recommandé",
                  "Sélection de formations adaptées à ton profil",
                  "Financement CPF si tu es en reconversion",
                  "Gratuit, sans engagement",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <span className="text-violet-400 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowLead(true)}
                className="group relative w-full py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-80 bg-gradient-to-r from-violet-500 to-cyan-400 blur-lg transition-opacity" />
                <span className="relative">Recevoir mon rapport gratuit →</span>
              </button>
            </div>
          ) : (
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-violet-400 uppercase mb-3">Plus qu&apos;une étape</p>
              <h2 className="text-lg font-extrabold text-white mb-5">Où t&apos;envoyer le rapport ?</h2>
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
