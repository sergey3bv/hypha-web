// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Executor {
  address public owner;
  address public proposalManager;

  //event TransactionExecuted(address target, uint value, bytes data);
  //event BatchTransferExecuted(TokenTransfer[] transfers);

  struct TokenTransfer {
    address token; // Token contract address
    address recipient; // Recipient of the transfer
    uint256 amount; // Amount to transfer
  }

  constructor(address _proposalManager) {
    owner = msg.sender;
    //require(_proposalManager != address(0), "Invalid proposal manager address");
    proposalManager = _proposalManager;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, 'Na');
    _;
  }

  function setProposalManager(address _proposalManager) external onlyOwner {
    proposalManager = _proposalManager;
  }

  modifier onlyProposalManagerOrSelf() {

    _;
  }

  function executeTransaction(
    address target,
    uint256 value,
    bytes memory data
  ) external onlyProposalManagerOrSelf returns (bool success) {
    require(address(this).balance >= value, 'ins bal');
    (success, ) = target.call{value: value}(data);
    require(success, 'f');
    //emit TransactionExecuted(target, value, data);
    return success;
  }

  function batchTransferFromContract(
    TokenTransfer[] calldata transfers
  ) external onlyProposalManagerOrSelf returns (bool) {
    for (uint i = 0; i < transfers.length; i++) {
      TokenTransfer memory transfer = transfers[i];
      bool success = IERC20(transfer.token).transfer(
        transfer.recipient,
        transfer.amount
      );
      require(success, 'fa');
    }

    //emit BatchTransferExecuted(transfers);
    return true;
  }

  receive() external payable {}
}
