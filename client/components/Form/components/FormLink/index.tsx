import { Typography, useTheme } from "@mui/material";

type Props = {
  onPageChange: (newPage: "login" | "register") => void;
  resetForm: () => void;
  children: React.ReactNode;
  pageType: "login" | "register";
};

export const FormLink = ({
  onPageChange,
  resetForm,
  children,
  pageType,
}: Props) => {
  const palette = useTheme().palette;
  return (
    <Typography
      onClick={() => {
        onPageChange(pageType);
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
      {children}
    </Typography>
  );
};
