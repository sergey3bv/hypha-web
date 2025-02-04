import { SpaceRepository } from '../components/space/repository';
import { SpaceConfigRepository } from '../components/space-config/repository';
import { DocumentRepository } from '../components/governance/repository';
import { RepositoryToken } from './repository-registry';
import { PeopleRepository } from '../components';

export const Tokens = {
  Config: Symbol('Config'),
  SpaceRepository: Symbol(
    'SpaceRepository',
  ) as RepositoryToken<SpaceRepository>,
  SpaceConfigRepository: Symbol(
    'SpaceConfigRepository',
  ) as RepositoryToken<SpaceConfigRepository>,
  DocumentRepository: Symbol(
    'DocumentRepository',
  ) as RepositoryToken<DocumentRepository>,
  PeopleRepository: Symbol(
    'PeopleRepository',
  ) as RepositoryToken<PeopleRepository>,
  AgreementRepository: Symbol('AgreementRepository'),
  MemberRepository: Symbol('MemberRepository'),
  CommentRepository: Symbol('CommentRepository'),
} as const;
