import type { Meta, StoryObj } from '@storybook/react';

import { AvatarUpload } from './avatar-upload';
import { LuImagePlus } from 'react-icons/lu';

const meta = {
  component: AvatarUpload,
  title: 'UI/Uploads/AvatarUpload',
} satisfies Meta<typeof AvatarUpload>;

export default meta;

type Story = StoryObj<typeof AvatarUpload>;

export const Default: Story = {
  args: {
    EditIcon: LuImagePlus,
  },
};
