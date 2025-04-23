import { ParamValue } from 'next/dist/server/request/params';
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

export const isPluginName = (
  mayBePluginName: ParamValue,
): mayBePluginName is keyof typeof PLUGINS => {
  return typeof mayBePluginName === 'string' && mayBePluginName in PLUGINS;
};
