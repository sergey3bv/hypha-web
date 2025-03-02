import { Container } from 'inversify';

export interface Context {
  container: Container;
  spaceId?: string;
}

export interface ContextProvider {
  getContext(): Context;
  createContext(spaceId?: string): Context;
}
