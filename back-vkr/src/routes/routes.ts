import express, { Router } from "express";
import ModelController from "../controllers/modelController";
import ModelPredictionController from "../controllers/modelPredictionController";
import UserController from "../controllers/userController";
import { uploadImage } from "../multer";

export const routes = (modelController: ModelController, modelPredictionController: ModelPredictionController, userController: UserController): Router => {
    const router = express.Router();

    router.post('/api/v1/register', userController.registerUser);
    router.post('/api/v1/login', userController.loginUser);
    router.get('/api/v1/logout', userController.logout);

    router.get('/api/v1/models', modelController.getAllModels);
    router.put('/api/v1/models/:modelId/rate', modelController.rateModelByModelId);

    router.get('/api/v1/models-predictions', modelPredictionController.getAllPublicModelPredictions);
    router.get('/api/v1/users/:username/models-predictions', modelPredictionController.getAllModelsPredictionsByUsername);
    router.post('/api/v1/models-predictions', modelPredictionController.createModelPrediction);
    router.put('/api/v1/models-predictions/:modelPredictionId/public', modelPredictionController.publicModelPredictionById);

    router.post('/api/v1/models-predictions/fasterrcnn', uploadImage, modelPredictionController.predictFasterRCNN);


    return router;
}