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
    console.log(error.message);
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

export const fetchUserConnections = async (token: string | null) => {
  try {
    if (!token) {
      return null;
    }
    const response = await axios.get(
      `http://localhost:4000/api/user/connections`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 404) {
      return null;
    }
    return response.data;
  } catch (error: any) {
    console.log("No Users Found");
  }
};

export const fetchUserData = async (
  _id: string | undefined,
  token: string | null
) => {
  try {
    if (!_id || !token) {
      return null;
    }
    const response = await axios.get(`${userBase}/search/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Cannot find the user");
  }
};
