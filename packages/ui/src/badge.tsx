import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@hypha-platform/ui-utils';

import { Skeleton } from './skeleton';

const badgeVariants = cva(
  'inline-flex items-center rounded-lg border px-2.5 py-0.5 h-5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-1',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-error-11 bg-error-3 text-error-11 font-medium',
        positive: 'border-success-11 bg-success-3 text-success-11 font-medium',
        warning: 'border-warning-11 bg-warning-3 text-warning-11 font-medium',
        outline: 'text-foreground',
        action: 'border-accent-11 bg-accent-3 text-accent-11 font-medium',
        actionFilled: 'bg-accent-9 text-white font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  isLoading?: boolean | undefined;
}

function Badge({
  className,
  variant,
  isLoading = false,
  ...props
}: BadgeProps) {
  return (
    <Skeleton width="50px" height="16px" loading={isLoading}>
      <div className={cn(badgeVariants({ variant }), className)} {...props} />
    </Skeleton>
  );
}

export { Badge, badgeVariants };
