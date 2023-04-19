import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const USER_BASE_URL = `${base}/api/user`;

export const patchConnectionHandler = async (
  connectionId: string,
  token: string
) => {
  try {
    const response = await axios.patch(
      `${USER_BASE_URL}/connections/${connectionId}`,
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

export const fetchSpecificUserConnections = async (
  userId: string | string[0] | undefined,
  token?: string | null
) => {
  try {
    if (!token) {
      return null;
    }
    const response = await axios.get(`${USER_BASE_URL}/${userId}/connections`, {
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

export const fetchUserConnections = async (
  token: string | null,
  userId?: string | string[] | undefined
) => {
  try {
    if (!token) {
      return null;
    }
    const URI = userId
      ? `${USER_BASE_URL}/${userId}/connections`
      : USER_BASE_URL;
    const response = await axios.get(URI, {
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
  _id: string | string[] | undefined,
  token?: string | null
) => {
  try {
    if (!_id) {
      return null;
    }
    _id = _id instanceof Array ? _id[0] : _id;
    const response = await axios.get(`${USER_BASE_URL}/search/${_id}`, {
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
