import express from "express";
import { login, register, users } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middelware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});
export default router;
