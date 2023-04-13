import { useEffect, useRef } from "react";
import FlexBetween from "@/components/UI/FlexBetween";
import {
  useTheme,
  IconButton,
  InputBase,
  Box,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { KeyboardCommandKey } from "@mui/icons-material";
import InputListenerIcon from "./InputListenerIcon";

const Search = () => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        searchRef.current?.focus();
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <FlexBetween
      bgcolor={neutralLight}
      borderRadius="9px"
      padding="0.2rem 0.5rem 0.2rem 1rem"
      sx={{
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <InputBase placeholder="Search..." inputRef={searchRef} />
      <IconButton
        sx={{
          p: "2.5px",
          borderRadius: "5px",
          mr: "-5px",
        }}
      >
        <InputListenerIcon />
      </IconButton>
    </FlexBetween>
  );
};

export default Search;
