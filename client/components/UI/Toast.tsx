import { Close } from "@mui/icons-material";
import { Alert, Box, Tooltip } from "@mui/material";

const Toast = ({
  message,
  toastOnClick,
}: {
  message: string;
  toastOnClick: () => void;
}) => {
  return (
    <Box
      display="flex"
      sx={{
        position: "fixed",
        bottom: "25px",
        left: "0",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        zIndex: "100",
        cursor: "pointer",
      }}
    >
      <Tooltip title="Click to clear message" enterDelay={2000}>
        <Alert
          onClick={toastOnClick}
          severity="success"
          color="info"
          sx={{
            minWidth: "300px",
            width: "max-content",
            border: "1px solid rgba( 255, 255, 255, 0.1 )",
            "&:hover": {
              border: "1px solid rgba( 255, 255, 255, 0.25 )",
            },
          }}
        >
          {message}
        </Alert>
      </Tooltip>
    </Box>
  );
};
export default Toast;
