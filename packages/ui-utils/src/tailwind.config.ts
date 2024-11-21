import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'node:path';
import TailwindAnimate from 'tailwindcss-animate';

import type { Config } from 'tailwindcss';

export function buildConfig(appDir: string): Config {
  return {
    darkMode: ['class'],
    safelist: ['dark', 'light'],
    content: [
      join(
        appDir,
        '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
      ),
      ...createGlobPatternsForDependencies(appDir),
    ],
    theme: {
      extend: {
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: {
            DEFAULT: 'hsl(var(--background))',
            1: 'hsl(var(--background-1))',
            2: 'hsl(var(--background-2))',
            3: 'hsl(var(--background-3))',
            4: 'hsl(var(--background-4))',
            5: 'hsl(var(--background-5))',
            6: 'hsl(var(--background-6))',
            7: 'hsl(var(--background-7))',
            8: 'hsl(var(--background-8))',
            9: 'hsl(var(--background-9))',
            10: 'hsl(var(--background-10))',
          },
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
          action: {
            DEFAULT: 'rgb(62, 99, 221)',
            foreground: 'rgb(32, 58, 119)'
          },
          'action-light': {
            DEFAULT: 'hsl(var(--action-light))',
            foreground: 'hsl(var(--action-light))',
          },
        },
        borderRadius: {
          lg: `var(--radius)`,
          md: `calc(var(--radius) - 2px)`,
          sm: 'calc(var(--radius) - 4px)',
        },
        fontSize: {
          "1": '14px',
          "2": '16px',
          "3": '18px',
          "4": '20px',
          "5": '24px',
          "6": '30px',
          "7": '36px',
          "8": '48px',
          "9": '60px'
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        }
      },
    },
    plugins: [TailwindAnimate],
  };
}
