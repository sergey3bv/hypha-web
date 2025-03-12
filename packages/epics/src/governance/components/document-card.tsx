import { type Person, type Document } from '@hypha-platform/core';
import {
  Skeleton,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge
} from '@hypha-platform/ui';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { DocumentInteractions } from './document-interactions';
import { Text } from '@radix-ui/themes';

interface DocumentCardProps {
  isLoading: boolean;
  leadImage?: string;
  creator: Person;
}

export const DocumentCard: React.FC<DocumentCardProps & Document> = ({
  isLoading,
  title,
  description,
  state,
  leadImage,
  creator,
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader className="p-0 rounded-tl-md rounded-tr-md overflow-hidden h-[150px]">
        <Skeleton loading={isLoading} className="min-w-full" height="150px" width="250px">
          <Image
            className="rounded-tl-xl rounded-tr-xl object-cover w-full h-full"
            src={leadImage || '/placeholder/document-lead-image.png'}
            alt={title}
            width={250}
            height={150}
          />
        </Skeleton>
      </CardHeader>
      <CardContent className="pt-5 relative">
        <div className="flex flex-col items-start mb-5">
          <Badge isLoading={isLoading} variant="solid" colorVariant="accent">
            {state?.toUpperCase()}
          </Badge>
          <Skeleton className="min-w-full" width="120px" height="18px" loading={isLoading}>
            <CardTitle>{title}</CardTitle>
          </Skeleton>
          <div className="mt-2 flex items-center">
            <Skeleton
              width="24px"
              height="24px"
              className="rounded-md"
              loading={isLoading}
            >
              <Avatar>
                <AvatarImage
                  className="rounded-md"
                  width={24}
                  height={24}
                  src={creator?.avatarUrl}
                  alt="logo"
                />
              </Avatar>
            </Skeleton>
            <Skeleton
              width="50px"
              height="16px"
              className="ml-2"
              loading={isLoading}
            >
              <Text className="ml-2 text-1 text-neutral-11">
                {creator?.name} {creator?.surname}
              </Text>
            </Skeleton>
          </div>
        </div>
        <div className="flex flex-grow text-1 text-neutral-11 mb-4">
          <Skeleton className="min-w-full" width="200px" height="48px" loading={isLoading}>
            <div className="line-clamp-3">{description}</div>
          </Skeleton>
        </div>
        <DocumentInteractions isLoading={isLoading} state={state} />
      </CardContent>
    </Card>
  );
};
