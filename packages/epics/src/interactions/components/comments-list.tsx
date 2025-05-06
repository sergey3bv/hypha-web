import { SectionFilter } from '@hypha-platform/ui/server';
import { CardComment, CardCommentProps } from './card-comment';
import { FormInput } from './form-input';

type CommentsListProps = {
  pagination: {
    total: number;
  };
  comments?: CardCommentProps[];
};

export const CommentsList = ({ pagination, comments }: CommentsListProps) => {
  return (
    <div className="flex flex-col gap-5">
      <SectionFilter count={pagination?.total || 0} label="Comments" />
      <div className="flex flex-col gap-2">
        {comments?.map((comment) => (
          <CardComment key={comment.id} {...comment} />
        )) || <div>No comments</div>}
        <FormInput />
      </div>
    </div>
  );
};
