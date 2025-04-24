import { ProposeContributionPlugin } from '@hypha-platform/epics';

export const PLUGINS = {
  'propose-contribution': ProposeContributionPlugin,
};

export const Plugin = ({ name }: { name: keyof typeof PLUGINS }) => {
  const PluginCmp = PLUGINS[name];
  return <PluginCmp />;
};
