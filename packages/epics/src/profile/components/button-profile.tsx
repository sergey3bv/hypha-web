import { Avatar, AvatarImage, Button } from "@hypha-platform/ui";

export type ButtonProfileProps = {
  avatarSrc: string;
  userName: string;
};

export const ButtonProfile = ({ avatarSrc, userName }: ButtonProfileProps) => {
  return (
    <Button variant="secondary" className="flex items-center space-x-4 p-1 pr-6 rounded-full">
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarSrc} alt={`${userName}'s avatar`} />
      </Avatar>
      <span className="text-sm">{userName}</span>
    </Button>
  );
};
