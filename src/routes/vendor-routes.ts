import express, { Request, Response } from "express";
import * as vendorController from "../controllers/vendor-controller";
import { authentication } from "../middlewares/authentication";
const vendorRoute = express.Router();

vendorRoute.post("/register", authentication, vendorController.register);
export default vendorRoute;
