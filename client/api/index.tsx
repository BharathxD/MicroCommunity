import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const authBase = `${base}/api/auth`;
const userBase = `${base}/api/user`;

export const loginUser = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(authBase, payload, {
      withCredentials: true,
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const registerUser = async (payload: {
  fname: string;
  lname: string;
  occupation: string;
  location: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axios.post(userBase, payload, {
      withCredentials: true,
    });
    const data = await response.data;
    return {
      userIsCreated: response.status === 200,
      data,
    };
  } catch (error: any) {
    console.log(error.message);
  }
};
