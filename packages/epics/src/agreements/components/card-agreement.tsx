import { Text } from '@radix-ui/themes';
import { Card, Badge } from '@hypha-platform/ui';
import Image from 'next/image';
import { EyeOpenIcon, ChatBubbleIcon } from '@radix-ui/react-icons';

type CreatorType = {
  avatar: string;
  name: string;
  surname: string;
};

type AgreementCardProps = {
  creator: CreatorType;
  title: string;
  commitment: number;
  status: string;
  views: number;
  comments: number;
};

const statusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="positive">Active</Badge>;
    case 'voting':
      return <Badge variant="warning">On voting</Badge>;
    case 'completed':
      return <Badge variant="action">Completed</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejected</Badge>;
  }
};

export const CardAgreement: React.FC<AgreementCardProps> = ({
  commitment,
  status,
  title,
  creator,
  views,
  comments,
}) => {
  return (
    <Card className="w-full h-full p-6 mb-2 flex">
      <Image
        className="rounded-lg mr-3"
        src={creator.avatar}
        height={64}
        width={64}
        alt={title}
      ></Image>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <Badge variant="action">Agreement</Badge>
            <Badge variant="actionOutline">Recurring</Badge>
            <Badge variant="actionOutline">{commitment}%</Badge>
            {statusBadge(status)}
          </div>
          <Text className="text-3">{title}</Text>
          <Text className="text-xs text-gray-500">
            {creator.name} {creator.surname}
          </Text>
        </div>
        <div className="flex flex-grow gap-2 text-xs text-gray-500 items-end justify-end h-full">
          <div className="flex">
            <EyeOpenIcon className="mr-1" width={16} />
            <div>{views}</div>
          </div>
          <div className="flex ml-3">
            <ChatBubbleIcon className="mr-1" width={16} />
            <div>{comments}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
