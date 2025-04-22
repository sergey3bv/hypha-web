import { ethers, upgrades } from 'hardhat';

// Replace this with your actual proxy address when deploying
const PROXY_ADDRESS = '0x6dB5E05B21c68550B63a7404a3B68F81c159DAee';

async function main(): Promise<void> {
  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  const adminAddress = await deployer.getAddress();

  console.log('Upgrading with admin address:', adminAddress);

  const VoteDecayVotingPower = await ethers.getContractFactory(
    'VoteDecayTokenVotingPowerImplementation',
  );

  console.log('Upgrading VoteDecayVotingPower...');
  const upgradedContract = await upgrades.upgradeProxy(
    PROXY_ADDRESS,
    VoteDecayVotingPower,
  );

  await upgradedContract.waitForDeployment();
  console.log(
    'VoteDecayVotingPower upgraded at address:',
    await upgradedContract.getAddress(),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
