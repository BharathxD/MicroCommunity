import { Alert, Box } from "@mui/material";

const Toast = () => {
  return (
    <Box position="absolute" bottom="25px">
      <Alert severity="success" color="info">
        This is a toast.
      </Alert>
    </Box>
  );
};
export default Toast;
