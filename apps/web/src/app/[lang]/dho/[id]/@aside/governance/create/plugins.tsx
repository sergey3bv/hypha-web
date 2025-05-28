'use client';

import {
  ProposeContributionPlugin,
  PayForExpensesPlugin,
  DeployFundsPlugin,
  ChangeVotingMethodPlugin,
  IssueNewTokenPlugin,
} from '@hypha-platform/epics';
import { useMembers } from '@web/hooks/use-members';

export const PLUGINS = {
  'propose-contribution': ProposeContributionPlugin,
  'pay-for-expenses': PayForExpensesPlugin,
  'deploy-funds': DeployFundsPlugin,
  'change-voting-method': ChangeVotingMethodPlugin,
  'issue-new-token': IssueNewTokenPlugin,
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
