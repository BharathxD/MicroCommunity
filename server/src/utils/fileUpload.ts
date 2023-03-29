import multer from "multer";

//? Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dest = "public/assets";
    callback(null, dest);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

//? Create multer instance with storage options
const upload = multer({ storage });

export default upload;
