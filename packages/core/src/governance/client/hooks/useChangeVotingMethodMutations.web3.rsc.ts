'use client';

import { Config, writeContract } from '@wagmi/core';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { encodeFunctionData } from 'viem';
import { publicClient } from '@core/common/web3/public-client';
import { schemaCreateProposalWeb3 } from '@core/governance/validation';
import {
  getProposalFromLogs,
  mapToCreateProposalWeb3Input,
  createProposal,
} from '../web3';
import {
  daoSpaceFactoryImplementationAbi,
  daoSpaceFactoryImplementationAddress,
} from '@core/generated';

interface ChangeVotingMethodArgs {
  spaceId: number;
  members: { member: string; number: number }[];
  decaySettings: {
    decayPeriod: number;
    timeFormat: string;
    decayPercent: number;
  };
  token: `0x${string}` | undefined;
  quorumAndUnity: { quorum: bigint; unity: bigint };
  votingMethod: '1m1v' | '1v1v' | '1t1v';
}

export const useChangeVotingMethodMutationsWeb3Rpc = (config?: Config) => {
  const {
    trigger: createChangeVotingMethod,
    reset: resetChangeVotingMethod,
    isMutating: isChangeVotingMethodMutating,
    data: createProposalHash,
    error: errorChangeVotingMethod,
  } = useSWRMutation(
    config ? [config, 'changeVotingMethod'] : null,
    async ([cfg], { arg }: { arg: ChangeVotingMethodArgs }) => {
      const chainId = 8453;

      let txData: Array<{
        target: `0x${string}`;
        value: number;
        data: `0x${string}`;
      }> = [];

      if (arg.votingMethod === '1m1v') {
        txData = [
          {
            target: daoSpaceFactoryImplementationAddress[chainId],
            value: 0,
            data: encodeFunctionData({
              abi: daoSpaceFactoryImplementationAbi,
              functionName: 'changeVotingMethod',
              args: [
                BigInt(arg.spaceId),
                BigInt(2),
                BigInt(arg.quorumAndUnity.unity),
                BigInt(arg.quorumAndUnity.quorum),
              ],
            }),
          },
        ];
      }

      const parsedProposal = schemaCreateProposalWeb3.parse({
        spaceId: arg.spaceId,
        duration: 604800,
        transactions: txData,
      });

      const proposalArgs = mapToCreateProposalWeb3Input(parsedProposal);
      return writeContract(cfg, createProposal(proposalArgs));
    },
  );

  const {
    data: changeVotingMethodData,
    isLoading: isLoadingProposalFromTx,
    error: errorWaitProposalFromTx,
  } = useSWR(
    createProposalHash ? [createProposalHash, 'waitFor'] : null,
    async ([hash]) => {
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return getProposalFromLogs(receipt.logs);
    },
  );

  return {
    createChangeVotingMethod,
    resetChangeVotingMethod,
    isChangeVotingMethodMutating,
    createProposalHash,
    errorChangeVotingMethod,
    changeVotingMethodData,
    isLoadingProposalFromTx,
    errorWaitProposalFromTx,
  };
};
