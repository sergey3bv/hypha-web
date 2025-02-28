import 'server-only';

import { initializeContainer } from './container/bootstrap';
import { defaultConfig } from './config/defaults';

// Initialize the container with default config
initializeContainer(defaultConfig);

// Export components
export * from './components';
export * from './container';
export * from './context/types';
export * from './shared';

// Export config
export * from './config/types';
export { defaultConfig } from './config/defaults';
