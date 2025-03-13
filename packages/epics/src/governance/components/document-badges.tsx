import { Badge, type BadgeProps } from '@hypha-platform/ui';

interface BadgeItem extends BadgeProps {
  value: string | number;
}

interface DocumentBadgesProps {
  badges: BadgeItem[];
  isLoading?: boolean;
}

export const DocumentBadges = ({ badges, isLoading }: DocumentBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
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
