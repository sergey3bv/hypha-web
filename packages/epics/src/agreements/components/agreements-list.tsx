import { FC } from 'react';
import { AgreementCard } from './agreement-card';

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
  isLoading: boolean | undefined;
};

const AgreementsList: FC<AgreementsListProps> = ({ agreements, isLoading }) => {
  return (
    <div className="agreement-list w-full">
      {agreements.map((agreement, index) => (
        <AgreementCard key={index} {...agreement} isLoading={isLoading} />
      ))}
      {isLoading ? (
        <div>
          <AgreementCard isLoading={isLoading} />
          <AgreementCard isLoading={isLoading} />
          <AgreementCard isLoading={isLoading} />
          <AgreementCard isLoading={isLoading} />
        </div>
      ) : null}
    </div>
  );
};

export default AgreementsList;
