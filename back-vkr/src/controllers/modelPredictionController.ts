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
            if (req.query.page) {
                const page = req.query.page;
                const publicModelsPredictions = await this.modelPredictionService.getAllPublicModelsPredictionsByPage(+page);
                res.status(HttpStatusCode.OK).json(publicModelsPredictions);
            } else {
                const publicModelsPredictions = await this.modelPredictionService.getAllPublicModelsPredictions();
                res.status(HttpStatusCode.OK).json(publicModelsPredictions);
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    }

    getAllModelsPredictionsByUsername = async (req: Request, res: Response) => {
        try {
            const username  = req.params.username;
            const modelsPredictions = await this.modelPredictionService.getAllModelsPredictionsByUsername(username);
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

    predictInternalModel = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                res.status(HttpStatusCode.BAD_REQUEST).json({message: 'Bad Request'});
                return;
            }
            const confidence = req.query.confidence ? Number(req.query.confidence) / 100 : 0.5;
            const imagePath = req.file.path;

            const modelName = req.path.split('/').pop();
            const prediction = await this.modelPredictionService.predictInternalModel(modelName || 'fasterrcnn', confidence.toString(), imagePath);

            if (prediction == undefined) {
                res.status(HttpStatusCode.BAD_REQUEST).json({message: 'Error'});
            } else {
                res.status(HttpStatusCode.OK).json(prediction);
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error})
        }
    }
}