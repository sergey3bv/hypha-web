import { Text } from '@radix-ui/themes';
import { Card, Badge } from '@hypha-platform/ui';
import Image from 'next/image';
import { SewingPinFilledIcon } from '@radix-ui/react-icons';

type CardMemberProps = {
  name: string;
  surname: string;
  nickname: string;
  location: string;
  avatar: string;
  commitment: number;
  status: string;
};

const statusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return (
        <Badge variant="positive">Active</Badge>
      )
    case 'applicant':
      return (
        <Badge variant="warning">Applicant</Badge>
      )
    case 'inactive':
      return (
        <Badge variant="secondary">Inactive</Badge>
      )
    case 'rejected':
      return (
        <Badge variant="destructive">Rejected</Badge>
      )
  }
}

export const CardMember: React.FC<CardMemberProps> = ({
  name,
  surname,
  nickname,
  location,
  avatar,
  commitment,
  status,
}) => {
  return (
    <Card className='w-full h-full p-6 mb-2 flex'>
      <Image className='rounded-lg mr-3' src={avatar} height={64} width={64} alt={nickname}></Image>
      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col'>
          <div className='flex gap-x-1'>
            <Badge variant="actionOutline">Recurring</Badge>
            <Badge variant="actionOutline">{commitment}%</Badge>
            {statusBadge(status)}
          </div>
          <Text className='text-3'>{name} {surname}</Text>
          <Text className='text-xs text-gray-500'>@{nickname}</Text>
        </div>
        <div className='flex h-full justify-end items-end text-gray-500'>
          <SewingPinFilledIcon className='mr-1'/>
          <Text className='text-xs'>{location}</Text>
        </div>
      </div>
    </Card>
  )
}

