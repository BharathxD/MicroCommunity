import { useState } from "react";
import {
  Box,
  FormControl,
  InputBase,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { setLogout } from "@/state/auth";
import { logoutUser } from "@/api/auth.api";
import { ReduxState } from "@/types/state.types";
import NavProgress from "./NavProgress";

const UserDropdown = () => {
  const { fname, lname } = useSelector((state: ReduxState) => {
    return {
      fname: state.user?.fname,
      lname: state.user?.lname,
      isLoading: state.isLoading,
    };
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const fullName = `${fname} ${lname}`;
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const styles = {
    backgroundColor: theme.palette.neutral.light,
    width: "max-content",
    borderRadius: "9px",
    p: "0.45rem 1rem",
    position: "relative",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    "& .MuiSvgIcon-root": {
      width: "3rem",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: theme.palette.neutral.light,
    },
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await Promise.allSettled([logoutUser(), router.push("/auth")]);
      dispatch(setLogout());
      if (router.pathname === "/auth") {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: "1rem" }}>
      <FormControl variant="standard">
        <Select value={fullName} sx={styles} input={<InputBase />}>
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout} disabled={isLoading}>
            Log Out
          </MenuItem>
        </Select>
      </FormControl>
      <Box position="relative">{isLoading && <NavProgress />}</Box>
    </Box>
  );
};

export default UserDropdown;
