// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import './TokenVotingPowerStorage.sol';

/**
 * @title DecayTokenVotingPowerStorage
 * @dev Storage for VoteDecayTokenVotingPowerImplementation
 */
contract DecayTokenVotingPowerStorage is TokenVotingPowerStorage {
  // Storage for the authorized token factory
  address public decayTokenFactory;

  // No events here - they should be defined in interfaces only
}
