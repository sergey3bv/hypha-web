import {
  Skeleton,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from '@hypha-platform/ui';
import Image from 'next/image';
import { DocumentInteractions } from './document-interactions';
import { CreatorInfo } from '../../people/components/creator-info';
import { type Creator } from '../../people/components/creator-info';
import { DocumentBadges, type BadgeItem } from './document-badges';
import { type DocumentInteractionsProps } from './document-interactions';

interface Document {
  id: number;
  creatorId: number;
  title: string;
  description?: string;
  slug: string;
  state: 'agreement' | 'discussion' | 'proposal';
  createdAt: Date;
  updatedAt: Date;
}

interface DocumentCardProps {
  isLoading: boolean;
  leadImage?: string;
  creator: Creator;
  badges?: BadgeItem[];
}

export const DocumentCard: React.FC<
  DocumentCardProps & Document & DocumentInteractionsProps
> = ({
  isLoading,
  title,
  description,
  state,
  leadImage,
  creator,
  badges,
  comments,
  views,
}) => {
  return (
    <Card className="h-full w-full">
      <CardHeader className="p-0 rounded-tl-md rounded-tr-md overflow-hidden h-[150px]">
        <Skeleton
          loading={isLoading}
          className="min-w-full"
          height="150px"
          width="250px"
        >
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
          <DocumentBadges
            className="mb-2"
            isLoading={isLoading}
            badges={badges ?? []}
          />
          <Skeleton
            className="min-w-full"
            width="120px"
            height="18px"
            loading={isLoading}
          >
            <CardTitle>{title}</CardTitle>
          </Skeleton>
          <CreatorInfo isLoading={isLoading} creator={creator} />
        </div>
        <div className="flex flex-grow text-1 text-neutral-11 mb-4">
          <Skeleton
            className="min-w-full"
            width="200px"
            height="48px"
            loading={isLoading}
          >
            <div className="line-clamp-3">{description}</div>
          </Skeleton>
        </div>
        <DocumentInteractions
          isLoading={isLoading}
          state={state}
          comments={comments}
          views={views}
        />
      </CardContent>
    </Card>
  );
};
