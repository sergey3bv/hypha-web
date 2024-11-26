'use client';

import { useState } from 'react';
import { Button, FilterMenu } from "@hypha-platform/ui";
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { CardInnerSpace } from './card-inner-space';

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

const dummyData = {
  innerSpacesCount: 5,
}

const initialData = [
  {
    image: 'https://s3-alpha-sig.figma.com/img/8a18/e26a/4afb50c5dc39940a60e7180d24479d7a?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UVXU3or87vZC4z6fzySaQ~ohA59~vGgVWcruphMBlUSMeTkzE~WsKYEFZVN8UgbJEJeYHUO8HTbxPwdgnUB1lCHymgPxrNvqpNVbxW~AggLjcB2iKBlmvd6Wh470U1Ir27LH5hG8wEIuhhBRDLnBzA3lPMnYoPF5kQA05~mkoCAAb~7ltMgjw4gRhGtq9EXr28hdDXOpCsJvJkFR6ye1IqnqE7xN0p4QyjrAhdvNS4HVInS5X4p9kGZN9~EsXI0rP2146bZLzbRhFHiryZzSLctDTLeSFJGN0b2zc0GkV4RmwLMBs1pSEVd0d6sZlyuQKdn7llRNluy0blUO2EuTyw__',
    title: 'Legal & Regulatory',
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
    joinedStatus: true
  },
  {
    image: 'https://s3-alpha-sig.figma.com/img/4889/3b62/f4292865b796306bf1be0620886e7c28?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=auaeqSJ~oaD-bhl4e8ICJb9EPZtWg0D6vTS9xkQL--6P2a7pjP3Ua1J1ulCByEG8eMAFTWQ5-Jw3Pq8xEaI3whIOlirTVyCpQ6uyzC2V1S~EF~~k4xigFO0EVmno7Bm5Pr20r0LIPbscuvCEBeGqQDsxwmW1lUivsfuoawZNAWIMx3PJ4ExZGwBZHPojHhDmZyed6iS-fKtT2ZnQfbZyxeDDZrziHlCjJy-MwE3v-3kjMZLP1RfRTqV-6HpUOE1v4A3RhAimKfhY4dnZv1xW2zcoerhhDbhqhkzkI8h5cwfYc10pClUpTS9yZ8HTW4lM3BGRoh4WTkd-RJOmtR6DbA__',
    title: 'Solutions & Technology',
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
    image: 'https://s3-alpha-sig.figma.com/img/2360/d0fa/ae4791caa96547e6ece844a29090cfd4?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d-zgqDKRGQMCMhDlJSPjOqfbfy1h3AbAnsU7cvU8F7C5uInKvV1xcDb-mpqSya4f~~zxj54~CnEb-3GgusCDPlRmINF6mFLgCZ2moWuGFYZHAH~LXfV4ZmMWCSNzuQbscdIRCdFPc7i838iTQmM40YL-HgV0MMTf9Y6t5DZWbdox7qU2seRZpCZPM9UtO4WQuhwlMrnr12~IQxBhUU6diixTAruZK-6jJBdpnGETjbNmHicFtVDebO7En8FCEswDVPQtdG8NH-kbXsR2yZVyizVuoTylir4C6YGUhWbCWQ4~UAuQ7hlX5G8EJK46DBazd4raK0PYEcRmh6TeWrKtnA__',
    title: 'Pilots & Sales',
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

export const ListInnerSpaces: React.FC<ListInnerSpacesProps> = () => {
  const [outerSpaces, setInnerSpaces] = useState(initialData);

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
        <Text className='text-lg'>Inner Spaces | {dummyData.innerSpacesCount}</Text>
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
