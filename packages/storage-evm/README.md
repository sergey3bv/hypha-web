# Storage EVM Package

This package contains the Ethereum smart contracts and related infrastructure. It uses Hardhat for development and testing.

## Available Commands

Run these commands from the root of the workspace:

### Compile the contracts

Using hardhat

```shell
npx nx run storage-evm:compile
```

### Build the contracts and typed ABIs

Using wagmi:

```shell
npx nx run storage-evm:build
```

### Run tests

```shell
npx nx run storage-evm:test
```

### Start a local hardhat node

```shell
npx nx run storage-evm:node
```

### Deploy contracts using Hardhat Ignition

```shell
npx nx run storage-evm:deploy ./ignition/modules/SpaceFactory.ts --network localhost --reset
```

## Development

The package includes sample contracts and tests to help you get started. The main components are:

- `contracts/`: Smart contract source files
- `test/`: Contract test files
- `ignition/`: Deployment modules for Hardhat Ignition
