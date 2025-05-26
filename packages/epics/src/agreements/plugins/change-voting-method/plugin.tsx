'use client';

import { useState } from 'react';
import { VotingMethodSelector } from '../../components/voting-method-selector';
import { Person } from '@core/people';
import { MemberWithNumberFieldFieldArray } from '../components/common/member-with-number-field-array';
import { DecaySettingsField } from '../components/common/decay-settings-field';
import { TokenSelectorField } from '../components/common/token-selector-field';
import { useTokens } from '@hypha-platform/epics';
import { QuorumAndUnityChangerField } from '../components/common/quorum-and-unity-change-field';

export const ChangeVotingMethodPlugin = ({
  spaceSlug,
  members,
}: {
  spaceSlug: string;
  members: Person[];
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const { tokens } = useTokens();
  return (
    <div className="flex flex-col gap-4">
      <VotingMethodSelector onChange={setSelectedMethod} />
      {selectedMethod === '1v1v' && (
        <>
          <MemberWithNumberFieldFieldArray name="members" members={members} />
          <DecaySettingsField name="decaySettings" />
        </>
      )}
      {selectedMethod === '1t1v' && (
        <TokenSelectorField name="token" tokens={tokens} />
      )}
      <QuorumAndUnityChangerField name="quorumAndUnity"/>
    </div>
  );
};
