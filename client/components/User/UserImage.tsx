import { Box } from "@mui/material";
import Image from "next/image";

type Props = {
  image: string | undefined;
  size?: number;
  br?: string;
};

const UserImage = ({ image, size = 60, br = "50%" }: Props) => {
  const baseUri = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const imageUri = `${baseUri}/public/${image}`;
  return (
    <Box width={size} height={size}>
      <Image
        style={{ objectFit: "cover", borderRadius: br }}
        width={size}
        quality={50}
        height={size}
        alt="User Profile"
        src={imageUri}
      />
    </Box>
  );
};

export default UserImage;
