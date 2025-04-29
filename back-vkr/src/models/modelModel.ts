import knex from "knex";

const pool = knex(require('../../knexfile'));

export default class ModelModel {
    async getAllModels() {
        const models = await pool('models').select('*');
        return models;
    }

    async rateModelByModelId(modelId: number, rate: 'like' | 'dislike') {
        if (rate == 'like') {
            await pool('models')
                .where('model_id', '=', modelId)
                .increment('amount_likes', 1);
        } else {
            await pool('models')
                .where('model_id', '=', modelId)
                .increment('amount_dislikes', 1);
        }

        return true;
    }
}