import { useRef, useEffect } from 'react'

export default function About() {
  const textRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    const els = [textRef.current, imgRef.current]
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="py-28 md:py-40 overflow-hidden bg-surface-container">
      <div className="max-w-screen-xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20 items-center">

        {/* Image side */}
        <div ref={imgRef} className="reveal md:col-span-7 relative">
          <div className="absolute -top-8 -left-8 w-48 h-48 md:w-64 md:h-64 bg-surface-container-highest/60 z-0" />
          <img
            src="/images/engagements/e3.jpg"
            alt="Vancouver engagement photography by Angus Wu"
            className="relative z-10 w-full aspect-[4/5] object-cover"
          />
          {/* Floating badge */}
          <div className="absolute bottom-6 -right-0 md:-right-6 z-20 bg-background px-6 py-4 border border-outline-variant/30 shadow-sm">
            <p className="font-headline italic text-2xl text-on-surface">10</p>
            <p className="font-body text-[0.6rem] uppercase tracking-widest text-on-surface-variant mt-0.5 leading-snug">
              years understanding<br />people
            </p>
          </div>
        </div>

        {/* Text side */}
        <div ref={textRef} className="reveal md:col-span-5 space-y-8">
          <span className="section-label">The Photographer</span>

          <h2 className="text-5xl md:text-6xl font-headline italic leading-[1.08] text-on-surface">
            Our<br />Philosophy
          </h2>

          <div className="space-y-5 max-w-md">
            <p className="font-body text-base leading-relaxed text-on-surface-variant">
              I believe beauty exists in the spaces between the poses — in a stolen glance, a nervous laugh, a hand held just a little tighter.
            </p>
            <p className="font-body text-sm leading-loose text-on-surface-variant">
              10 years of being trusted with people's most vulnerable moments. Your wedding day is the easy version.
            </p>
            <p className="font-body text-[0.7rem] leading-loose text-on-surface-variant uppercase tracking-widest">
              Natural light. Real emotion. No stiff smiles.
            </p>
          </div>

          {/* Language badges */}
          <div className="flex gap-3 pt-2 flex-wrap">
            {['English', '廣東話', '普通話'].map(lang => (
              <span
                key={lang}
                className="border border-outline-variant text-on-surface-variant font-body text-[0.62rem] uppercase tracking-wider px-3 py-1.5"
              >
                {lang}
              </span>
            ))}
          </div>

          <div className="pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 group link-gold text-[0.65rem] uppercase tracking-widest2 font-body text-on-surface"
            >
              Let&apos;s talk
              <svg
                className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300"
                fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
