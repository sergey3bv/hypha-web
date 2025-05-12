import { useMemo } from 'react';

export interface RawProposalProps {
  creator: `0x${string}`;
  endTime: bigint;
  executed: boolean;
  expired: boolean;
  noVotes: bigint;
  spaceId: bigint;
  startTime: bigint;
  totalVotingPowerAtSnapshot: bigint;
  yesVotes: bigint;
}

export function useParsedProposal(
  rawProposal: RawProposalProps | undefined,
  quorumTotal = 100,
) {
  return useMemo(() => {
    if (!rawProposal) return null;

    const {
      creator,
      endTime,
      executed,
      expired,
      noVotes,
      spaceId,
      startTime,
      totalVotingPowerAtSnapshot,
      yesVotes,
    } = rawProposal;

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
  }, [rawProposal, quorumTotal]);
}
