// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IExecutor {
  struct Transaction {
    address target;
    uint256 value;
    bytes data;
  }

  function executeTransaction(
    address target,
    uint256 value,
    bytes memory data
  ) external returns (bool);

  function executeTransactions(
    Transaction[] calldata transactions
  ) external returns (bool);
}
