export type MemberType = {
  avatar: string;
  name: string;
  surname: string;
};

export type InnerSpaceType = {
  image?: string;
  title?: string;
  description?: string;
  members?: MemberType[];
  joinedStatus?: boolean;
  slug?: string;
};
