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
    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error: any) {
    console.log(`Cannot register User: ${error.message}`);
  }
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${authBase}/login`, payload);
    return response;
  } catch (error: any) {
    console.log(`Cannot authenticate User: ${error.message}`);
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
