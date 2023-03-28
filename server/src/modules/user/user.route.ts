import { Router } from "express";
import { registerUser } from "./user.controller";
import upload from "../../utils/fileUpload";

const router = Router();

router.post("/", upload.single("picture"), registerUser);

export default router;
