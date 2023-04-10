import { getUser } from "@/api/user.api";
import { ReduxState, User } from "@/types/state.types";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

type Props = {
  user: User;
};

const ProfilePage = ({ user }: Props) => {
  const { query } = useRouter();
  console.log(user);
  return (
    <div>
      <p>{query.userId}</p>
    </div>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const userId = context.query.userId as string;
  const user = await getUser(userId);
  return {
    props: {
      user: user || null,
    },
  };
};

export default ProfilePage;
