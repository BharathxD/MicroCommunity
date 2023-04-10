import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "../UI/FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReduxState } from "@/types/state.types";
import { getUser } from "@/api";

type Props = {
  picturePath: string;
};

const UserWidget = ({ picturePath }: Props) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const router = useRouter();
  const token = useSelector((state: ReduxState) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  useEffect(() => {
    const getUserHandler = async () => {
      if (!token) {
        return;
      }
      const userData = await getUser(token);
      setUser(userData);
    };
    getUserHandler();
  }, [token]);
};

export default UserWidget;
