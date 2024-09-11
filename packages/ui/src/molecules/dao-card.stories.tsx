import type { Meta, StoryObj } from '@storybook/react';
import { DaoCard } from './dao-card';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DaoCard> = {
  component: DaoCard,
  title: 'molecules/DaoCard',
  decorators: [
    (Story) => (
      <div className="w-52 h-44">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DaoCard>;

export const Primary = {
  args: {
    icon: "https://hypha.infura-ipfs.io/ipfs/QmRsJAvDpAPp54Tqf9P7LdyhU46YjZuuvjmkMMhjWwNFKk",
    title: 'Hypha DAO',
    description:
      "Hypha's complete DAO toolkit helps individuals, projects, and organizations achieve more together.",
    createdDate: 'Jul 16, 2024',
    members: 100,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DaoCard!/gi)).toBeTruthy();
  },
};
