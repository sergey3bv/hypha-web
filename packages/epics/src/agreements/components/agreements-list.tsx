import { FC } from 'react';
import { AgreementCard } from './agreement-card';
import { AgreementsLoadMore } from './agreements-load-more';

type AgreementItem = {
  title: string;
  creator: { avatar: string; name: string; surname: string };
  commitment: number;
  status: string;
  views: number;
  comments: number;
  isLoading?: boolean | undefined;
};

type AgreementsListProps = {
  agreements: AgreementItem[];
  onLoadMore: () => void;
  isLoading: boolean | undefined;
};

const AgreementsList: FC<AgreementsListProps> = ({
  agreements,
  onLoadMore,
  isLoading,
}) => {
  return (
    <div className="agreement-list w-full">
      {isLoading ? (
        <div>
          <AgreementCard isLoading={isLoading} />
          <AgreementCard isLoading={isLoading} />
          <AgreementCard isLoading={isLoading} />
          <AgreementCard isLoading={isLoading} />
        </div>
      ) : (
        agreements.map((agreement, index) => (
          <AgreementCard key={index} {...agreement} isLoading={isLoading} />
        ))
      )}
      <AgreementsLoadMore onClick={onLoadMore} label="Load more agreements" />
    </div>
  );
};

export default AgreementsList;
