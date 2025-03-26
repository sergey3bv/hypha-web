import type { Meta, StoryObj } from '@storybook/react';

import { UploadAvatar } from './upload-avatar';
import { LuImagePlus } from 'react-icons/lu';

const meta = {
  component: UploadAvatar,
  title: 'UI/Uploads/AvatarUpload',
} satisfies Meta<typeof UploadAvatar>;

export default meta;

type Story = StoryObj<typeof UploadAvatar>;

export const Default: Story = {
  args: {
    EditIcon: LuImagePlus,
  },
};
