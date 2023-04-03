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

const NavbarForm = ({ color }: { color: string }) => {
  const user = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  const fullName = `${user?.fname} ${user?.lname}`;
  return (
    <FormControl variant="standard">
      <Select
        value={fullName}
        sx={{
          backgroundColor: color,
          minWidth: "150px",
          width: "max-content",
          borderRadius: "0.25rem",
          p: "0.25rem 1rem",
          "& .MuiSvgIcon-root": {
            pr: "0.25rem",
            idth: "3rem",
          },
          "& .MuiSelect-select:focus": {
            backgroundColor: color,
          },
        }}
        input={<InputBase />}
      >
        <MenuItem value={fullName}>
          <Typography>{fullName}</Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
      </Select>
    </FormControl>
  );
};

export default NavbarForm;
