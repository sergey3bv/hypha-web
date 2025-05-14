'use client';

import { publicClient } from '@core/common';
import useSWR from 'swr';
import { getProposalDetails } from '../web3';
import React from 'react';
import { erc20Abi, decodeFunctionData } from 'viem';

export const useProposalDetailsWeb3Rpc = ({
  proposalId,
  quorumTotal = 100,
}: {
  proposalId: number;
  quorumTotal?: number;
}) => {
  const { data, isLoading, error } = useSWR(
    [proposalId, 'proposalDetails'],
    async ([proposalId]) =>
      publicClient.readContract(
        getProposalDetails({ proposalId: BigInt(proposalId) }),
      ),
    {
      revalidateOnFocus: true,
      refreshInterval: 10000,
    },
  );

  const parsedProposal = React.useMemo(() => {
    if (!data) return null;
    const [
      spaceId,
      startTime,
      endTime,
      executed,
      expired,
      yesVotes,
      noVotes,
      totalVotingPowerAtSnapshot,
      creator,
      transactions,
    ] = data;

    const totalVotingPowerNumber = Number(totalVotingPowerAtSnapshot);
    const quorumPercentage =
      quorumTotal > 0
        ? Math.min(100, (totalVotingPowerNumber / quorumTotal) * 100)
        : 0;

    const parsedTransferTransactions = (transactions as any[])
      .map((tx) => {
        try {
          const decoded = decodeFunctionData({
            abi: erc20Abi,
            data: tx.data,
          });

          if (decoded.functionName !== 'transfer') return null;

          const recipient = decoded.args?.[0] as string;
          const rawAmount = decoded.args?.[1] as bigint;

          return {
            recipient,
            rawAmount,
            token: tx.target,
            value: tx.value,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return {
      creator,
      spaceId: Number(spaceId),
      executed,
      expired,
      startTime: new Date(Number(startTime) * 1000),
      endTime: new Date(Number(endTime) * 1000),
      yesVotes: Number(yesVotes),
      noVotes: Number(noVotes),
      totalVotingPowerAtSnapshot: totalVotingPowerNumber,
      yesVotePercentage:
        totalVotingPowerNumber > 0
          ? (Number(yesVotes) / totalVotingPowerNumber) * 100
          : 0,
      noVotePercentage:
        totalVotingPowerNumber > 0
          ? (Number(noVotes) / totalVotingPowerNumber) * 100
          : 0,
      quorumPercentage,
      transfers: parsedTransferTransactions,
    };
  }, [data, quorumTotal]);

  return {
    proposalDetails: parsedProposal,
    isLoading,
    error,
  };
};
