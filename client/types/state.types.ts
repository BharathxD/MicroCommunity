export type User = {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  picturePath: string;
  connections: Array<string>;
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  _id: string;
  userId: string;
  fname: string;
  lname: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Map<string, boolean>;
  comments: Array<string>;
};

export type ReduxState = {
  mode: string;
  user: User | null;
  token: string | null;
  posts: Post[];
};
