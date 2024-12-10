import { FC } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@hypha-platform/ui/server';

type MemberTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const MemberTabs: FC<MemberTabsProps> = ({
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
        <TabsTrigger value="inactive" variant="outlined">
          Inactive
        </TabsTrigger>
        <TabsTrigger value="applicant" variant="outlined">
          Applicants
        </TabsTrigger>
        <TabsTrigger value="rejected" variant="outlined">
          Rejected
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
