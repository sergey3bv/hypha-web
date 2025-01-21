import type { Meta, StoryObj } from '@storybook/react';
import { MembersList } from './members-list';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MembersList> = {
  component: MembersList,
  title: 'Epics/Membership/MembersList',
};
export default meta;
type Story = StoryObj<typeof MembersList>;

export const Primary: Story = {
  args: {
    page: 1,
    activeFilter: 'all',
    isLoadingProp: false,
    minimize: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/^Applicant/gi)).toBeTruthy();
    expect(canvas.getByText(/^Active/gi)).toBeTruthy();
    expect(canvas.getByText(/^Inactive/gi)).toBeTruthy();
    expect(canvas.getByText(/^Rejected/gi)).toBeTruthy();
  },
};
