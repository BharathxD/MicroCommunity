import { fetchUserData } from "@/api/user.api";
import { User } from "@/types/state.types";
import { NextPageContext } from "next";

type Props = {
  userId: string;
  user: User;
};

const ProfilePage = ({ userId, user }: Props) => {
  return (
    <div>
      <p>{userId}</p>
      <p>{user?._id || "Undefined by the Server"}</p>
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const userId = context.query.userId as string;
  const user = await fetchUserData(userId);
  return {
    props: {
      userId: userId,
      user: user || null,
    },
  };
};

export default ProfilePage;
