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
    if (error?.response?.status === 409) {
      throw new Error("User already exists.");
    } else if (error?.response?.status === 500) {
      throw new Error("Something went wrong, try again later.");
    } else {
      throw new Error(
        "Oops! Looks like our server is having a bit of a nap. Don't worry, we're on it!"
      );
    }
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
    if (error?.response?.status === 401) {
      throw new Error("Email or Password is Incorrect");
    } else if (error?.response?.status === 500) {
      throw new Error("Something went wrong, try again later.");
    } else {
      throw new Error(
        "Oops! Looks like our server is having a bit of a nap. Don't worry, we're on it!"
      );
    }
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
