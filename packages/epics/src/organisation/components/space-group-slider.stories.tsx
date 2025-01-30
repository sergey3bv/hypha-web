import type { Meta, StoryObj } from '@storybook/react';
import { SpaceGroupSlider } from './space-group-slider';

const meta = {
  component: SpaceGroupSlider,
  title: 'Epics/Membership/SpaceGroupSlider',
} satisfies Meta<typeof SpaceGroupSlider>;

export default meta;

type Story = StoryObj<typeof SpaceGroupSlider>;

export const Primary: Story = {
  args: {
    spaces: [
      {
        slug: 'legal-and-regulatory',
        image: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: [
          {
            avatar:
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
            name: 'Name',
            surname: 'Surname',
          },
        ],
        joinedStatus: true,
        projects: 3,
        agreements: [],
        createdDate: '',
      },
      {
        slug: 'legal-and-regulatory',
        image: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: [
          {
            avatar:
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
            name: 'Name',
            surname: 'Surname',
          },
        ],
        joinedStatus: true,
        projects: 3,
        agreements: [],
        createdDate: '',
      },
      {
        slug: 'legal-and-regulatory',
        image: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: [
          {
            avatar:
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
            name: 'Name',
            surname: 'Surname',
          },
        ],
        joinedStatus: true,
        projects: 3,
        agreements: [],
        createdDate: '',
      },
      {
        slug: 'legal-and-regulatory',
        image: 'https://github.com/shadcn.png',
        title: 'Legal & Regulatory',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: [
          {
            avatar:
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
            name: 'Name',
            surname: 'Surname',
          },
        ],
        joinedStatus: true,
        projects: 3,
        agreements: [],
        createdDate: '',
      },
    ],
    lang: 'en',
    isLoading: false,
    type: 'Energy',
  },
};
