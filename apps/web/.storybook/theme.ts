import { create } from '@storybook/theming/create';

export const hyphaLight = create({
  base: 'light',
  brandTitle: 'hypha',
  brandUrl: 'https://hypha.earth',
  brandImage:
    'https://hypha.earth/wp-content/themes/hypha2023/img/logos/logo-white.svg',
  brandTarget: '_self',
});

export const hyphaDark = create({
  base: 'dark',
  brandTitle: 'hypha',
  brandUrl: 'https://hypha.earth',
  brandImage:
    'https://hypha.earth/wp-content/themes/hypha2023/img/logos/logo-white.svg',
  brandTarget: '_self',
});
