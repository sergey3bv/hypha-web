# Dependency Injection Container

This directory contains the InversifyJS-based dependency injection system for the application.

## Architecture Overview

The DI container uses a modular approach to manage dependencies and enable better testing, extensibility, and separation of concerns.

### Key Components

- `inversify.config.ts`: Core container setup and storage context management
- `types.ts`: Symbol definitions and token utilities
- `repository.module.ts`: Registration of repository implementations by storage type
- `repository-registry.ts` (legacy): Will be deprecated in favor of the new DI system

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

During the migration, both systems will work in parallel. The old `getRepositoryImplementation` function will gradually be replaced with direct container injections.

## Container Initialization

When the application starts, we load the repository module:

```typescript
import { container } from './container/inversify.config';
import { createRepositoryModule } from './container/repository.module';

// Load repository module
container.load(createRepositoryModule());
```

## Adding New Dependencies

To add a new injectable class:

1. Define a symbol in `types.ts`
2. Add the `@injectable()` decorator to your class
3. Use `@inject(SYMBOL)` in constructors for dependencies
