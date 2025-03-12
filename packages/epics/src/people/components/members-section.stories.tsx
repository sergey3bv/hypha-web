import type { Meta, StoryObj } from '@storybook/react';
import { MembersSection } from './members-section';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof MembersSection> = {
  component: MembersSection,
  title: 'Epics/People/MembersSection',
};
export default meta;
type Story = StoryObj<typeof MembersSection>;

export const Primary: Story = {
  args: {
    useMembers: () => ({
      isLoading: false,
      pagination: {
        hasNextPage: false,
        hasPreviousPage: false,
        page: 1,
        pageSize: 10,
        total: 2,
        totalPages: 1,
      },
      members: [
        {
          id: 1,
          avatarUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
          name: 'Jane',
          surname: 'Doe',
          nickname: 'username',
          location: 'Paris, France',
          slug: 'member-1',
        },
        {
          id: 2,
          avatarUrl:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
          name: 'Jon',
          surname: 'Doe',
          nickname: 'username',
          location: 'Paris, France',
          slug: 'member-2',
        },
      ],
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Members \|/gi)).toBeTruthy();
  },
};
