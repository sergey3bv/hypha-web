import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  ChatBubbleIcon,
  PersonIcon,
  GearIcon,
  RocketIcon,
  LayersIcon,
} from '@radix-ui/react-icons';

import { SelectAction } from './select-action';

const meta = {
  component: SelectAction,
  title: 'Epics/Common/SelectAction',
} satisfies Meta<typeof SelectAction>;

export default meta;

type Story = StoryObj<typeof SelectAction>;

export const Default: Story = {
  args: {
    isLoading: false,
    content:
      'Select an action to contribute, collaborate, make decisions or manage resources within your space.',
    actions: [
      {
        title: 'Create a Discussion',
        description: 'Create a discussion to start a conversation',
        href: '#',
        icon: <ChatBubbleIcon />,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Select an action to contribute/gi)).toBeTruthy();
  },
};

export const WithGroups: Story = {
  args: {
    isLoading: false,
    content: 'Choose an action to get started with your workspace.',
    actions: [
      {
        title: 'Create Project',
        description: 'Start a new project from scratch',
        group: 'Projects',
        href: '/projects/new',
        icon: <RocketIcon />,
      },
      {
        title: 'Import Project',
        description: 'Import an existing project',
        group: 'Projects',
        href: '/projects/import',
        icon: <LayersIcon />,
      },
      {
        title: 'Invite Team Members',
        description: 'Add new members to your workspace',
        group: 'Team',
        href: '/team/invite',
        icon: <PersonIcon />,
      },
      {
        title: 'Configure Workspace',
        description: 'Manage workspace settings and preferences',
        href: '/settings',
        icon: <GearIcon />,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Projects')).toBeTruthy();
    expect(canvas.getByText('Team')).toBeTruthy();
    expect(canvas.getByText('Create Project')).toBeTruthy();
    expect(canvas.getByText('Configure Workspace')).toBeTruthy();
  },
};
