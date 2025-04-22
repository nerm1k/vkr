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
}