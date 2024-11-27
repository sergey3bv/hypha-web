'use client';
import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@hypha-platform/ui/server';
import { Button, FilterMenu } from '@hypha-platform/ui';
import { CardProposal } from './card-proposal';
import { listProposalsData } from '@hypha-platform/ui-utils';

type ListProposalsProps = Record<string, never>;

type OptionType = {
  label: string,
  value: string
}

type FilterType = {
  value: string,
  options: OptionType[]
}

const proposalsfilterSettings: FilterType = {
  value: 'most-recent',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Most recent', value: 'most-recent' }
  ],
};

export const ListProposals: React.FC<ListProposalsProps> = () => {
  const [proposals, setProposals] = useState(listProposalsData.proposals);
  const loadMoreProposals = () => {
    const newProposals = [
      {
        title: 'New Proposal Title',
        creator: {
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
          name: 'Jane',
          surname: 'Doe'
        },
        commitment: 50,
        status: 'active',
      },
      {
        title: 'New Proposal Title',
        creator: {
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=faces&fit=crop",
          name: 'Jane',
          surname: 'Doe'
        },
        commitment: 50,
        status: 'active',
      },
    ];
    setProposals(prevProposals => [...prevProposals, ...newProposals]);
  }
  return (
    <div>
      <div className='flex justify-between items-center mt-10'>
        <Text className='text-lg'>Proposals | {listProposalsData.proposalsCount}</Text>
        <div className='flex items-center'>
          <FilterMenu
            value={proposalsfilterSettings.value}
            options={proposalsfilterSettings.options}
          />
          <Button className='ml-2' variant="action" size="sm">
            <PlusIcon className='mr-2'/>
            Create
          </Button>
        </div>
      </div>
      <TabsContent value="agreements">
        <Tabs defaultValue="all" className='mt-3'>
          <TabsList>
            <TabsTrigger value="all" variant='outlined'>All</TabsTrigger>
            <TabsTrigger value="active" variant='outlined'>Active</TabsTrigger>
            <TabsTrigger value="voting" variant='outlined'>On voting</TabsTrigger>
            <TabsTrigger value="completed" variant='outlined'>Completed</TabsTrigger>
            <TabsTrigger value="rejected" variant='outlined'>Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {proposals.map((proposal) => (
                  <CardProposal title={proposal.title} creator={proposal.creator} commitment={proposal.commitment} status={proposal.status}/>
                ))}
              </div>
              <Button onClick={loadMoreProposals} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more proposals
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="active">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {proposals.filter((proposal) => proposal.status === 'active').map((proposal) => (
                  <CardProposal title={proposal.title} creator={proposal.creator} commitment={proposal.commitment} status={proposal.status}/>
                ))}
              </div>
              <Button onClick={loadMoreProposals} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more proposals
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="voting">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {proposals.filter((proposal) => proposal.status === 'voting').map((proposal) => (
                  <CardProposal title={proposal.title} creator={proposal.creator} commitment={proposal.commitment} status={proposal.status}/>
                ))}
              </div>
              <Button onClick={loadMoreProposals} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more proposals
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {proposals.filter((proposal) => proposal.status === 'completed').map((proposal) => (
                  <CardProposal title={proposal.title} creator={proposal.creator} commitment={proposal.commitment} status={proposal.status}/>
                ))}
              </div>
              <Button onClick={loadMoreProposals} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more proposals
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="rejected">
            <div className="my-6 flex items-center flex-col">
              <div className='flex flex-col w-full'>
                {proposals.filter((proposal) => proposal.status === 'rejected').map((proposal) => (
                  <CardProposal title={proposal.title} creator={proposal.creator} commitment={proposal.commitment} status={proposal.status}/>
                ))}
              </div>
              <Button onClick={loadMoreProposals} className="rounded-lg w-fit mt-4" variant="outline" size="sm">
                Load more proposals
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </div>
  )
}