import express, { Request, Response } from "express";
import * as authController from "../controllers/auth-controller";
const authRoute = express.Router();

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);
export default authRoute;
