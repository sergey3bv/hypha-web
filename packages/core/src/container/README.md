# Dependency Injection Container

This directory contains the InversifyJS-based dependency injection system for the application.

## Architecture Overview

The DI container uses a modular approach to manage dependencies and enable better testing, extensibility, and separation of concerns.

### Key Components

- `inversify.config.ts`: Core container setup and storage context management
- `types.ts`: Symbol definitions and token utilities
- `repository.module.ts`: Registration of repository implementations by storage type
- `repository-adapter.ts`: Backward compatibility adapter for the old system
- `token-mapping.ts`: Maps old tokens to new symbols
- `bootstrap.ts`: Initializes the container at startup

## Usage

### Getting a Repository with Storage Type Context

```typescript
import { StorageContext } from './container/inversify.config';
import { container } from './container/inversify.config';
import { SYMBOLS } from './container/types';
import { UserRepository } from './repositories/user.repository';

// Set the storage context type
StorageContext.storageType = 'postgres';

// Get the repository instance
const userRepository = container.get<UserRepository>(SYMBOLS.Repositories.UserRepository);
```

### Migration from Old Repository System

During the migration, both systems will work in parallel using the adapter pattern:

```typescript
// Old way (will continue to work during migration)
import { getRepositoryImplementation } from './container/repository-registry';
import { Tokens } from './container/tokens';

const repository = getRepositoryImplementation(Tokens.SpaceRepository, 'postgres');

// New way (preferred)
import { injectable, inject } from 'inversify';
import { SYMBOLS } from './container/types';

@injectable()
class MyService {
  constructor(@inject(SYMBOLS.Repositories.SpaceRepository) private repository: SpaceRepository) {}
}
```

## Container Initialization

When the application starts, initialize the container:

```typescript
import { initializeContainer } from './container/bootstrap';
import { defaultConfig } from './config/defaults';

// Bootstrap the container
initializeContainer(defaultConfig);
```

## Adding New Dependencies

To add a new injectable class:

1. Define a symbol in `types.ts`
2. Add the `@injectable()` decorator to your class
3. Use `@inject(SYMBOL)` in constructors for dependencies

## Token Mapping System

The token mapping system bridges between the old token-based DI and the new InversifyJS container:

1. Old tokens from `Tokens` are mapped to new symbols in `SYMBOLS.Repositories`
2. Both are registered in the container, allowing gradual migration
3. The `repository-adapter.ts` provides backward compatibility

This dual-registration approach ensures all existing code continues to work while new code can use the more powerful InversifyJS features.
