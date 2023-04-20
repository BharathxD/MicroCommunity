import { Post } from "@/types/state.types";
import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const POST_BASE_URL = `${base}/api/post`;

export const createPost = async (payload: FormData) => {
  try {
    const response = await axios.post(`${POST_BASE_URL}`, payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log(`Cannot create the post ${error}`);
    return null;
  }
};

export const patchLike = async (postId: string) => {
  try {
    const response = await axios.patch(
      `${POST_BASE_URL}/like/${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    console.log(`Cannot patch Likes: ${error.message}`);
  }
};

export const getPosts = async (
  userId?: string | string[] | undefined,
  token?: string
): Promise<Post[] | null> => {
  try {
    const URI = userId ? `${POST_BASE_URL}/${userId}/posts` : POST_BASE_URL;
    const response = await axios.get<Post[]>(URI, {
      withCredentials: true,
      headers: {
        Authorization: token && `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(`Cannot fetch the posts: ${error}}`);
    return null;
  }
};
