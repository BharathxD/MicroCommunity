import React, { useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputBase,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/state/auth";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { logoutUser } from "@/api/user.api";
import { ReduxState } from "@/types/state.types";

const UserDropdown = () => {
  const { fname, lname } = useSelector((state: ReduxState) => {
    return {
      fname: state.user?.fname,
      lname: state.user?.lname,
    };
  });
  const fullName = `${fname} ${lname}`;
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const styles = {
    backgroundColor: theme.palette.neutral.light,
    minWidth: "150px",
    width: "max-content",
    borderRadius: "0.25rem",
    p: "0.25rem 1rem",
    "& .MuiSvgIcon-root": {
      pr: "0.25rem",
      idth: "3rem",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: theme.palette.neutral.light,
    },
  };

  const logoutHandler = async () => {
    try {
      await Promise.allSettled([logoutUser(), router.push("/auth")]);
      dispatch(setLogout());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: "1rem", m: "0.5rem 0" }}>
      <FormControl variant="standard">
        <Select value={fullName} sx={styles} input={<InputBase />}>
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default UserDropdown;
