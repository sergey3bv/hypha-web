import type { Meta, StoryObj } from '@storybook/react';
import { AssetCard } from './asset-card';

const meta: Meta<typeof AssetCard> = {
  component: AssetCard,
  title: 'Epics/Treasury/AssetCard',
};
export default meta;
type Story = StoryObj<typeof AssetCard>;

export const Primary: Story = {
  args: {
    icon: 'https://s3-alpha-sig.figma.com/img/245b/338d/4199c4b76377fa29775a7d395db0e05d?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L2U5H0je9x3apVrOWdgg9swC3sn7a04AvQ82riGLuoPBJ6EUYmDJiJckWVCPKcqnXOi4zv2c8U-XuP8J30pyNLkQMtJQ27UHOMfehXWi~0Sht7UuwJ2xpbtTq3xZ-zllNPqrkTZbvRJF6lfK1DU0r~5-YGhmHnSqwVu8ri3UAflQ7HhXZZvuVxREDSTLY8EBMYKI9NKa4ZWxGCZyDP8-izYe7i3uhZmMVoCmsYu7qJ5JUqVD65L2yfMCwhlmh8uCeUDRqWXPkxjgMmz90AyppcnmA3qNq38Txh6ZqHLWfo-s-24H-4ic9UmjdNcz6U8FyCaNMfui2QengZuJoi~HMw__',
    name: 'Bitcoin',
    symbol: 'BTC',
    value: 5.25791,
    usdEqual: 335887.76,
    isLoading: false,
  },
};
