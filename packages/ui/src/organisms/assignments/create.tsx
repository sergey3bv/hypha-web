import { Editor } from '../editor';

type AssignmentCreateProps = {
  title: string;
};

export const AssignmentCreate: React.FC<AssignmentCreateProps> = ({
  title,
}) => {
  return (
    <div className="flex flex-col w-full">
      <h1>{title}</h1>
      <Editor />
    </div>
  );
};
