import type { Meta, StoryObj } from '@storybook/react';

import { FileUploader } from './file-upload';

const meta = {
  component: FileUploader,
  title: 'UI/FileUpload',
} satisfies Meta<typeof FileUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
