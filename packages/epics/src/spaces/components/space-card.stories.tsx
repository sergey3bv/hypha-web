import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCard } from './space-card';

const meta: Meta<typeof SpaceCard> = {
  component: SpaceCard,
  title: 'Epics/Spaces/SpaceCard',
};
export default meta;
type Story = StoryObj<typeof SpaceCard>;

export const Primary: Story = {
  args: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ultrices nisl. Vivamus sagittis in mauris vitae aliquam. Etiam volutpat risus a tempor volutpat. Proin in tellus tellus. Morbi sagittis, dui sed facilisis imperdiet, sapien lacus suscipit risus, eget auctor mauris erat sit amet sem. Praesent urna mauris, pellentesque vehicula laoreet sed, porttitor tempor turpis.',
    icon: 'https://github.com/shadcn.png',
    members: 0,
    agreements: 0,
    activeAgreements: 1,
    openDiscussions: 2,
    title: 'Title',
    isLoading: false,
    leadImage: '/placeholder/space-lead-image.png',
  },
};
