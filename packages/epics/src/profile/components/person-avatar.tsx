import { Avatar, AvatarImage, AvatarFallback } from '@hypha-platform/ui';
import { UserIcon } from 'lucide-react';

export const PersonAvatar = ({
  avatarSrc,
  userName,
}: {
  avatarSrc?: string;
  userName?: string;
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

    return <UserIcon className="w-4 h-4" />;
  };

  return (
    <Avatar className="w-7 h-7 rounded-lg">
      <AvatarImage src={avatarSrc} alt={`${userName}'s avatar`} />
      <AvatarFallback>{getFallbackContent()}</AvatarFallback>
    </Avatar>
  );
};
