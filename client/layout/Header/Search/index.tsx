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
      gap="3rem"
      padding="0.1rem 1rem"
    >
      <InputBase placeholder="Search..." />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </FlexBetween>
  );
};

export default Search;
