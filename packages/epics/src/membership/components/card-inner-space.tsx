import { Card, CardContent, CardHeader, CardTitle, Button } from '@hypha-platform/ui';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text } from '@radix-ui/themes';

type Member = {
  avatar: string,
  name: string,
  surname: string,
}

type CardInnerSpaceProps = {
  members: Member[];
  image: string;
  title: string;
  description: string;
  joinedStatus: boolean;
};

const customCardHeaderStyles: React.CSSProperties = {
  height: '150px'
}

const customCardTitleStyles: React.CSSProperties = {
  fontSize: '18px',
  whiteSpace: 'nowrap',
  fontWeight: '500'
}

const truncateWithEllipsis: (inputText: string, maxLength: number) => string = (inputText, maxLength) => {
  if (inputText.length > maxLength) {
      return inputText.slice(0, maxLength) + '...';
  }
  return inputText;
};

export const CardInnerSpace: React.FC<CardInnerSpaceProps> = ({
  description,
  image,
  title,
  members,
  joinedStatus
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader style={customCardHeaderStyles} className='p-0 rounded-tl-md rounded-tr-md overflow-hidden'>
        <img className='rounded-tl-xl rounded-tr-xl object-cover w-full h-full' src={image} alt={title}></img>
      </CardHeader>
      <CardContent className="pt-5 relative">
        <div className="flex flex-col items-start mb-5">
          <CardTitle style={customCardTitleStyles}>
            {title}
          </CardTitle>
        </div>
        <div className="flex flex-grow text-xs text-gray-500 mb-4">
          {truncateWithEllipsis(description, 100)}
        </div>
        <div className='flex gap-1 mb-4'>
          {members.slice(0, 3).map((member) => (
            <Avatar>
              <AvatarImage className="rounded-lg" src={member.avatar} width={24} height={24}></AvatarImage>
            </Avatar>
          ))}
          <Text className='ml-2 flex items-center text-xs text-action-light text-nowrap'>+ other {members.length - 3} members</Text>
        </div>
        <div>
          {joinedStatus ? <Button className="rounded-lg w-full" variant="actionOutlineChecked" size="sm">
            Joined
          </Button> : <Button className="rounded-lg w-full" variant="actionOutline" size="sm">
            Join
          </Button>}
        </div>
      </CardContent>
    </Card>
  );
};
