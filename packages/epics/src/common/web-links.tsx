import { Button } from '@hypha-platform/ui';
import { LinkIcon, LinkLabel } from '@hypha-platform/epics';

interface WebLinksProps {
  links?: string[];
}

export const WebLinks = ({ links }: WebLinksProps) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex gap-5">
      {links.map((link) => (
        <a
          key={link}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 text-neutral-11 hover:text-neutral-12 text-1"
        >
          <LinkIcon url={link} />
          <LinkLabel url={link} />
        </a>
      ))}
    </div>
  );
};
