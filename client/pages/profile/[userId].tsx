import { useRouter } from "next/router";
import React from "react";

const ProfilePage = () => {
  const { query } = useRouter();
  return (
    <div>
      <p>{query.userId}</p>
    </div>
  );
};

export default ProfilePage;
