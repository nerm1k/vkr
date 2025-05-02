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
    createdAt: Date,
    updatedAt: Date
}

export default class ModelPredictionModel {
    async getAllModelsPredictions() {
        const modelsPredictions = await pool('models_predictions').select('*');
        return modelsPredictions;
    }

    async getAllPublicModelsPredictions() {
        const publicModelPredictions: ModelPrediction[] = await pool('models_predictions')
                                                                .select('model_prediction_id as modelPredictionId',
                                                                    'model_id as modelId',
                                                                    'models_predictions.user_id as userId',
                                                                    'image_link as imageLink',
                                                                    'confidence',
                                                                    'overlap',
                                                                    'average_confidence as averageConfidence',
                                                                    'amount_full_containers as amountFullContainers',
                                                                    'amount_not_full_containers as amountNotFullContainers',
                                                                    'is_public as isPublic',
                                                                    'models_predictions.created_at as createdAt',
                                                                    'models_predictions.updated_at as updatedAt',
                                                                    'username'
                                                                )
                                                                .where('is_public', '=', true)
                                                                .leftJoin('users', 'models_predictions.user_id', 'users.user_id')
                                                                .orderBy('models_predictions.created_at', 'desc');
        return publicModelPredictions;
    }

    async getAllModelsPredictionsByUserId(userId: number) {
        const modelsPredictions: ModelPrediction[] = await pool('models_predictions')
                                                            .select('model_prediction_id as modelPredictionId',
                                                                'model_id as modelId',
                                                                'models_predictions.user_id as userId',
                                                                'image_link as imageLink',
                                                                'confidence',
                                                                'overlap',
                                                                'average_confidence as averageConfidence',
                                                                'amount_full_containers as amountFullContainers',
                                                                'amount_not_full_containers as amountNotFullContainers',
                                                                'is_public as isPublic',
                                                                'models_predictions.created_at as createdAt',
                                                                'models_predictions.updated_at as updatedAt',
                                                                'username'
                                                            )
                                                            .where('models_predictions.user_id', '=', userId)
                                                            .where('is_public', '=', true)
                                                            .leftJoin('users', 'models_predictions.user_id', 'users.user_id')
                                                            .orderBy('models_predictions.created_at', 'desc');
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