'use client';

import { VotingMethodSelector } from '../../components/voting-method-selector';

export const ChangeVotingMethodPlugin = () => {
  return (
    <div className="flex flex-col gap-4">
      <VotingMethodSelector />
    </div>
  );
};
