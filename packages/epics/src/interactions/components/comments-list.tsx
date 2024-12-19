import { FilterOption, SectionFilter } from '@hypha-platform/ui/server';
import { CardComment, CardCommentProps } from './card-comment';
import { FormInput } from './form-input';

type CommentsListProps = {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  pagination: {
    total: number;
  };
  sortOptions: FilterOption[];
  comments?: CardCommentProps[];
};

export const CommentsList = ({
  activeFilter,
  setActiveFilter,
  pagination,
  sortOptions,
  comments,
}: CommentsListProps) => {
  return (
    <div className="flex flex-col gap-5">
      <SectionFilter
        value={activeFilter}
        onChange={setActiveFilter}
        count={pagination?.total || 0}
        label="Comments"
        sortOptions={sortOptions}
      />
      <div className="flex flex-col gap-2">
        {comments?.map((comment) => (
          <CardComment key={comment.id} {...comment} />
        )) || <div>No comments</div>}
        <FormInput />
      </div>
    </div>
  );
};
