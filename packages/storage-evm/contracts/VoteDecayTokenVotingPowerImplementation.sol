// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import './storage/TokenVotingPowerStorage.sol';
import './interfaces/IDecayTokenVotingPower.sol';
import './interfaces/IDecayingSpaceToken.sol';

/**
 * @title VoteDecayTokenVotingPowerImplementation
 * @dev Manages voting power calculations based on decaying token holdings
 */
contract VoteDecayTokenVotingPowerImplementation is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  TokenVotingPowerStorage,
  IDecayTokenVotingPower
{
  // Add storage for the authorized token factory
  address public decayTokenFactory;

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
   * @dev Set the address of the decaying token factory that can call setSpaceToken
   * @param _decayTokenFactory Address of the authorized decaying token factory
   */
  function setDecayTokenFactory(address _decayTokenFactory) external onlyOwner {
    require(_decayTokenFactory != address(0), 'Invalid token factory address');
    decayTokenFactory = _decayTokenFactory;
    emit DecayTokenFactorySet(_decayTokenFactory);
  }

  /**
   * @dev Link a space with its voting token - can only be set by the authorized decay token factory
   * @param _spaceId The space ID to link
   * @param _tokenAddress The DecayingSpaceToken address to use for voting power
   */
  function setSpaceToken(
    uint256 _spaceId,
    address _tokenAddress
  ) external override {
    require(
      msg.sender == decayTokenFactory,
      'Only decay token factory can set space token'
    );
    require(_spaceId > 0, 'Invalid space ID');
    require(_tokenAddress != address(0), 'Invalid token address');
    require(spaceTokens[_spaceId] == address(0), 'Token already set for space');

    // Validate that it's a DecayingSpaceToken by checking if it has decay properties
    try IDecayingSpaceToken(_tokenAddress).decayPercentage() returns (uint256) {
      // It's a valid DecayingSpaceToken
      spaceTokens[_spaceId] = _tokenAddress;
      emit SpaceTokenSet(_spaceId, _tokenAddress);
    } catch {
      revert('Token must be a DecayingSpaceToken');
    }
  }

  /**
   * @dev Get voting power for a user from a specific space based on decayed token holdings
   * @param _user The address to check voting power for
   * @param _sourceSpaceId The space ID from which to derive voting power
   * @return The voting power (decayed token balance of the user)
   */
  function getVotingPower(
    address _user,
    uint256 _sourceSpaceId
  ) external view override returns (uint256) {
    require(_sourceSpaceId > 0, 'Invalid space ID');
    address tokenAddress = spaceTokens[_sourceSpaceId];
    require(tokenAddress != address(0), 'Token not set for space');

    // Get the decayed balance
    return IDecayingSpaceToken(tokenAddress).balanceOf(_user);
  }

  /**
   * @dev Get total voting power from a specific space
   * @param _sourceSpaceId The space ID from which to derive total voting power
   * @return The total voting power (total supply of the token)
   * @notice This returns the raw total supply without decay applied
   */
  function getTotalVotingPower(
    uint256 _sourceSpaceId
  ) external view override returns (uint256) {
    require(_sourceSpaceId > 0, 'Invalid space ID');
    address tokenAddress = spaceTokens[_sourceSpaceId];
    require(tokenAddress != address(0), 'Token not set for space');

    // Note: This returns the total supply without decay applied
    // For precise percentage calculations, client code should sum all decayed balances
    return IERC20(tokenAddress).totalSupply();
  }

  /**
   * @dev Apply decay to a user's balance and return the updated voting power
   * @param _user The address to apply decay and check voting power for
   * @param _sourceSpaceId The space ID from which to derive voting power
   * @return The updated voting power after applying decay
   */
  function applyDecayAndGetVotingPower(
    address _user,
    uint256 _sourceSpaceId
  ) external returns (uint256) {
    require(_sourceSpaceId > 0, 'Invalid space ID');
    address tokenAddress = spaceTokens[_sourceSpaceId];
    require(tokenAddress != address(0), 'Token not set for space');

    // Apply decay and get updated balance
    IDecayingSpaceToken(tokenAddress).applyDecay(_user);
    return IDecayingSpaceToken(tokenAddress).balanceOf(_user);
  }
}
