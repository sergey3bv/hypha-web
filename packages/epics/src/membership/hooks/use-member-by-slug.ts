'use client';

import useSWR from 'swr';
import { fetchMemberBySlug } from '../actions/fetch-members';

export const useMemberBySlug = (slug: string) => {
  const { data, isLoading } = useSWR(['member-by-slug', slug], ([_, slug]) =>
    fetchMemberBySlug({ slug }),
  );
  return { data, isLoading };
};
