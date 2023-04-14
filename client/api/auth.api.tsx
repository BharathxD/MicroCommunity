import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const USER_BASE_URL = `${base}/api/user`;
const AUTH_BASE_URL = `${base}/api/auth`;

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = FormData;

const ERRORS = {
  USER_ALREADY_EXISTS: "User already exists.",
  INVALID_CREDENTIALS: "Email or Password is Incorrect",
  SERVER_ERROR: "Something went wrong, try again later.",
  UNKNOWN_ERROR:
    "Oops! Looks like our server is having a bit of a nap. Don't worry, we're on it!",
};

const handleApiError = (error: any) => {
  switch (error?.response?.status) {
    case 401:
      throw new Error(ERRORS.INVALID_CREDENTIALS);
    case 409:
      throw new Error(ERRORS.USER_ALREADY_EXISTS);
    case 500:
      throw new Error(ERRORS.SERVER_ERROR);
    default:
      throw new Error(ERRORS.UNKNOWN_ERROR);
  }
};

export const registerUser = async (formData: RegisterPayload) => {
  try {
    const response = await axios.post(USER_BASE_URL, formData, {
      withCredentials: true,
      headers: { "Content-Type": "application/form-data" },
    });
    return response;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, payload, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/logout`);
    return response;
  } catch (error: any) {
    console.log(`Cannot log User out: ${error.message}`);
  }
};
