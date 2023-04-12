import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/user`;

export const patchConnectionHandler = async (
  connectionId: string,
  token: string
) => {
  try {
    const response = await axios.patch(
      `${userBase}/connections/${connectionId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.data;
  } catch (error: any) {
    console.log(`Cannot patch Connections: ${error.message}`);
  }
};

export const fetchUserConnections = async (token: string | null) => {
  try {
    if (!token) {
      return null;
    }
    const response = await axios.get(`${userBase}/connections`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      return null;
    }
    return response.data;
  } catch (error: any) {
    console.log(`Cannot fetch Connections: ${error.message}`);
  }
};

export const fetchUserData = async (
  _id: string | undefined,
  token?: string | null
) => {
  try {
    if (!_id) {
      return null;
    }
    const response = await axios.get(`${userBase}/search/${_id}`, {
      withCredentials: true,
      headers: {
        Authorization: token && `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(`Cannot find Users: ${error.message}`);
  }
};
