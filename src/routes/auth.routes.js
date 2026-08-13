import express from "express";
import { login, register, users } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middelware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
const router = express.Router();
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/users", users);
export default router;
