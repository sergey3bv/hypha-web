import { Button, FilterMenu } from "@hypha-platform/ui";
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { CardInnerSpace } from './card-inner-space';

type MemberType = {
  avatar: string,
  name: string,
  surname: string
}

type SpaceType = {
  image: string,
  title: string,
  description: string,
  members: MemberType[],
  joinedStatus: boolean
}

type ListInnerSpacesProps = {
  spaces: SpaceType[],
  innerSpacesCount: number,
  onLoadMore: () => void
};

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const innerSpacesfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

export const ListInnerSpaces: React.FC<ListInnerSpacesProps> = ({
  spaces,
  innerSpacesCount,
  onLoadMore
}) => {
  return (
    <div>
      <div className='flex justify-between items-center mt-4'>
        <Text className='text-lg'>Inner Spaces | {innerSpacesCount}</Text>
        <div className='flex items-center'>
          <FilterMenu
            value={innerSpacesfilterSettings.value}
            options={innerSpacesfilterSettings.options}
          />
          <Button className='ml-2' variant="action" size="sm">
            <PlusIcon className='mr-2'/>
            Create
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
        {spaces.map((space, index) => (
          <CardInnerSpace
            key={index}
            image={space.image}
            title={space.title}
            description={space.description}
            members={space.members}
            joinedStatus={space.joinedStatus}
          />
        ))}
      </div>
      <div className="my-6 flex justify-center">
        <Button onClick={onLoadMore} className="rounded-lg" variant="outline" size="sm">
          Load more inner spaces
        </Button>
      </div>
    </div>
  );
};
