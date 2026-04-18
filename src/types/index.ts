export type PostStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ReactionType = "like" | "love" | "sad" | "angry" | "wow";

export type Category =
  | "Confessions"
  | "Questions"
  | "Rants"
  | "Stories"
  | "Advice"
  | "Thoughts"
  | "Work"
  | "Relationships";

export interface Reactions {
  like: number;
  love: number;
  sad: number;
  angry: number;
  wow: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: string;
  category: Category;
  content: string;
  timestamp: string;
  status: PostStatus;
  reactions: Reactions;
  userReaction?: ReactionType | null;
  commentsCount: number;
  comments: Comment[];
  saved?: boolean;
}
