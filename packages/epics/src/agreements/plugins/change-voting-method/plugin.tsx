'use client';

import { useState } from 'react';
import { VotingMethodSelector } from '../../components/voting-method-selector';
import { Person } from '@core/people';
import { MemberWithNumberFieldFieldArray } from '../components/common/member-with-number-field-array';
import { DecaySettingsField } from '../components/common/decay-settings-field';
import { TokenSelectorField } from '../components/common/token-selector-field';
import { useTokens } from '@hypha-platform/epics';
import { QuorumAndUnityChangerField } from '../components/common/quorum-and-unity-change-field';
import { useFormContext } from 'react-hook-form';

export const ChangeVotingMethodPlugin = ({
  members,
}: {
  spaceSlug: string;
  members: Person[];
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const { tokens } = useTokens();
  const { reset, setValue } = useFormContext();

  const handleMethodChange = (method: string | null) => {
    setSelectedMethod(method);
    setValue('votingMethod', method as '1m1v' | '1v1v' | '1t1v');
    setValue('members', []);
    setValue('decaySettings', {
      decayPeriod: 1,
      timeFormat: 'Minutes',
      decayPercent: 1,
    });
    setValue('token', undefined);
    setValue('quorumAndUnity', { quorum: 0, unity: 0 });
  };

  return (
    <div className="flex flex-col gap-4">
      <VotingMethodSelector onChange={handleMethodChange} />
      {selectedMethod === '1v1v' && (
        <>
          <MemberWithNumberFieldFieldArray name="members" members={members} />
          <DecaySettingsField name="decaySettings" />
        </>
      )}
      {selectedMethod === '1t1v' && (
        <TokenSelectorField name="token" tokens={tokens} />
      )}
      <QuorumAndUnityChangerField name="quorumAndUnity" />
    </div>
  );
};
