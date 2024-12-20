import { Badge } from '../badge-cva';

type BadgeVariant = 'solid' | 'soft' | 'outline' | 'surface';
type BadgeColorVariant = 'accent' | 'error' | 'warn' | 'neutral' | 'success';

type BadgeConfig = {
  label: string;
  variant: BadgeVariant;
  colorVariant: BadgeColorVariant;
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
