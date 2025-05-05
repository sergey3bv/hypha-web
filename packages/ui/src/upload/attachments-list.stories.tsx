import type { Meta, StoryObj } from '@storybook/react';

import { AttachmentList } from './attachments-list';

const meta = {
  component: AttachmentList,
  title: 'UI/Uploads/AttachmentList',
} satisfies Meta<typeof AttachmentList>;

export default meta;

type Story = StoryObj<typeof AttachmentList>;

export const Default: Story = {
  args: {
    attachments: [
      'https://github.com/shadcn.png',
      'https://github.com/shadcn.png',
      'https://github.com/shadcn.png',
    ],
  },
};
