export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-surface-container-low">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/weddings/hero.jpg"
          alt="Vancouver wedding photography — natural light"
          className="w-full h-full object-cover brightness-[0.82] scale-[1.03] transition-transform duration-[8000ms]"
          style={{ transformOrigin: 'center center' }}
        />
        {/* Dual gradient: left for text legibility, bottom for attribution */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Text content */}
      <div className="relative z-10 text-left max-w-4xl px-10 md:px-20 animate-fade-up">
        <p className="text-white/60 font-body text-[0.62rem] uppercase tracking-[0.45em] mb-6">
          Vancouver · BC
        </p>

        <h1 className="text-[clamp(3.2rem,8vw,6.5rem)] text-white font-headline italic tracking-tight leading-[1.08] mb-8 [text-shadow:_0_2px_16px_rgba(0,0,0,0.25)]">
          natural light.<br />
          <span className="not-italic font-light">natural moments.</span>
        </h1>

        <p className="text-white/75 font-body font-light text-sm md:text-base tracking-wide mb-10 max-w-sm leading-relaxed">
          Wedding &amp; engagement photography rooted in real connection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#portfolio"
            className="glass-btn text-white px-10 py-4 text-[0.65rem] uppercase tracking-widest2 font-body hover:bg-white/25 transition-all duration-700 text-center"
          >
            View Portfolio
          </a>
          <a
            href="#packages"
            className="border border-white/40 text-white px-10 py-4 text-[0.65rem] uppercase tracking-widest2 font-body hover:bg-white/10 transition-all duration-500 text-center"
          >
            See Packages
          </a>
        </div>
      </div>

      {/* Bottom-left caption */}
      <div className="absolute bottom-10 left-10 md:left-20 z-10">
        <p className="text-[0.58rem] uppercase tracking-[0.4em] text-white/50 font-body">
          English · 廣東話 · 普通話
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[0.55rem] uppercase tracking-[0.35em] text-white font-body rotate-90 origin-center">Scroll</span>
        <div className="w-px h-10 bg-white/40 animate-pulse" />
      </div>
    </section>
  )
}
