import express from "express";
import {
  createUrl,
  deleteUrl,
  getAllUrl,
  getUrl,
} from "../controllers/shortUrl";
import { verifyJWT } from "../middleware/auth";

const router = express.Router();

router.post("/shortUrl", verifyJWT, createUrl);
router.get("/shortUrl", verifyJWT, getAllUrl);
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", verifyJWT, deleteUrl);

export default router;
