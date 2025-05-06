'use client';

import useSWRMutation from 'swr/mutation';
import { Config, writeContract } from '@wagmi/core';
import {
  createProposal,
  getProposalFromLogs,
  mapToCreateProposalWeb3Input,
} from '../web3';
import { schemaCreateProposalWeb3 } from '@core/governance/validation';
import useSWR from 'swr';
import { publicClient } from '@core/common/web3/public-client';
import { encodeFunctionData } from 'viem';
import {
  agreementsImplementationAbi,
  agreementsImplementationAddress,
  daoProposalsImplementationAbi,
  daoProposalsImplementationAddress,
} from '@core/generated';

export const useAgreementMutationsWeb3Rpc = (config?: Config) => {
  const {
    trigger: createAgreementMutation,
    reset: resetCreateAgreementMutation,
    isMutating: isCreatingAgreement,
    data: createAgreementHash,
    error: errorCreateAgreement,
  } = useSWRMutation(
    config ? [config, 'createProposal'] : null,
    async ([config], { arg }: { arg: { spaceId: number } }) => {
      const proposalCounter = await publicClient.readContract({
        address: daoProposalsImplementationAddress[8453],
        abi: daoProposalsImplementationAbi,
        functionName: 'proposalCounter',
      });

      const acceptAgreementTx = {
        target: agreementsImplementationAddress[8453],
        value: 0,
        data: encodeFunctionData({
          abi: agreementsImplementationAbi,
          functionName: 'acceptAgreement',
          args: [BigInt(arg.spaceId), proposalCounter + 1n],
        }),
      };

      const input = {
        spaceId: arg.spaceId,
        duration: 86400,
        transactions: [acceptAgreementTx],
      };
      console.log(input);
      const parsedInput = schemaCreateProposalWeb3.parse(input);
      const args = mapToCreateProposalWeb3Input(parsedInput);
      return writeContract(config, createProposal(args));
    },
  );

  const {
    data: createdAgreement,
    isLoading: isLoadingAgreementFromTransaction,
    error: errorWaitAgreementFromTransaction,
  } = useSWR(
    createAgreementHash ? [createAgreementHash, 'waitFor'] : null,
    async ([hash]) => {
      const { logs } = await publicClient.waitForTransactionReceipt({
        hash,
      });
      return getProposalFromLogs(logs);
    },
  );

  return {
    createAgreement: createAgreementMutation,
    resetCreateAgreementMutation,
    isCreatingAgreement,
    isLoadingAgreementFromTransaction,
    errorCreateAgreement,
    errorWaitAgreementFromTransaction,
    createAgreementHash,
    createdAgreement,
  };
};
