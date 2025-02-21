import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const spaceFactoryProxyModule = buildModule('SpaceFactoryProxyModule', (m) => {
  const proxyAdminOwner = m.getAccount(0);

  const spaceFactoryV1 = m.contract('SpaceFactoryV1');

  const proxy = m.contract('TransparentUpgradeableProxy', [
    spaceFactoryV1,
    proxyAdminOwner,
    '0x',
  ]);

  const proxyAdminAddress = m.readEventArgument(
    proxy,
    'AdminChanged',
    'newAdmin',
  );

  const proxyAdmin = m.contractAt('ProxyAdmin', proxyAdminAddress);

  return { proxyAdmin, proxy };
});

const spaceFactoryV1Module = buildModule('SpaceFactoryV1Module', (m) => {
  const { proxy, proxyAdmin } = m.useModule(spaceFactoryProxyModule);

  const spaceFactoryV1 = m.contractAt('SpaceFactoryV1', proxy);

  return { spaceFactoryV1, proxy, proxyAdmin };
});

export default spaceFactoryV1Module;
