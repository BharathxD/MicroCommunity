import { Button, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";

type Props = {
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const FormButton = ({ isLoading, disabled, children }: Props) => {
  const theme = {
    m: "2rem 0",
    p: "1rem",
  };
  return (
    <Button
      fullWidth
      type="submit"
      sx={theme}
      variant="outlined"
      disabled={disabled}
    >
      <Typography fontSize="1rem" fontWeight="500">
        {children}
        {isLoading && <LinearProgress />}
      </Typography>
    </Button>
  );
};

export default FormButton;
