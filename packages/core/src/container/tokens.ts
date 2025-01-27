import { SpaceRepository } from '../components/space/repository';
import { SpaceConfigRepository } from '../components/space-config/repository';
import { RepositoryToken } from './repository-registry';

export const Tokens = {
  Config: Symbol('Config'),
  SpaceRepository: Symbol(
    'SpaceRepository',
  ) as RepositoryToken<SpaceRepository>,
  SpaceConfigRepository: Symbol(
    'SpaceConfigRepository',
  ) as RepositoryToken<SpaceConfigRepository>,
  AgreementRepository: Symbol('AgreementRepository'),
  MemberRepository: Symbol('MemberRepository'),
  CommentRepository: Symbol('CommentRepository'),
} as const;
