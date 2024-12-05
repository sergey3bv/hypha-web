import { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@hypha-platform/ui/server';

type DiscussionTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const DiscussionTabs: FC<DiscussionTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-3"
    >
      <TabsList>
        <TabsTrigger value="all" variant="outlined">
          All
        </TabsTrigger>
        <TabsTrigger value="open" variant="outlined">
          Open
        </TabsTrigger>
        <TabsTrigger value="closed" variant="outlined">
          Closed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
