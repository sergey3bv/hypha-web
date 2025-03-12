import type { Meta, StoryObj } from '@storybook/react';

import { InnerSpacesSection } from './inner-spaces-section';

const meta = {
  component: InnerSpacesSection,
  title: 'Epics/Membership/InnerSpacesSection',
} satisfies Meta<typeof InnerSpacesSection>;

export default meta;

type Story = StoryObj<typeof InnerSpacesSection>;

export const Default: Story = {
  args: {},
};
