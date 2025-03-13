import { Skeleton, Card } from '@hypha-platform/ui';
import {
  DocumentInteractions,
  type DocumentInteractionsProps,
} from './document-interactions';
import { type Creator } from '../../people/components/creator-info';
import { DocumentBadges, type BadgeItem } from './document-badges';
import { PersonAvatar } from '../../people/components/person-avatar';
import { Text } from '@radix-ui/themes';

interface DocumentListCardProps {
  isLoading?: boolean;
  creator: Creator;
  badges?: BadgeItem[];
}

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

export const DocumentListCard: React.FC<
  DocumentListCardProps & Document & DocumentInteractionsProps
> = ({ isLoading, title, state, creator, badges, comments, views }) => {
  return (
    <Card className="w-full h-full p-5 flex items-center">
      <Skeleton
        width="64px"
        height="64px"
        loading={isLoading}
        className="rounded-lg mr-3"
      >
        <PersonAvatar
          className="min-w-[64px] min-h-[64px] mr-3"
          avatarSrc={creator?.avatarUrl}
          userName={`${creator?.name} ${creator?.surname}`}
        />
      </Skeleton>
      <div className="flex justify-between items-center w-full">
        <div className="grid">
          <DocumentBadges isLoading={isLoading} badges={badges ?? []} />
          <Skeleton
            height="26px"
            width="160px"
            loading={isLoading}
            className="my-1"
          >
            <Text className="text-4 text-ellipsis overflow-hidden text-nowrap mr-3">
              {title}
            </Text>
          </Skeleton>

          <Skeleton height="16px" width="80px" loading={isLoading}>
            <Text className="text-1 text-neutral-11">
              {creator?.name} {creator?.surname}
            </Text>
          </Skeleton>
        </div>
        <div className="lex justify-end">
          <DocumentInteractions
            isLoading={isLoading}
            state={state}
            comments={comments}
            views={views}
          />
        </div>
      </div>
    </Card>
  );
};
