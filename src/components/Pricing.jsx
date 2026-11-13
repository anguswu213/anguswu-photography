import { useState, useRef, useEffect } from 'react'

const engagementTiers = [
  {
    name: 'Timeless',
    price: '$588',
    tagline: 'The essentials, beautifully done.',
    includes: [
      '1.5 hr shoot',
      '40 edited photos',
      'Delivered within 2 weeks',
      'Google Drive or iCloud gallery',
    ],
  },
  {
    name: 'Editorial',
    price: '$868',
    tagline: 'The smart middle choice.',
    includes: [
      '30-min pre-shoot consultation',
      '2 hr shoot',
      '50 edited photos',
      '3-day sneak peek',
      'Delivered within 1 week',
    ],
  },
  {
    name: 'Prestige',
    price: '$1,288',
    tagline: 'Photos tonight. Not in two months.',
    featured: true,
    includes: [
      '30-min pre-shoot consultation',
      '2 hr shoot',
      '60 edited photos',
      'Same-night delivery',
      '30-sec BTS clip',
    ],
  },
]

const weddingTiers = [
  {
    name: 'Intimate',
    price: '$1,188',
    tagline: 'For the ceremony that matters most.',
    includes: [
      '3 hr coverage',
      '50 edited photos',
      'Delivered within 4 weeks',
      'Google Drive or iCloud gallery',
    ],
  },
  {
    name: 'Classic',
    price: '$2,488',
    tagline: 'Full day, full story.',
    includes: [
      '6 hr coverage',
      '60 edited photos',
      '3-day sneak peek',
      'Delivered within 2 weeks',
    ],
  },
  {
    name: 'Signature',
    price: '$3,688',
    tagline: 'The full experience. Same-night magic.',
    featured: true,
    includes: [
      '8 hr coverage',
      '30-min pre-shoot consultation',
      '80 edited photos',
      'Same-night preview (10 photos)',
      'Full gallery within 1 week',
    ],
  },
]

const maternityTiers = [
  {
    name: 'Bloom',
    price: '$528',
    tagline: 'A gentle hour, just the glow.',
    includes: [
      '1 hr shoot',
      '40 edited photos',
      'Delivered within 2 weeks',
      'Google Drive or iCloud gallery',
    ],
  },
  {
    name: 'Halo',
    price: '$728',
    tagline: 'More time, more story.',
    featured: true,
    includes: [
      '1.5 hr shoot',
      '60 edited photos',
      'Same-night preview',
      'Delivered within 1 week',
    ],
  },
]

function PricingCard({ tier, index }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  if (tier.featured) {
    // Dark featured card
    return (
      <div
        ref={ref}
        className="reveal pricing-card featured flex flex-col p-8 md:p-10"
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="section-label text-secondary-fixed-dim">{tier.name}</span>
            <p className="font-body text-xs text-white/50 mt-2 uppercase tracking-wider">{tier.tagline}</p>
          </div>
          <span className="font-headline italic text-3xl text-white">{tier.price}</span>
        </div>
        <hr className="divider-gold mb-8" />
        <ul className="space-y-3 flex-1">
          {tier.includes.map(item => (
            <li key={item} className="flex items-start gap-3 font-body text-xs text-white/70 tracking-wide">
              <span className="mt-1 w-1 h-1 rounded-full bg-secondary-fixed-dim flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="mt-10 block text-center border border-secondary-fixed-dim text-secondary-fixed-dim px-6 py-3.5 text-[0.62rem] uppercase tracking-widest2 font-body hover:bg-secondary-fixed-dim hover:text-on-surface transition-all duration-500"
        >
          Enquire
        </a>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="reveal pricing-card flex flex-col p-8 md:p-10"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="section-label">{tier.name}</span>
          <p className="font-body text-xs text-on-surface-variant mt-2 uppercase tracking-wider">{tier.tagline}</p>
        </div>
        <span className="font-headline italic text-3xl text-on-surface">{tier.price}</span>
      </div>
      <hr className="divider-gold mb-8" />
      <ul className="space-y-3 flex-1">
        {tier.includes.map(item => (
          <li key={item} className="flex items-start gap-3 font-body text-xs text-on-surface-variant tracking-wide">
            <span className="mt-1 w-1 h-1 rounded-full bg-secondary flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="mt-10 block text-center border border-outline-variant text-on-surface px-6 py-3.5 text-[0.62rem] uppercase tracking-widest2 font-body hover:bg-on-surface hover:text-background transition-all duration-500"
      >
        Enquire
      </a>
    </div>
  )
}

export default function Pricing() {
  const [tab, setTab] = useState('engagement')
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

  const tiers = tab === 'engagement' ? engagementTiers : tab === 'wedding' ? weddingTiers : maternityTiers

  return (
    <section id="packages" className="py-28 md:py-40 px-8 md:px-12 bg-surface">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="reveal mb-16 md:mb-20">
          <span className="section-label mb-4 block">Investment &amp; Packages</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-7xl font-headline italic leading-tight text-on-surface">
              Curated<br />Collections
            </h2>
            <p className="text-on-surface-variant font-body text-xs uppercase tracking-widest max-w-xs leading-relaxed">
              Transparent pricing. No awkward surprises, promise.
            </p>
          </div>
        </div>

        {/* Tab toggle */}
        <div className="flex gap-0 mb-12 border border-outline-variant w-fit">
          {[['engagement', 'Engagement'], ['wedding', 'Wedding'], ['maternity', 'Maternity']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setTab(val)}
              className={`px-8 py-3 text-[0.62rem] uppercase tracking-widest2 font-body transition-all duration-300 ${
                tab === val
                  ? 'bg-on-surface text-background'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className={`grid grid-cols-1 gap-4 md:gap-6 ${tab === 'maternity' ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-3'}`}>
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Micro wedding strip (wedding tab only) */}
        {tab === 'wedding' && (
          <div className="mt-6 border border-outline-variant px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="section-label">Micro Wedding</span>
              <p className="font-body text-xs text-on-surface-variant mt-2 leading-relaxed">
                Signing ceremonies &amp; elopements — 2 hr coverage, 30 edited photos, online gallery.
              </p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <span className="font-headline italic text-3xl text-on-surface">$868</span>
              <a
                href="#contact"
                className="border border-outline-variant text-on-surface px-6 py-3 text-[0.62rem] uppercase tracking-widest2 font-body hover:bg-on-surface hover:text-background transition-all duration-500"
              >
                Enquire
              </a>
            </div>
          </div>
        )}

        {/* Bundle note */}
        <div className="mt-10 text-center">
          <p className="font-body text-xs text-on-surface-variant uppercase tracking-widest">
            Book engagement + wedding together —{' '}
            <span className="text-secondary font-medium">$200 off</span>
          </p>
        </div>

      </div>
    </section>
  )
}
