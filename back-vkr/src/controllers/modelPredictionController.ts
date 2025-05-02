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

    getAllPublicModelPredictions = async (req: Request, res: Response) => {
        try {
            const publicModelsPredictions = await this.modelPredictionService.getAllPublicModelsPredictions();
            res.status(HttpStatusCode.OK).json(publicModelsPredictions);
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    }

    getAllModelsPredictionsByUserId = async (req: Request, res: Response) => {
        try {
            const userId  = req.params.userId;
            const modelsPredictions = await this.modelPredictionService.getAllModelsPredictionsByUserId(+userId);
            res.status(HttpStatusCode.OK).json(modelsPredictions);
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    }
    
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

    publicModelPredictionById = async (req: Request, res: Response) => {
        try {
            const modelPredictionId  = req.params.modelPredictionId;
            console.log(modelPredictionId)
            const isUpdated = await this.modelPredictionService.publicModelPredictionById(+modelPredictionId);
            if (isUpdated) {
                res.status(HttpStatusCode.NO_CONTENT).json({message: '+'});
            } else {
                res.status(HttpStatusCode.BAD_REQUEST).json({message: 'Error'});
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error})
        }
    }
}