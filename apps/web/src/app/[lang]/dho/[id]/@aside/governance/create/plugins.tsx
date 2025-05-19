'use client';

import { ProposeContributionPlugin } from '@hypha-platform/epics';
import { PayForExpensesPlugin } from '@hypha-platform/epics';
import { DeployFundsPlugin } from '@hypha-platform/epics';
import { useMembers } from '@web/hooks/use-members';

export const PLUGINS = {
  'propose-contribution': ProposeContributionPlugin,
  'pay-for-expenses': PayForExpensesPlugin,
  'deploy-funds': DeployFundsPlugin,
};

type PluginProps = {
  name: keyof typeof PLUGINS;
  spaceSlug?: string;
};

export const Plugin = ({ name, spaceSlug }: PluginProps) => {
  const { members } = useMembers({ spaceSlug });

  const PluginCmp = PLUGINS[name];

  return <PluginCmp spaceSlug={spaceSlug || ''} members={members} />;
};
