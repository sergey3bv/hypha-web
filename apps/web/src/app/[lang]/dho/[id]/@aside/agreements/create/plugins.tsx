import dynamic from 'next/dynamic';

const LoadingPlugin = ({ plugin }: { plugin: string }) => {
  return <div>Loading {plugin} ...</div>;
};

export const PLUGINS = {
  'propose-contribution': dynamic(
    () =>
      import('@hypha-platform/epics').then(
        (mod) => mod.ProposeContributionPlugin,
      ),
    { loading: () => <LoadingPlugin plugin={'Propose Contribution'} /> },
  ),
};

export const Plugin = ({ name }: { name: keyof typeof PLUGINS }) => {
  const PluginCmp = PLUGINS[name];
  return <PluginCmp />;
};
