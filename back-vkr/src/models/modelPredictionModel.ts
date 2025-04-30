import knex from "knex";

const pool = knex(require('../../knexfile'));

interface ModelPrediction {
    modelPredictionId: number,
    modelId: number, 
    userId: number,
    imageLink: string,
    confidence: number,
    overlap: number,
    averageConfidence: number,
    amountFullContainers: number,
    amountNotFullContainers: number,
    isPublic: boolean,
    createdAt: string,
    updatedAt: string
}

export default class ModelPredictionModel {
    async getAllModelsPredictions() {
        const modelsPredictions = await pool('models_predictions').select('*');
        return modelsPredictions;
    }

    async createModelPrediction(modelId: number, userId: number | null, imageLink: string, confidence: number | null, overlap: number | null, averageConfidence: number | null, amountFullContainers: number, amountNotFullContainers: number, isPublic: boolean) {
        const modelPrediction = await pool('models_predictions')
                                                .insert({model_id: modelId,
                                                        user_id: userId,
                                                        image_link: imageLink,
                                                        confidence,
                                                        overlap,
                                                        average_confidence: averageConfidence,
                                                        amount_full_containers: amountFullContainers,
                                                        amount_not_full_containers: amountNotFullContainers,
                                                        is_public: isPublic
                                                })
                                                .returning(['model_prediction_id as modelPredictionId', 'model_id as modelId']);

        return modelPrediction[0];
    }

    async publicModelPredictionById(modelPredictionId: number) {
        await pool('models_predictions')
            .where('model_prediction_id', '=', modelPredictionId)
            .update({ is_public: true })

        return true;
    }
}