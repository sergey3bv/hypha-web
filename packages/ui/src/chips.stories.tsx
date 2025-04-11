import type { Meta, StoryObj } from '@storybook/react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { MultiSelect } from './chips';

const frameworksList = [
  { value: 'housing', label: 'Housing' },
  { value: 'energy', label: 'Energy' },
  { value: 'mobility', label: 'Mobility' },
  { value: 'water', label: 'Water' },
  { value: 'air', label: 'Air' },
  { value: 'soil', label: 'Soil' },
  { value: 'flora', label: 'Flora' },
  { value: 'fauna', label: 'Fauna' },
  { value: 'fungi', label: 'Fungi' },
  { value: 'food', label: 'Food' },
  { value: 'education', label: 'Education' },
  { value: 'art', label: 'Art' },
  { value: 'health', label: 'Health' },
  { value: 'tech', label: 'Tech' },
];

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  title: 'UI/MultiSelect',
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Primary: Story = {
  args: {
    options: frameworksList,
    defaultValue: [],
    placeholder: 'Select Categories',
    variant: 'inverted',
    animation: 2,
    maxCount: 3,
  },
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MultiSelect!/gi)).toBeTruthy();
  },
};
