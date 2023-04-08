import { Box } from "@mui/material";
import Image from "next/image";

type Props = {
  image: string | undefined;
  size?: number;
};
const UserImage = ({ image, size = 60 }: Props) => {
  const baseUri = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const imageUri = `${baseUri}/public/${image}`;
  return (
    <Box width={size} height={size}>
      <Image
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={imageUri}
      />
    </Box>
  );
};

export default UserImage;
