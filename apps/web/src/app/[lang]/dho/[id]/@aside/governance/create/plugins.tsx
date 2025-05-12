import { ProposeContributionPlugin } from '@hypha-platform/epics';
import { PayForExpensesPlugin } from '@hypha-platform/epics';
import { DeployFundsPlugin } from '@hypha-platform/epics';

export const PLUGINS = {
  'propose-contribution': ProposeContributionPlugin,
  'pay-for-expenses': PayForExpensesPlugin,
  'deploy-funds': DeployFundsPlugin,
};

export const Plugin = ({ name }: { name: keyof typeof PLUGINS }) => {
  const PluginCmp = PLUGINS[name];
  return <PluginCmp />;
};
