import { Box } from "@mui/material";
import Image from "next/image";

type Props = {
  image: string;
  size: number;
};
const UserImage = ({ image, size = 60 }: Props) => {
  return (
    <Box width={size} height={size}>
      <Image
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
