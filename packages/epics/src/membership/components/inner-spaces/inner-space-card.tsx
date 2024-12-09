import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Skeleton,
} from '@hypha-platform/ui';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text } from '@radix-ui/themes';
import { truncateWithEllipsis } from '@hypha-platform/ui-utils';

type Member = {
  avatar: string;
  name: string;
  surname: string;
};

type InnerSpaceCardProps = {
  members?: Member[];
  image?: string;
  title?: string;
  description?: string;
  joinedStatus?: boolean;
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

export const InnerSpaceCard: React.FC<InnerSpaceCardProps> = ({
  description,
  image,
  title,
  members,
  joinedStatus,
  isLoading,
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader
        style={customCardHeaderStyles}
        className="p-0 rounded-tl-md rounded-tr-md overflow-hidden"
      >
        {isLoading ? (
          <Skeleton className="rounded-tl-xl rounded-tr-xl object-cover w-full h-full" />
        ) : (
          <img
            className="rounded-tl-xl rounded-tr-xl object-cover w-full h-full"
            src={image}
            alt={title}
          ></img>
        )}
      </CardHeader>
      <CardContent className="pt-5 relative">
        <div className="flex flex-col items-start mb-5">
          {isLoading ? (
            <Skeleton height={18} width={150} />
          ) : (
            <CardTitle style={customCardTitleStyles}>{title}</CardTitle>
          )}
        </div>
        <div className="flex flex-grow text-xs text-gray-500 mb-4">
          {isLoading ? (
            <Skeleton width={200} height={48} />
          ) : (
            <div>
              {description ? truncateWithEllipsis(description, 100) : null}
            </div>
          )}
        </div>
        <div className="flex gap-1 mb-4">
          {isLoading ? (
            <div className="flex gap-1">
              <Skeleton width={24} height={24} className="rounded-lg" />
              <Skeleton width={24} height={24} className="rounded-lg" />
              <Skeleton width={24} height={24} className="rounded-lg" />
            </div>
          ) : (
            <div className="flex gap-1">
              {members
                ? members.slice(0, 3).map((member) => (
                    <Avatar>
                      <AvatarImage
                        className="rounded-lg"
                        src={member.avatar}
                        width={24}
                        height={24}
                      ></AvatarImage>
                    </Avatar>
                  ))
                : null}
            </div>
          )}
          {isLoading ? (
            <Skeleton width={106} height={24} />
          ) : (
            <Text className="ml-2 flex items-center text-xs text-action-light text-nowrap">
              + other {members ? members.length - 3 : null} members
            </Text>
          )}
        </div>
        {isLoading ? (
          <Skeleton width={200} height={32} className="rounded-lg" />
        ) : (
          <div>
            {joinedStatus ? (
              <Button
                className="rounded-lg w-full"
                variant="actionOutlineChecked"
                size="sm"
              >
                Joined
              </Button>
            ) : (
              <Button
                className="rounded-lg w-full"
                variant="actionOutline"
                size="sm"
              >
                Join
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
