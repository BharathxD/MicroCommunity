import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/user`;

export const getUser = async (userId: string) => {
  try {
    if (!userId) {
      return;
    }
    const response = await axios.get(`${userBase}/search/${userId}`);
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
