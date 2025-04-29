import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('username', 32).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('email', 64).unique().notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .dropTableIfExists('users');
}

