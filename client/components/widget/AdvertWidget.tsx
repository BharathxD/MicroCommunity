import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../UI/FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import Image from "next/image";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <Image
        alt="advert"
        height={250}
        width={400}
        src="http://localhost:4000/public/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0", height: "auto" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
