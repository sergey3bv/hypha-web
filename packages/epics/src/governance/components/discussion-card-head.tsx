import { Image, Button, Skeleton } from '@hypha-platform/ui';
import { DotsHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import { timePassedSince } from '@hypha-platform/ui-utils';

export interface Space {
  title?: string;
  logoUrl?: string;
}

export interface Creator {
  name?: string;
  surname?: string;
}

export interface DiscussionCardHeadProps {
  space?: Space;
  creator?: Creator;
  publicationDate?: Date;
  isLoading?: boolean;
}

export const DiscussionCardHead = ({
  space,
  creator,
  publicationDate,
  isLoading,
}: DiscussionCardHeadProps) => {
  return (
    <div className="w-full flex justify-between">
      <div>
        <div className="flex items-center gap-3">
          <Skeleton
            className="rounded-full"
            width={40}
            height={40}
            loading={isLoading}
          >
            <Image
              className="rounded-full"
              src={space?.logoUrl || '/placeholder/space-avatar-image.png'}
              width={40}
              height={40}
              alt={`${space?.title || 'Space'} Logo`}
            />
          </Skeleton>
          <div className="flex gap-1 flex-col">
            <Skeleton
              className="rounded-lg"
              width={80}
              height={16}
              loading={isLoading}
            >
              <div className="text-1 font-medium">{space?.title}</div>
            </Skeleton>
            <Skeleton
              className="rounded-lg"
              width={100}
              height={16}
              loading={isLoading}
            >
              <div className="text-1 font-light text-neutral-11">
                {creator?.name} {creator?.surname} ·{' '}
                {timePassedSince(publicationDate)}
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton
          className="rounded-lg"
          width={16}
          height={16}
          loading={isLoading}
        >
          <Button variant="ghost" colorVariant="neutral">
            <DotsHorizontalIcon className="text-secondary-foreground" />
          </Button>
        </Skeleton>
        <Skeleton
          className="rounded-lg"
          width={16}
          height={16}
          loading={isLoading}
        >
          <Button variant="ghost" colorVariant="neutral">
            <Cross2Icon className="text-secondary-foreground" />
          </Button>
        </Skeleton>
      </div>
    </div>
  );
};
