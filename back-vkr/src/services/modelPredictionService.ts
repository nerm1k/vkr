import ModelPredictionModel from "../models/modelPredictionModel";

export default class ModelPredictionService {
    modelPredictionModel: ModelPredictionModel;

    constructor(modelPredictionModel: ModelPredictionModel) {
        this.modelPredictionModel = modelPredictionModel;
    }

    async getAllModelsPredictions() {
        const modelsPredictions = await this.modelPredictionModel.getAllModelsPredictions();
        return modelsPredictions;
    }

    async getAllPublicModelsPredictions() {
        const publicModelsPredictions = await this.modelPredictionModel.getAllPublicModelsPredictions();
        return publicModelsPredictions;
    }

    async getAllPublicModelsPredictionsByPage(page: number) {
        const offset = page * 10 - 10;
        const publicModelsPredictions = await this.modelPredictionModel.getAllPublicModelsPredictionsByPage(offset);
        return publicModelsPredictions;
    }

    async getAllModelsPredictionsByUsername(username: string) {
        const modelsPredictions = await this.modelPredictionModel.getAllModelsPredictionsByUsername(username);
        return modelsPredictions;
    }

    async createModelPrediction(modelId: number, userId: number | null, imageLink: string, confidence: number | null, overlap: number | null, averageConfidence: number | null, amountFullContainers: number, amountNotFullContainers: number, isPublic: boolean) {
        const modelPrediction = await this.modelPredictionModel.createModelPrediction(modelId, userId, imageLink, confidence, overlap, averageConfidence, amountFullContainers, amountNotFullContainers, isPublic);
        return modelPrediction;
    }

    async publicModelPredictionById(modelPredictionId: number) {
        const isUpdated = await this.modelPredictionModel.publicModelPredictionById(modelPredictionId);
        return isUpdated;
    }
}