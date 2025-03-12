import { Button, Card, Image } from '@hypha-platform/ui';
import { Author } from '../../people/components/author';
import { RxHeart } from 'react-icons/rx';

export type User = {
  avatar?: string;
  name?: string;
  surname?: string;
};

export type CardCommentProps = {
  comment: string;
  author: User;
  likes: number;
  id: string;
};

export const CardComment = ({ comment, author, likes }: CardCommentProps) => {
  return (
    <Card className="flex gap-3 p-5">
      <div className="flex-shrink-0">
        <Image
          src={author?.avatar ?? ''}
          height={40}
          width={40}
          alt={
            author?.name && author?.surname
              ? `${author.name} ${author.surname}`
              : 'Creator Avatar'
          }
        />
      </div>
      <div className="flex-1">
        <Author author={author} />
        <div>{comment}</div>
      </div>
      <div className="flex flex-col justify-end">
        <Button variant="ghost" className="flex items-center gap-1">
          <RxHeart className="text-2" />
          {likes}
        </Button>
      </div>
    </Card>
  );
};
