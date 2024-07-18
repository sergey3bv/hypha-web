'use client'

import { SelectItem, SelectMenu } from '@hypha-platform/ui/server';
import { usePathname, useRouter } from 'next/navigation';

type LangSelectProps = {
  lang: string;
};

export const SelectLanguage: React.FC<LangSelectProps> = ({lang}) => {
  const {push} = useRouter()
  const path = usePathname()

  const handleLangChange = (value: string) => {
    const newPath = path.replace(/^\/[a-z]{2}/, `/${value}`)
    console.debug("handleLangChange", {path, value, newPath})
    push(newPath)
  }

  return (
    <SelectMenu value={lang} onValueChange={handleLangChange}>
      <SelectItem value="de">De</SelectItem>
      <SelectItem value="en">En</SelectItem>
    </SelectMenu>
  );
};
