'use client';

import { Locale } from '@hypha-platform/i18n';
import { Space } from '@core/space';
import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import { PlusIcon } from '@radix-ui/react-icons';
import { UseMembers, SpaceCardList } from '@hypha-platform/epics';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { useState } from 'react';
import { Person, useMe } from '@core/people';
import { useMemberWeb3SpaceIds } from '@web/hooks/use-member-web3-space-ids';

type OptionType = {
  label: string;
  value: string;
};

type SpacesFilterType = {
  value: string;
  options: OptionType[];
};

function filterSpaces(spaces: Space[], user: Person | undefined, mySpaces: boolean) {
  const { web3SpaceIds } = useMemberWeb3SpaceIds();
  if (!mySpaces || !user?.slug || !web3SpaceIds) {
    return spaces;
  }
  const userSpaces: Space[] = spaces.filter((space) => {
    return web3SpaceIds.indexOf(BigInt(space.web3SpaceId || -1)) != -1;
  });
  return userSpaces;
}

function filterMySpaces(spaces: Space[], mySpaces: boolean) {
  const { person: user } = useMe();
  return filterSpaces(spaces, user, mySpaces);
}

function isMySpace(value: string): boolean {
  return value == 'my-spaces';
}

export function FilteredSpaces({
  lang,
  spaces,
  useMembers,
}: {
  lang: Locale;
  spaces: Space[];
  useMembers: UseMembers;
}) {
  const [showMySpaces, setShowMySpaces] = useState(false);

  const mySpacesCount = 2;

  const filterSettings: SpacesFilterType = {
    value: 'all',
    options: [
      { label: 'All', value: 'all' },
      { label: 'My Spaces', value: 'my-spaces' },
    ],
  };

  const handleChangeFilter = (value: string) => {
    const mySpacesOnly = isMySpace(value);
    setShowMySpaces(mySpacesOnly);
  };

  return (
    <div className="space-y-6">
      <div className="justify-between items-center flex">
        <Text className="text-4">My spaces | {mySpacesCount}</Text>
        <div className="flex items-center">
          <FilterMenu
            value={filterSettings.value}
            options={filterSettings.options}
            onChange={handleChangeFilter}
          />
          <Link href={`/${lang}/my-spaces/create`} scroll={false}>
            <Button className="ml-2">
              <PlusIcon className="mr-2" />
              Create Space
            </Button>
          </Link>
        </div>
      </div>
      <SpaceCardList
        lang={lang}
        spaces={filterMySpaces(spaces, showMySpaces)}
        useMembers={useMembers}
      />
    </div>
  );
}