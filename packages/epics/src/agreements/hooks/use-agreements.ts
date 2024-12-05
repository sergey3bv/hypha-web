import useSWR from 'swr';
import { useState, useMemo, useEffect } from 'react';
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
  hasMore: boolean;
};

const fetchAgreements = async (page: number, limit: number) => {
  return new Promise<{
    agreements: AgreementItem[];
    total: number;
  }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = page * limit;
      const agreements = data.slice(start, end);
      resolve({
        agreements,
        total: data.length,
      });
    }, 1000);
  });
};

export const useAgreements = (): UseAgreementsReturn => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data: fetchedData, isLoading } = useSWR(
    ['agreements', page, limit],
    () => fetchAgreements(page, limit),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const [allAgreements, setAllAgreements] = useState<AgreementItem[]>([]);

  useEffect(() => {
    if (fetchedData) {
      setAllAgreements((prev) => [...prev, ...fetchedData.agreements]);
    }
  }, [fetchedData]);

  const filteredAgreements = useMemo(() => {
    return activeStatus === 'all'
      ? allAgreements
      : allAgreements.filter((agreement) => agreement.status === activeStatus);
  }, [activeStatus, allAgreements]);

  const agreementsCount = useMemo(
    () => filteredAgreements.length,
    [filteredAgreements]
  );

  const hasMore = fetchedData
    ? fetchedData.total > allAgreements.length
    : false;

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    agreements: filteredAgreements,
    agreementsCount,
    activeStatus,
    setActiveStatus,
    loadMore,
    filteredAgreements,
    isLoading,
    hasMore,
  };
};
