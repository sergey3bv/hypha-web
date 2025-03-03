import useSWR from 'swr';

export const data = [
  {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'John',
      surname: 'Doe',
    },
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024/09/24',
    replies: [],
  },
  {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'John',
      surname: 'Doe',
    },
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024/09/24',
    replies: [
      {
        creator: {
          avatar: 'https://github.com/shadcn.png',
          name: 'Name',
          surname: 'Surname',
        },
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: '2024/09/24',
        replies: [],
      },
    ],
  },
  {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'John',
      surname: 'Doe',
    },
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024/09/24',
    replies: [],
  },
  {
    creator: {
      avatar: 'https://github.com/shadcn.png',
      name: 'John',
      surname: 'Doe',
    },
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2024/09/24',
    replies: [],
  },
];

// TODO: connect to api
export const useDiscussionByDocumentSlug = (documentSlug: string) => {
  const { data: discussion, isLoading } = useSWR(
    documentSlug ? [documentSlug, 'discussion'] : null,
    () => Promise.resolve(data),
  );
  return { discussion, isLoading };
};
