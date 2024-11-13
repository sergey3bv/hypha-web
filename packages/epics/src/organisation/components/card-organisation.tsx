import { Avatar, AvatarImage, Badge, Card, CardContent, CardHeader, CardTitle } from '@hypha-platform/ui';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';

type DaoCardProps = {
  createdDate: string;
  description: string;
  icon: string;
  members: number;
  agreements: number;
  title: string;
  agreements: number;
  activeAgreements?: number;
  openDiscussions?: number;
};

const customCardHeaderStyles = {
  height: '150px'
}

const customCardTitleStyles = {
  fontSize: '18px'
}

const customAvatarStyles = {
  width: '64px',
  height: '64px',
  position: 'absolute',
  top: '-54px'
}

const truncateWithEllipsis: (inputText: string, maxLength: number) => string = (inputText, maxLength) => {
  if (inputText.length > maxLength) {
      return inputText.slice(0, maxLength) + '...';
  }
  return inputText;
};

export const CardOrganisation: React.FC<DaoCardProps> = ({
  createdDate,
  description,
  icon,
  members,
  agreements,
  activeAgreements,
  openDiscussions,
  title,
  agreements
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader style={customCardHeaderStyles} className='p-0 rounded-tl-md rounded-tr-md overflow-hidden'>
        <img className='rounded-tl-xl rounded-tr-xl object-cover w-full h-full' src={icon} alt={title}></img>
      </CardHeader>
      <CardContent className="pt-5 relative">
        <Avatar style={customAvatarStyles}>
          <AvatarImage src={icon} alt="logo" />
        </Avatar>
        <div className="flex items-center justify-between mb-4">
          <CardTitle style={customCardTitleStyles}>
            {title}
          </CardTitle>
          <div className="flex">
            <div>
              {activeAgreements > 0 && (
                <Badge variant="positive">{activeAgreements} Active Agreements</Badge>
              )}
            </div>
            <div className="ml-2">
              {openDiscussions > 0 && (
                <Badge variant="warning">{openDiscussions} Open Discussions</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-grow text-xs text-gray-500 mb-4">
          {truncateWithEllipsis(description, 100)}
        </div>
        <div className="flex flex-grow gap-2 text-xs items-center">
          <div className="flex">
            <div className="font-bold">{members}</div>
            <div className="text-gray-500 ml-1">Members</div>
          </div>
          <div className="flex ml-3">
            <div className="font-bold">{agreements}</div>
            <div className="text-gray-500 ml-1">Agreements</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
