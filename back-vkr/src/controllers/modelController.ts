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
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error });
        }
    };
}