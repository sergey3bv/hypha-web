'use client';

import useSWRMutation from 'swr/mutation';
import { Config, writeContract } from '@wagmi/core';
import { getProposalFromLogs } from '../web3';
import useSWR from 'swr';
import { publicClient } from '@core/common/web3/public-client';
import { encodeFunctionData, erc20Abi } from 'viem';
import {
  daoProposalsImplementationAbi,
  daoProposalsImplementationAddress,
} from '@core/generated';

interface CreatePayForExpensesInput {
  spaceId: number;
  payouts: {
    amount: string;
    token: string;
  }[];
  recipient: string;
}

export const usePayForExpensesMutationsWeb3Rpc = (config?: Config) => {
  const {
    trigger: createPayForExpensesMutation,
    reset: resetCreatePayForExpensesMutation,
    isMutating: isCreatingPayForExpenses,
    data: createPayForExpensesHash,
    error: errorCreatePayForExpenses,
  } = useSWRMutation(
    config ? [config, 'createPayForExpenses'] : null,
    async ([config], { arg }: { arg: CreatePayForExpensesInput }) => {
      const transactions = arg.payouts.map((payout) => {
        const amount = BigInt(Math.round(parseFloat(payout.amount) * 1e18));
        return {
          target: payout.token as `0x${string}`,
          value: BigInt(0),
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: 'transfer',
            args: [arg.recipient as `0x${string}`, amount],
          }),
        } as const;
      });

      const proposalParams = {
        spaceId: BigInt(arg.spaceId),
        duration: BigInt(86400),
        transactions: transactions as readonly {
          target: `0x${string}`;
          value: bigint;
          data: `0x${string}`;
        }[],
      };

      return writeContract(config, {
        address: daoProposalsImplementationAddress[8453],
        abi: daoProposalsImplementationAbi,
        functionName: 'createProposal',
        args: [proposalParams],
      });
    },
  );

  const {
    data: createdPayForExpenses,
    isLoading: isLoadingPayForExpensesFromTransaction,
    error: errorWaitPayForExpensesFromTransaction,
  } = useSWR(
    createPayForExpensesHash
      ? [createPayForExpensesHash, 'waitForPayForExpenses']
      : null,
    async ([hash]) => {
      const { logs } = await publicClient.waitForTransactionReceipt({
        hash,
      });
      return getProposalFromLogs(logs);
    },
  );

  return {
    createPayForExpenses: createPayForExpensesMutation,
    resetCreatePayForExpensesMutation,
    isCreatingPayForExpenses: isCreatingPayForExpenses,
    isLoadingPayForExpensesFromTransaction,
    errorCreatePayForExpenses,
    errorWaitPayForExpensesFromTransaction,
    createPayForExpensesHash,
    createdPayForExpenses,
  };
};
