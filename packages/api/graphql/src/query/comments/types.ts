import { Creator } from "../members/types";
export type Comment = {
  creator?: Creator;
  date?: string;
  message?: string;
  replies: Comment[];
  isReply?: boolean;
  isLoading?: boolean;
}
