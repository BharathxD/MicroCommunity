import FlexBetween from "@/components/UI/FlexBetween";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Dropzone, { Accept } from "react-dropzone";

type Props = {
  image: File | null;
  setImage: Dispatch<SetStateAction<null | File>>;
};

const PostDropzone = ({ image, setImage }: Props) => {
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  };
  return (
    <Box
      border={`1px solid ${medium}`}
      borderRadius="5px"
      p="1rem"
      width="100%"
      textAlign="center"
    >
      <Dropzone
        accept={acceptedFileTypes}
        multiple={false}
        onDrop={(acceptedFiles: File[]) => setImage(acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <FlexBetween>
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              width="100%"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!image ? (
                <Typography color={palette.neutral.main}>
                  Wanna throw an Image?
                </Typography>
              ) : (
                <FlexBetween>
                  <Typography color={palette.neutral.main}>
                    {image.name}
                  </Typography>
                  <EditOutlined
                    sx={{
                      color: palette.neutral.main,
                    }}
                  />
                </FlexBetween>
              )}
            </Box>
            {image && (
              <Box height="100%" width="15%" p="0" mr="-1rem">
                <IconButton
                  onClick={() => setImage(null)}
                  sx={{
                    borderRadius: "10px",
                    height: "60px",
                    width: "75%",
                    backgroundColor: palette.neutral.light,
                    "&:hover": {
                      backgroundColor: palette.primary.light,
                    },
                  }}
                >
                  <DeleteOutlined
                    sx={{
                      fontSize: "1.5rem",
                      color: palette.neutral.main,
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </FlexBetween>
        )}
      </Dropzone>
    </Box>
  );
};

export default PostDropzone;
