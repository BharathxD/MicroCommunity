import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputBase,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/state.types";
import { setLogout } from "@/state/auth";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import UserImage from "@/components/widget/UserImage";

const NavbarForm = () => {
  const user = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const fullName = `${user?.fname} ${user?.lname}`;
  const logoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/auth");
        dispatch(setLogout());
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <FormControl variant="standard">
      <Select
        value={fullName}
        sx={{
          backgroundColor: neutralLight,
          minWidth: "150px",
          width: "max-content",
          borderRadius: "0.25rem",
          p: "0.25rem 1rem",
          "& .MuiSvgIcon-root": {
            pr: "0.25rem",
            idth: "3rem",
          },
          "& .MuiSelect-select:focus": {
            backgroundColor: neutralLight,
          },
        }}
        input={<InputBase />}
      >
        <MenuItem value={fullName}>
          <Typography>{fullName}</Typography>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
      </Select>
    </FormControl>
  );
};

export default NavbarForm;
