import { addDays } from 'date-fns';
import { formatISO } from 'date-fns';
import { FormVoting } from './form-voting';
import { ProposalHead, ProposalHeadProps } from './proposal-head';
import {
  Button,
  Separator,
  AttachmentList,
  Skeleton,
} from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { CommentsList } from '../../interactions/components/comments-list';
import Link from 'next/link';
import Image from 'next/image';
import { useProposalDetailsWeb3Rpc, useParsedProposal } from '@core/governance';

type ProposalDetailProps = ProposalHeadProps & {
  onAccept: () => void;
  onReject: () => void;
  content?: string;
  closeUrl: string;
  leadImage?: string;
  attachments?: string[];
  proposalId?: number | null | undefined;
};

export const ProposalDetail = ({
  creator,
  title,
  commitment,
  status,
  isLoading,
  onAccept,
  onReject,
  content,
  closeUrl,
  leadImage,
  attachments,
  proposalId,
}: ProposalDetailProps) => {
  const { proposalDetails } = useProposalDetailsWeb3Rpc({
    proposalId: proposalId as number,
  });
  const parsedProposalData = useParsedProposal(proposalDetails);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between">
        <ProposalHead
          creator={creator}
          title={title}
          commitment={commitment}
          status={status}
          isLoading={isLoading}
        />
        <Link href={closeUrl} scroll={false}>
          <Button variant="ghost" colorVariant="neutral">
            Close
            <RxCross1 />
          </Button>
        </Link>
      </div>
      <Separator />
      <Skeleton
        width="100%"
        height="150px"
        loading={isLoading}
        className="rounded-lg"
      >
        <Image
          height={150}
          width={554}
          className="w-full object-cover rounded-lg max-h-[150px]"
          src={leadImage ?? ''}
          alt={title ?? ''}
        />
      </Skeleton>
      <div>{content}</div>
      <AttachmentList attachments={attachments || []} />
      <FormVoting
        unity={parsedProposalData?.yesVotePercentage || 0}
        quorum={parsedProposalData?.quorumPercentage || 0}
        endTime={formatISO(
          addDays(new Date(parsedProposalData?.endTime || new Date()), 2),
        )}
        onAccept={onAccept}
        onReject={onReject}
      />
      <Separator />
      <CommentsList
        pagination={{
          total: 0,
        }}
        comments={[]}
      />
    </div>
  );
};
