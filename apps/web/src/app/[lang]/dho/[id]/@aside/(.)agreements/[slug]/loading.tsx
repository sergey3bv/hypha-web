import { DiscussionDetail } from '@hypha-platform/epics';

export default function Loading() {
  return (
    <div className="sticky p-9 top-9 h-full bg-neutral-2 w-full flex-grow">
      <DiscussionDetail
        isLoading
        creator={{}}
        title={''}
        content={''}
        image={''}
        messages={[]}
        closeUrl={''}
      />
    </div>
  );
}
