'use client';

import { Text } from '@radix-ui/themes';
import { Card, Button, Badge } from '@hypha-platform/ui';
import Image from 'next/image';

type CreatorType = {
  avatar: string,
  name: string,
  surname: string,
}

type ProposalCardProps = {
  creator: CreatorType;
  title: string;
  commitment: number;
  status: string;
};

const statusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return (
        <Badge variant="positive">Active</Badge>
      )
    case 'voting':
      return (
        <Badge variant="warning">On voting</Badge>
      )
    case 'completed':
      return (
        <Badge variant="action">Completed</Badge>
      )
    case 'rejected':
      return (
        <Badge variant="destructive">Rejected</Badge>
      )
  }
}

// Temp variable
const voted = false;

export const CardProposal: React.FC<ProposalCardProps> = ({
  commitment,
  status,
  title,
  creator
}) => {
  return (
    <Card className='w-full h-full p-6 mb-2 flex'>
      <Image className='rounded-lg mr-3' src={creator.avatar} height={64} width={64} alt={title}></Image>
      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col'>
          <div className='flex gap-x-1'>
            <Badge variant="action">Proposal</Badge>
            <Badge variant="actionOutline">Recurring</Badge>
            <Badge variant="actionOutline">{commitment}%</Badge>
            {statusBadge(status)}
          </div>
          <Text className='text-3'>{title}</Text>
          <Text className='text-xs text-gray-500'>{creator.name} {creator.surname}</Text>
        </div>
        <div>
          {voted ? <Button className="rounded-lg w-fit" variant="actionOutlineChecked" size="sm">
            You voted yes
          </Button> : <Button className="rounded-lg w-fit" variant="actionOutline" size="sm">
            Vote now
          </Button> }
          
        </div>
      </div>
    </Card>
  )
}

