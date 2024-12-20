import { Badge, BadgeProps } from '../badge';

type BadgeConfig = BadgeProps & {
  label: string;
};

type BadgesListProps = {
  badges: BadgeConfig[];
  isLoading?: boolean;
};

export const BadgesList = ({ badges, isLoading = false }: BadgesListProps) => {
  return (
    <div className="flex gap-x-1">
      {badges.map((badge, index) => (
        <Badge
          key={`${badge.label}-${index}`}
          isLoading={isLoading}
          variant={badge.variant}
          colorVariant={badge.colorVariant}
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
};
