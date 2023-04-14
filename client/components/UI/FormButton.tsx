import { Button, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";

type Props = {
  state?: boolean;
  children: React.ReactNode;
};

const FormButton = ({ state, children }: Props) => {
  const theme = {
    m: "2rem 0",
    p: "1rem",
  };
  return (
    <Button
      fullWidth
      type="submit"
      sx={theme}
      variant="contained"
      disabled={state}
    >
      <Typography fontSize="1rem" fontWeight="500" position="relative">
        {children}
        {state && (
          <LinearProgress
            sx={{
              position: "absolute",
              width: "100%",
            }}
          />
        )}
      </Typography>
    </Button>
  );
};

export default FormButton;
