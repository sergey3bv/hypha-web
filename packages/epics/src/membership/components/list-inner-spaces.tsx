'use client';

import { useState } from 'react';
import { Button, FilterMenu } from "@hypha-platform/ui";
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { CardInnerSpace } from './card-inner-space';
import { listInnerSpacesData } from '@hypha-platform/ui-utils';

type ListInnerSpacesProps = Record<string, never>;

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const innerSpacesfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

export const ListInnerSpaces: React.FC<ListInnerSpacesProps> = () => {
  const [outerSpaces, setInnerSpaces] = useState(listInnerSpacesData.spaces);

  const loadMoreInnerSpaces = () => {
    const newInnerSpaces = [
      {
        image: 'https://s3-alpha-sig.figma.com/img/2a0a/e61e/2e544fb936cbd0a4710a26e48616806c?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ja6J2tHo0tQSW8nK8rAn~cWIFAQCOfUneOJZdW4O-aES1KIGjGpUGJZ7QyqMOguKX9XBmRVShlTSvGMpiAUikfeAXf5aFlx~xA0ZyalqUjfR2mFEcxwTfjbEh0Ftk~aADoBxuRmuvfOoAifXUV4fypB6mYNECJ0Ol8o8YbidqBJCgxa3DPJD8G1gyzxPIKZreWNt~H2IeQcdqZMi6bToX16HSsvgVxi6CazBLlRy3F21BVgVkJAfL9OrmkF0dqNDyzzout1ihuJB5W9EXY0JbHr1P3fYOzJemmv~llxZ3tQ9dUJhUSsLI~HezPENpIthtUEoXnB7pWSNYv4I0MpzAQ__',
        title: 'New Space',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: [
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          },
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          },
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          },
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          }
        ],
        joinedStatus: false
      },
      {
        image: 'https://s3-alpha-sig.figma.com/img/2a0a/e61e/2e544fb936cbd0a4710a26e48616806c?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ja6J2tHo0tQSW8nK8rAn~cWIFAQCOfUneOJZdW4O-aES1KIGjGpUGJZ7QyqMOguKX9XBmRVShlTSvGMpiAUikfeAXf5aFlx~xA0ZyalqUjfR2mFEcxwTfjbEh0Ftk~aADoBxuRmuvfOoAifXUV4fypB6mYNECJ0Ol8o8YbidqBJCgxa3DPJD8G1gyzxPIKZreWNt~H2IeQcdqZMi6bToX16HSsvgVxi6CazBLlRy3F21BVgVkJAfL9OrmkF0dqNDyzzout1ihuJB5W9EXY0JbHr1P3fYOzJemmv~llxZ3tQ9dUJhUSsLI~HezPENpIthtUEoXnB7pWSNYv4I0MpzAQ__',
        title: 'New Space',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...',
        members: [
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          },
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          },
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          },
          {
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
            name: 'Jane',
            surname: 'Doe'
          }
        ],
        joinedStatus: false
      },
    ];
    setInnerSpaces(prevInnerSpaces => [...prevInnerSpaces, ...newInnerSpaces]);
  };

  return (
    <div>
      <div className='flex justify-between items-center mt-4'>
        <Text className='text-lg'>Inner Spaces | {listInnerSpacesData.innerSpacesCount}</Text>
        <div className='flex items-center'>
          <FilterMenu
            value={innerSpacesfilterSettings.value}
            options={innerSpacesfilterSettings.options}
          />
          <Button className='ml-2' variant="action" size="sm">
            <PlusIcon className='mr-2'/>
            Create
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
        {outerSpaces.map((space, index) => (
          <CardInnerSpace
            image={space.image}
            title={space.title}
            description={space.description}
            members={space.members}
            joinedStatus={space.joinedStatus}
          />
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Button onClick={loadMoreInnerSpaces} className="rounded-lg" variant="outline" size="sm">
          Load more inner spaces
        </Button>
      </div>
    </div>
  );
};
