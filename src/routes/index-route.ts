import express, { Request, Response } from "express";
import authRoute from "./auth-routes";
import vendorRoute from "./vendor-routes";
import catalogRoute from "./catalog-routes";

const indexRoute = express.Router();

indexRoute.use("/auth", authRoute);
indexRoute.use("/vendor", vendorRoute);
indexRoute.use("/catalog", catalogRoute);
export default indexRoute;
