import { useState, useRef, useEffect, useCallback } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────

const couples = [
  {
    id: 'christy-gordon',
    name: 'Christy & Gordon',
    location: 'Stanley Park · Cherry Blossom',
    category: 'Engagements',
    cover: '/images/engagements/christy-gordon/DSC03253.png',
    photos: [
      '/images/engagements/christy-gordon/DSC03253.png',
      '/images/engagements/christy-gordon/DSC03072.jpg',
      '/images/engagements/christy-gordon/DSC03128.jpg',
      '/images/engagements/christy-gordon/DSC03148.jpg',
      '/images/engagements/christy-gordon/DSC03161.jpg',
      '/images/engagements/christy-gordon/DSC03195.jpg',
      '/images/engagements/christy-gordon/DSC03201.jpg',
      '/images/engagements/christy-gordon/DSC03233.jpg',
      '/images/engagements/christy-gordon/DSC03244.jpg',
      '/images/engagements/christy-gordon/DSC03262.jpg',
      '/images/engagements/christy-gordon/DSC03269.jpg',
      '/images/engagements/christy-gordon/DSC03278.jpg',
      '/images/engagements/christy-gordon/DSC03319.jpg',
      '/images/engagements/christy-gordon/DSC03334.jpg',
      '/images/engagements/christy-gordon/DSC03371.jpg',
    ],
  },
  {
    id: 'mandy-hob',
    name: 'Mandy & Hob',
    location: 'Burnaby Mountain',
    category: 'Engagements',
    cover: '/images/engagements/mandy-hob/DSC02331.jpg',
    photos: [
      '/images/engagements/mandy-hob/DSC02186.jpg',
      '/images/engagements/mandy-hob/DSC02216.jpg',
      '/images/engagements/mandy-hob/DSC02229.jpg',
      '/images/engagements/mandy-hob/DSC02256.jpg',
      '/images/engagements/mandy-hob/DSC02279.jpg',
      '/images/engagements/mandy-hob/DSC02331.jpg',
    ],
  },
  {
    id: 'catherine-edward',
    name: 'Catherine & Edward',
    location: 'Vancouver, BC',
    category: 'Weddings',
    cover: '/images/weddings/catherine-edward/03.jpg',
    photos: [
      '/images/weddings/catherine-edward/01.jpg',
      '/images/weddings/catherine-edward/02.jpg',
      '/images/weddings/catherine-edward/03.jpg',
    ],
  },
  {
    id: 'michelle-bruce',
    name: 'Michelle & Bruce',
    location: 'Vancouver, BC',
    category: 'Weddings',
    cover: '/images/weddings/michelle-bruce/cover.jpg',
    photos: [
      '/images/weddings/michelle-bruce/01.jpg',
      '/images/weddings/michelle-bruce/02.jpg',
      '/images/weddings/michelle-bruce/03.jpg',
      '/images/weddings/michelle-bruce/04.jpg',
      '/images/weddings/michelle-bruce/05.jpg',
    ],
  },
  {
    id: 'kelly-joe',
    name: 'Kelly & Joe',
    location: 'At Home · Vancouver',
    category: 'Family',
    cover: '/images/family/kelly-joe/DSC02420.jpg',
    photos: [
      '/images/family/kelly-joe/DSC02420.jpg',
      '/images/family/kelly-joe/DSC02448.jpg',
      '/images/family/kelly-joe/DSC02454.jpg',
      '/images/family/kelly-joe/DSC02459.jpg',
    ],
  },
  {
    id: 'sabrina-ethan',
    name: 'Sabrina & Ethan',
    location: 'Vancouver, BC',
    category: 'Family',
    cover: '/images/family/sabrina-ethan/DSC01959.jpg',
    photos: [
      '/images/family/sabrina-ethan/DSC01898.jpg',
      '/images/family/sabrina-ethan/DSC01913.jpg',
      '/images/family/sabrina-ethan/DSC01929.jpg',
      '/images/family/sabrina-ethan/DSC01942.jpg',
      '/images/family/sabrina-ethan/DSC01945.jpg',
      '/images/family/sabrina-ethan/DSC01959.jpg',
    ],
  },
]

const categories = ['All', 'Weddings', 'Engagements', 'Family']

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ couple, onClose }) {
  const [idx, setIdx] = useState(0)

  const prev = useCallback(() => setIdx(i => (i - 1 + couple.photos.length) % couple.photos.length), [couple])
  const next = useCallback(() => setIdx(i => (i + 1) % couple.photos.length), [couple])

  // Keyboard nav
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [prev, next, onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-5 shrink-0">
        <div>
          <p className="font-headline italic text-white text-xl">{couple.name}</p>
          <p className="font-body text-[0.6rem] uppercase tracking-widest text-white/40 mt-0.5">{couple.location}</p>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-body text-[0.6rem] uppercase tracking-widest text-white/40">
            {idx + 1} / {couple.photos.length}
          </span>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors duration-200 text-2xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-16 min-h-0 relative">
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 z-10 text-white/50 hover:text-white transition-colors duration-200 p-3"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="square" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <img
          key={idx}
          src={couple.photos[idx]}
          alt={`${couple.name} — ${idx + 1}`}
          className="max-h-full max-w-full object-contain animate-fade-in"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        />

        <button
          onClick={next}
          className="absolute right-4 md:right-8 z-10 text-white/50 hover:text-white transition-colors duration-200 p-3"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="square" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 justify-center px-8 py-4 overflow-x-auto shrink-0">
        {couple.photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`shrink-0 w-12 h-12 overflow-hidden transition-all duration-200 ${
              i === idx ? 'ring-1 ring-white/70 opacity-100' : 'opacity-35 hover:opacity-70'
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Couple Card ─────────────────────────────────────────────────────────────

function CoupleCard({ couple, onOpen, index }) {
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

  return (
    <div
      ref={ref}
      className="reveal group cursor-pointer"
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
      onClick={() => onOpen(couple)}
    >
      {/* Cover image */}
      <div className="overflow-hidden bg-surface-variant aspect-[3/4] p-3 relative">
        <img
          src={couple.cover}
          alt={couple.name}
          loading="lazy"
          className="w-full h-full object-cover img-zoom"
        />
        {/* Hover overlay */}
        <div className="absolute inset-3 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-400 font-body text-[0.6rem] uppercase tracking-widest2 text-white border border-white/50 px-4 py-2">
            View Gallery
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="pl-3 border-l border-outline-variant/30 mt-4">
        <h3 className="font-headline italic text-xl text-on-surface">{couple.name}</h3>
        <p className="font-body text-[0.62rem] uppercase tracking-widest text-on-surface-variant mt-1">
          {couple.location}
        </p>
        <p className="font-body text-[0.58rem] uppercase tracking-widest text-secondary/70 mt-0.5">
          {couple.category}
        </p>
      </div>
    </div>
  )
}

// ─── Portfolio Section ────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active,        setActive]        = useState('All')
  const [openCouple,    setOpenCouple]    = useState(null)
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

  const filtered = active === 'All' ? couples : couples.filter(c => c.category === active)

  // 3-column masonry offset
  const col1 = filtered.filter((_, i) => i % 3 === 0)
  const col2 = filtered.filter((_, i) => i % 3 === 1)
  const col3 = filtered.filter((_, i) => i % 3 === 2)

  return (
    <>
      <section id="portfolio" className="py-28 md:py-36 px-8 md:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <div ref={headerRef} className="reveal flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-lg">
              <span className="section-label mb-4 block">The Portfolio</span>
              <h2 className="text-5xl md:text-7xl font-headline italic leading-tight text-on-surface">
                The Curated<br />Collection
              </h2>
            </div>
            <p className="text-on-surface-variant max-w-xs font-body text-xs uppercase tracking-widest leading-relaxed">
              A selection of moments where time stood still. Intimacy preserved in light and shadow.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 md:gap-3 mb-16 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-[0.62rem] uppercase tracking-widest2 font-body transition-all duration-300 ${
                  active === cat
                    ? 'bg-on-surface text-background'
                    : 'border border-outline-variant text-on-surface-variant hover:border-on-surface hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3-column masonry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14 items-start">
            <div className="space-y-10 md:space-y-14">
              {col1.map((c, i) => <CoupleCard key={c.id} couple={c} onOpen={setOpenCouple} index={i * 3} />)}
            </div>
            <div className="space-y-10 md:space-y-14 md:mt-20">
              {col2.map((c, i) => <CoupleCard key={c.id} couple={c} onOpen={setOpenCouple} index={i * 3 + 1} />)}
            </div>
            <div className="space-y-10 md:space-y-14">
              {col3.map((c, i) => <CoupleCard key={c.id} couple={c} onOpen={setOpenCouple} index={i * 3 + 2} />)}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {openCouple && (
        <Lightbox couple={openCouple} onClose={() => setOpenCouple(null)} />
      )}
    </>
  )
}
