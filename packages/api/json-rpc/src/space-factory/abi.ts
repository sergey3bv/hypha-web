export const spaceFactoryAbi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_spaceId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_userAddress',
        type: 'address',
      },
    ],
    name: 'isMember',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
