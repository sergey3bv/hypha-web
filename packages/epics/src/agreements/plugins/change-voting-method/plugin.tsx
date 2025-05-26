'use client';

import { useState } from 'react';
import { VotingMethodSelector } from '../../components/voting-method-selector';
import { Person } from '@core/people';
import { MemberWithNumberFieldFieldArray } from '../components/common/member-with-number-field-array';

export const ChangeVotingMethodPlugin = ({
  spaceSlug,
  members,
}: {
  spaceSlug: string;
  members: Person[];
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <VotingMethodSelector onChange={setSelectedMethod} />
      {selectedMethod === '1v1v' && (
        <MemberWithNumberFieldFieldArray members={members} />
      )}
    </div>
  );
};
