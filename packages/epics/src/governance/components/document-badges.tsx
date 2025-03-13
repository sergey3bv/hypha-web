import { Badge, type BadgeProps } from '@hypha-platform/ui';
import { cn } from '@hypha-platform/lib/utils';

export interface BadgeItem extends BadgeProps {
  value: string | number;
}

interface DocumentBadgesProps {
  badges: BadgeItem[];
  isLoading?: boolean;
  className?: string;
}

export const DocumentBadges = ({
  badges,
  isLoading,
  className,
}: DocumentBadgesProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {badges.map((badge, index) => (
        <Badge
          key={`${badge.value} ${index}`}
          className={badge.className}
          isLoading={isLoading}
          variant={badge.variant}
          colorVariant={badge.colorVariant}
        >
          {badge.value}
        </Badge>
      ))}
    </div>
  );
};
