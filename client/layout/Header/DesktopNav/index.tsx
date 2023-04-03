import FlexBetween from "@/components/UI/FlexBetween";
import NavIcons from "../NavIcons";
import NavbarForm from "../NavbarForm";
import SwitchMode from "../SwitchMode";

const DesktopNav = () => {
  return (
    <FlexBetween gap="2rem">
      <SwitchMode />
      <NavIcons />
      <NavbarForm />
    </FlexBetween>
  );
};

export default DesktopNav;
