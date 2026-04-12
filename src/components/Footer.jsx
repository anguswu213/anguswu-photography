export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-highest py-16 px-8 md:px-12 tonal-shift">
      <div className="max-w-screen-xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 pb-12 border-b border-outline-variant/30">

          {/* Brand */}
          <div className="space-y-2">
            <p className="font-headline text-xl uppercase tracking-[0.22em] text-on-surface">
              Angus Wu Photography
            </p>
            <p className="font-body text-[0.62rem] uppercase tracking-widest text-on-surface-variant">
              Vancouver, BC · natural light. natural moments.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-8">
            {[['Portfolio', '#portfolio'], ['About', '#about'], ['Packages', '#packages'], ['Contact', '#contact']].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="font-body text-[0.62rem] uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-6">
            <a
              href="https://instagram.com/angus.w.photography"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[0.62rem] uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="mailto:hello@anguswu.ca"
              className="font-body text-[0.62rem] uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10">
          <p className="font-body text-[0.58rem] uppercase tracking-widest text-on-surface-variant/60">
            © {year} Angus Wu Photography. All rights reserved.
          </p>
          <p className="font-body text-[0.58rem] uppercase tracking-widest text-on-surface-variant/60">
            English · 廣東話 · 普通話
          </p>
        </div>

      </div>
    </footer>
  )
}
