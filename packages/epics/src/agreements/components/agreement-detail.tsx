import { AgreementHead, AgreementHeadProps } from './agreement-head';
import { Button, Separator } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { CommentsList } from '../../interactions/components/comments-list';
import Link from 'next/link';
import { CardCommentProps } from '../../interactions/components/card-comment';

type AgreementDetailProps = AgreementHeadProps & {
  onSetActiveFilter: (value: string) => void;
  content: string;
  closeUrl: string;
  comments?: CardCommentProps[];
};

export const AgreementDetail = ({
  creator,
  title,
  commitment,
  status,
  isLoading,
  content,
  onSetActiveFilter,
  closeUrl,
  comments,
}: AgreementDetailProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between">
        <AgreementHead
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
      <div>{content}</div>

      <Separator />
      <CommentsList
        activeFilter="most-recent"
        setActiveFilter={onSetActiveFilter}
        pagination={{
          total: comments?.length ?? 0,
        }}
        sortOptions={[
          { label: 'All', value: 'all' },
          {
            label: 'Most recent',
            value: 'most-recent',
          },
        ]}
        comments={comments}
      />
    </div>
  );
};
