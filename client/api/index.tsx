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
    console.log(error.message);
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

export const getUser = async (
  userId: string | undefined,
  token: string | null
) => {
  try {
    if (!userId || !token) {
      return;
    }
    const response = await axios.get(`${userBase}/search/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const patchConnectionHandler = async (
  connectionId: string,
  token: string
) => {
  try {
    const response = await axios.patch(
      `${userBase}/connections/${connectionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const fetchUserConnections = async (token: string | null) => {
  try {
    if (!token) {
      return null;
    }
    const response = await axios.get(`${userBase}/connections`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      return null;
    }
    return response.data;
  } catch (error: any) {}
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
    console.log("Cannot find the user");
  }
};
