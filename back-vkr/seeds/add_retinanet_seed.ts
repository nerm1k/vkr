import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("models").insert([
        { 
            model_id: 6, 
            name: "RetinaNet" ,
            description: "Ращ два три четрые пять шесть восеьм денят Описан3 43 ва в554 5апав рпа55 4 Описание модели",
            url: "http://localhost:3000/api/v1/models-predictions/retinanet",
            amount_likes: 0,
            amount_dislikes: 0 
        }
    ]);
};
