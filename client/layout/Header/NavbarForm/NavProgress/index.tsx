import { Box, LinearProgress } from "@mui/material";

const NavProgress = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        m: "0",
        mt: "7.5px",
        width: "86%",
      }}
    >
      <LinearProgress
        color="primary"
        sx={{ borderRadius: "10px", height: "5px", width: "85%" }}
      />
    </Box>
  );
};

export default NavProgress;
