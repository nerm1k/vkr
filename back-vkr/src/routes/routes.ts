import express, { Router } from "express";
import ModelController from "../controllers/modelController";
export const routes = (modelController: ModelController): Router => {
    const router = express.Router();

    router.get('/api/v1/models', modelController.getAllModels);

    return router;
}