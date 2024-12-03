import { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@hypha-platform/ui/server';

type ProposalTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const ProposalTabs: FC<ProposalTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-3 mb-6"
    >
      <TabsList>
        <TabsTrigger value="all" variant="outlined">
          All
        </TabsTrigger>
        <TabsTrigger value="active" variant="outlined">
          Active
        </TabsTrigger>
        <TabsTrigger value="voting" variant="outlined">
          On voting
        </TabsTrigger>
        <TabsTrigger value="completed" variant="outlined">
          Completed
        </TabsTrigger>
        <TabsTrigger value="rejected" variant="outlined">
          Rejected
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
