import { Typography, useTheme } from "@mui/material";

type Props = {
  setPageType: (arg1: string) => void;
  resetForm: () => void;
  message: string;
};

export const FormLink = ({ setPageType, resetForm, message }: Props) => {
  const palette = useTheme().palette;
  return (
    <Typography
      onClick={() => {
        setPageType("login");
        resetForm();
      }}
      sx={{
        textDecoration: "underline",
        color: palette.primary.main,
        "&:hover": {
          cursor: "pointer",
          color: palette.primary.light,
        },
      }}
    >
      {message}
    </Typography>
  );
};
