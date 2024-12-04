import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { data } from './use-agreements.mock';

type Creator = { avatar: string; name: string; surname: string };

type AgreementItem = {
  title: string;
  creator: Creator;
  commitment: number;
  status: string;
  views: number;
  comments: number;
};

type UseAgreementsReturn = {
  agreements: AgreementItem[];
  agreementsCount: number;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  loadMore: () => void;
  filteredAgreements: AgreementItem[];
  isLoading: boolean;
};

const fetchAgreements = async () => {
  return new Promise<{
    agreements: AgreementItem[];
    newAgreements: AgreementItem[];
  }>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export const useAgreements = (): UseAgreementsReturn => {
  const { data: fetchedData, isLoading } = useSWR(
    'agreements',
    fetchAgreements
  );

  const [activeStatus, setActiveStatus] = useState('all');
  const [agreements, setAgreements] = useState<AgreementItem[]>([]);

  const loadInitialData = () => {
    if (fetchedData) {
      setAgreements(fetchedData.agreements);
    }
  };

  if (fetchedData && agreements.length === 0) {
    loadInitialData();
  }

  const loadMore = () => {
    if (fetchedData) {
      setAgreements((prevAgreements) => [
        ...prevAgreements,
        ...fetchedData.newAgreements,
      ]);
    }
  };

  const filteredAgreements = useMemo(() => {
    return activeStatus === 'all'
      ? agreements
      : agreements.filter((agreement) => agreement.status === activeStatus);
  }, [activeStatus, agreements]);

  const agreementsCount = useMemo(() => agreements.length, [agreements]);

  return {
    agreements,
    agreementsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredAgreements,
    isLoading: isLoading,
  };
};
