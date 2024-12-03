import { cn } from '@hypha-platform/ui-utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
}

function Skeleton({
  className,
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      style={{ width, height }}
      {...props}
    />
  );
}

export { Skeleton }
