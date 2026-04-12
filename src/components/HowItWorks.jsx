import { useRef, useEffect } from 'react'

const steps = [
  {
    number: '01',
    title: 'Say Hi',
    body: 'DM me your date and what you have in mind. No pressure — just a conversation.',
    img: '/images/process/step1.jpg',
  },
  {
    number: '02',
    title: 'Quick Chat',
    body: "We'll hop on a call or chat over DM. I'll learn about you, your day, and what matters most. Nothing important gets missed.",
    img: '/images/process/step2.jpg',
  },
  {
    number: '03',
    title: 'Show Up & Be Yourselves',
    body: "I'll guide you through it — no awkward posing, no stiff smiles. And yes, I'll crack a few jokes.",
    img: '/images/process/step3.jpg',
  },
  {
    number: '04',
    title: 'Receive Your Gallery',
    body: 'Within 2 weeks — or same night if you booked Prestige or Signature. Ready to screenshot, print, and send to your friends.',
    img: '/images/process/step4.jpg',
  },
]

export default function HowItWorks() {
  const refs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-28 md:py-36 px-8 md:px-12 bg-surface-container-low">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div
          ref={el => refs.current[0] = el}
          className="reveal mb-16 md:mb-24"
        >
          <span className="section-label mb-4 block">The Process</span>
          <h2 className="text-5xl md:text-6xl font-headline italic text-on-surface leading-tight">
            Booking me is easier<br className="hidden md:block" /> than you think.
          </h2>
        </div>

        {/* 4-step alternating layout */}
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0
            return (
              <div
                key={step.number}
                ref={el => refs.current[i + 1] = el}
                className="reveal mb-16 md:mb-0 md:grid md:grid-cols-2 md:gap-0 md:items-stretch"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Image — conditionally left or right */}
                <div className={`overflow-hidden aspect-[4/3] md:aspect-auto ${!isEven ? 'md:order-last' : ''}`}>
                  <img
                    src={step.img}
                    alt={step.title}
                    loading="lazy"
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>

                {/* Text panel */}
                <div className={`flex flex-col justify-center px-8 md:px-16 py-12 md:py-20 bg-surface-container ${
                  !isEven ? 'md:order-first' : ''
                }`}>
                  <span className="font-headline italic text-7xl md:text-9xl text-on-surface/08 leading-none select-none -mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-headline italic text-3xl md:text-4xl text-on-surface mt-2 mb-5">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-sm">
                    {step.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
