import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const authBase = `${base}/api/auth`;
const userBase = `${base}/api/user`;

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${authBase}/login`, payload);
    return response;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const registerUser = async (payload: FormData) => {
  try {
    const response = await axios.post(userBase, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
