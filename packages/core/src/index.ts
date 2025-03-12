import 'server-only';

import { initializeContainer } from './container/bootstrap';

// Initialize the container with default config
initializeContainer();

// Export components
export * from './components';
export * from './container';
export * from './context/types';
export * from './shared';
