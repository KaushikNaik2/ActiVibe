/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
          dark: '#047857',
          mid: '#10B981',
        },
        ink: {
          DEFAULT: '#0F0E17',
          light: '#3D3A54',
          muted: '#7B78A0',
        },
        surface: {
          DEFAULT: '#FEFFF8',
          dark: '#0F0E17',
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1A1828',
        },
        border: {
          DEFAULT: '#E4E4F0',
          dark: '#2D2B45',
        },
        green: {
          DEFAULT: '#059669',
          light: '#D1FAE5',
        },
        amber: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
        },
        red: {
          DEFAULT: '#DC2626',
        },
        teal: {
          DEFAULT: '#0D9488',
          light: '#CCFBF1',
        },
      },
      fontFamily: {
        inter: ['Inter'],
        'inter-bold': ['Inter_700Bold'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-extrabold': ['Inter_800ExtraBold'],
        mono: ['SpaceMono'],
      },
      fontSize: {
        'display': ['32px', { lineHeight: '38px', fontWeight: '800' }],
        'h1': ['26px', { lineHeight: '32px', fontWeight: '700' }],
        'h2': ['20px', { lineHeight: '26px', fontWeight: '700' }],
        'h3': ['17px', { lineHeight: '22px', fontWeight: '600' }],
        'body': ['15px', { lineHeight: '22px', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'caption': ['11px', { lineHeight: '14px', fontWeight: '400' }],
        'btn': ['15px', { lineHeight: '20px', fontWeight: '600' }],
      },
      spacing: {
        'screen-pad': '16px',
        'card-pad': '16px',
        'gap-tight': '8px',
        'gap-cards': '12px',
        'gap-section': '24px',
      },
      borderRadius: {
        'sm-token': '8px',
        'md-token': '12px',
        'lg-token': '20px',
        'full-token': '9999px',
      },
    },
  },
  plugins: [],
};
