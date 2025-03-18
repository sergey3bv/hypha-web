import {
  FILTER_OPTIONS_AGREEMENTS,
  FILTER_OPTIONS_DISCUSSIONS,
  FILTER_OPTIONS_PROPOSALS,
} from '../../common/constants';
import { DocumentState } from '../types';

export type UseDocumentsFilterProps = {
  documentState: DocumentState;
};

export type UseDocumentsFilterReturn = {
  isLoading: boolean;
  filter: { label: string; value: string }[];
};

const defaultResponse = {
  isLoading: false,
};

// TODO: fetch filter form db
export const useDocumentsFilter = (
  props: UseDocumentsFilterProps,
): UseDocumentsFilterReturn => {
  switch (props.documentState) {
    case 'discussion':
      return { filter: FILTER_OPTIONS_DISCUSSIONS, ...defaultResponse };
    case 'proposal':
      return { filter: FILTER_OPTIONS_PROPOSALS, ...defaultResponse };
    case 'agreement':
      return { filter: FILTER_OPTIONS_AGREEMENTS, ...defaultResponse };
    default:
      return { filter: [], ...defaultResponse };
  }
};
