import dotenv from 'dotenv';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

dotenv.config();

interface ContractTransactionWithWait extends ethers.ContractTransaction {
  wait(): Promise<any>;
}

interface DAOProposalsInterface {
  transferOwnership: (
    newOwner: string
  ) => Promise<ContractTransactionWithWait>;
  owner(): Promise<string>;
}

async function main(): Promise<void> {
  // Connect to the network
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  
  // This must be the private key of the CURRENT owner
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);
  
  const daoProposalsAddress = process.env.DAO_PROPOSALS_ADDRESS;
  if (!daoProposalsAddress) {
    throw new Error('DAOProposals address is required but not found');
  }
  
  const abi = [
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];
  
  const contract = new ethers.Contract(
    daoProposalsAddress,
    abi,
    wallet
  ) as ethers.Contract & DAOProposalsInterface;
  
  // New owner address - the address you want to transfer to
  const newOwner = "0x2687fe290b54d824c136Ceff2d5bD362Bc62019a";
  
  console.log(`Current owner: ${await contract.owner()}`);
  console.log(`Transferring ownership to: ${newOwner}`);
  
  const tx = await contract.transferOwnership(newOwner);
  await tx.wait();
  
  console.log(`New owner: ${await contract.owner()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 