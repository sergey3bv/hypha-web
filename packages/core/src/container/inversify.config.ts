import { Container } from 'inversify';
import 'reflect-metadata';
import { StorageType } from '../config/types';

// Create the container instance
export const container = new Container();

// Storage context class to hold current storage type
export class StorageContext {
  private static _storageType: StorageType;

  static get storageType(): StorageType {
    return StorageContext._storageType;
  }

  static set storageType(value: StorageType) {
    StorageContext._storageType = value;
  }

  static getContainer(): Container {
    return container;
  }
}

// Define a type for storage-aware container
export interface StorageAwareContainer extends Container {
  storageType: StorageType;
}

// Helper function to create a container with a specific storage type
export function createContainerWithStorage(
  storageType: StorageType,
): StorageAwareContainer {
  // Create a new container instead of using createChild
  const newContainer = new Container() as StorageAwareContainer;
  newContainer.storageType = storageType;
  return newContainer;
}

// Helper function to get the current storage type from a container
export function getStorageType(container: StorageAwareContainer): StorageType {
  return container.storageType;
}
