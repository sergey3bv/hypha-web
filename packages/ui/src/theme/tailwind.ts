import { fontFamily } from 'tailwindcss/defaultTheme';

export const theme = {
  extend: {
    fontFamily: {
      heading: ['var(--font-heading)', ...fontFamily.sans],
      body: ['var(--font-body)', ...fontFamily.sans],
    },
  },
};
