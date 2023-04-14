import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const FormWrapper = ({ children }: Props) => {
  return (
    <Box
      m="0.25rem"
      borderRadius="1.5rem"
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      {children}
    </Box>
  );
};

export default FormWrapper;
