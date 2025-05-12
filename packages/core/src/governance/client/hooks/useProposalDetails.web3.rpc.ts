'use client';

import { publicClient } from '@core/common';
import useSWR from 'swr';
import { getProposalDetails } from '../web3';
import React from 'react';

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
    ] = data;

    const totalVotingPowerNumber = Number(totalVotingPowerAtSnapshot);
    const quorumPercentage =
      quorumTotal > 0
        ? Math.min(100, (totalVotingPowerNumber / quorumTotal) * 100)
        : 0;

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
    };
  }, [data, quorumTotal]);

  return {
    proposalDetails: parsedProposal,
    isLoading,
    error,
  };
};
