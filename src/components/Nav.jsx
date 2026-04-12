import { useState, useEffect } from 'react'

const links = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About',     href: '#about' },
  { label: 'Packages',  href: '#packages' },
  { label: 'Contact',   href: '#contact' },
]

export default function Nav() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = links.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  // On hero (not scrolled): white text on transparent bg
  // After scroll: dark text on cream bg
  const isLight = !scrolled

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-5 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-[0_1px_0_rgba(56,56,49,0.07)]'
          : 'bg-transparent'
      }`}
    >
      {/* Wordmark */}
      <a
        href="#"
        className={`font-headline text-xl md:text-2xl uppercase tracking-[0.22em] select-none transition-colors duration-500 ${
          isLight ? 'text-white' : 'text-on-surface'
        }`}
      >
        Angus Wu
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`nav-link transition-colors duration-500 ${
              isLight
                ? activeSection === href.slice(1)
                  ? 'text-white border-b border-white/50 pb-0.5'
                  : 'text-white/70 hover:text-white'
                : activeSection === href.slice(1)
                  ? 'text-on-surface link-gold'
                  : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="#contact"
        className={`hidden md:inline-block px-7 py-2.5 text-[0.65rem] uppercase tracking-widest2 font-body transition-all duration-500 ${
          isLight
            ? 'border border-white/40 text-white hover:bg-white/15'
            : 'border border-on-surface/20 text-on-surface hover:bg-on-surface hover:text-background'
        }`}
      >
        Book a Session
      </a>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className={`block h-px w-6 transition-all duration-300 ${isLight ? 'bg-white' : 'bg-on-surface'} ${
              menuOpen && i === 0 ? 'rotate-45 translate-y-2.5'  :
              menuOpen && i === 1 ? 'opacity-0'                   :
              menuOpen && i === 2 ? '-rotate-45 -translate-y-2.5' : ''
            }`}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-background/96 backdrop-blur-md border-t border-outline-variant/20 transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 py-6' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="nav-link text-on-surface-variant hover:text-on-surface"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 border border-on-surface/20 text-on-surface px-8 py-3 text-[0.65rem] uppercase tracking-widest2 font-body hover:bg-on-surface hover:text-background transition-all duration-500"
          >
            Book a Session
          </a>
        </div>
      </div>
    </nav>
  )
}
