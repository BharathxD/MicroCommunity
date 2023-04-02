import HomePageLayout from "@/layout/HomePageLayout";
import { ReactElement } from "react";

const SignUp = () => {
  return (
    <>
      <p>SignUp</p>
    </>
  );
};

SignUp.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default SignUp;
