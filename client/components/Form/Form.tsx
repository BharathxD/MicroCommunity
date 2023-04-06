import { Fragment, useState } from "react";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";

const Form = () => {
  const [page, setPage] = useState<string>("login");
  const isLoginPage = page === "login" && "login";
  const isRegisterPage = page === "register" && "register";
  const setPageType = (arg1: string) => {
    setPage(arg1);
  };
  return (
    <Fragment>
      {isLoginPage && <LoginForm setPageType={setPageType} />}
      {isRegisterPage && <RegisterForm setPageType={setPageType} />}
    </Fragment>
  );
};

export default Form;
