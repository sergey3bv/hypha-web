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

type ProposalDetailProps = ProposalHeadProps & {
  onAccept: () => void;
  onReject: () => void;
  onSetActiveFilter: (value: string) => void;
  content?: string;
  closeUrl: string;
  leadImage?: string;
  attachments?: string[];
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
  onSetActiveFilter,
  closeUrl,
  leadImage,
  attachments,
}: ProposalDetailProps) => {
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
        unity={50}
        quorum={25}
        date={formatISO(addDays(new Date(), 2))}
        onAccept={onAccept}
        onReject={onReject}
      />
      <Separator />
      <CommentsList
        activeFilter="most-recent"
        setActiveFilter={onSetActiveFilter}
        pagination={{
          total: 1,
        }}
        sortOptions={[
          {
            label: 'Most Recent',
            value: 'most-recent',
          },
          {
            label: 'Oldest',
            value: 'oldest',
          },
        ]}
        comments={[
          {
            id: '1',
            comment:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            author: {
              avatar: 'https://github.com/shadcn.png',
              name: 'John',
              surname: 'Doe',
            },
            likes: 10,
          },
        ]}
      />
    </div>
  );
};
