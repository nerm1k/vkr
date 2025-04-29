import { Request, Response } from "express";
import ModelPredictionService from "../services/modelPredictionService";
import { HttpStatusCode } from "../utils/enums";

export default class ModelPredictionController {
    modelPredictionService: ModelPredictionService;

    constructor(modelPredictionService: ModelPredictionService) {
        this.modelPredictionService = modelPredictionService;
    }

    getAllModelsPredictions = async (req: Request, res: Response) => {
        try {
            const modelsPredictions = await this.modelPredictionService.getAllModelsPredictions();
            res.status(HttpStatusCode.OK).json(modelsPredictions);
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    };

    createModelPrediction = async (req: Request, res: Response) => {
        try {
            const { modelId, userId, imageLink, confidence, overlap, averageConfidence, amountFullContainers, amountNotFullContainers, isPublic } = req.body;
            const modelPrediction = await this.modelPredictionService.createModelPrediction(modelId, userId, imageLink, confidence, overlap, averageConfidence, amountFullContainers, amountNotFullContainers, isPublic);
            if (modelPrediction) {
                res.status(HttpStatusCode.CREATED).json(modelPrediction);
            } else {
                res.status(HttpStatusCode.BAD_REQUEST).json({message: 'Bad Request'});
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error})
        }
    }
}