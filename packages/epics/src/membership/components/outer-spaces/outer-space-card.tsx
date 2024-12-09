import {
  Avatar,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton
} from '@hypha-platform/ui';

type OuterSpaceCardProps = {
  logo?: string;
  members?: number;
  title?: string;
  description?: string;
  projects?: number;
  isLoading?: boolean;
};

const customCardHeaderStyles: React.CSSProperties = {
  height: '150px',
};

const customCardTitleStyles: React.CSSProperties = {
  fontSize: '18px',
  whiteSpace: 'nowrap',
  fontWeight: '500',
};

const customAvatarStyles: React.CSSProperties = {
  width: '64px',
  height: '64px',
  position: 'absolute',
  top: '-54px',
};

const truncateWithEllipsis: (inputText: string, maxLength: number) => string = (
  inputText,
  maxLength
) => {
  if (inputText.length > maxLength) {
    return inputText.slice(0, maxLength) + '...';
  }
  return inputText;
};

export const OuterSpaceCard: React.FC<OuterSpaceCardProps> = ({
  description,
  logo,
  members,
  projects,
  title,
  isLoading
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader
        style={customCardHeaderStyles}
        className="p-0 rounded-tl-md rounded-tr-md overflow-hidden"
      >
        {isLoading ? <Skeleton className='rounded-tl-xl rounded-tr-xl object-cover w-full h-full'/> :
        <img
          className="rounded-tl-xl rounded-tr-xl object-cover w-full h-full"
          src={logo}
          alt={title}
        ></img>}
      </CardHeader>
      <CardContent className="pt-5 relative">
        <Avatar style={customAvatarStyles}>
          <AvatarImage src={logo} alt="logo" />
        </Avatar>
        <div className="flex items-center justify-between mb-4">
          {isLoading ? <Skeleton height={18} width={150}/> :
          <CardTitle style={customCardTitleStyles}>{title}</CardTitle>}
        </div>
        <div className="flex flex-grow text-xs text-gray-500 mb-4">
          {isLoading ? <Skeleton width={328} height={28}/> : 
          <div>{description ? truncateWithEllipsis(description, 100) : null}</div>}
        </div>
        <div className="flex flex-grow gap-2 text-xs items-center">
          <div className="flex">
            {isLoading ? <Skeleton width={16} height={16}/> : <div className="font-bold">{members}</div>}
            {isLoading ? <Skeleton width={52} height={16} className='ml-1'/> : <div className="text-gray-500 ml-1">Members</div>}
          </div>
          <div className="flex ml-3">
            {isLoading ? <Skeleton width={16} height={16}/> : <div className="font-bold">{projects}</div>}
            {isLoading ? <Skeleton width={52} height={16} className='ml-1'/> : <div className="text-gray-500 ml-1">Projects</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
