import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('models_predictions', (table) => {
        table.increments('model_prediction_id').primary();
        table.integer('model_id').notNullable();
        table.integer('user_id').nullable();
        table.string('image_link', 32).notNullable();
        table.integer('confidence').nullable();
        table.integer('overlap').nullable();
        table.float('average_confidence', 3, 1).nullable();
        table.integer('amount_full_containers').notNullable();
        table.integer('amount_not_full_containers').notNullable();
        table.boolean('is_public').notNullable();
        table.timestamps(true, true);

        table.foreign('model_id').references('model_id').inTable('models');
        table.foreign('user_id').references('user_id').inTable('users');

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('models_predictions');
}

