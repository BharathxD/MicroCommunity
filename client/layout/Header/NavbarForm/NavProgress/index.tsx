import { Box, LinearProgress } from "@mui/material";

const NavProgress = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        ml: "0",
        mt: "7.5px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <LinearProgress
        color="primary"
        sx={{ borderRadius: "10px", height: "5px", width: "75%" }}
      />
    </Box>
  );
};

export default NavProgress;
