import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontHelve = localFont({
  src: [
    {
      path: '../fonts/DB Helvethaica X v3.2.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/DB Helvethaica X Thin v3.2.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/DB Helvethaica X Blk v3.2.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/DB Helvethaica X Bd v3.2.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-helve',
});
