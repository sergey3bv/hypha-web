import { CoreConfig } from '../config/types';

// Base interface for all repositories
export interface Repository {}

export interface Container {
  config: CoreConfig;
  get<T>(token: symbol): T;
  register<T>(token: symbol, value: T): void;
  createScope(): Container;
}
