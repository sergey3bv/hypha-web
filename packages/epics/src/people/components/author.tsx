type AuthorProps = {
  author: {
    name?: string;
    surname?: string;
  };
};

export const Author = ({ author }: AuthorProps) => {
  return (
    <div className="flex items-center gap-2 font-medium text-1">
      <span>{author?.name}</span>
      <span>{author?.surname}</span>
    </div>
  );
};
