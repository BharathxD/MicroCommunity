import FlexBetween from "@/components/UI/FlexBetween";
import NavbarForm from "../NavbarForm";
import SwitchMode from "../SwitchMode";
import Search from "../Search";

const DesktopNav = () => {
  return (
    <FlexBetween>
      <Search />
      <NavbarForm />
      <SwitchMode />
    </FlexBetween>
  );
};

export default DesktopNav;
