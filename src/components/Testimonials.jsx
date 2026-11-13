import { useRef, useEffect } from 'react'

const testimonials = [
  {
    quote:
      'We enjoyed the session very much! You were very flexible with ideas and made us feel very comfortable, even though it was our first couple photo session ever. We also appreciate your speedy service — the turnaround time is superb! Highly recommend to anyone who is interested in Japanese-style photography :)) Thank you again!',
    name: 'Christy & Gordon',
    detail: 'Engagement · Stanley Park Cherry Blossom',
  },
  {
    quote:
      '辛苦晒 Angus 幫我哋影嘅 maternity photo，成品真心好靚！Angus 事前做好 research 幫我哋搵邊個地方影相靚，仲揀咗啱啱好嘅時間，影到好靚嘅 golden hour。佢亦會教我哋擺咩 pose，影得我哋好自然。佢又好有耐性，成個過程都影得好輕鬆。最後出嚟嘅相調色亦都好靚，啱晒我哋心水，多謝 Angus 幫我哋留低咁珍貴嘅回憶！',
    summary:
      'He researched the location and timed it perfectly for golden hour, guided our posing so everything felt natural, and was patient throughout — and we love the colour grading.',
    name: 'Sarah & Eric',
    detail: 'Maternity · Vancouver',
  },
]

export default function Testimonials() {
  const headerRef = useRef(null)

  useEffect(() => {
    if (!headerRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) headerRef.current.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="testimonials" className="py-28 md:py-40 px-8 md:px-12 bg-surface">
      <div className="max-w-screen-xl mx-auto">

        <div ref={headerRef} className="reveal mb-16 md:mb-20">
          <span className="section-label mb-4 block">Kind Words</span>
          <h2 className="text-5xl md:text-7xl font-headline italic leading-tight text-on-surface">
            From the<br />Couples
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map(t => (
            <figure key={t.name} className="border border-outline-variant p-8 md:p-10 flex flex-col">
              <span className="font-headline italic text-4xl text-secondary leading-none mb-6">&ldquo;</span>
              <blockquote className="font-body text-sm leading-loose text-on-surface-variant flex-1">
                {t.quote}
              </blockquote>
              {t.summary && (
                <p className="font-body text-xs leading-relaxed text-on-surface-variant/70 italic mt-5">
                  {t.summary}
                </p>
              )}
              <figcaption className="mt-8">
                <p className="font-headline italic text-xl text-on-surface">{t.name}</p>
                <p className="font-body text-[0.62rem] uppercase tracking-widest text-on-surface-variant mt-1">
                  {t.detail}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
