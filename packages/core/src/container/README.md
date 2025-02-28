# Dependency Injection Container

This directory contains the InversifyJS-based dependency injection system for the application.

## Architecture Overview

The DI container uses InversifyJS to manage dependencies and enable better testing, extensibility, and separation of concerns.

### Key Components

- `inversify.config.ts`: Core container setup with the global container instance
- `types.ts`: Symbol definitions for all injectable tokens
- `bootstrap.ts`: Initializes the container at startup with all services and repositories
- `container-facade.ts`: Provides convenient access to container functions
- `database-provider.ts`: Manages database connections including authenticated connections for RLS

## Usage

### Getting a Service or Repository

```typescript
import { getContainer } from './container/container-facade';
import { SYMBOLS } from './container/types';
import { PeopleService } from './components/people/service';

// Get a service by class
const peopleService = getContainer().get(PeopleService);

// Or get a repository by symbol
const peopleRepository = getContainer().get(SYMBOLS.Repositories.PeopleRepository);
```

### Creating Authenticated Requests

For operations that need Row-Level Security (RLS):

```typescript
import { createRequestScope } from './container/container-facade';
import { SYMBOLS } from './container/types';

// Create a request-scoped container with authentication
const requestContainer = createRequestScope({ authToken: 'user-jwt-token' });

// Get the authenticated database connection
const userDb = requestContainer.get(SYMBOLS.Database.UserConnection);

// Or use it with service factories
import { createPeopleService } from './components/people/service.factory';

const peopleService = createPeopleService({ authToken: 'user-jwt-token' });
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

1. Define a symbol in `types.ts` if needed
2. Add the `@injectable()` decorator to your class
3. Use `@inject(SYMBOL)` in constructors for dependencies
4. Register the class in `bootstrap.ts`

## Service Factory Pattern

Service factories provide an easy way to create services with authenticated database connections:

```typescript
import { createSpaceService } from './components/space/service.factory';

// Create with authentication
const spaceService = createSpaceService({ authToken: 'user-jwt-token' });

// Or use admin connection
const adminSpaceService = createSpaceService();
```

This pattern ensures proper Row-Level Security while maintaining a clean architecture.
