'use client';

import { Locale } from '@hypha-platform/i18n';
import { Space } from '@core/space';
import {
  UseMembers,
  SpacesWithFilter,
  useMemberWeb3SpaceIds,
} from '@hypha-platform/epics';
import { useState } from 'react';
import { Person, useMe } from '@core/people';

function filterSpaces(
  spaces: Space[],
  user: Person | undefined,
  mySpaces: boolean,
  web3SpaceIds: readonly bigint[] | undefined,
) {
  if (!mySpaces || !user?.slug || !web3SpaceIds) {
    return spaces;
  }
  const userSpaces: Space[] = spaces.filter((space) => {
    return web3SpaceIds.indexOf(BigInt(space.web3SpaceId || -1)) != -1;
  });
  return userSpaces;
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
  const { person: user } = useMe();
  const { web3SpaceIds } = useMemberWeb3SpaceIds();
  const [showMySpaces, setShowMySpaces] = useState(false);

  const handleChangeFilter = (value: string) => {
    const mySpacesOnly = isMySpace(value);
    setShowMySpaces(mySpacesOnly);
  };

  return (
    <SpacesWithFilter
      lang={lang}
      spaces={filterSpaces(spaces, user, showMySpaces, web3SpaceIds)}
      showMySpaces={showMySpaces}
      useMembers={useMembers}
      handleChangeFilter={handleChangeFilter}
    />
  );
}
