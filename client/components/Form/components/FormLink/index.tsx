import { Typography, useTheme } from "@mui/material";

type Props = {
  setPageType: (arg1: string) => void;
  resetForm: () => void;
  children: React.ReactNode;
  pageType: string;
};

export const FormLink = ({
  setPageType,
  resetForm,
  children,
  pageType,
}: Props) => {
  const palette = useTheme().palette;
  return (
    <Typography
      onClick={() => {
        setPageType(pageType);
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
