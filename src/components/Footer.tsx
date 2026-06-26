import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">ma</span>
            <span className="text-white">vocation</span>
          </span>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            <Link href="/mentions-legales" className="hover:text-slate-400 transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-slate-400 transition-colors">
              Politique de confidentialité
            </Link>
            <a href="mailto:vilmenmatthieu@gmail.com" className="hover:text-slate-400 transition-colors">
              Contact
            </a>
          </nav>

          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} Mavocation
          </p>
        </div>

        {/* AI transparency notice */}
        <div className="mt-6 pt-5 border-t border-white/[0.04]">
          <p className="text-[10px] text-slate-700 text-center leading-relaxed max-w-2xl mx-auto">
            Les résultats de ce quiz sont générés par un algorithme basé sur le modèle RIASEC (Holland). Ils ont une valeur indicative et ne constituent pas un conseil d&apos;orientation professionnel. Conformément au RGPD art. 22, aucune décision automatisée n&apos;a de caractère contraignant.
          </p>
        </div>
      </div>
    </footer>
  );
}
