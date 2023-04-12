import { Loader } from "@mantine/core";
import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <Box width={"100%"} textAlign={"center"}>
        <Loader color={"#040404"} />
        <Typography fontWeight={600}>Loading</Typography>
      </Box>
    </Box>
  );
};

export default Loading;
