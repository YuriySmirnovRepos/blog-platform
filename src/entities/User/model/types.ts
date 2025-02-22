export interface User {
  username: string;
  image?: string;
  bio?: string;
}

export interface CurrentUser extends User {
  email: string;
  token: string;
}

export interface Author extends User {
  following: boolean;
  avatarUrl?: string;
  name?: string;
}

type UserVariant = "current" | "author";

export interface UserProps {
  user: User | Author;
  variant: UserVariant;
  createdAt?: string;
  style?: React.CSSProperties;
}
