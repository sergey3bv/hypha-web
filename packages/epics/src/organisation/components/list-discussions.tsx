'use client';

import { useState } from 'react';
import { CardDiscussion } from "./card-discussion";
import { Button } from "@hypha-platform/ui";

type ListDiscussionsProps = Record<string, never>;

const initialData = [
  {
    image: 'https://s3-alpha-sig.figma.com/img/6f89/2495/1ce6a19ebe8b63249da715ebf01b379f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MPZqdnWAw2tiI9WVF~yq7KaZQdiwVcTgMzbhcefN8ChmYcknsVnlE61fkVjoIZZqDXBfiLHnBvyLzpL55areZgraUbUU0ZyxJPmKo67A1ag0mtSVblVvdVPqETLM4Dx0blYuiAu4UZ8xoo8tjGly3dxS9VQBan-OFtlzpk8uz8uZclBCdO1HVJ2GbyRfluR8T3XIKbxEpJidFZLccBpE6cXAgq0yyR9aDdWY8aVMaqgFVjKZ2sgXJWEzxvUoQAiJaaJpgfEOgBfCjQMqlUtzglv~qMu-JL~1eAeIMnpqemlOXOCNOyZ1pBUEeVamxDDmET6z8gHUd0nuRYvB8rj9wA__',
    title: 'Discussion Title',
    creator: {
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
      name: 'Jane',
      surname: 'Doe'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    views: 30,
    comments: 15,
  },
  {
    image: 'https://s3-alpha-sig.figma.com/img/6f89/2495/1ce6a19ebe8b63249da715ebf01b379f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MPZqdnWAw2tiI9WVF~yq7KaZQdiwVcTgMzbhcefN8ChmYcknsVnlE61fkVjoIZZqDXBfiLHnBvyLzpL55areZgraUbUU0ZyxJPmKo67A1ag0mtSVblVvdVPqETLM4Dx0blYuiAu4UZ8xoo8tjGly3dxS9VQBan-OFtlzpk8uz8uZclBCdO1HVJ2GbyRfluR8T3XIKbxEpJidFZLccBpE6cXAgq0yyR9aDdWY8aVMaqgFVjKZ2sgXJWEzxvUoQAiJaaJpgfEOgBfCjQMqlUtzglv~qMu-JL~1eAeIMnpqemlOXOCNOyZ1pBUEeVamxDDmET6z8gHUd0nuRYvB8rj9wA__',
    title: 'Discussion Title',
    creator: {
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
      name: 'Jane',
      surname: 'Doe'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    views: 30,
    comments: 15,
  },
  {
    image: 'https://s3-alpha-sig.figma.com/img/6f89/2495/1ce6a19ebe8b63249da715ebf01b379f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MPZqdnWAw2tiI9WVF~yq7KaZQdiwVcTgMzbhcefN8ChmYcknsVnlE61fkVjoIZZqDXBfiLHnBvyLzpL55areZgraUbUU0ZyxJPmKo67A1ag0mtSVblVvdVPqETLM4Dx0blYuiAu4UZ8xoo8tjGly3dxS9VQBan-OFtlzpk8uz8uZclBCdO1HVJ2GbyRfluR8T3XIKbxEpJidFZLccBpE6cXAgq0yyR9aDdWY8aVMaqgFVjKZ2sgXJWEzxvUoQAiJaaJpgfEOgBfCjQMqlUtzglv~qMu-JL~1eAeIMnpqemlOXOCNOyZ1pBUEeVamxDDmET6z8gHUd0nuRYvB8rj9wA__',
    title: 'Discussion Title',
    creator: {
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
      name: 'Jane',
      surname: 'Doe'
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    views: 30,
    comments: 15,
  }
];

export const ListDiscussions: React.FC<ListDiscussionsProps> = () => {
  const [discussions, setDiscussions] = useState(initialData);

  const loadMoreDiscussions = () => {
    const newDiscussions = [
      {
        image: 'https://s3-alpha-sig.figma.com/img/6f89/2495/1ce6a19ebe8b63249da715ebf01b379f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MPZqdnWAw2tiI9WVF~yq7KaZQdiwVcTgMzbhcefN8ChmYcknsVnlE61fkVjoIZZqDXBfiLHnBvyLzpL55areZgraUbUU0ZyxJPmKo67A1ag0mtSVblVvdVPqETLM4Dx0blYuiAu4UZ8xoo8tjGly3dxS9VQBan-OFtlzpk8uz8uZclBCdO1HVJ2GbyRfluR8T3XIKbxEpJidFZLccBpE6cXAgq0yyR9aDdWY8aVMaqgFVjKZ2sgXJWEzxvUoQAiJaaJpgfEOgBfCjQMqlUtzglv~qMu-JL~1eAeIMnpqemlOXOCNOyZ1pBUEeVamxDDmET6z8gHUd0nuRYvB8rj9wA__',
        title: 'New Discussion Title',
        creator: {
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
          name: 'John',
          surname: 'Doe'
        },
        description: 'New discussion added to the list',
        views: 10,
        comments: 5,
      },
      {
        image: 'https://s3-alpha-sig.figma.com/img/6f89/2495/1ce6a19ebe8b63249da715ebf01b379f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MPZqdnWAw2tiI9WVF~yq7KaZQdiwVcTgMzbhcefN8ChmYcknsVnlE61fkVjoIZZqDXBfiLHnBvyLzpL55areZgraUbUU0ZyxJPmKo67A1ag0mtSVblVvdVPqETLM4Dx0blYuiAu4UZ8xoo8tjGly3dxS9VQBan-OFtlzpk8uz8uZclBCdO1HVJ2GbyRfluR8T3XIKbxEpJidFZLccBpE6cXAgq0yyR9aDdWY8aVMaqgFVjKZ2sgXJWEzxvUoQAiJaaJpgfEOgBfCjQMqlUtzglv~qMu-JL~1eAeIMnpqemlOXOCNOyZ1pBUEeVamxDDmET6z8gHUd0nuRYvB8rj9wA__',
        title: 'New Discussion Title',
        creator: {
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
          name: 'John',
          surname: 'Doe'
        },
        description: 'New discussion added to the list',
        views: 10,
        comments: 5,
      },
      {
        image: 'https://s3-alpha-sig.figma.com/img/6f89/2495/1ce6a19ebe8b63249da715ebf01b379f?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MPZqdnWAw2tiI9WVF~yq7KaZQdiwVcTgMzbhcefN8ChmYcknsVnlE61fkVjoIZZqDXBfiLHnBvyLzpL55areZgraUbUU0ZyxJPmKo67A1ag0mtSVblVvdVPqETLM4Dx0blYuiAu4UZ8xoo8tjGly3dxS9VQBan-OFtlzpk8uz8uZclBCdO1HVJ2GbyRfluR8T3XIKbxEpJidFZLccBpE6cXAgq0yyR9aDdWY8aVMaqgFVjKZ2sgXJWEzxvUoQAiJaaJpgfEOgBfCjQMqlUtzglv~qMu-JL~1eAeIMnpqemlOXOCNOyZ1pBUEeVamxDDmET6z8gHUd0nuRYvB8rj9wA__',
        title: 'New Discussion Title',
        creator: {
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
          name: 'John',
          surname: 'Doe'
        },
        description: 'New discussion added to the list',
        views: 10,
        comments: 5,
      }
    ];
    setDiscussions(prevDiscussions => [...prevDiscussions, ...newDiscussions]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
        {discussions.map((discussion, index) => (
          <CardDiscussion
            key={index}
            views={discussion.views}
            comments={discussion.comments}
            description={discussion.description}
            creator={discussion.creator}
            title={discussion.title}
            image={discussion.image}
          />
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Button onClick={loadMoreDiscussions} className="rounded-lg" variant="outline" size="sm">
          Load more projects
        </Button>
      </div>
    </div>
  );
};
