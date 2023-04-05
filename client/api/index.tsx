import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const authBase = `${base}/api/auth`;
const userBase = `${base}/api/user`;

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(authBase, payload, {
      withCredentials: true,
    });
    const data = await response.data;
    return await data.json;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const registerUser = async (payload: FormData) => {
  try {
    const response = await axios.post(userBase, payload);
    const data = await response.data;
    console.log(await data.json);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};