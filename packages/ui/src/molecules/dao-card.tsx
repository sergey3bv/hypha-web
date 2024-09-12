import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { Avatar, AvatarImage } from '../atoms';
import { Card, CardContent, CardHeader } from './card';

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
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={icon} alt="logo" />
          </Avatar>
          <div className="text-xl font-black font-heading">{title}</div>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
