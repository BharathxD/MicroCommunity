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
    <Tooltip title="Click to clear message" enterDelay={2000}>
      <Alert
        onClick={toastOnClick}
        severity="success"
        color="info"
        sx={{
          position: "fixed",
          bottom: "25px",
          left: "40%",
          width: "max-content",
          minWidth: "300px",
          border: "1px solid rgba( 255, 255, 255, 0.1 )",
          d: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          zIndex: "100",
          cursor: "pointer",
          "&:hover": {
            border: "1px solid rgba( 255, 255, 255, 0.25 )",
          },
        }}
      >
        {message}
      </Alert>
    </Tooltip>
  );
};
export default Toast;
