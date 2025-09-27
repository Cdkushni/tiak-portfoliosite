/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brutalist': {
          'black': '#000000',
          'white': '#ffffff',
          'gray': {
            '100': '#f5f5f5',
            '200': '#e5e5e5',
            '300': '#d4d4d4',
            '400': '#a3a3a3',
            '500': '#737373',
            '600': '#525252',
            '700': '#404040',
            '800': '#262626',
            '900': '#171717',
          }
        }
      },
          spacing: {
            '18': '4.5rem',
            '88': '22rem',
          },
          borderWidth: {
            '4': '4px',
          },
          lineClamp: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
          }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.brutalist-border': {
          border: '4px solid #000000',
        },
        '.brutalist-border-b-4': {
          'border-bottom': '4px solid #000000',
        },
        '.brutalist-shadow': {
          'box-shadow': '8px 8px 0px 0px #000',
        },
        '.brutalist-button': {
          'background-color': '#000000',
          color: '#ffffff',
          'padding-left': '1.5rem',
          'padding-right': '1.5rem',
          'padding-top': '0.75rem',
          'padding-bottom': '0.75rem',
          'font-weight': '700',
          'text-transform': 'uppercase',
          'letter-spacing': '0.05em',
          border: '4px solid #000000',
          'box-shadow': '8px 8px 0px 0px #000',
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translate(4px, 4px)',
            'box-shadow': 'none',
          }
        },
        '.brutalist-card': {
          'background-color': '#ffffff',
          border: '4px solid #000000',
          'box-shadow': '8px 8px 0px 0px #000',
          padding: '1.5rem',
        },
        '.grid-brutalist': {
          display: 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        },
            '.text-brutalist': {
              'font-weight': '800',
              'letter-spacing': '-0.02em',
            },
            '.line-clamp-1': {
              'display': '-webkit-box',
              '-webkit-line-clamp': '1',
              '-webkit-box-orient': 'vertical',
              'overflow': 'hidden',
            },
            '.line-clamp-2': {
              'display': '-webkit-box',
              '-webkit-line-clamp': '2',
              '-webkit-box-orient': 'vertical',
              'overflow': 'hidden',
            },
            '.line-clamp-3': {
              'display': '-webkit-box',
              '-webkit-line-clamp': '3',
              '-webkit-box-orient': 'vertical',
              'overflow': 'hidden',
            },
            '.sr-only': {
              'position': 'absolute',
              'width': '1px',
              'height': '1px',
              'padding': '0',
              'margin': '-1px',
              'overflow': 'hidden',
              'clip': 'rect(0, 0, 0, 0)',
              'white-space': 'nowrap',
              'border': '0',
            },
            '.focus\\:not-sr-only:focus': {
              'position': 'static',
              'width': 'auto',
              'height': 'auto',
              'padding': 'inherit',
              'margin': 'inherit',
              'overflow': 'visible',
              'clip': 'auto',
              'white-space': 'normal',
            },
            '.touch-manipulation': {
              'touch-action': 'manipulation',
            },
      }
      addUtilities(newUtilities)
    }
  ],
}
