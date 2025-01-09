import { PaginationMetadata } from '../types';
import { CardCommentProps } from '../../../../../epics/src/interactions/components/card-comment';

export type Creator = { avatar: string; name: string; surname: string };

export type AgreementItem = {
  id: string;
  slug: string;
  title: string;
  creator: Creator;
  commitment: number;
  status: string;
  views: number;
  comments: CardCommentProps[];
  content: string;
};

export type PaginatedAgreementsResponse = {
  agreements: AgreementItem[];
  pagination: PaginationMetadata;
};
