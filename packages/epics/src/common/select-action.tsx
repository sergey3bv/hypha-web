import { Card, Separator, Button, Skeleton } from '@hypha-platform/ui';
import Link from 'next/link';

type ActionProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type SelectActionProps = {
  isLoading?: boolean;
  content: string;
  actions: ActionProps[];
};

export const SelectAction = ({
  isLoading,
  content,
  actions,
}: SelectActionProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 justify-between">
        <Skeleton width="100px" height="24px" loading={isLoading}>
          <span className="text-4 text-secondary-foreground">Create</span>
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
        {actions?.map((action) => (
          <Link href={action.href} key={action.title}>
            <Card className="flex p-6 cursor-pointer space-x-4 items-center">
              <div>{action.icon}</div>
              <div className="flex flex-col">
                <span className="text-2 font-medium">{action.title}</span>
                <span className="text-1 text-neutral-11">
                  {action.description}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
