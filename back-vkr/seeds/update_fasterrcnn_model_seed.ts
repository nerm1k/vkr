import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("models")
        .where({ model_id: 5 })
        .update({ url: "http://localhost:3000/api/v1/models-predictions/fasterrcnn" });
};