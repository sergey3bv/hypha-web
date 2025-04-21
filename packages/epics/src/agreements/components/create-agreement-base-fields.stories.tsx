import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CreateAgreementBaseFields } from './create-agreement-base-fields';

const meta = {
  component: CreateAgreementBaseFields,
  title: 'Epics/Agreements/CreateAgreementForm',
} satisfies Meta<typeof CreateAgreementBaseFields>;

export default meta;

type Story = StoryObj<typeof CreateAgreementBaseFields>;

export const Default: Story = {
  args: {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'Name',
      surname: 'Surname',
    },
    isLoading: false,
    closeUrl: '/',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Name Surname/gi)).toBeTruthy();
  },
};
