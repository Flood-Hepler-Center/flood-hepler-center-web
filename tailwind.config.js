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
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        fontSize: {
          tiny: '1rem', // text-tiny
          small: '1.25rem', // text-small
          medium: '1.4rem', // text-medium
          large: '2rem', // text-large
        },
        lineHeight: {
          tiny: '1rem', // text-tiny
          small: '1.25rem', // text-small
          medium: '1.5rem', // text-medium
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
