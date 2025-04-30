export type Creator = {
  avatarUrl?: string;
  name?: string;
  surname?: string;
};

export enum DocumentState {
  DISCUSSION = 'discussion',
  PROPOSAL = 'proposal',
  AGREEMENT = 'agreement',
}

export type Document = {
  id: number;
  creatorId: number;
  title: string;
  description?: string;
  slug?: string;
  state: DocumentState;
  createdAt: Date;
  updatedAt: Date;
  creator?: Creator;
  leadImage?: string;
  attachments?: string[];
};

export interface CreateAgreementInput {
  title: string;
  description: string;
  leadImage?: string;
  attachments?: string[];
  slug?: string;
  spaceId: number;
  creatorId: number;
}

export interface UpdateAgreementInput {
  leadImage?: string;
  slug?: string;
  attachments?: string[];
}

export type UpdateAgreementBySlugInput = {
  slug: string;
} & UpdateAgreementInput;
