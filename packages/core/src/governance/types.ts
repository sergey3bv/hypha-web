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
  slug: string;
  state: DocumentState;
  createdAt: Date;
  updatedAt: Date;
  creator?: Creator;
};
