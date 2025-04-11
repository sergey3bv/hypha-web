// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IExecutor {
  struct Transaction {
    address target;
    uint256 value;
    bytes data;
  }
  function executeTransactions(
    Transaction[] calldata transactions
  ) external returns (bool);
}
