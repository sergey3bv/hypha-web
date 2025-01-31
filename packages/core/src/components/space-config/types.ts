export interface SpaceConfig {
  spaceSlug: string;
  storage: {
    space?: 'postgres' | 'memory';
    agreement?: 'postgres' | 'memory';
    member?: 'postgres' | 'memory';
    comment?: 'postgres' | 'memory';
  };
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export type NewSpaceConfig = Omit<
  SpaceConfig,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateSpaceConfig = Partial<
  Omit<SpaceConfig, 'createdAt' | 'updatedAt'>
>;
