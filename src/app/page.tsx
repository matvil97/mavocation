import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07070f] text-white flex flex-col overflow-hidden">

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative px-8 py-6 flex items-center max-w-5xl mx-auto w-full">
        <span className="text-lg font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            ma
          </span>
          <span className="text-white">vocation</span>
        </span>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Méthode RIASEC · Standard mondial
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 max-w-4xl">
          Trouve la carrière{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
            faite pour toi
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-lg leading-relaxed">
          20 questions. 5 minutes. Un profil scientifique + les métiers qui
          correspondent exactement à ta personnalité.
        </p>

        {/* CTA */}
        <Link
          href="/quiz"
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-300 group-hover:scale-105" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-violet-500 to-cyan-400 blur-xl transition-opacity duration-300" />
          <span className="relative">Démarrer le quiz gratuit</span>
          <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>

        <p className="mt-5 text-xs text-slate-600 tracking-wide">
          Gratuit · Sans inscription · Résultats immédiats
        </p>
      </div>

      {/* Features */}
      <div className="relative max-w-5xl mx-auto w-full px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "⬡",
              label: "SCIENTIFIQUE",
              title: "Méthode validée",
              desc: "Le modèle RIASEC de Holland est utilisé par les conseillers d'orientation du monde entier depuis 60 ans.",
            },
            {
              icon: "◈",
              label: "PERSONNALISÉ",
              title: "Profil unique",
              desc: "6 dimensions analysées. Ton code Holland personnel parmi des millions de combinaisons possibles.",
            },
            {
              icon: "◎",
              label: "ACTIONNABLE",
              title: "Formations adaptées",
              desc: "Reçois une sélection de formations finançables CPF, directement liées à ton profil.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-violet-400 text-xl font-light">{item.icon}</span>
                <span className="text-[10px] font-bold tracking-[0.15em] text-slate-600">{item.label}</span>
              </div>
              <h3 className="font-bold text-white mb-2 text-base">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
