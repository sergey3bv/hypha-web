import type { Meta, StoryObj } from '@storybook/react';
import { CardOrganisation } from './card-organisation';

const meta: Meta<typeof CardOrganisation> = {
  component: CardOrganisation,
  title: 'Epics/Organisation/CardOrganisation',
};
export default meta;
type Story = StoryObj<typeof CardOrganisation>;

export const Primary: Story = {
  args: {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ultrices nisl. Vivamus sagittis in mauris vitae aliquam. Etiam volutpat risus a tempor volutpat. Proin in tellus tellus. Morbi sagittis, dui sed facilisis imperdiet, sapien lacus suscipit risus, eget auctor mauris erat sit amet sem. Praesent urna mauris, pellentesque vehicula laoreet sed, porttitor tempor turpis.',
    icon: 'https://github.com/shadcn.png',
    members: 0,
    agreements: 0,
    activeAgreements: 1,
    openDiscussions: 2,
    title: 'Title'
  },
};
