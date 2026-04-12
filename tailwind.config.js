/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand palette from Stitch design system
        background:   '#fffcf7',
        surface:      '#fffcf7',
        'surface-container':         '#f6f4ec',
        'surface-container-low':     '#fcf9f3',
        'surface-container-high':    '#f0eee5',
        'surface-container-highest': '#eae8de',
        'surface-variant':           '#eae8de',
        'surface-dim':               '#e4e3d7',
        'on-surface':          '#383831',
        'on-surface-variant':  '#65655c',
        primary:               '#5f5e5e',
        'on-primary':          '#faf7f6',
        'primary-container':   '#e4e2e1',
        secondary:             '#7b6100',
        'secondary-dim':       '#6c5600',
        'secondary-container': '#ffe088',
        'secondary-fixed':     '#ffe088',
        'secondary-fixed-dim': '#f8d056',
        'on-secondary':        '#ffffff',
        tertiary:              '#646462',
        'tertiary-container':  '#f5f3ef',
        outline:               '#818178',
        'outline-variant':     '#babab0',
        // Gold accent shorthands
        gold:    '#D4AF37',
        'gold-dim': '#7b6100',
      },
      fontFamily: {
        headline: ['"Cormorant Garamond"', 'serif'],
        body:     ['"DM Sans"', 'sans-serif'],
        label:    ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none:    '0px',
        sm:      '0px',
        md:      '0px',
        lg:      '0px',
        xl:      '0px',
        '2xl':   '0px',
        full:    '9999px',
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.4em',
        widest4: '0.5em',
      },
      transitionDuration: {
        700: '700ms',
        1000: '1000ms',
      },
      animation: {
        'fade-up': 'fadeSlideUp 0.9s ease-out forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
