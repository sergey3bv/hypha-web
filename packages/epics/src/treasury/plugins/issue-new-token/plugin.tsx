'use client';

import {
  TokenNameField,
  TokenSymbolField,
  TokenIconField,
  TokenDescriptionField
} from '../../components';

export const IssueNewTokenPlugin = ({ spaceSlug }: { spaceSlug: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <TokenNameField />
      <TokenSymbolField />
      <TokenIconField />
      <TokenDescriptionField />
    </div>
  );
};
