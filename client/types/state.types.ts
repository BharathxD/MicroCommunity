export interface Connections {
  _id: string;
  fname: string;
  lname: string;
  location: string;
  picturePath: string;
}

export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  picturePath: string;
  location: string;
  connections: Connections[];
  occupation?: string;
  viewedProfile: number;
  impressions: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  _id: string;
  userId: string;
  fname: string;
  lname: string;
  location: string;
  description: string;
  picture: string;
  userpicture: string;
  likes: Map<string, boolean>;
  comments: string[];
}

export interface ReduxState {
  mode: string;
  user: User | null;
  token: string | null;
  posts: Post[];
  isLoading: boolean;
}
