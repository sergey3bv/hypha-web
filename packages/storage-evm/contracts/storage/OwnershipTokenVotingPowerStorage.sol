// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

/**
 * @title OwnershipTokenVotingPowerStorage
 * @dev Storage contract for OwnershipTokenVotingPower
 */
contract OwnershipTokenVotingPowerStorage is Initializable {
  // Address of the authorized token factory
  address public ownershipTokenFactory;

  // Mapping from space ID to its voting token address
  mapping(uint256 => address) public spaceTokens;

  // Mapping for multiple authorized token factories
  mapping(address => bool) public authorizedOwnershipTokenFactories;
}
