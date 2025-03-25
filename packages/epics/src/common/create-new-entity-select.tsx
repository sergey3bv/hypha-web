import { Card, Separator, Button, Skeleton } from '@hypha-platform/ui';
import {
  ChatBubbleIcon,
  RocketIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { RxCross1 } from 'react-icons/rx';

type CreateNewEntitySelectProps = {
  isLoading?: boolean;
  closeUrl?: string;
  content?: string;
  createDiscussionHandler?: () => void;
  createAgreementHandler?: () => void;
  createSubspaceHandler?: () => void;
};

export const CreateNewEntitySelect = ({
  isLoading,
  closeUrl,
  content,
  createDiscussionHandler,
  createAgreementHandler,
  createSubspaceHandler,
}: CreateNewEntitySelectProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between">
        <Skeleton width="100px" height="24px" loading={isLoading}>
          <span className="text-4 text-secondary-foreground">Create</span>
        </Skeleton>
        <Skeleton width="80px" height="24px" loading={isLoading}>
          <Link href={closeUrl ?? ''} scroll={false}>
            <Button
              variant="ghost"
              colorVariant="neutral"
              className="flex items-center"
            >
              Close
              <RxCross1 className="ml-2" />
            </Button>
          </Link>
        </Skeleton>
      </div>
      <Skeleton
        width="100%"
        height="72px"
        loading={isLoading}
        className="rounded-lg"
      >
        <span className="text-2 text-neutral-11">{content}</span>
      </Skeleton>
      <Separator />
      <div className="flex flex-col gap-2">
        <Skeleton width="100%" height="100px" loading={isLoading}>
          <Card
            onClick={createDiscussionHandler}
            className="flex p-6 cursor-pointer space-x-4 items-center"
          >
            <div>
              <ChatBubbleIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2 font-medium">Create a Discussion</span>
              <span className="text-1 text-neutral-11">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </span>
            </div>
          </Card>
        </Skeleton>
        <Skeleton width="100%" height="100px" loading={isLoading}>
          <Card
            onClick={createAgreementHandler}
            className="flex p-6 cursor-pointer space-x-4 items-center"
          >
            <div>
              <RocketIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2 font-medium">Create an agreement</span>
              <span className="text-1 text-neutral-11">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </span>
            </div>
          </Card>
        </Skeleton>
        <Skeleton width="100%" height="100px" loading={isLoading}>
          <Card
            onClick={createSubspaceHandler}
            className="flex p-6 cursor-pointer space-x-4 items-center"
          >
            <div>
              <PlusCircledIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2 font-medium">Create a new Sub-space</span>
              <span className="text-1 text-neutral-11">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </span>
            </div>
          </Card>
        </Skeleton>
      </div>
    </div>
  );
};
