import knex from "knex";

const pool = knex(require('../../knexfile'));

export default class ModelModel {
    async getAllModels() {
        const models = await pool('models').select('*');
        return models;
    }
}