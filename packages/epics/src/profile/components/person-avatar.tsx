import { Avatar, AvatarImage, AvatarFallback } from '@hypha-platform/ui';
import { UserIcon } from 'lucide-react';

export const PersonAvatar = ({
  avatarSrc,
  userName,
  className = 'w-7 h-7',
}: {
  avatarSrc?: string;
  userName?: string;
  className?: string;
}) => {
  const getFallbackContent = () => {
    if (!userName) {
      return <UserIcon className="w-4 h-4" />;
    }

    const nameParts = userName.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0);
    } else if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
  };

  return (
    <Avatar className={`${className} rounded-lg`}>
      <AvatarImage src={avatarSrc} alt={`${userName}'s avatar`} />
      <AvatarFallback>{getFallbackContent()}</AvatarFallback>
    </Avatar>
  );
};
