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
        height={100}
        width={100}
        quality={100}
        src="http://localhost:4000/public/advert.jpeg"
        style={{
          borderRadius: "0.75rem",
          margin: "0.75rem 0",
          height: "100%",
          width: "100%",
        }}
      />

      <FlexBetween>
        <Typography color={main}>FashionFusion</Typography>
        <Typography color={medium}>FashionFusion.shop</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Elevate your style with FashionFusion&apos;s latest collection. From
        chic blazers to comfortable loungewear, our new range has something for
        everyone. Shop now for the latest trends and timeless classics.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
