import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité – Mavocation",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Nav */}
        <div className="mb-12">
          <Link href="/" className="text-sm font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">ma</span>
            <span>vocation</span>
          </Link>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-bold tracking-[0.15em] text-violet-600 dark:text-violet-400 uppercase mb-2">RGPD · EU AI Act</p>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">Politique de confidentialité</h1>
        </div>

        <div className="space-y-10 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">1. Responsable du traitement</h2>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03] space-y-1">
              <p><span className="text-zinc-500 dark:text-zinc-500">Responsable :</span> <span className="text-zinc-700 dark:text-zinc-300">Vilmen Matthieu</span></p>
              <p>
                <span className="text-zinc-500 dark:text-zinc-500">Contact DPO :</span>{" "}
                <a href="mailto:vilmenmatthieu@gmail.com" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
                  vilmenmatthieu@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">2. Données collectées</h2>
            <p className="mb-3">Mavocation collecte deux catégories de données :</p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03]">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Données du quiz (non persistées)</p>
                <p>Les réponses au quiz sont traitées <strong className="text-zinc-700 dark:text-zinc-300">uniquement dans ton navigateur</strong> (sessionStorage). Elles ne sont jamais envoyées ni stockées sur nos serveurs. Elles sont effacées dès la fermeture de l&apos;onglet.</p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03]">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Données de contact (formulaire de rapport)</p>
                <p className="mb-2">Si tu demandes ton rapport, les données suivantes sont collectées avec ton consentement explicite :</p>
                <ul className="space-y-1 list-none">
                  {[
                    ["Prénom", "Personnalisation du rapport"],
                    ["Email", "Envoi du rapport et contact des partenaires formations"],
                    ["Téléphone", "Contact optionnel par des organismes de formation (si fourni)"],
                    ["Code profil RIASEC", "Sélection de formations adaptées"],
                    ["Métier principal recommandé", "Affinage des recommandations"],
                  ].map(([donnee, finalite]) => (
                    <li key={donnee} className="flex items-start gap-2 text-xs">
                      <span className="text-violet-600 dark:text-violet-500 flex-shrink-0 mt-0.5">▸</span>
                      <span><strong className="text-slate-400">{donnee}</strong> — {finalite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">3. Base légale des traitements</h2>
            <div className="space-y-2">
              {[
                ["Traitement des réponses quiz", "Exécution du service (art. 6.1.b RGPD)", "Navigateur uniquement, non persisté"],
                ["Collecte des données de contact", "Consentement explicite (art. 6.1.a RGPD)", "Formulaire avec case à cocher obligatoire"],
                ["Transmission aux partenaires formations", "Consentement explicite (art. 6.1.a RGPD)", "Mentionné dans la case à cocher"],
              ].map(([traitement, base, note]) => (
                <div key={traitement} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs">
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300">{traitement}</p>
                  <p className="text-violet-400 mt-0.5">{base}</p>
                  <p className="text-zinc-500 dark:text-zinc-500 mt-0.5">{note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">4. Durée de conservation</h2>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03] space-y-2 text-xs">
              <p><span className="text-zinc-600 dark:text-zinc-400">Données du quiz :</span> <span className="text-zinc-700 dark:text-zinc-300">Durée de la session navigateur uniquement</span></p>
              <p><span className="text-zinc-600 dark:text-zinc-400">Données de contact :</span> <span className="text-zinc-700 dark:text-zinc-300">3 ans à compter du dernier contact</span></p>
              <p><span className="text-zinc-600 dark:text-zinc-400">Après expiration :</span> <span className="text-zinc-700 dark:text-zinc-300">Suppression définitive de la base de données</span></p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">5. Destinataires des données</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03]">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Sous-traitants techniques</p>
                <ul className="space-y-1 text-xs">
                  <li className="flex gap-2"><span className="text-zinc-500 dark:text-zinc-500 flex-shrink-0">Supabase Inc.</span><span>Stockage de la base de données — région EU (Irlande)</span></li>
                  <li className="flex gap-2"><span className="text-zinc-500 dark:text-zinc-500 flex-shrink-0">Vercel Inc.</span><span>Hébergement de l&apos;application — serveurs edge EU</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/[0.05]">
                <p className="font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Organismes de formation partenaires</p>
                <p className="text-xs">Tes données de contact (prénom, email, téléphone si fourni, profil RIASEC) peuvent être transmises à des organismes de formation sélectionnés, <strong className="text-zinc-700 dark:text-zinc-300">uniquement avec ton consentement explicite</strong> recueilli lors du formulaire. Tu peux retirer ce consentement à tout moment.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">6. Tes droits (RGPD art. 15 à 22)</h2>
            <p className="mb-3">Conformément au RGPD, tu disposes des droits suivants :</p>
            <ul className="space-y-2">
              {[
                ["Droit d'accès", "Obtenir une copie de tes données"],
                ["Droit de rectification", "Corriger tes données inexactes"],
                ["Droit à l'effacement", "Demander la suppression de tes données"],
                ["Droit d'opposition", "T'opposer au traitement à des fins de prospection"],
                ["Droit à la portabilité", "Recevoir tes données dans un format structuré"],
                ["Droit à l'explication", "Comprendre la logique de l'algorithme RIASEC appliqué à ton profil"],
                ["Droit de ne pas faire l'objet d'une décision automatisée contraignante", "Art. 22 RGPD — nos résultats sont indicatifs, non contraignants"],
              ].map(([droit, description]) => (
                <li key={droit} className="flex items-start gap-2.5 text-xs">
                  <span className="text-violet-600 dark:text-violet-500 flex-shrink-0 mt-0.5">▸</span>
                  <span><strong className="text-zinc-700 dark:text-zinc-300">{droit}</strong> — {description}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.03]">
              <p className="text-xs">Pour exercer ces droits, contacte-nous à{" "}
                <a href="mailto:vilmenmatthieu@gmail.com" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
                  vilmenmatthieu@gmail.com
                </a>{" "}
                avec l&apos;objet <strong className="text-zinc-700 dark:text-zinc-300">« Droits RGPD »</strong>. Réponse sous 30 jours maximum. Tu peux également adresser une réclamation à la <strong className="text-zinc-700 dark:text-zinc-300">CNIL</strong> (cnil.fr).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">7. Cookies</h2>
            <p>
              Ce site n&apos;utilise <strong className="text-zinc-700 dark:text-zinc-300">aucun cookie de traçage ou publicitaire</strong>. Le seul stockage utilisé est le <code className="text-violet-400 text-xs bg-violet-500/10 px-1.5 py-0.5 rounded">sessionStorage</code> du navigateur pour les réponses au quiz, effacé automatiquement en fin de session.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3">8. Sécurité</h2>
            <p>
              Les données sont transmises via HTTPS (TLS 1.3). L&apos;accès à la base de données est protégé par Row Level Security (RLS) Supabase. Seul l&apos;éditeur dispose d&apos;un accès aux données collectées.
            </p>
          </section>

          <div className="pt-4 border-t border-zinc-200 dark:border-white/[0.06]">
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-slate-400 transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
