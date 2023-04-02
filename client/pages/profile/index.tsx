import HomePageLayout from "@/layout/HomePageLayout";
import { ReactElement } from "react";

const ProfilePage = () => {
  return <div>Profile Page</div>;
};

ProfilePage.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default ProfilePage;
