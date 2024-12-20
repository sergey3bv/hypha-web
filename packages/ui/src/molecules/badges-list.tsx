import { Badge } from '../index';

type BadgeConfig = {
  label: string;
  variant: 'actionOutline' | 'positive' | 'destructive' | 'default';
};

type BadgesListProps = {
  badges: BadgeConfig[];
  isLoading?: boolean;
};

export const BadgesList: React.FC<BadgesListProps> = ({
  badges,
  isLoading,
}) => {
  return (
    <div className="flex gap-x-1">
      {badges.map((badge, index) => (
        <Badge
          key={`${badge.label}-${index}`}
          isLoading={isLoading}
          variant={badge.variant}
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
};
