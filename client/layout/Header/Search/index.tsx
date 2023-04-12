import FlexBetween from "@/components/UI/FlexBetween";
import { useTheme, IconButton, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const Search = () => {
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  return (
    <FlexBetween
      bgcolor={neutralLight}
      borderRadius="9px"
      padding="0.2rem 0.5rem 0.2rem 1rem"
      sx={{
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
      }}
    >
      <InputBase placeholder="Search..." />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </FlexBetween>
  );
};

export default Search;
