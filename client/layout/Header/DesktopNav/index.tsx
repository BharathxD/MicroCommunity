import FlexBetween from "@/components/UI/FlexBetween";
import NavbarForm from "../NavbarForm";
import SwitchMode from "../SwitchMode";

const DesktopNav = () => {
  return (
    <FlexBetween mr="-2.5rem">
      <NavbarForm />
      <SwitchMode />
    </FlexBetween>
  );
};

export default DesktopNav;
