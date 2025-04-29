import ModelModel from "../models/modelModel";

export default class ModelService {
    modelModel: ModelModel;

    constructor(modelModel: ModelModel) {
        this.modelModel = modelModel;
    }

    async getAllModels() {
        const models = await this.modelModel.getAllModels();
        return models;
    }

    async rateModelByModelId(modelId: number, rate: 'like' | 'dislike') {
        const isUpdated = await this.modelModel.rateModelByModelId(modelId, rate);
        return isUpdated;
    }
}