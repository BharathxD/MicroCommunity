import { LoadingButton } from "@mui/lab";
import { useTheme, Button, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const FormButton = ({ children }: Props) => {
  const theme = {
    m: "2rem 0",
    p: "1rem",
  };
  return (
    <>
      <Button fullWidth type="submit" variant="outlined" sx={theme}>
        <Typography fontSize="1rem" fontWeight="500">{children}</Typography>
      </Button>
    </>
  );
};

export default FormButton;
