import type { Meta, StoryObj } from '@storybook/react';

import { UploadLeadImage } from './lead-image';

const meta = {
  component: UploadLeadImage,
} satisfies Meta<typeof UploadLeadImage>;

export default meta;

type Story = StoryObj<typeof UploadLeadImage>;

export const Default: Story = {};
