import type { Meta, StoryObj } from '@storybook/react';
import { SpaceGroupSlider } from './space-group-slider';

const meta = {
  component: SpaceGroupSlider,
  title: 'Epics/Spaces/SpaceGroupSlider',
} satisfies Meta<typeof SpaceGroupSlider>;

export default meta;

type Story = StoryObj<typeof SpaceGroupSlider>;

export const Primary: Story = {
  args: {
    spaces: [
      {
        id: 1,
        slug: 'legal-and-regulatory',
        leadImage: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        parentId: 0,
      },
      {
        id: 1,
        slug: 'legal-and-regulatory',
        leadImage: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        parentId: 0,
      },
      {
        id: 1,
        slug: 'legal-and-regulatory',
        leadImage: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        parentId: 0,
      },
      {
        id: 1,
        slug: 'legal-and-regulatory',
        leadImage: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        parentId: 0,
      },
    ],
    isLoading: false,
    type: 'Energy',
    getHref: (id: string) => {
      return id;
    },
  },
};
