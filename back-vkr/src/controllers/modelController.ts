import { Request, Response } from "express";
import ModelService from "../services/modelService";
import { HttpStatusCode } from "../utils/enums";

export default class ModelController {
    modelService: ModelService;

    constructor(modelService: ModelService) {
        this.modelService = modelService;
    }

    getAllModels = async (req: Request, res: Response) => {
        try {
            const models = await this.modelService.getAllModels();
            res.status(HttpStatusCode.OK).json(models);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    };

    rateModelByModelId = async (req: Request, res: Response) => {
        try {
            const modelId  = req.params.modelId;
            const { rate } = req.body;
            const isUpdated = await this.modelService.rateModelByModelId(+modelId, rate);
            if (isUpdated) {
                res.status(HttpStatusCode.NO_CONTENT).json({message: '+'});
            } else {
                res.status(HttpStatusCode.BAD_REQUEST).json({message: 'Error'});
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    }
}