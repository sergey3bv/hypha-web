import { AgreementHead, AgreementHeadProps } from './agreement-head';
import { Button, Separator } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { CommentsList } from '../../interactions/components/comments-list';
import { CardCommentProps } from '../../interactions/components/card-comment';

type AgreementDetailProps = AgreementHeadProps & {
  onSetActiveFilter: (value: string) => void;
  content: string;
  comments: CardCommentProps[];
  sortOptions: {
    label: string;
    value: string;
  }[];
};

export const AgreementDetail = ({
  creator,
  title,
  commitment,
  status,
  isLoading,
  content,
  onSetActiveFilter,
  comments,
  sortOptions,
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
        <Button variant="ghost" colorVariant="neutral">
          Close
          <RxCross1 />
        </Button>
      </div>
      <Separator />
      <div>{content}</div>

      <Separator />
      <CommentsList
        activeFilter="most-recent"
        setActiveFilter={onSetActiveFilter}
        pagination={{
          total: 1,
        }}
        sortOptions={sortOptions}
        comments={comments}
      />
    </div>
  );
};
