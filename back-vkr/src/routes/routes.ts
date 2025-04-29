import express, { Router } from "express";
import ModelController from "../controllers/modelController";
import ModelPredictionController from "../controllers/modelPredictionController";
export const routes = (modelController: ModelController, modelPredictionController: ModelPredictionController): Router => {
    const router = express.Router();

    router.get('/api/v1/models', modelController.getAllModels);
    router.put('/api/v1/models/:modelId/rate', modelController.rateModelByModelId);

    router.post('/api/v1/models-predictions', modelPredictionController.createModelPrediction);

    return router;
}