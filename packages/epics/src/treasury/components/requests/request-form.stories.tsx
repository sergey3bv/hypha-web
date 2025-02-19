import type { Meta, StoryObj } from '@storybook/react';
import { RequestForm } from './request-form';

const meta: Meta<typeof RequestForm> = {
  component: RequestForm,
  title: 'Epics/Treasury/RequestForm',
};
export default meta;

type Story = StoryObj<typeof RequestForm>;

export const Primary: Story = {
  args: {
    closeUrl: '',
    isLoading: false,
    headProps: {
      name: 'John',
      surname: 'Doe',
      avatar: 'https://github.com/shadcn.png',
      symbol: 'ETH',
      isLoading: false,
    }
  },
};
