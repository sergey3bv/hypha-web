import type { Meta, StoryObj } from '@storybook/react';

import { LeadImageUpload } from './lead-image-upload';

const meta = {
  component: LeadImageUpload,
} satisfies Meta<typeof LeadImageUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
