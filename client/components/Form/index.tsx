import { Fragment, useState } from "react";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";

const Form = () => {
  const [currentPage, setCurrentPage] = useState<"login" | "register">("login");

  const handlePageChange = (newPage: "login" | "register") => {
    setCurrentPage(newPage);
  };

  const isLoginPage = currentPage === "login";

  return (
    <Fragment>
      {isLoginPage && <LoginForm onPageChange={handlePageChange} />}
      {!isLoginPage && <RegisterForm onPageChange={handlePageChange} />}
    </Fragment>
  );
};

export default Form;
