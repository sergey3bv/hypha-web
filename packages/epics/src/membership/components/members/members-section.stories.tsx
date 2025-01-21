import type { Meta, StoryObj } from '@storybook/react';
import { MembersSection } from './members-section';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MembersSection> = {
  component: MembersSection,
  title: 'Epics/Membership/MembersSection',
};
export default meta;
type Story = StoryObj<typeof MembersSection>;

export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Members \|/gi)).toBeTruthy();
  },
};
