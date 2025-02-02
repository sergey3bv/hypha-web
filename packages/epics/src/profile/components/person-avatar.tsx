import { Avatar, AvatarImage } from '@hypha-platform/ui';

export const PersonAvatar = ({
  avatarSrc,
  userName,
}: {
  avatarSrc?: string;
  userName?: string;
}) => {
  return (
    <Avatar className="w-7 h-7 rounded-lg">
      <AvatarImage src={avatarSrc} alt={`${userName}'s avatar`} />
    </Avatar>
  );
};
