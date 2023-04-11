import { fetchUserData } from "@/api/user.api";
import { User } from "@/types/state.types";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";

type Props = {
  userId: string;
  user: User;
};

const ProfilePage = ({ userId, user }: Props) => {
  const [getUser, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserData(userId);
      setUser(user);
    };
    fetchUser();
  }, [userId]);
  return (
    <div>
      <p>{getUser?.fname}</p>
      <p>{user?._id || "Undefined by the Server"}</p>
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const userId = context.query.userId as string;
  const req = context.req;
  //? The request from the client includes cookie named `accessToken`, that accessToken will be forwarded to the server by the Client Server for an authorized request
  const accessToken = req?.headers.cookie?.replace("accessToken=", "");
  const user = await fetchUserData(userId, accessToken);
  return {
    props: {
      user: user || null,
    },
  };
};

export default ProfilePage;
