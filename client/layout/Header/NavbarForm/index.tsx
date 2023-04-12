import React, { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Box,
  LinearProgress,
  InputBase,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/state/auth";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { logoutUser } from "@/api/auth.api";
import { ReduxState } from "@/types/state.types";

const UserDropdown = () => {
  const { fname, lname } = useSelector((state: ReduxState) => {
    return {
      fname: state.user?.fname,
      lname: state.user?.lname,
    };
  });
  const [isLoading, setLoading] = useState<boolean>();
  const fullName = `${fname} ${lname}`;
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const styles = {
    backgroundColor: theme.palette.neutral.light,
    minWidth: "150px",
    width: "max-content",
    borderRadius: "9px",
    p: "0.45rem 1rem",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    "& .MuiSvgIcon-root": {
      width: "3rem",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: theme.palette.neutral.light,
    },
  };

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await Promise.allSettled([logoutUser(), router.push("/auth")]);
      dispatch(setLogout());
      if (router.pathname === "/auth") {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: "1rem" }}>
      <FormControl variant="standard">
        <Select value={fullName} sx={styles} input={<InputBase />}>
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={logoutHandler} disabled={isLoading}>
            Log Out
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserDropdown;
