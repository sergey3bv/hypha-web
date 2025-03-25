import { DiscussionCardHead, Space, Creator } from './discussion-card-head';
import { Button, Separator, Image, Skeleton } from '@hypha-platform/ui';
import { RxCross1 } from 'react-icons/rx';
import { Chat } from '../../interactions';
import Link from 'next/link';
import { MessageProps } from '../../interactions/components/message';

interface DiscussionDetailsProps {
  isLoading: boolean;
  creator: Creator;
  space: Space;
  publicationDate: Date;
  closeUrl: string;
  leadImageUrl: string;
  description: string;
  messages: MessageProps[];
}

export const DiscussionDetails = ({
  isLoading,
  creator,
  space,
  publicationDate,
  closeUrl,
  leadImageUrl,
  description,
  messages,
}: DiscussionDetailsProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between">
        <DiscussionCardHead
          isLoading={isLoading}
          creator={creator}
          publicationDate={publicationDate}
          space={space}
          showTopButtons={false}
        />
        <Link href={closeUrl} scroll={false}>
          <Button
            variant="ghost"
            colorVariant="neutral"
            className="flex items-center"
          >
            Close
            <RxCross1 className="ml-2" />
          </Button>
        </Link>
      </div>
      <Separator />
      <Skeleton
        loading={isLoading}
        className="rounded-lg w-full h-[300px] object-cover"
      >
        <Image
          className="rounded-lg w-full h-[300px] object-cover"
          src={leadImageUrl || 'placeholder/space-lead-image.png'}
          width={554}
          height={300}
          alt="Lead image"
        />
      </Skeleton>
      <Skeleton height={32} loading={isLoading} className="rounded-lg w-full">
        <span className="text-2 text-neutral-11">{description}</span>
      </Skeleton>
      <div className="flex justify-end gap-2">
        <Skeleton
          height={32}
          width={100}
          loading={isLoading}
          className="rounded-lg"
        >
          <Button variant="default" colorVariant="accent">
            Edit
          </Button>
        </Skeleton>
        <Skeleton
          height={32}
          width={100}
          loading={isLoading}
          className="rounded-lg"
        >
          <Button variant="default" colorVariant="accent">
            Generate Proposal
          </Button>
        </Skeleton>
      </div>
      <Chat isLoading={isLoading} messages={messages || []} />
    </div>
  );
};
