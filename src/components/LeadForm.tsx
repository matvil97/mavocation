"use client";

import { useState } from "react";

interface CareerSummary {
  title: string;
  hollandCode: string;
  sector: string;
  description: string;
  avgSalary: string;
}

interface LeadFormProps {
  profileCode: string;
  topCareer: string;
  dominants: string[];
  normalizedScores: Record<string, number>;
  careers: CareerSummary[];
}

export default function LeadForm({ profileCode, topCareer, dominants, normalizedScores, careers }: LeadFormProps) {
  const [form, setForm] = useState({ prenom: "", email: "", telephone: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, profileCode, topCareer, dominants, normalizedScores, careers }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-2xl mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
          ✓
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">C&apos;est parti !</h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          Ton rapport profil <span className="text-violet-600 dark:text-violet-400 font-mono font-bold">{profileCode}</span> arrive dans ta boîte mail avec une sélection de formations personnalisées.
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 text-sm focus:outline-none focus:border-violet-400 dark:focus:border-violet-500/60 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-500/20 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
            Prénom *
          </label>
          <input
            type="text"
            required
            placeholder="Marie"
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
            Email *
          </label>
          <input
            type="email"
            required
            placeholder="marie@exemple.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1.5">
          Téléphone <span className="normal-case font-normal text-zinc-400 dark:text-zinc-600">(optionnel)</span>
        </label>
        <input
          type="tel"
          placeholder="06 12 34 56 78"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="flex items-start gap-3 pt-1">
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="sr-only"
          />
          <label
            htmlFor="consent"
            className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border transition-all ${
              consent
                ? "border-violet-600 bg-violet-600 dark:border-violet-500 dark:bg-violet-500"
                : "border-zinc-300 dark:border-white/20 bg-white dark:bg-white/[0.04] hover:border-violet-400 dark:hover:border-violet-500/50"
            }`}
          >
            {consent && <span className="text-white text-xs font-bold">✓</span>}
          </label>
        </div>
        <label htmlFor="consent" className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer leading-relaxed">
          J&apos;accepte d&apos;être recontacté(e) par des organismes de formation partenaires
          liés à mon profil <span className="text-violet-600 dark:text-violet-400 font-mono">{profileCode}</span>. Conformément au RGPD, tu peux retirer ton consentement à tout moment.
        </label>
      </div>

      {status === "error" && (
        <p className="text-xs text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg px-3 py-2">
          Une erreur s&apos;est produite. Réessaie dans quelques secondes.
        </p>
      )}

      <button
        type="submit"
        disabled={!consent || status === "loading"}
        className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-colors shadow-lg shadow-violet-600/20 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
      >
        {status === "loading" ? "Envoi en cours…" : "Recevoir mon rapport gratuit →"}
      </button>

      <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center">
        Aucun spam · Données non revendues
      </p>
    </form>
  );
}
