import { fontFamily } from 'tailwindcss/defaultTheme';
export * from './provider';

export const theme = {
  extend: {
    fontFamily: {
      heading: ['var(--font-heading)', ...fontFamily.sans],
      body: ['var(--font-body)', ...fontFamily.sans],
    },
  },
};
