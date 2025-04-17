// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDecayingSpaceToken {
  function balanceOf(address account) external view returns (uint256);

  function decayPercentage() external view returns (uint256);

  function applyDecay(address user) external;
}
