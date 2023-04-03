import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const loginBase = `${base}/api/auth`;

export const loginUser = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(loginBase, payload, {
      withCredentials: true,
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
