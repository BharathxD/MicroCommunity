import { useState } from "react";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";
import { Box } from "@mui/material";

const Form = () => {
  const [page, setPage] = useState<string>("login");
  const isLoginPage = page === "login" && "login";
  const isRegisterPage = page === "register" && "register";
  const setPageType = (arg1: string) => {
    setPage(arg1);
  };
  return (
    <>
      {isLoginPage && <LoginForm setPageType={setPageType} />}
      {isRegisterPage && <RegisterForm setPageType={setPageType} />}
    </>
  );
};

export default Form;
