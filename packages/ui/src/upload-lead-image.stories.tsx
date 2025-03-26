import type { Meta, StoryObj } from '@storybook/react';

import { UploadLeadImage } from './upload-lead-image';

const meta = {
  component: UploadLeadImage,
} satisfies Meta<typeof UploadLeadImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
