import { Button, FilterMenu } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { CardOuterSpace } from './card-outer-space';

type SpaceType = {
  logo: string;
  title: string;
  description: string;
  members: number;
  projects: number;
};

type ListOuterSpacesProps = {
  spaces: SpaceType[];
  outerSpacesCount: number;
  onLoadMore: () => void;
};

type OptionType = {
  label: string;
  value: string;
};

type FilterType = {
  value: string;
  options: OptionType[];
};

const outerSpacesFilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ],
};

export const ListOuterSpaces: React.FC<ListOuterSpacesProps> = ({
  spaces,
  outerSpacesCount,
  onLoadMore,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-6">
        <Text className="text-lg">Outer Spaces | {outerSpacesCount}</Text>
        <div className="flex items-center">
          <FilterMenu
            value={outerSpacesFilterSettings.value}
            options={outerSpacesFilterSettings.options}
          />
          <Button className="ml-2" variant="action" size="sm">
            <PlusIcon className="mr-2" />
            Invite space
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
        {spaces.map((space, index) => (
          <CardOuterSpace
            key={index}
            logo={space.logo}
            title={space.title}
            description={space.description}
            members={space.members}
            projects={space.projects}
          />
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Button
          onClick={onLoadMore}
          className="rounded-lg"
          variant="outline"
          size="sm"
        >
          Load more outer spaces
        </Button>
      </div>
    </div>
  );
};
