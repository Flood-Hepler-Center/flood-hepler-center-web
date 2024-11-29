import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        helve: ['var(--font-helve)'],
      },
      lineHeight: {
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.3rem',
        11: '2.7rem',
        12: '3rem',
        13: '3.3rem',
        14: '3.5rem',
        15: '3.7rem',
      },
    },
    fontSize: {
      sm: '1.2rem',
      base: '1.4rem',
      md: '1.6rem',
      lg: '1.8rem',
      xl: '1.9rem',
      '2xl': '1.963rem',
      '3xl': '2.153rem',
      '4xl': '2.441rem',
      '5xl': '3.252rem',
      '6xl': '3.652rem',
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        fontSize: {
          tiny: '1.3rem', // text-tiny
          small: '1.4rem', // text-small
          medium: '1.6rem', // text-medium
          large: '2rem', // text-large
        },
        lineHeight: {
          tiny: '1rem', // text-tiny
          small: '1.25rem', // text-small
          medium: '1.3rem', // text-medium
          large: '1.5rem', // text-large
        },
        radius: {
          small: '8px', // rounded-small
          medium: '12px', // rounded-medium
          large: '14px', // rounded-large
        },
        borderWidth: {
          small: '1px', // border-small
          medium: '2px', // border-medium (default)
          large: '3px', // border-large
        },
      },
      themes: {
        light: {
          colors: {
            primary: '#0070f3',
            secondary: '#f81ce5',
            success: '#00d68f',
            warning: '#fbbc05',
            error: '#ff0080',
            accent: '#00d68f',
            background: '#f4f5f7',
            surface: '#e4e5e7',
            divider: '#e1e3e6',
            text: '#000000',
            placeholder: '#6e7191',
            icon: '#6e7191',
            disabled: '#6e7191',
            shadow: 'rgba(0, 0, 0, 0.1)',
          },
        },
        dark: {
          colors: {
            primary: '#0070f3',
            secondary: '#f81ce5',
            success: '#00d68f',
            warning: '#fbbc05',
            error: '#ff0080',
            accent: '#00d68f',
            background: '#333',
            surface: '#777',
            divider: '#333333',
            text: '#ffffff',
            placeholder: '#6e7191',
            icon: '#6e7191',
            disabled: '#6e7191',
            shadow: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    }),
  ],
};
