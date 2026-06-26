"use client";

import { useState } from "react";

interface LeadFormProps {
  profileCode: string;
  topCareer: string;
}

export default function LeadForm({ profileCode, topCareer }: LeadFormProps) {
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
        body: JSON.stringify({ ...form, profileCode, topCareer }),
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
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl mx-auto mb-4">
          ✓
        </div>
        <h3 className="text-lg font-bold text-white mb-2">C&apos;est parti !</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Ton rapport profil <span className="text-violet-400 font-mono font-bold">{profileCode}</span> arrive dans ta boîte mail avec une sélection de formations personnalisées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Prénom *
          </label>
          <input
            type="text"
            required
            placeholder="Marie"
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Email *
          </label>
          <input
            type="email"
            required
            placeholder="marie@exemple.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Téléphone <span className="normal-case font-normal text-slate-600">(optionnel)</span>
        </label>
        <input
          type="tel"
          placeholder="06 12 34 56 78"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06] transition-all"
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
                ? "border-violet-500 bg-violet-500"
                : "border-white/20 bg-white/[0.04] hover:border-violet-500/50"
            }`}
          >
            {consent && <span className="text-white text-xs">✓</span>}
          </label>
        </div>
        <label htmlFor="consent" className="text-xs text-slate-500 cursor-pointer leading-relaxed">
          J&apos;accepte d&apos;être recontacté(e) par des organismes de formation partenaires
          liés à mon profil <span className="text-violet-400 font-mono">{profileCode}</span>. Conformément au RGPD, tu peux retirer ton consentement à tout moment.
        </label>
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          Une erreur s&apos;est produite. Réessaie dans quelques secondes.
        </p>
      )}

      <button
        type="submit"
        disabled={!consent || status === "loading"}
        className="group relative w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed mt-1"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 transition-opacity" />
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-violet-500 to-cyan-400 blur-lg transition-opacity" />
        <span className="relative">
          {status === "loading" ? "Envoi en cours…" : "Recevoir mon rapport gratuit →"}
        </span>
      </button>

      <p className="text-xs text-slate-700 text-center">
        Aucun spam · Données non revendues
      </p>
    </form>
  );
}
