import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

import { SelectAction } from './select-action';

const meta = {
  component: SelectAction,
  title: 'Epics/Common/SelectAction',
} satisfies Meta<typeof SelectAction>;

export default meta;

type Story = StoryObj<typeof SelectAction>;

export const Default: Story = {
  args: {
    isLoading: false,
    closeUrl: '/',
    content:
      'Select an action to contribute, collaborate, make decisions or manage resources within your space.',
    actions: [
      {
        title: 'Create a Discussion',
        description: 'Create a discussion to start a conversation',
        href: '#',
        icon: <ChatBubbleIcon />,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Create a Discussion/gi)).toBeTruthy();
  },
};
