import type { Meta, StoryObj } from '@storybook/react';

import { DocumentList } from './document-list';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  component: DocumentList,
  title: 'Epics/Governance/DocumentList',
} satisfies Meta<typeof DocumentList>;

export default meta;

type Story = StoryObj<typeof DocumentList>;

export const Default: Story = {
  args: {
    isLoading: false,
    basePath: '',
    documents: [
      {
        title: 'Title 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed dolor malesuada, placerat risus eget, vulputate elit. Fusce pulvinar augue et ornare iaculis.',
        leadImage: '',
        creator: {
          name: 'Name',
          surname: 'Surname',
          avatarUrl: 'https://github.com/shadcn.png',
        },
        badges: [
          {
            label: 'agreement',
            className: 'capitalize',
            variant: 'solid',
            colorVariant: 'accent',
          },
          {
            label: '50%',
            variant: 'outline',
            colorVariant: 'accent',
          },
        ],
        slug: 'test-slug',
      },
      {
        title: 'Title 2',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed dolor malesuada, placerat risus eget, vulputate elit. Fusce pulvinar augue et ornare iaculis.',
        leadImage: '',
        creator: {
          name: 'Name',
          surname: 'Surname',
          avatarUrl: 'https://github.com/shadcn.png',
        },
        badges: [
          {
            label: 'agreement',
            className: 'capitalize',
            variant: 'solid',
            colorVariant: 'accent',
          },
          {
            label: '50%',
            variant: 'outline',
            colorVariant: 'accent',
          },
        ],
        slug: 'test-slug',
      },
      {
        title: 'Title 3',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed dolor malesuada, placerat risus eget, vulputate elit. Fusce pulvinar augue et ornare iaculis.',
        leadImage: '',
        creator: {
          name: 'Name',
          surname: 'Surname',
          avatarUrl: 'https://github.com/shadcn.png',
        },
        badges: [
          {
            label: 'agreement',
            className: 'capitalize',
            variant: 'solid',
            colorVariant: 'accent',
          },
          {
            label: '50%',
            variant: 'outline',
            colorVariant: 'accent',
          },
        ],
        slug: 'test-slug',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Title 1/gi)).toBeTruthy();
  },
};
