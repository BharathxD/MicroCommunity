export type Connections = {
  _id: string,
  fname: string,
  lname: string,
  location: string,
  picturePath: string;
}

export type User = {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  picturePath: string;
  location: string;
  connections: Connections[] | [],
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
  picture: string;
  userpicture: string;
  likes: Map<string, boolean>;
  comments: Array<string>;
};

export type ReduxState = {
  mode: string;
  user: User | null;
  token: string | null;
  posts: Post[];
};
