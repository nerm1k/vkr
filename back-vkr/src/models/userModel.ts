import knex from "knex";

const pool = knex(require('../../knexfile'));

interface User {
    user_id: number,
    username: string,
    password: string,
    email: string,
    created_at: Date,
    updated_at: Date
}

export default class UserModel {
    async createUser(username: string, email: string, password: string) {
        const user: User[] = await pool('users')
                                .insert({username: username, email: email, password: password})
                                .returning(['username', 'password']);

        return user[0];
    }

    async findUserByAttribute(attr: string, value: string | number) {
        const user: User[] = await pool('users')
                            .select()
                            .where(attr, '=', value);

        return user[0];
    }
}