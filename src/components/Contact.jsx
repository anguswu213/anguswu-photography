import { useRef, useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// SETUP: Replace the placeholder below with your Formspree endpoint.
// 1. Go to https://formspree.io  →  sign up free  →  "+ New Form"
// 2. Name it "Contact", set email to hello@anguswu.ca  →  Create Form
// 3. Copy the endpoint URL (looks like https://formspree.io/f/abcdefgh)
// 4. Paste it here:
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgoqynr'
// ─────────────────────────────────────────────────────────────────────────────

const sessionTypes    = ['Wedding', 'Engagement', 'Family', 'Other']
const hearAboutOptions = ['Instagram', 'Google', 'Friend / Referral', 'Other']
const languages       = ['English', 'Cantonese', 'Mandarin']

const inputBase =
  'w-full bg-transparent border-b border-outline-variant focus:border-on-surface outline-none py-2.5 font-body text-sm text-on-surface placeholder:text-on-surface-variant/35 transition-colors duration-300'

const labelBase =
  'font-body text-[0.62rem] uppercase tracking-widest text-on-surface-variant'

export default function Contact() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const [form, setForm] = useState({
    name:        '',
    isPlanner:   false,
    email:       '',
    mobile:      '',
    sessionType: '',
    date:        '',
    venue:       '',
    hearAbout:   '',
    message:     '',
    language:    '',
  })

  useEffect(() => {
    const els = [leftRef.current, rightRef.current]
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')

    // If Formspree not yet configured, fall back to mailto so form still works locally
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent(`Photography Enquiry — ${form.name}`)
      const body = encodeURIComponent([
        `Name: ${form.name}`,
        form.isPlanner ? '(Planner enquiring on behalf of couple)' : '',
        `Email: ${form.email}`,
        `Mobile: ${form.mobile}`,
        `Session: ${form.sessionType}`,
        `Date: ${form.date}`,
        `Venue: ${form.venue}`,
        `How they heard: ${form.hearAbout}`,
        `Language: ${form.language}`,
        `\nMessage:\n${form.message}`,
      ].filter(Boolean).join('\n'))
      window.location.href = `mailto:hello@anguswu.ca?subject=${subject}&body=${body}`
      setStatus('success')
      return
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:         form.name,
          _replyto:     form.email,
          mobile:       form.mobile,
          planner:      form.isPlanner ? 'Yes — enquiring on behalf of couple' : 'No',
          session_type: form.sessionType,
          date:         form.date,
          venue:        form.venue,
          how_heard:    form.hearAbout,
          language:     form.language,
          message:      form.message,
          // Subject line Formspree will use
          _subject:     `Photography Enquiry — ${form.name} (${form.sessionType})`,
        }),
      })
      if (res.ok) setStatus('success')
      else        setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-28 md:py-40 bg-surface-container-high">
      <div className="max-w-screen-xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* ── Left — CTA copy ───────────────────────────────── */}
        <div ref={leftRef} className="reveal space-y-8">
          <span className="section-label">Get in Touch</span>

          <h2 className="text-5xl md:text-6xl font-headline italic leading-tight text-on-surface">
            Shall we begin<br />your journey?
          </h2>

          <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-sm">
            Taking <strong className="text-on-surface font-normal">2 more weddings</strong> in 2026.
            Send me your date and let's figure out what fits.
          </p>

          <div className="space-y-4 pt-2">
            <a href="mailto:hello@anguswu.ca" className="flex items-center gap-4 group">
              <span className="w-8 h-px bg-outline-variant group-hover:w-12 group-hover:bg-secondary transition-all duration-400" />
              <span className="font-body text-xs uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
                hello@anguswu.ca
              </span>
            </a>
            <a
              href="https://instagram.com/angus.w.photography"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="w-8 h-px bg-outline-variant group-hover:w-12 group-hover:bg-secondary transition-all duration-400" />
              <span className="font-body text-xs uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors duration-300">
                @angus.w.photography
              </span>
            </a>
          </div>

          <div className="border-l-2 border-secondary pl-5">
            <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant leading-relaxed">
              Booking 2026 · 2027<br />
              <span className="text-secondary">Cherry blossom season filling fast</span>
            </p>
          </div>

          <div className="aspect-[16/9] overflow-hidden hidden md:block mt-4">
            <img
              src="/images/engagements/christy-gordon/DSC03319.jpg"
              alt="Vancouver engagement photography"
              loading="lazy"
              className="w-full h-full object-cover img-zoom"
            />
          </div>
        </div>

        {/* ── Right — Contact form ──────────────────────────── */}
        <div ref={rightRef} className="reveal" style={{ transitionDelay: '120ms' }}>

          {status === 'success' ? (
            <div className="flex flex-col items-start justify-center h-full space-y-4 py-20">
              <span className="section-label">Message received</span>
              <h3 className="font-headline italic text-4xl text-on-surface">Thank you — I'll be in touch soon.</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-xs">
                Your enquiry has been sent to hello@anguswu.ca. I'll get back to you within 1–2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">

              {/* YOUR NAME */}
              <div className="space-y-1.5">
                <label className={labelBase}>Your Name <span className="text-secondary">*</span></label>
                <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                <input
                  type="text" required placeholder="Your full name"
                  value={form.name} onChange={e => set('name', e.target.value)}
                  className={inputBase}
                />
              </div>

              {/* FOR PLANNER */}
              <div className="space-y-1.5">
                <label className={labelBase}>For Planner</label>
                <div className="w-8 h-px bg-outline-variant/40 mb-2" />
                <label className="flex items-center gap-3 cursor-pointer group">
                  <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${form.isPlanner ? 'border-on-surface bg-on-surface' : 'border-outline-variant group-hover:border-on-surface'}`}>
                    {form.isPlanner && <span className="text-background text-[9px] leading-none">✓</span>}
                  </span>
                  <input type="checkbox" className="sr-only" checked={form.isPlanner} onChange={e => set('isPlanner', e.target.checked)} />
                  <span className="font-body text-xs text-on-surface-variant">I'm a planner inquiring on behalf of the couple</span>
                </label>
              </div>

              {/* EMAIL + MOBILE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div className="space-y-1.5">
                  <label className={labelBase}>Email Address <span className="text-secondary">*</span></label>
                  <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                  <input
                    type="email" required placeholder="your@email.com"
                    value={form.email} onChange={e => set('email', e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelBase}>Mobile Number <span className="text-secondary">*</span></label>
                  <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                  <input
                    type="tel" required placeholder="+1 (604) 000-0000"
                    value={form.mobile} onChange={e => set('mobile', e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* SESSION TYPE */}
              <div className="space-y-2">
                <label className={labelBase}>What type of session are you looking for? <span className="text-secondary">*</span></label>
                <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-1">
                  {sessionTypes.map(type => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                      <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${form.sessionType === type ? 'border-on-surface' : 'border-outline-variant group-hover:border-on-surface'}`}>
                        {form.sessionType === type && <span className="w-1.5 h-1.5 rounded-full bg-on-surface block" />}
                      </span>
                      <input type="radio" name="sessionType" className="sr-only" value={type} onChange={() => set('sessionType', type)} />
                      <span className="font-body text-xs text-on-surface-variant">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DATE + VENUE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div className="space-y-1.5">
                  <label className={labelBase}>Date of Event <span className="text-secondary">*</span></label>
                  <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                  <input
                    type="text" required placeholder="MM/DD/YYYY or TBD"
                    value={form.date} onChange={e => set('date', e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelBase}>Venue(s)</label>
                  <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                  <input
                    type="text" placeholder="or places in mind"
                    value={form.venue} onChange={e => set('venue', e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* HOW DID YOU HEAR */}
              <div className="space-y-1.5">
                <label className={labelBase}>How did you hear about me?</label>
                <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                <div className="relative">
                  <select
                    value={form.hearAbout}
                    onChange={e => set('hearAbout', e.target.value)}
                    className={`${inputBase} appearance-none pr-8 cursor-pointer bg-transparent`}
                  >
                    <option value="" disabled>Select option</option>
                    {hearAboutOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <svg className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="square" d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="space-y-1.5">
                <label className={labelBase}>Message <span className="text-secondary">*</span></label>
                <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                <textarea
                  required rows={4} placeholder="Tell me what you have planned"
                  value={form.message} onChange={e => set('message', e.target.value)}
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* PREFERRED LANGUAGE */}
              <div className="space-y-2">
                <label className={labelBase}>Preferred Communication Language <span className="text-secondary">*</span></label>
                <div className="w-8 h-px bg-outline-variant/40 mb-1" />
                <div className="flex gap-6 pt-1">
                  {languages.map(lang => (
                    <label key={lang} className="flex items-center gap-2.5 cursor-pointer group">
                      <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${form.language === lang ? 'border-on-surface' : 'border-outline-variant group-hover:border-on-surface'}`}>
                        {form.language === lang && <span className="w-1.5 h-1.5 rounded-full bg-on-surface block" />}
                      </span>
                      <input type="radio" name="language" className="sr-only" value={lang} onChange={() => set('language', lang)} />
                      <span className="font-body text-xs text-on-surface-variant">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-on-surface text-background px-12 py-4 text-[0.62rem] uppercase tracking-widest2 font-body hover:bg-secondary transition-all duration-500 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
                {status === 'error' && (
                  <p className="font-body text-xs text-red-600">
                    Something went wrong — please email hello@anguswu.ca directly.
                  </p>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  )
}
