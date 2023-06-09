import FlexBetween from "@/components/UI/FlexBetween";
import { EditOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import Dropzone, { Accept } from "react-dropzone";

type Props = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  pictureName: string;
};

const DropzoneComponent = ({ setFieldValue, pictureName }: Props) => {
  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  };

  const palette = useTheme().palette;
  return (
    <Box
      gridColumn="span 4"
      border={`1px solid ${palette.neutral.medium}`}
      borderRadius="5px"
      p="1rem"
    >
      <Dropzone
        multiple={false}
        accept={acceptedFileTypes}
        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            border={`2px dashed ${palette.primary.main}`}
            p="1rem"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <input {...getInputProps()} />
            {!pictureName ? (
              <Typography color={palette.neutral.main}>
                Add a Profile Picture
              </Typography>
            ) : (
              <FlexBetween>
                <Typography color={palette.neutral.main}>
                  {pictureName}
                </Typography>
                <EditOutlined sx={{ color: palette.neutral.main }} />
              </FlexBetween>
            )}
          </Box>
        )}
      </Dropzone>
    </Box>
  );
};

export default DropzoneComponent;
