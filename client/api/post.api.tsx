import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const postBase = `${base}/api/post`;

export const patchLike = async (postId: string, token: string) => {
  try {
    const response = await axios.patch(`${postBase}/like/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    console.log(`Cannot patch Likes: ${error.message}`);
  }
};
