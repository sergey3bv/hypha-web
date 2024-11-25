'use client';

import { useState } from 'react';
import { Button, FilterMenu } from "@hypha-platform/ui";
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { CardOuterSpace } from './card-outer-space';

type ListOuterSpacesProps = Record<string, never>;

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const outerSpacesfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

const dummyData = {
  outerSpacesCount: 5,
}

const initialData = [
  {
    logo: 'https://s3-alpha-sig.figma.com/img/2a0a/e61e/2e544fb936cbd0a4710a26e48616806c?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ja6J2tHo0tQSW8nK8rAn~cWIFAQCOfUneOJZdW4O-aES1KIGjGpUGJZ7QyqMOguKX9XBmRVShlTSvGMpiAUikfeAXf5aFlx~xA0ZyalqUjfR2mFEcxwTfjbEh0Ftk~aADoBxuRmuvfOoAifXUV4fypB6mYNECJ0Ol8o8YbidqBJCgxa3DPJD8G1gyzxPIKZreWNt~H2IeQcdqZMi6bToX16HSsvgVxi6CazBLlRy3F21BVgVkJAfL9OrmkF0dqNDyzzout1ihuJB5W9EXY0JbHr1P3fYOzJemmv~llxZ3tQ9dUJhUSsLI~HezPENpIthtUEoXnB7pWSNYv4I0MpzAQ__',
    title: 'Hypha Energy Hub',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
    members: 126,
    projects: 58
  },
  {
    logo: 'https://s3-alpha-sig.figma.com/img/2a0a/e61e/2e544fb936cbd0a4710a26e48616806c?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ja6J2tHo0tQSW8nK8rAn~cWIFAQCOfUneOJZdW4O-aES1KIGjGpUGJZ7QyqMOguKX9XBmRVShlTSvGMpiAUikfeAXf5aFlx~xA0ZyalqUjfR2mFEcxwTfjbEh0Ftk~aADoBxuRmuvfOoAifXUV4fypB6mYNECJ0Ol8o8YbidqBJCgxa3DPJD8G1gyzxPIKZreWNt~H2IeQcdqZMi6bToX16HSsvgVxi6CazBLlRy3F21BVgVkJAfL9OrmkF0dqNDyzzout1ihuJB5W9EXY0JbHr1P3fYOzJemmv~llxZ3tQ9dUJhUSsLI~HezPENpIthtUEoXnB7pWSNYv4I0MpzAQ__',
    title: 'Hypha Energy Hub',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
    members: 126,
    projects: 58
  }
];

export const ListOuterSpaces: React.FC<ListOuterSpacesProps> = () => {
  const [outerSpaces, setOuterSpaces] = useState(initialData);

  const loadMoreOuterSpaces = () => {
    const newOuterSpaces = [
      {
        logo: 'https://s3-alpha-sig.figma.com/img/2a0a/e61e/2e544fb936cbd0a4710a26e48616806c?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ja6J2tHo0tQSW8nK8rAn~cWIFAQCOfUneOJZdW4O-aES1KIGjGpUGJZ7QyqMOguKX9XBmRVShlTSvGMpiAUikfeAXf5aFlx~xA0ZyalqUjfR2mFEcxwTfjbEh0Ftk~aADoBxuRmuvfOoAifXUV4fypB6mYNECJ0Ol8o8YbidqBJCgxa3DPJD8G1gyzxPIKZreWNt~H2IeQcdqZMi6bToX16HSsvgVxi6CazBLlRy3F21BVgVkJAfL9OrmkF0dqNDyzzout1ihuJB5W9EXY0JbHr1P3fYOzJemmv~llxZ3tQ9dUJhUSsLI~HezPENpIthtUEoXnB7pWSNYv4I0MpzAQ__',
        title: 'New Space',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: 0,
        projects: 0
      },
      {
        logo: 'https://s3-alpha-sig.figma.com/img/2677/537a/bf07fb918e05d5f83b9f65df9e88c2ad?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SVhaaEoUStSI0HAOaw3Y0w3sC~K2FHEkbavsVldtxE0iEpZsmRsoCttIcaHVq0Y3oIriKyQcwNLgwQG9XKpLlNGMq9m4dp4IV-n3BVmxJ7KCR1RINleigC290VwEGpXGFiiyUMCYrIrhq2XXRddXhum1QZpAygBZeeex5dI6cagNWxzCnbQ2lSAcq-LKFnZqMRXQ6UJNb-wahYH7jideKNB4qExWT98c-GiCt-iZlRRV1bBtq6P91sAk6AxErI6wGnCIrixokxf2qY4ajntS2492nA5Z9tT5UsBWFGnf0sHZanmBuoTBRMJP8Qls0Km2FhCpedIh9MR67lla~mSoRw__',
        title: 'New Space',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: 0,
        projects: 0
      },
    ];
    setOuterSpaces(prevOuterSpaces => [...prevOuterSpaces, ...newOuterSpaces]);
  };

  return (
    <div>
      <div className='flex justify-between items-center mt-10'>
        <Text className='text-lg'>Outer Spaces | {dummyData.outerSpacesCount}</Text>
        <div className='flex items-center'>
          <FilterMenu
            value={outerSpacesfilterSettings.value}
            options={outerSpacesfilterSettings.options}
          />
          <Button className='ml-2' variant="action" size="sm">
            <PlusIcon className='mr-2'/>
            Invite space
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
        {outerSpaces.map((space, index) => (
          <CardOuterSpace
            logo={space.logo}
            title={space.title}
            description={space.description}
            members={space.members}
            projects={space.projects}
          />
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Button onClick={loadMoreOuterSpaces} className="rounded-lg" variant="outline" size="sm">
          Load more projects
        </Button>
      </div>
    </div>
  );
};
