// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import './storage/OwnershipTokenVotingPowerStorage.sol';
import './interfaces/IOwnershipTokenVotingPower.sol';
import './interfaces/IOwnershipSpaceToken.sol';

/**
 * @title OwnershipTokenVotingPowerImplementation
 * @dev Manages voting power calculations based on ownership token holdings
 */
contract OwnershipTokenVotingPowerImplementation is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  OwnershipTokenVotingPowerStorage,
  IOwnershipTokenVotingPower
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address initialOwner) public initializer {
    __Ownable_init(initialOwner);
    __UUPSUpgradeable_init();
  }

  function _authorizeUpgrade(
    address newImplementation
  ) internal override onlyOwner {}

  /**
   * @dev Set the address of the token factory that can call setSpaceToken
   * @param _tokenFactory Address of the authorized token factory
   */
  function setOwnershipTokenFactory(address _tokenFactory) external onlyOwner {
    require(
      _tokenFactory != address(0),
      'Token factory cannot be zero address'
    );
    ownershipTokenFactory = _tokenFactory;
    emit OwnershipTokenFactorySet(_tokenFactory);
  }

  /**
   * @dev Link a space with its voting token - can only be set by an authorized token factory
   * @param _spaceId The space ID to link
   * @param _tokenAddress The ownership token address to use for voting power
   */
  function setSpaceToken(
    uint256 _spaceId,
    address _tokenAddress
  ) external override {
    require(
      msg.sender == ownershipTokenFactory,
      'Only ownership token factory can set space token'
    );
    require(_spaceId > 0, 'Invalid space ID');
    require(_tokenAddress != address(0), 'Invalid token address');
    require(spaceTokens[_spaceId] == address(0), 'Token already set for space');

    spaceTokens[_spaceId] = _tokenAddress;
    emit SpaceTokenSet(_spaceId, _tokenAddress);
  }

  /**
   * @dev Get voting power for a user from a specific space based on ownership token holdings
   * @param _user The address to check voting power for
   * @param _sourceSpaceId The space ID from which to derive voting power
   * @return The voting power (token balance of the user)
   */
  function getVotingPower(
    address _user,
    uint256 _sourceSpaceId
  ) external view override returns (uint256) {
    require(_sourceSpaceId > 0, 'Invalid space ID');
    address tokenAddress = spaceTokens[_sourceSpaceId];
    require(tokenAddress != address(0), 'Token not set for space');

    return IOwnershipSpaceToken(tokenAddress).balanceOf(_user);
  }

  /**
   * @dev Get total voting power from a specific space
   * @param _sourceSpaceId The space ID from which to derive total voting power
   * @return The total voting power (total supply of the token)
   */
  function getTotalVotingPower(
    uint256 _sourceSpaceId
  ) external view override returns (uint256) {
    require(_sourceSpaceId > 0, 'Invalid space ID');
    address tokenAddress = spaceTokens[_sourceSpaceId];
    require(tokenAddress != address(0), 'Token not set for space');

    // Use IERC20 interface for total supply since it's a common method across token types
    return IERC20(tokenAddress).totalSupply();
  }
}
