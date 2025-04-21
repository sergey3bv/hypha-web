import { ethers, upgrades } from 'hardhat';

// Replace this with your actual proxy address when deploying
const PROXY_ADDRESS = '0x3214DE1Eb858799Db626Bd9699e78c2E6E33D2BE';

async function main(): Promise<void> {
  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  const adminAddress = await deployer.getAddress();

  console.log('Upgrading with admin address:', adminAddress);

  const TokenVotingPower = await ethers.getContractFactory(
    'TokenVotingPowerImplementation',
  );

  console.log('Upgrading TokenVotingPower...');
  const upgradedContract = await upgrades.upgradeProxy(
    PROXY_ADDRESS,
    TokenVotingPower,
  );

  await upgradedContract.waitForDeployment();
  console.log(
    'TokenVotingPower upgraded at address:',
    await upgradedContract.getAddress(),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
