import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@hypha-platform/ui';
import { EyeOpenIcon, ChatBubbleIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Text } from '@radix-ui/themes';

type CreatorType = {
  avatar?: string;
  name?: string;
  surname?: string;
};

type DiscussionCardProps = {
  creator?: CreatorType;
  image?: string;
  title?: string;
  description?: string;
  views?: number;
  comments?: number;
  isLoading?: boolean | undefined;
};

const customCardHeaderStyles: React.CSSProperties = {
  height: '150px',
};

const customCardTitleStyles: React.CSSProperties = {
  fontSize: '18px',
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

export const DiscussionCard: React.FC<DiscussionCardProps> = ({
  description,
  image,
  views,
  comments,
  title,
  creator,
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
          />
        )}
      </CardHeader>
      <CardContent className="pt-5 relative">
        <div className="flex flex-col items-start mb-5">
          {isLoading ? (
            <Skeleton width={120} height={18} />
          ) : (
            <CardTitle style={customCardTitleStyles}>{title}</CardTitle>
          )}
          <div className="mt-2 flex items-center">
            {isLoading ? (
              <Skeleton width={12} height={12} className="rounded-md" />
            ) : (
              <Avatar>
                <AvatarImage
                  className="rounded-md"
                  width={12}
                  height={12}
                  src={creator?.avatar}
                  alt="logo"
                />
              </Avatar>
            )}
            {isLoading ? (
              <Skeleton width={50} height={16} className="ml-2" />
            ) : (
              <Text className="ml-2 text-xs text-gray-500">
                {creator?.name} {creator?.surname}
              </Text>
            )}
          </div>
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
        <div className="flex flex-grow gap-2 text-xs text-gray-500 items-center">
          {isLoading ? (
            <Skeleton width={16} height={16} />
          ) : (
            <div className="flex">
              <EyeOpenIcon className="mr-1" width={16} />
              <div>{views}</div>
            </div>
          )}
          {isLoading ? (
            <Skeleton width={16} height={16} />
          ) : (
            <div className="flex ml-3">
              <ChatBubbleIcon className="mr-1" width={16} />
              <div>{comments}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
