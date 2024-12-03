import { CardDiscussion } from './card-discussion';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  TabsContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@hypha-platform/ui/server';

type CreatorType = {
  avatar: string;
  name: string;
  surname: string;
};

type DiscussionType = {
  image: string;
  title: string;
  creator: CreatorType;
  description: string;
  views: number;
  comments: number;
};

type ListDiscussionsProps = {
  discussions: DiscussionType[];
  discussionsCount: number;
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

const discussionsfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ],
};

export const ListDiscussions: React.FC<ListDiscussionsProps> = ({
  discussions,
  discussionsCount,
  onLoadMore,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-10">
        <Text className="text-lg">Discussions | {discussionsCount}</Text>
        <div className="flex items-center">
          <FilterMenu
            value={discussionsfilterSettings.value}
            options={discussionsfilterSettings.options}
          />
          <Button className="ml-2" variant="action" size="sm">
            <PlusIcon className="mr-2" />
            Create
          </Button>
        </div>
      </div>
      <TabsContent value="agreements">
        <Tabs defaultValue="all" className="mt-3">
          <TabsList>
            <TabsTrigger value="all" variant="outlined">
              All
            </TabsTrigger>
            <TabsTrigger value="open" variant="outlined">
              Open
            </TabsTrigger>
            <TabsTrigger value="closed" variant="outlined">
              Closed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
              {discussions.map((discussion, index) => (
                <CardDiscussion
                  key={index}
                  views={discussion.views}
                  comments={discussion.comments}
                  description={discussion.description}
                  creator={discussion.creator}
                  title={discussion.title}
                  image={discussion.image}
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
                Load more projects
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="open">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
              {discussions.map((discussion, index) => (
                <CardDiscussion
                  key={index}
                  views={discussion.views}
                  comments={discussion.comments}
                  description={discussion.description}
                  creator={discussion.creator}
                  title={discussion.title}
                  image={discussion.image}
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
                Load more projects
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="closed">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6">
              {discussions.map((discussion, index) => (
                <CardDiscussion
                  key={index}
                  views={discussion.views}
                  comments={discussion.comments}
                  description={discussion.description}
                  creator={discussion.creator}
                  title={discussion.title}
                  image={discussion.image}
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
                Load more projects
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  );
};
