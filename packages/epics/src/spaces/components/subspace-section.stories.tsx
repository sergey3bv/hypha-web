import type { Meta, StoryObj } from '@storybook/react';

import { SubspaceSection } from './subspace-section';

const meta = {
  component: SubspaceSection,
  title: 'Epics/Spaces/SubspaceSection',
} satisfies Meta<typeof SubspaceSection>;

export default meta;

type Story = StoryObj<typeof SubspaceSection>;

export const Default: Story = {};
