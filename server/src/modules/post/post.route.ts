import express from "express";
import { createPostHandler } from "./post.controller";

const router = express.Router();

router.get("/", createPostHandler);

export default router;
