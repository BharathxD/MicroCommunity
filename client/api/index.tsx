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

export const registerUser = async (payload: {
  fname: string;
  lname: string;
  location: string;
  occupation: string;
  email: string;
  password: string;
  confirmPassword: string;
  picturePath: string;
  file: File;
}) => {
  try {
    const response = await axios.post(userBase, payload);
    console.log(response);
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
