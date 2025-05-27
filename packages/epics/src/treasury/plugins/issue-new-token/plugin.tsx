'use client';

import { TokenNameField, TokenSymbolField } from '../../components';

export const IssueNewTokenPlugin = ({ spaceSlug }: { spaceSlug: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <TokenNameField />
      <TokenSymbolField />
    </div>
  );
};
