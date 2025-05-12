'use client';

import { publicClient } from '@core/common';
import useSWR from 'swr';
import { getProposalDetails } from '../web3';
import React from 'react';

export const useProposalDetailsWeb3Rpc = ({
  proposalId,
}: {
  proposalId: number;
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

  const proposalDetails = React.useMemo(() => {
    if (data) {
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
      return {
        spaceId,
        startTime,
        endTime,
        executed,
        expired,
        yesVotes,
        noVotes,
        totalVotingPowerAtSnapshot,
        creator,
      };
    }
  }, [data]);

  return {
    proposalDetails,
    isLoading,
    error,
  };
};
