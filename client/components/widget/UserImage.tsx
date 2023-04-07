import { Box } from "@mui/material";
import Image from "next/image";

type Props = {
  image: string | undefined;
  size?: number;
};
const UserImage = ({ image, size = 60 }: Props) => {
  return (
    <Box width={size} height={size}>
      <Image
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:4000/public/${image}`}
      />
    </Box>
  );
};

export default UserImage;
