import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { SpaceHelper } from './helpers/SpaceHelper';

describe('DAOSpaceFactoryImplementation', function () {
  // We define a fixture to reuse the same setup in every test
  async function deployFixture() {
    const [owner, proposer, voter1, voter2, voter3, other] =
      await ethers.getSigners();

    // Deploy TokenFactory
    const TokenFactory = await ethers.getContractFactory(
      'TokenFactoryImplementation',
    );
    const tokenFactory = await upgrades.deployProxy(
      TokenFactory,
      [owner.address],
      {
        initializer: 'initialize',
        kind: 'uups',
      },
    );

    // Deploy JoinMethodDirectory with OpenJoin
    const JoinMethodDirectory = await ethers.getContractFactory(
      'JoinMethodDirectoryImplementation',
    );
    const joinMethodDirectory = await upgrades.deployProxy(
      JoinMethodDirectory,
      [owner.address],
      {
        initializer: 'initialize',
        kind: 'uups',
      },
    );

    const OpenJoin = await ethers.getContractFactory('OpenJoin');
    const openJoin = await OpenJoin.deploy();
    await joinMethodDirectory.addJoinMethod(1, await openJoin.getAddress());

    // Deploy ExitMethodDirectory with NoExit
    const ExitMethodDirectory = await ethers.getContractFactory(
      'ExitMethodDirectoryImplementation',
    );
    const exitMethodDirectory = await upgrades.deployProxy(
      ExitMethodDirectory,
      [owner.address],
      {
        initializer: 'initialize',
        kind: 'uups',
      },
    );

    const NoExit = await ethers.getContractFactory('NoExit');
    const noExit = await NoExit.deploy();
    await exitMethodDirectory.addExitMethod(1, await noExit.getAddress());

    // Deploy VotingPowerDirectory
    const VotingPowerDirectory = await ethers.getContractFactory(
      'VotingPowerDirectoryImplementation',
    );
    const votingPowerDirectory = await upgrades.deployProxy(
      VotingPowerDirectory,
      [owner.address],
      {
        initializer: 'initialize',
        kind: 'uups',
      },
    );

    // Deploy the main DAOSpaceFactory contract
    const DAOSpaceFactory = await ethers.getContractFactory(
      'DAOSpaceFactoryImplementation',
    );
    const daoSpaceFactory = await upgrades.deployProxy(
      DAOSpaceFactory,
      [owner.address],
      {
        initializer: 'initialize',
        kind: 'uups',
      },
    );

    // Set contracts in DAOSpaceFactory
    await daoSpaceFactory.setContracts(
      await tokenFactory.getAddress(),
      await joinMethodDirectory.getAddress(),
      await exitMethodDirectory.getAddress(),
      await votingPowerDirectory.getAddress(),
    );

    // Set DAOSpaceFactory address in TokenFactory
    await tokenFactory.setSpacesContract(await daoSpaceFactory.getAddress());

    // Set DAOSpaceFactory in directories
    await joinMethodDirectory.setSpaceFactory(
      await daoSpaceFactory.getAddress(),
    );
    await exitMethodDirectory.setSpaceFactory(
      await daoSpaceFactory.getAddress(),
    );

    const spaceHelper = new SpaceHelper(daoSpaceFactory);

    return {
      daoSpaceFactory,
      tokenFactory,
      joinMethodDirectory,
      exitMethodDirectory,
      votingPowerDirectory,
      owner,
      proposer,
      voter1,
      voter2,
      voter3,
      other,
      spaceHelper,
    };
  }

  describe('Deployment & Initialization', function () {
    it('Should set the right owner', async function () {
      const { daoSpaceFactory, owner } = await loadFixture(deployFixture);
      expect(await daoSpaceFactory.owner()).to.equal(owner.address);
    });

    it('Should initialize with zero spaces', async function () {
      const { daoSpaceFactory } = await loadFixture(deployFixture);
      // Instead of expecting a revert, check if the space counter is 0
      // or check for default values in a non-existent space
      const spaceDetails = await daoSpaceFactory.getSpaceDetails(1);

      // Expect empty/default values for a non-existent space
      expect(spaceDetails.unity).to.equal(0);
      expect(spaceDetails.quorum).to.equal(0);
      expect(spaceDetails.members.length).to.equal(0);
      expect(spaceDetails.creator).to.equal(ethers.ZeroAddress);
    });

    it('Should set contract addresses correctly', async function () {
      const {
        daoSpaceFactory,
        tokenFactory,
        joinMethodDirectory,
        exitMethodDirectory,
        votingPowerDirectory,
      } = await loadFixture(deployFixture);

      expect(await daoSpaceFactory.tokenFactoryAddress()).to.equal(
        await tokenFactory.getAddress(),
      );
      expect(await daoSpaceFactory.joinMethodDirectoryAddress()).to.equal(
        await joinMethodDirectory.getAddress(),
      );
      expect(await daoSpaceFactory.exitMethodDirectoryAddress()).to.equal(
        await exitMethodDirectory.getAddress(),
      );
      expect(await daoSpaceFactory.proposalManagerAddress()).to.equal(
        await votingPowerDirectory.getAddress(),
      );
    });
  });

  describe('Space Creation', function () {
    it('Should create a space with correct parameters', async function () {
      const { spaceHelper, owner } = await loadFixture(deployFixture);

      const tx = await spaceHelper.createDefaultSpace();
      await tx.wait();

      const spaceDetails = await spaceHelper.getSpaceDetails(1);
      const executor = spaceDetails.executor;

      await expect(tx).to.emit(spaceHelper.contract, 'SpaceCreated').withArgs(
        1n, // spaceId
        51n, // unity
        51n, // quorum
        1n, // votingPowerSource
        1n, // exitMethod
        1n, // joinMethod
        owner.address, // creator
        executor, // executor address
      );

      expect(spaceDetails.unity).to.equal(51);
      expect(spaceDetails.quorum).to.equal(51);
      expect(spaceDetails.votingPowerSource).to.equal(1);
      expect(spaceDetails.exitMethod).to.equal(1);
      expect(spaceDetails.joinMethod).to.equal(1);
      expect(spaceDetails.creator).to.equal(owner.address);
      expect(spaceDetails.executor).to.not.equal(ethers.ZeroAddress);
    });

    it('Should fail with invalid unity value', async function () {
      const { spaceHelper } = await loadFixture(deployFixture);

      const spaceParams = {
        name: 'Test Space',
        description: 'Test Description',
        imageUrl: 'https://test.com/image.png',
        unity: 101, // Invalid: > 100
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await expect(
        spaceHelper.contract.createSpace(spaceParams),
      ).to.be.revertedWith('unity');
    });
  });

  describe('Space Membership', function () {
    it('Should allow joining a space', async function () {
      const { spaceHelper, other } = await loadFixture(deployFixture);

      await spaceHelper.createDefaultSpace();

      await expect(spaceHelper.joinSpace(1, other))
        .to.emit(spaceHelper.contract, 'MemberJoined')
        .withArgs(1, await other.getAddress());
    });

    it('Should prevent joining twice', async function () {
      const { spaceHelper, other } = await loadFixture(deployFixture);

      await spaceHelper.createDefaultSpace();
      await spaceHelper.joinSpace(1, other);

      await expect(spaceHelper.joinSpace(1, other)).to.be.revertedWith(
        'member',
      );
    });

    it('Should track spaces a member has joined', async function () {
      const { spaceHelper, other } = await loadFixture(deployFixture);

      // Create three spaces
      await spaceHelper.createDefaultSpace();
      await spaceHelper.createDefaultSpace();
      await spaceHelper.createDefaultSpace();

      // Join spaces 1 and 3
      await spaceHelper.joinSpace(1, other);
      await spaceHelper.joinSpace(3, other);

      // Check spaces the member has joined
      const memberSpaces = await spaceHelper.contract.getMemberSpaces(
        await other.getAddress(),
      );
      expect(memberSpaces.length).to.equal(2);
      expect(memberSpaces).to.deep.equal([1n, 3n]);
    });

    it('Should create a proposal when joining a space with join method 2', async function () {
      const { daoSpaceFactory, owner, voter1, other } = await loadFixture(
        deployFixture,
      );

      // First we need to deploy a proper DAOProposals contract to use
      const DAOProposals = await ethers.getContractFactory(
        'DAOProposalsImplementation',
      );
      const daoProposals = await upgrades.deployProxy(
        DAOProposals,
        [owner.address],
        { initializer: 'initialize', kind: 'uups' },
      );

      // Deploy SpaceVotingPower for proposal voting
      const SpaceVotingPower = await ethers.getContractFactory(
        'SpaceVotingPowerImplementation',
      );
      const spaceVotingPower = await upgrades.deployProxy(
        SpaceVotingPower,
        [owner.address],
        { initializer: 'initialize', kind: 'uups' },
      );

      // Set space factory in voting power source
      await spaceVotingPower.setSpaceFactory(
        await daoSpaceFactory.getAddress(),
      );

      // Register the voting power source in the directory
      const votingPowerDirectory = await ethers.getContractAt(
        'IVotingPowerDirectory',
        await daoSpaceFactory.proposalManagerAddress(),
      );
      await votingPowerDirectory.addVotingPowerSource(
        await spaceVotingPower.getAddress(),
      );

      // Configure proposals contract
      await daoProposals.setContracts(
        await daoSpaceFactory.getAddress(),
        await votingPowerDirectory.getAddress(),
      );

      // Update the proposalManagerAddress in DAOSpaceFactory
      await daoSpaceFactory.setContracts(
        await daoSpaceFactory.tokenFactoryAddress(),
        await daoSpaceFactory.joinMethodDirectoryAddress(),
        await daoSpaceFactory.exitMethodDirectoryAddress(),
        await daoProposals.getAddress(),
      );

      // Create a space with join method 2
      const spaceParams = {
        name: 'Join By Proposal Space',
        description: 'Test Description',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 10,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 2, // Join requires proposal approval
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await daoSpaceFactory.createSpace(spaceParams);
      const spaceId = 1;

      // Add a member to the space (owner is already a member)
      // This is needed to have sufficient voting power
      await daoSpaceFactory.connect(voter1).joinSpace(spaceId);

      // Get proposal count before join attempt
      const proposalCountBefore = await daoProposals.proposalCounter();

      // User attempts to join the space which should create a proposal
      await daoSpaceFactory.connect(other).joinSpace(spaceId);

      // Check if a new proposal was created
      const proposalCountAfter = await daoProposals.proposalCounter();

      expect(proposalCountAfter).to.be.gt(proposalCountBefore);

      // Get the latest proposal ID
      const proposalId = await daoProposals.proposalCounter();

      // Get proposal details using getProposalCore instead
      const [
        proposalSpaceId,
        // Ignore other fields
      ] = await daoProposals.getProposalCore(proposalId);

      // Verify proposal is for the correct space
      expect(proposalSpaceId).to.equal(spaceId);
    });

    it('Should remove a member from a space', async function () {
      const { spaceHelper, daoSpaceFactory, owner, other } = await loadFixture(
        deployFixture,
      );

      // Create space with exit method 1 (only executor can remove members)
      const spaceParams = {
        name: 'Space for Member Removal',
        description: 'Test Description',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1, // Using exit method 1 where only executor can remove
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await spaceHelper.contract.createSpace(spaceParams);

      // Join the space
      await spaceHelper.joinSpace(1, other);
      expect(
        await daoSpaceFactory.isMember(1, await other.getAddress()),
      ).to.equal(true);

      // Get the executor
      const executorAddress = await daoSpaceFactory.getSpaceExecutor(1);

      // Impersonate the executor
      await ethers.provider.send('hardhat_impersonateAccount', [
        executorAddress,
      ]);
      const executorSigner = await ethers.getSigner(executorAddress);

      // Fund the executor
      await owner.sendTransaction({
        to: executorAddress,
        value: ethers.parseEther('1.0'),
      });

      // Remove the member using removeMember (since we're the executor and exit method is 1)
      await expect(
        daoSpaceFactory
          .connect(executorSigner)
          .removeMember(1, await other.getAddress()),
      )
        .to.emit(daoSpaceFactory, 'MemberRemoved')
        .withArgs(1, await other.getAddress());

      // Verify member was removed
      expect(
        await daoSpaceFactory.isMember(1, await other.getAddress()),
      ).to.equal(false);

      // Verify member's spaces were updated
      const memberSpaces = await daoSpaceFactory.getMemberSpaces(
        await other.getAddress(),
      );
      expect(memberSpaces.length).to.equal(0);
    });
  });

  describe('Access Control', function () {
    it('Should only allow owner to set contracts', async function () {
      const { spaceHelper, other } = await loadFixture(deployFixture);

      await expect(
        spaceHelper.contract
          .connect(other)
          .setContracts(
            ethers.ZeroAddress,
            ethers.ZeroAddress,
            ethers.ZeroAddress,
            ethers.ZeroAddress,
          ),
      ).to.be.reverted;
    });

    it('Should only allow token factory to add tokens', async function () {
      const { spaceHelper, other } = await loadFixture(deployFixture);

      // Create space first
      const spaceParams = {
        name: 'Test Space',
        description: 'Test Description',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await spaceHelper.contract.createSpace(spaceParams);

      await expect(
        spaceHelper.contract
          .connect(other)
          .addTokenToSpace(1, ethers.ZeroAddress),
      ).to.be.revertedWith('Only factory can');
    });
  });

  describe('Space Tokens', function () {
    it('Should allow executor to mint tokens', async function () {
      const { spaceHelper, tokenFactory, daoSpaceFactory, owner, voter1 } =
        await loadFixture(deployFixture);

      // Create space first
      const spaceParams = {
        name: 'Token Space',
        description: 'Space with Token',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await spaceHelper.contract.createSpace(spaceParams);

      // Deploy token separately
      const deployTx = await tokenFactory.deployToken(
        1,
        'Space Token',
        'STKN',
        0,
        true,
      );
      const receipt = await deployTx.wait();

      // Get token address from event
      const tokenDeployedEvent = receipt?.logs
        .filter((log) => {
          try {
            return (
              tokenFactory.interface.parseLog({
                topics: log.topics as string[],
                data: log.data,
              })?.name === 'TokenDeployed'
            );
          } catch (_) {
            return false;
          }
        })
        .map((log) =>
          tokenFactory.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          }),
        )[0];

      if (!tokenDeployedEvent) {
        throw new Error('Token deployment event not found');
      }

      const tokenAddress = tokenDeployedEvent.args.tokenAddress;
      const token = await ethers.getContractAt('SpaceToken', tokenAddress);

      // Get the executor
      const executorAddress = await daoSpaceFactory.getSpaceExecutor(1);

      // Impersonate the executor
      await ethers.provider.send('hardhat_impersonateAccount', [
        executorAddress,
      ]);
      const executorSigner = await ethers.getSigner(executorAddress);

      // Fund the executor
      await owner.sendTransaction({
        to: executorAddress,
        value: ethers.parseEther('1.0'),
      });

      // Join the space
      await spaceHelper.joinSpace(1, voter1);

      // Mint tokens to voter1
      const mintAmount = ethers.parseUnits('100', 18);
      await token
        .connect(executorSigner)
        .mint(await voter1.getAddress(), mintAmount);

      // Check balance
      expect(await token.balanceOf(await voter1.getAddress())).to.equal(
        mintAmount,
      );
    });

    it('Should create a token with max supply and enforce it', async function () {
      const { daoSpaceFactory, tokenFactory, owner, voter1 } =
        await loadFixture(deployFixture);

      // Deploy a token directly with max supply
      const spaceId = 1;
      const tokenName = 'Limited Token';
      const tokenSymbol = 'LMT';
      const maxSupply = ethers.parseUnits('1000', 18);

      // Create a space first
      const spaceParams = {
        name: 'Limited Token Space',
        description: 'Space with Limited Token',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await daoSpaceFactory.createSpace(spaceParams);

      // Deploy token with max supply
      const tx = await tokenFactory.deployToken(
        spaceId,
        tokenName,
        tokenSymbol,
        maxSupply,
        true,
      );
      const receipt = await tx.wait();

      // Get token address from event
      const tokenDeployedEvent = receipt?.logs
        .filter((log) => {
          try {
            return (
              tokenFactory.interface.parseLog({
                topics: log.topics as string[],
                data: log.data,
              })?.name === 'TokenDeployed'
            );
          } catch (_) {
            return false;
          }
        })
        .map((log) =>
          tokenFactory.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          }),
        )[0];

      if (!tokenDeployedEvent) {
        throw new Error('Token deployment event not found');
      }

      const tokenAddress = tokenDeployedEvent.args.tokenAddress;
      const token = await ethers.getContractAt('SpaceToken', tokenAddress);

      // Verify max supply
      expect(await token.maxSupply()).to.equal(maxSupply);

      // Get executor
      const executorAddress = await daoSpaceFactory.getSpaceExecutor(spaceId);
      await ethers.provider.send('hardhat_impersonateAccount', [
        executorAddress,
      ]);
      const executorSigner = await ethers.getSigner(executorAddress);

      // Fund the executor with some ETH for transactions
      await owner.sendTransaction({
        to: executorAddress,
        value: ethers.parseEther('1.0'),
      });

      // Mint exactly max supply
      await token
        .connect(executorSigner)
        .mint(await owner.getAddress(), maxSupply);

      // Check balance equals max supply
      expect(await token.balanceOf(await owner.getAddress())).to.equal(
        maxSupply,
      );

      // Try to mint more (should fail)
      await expect(
        token.connect(executorSigner).mint(await voter1.getAddress(), 1),
      ).to.be.revertedWith('Mint would exceed maximum supply');
    });

    it('Should not allow non-executor to mint tokens', async function () {
      const { spaceHelper, tokenFactory, voter1 } = await loadFixture(
        deployFixture,
      );

      // Create space first
      const spaceParams = {
        name: 'Token Space',
        description: 'Space with Token',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await spaceHelper.contract.createSpace(spaceParams);

      // Deploy token separately
      const deployTx = await tokenFactory.deployToken(
        1,
        'Space Token',
        'STKN',
        0,
        true,
      );
      const receipt = await deployTx.wait();

      // Get token address from event
      const tokenDeployedEvent = receipt?.logs
        .filter((log) => {
          try {
            return (
              tokenFactory.interface.parseLog({
                topics: log.topics as string[],
                data: log.data,
              })?.name === 'TokenDeployed'
            );
          } catch (_) {
            return false;
          }
        })
        .map((log) =>
          tokenFactory.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          }),
        )[0];

      if (!tokenDeployedEvent) {
        throw new Error('Token deployment event not found');
      }

      const tokenAddress = tokenDeployedEvent.args.tokenAddress;
      const token = await ethers.getContractAt('SpaceToken', tokenAddress);

      // Try to mint as non-executor (should fail)
      const mintAmount = ethers.parseUnits('100', 18);
      await expect(
        token.connect(voter1).mint(await voter1.getAddress(), mintAmount),
      ).to.be.revertedWith('Only executor can call this function');
    });

    it('Should deploy a non-transferable token that prevents transfers', async function () {
      const {
        spaceHelper,
        tokenFactory,
        daoSpaceFactory,
        owner,
        voter1,
        voter2,
      } = await loadFixture(deployFixture);

      // Create space first
      const spaceParams = {
        name: 'Non-Transferable Token Space',
        description: 'Space with locked token',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await spaceHelper.contract.createSpace(spaceParams);

      // Deploy non-transferable token
      const deployTx = await tokenFactory.deployToken(
        1,
        'Non-Transferable Token',
        'NTTKN',
        0,
        false,
      );
      const receipt = await deployTx.wait();

      // Get token address from event
      const tokenDeployedEvent = receipt?.logs
        .filter((log) => {
          try {
            return (
              tokenFactory.interface.parseLog({
                topics: log.topics as string[],
                data: log.data,
              })?.name === 'TokenDeployed'
            );
          } catch (_) {
            return false;
          }
        })
        .map((log) =>
          tokenFactory.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          }),
        )[0];

      if (!tokenDeployedEvent) {
        throw new Error('Token deployment event not found');
      }

      const tokenAddress = tokenDeployedEvent.args.tokenAddress;
      const token = await ethers.getContractAt('SpaceToken', tokenAddress);

      // Verify token is non-transferable
      expect(await token.transferable()).to.equal(false);

      // Get the executor
      const executorAddress = await daoSpaceFactory.getSpaceExecutor(1);

      // Impersonate the executor
      await ethers.provider.send('hardhat_impersonateAccount', [
        executorAddress,
      ]);
      const executorSigner = await ethers.getSigner(executorAddress);

      // Fund the executor
      await owner.sendTransaction({
        to: executorAddress,
        value: ethers.parseEther('1.0'),
      });

      // Mint tokens to voter1
      const mintAmount = ethers.parseUnits('100', 18);
      await token
        .connect(executorSigner)
        .mint(await voter1.getAddress(), mintAmount);

      // Check balance
      expect(await token.balanceOf(await voter1.getAddress())).to.equal(
        mintAmount,
      );

      // Try to transfer tokens (should fail)
      await expect(
        token
          .connect(voter1)
          .transfer(await voter2.getAddress(), ethers.parseUnits('10', 18)),
      ).to.be.revertedWith('Token transfers are disabled');

      // Try to use transferFrom (should also fail)
      await token
        .connect(voter1)
        .approve(await voter2.getAddress(), ethers.parseUnits('10', 18));
      await expect(
        token
          .connect(voter2)
          .transferFrom(
            await voter1.getAddress(),
            await voter2.getAddress(),
            ethers.parseUnits('10', 18),
          ),
      ).to.be.revertedWith('Token transfers are disabled');
    });

    it('Should deploy a transferable token that allows transfers', async function () {
      const {
        spaceHelper,
        tokenFactory,
        daoSpaceFactory,
        owner,
        voter1,
        voter2,
      } = await loadFixture(deployFixture);

      // Create space first
      const spaceParams = {
        name: 'Transferable Token Space',
        description: 'Space with liquid token',
        imageUrl: 'https://test.com/image.png',
        unity: 51,
        quorum: 51,
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await spaceHelper.contract.createSpace(spaceParams);

      // Deploy transferable token
      const deployTx = await tokenFactory.deployToken(
        1,
        'Transferable Token',
        'TTKN',
        0,
        true,
      );
      const receipt = await deployTx.wait();

      // Get token address from event
      const tokenDeployedEvent = receipt?.logs
        .filter((log) => {
          try {
            return (
              tokenFactory.interface.parseLog({
                topics: log.topics as string[],
                data: log.data,
              })?.name === 'TokenDeployed'
            );
          } catch (_) {
            return false;
          }
        })
        .map((log) =>
          tokenFactory.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          }),
        )[0];

      if (!tokenDeployedEvent) {
        throw new Error('Token deployment event not found');
      }

      const tokenAddress = tokenDeployedEvent.args.tokenAddress;
      const token = await ethers.getContractAt('SpaceToken', tokenAddress);

      // Verify token is transferable
      expect(await token.transferable()).to.equal(true);

      // Get the executor
      const executorAddress = await daoSpaceFactory.getSpaceExecutor(1);

      // Impersonate the executor
      await ethers.provider.send('hardhat_impersonateAccount', [
        executorAddress,
      ]);
      const executorSigner = await ethers.getSigner(executorAddress);

      // Fund the executor
      await owner.sendTransaction({
        to: executorAddress,
        value: ethers.parseEther('1.0'),
      });

      // Mint tokens to voter1
      const mintAmount = ethers.parseUnits('100', 18);
      await token
        .connect(executorSigner)
        .mint(await voter1.getAddress(), mintAmount);

      // Check balance
      expect(await token.balanceOf(await voter1.getAddress())).to.equal(
        mintAmount,
      );

      // Transfer tokens (should succeed)
      const transferAmount = ethers.parseUnits('10', 18);
      await token
        .connect(voter1)
        .transfer(await voter2.getAddress(), transferAmount);

      // Check balances after transfer
      expect(await token.balanceOf(await voter1.getAddress())).to.equal(
        mintAmount - transferAmount,
      );
      expect(await token.balanceOf(await voter2.getAddress())).to.equal(
        transferAmount,
      );

      // Test transferFrom functionality
      await token
        .connect(voter1)
        .approve(await owner.getAddress(), transferAmount);
      await token
        .connect(owner)
        .transferFrom(
          await voter1.getAddress(),
          await voter2.getAddress(),
          transferAmount,
        );

      // Check balances after transferFrom
      expect(await token.balanceOf(await voter1.getAddress())).to.equal(
        mintAmount - transferAmount - transferAmount,
      );
      expect(await token.balanceOf(await voter2.getAddress())).to.equal(
        transferAmount + transferAmount,
      );
    });

    it('Should execute batch token transfers through a proposal', async function () {
      const { daoSpaceFactory, tokenFactory, owner, voter1, voter2, voter3 } =
        await loadFixture(deployFixture);

      // 1. Deploy and configure proposal system
      // Deploy SpaceVotingPower
      const SpaceVotingPower = await ethers.getContractFactory(
        'SpaceVotingPowerImplementation',
      );
      const spaceVotingPower = await upgrades.deployProxy(
        SpaceVotingPower,
        [owner.address],
        { initializer: 'initialize', kind: 'uups' },
      );

      // Set space factory in voting power source
      await spaceVotingPower.setSpaceFactory(
        await daoSpaceFactory.getAddress(),
      );

      // Register the voting power source in the directory
      const votingPowerDirectory = await ethers.getContractAt(
        'IVotingPowerDirectory',
        await daoSpaceFactory.proposalManagerAddress(),
      );
      await votingPowerDirectory.addVotingPowerSource(
        await spaceVotingPower.getAddress(),
      );

      // Deploy proposals contract
      const DAOProposals = await ethers.getContractFactory(
        'DAOProposalsImplementation',
      );
      const daoProposals = await upgrades.deployProxy(
        DAOProposals,
        [owner.address],
        { initializer: 'initialize', kind: 'uups' },
      );

      // Configure proposals contract
      await daoProposals.setContracts(
        await daoSpaceFactory.getAddress(),
        await votingPowerDirectory.getAddress(),
      );

      // Update proposal manager in space factory
      await daoSpaceFactory.setContracts(
        await daoSpaceFactory.tokenFactoryAddress(),
        await daoSpaceFactory.joinMethodDirectoryAddress(),
        await daoSpaceFactory.exitMethodDirectoryAddress(),
        await daoProposals.getAddress(),
      );

      // 2. Create a space
      const spaceParams = {
        name: 'Batch Transfer Test Space',
        description: 'Testing batch transfers',
        imageUrl: 'https://test.com/image.png',
        unity: 51, // Simple majority
        quorum: 10, // 10% quorum
        votingPowerSource: 1,
        exitMethod: 1,
        joinMethod: 1,
        createToken: false,
        tokenName: '',
        tokenSymbol: '',
      };

      await daoSpaceFactory.createSpace(spaceParams);
      const spaceId = 1;

      // 3. Add members to the space - make sure they're not already members
      // First, check if the addresses are already members
      const isOwnerMember = await daoSpaceFactory.isMember(
        spaceId,
        owner.address,
      );
      const isVoter1Member = await daoSpaceFactory.isMember(
        spaceId,
        await voter1.getAddress(),
      );
      const isVoter2Member = await daoSpaceFactory.isMember(
        spaceId,
        await voter2.getAddress(),
      );
      const isVoter3Member = await daoSpaceFactory.isMember(
        spaceId,
        await voter3.getAddress(),
      );

      // Only join if not already a member
      if (!isOwnerMember) await daoSpaceFactory.joinSpace(spaceId);
      if (!isVoter1Member)
        await daoSpaceFactory.connect(voter1).joinSpace(spaceId);
      if (!isVoter2Member)
        await daoSpaceFactory.connect(voter2).joinSpace(spaceId);
      if (!isVoter3Member)
        await daoSpaceFactory.connect(voter3).joinSpace(spaceId);

      // 4. Deploy three different tokens
      // Deploy token 1
      const deployTx1 = await tokenFactory.deployToken(
        spaceId,
        'Token One',
        'ONE',
        0,
        true,
      );
      const receipt1 = await deployTx1.wait();

      // Deploy token 2
      const deployTx2 = await tokenFactory.deployToken(
        spaceId,
        'Token Two',
        'TWO',
        0,
        true,
      );
      const receipt2 = await deployTx2.wait();

      // Deploy token 3
      const deployTx3 = await tokenFactory.deployToken(
        spaceId,
        'Token Three',
        'THREE',
        0,
        true,
      );
      const receipt3 = await deployTx3.wait();

      // Helper function to extract token address from event
      const getTokenAddress = (receipt: any) => {
        const tokenEvent = receipt?.logs
          .filter((log: any) => {
            try {
              return (
                tokenFactory.interface.parseLog({
                  topics: log.topics as string[],
                  data: log.data,
                })?.name === 'TokenDeployed'
              );
            } catch (_) {
              return false;
            }
          })
          .map((log: any) =>
            tokenFactory.interface.parseLog({
              topics: log.topics as string[],
              data: log.data,
            }),
          )[0];

        return tokenEvent.args.tokenAddress;
      };

      const token1Address = getTokenAddress(receipt1);
      const token2Address = getTokenAddress(receipt2);
      const token3Address = getTokenAddress(receipt3);

      const token1 = await ethers.getContractAt('SpaceToken', token1Address);
      const token2 = await ethers.getContractAt('SpaceToken', token2Address);
      const token3 = await ethers.getContractAt('SpaceToken', token3Address);

      // 5. Get the executor and fund it with tokens
      const executorAddress = await daoSpaceFactory.getSpaceExecutor(spaceId);

      // Impersonate the executor
      await ethers.provider.send('hardhat_impersonateAccount', [
        executorAddress,
      ]);
      const executorSigner = await ethers.getSigner(executorAddress);

      // Fund the executor with ETH for gas
      await owner.sendTransaction({
        to: executorAddress,
        value: ethers.parseEther('1.0'),
      });

      // Mint tokens to the executor (DAO treasury)
      const mintAmount = ethers.parseUnits('1000', 18);
      await token1.connect(executorSigner).mint(executorAddress, mintAmount);
      await token2.connect(executorSigner).mint(executorAddress, mintAmount);
      await token3.connect(executorSigner).mint(executorAddress, mintAmount);

      // Verify initial token balances
      expect(await token1.balanceOf(executorAddress)).to.equal(mintAmount);
      expect(await token2.balanceOf(executorAddress)).to.equal(mintAmount);
      expect(await token3.balanceOf(executorAddress)).to.equal(mintAmount);

      // Create an interface for ERC20 transfer function
      const erc20Interface = new ethers.Interface([
        'function transfer(address to, uint256 amount) external returns (bool)',
      ]);

      // Create the transactions array for multiple token transfers
      // This now directly matches our Transaction struct in the contract
      const transactions = [
        // Transfer token1 to voter1
        {
          target: token1Address,
          value: 0n,
          data: erc20Interface.encodeFunctionData('transfer', [
            await voter1.getAddress(),
            ethers.parseUnits('30', 18),
          ]),
        },
        // Transfer token2 to voter2
        {
          target: token2Address,
          value: 0n,
          data: erc20Interface.encodeFunctionData('transfer', [
            await voter2.getAddress(),
            ethers.parseUnits('50', 18),
          ]),
        },
        // Transfer token3 to voter3
        {
          target: token3Address,
          value: 0n,
          data: erc20Interface.encodeFunctionData('transfer', [
            await voter3.getAddress(),
            ethers.parseUnits('75', 18),
          ]),
        },
        // Mixed transfers - send token1 to voter2 and voter3 as well
        {
          target: token1Address,
          value: 0n,
          data: erc20Interface.encodeFunctionData('transfer', [
            await voter2.getAddress(),
            ethers.parseUnits('20', 18),
          ]),
        },
        {
          target: token1Address,
          value: 0n,
          data: erc20Interface.encodeFunctionData('transfer', [
            await voter3.getAddress(),
            ethers.parseUnits('25', 18),
          ]),
        },
      ];

      // Log initial balances before voting (before execution)
      console.log('\nInitial Balances (before proposal execution):');
      console.log(
        `Voter1 - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(await voter1.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter2 - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(await voter2.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter2 - Token TWO: ${ethers.formatUnits(
          await token2.balanceOf(await voter2.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter3 - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(await voter3.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter3 - Token THREE: ${ethers.formatUnits(
          await token3.balanceOf(await voter3.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Executor - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(executorAddress),
          18,
        )}`,
      );
      console.log(
        `Executor - Token TWO: ${ethers.formatUnits(
          await token2.balanceOf(executorAddress),
          18,
        )}`,
      );
      console.log(
        `Executor - Token THREE: ${ethers.formatUnits(
          await token3.balanceOf(executorAddress),
          18,
        )}`,
      );

      // Create a proposal using the new Transaction[] structure
      const createProposalTx = await daoProposals.createProposal({
        spaceId: spaceId,
        duration: 86400, // 1 day
        transactions: transactions, // Pass the transactions array directly
      });

      // Get the proposal ID from the event
      const receipt = await createProposalTx.wait();
      const proposalCreatedEvent = receipt?.logs
        .filter((log: any) => {
          try {
            return (
              daoProposals.interface.parseLog({
                topics: log.topics as string[],
                data: log.data,
              })?.name === 'ProposalCreated'
            );
          } catch (e) {
            return false;
          }
        })
        .map((log: any) =>
          daoProposals.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          }),
        )[0];

      const proposalId = proposalCreatedEvent?.args.proposalId;

      // Add detailed logging to track token transfers
      console.log('\n=== BATCH TOKEN TRANSFER TEST DETAILS ===');
      console.log('Transfers to be executed:');
      for (const tx of transactions) {
        const tokenAddress = tx.target;
        // Decode the transfer data to get recipient and amount
        const decodedData = erc20Interface.decodeFunctionData(
          'transfer',
          tx.data,
        );
        const recipient = decodedData[0];
        const amount = decodedData[1];

        let tokenName = 'Unknown';
        if (tokenAddress === token1Address) tokenName = 'Token ONE';
        if (tokenAddress === token2Address) tokenName = 'Token TWO';
        if (tokenAddress === token3Address) tokenName = 'Token THREE';

        let recipientName = 'Unknown';
        if (recipient === (await voter1.getAddress())) recipientName = 'Voter1';
        if (recipient === (await voter2.getAddress())) recipientName = 'Voter2';
        if (recipient === (await voter3.getAddress())) recipientName = 'Voter3';

        console.log(
          `- Transfer ${ethers.formatUnits(
            amount,
            18,
          )} ${tokenName} to ${recipientName}`,
        );
      }

      // Cast vote (which should auto-execute the proposal)
      console.log('\nCasting vote and executing proposal...');
      await daoProposals.vote(proposalId, true);

      // Skip time to end the voting period
      await ethers.provider.send('evm_increaseTime', [86401]); // Add 1 day + 1 second
      await ethers.provider.send('evm_mine', []);

      // Log final balances after execution
      console.log('\nFinal Balances (after proposal execution):');
      console.log(
        `Voter1 - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(await voter1.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter2 - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(await voter2.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter2 - Token TWO: ${ethers.formatUnits(
          await token2.balanceOf(await voter2.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter3 - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(await voter3.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Voter3 - Token THREE: ${ethers.formatUnits(
          await token3.balanceOf(await voter3.getAddress()),
          18,
        )}`,
      );
      console.log(
        `Executor - Token ONE: ${ethers.formatUnits(
          await token1.balanceOf(executorAddress),
          18,
        )}`,
      );
      console.log(
        `Executor - Token TWO: ${ethers.formatUnits(
          await token2.balanceOf(executorAddress),
          18,
        )}`,
      );
      console.log(
        `Executor - Token THREE: ${ethers.formatUnits(
          await token3.balanceOf(executorAddress),
          18,
        )}`,
      );
      console.log('=== END OF BATCH TOKEN TRANSFER TEST ===\n');

      // Verify token transfers were successful
      // Check token1 balances
      expect(await token1.balanceOf(await voter1.getAddress())).to.equal(
        ethers.parseUnits('30', 18),
      );
      expect(await token1.balanceOf(await voter2.getAddress())).to.equal(
        ethers.parseUnits('20', 18),
      );
      expect(await token1.balanceOf(await voter3.getAddress())).to.equal(
        ethers.parseUnits('25', 18),
      );

      // Check token2 balances
      expect(await token2.balanceOf(await voter2.getAddress())).to.equal(
        ethers.parseUnits('50', 18),
      );

      // Check token3 balances
      expect(await token3.balanceOf(await voter3.getAddress())).to.equal(
        ethers.parseUnits('75', 18),
      );

      // Verify executor's remaining balances
      expect(await token1.balanceOf(executorAddress)).to.equal(
        mintAmount -
          ethers.parseUnits('30', 18) -
          ethers.parseUnits('20', 18) -
          ethers.parseUnits('25', 18),
      );
      expect(await token2.balanceOf(executorAddress)).to.equal(
        mintAmount - ethers.parseUnits('50', 18),
      );
      expect(await token3.balanceOf(executorAddress)).to.equal(
        mintAmount - ethers.parseUnits('75', 18),
      );
    });
  });
});
