import HomePageLayout from "@/layout/HomePageLayout";
import { ReactElement } from "react";

const SignIn = () => {
  return (
    <>
      <p>SignIn</p>
    </>
  );
};

SignIn.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default SignIn;
