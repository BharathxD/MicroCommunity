import axios, { Axios } from "axios";

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

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${authBase}/logout`);
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const fetchUserData = async (_id: string, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/user/search/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Cannot find the user");
  }
};
