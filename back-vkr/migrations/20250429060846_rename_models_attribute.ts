import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('models', (table) => {
        table.renameColumn('id', 'model_id');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('models', (table) => {
        table.renameColumn('model_id', 'id');
    });
}