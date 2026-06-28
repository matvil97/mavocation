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

type FiliereKeys = "lyceeGenerale" | "lyceeTechno" | "lyceePro" | "bts" | "but" | "licence" | "prepa";
const FILIERES: Record<Dimension, Record<FiliereKeys, string[]>> = {
  R: {
    lyceeGenerale: ["Maths", "Physique-Chimie", "Sciences de l'Ingénieur", "NSI"],
    lyceeTechno: ["STI2D"],
    lyceePro: ["Bac Pro Maintenance Industrielle", "Bac Pro Électrotechnique"],
    bts: ["BTS Électrotechnique", "BTS Maintenance des Systèmes", "BTS Bâtiment"],
    but: ["BUT Génie Mécanique (GMP)", "BUT Génie Civil (GCCD)", "BUT Réseaux & Télécoms"],
    licence: ["Licence Sciences pour l'Ingénieur", "Licence Génie Mécanique"],
    prepa: ["MPSI", "PTSI", "PSI"],
  },
  I: {
    lyceeGenerale: ["Maths", "Physique-Chimie", "SVT", "NSI"],
    lyceeTechno: ["STL"],
    lyceePro: ["Bac Pro Laboratoire Contrôle Qualité"],
    bts: ["BTS Analyses de Biologie Médicale", "BTS Bioanalyses et Contrôles"],
    but: ["BUT Chimie", "BUT Biologie", "BUT Mesures Physiques"],
    licence: ["Licence Mathématiques", "Licence Physique", "Licence Chimie", "Licence Informatique"],
    prepa: ["MPSI", "PCSI", "BCPST"],
  },
  A: {
    lyceeGenerale: ["Arts plastiques", "Humanités, Litt. & Philo.", "LLCER"],
    lyceeTechno: ["STD2A", "S2TMD"],
    lyceePro: ["Bac Pro Arts du Livre", "Bac Pro Communication Visuelle"],
    bts: ["BTS Design Graphique", "BTS Design de Mode", "BTS Communication"],
    but: ["BUT MMI (Multimédia & Internet)", "BUT Infocom"],
    licence: ["Licence Arts plastiques", "Licence Lettres", "Licence Info-Com"],
    prepa: [],
  },
  S: {
    lyceeGenerale: ["SES", "HGGSP", "SVT"],
    lyceeTechno: ["ST2S", "STHR"],
    lyceePro: ["Bac Pro ASSP", "Bac Pro Animation"],
    bts: ["BTS SP3S", "BTS ESF (Éco. Sociale Familiale)"],
    but: ["BUT Carrières Sociales"],
    licence: ["Licence Psychologie", "Licence Sociologie", "Licence Sciences de l'Éducation"],
    prepa: [],
  },
  E: {
    lyceeGenerale: ["SES", "HGGSP", "Maths"],
    lyceeTechno: ["STMG"],
    lyceePro: ["Bac Pro MCO (Management Commercial)"],
    bts: ["BTS MCO", "BTS NDRC (Négociation & Relation Client)", "BTS Communication"],
    but: ["BUT Techniques de Commercialisation (TC)", "BUT GEA"],
    licence: ["Licence Sciences de Gestion", "Licence AES"],
    prepa: ["ECG (Éco-Commerciale Générale)"],
  },
  C: {
    lyceeGenerale: ["Maths", "SES", "NSI"],
    lyceeTechno: ["STMG (Gestion-Finance)", "STMG (Systèmes d'Info.)"],
    lyceePro: ["Bac Pro Gestion-Administration"],
    bts: ["BTS Comptabilité et Gestion (CG)", "BTS SAM (Support Action Managériale)"],
    but: ["BUT GEA (Gestion des Entreprises)", "BUT STID (Stats & Info Décisionnelle)"],
    licence: ["Licence Économie-Gestion", "Licence AES"],
    prepa: ["ECG (Éco-Commerciale Générale)"],
  },
};

function getFiliereSuggestions(dominants: Dimension[]) {
  const top2 = dominants.slice(0, 2);
  const merge = (key: FiliereKeys) => {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const d of top2) {
      for (const item of FILIERES[d][key]) {
        if (!seen.has(item)) { seen.add(item); result.push(item); }
      }
    }
    return result.slice(0, 5);
  };
  return {
    lyceeGenerale: merge("lyceeGenerale"),
    lyceeTechno: merge("lyceeTechno"),
    lyceePro: merge("lyceePro"),
    bts: merge("bts"),
    but: merge("but"),
    licence: merge("licence"),
    prepa: merge("prepa"),
  };
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
    <main id="main-content" className="min-h-screen">

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
            <span aria-hidden="true" className="text-7xl sm:text-8xl font-extrabold font-mono text-violet-600 dark:text-violet-400 tracking-widest">
              {profile.code}
            </span>
            <span className="sr-only">
              Ton code Holland est {profile.code}, avec comme dimensions dominantes : {profile.dominants.map(d => DIMENSION_LABELS[d]).join(", ")}.
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
                <span className="sr-only">{DIMENSION_LABELS[dim]} : {normalized[dim]} pour cent</span>
                <span aria-hidden="true" className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-500 w-4">{dim}</span>
                <div aria-hidden="true" className="flex-1 h-2 bg-zinc-200 dark:bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${DIMENSION_COLOR[dim]} transition-all duration-700`}
                    style={{ width: `${normalized[dim]}%` }}
                  />
                </div>
                <span aria-hidden="true" className="text-xs font-mono text-zinc-500 dark:text-zinc-500 w-8 text-right">{normalized[dim]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Career matches */}
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-600 uppercase mb-4">Métiers compatibles</p>
          <div className="space-y-3">
            {careers.map((career, idx) => (
              <article
                key={career.id}
                aria-label={`${idx === 0 ? "Meilleure correspondance : " : ""}${career.title}`}
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
              </article>
            ))}
          </div>
        </div>

        {/* Filières recommandées */}
        {(() => {
          const f = getFiliereSuggestions(profile.dominants);
          const chip = (color: string, s: string) => (
            <span key={s} className={`text-xs px-2 py-1 rounded-lg border font-medium ${color}`}>{s}</span>
          );
          return (
            <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03] p-6 mb-6">
              <p className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-600 uppercase mb-5">
                Filières recommandées
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Lycée */}
                <section aria-label="Au lycée">
                  <div className="flex items-center gap-2 mb-4">
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-violet-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider">Au lycée</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1.5">Voie générale · spécialités</p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.lyceeGenerale.map(s => chip("border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300", s))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1.5">Voie technologique</p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.lyceeTechno.map(s => chip("border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300", s))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1.5">Bac Professionnel</p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.lyceePro.map(s => chip("border-teal-200 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300", s))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Après le bac */}
                <section aria-label="Après le bac">
                  <div className="flex items-center gap-2 mb-4">
                    <span aria-hidden="true" className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Après le bac</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1.5">BTS <span className="normal-case">(2 ans)</span></p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.bts.map(s => chip("border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300", s))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1.5">BUT <span className="normal-case">(3 ans, ex-DUT)</span></p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.but.map(s => chip("border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300", s))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1.5">Licence / Université</p>
                      <div className="flex flex-wrap gap-1.5">
                        {f.licence.map(s => chip("border-pink-200 dark:border-pink-500/30 bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-300", s))}
                      </div>
                    </div>
                    {f.prepa.length > 0 && (
                      <div>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider mb-1.5">Classes prépa <span className="normal-case">(CPGE)</span></p>
                        <div className="flex flex-wrap gap-1.5">
                          {f.prepa.map(s => chip("border-zinc-200 dark:border-zinc-500/30 bg-zinc-100 dark:bg-zinc-700/30 text-zinc-700 dark:text-zinc-300", s))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

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
    </main>
  );
}
