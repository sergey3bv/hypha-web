import {
  BadgesList,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@hypha-platform/ui';
import { Author } from '../../../people/components/author';
import { Amount } from '@hypha-platform/ui/server';

import { RxEyeOpen, RxChatBubble } from 'react-icons/rx';

export type TransactionCardProps = {
  id: string;
  title: string;
  description: string;
  amount: number;
  withUsdSymbol?: boolean;
  badges: {
    label: string;
    variant: 'solid' | 'soft' | 'outline' | 'surface';
  }[];
  author: {
    name: string;
    surname: string;
  };
  isLoading?: boolean;
  viewCount?: number;
  commentCount?: number;
};

export const TransactionCard = ({
  id,
  title,
  description,
  amount,
  withUsdSymbol,
  badges: tags,
  author,
  isLoading,
  viewCount,
  commentCount,
}: TransactionCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-1">
        <BadgesList badges={tags} />
      </CardHeader>
      <CardContent className="relative">
        <Amount
          isLoading={isLoading}
          value={amount}
          withUsdSymbol={withUsdSymbol}
        />
        <Author author={author} />
        <div className="flex gap-2 absolute bottom-5 right-5">
          <Button variant="ghost" colorVariant="neutral" className="flex gap-1">
            <RxEyeOpen />
            {viewCount}
          </Button>
          <Button variant="ghost" colorVariant="neutral" className="flex gap-1">
            <RxChatBubble />
            {commentCount}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
