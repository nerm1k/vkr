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

    async createModelPrediction(modelId: number, userId: number | null, imageLink: string, confidence: number | null, overlap: number | null, averageConfidence: number | null, amountFullContainers: number, amountNotFullContainers: number, isPublic: boolean) {
        const modelPrediction = await this.modelPredictionModel.createModelPrediction(modelId, userId, imageLink, confidence, overlap, averageConfidence, amountFullContainers, amountNotFullContainers, isPublic);
        return modelPrediction;
    }
}