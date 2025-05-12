import type { Meta, StoryObj } from '@storybook/react';
import { FormVoting } from './form-voting';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { addDays, formatISO } from 'date-fns';

const meta: Meta<typeof FormVoting> = {
  component: FormVoting,
  title: 'Epics/Proposals/FormVoting',
};
export default meta;
type Story = StoryObj<typeof FormVoting>;

export const Primary: Story = {
  args: {
    unity: 50,
    quorum: 75,
    endTime: formatISO(addDays(new Date(), 2)),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/50%/gi)).toBeTruthy();
    expect(canvas.getByText(/75%/gi)).toBeTruthy();
  },
};
