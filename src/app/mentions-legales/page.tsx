import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales – Mavocation",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#07070f] text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Nav */}
        <div className="mb-12">
          <Link href="/" className="text-sm font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">ma</span>
            <span>vocation</span>
          </Link>
        </div>

        <div className="mb-10">
          <p className="text-[10px] font-bold tracking-[0.15em] text-violet-400 uppercase mb-2">Légal</p>
          <h1 className="text-3xl font-extrabold text-white">Mentions légales</h1>
        </div>

        <div className="space-y-10 text-sm text-slate-400 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-white mb-3">1. Éditeur du site</h2>
            <p>
              Le site <strong className="text-slate-300">mavocation.fr</strong> est édité à titre personnel par :
            </p>
            <div className="mt-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.03] space-y-1">
              <p><span className="text-slate-600">Nom :</span> <span className="text-slate-300">Vilmen Matthieu</span></p>
              <p><span className="text-slate-600">Statut :</span> <span className="text-slate-300">Particulier</span></p>
              <p>
                <span className="text-slate-600">Email :</span>{" "}
                <a href="mailto:vilmenmatthieu@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">
                  vilmenmatthieu@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3">2. Hébergeur</h2>
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.03] space-y-1">
              <p><span className="text-slate-600">Société :</span> <span className="text-slate-300">Vercel Inc.</span></p>
              <p><span className="text-slate-600">Adresse :</span> <span className="text-slate-300">340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</span></p>
              <p><span className="text-slate-600">Site :</span> <span className="text-slate-300">vercel.com</span></p>
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Les données de la base Supabase sont hébergées dans la région <strong className="text-slate-500">EU West (Irlande)</strong>, au sein de l&apos;Union européenne.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, graphismes, algorithmes, structure) est protégé par le droit d&apos;auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable de l&apos;éditeur.
            </p>
            <p className="mt-2">
              Le modèle RIASEC (Holland) est une méthode psychométrique dont la théorie est dans le domaine public. Les implémentations et contenus produits sur ce site restent la propriété de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3">4. Système algorithmique – Transparence IA</h2>
            <p>
              Conformément au <strong className="text-slate-300">Règlement européen sur l&apos;intelligence artificielle (EU AI Act, 2024)</strong> et aux recommandations du Ministère de l&apos;Éducation Nationale en matière de systèmes d&apos;orientation automatisés :
            </p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Ce site utilise un algorithme de scoring basé sur le modèle RIASEC de John L. Holland pour calculer un profil d'orientation professionnelle.",
                "Les résultats sont purement indicatifs. Ils n'ont aucune valeur contraignante et ne se substituent pas à un entretien avec un conseiller d'orientation agréé.",
                "L'algorithme ne collecte pas de données biométriques ni de données sensibles au sens de l'article 9 du RGPD.",
                "Aucune décision automatisée n'est prise au sens de l'article 22 du RGPD : les résultats sont une aide à la réflexion, non une décision.",
                "L'utilisateur peut contester ou ignorer les résultats à tout moment.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3">5. Limitation de responsabilité</h2>
            <p>
              L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées. Toutefois, il ne peut garantir l&apos;exhaustivité ni la précision des profils et recommandations générés. L&apos;utilisateur est seul responsable de l&apos;usage qu&apos;il fait des informations fournies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3">6. Droit applicable</h2>
            <p>
              Le présent site est soumis au droit français. Tout litige relatif à son utilisation sera soumis à la compétence exclusive des tribunaux français.
            </p>
          </section>

          <div className="pt-4 border-t border-white/[0.06]">
            <p className="text-xs text-slate-700">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
