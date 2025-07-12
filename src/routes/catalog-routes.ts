import express, { Request, Response } from "express";
import * as catalogController from "../controllers/catalog-controller";
import { authentication } from "../middlewares/authentication";
const catalogRoute = express.Router();

catalogRoute.get("/", authentication, catalogController.showAllCatalog);
catalogRoute.get("/:id", authentication, catalogController.showCatalogbyId);
catalogRoute.post("/", authentication, catalogController.addCatalog);
catalogRoute.put("/:id", authentication, catalogController.updateCatalog);
catalogRoute.delete("/:id", authentication, catalogController.deleteCatalog);
export default catalogRoute;
