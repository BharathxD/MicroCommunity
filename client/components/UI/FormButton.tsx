import { useTheme, Button } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const FormButton = ({ children }: Props) => {
  const palette = useTheme().palette;
  return (
    <Button
      fullWidth
      type="submit"
      sx={{
        m: "2rem 0",
        p: "1rem",
        backgroundColor: palette.primary.main,
        color: palette.background.alt,
        "&:hover": { color: palette.primary.main },
      }}
    >
      {children}
    </Button>
  );
};

export default FormButton;
