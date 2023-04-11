import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.25rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
  border: `1px solid #b3b3b3`,
}));

export default WidgetWrapper;
