// routes/user.ts
import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user";
import { verifyJWT } from "../middleware/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
