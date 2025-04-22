import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('models', (table) => {
        table.increments('id').primary();
        table.string('name', 64).notNullable();
        table.string('description', 256).notNullable();
        table.string('url').notNullable();
        table.integer('amount_likes');
        table.integer('amount_dislikes');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('models');
}

