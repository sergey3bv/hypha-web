import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  TabsContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@hypha-platform/ui/server';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardMember } from './card-member';

type MemberType = {
  avatar: string;
  name: string;
  surname: string;
  nickname: string;
  status: string;
  commitment: number;
  location: string;
};

type ListMembersProps = {
  members: MemberType[];
  membersCount: number;
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

const membersfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' },
  ],
};

export const ListMembers: React.FC<ListMembersProps> = ({
  members,
  membersCount,
  onLoadMore,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-4">
        <Text className="text-lg">Members | {membersCount}</Text>
        <div className="flex items-center">
          <FilterMenu
            value={membersfilterSettings.value}
            options={membersfilterSettings.options}
          />
          <Button className="ml-2" variant="action" size="sm">
            <PlusIcon className="mr-2" />
            Create
          </Button>
        </div>
      </div>
      <TabsContent value="membership">
        <Tabs defaultValue="all" className="mt-3">
          <TabsList>
            <TabsTrigger value="all" variant="outlined">
              All
            </TabsTrigger>
            <TabsTrigger value="active" variant="outlined">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" variant="outlined">
              Inactive
            </TabsTrigger>
            <TabsTrigger value="applicant" variant="outlined">
              Applicants
            </TabsTrigger>
            <TabsTrigger value="rejected" variant="outlined">
              Rejected
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="my-6 flex items-center flex-col">
              <div className="flex flex-col w-full">
                {members.map((member) => (
                  <CardMember
                    avatar={member.avatar}
                    name={member.name}
                    surname={member.surname}
                    location={member.location}
                    nickname={member.nickname}
                    commitment={member.commitment}
                    status={member.status}
                  />
                ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="active">
            <div className="my-6 flex items-center flex-col">
              <div className="flex flex-col w-full">
                {members
                  .filter((member) => member.status === 'active')
                  .map((member) => (
                    <CardMember
                      avatar={member.avatar}
                      name={member.name}
                      surname={member.surname}
                      location={member.location}
                      nickname={member.nickname}
                      commitment={member.commitment}
                      status={member.status}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="inactive">
            <div className="my-6 flex items-center flex-col">
              <div className="flex flex-col w-full">
                {members
                  .filter((member) => member.status === 'inactive')
                  .map((member) => (
                    <CardMember
                      avatar={member.avatar}
                      name={member.name}
                      surname={member.surname}
                      location={member.location}
                      nickname={member.nickname}
                      commitment={member.commitment}
                      status={member.status}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="applicant">
            <div className="my-6 flex items-center flex-col">
              <div className="flex flex-col w-full">
                {members
                  .filter((member) => member.status === 'applicant')
                  .map((member) => (
                    <CardMember
                      avatar={member.avatar}
                      name={member.name}
                      surname={member.surname}
                      location={member.location}
                      nickname={member.nickname}
                      commitment={member.commitment}
                      status={member.status}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="rejected">
            <div className="my-6 flex items-center flex-col">
              <div className="flex flex-col w-full">
                {members
                  .filter((member) => member.status === 'rejected')
                  .map((member) => (
                    <CardMember
                      avatar={member.avatar}
                      name={member.name}
                      surname={member.surname}
                      location={member.location}
                      nickname={member.nickname}
                      commitment={member.commitment}
                      status={member.status}
                    />
                  ))}
              </div>
              <Button
                onClick={onLoadMore}
                className="rounded-lg w-fit mt-4"
                variant="outline"
                size="sm"
              >
                Load more members
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  );
};
