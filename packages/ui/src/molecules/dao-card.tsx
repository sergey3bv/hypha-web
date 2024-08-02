import { Avatar, Card, Flex } from '@radix-ui/themes';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';

type DaoCardProps = {
  createdDate: string;
  description: string;
  icon: string;
  members: number;
  title: string;
};

export const DaoCard: React.FC<DaoCardProps> = ({
  createdDate,
  description,
  icon,
  members,
  title,
}) => {
  return (
    <Card className="h-full">
      <Flex direction="column" gap="4">
        <Flex align="center" gap="4">
          <Avatar radius="full" size="4" src={icon} alt="logo" fallback={''} />
          <div className="text-xl font-black font-heading">{title}</div>
        </Flex>
        <div className="flex flex-grow text-xs text-gray-500">
          {description}
        </div>
        <div className="flex flex-grow gap-2">
          <FaCalendarAlt />
          <span className="text-xs">{createdDate}</span>
        </div>
        <div className="flex flex-grow gap-2">
          <FaUsers />
          <div className="text-xs">{members} Members</div>
        </div>
      </Flex>
    </Card>
  );
};
