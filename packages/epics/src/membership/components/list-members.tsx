'use client';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@hypha-platform/ui/server';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardMember } from './card-member';
import { listMembersData } from '@hypha-platform/ui-utils';

type ListMembersProps = Record<string, never>;

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const membersfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

export const ListMembers: React.FC<ListMembersProps> = () => {
  const [members, setMembers] = useState(listMembersData.members);
  const loadMoreMembers = () => {
    const newMembers = [
      {
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France'
      },
      {
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop',
        name: 'Name',
        surname: 'Surname',
        nickname: 'username',
        status: 'applicant',
        commitment: 50,
        location: 'Paris, France'
      },
    ];
    setMembers(prevMembers => [...prevMembers, ...newMembers]);
  }
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mt-4'>
        <Text className='text-lg'>Members | {listMembersData.membersCount}</Text>
        <div className='flex items-center'>
          <FilterMenu
            value={membersfilterSettings.value}
            options={membersfilterSettings.options}
          />
          <Button className='ml-2' variant="action" size="sm">
            <PlusIcon className='mr-2'/>
            Create
          </Button>
        </div>
      </div>
      <TabsContent value="membership">
        <Tabs defaultValue="all" className='mt-3'>
          <TabsList>
            <TabsTrigger value="all" variant='outlined'>All</TabsTrigger>
            <TabsTrigger value="active" variant='outlined'>Active</TabsTrigger>
            <TabsTrigger value="inactive" variant='outlined'>Inactive</TabsTrigger>
            <TabsTrigger value="applicant" variant='outlined'>Applicants</TabsTrigger>
            <TabsTrigger value="rejected" variant='outlined'>Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {members.map((member) => (
                  <CardMember avatar={member.avatar} name={member.name} surname={member.surname} location={member.location} nickname={member.nickname} commitment={member.commitment} status={member.status}/>
                ))}
              </div>
              <Button onClick={loadMoreMembers} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="active">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {members.filter((member) => member.status === 'active').map((member) => (
                  <CardMember avatar={member.avatar} name={member.name} surname={member.surname} location={member.location} nickname={member.nickname} commitment={member.commitment} status={member.status}/>
                ))}
              </div>
              <Button onClick={loadMoreMembers} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="inactive">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {members.filter((member) => member.status === 'inactive').map((member) => (
                  <CardMember avatar={member.avatar} name={member.name} surname={member.surname} location={member.location} nickname={member.nickname} commitment={member.commitment} status={member.status}/>
                ))}
              </div>
              <Button onClick={loadMoreMembers} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="applicant">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {members.filter((member) => member.status === 'applicant').map((member) => (
                  <CardMember avatar={member.avatar} name={member.name} surname={member.surname} location={member.location} nickname={member.nickname} commitment={member.commitment} status={member.status}/>
                ))}
              </div>
              <Button onClick={loadMoreMembers} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more members
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="rejected">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {members.filter((member) => member.status === 'rejected').map((member) => (
                  <CardMember avatar={member.avatar} name={member.name} surname={member.surname} location={member.location} nickname={member.nickname} commitment={member.commitment} status={member.status}/>
                ))}
              </div>
              <Button onClick={loadMoreMembers} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more members
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  )
}