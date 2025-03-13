import type { Meta, StoryObj } from '@storybook/react';
import { DocumentBadges } from './document-badges';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DocumentBadges,
  title: 'Epics/Governance/DocumentBadges',
} satisfies Meta<typeof DocumentBadges>;

export default meta;

type Story = StoryObj<typeof DocumentBadges>;

export const Default: Story = {
  args: {
    badges: [
      {
        value: 'agreement',
        className: 'capitalize',
        variant: 'solid',
        colorVariant: 'accent',
      },
      {
        value: '50%',
        variant: 'outline',
        colorVariant: 'accent',
      },
    ],
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Agreement/gi)).toBeTruthy();
  },
};
