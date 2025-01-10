import type { Meta, StoryObj } from '@storybook/react';
import { Suspense } from 'react';
import { Markdown } from './markdown';
import { content } from './markdown.mocks';
const meta = {
  component: Markdown,
  title: 'UI/Molecules/Markdown',
  decorators: [
    (Story) => (
      <Suspense fallback={<div>Loading...</div>}>
        <Story />
      </Suspense>
    ),
  ],
} satisfies Meta<typeof Markdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content,
  },
};
