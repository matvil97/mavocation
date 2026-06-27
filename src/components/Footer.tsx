import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-white/[0.06] mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold">
            <span className="text-violet-600 dark:text-violet-400">ma</span>
            <span>vocation</span>
          </span>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 dark:text-zinc-500">
            <Link href="/mentions-legales" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Politique de confidentialité
            </Link>
            <a href="mailto:vilmenmatthieu@gmail.com" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Contact
            </a>
          </nav>

          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Mavocation
          </p>
        </div>

        {/* AI transparency notice */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-white/[0.04]">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-600 text-center leading-relaxed max-w-2xl mx-auto">
            Les résultats de ce quiz sont générés par un algorithme basé sur le modèle RIASEC (Holland). Ils ont une valeur indicative et ne constituent pas un conseil d&apos;orientation professionnel. Conformément au RGPD art. 22, aucune décision automatisée n&apos;a de caractère contraignant.
          </p>
        </div>
      </div>
    </footer>
  );
}
