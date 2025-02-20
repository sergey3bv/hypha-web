import { Text } from '@radix-ui/themes';
import { Badge, Skeleton, Image, Input } from '@hypha-platform/ui';
import { Creator } from '@hypha-platform/graphql/rsc';
import { Pencil1Icon } from '@radix-ui/react-icons';

export type CreateFormHeadProps = {
  creator?: Creator;
  isLoading?: boolean;
  type?: string;
};

export const CreateFormHead = ({
  creator,
  isLoading,
  type,
}: CreateFormHeadProps) => {
  const isSpaceForm = type?.toLowerCase() === 'space';

  return (
    <div className="flex items-center">
      <Skeleton
        width="64px"
        height="64px"
        loading={isLoading}
        className="rounded-lg mr-3"
      >
        {isSpaceForm ? (
          <div className="mr-3 min-w-[64px] h-[64px] rounded-xl bg-accent-9 justify-center items-center flex">
            <Pencil1Icon className="h-5 w-5" />
          </div>
        ) : (
          <Image
            className="rounded-lg mr-3"
            src={creator?.avatar ?? ''}
            height={64}
            width={64}
            alt={
              creator?.name && creator?.surname
                ? `${creator.name} ${creator.surname}`
                : 'Creator Avatar'
            }
          />
        )}
      </Skeleton>

      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          {isSpaceForm ? null : (
            <div className="flex gap-x-1">
              <Badge
                variant="solid"
                colorVariant="accent"
                isLoading={isLoading}
              >
                {type}
              </Badge>
            </div>
          )}

          <Skeleton
            height="26px"
            width="160px"
            loading={isLoading}
            className="my-1"
          >
            <Input
              className="border-0 text-4 p-0 placeholder:text-4 bg-inherit"
              placeholder="Type a title..."
            />
          </Skeleton>

          <Skeleton height="16px" width="80px" loading={isLoading}>
            <span className="flex items-center">
              {isSpaceForm ? (
                <Text className="text-1 text-white mr-1">Created by</Text>
              ) : null}
              <Text className="text-1 text-neutral-11">
                {creator?.name} {creator?.surname}
              </Text>
            </span>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
