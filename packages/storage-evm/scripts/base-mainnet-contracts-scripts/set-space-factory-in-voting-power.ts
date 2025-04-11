import dotenv from 'dotenv';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Add interface definitions
interface Log {
  topics: string[];
  [key: string]: any;
}

interface TransactionReceipt {
  logs: Log[];
  [key: string]: any;
}

interface ContractTransactionWithWait extends ethers.ContractTransaction {
  wait(): Promise<TransactionReceipt>;
}

interface SpaceVotingPowerInterface {
  setSpaceFactory: (
    spaceFactoryAddress: string,
  ) => Promise<ContractTransactionWithWait>;
  owner(): Promise<string>;
}

// Function to parse addresses from addresses.txt
function parseAddressesFile(): Record<string, string> {
  const addressesPath = path.resolve(
    __dirname,
    '../../contracts/addresses.txt',
  );
  const fileContent = fs.readFileSync(addressesPath, 'utf8');

  const addresses: Record<string, string> = {};

  // Extract contract addresses using regex
  const patterns = {
    DAOSpaceFactory: /DAOSpaceFactory deployed to: (0x[a-fA-F0-9]{40})/,
    SpaceVotingPower: /SpaceVotingPower deployed to: (0x[a-fA-F0-9]{40})/,
  };

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = fileContent.match(pattern);
    if (match && match[1]) {
      addresses[key] = match[1];
    }
  }

  return addresses;
}

const spaceVotingPowerAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_spaceFactory',
        type: 'address',
      },
    ],
    name: 'setSpaceFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

async function main(): Promise<void> {
  // Parse addresses from file
  const addresses = parseAddressesFile();

  // Verify all required addresses are available
  const requiredContracts = ['DAOSpaceFactory', 'SpaceVotingPower'];
  const missingContracts = requiredContracts.filter(
    (contract) => !addresses[contract],
  );

  if (missingContracts.length > 0) {
    throw new Error(`Missing addresses for: ${missingContracts.join(', ')}`);
  }

  // Connect to the network
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // Create a wallet instance
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);

  // Use the SpaceVotingPower address directly from addresses.txt
  const spaceVotingPowerAddress = addresses['SpaceVotingPower'];
  const spaceFactoryAddress = addresses['DAOSpaceFactory'];

  console.log(
    'SpaceVotingPower address from addresses.txt:',
    spaceVotingPowerAddress,
  );
  console.log(
    'DAOSpaceFactory address from addresses.txt:',
    spaceFactoryAddress,
  );

  // Get the SpaceVotingPower contract instance
  const spaceVotingPower = new ethers.Contract(
    spaceVotingPowerAddress,
    spaceVotingPowerAbi,
    wallet,
  ) as ethers.Contract & SpaceVotingPowerInterface;

  // Check if the wallet is the owner
  const contractOwner = await spaceVotingPower.owner();
  if (contractOwner.toLowerCase() !== wallet.address.toLowerCase()) {
    console.error(
      `Your wallet (${wallet.address}) is not the owner of the SpaceVotingPower contract.`,
    );
    console.error(`The owner is: ${contractOwner}`);
    throw new Error(
      'Permission denied: only the contract owner can call setSpaceFactory',
    );
  }

  console.log('Setting SpaceFactory in SpaceVotingPower:');
  console.log('SpaceFactory:', spaceFactoryAddress);

  try {
    const tx = await spaceVotingPower.setSpaceFactory(spaceFactoryAddress);

    console.log('Transaction sent, waiting for confirmation...');
    await tx.wait();
    console.log('SpaceFactory set successfully in SpaceVotingPower!');
  } catch (error: any) {
    console.error('Error setting SpaceFactory:', error.message);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
