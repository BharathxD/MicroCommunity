import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const authBase = `${base}/api/auth`;
const userBase = `${base}/api/user`;

export const registerUser = async (formData: FormData) => {
  try {
    const response = await axios.post(userBase, formData, {
      withCredentials: true,
      headers: { "Content-Type": "application/form-data" },
    });
    return response;
  } catch (error: any) {
    console.log(`Cannot register User: ${error.message}`);
    throw error;
  }
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${authBase}/login`, payload, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    console.log(`Cannot authenticate User: ${error.message}`);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${authBase}/logout`);
    return response;
  } catch (error: any) {
    console.log(`Cannot log User out: ${error.message}`);
  }
};
