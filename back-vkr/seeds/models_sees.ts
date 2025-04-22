import { url } from "inspector";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("models").del();

    // Inserts seed entries
    await knex("models").insert([
        { 
            id: 1, 
            name: "YOLOv11" ,
            description: "Описание модели Описание модели павп вававав павпав 334 43 43 ва в554 5апав рпа55 4 Описание модели",
            url: "https://detect.roboflow.com/garbage-and-trashes-meld8/2",
            amount_likes: 0,
            amount_dislikes: 0
        },
        { 
            id: 2, 
            name: "Roboflow 3.0" ,
            description: "Ращ два три четрые пять шесть восеьм денят Описан3 43 ва в554 5апав рпа55 4 Описание модели",
            url: "https://detect.roboflow.com/garbage-and-trashes-meld8/1",
            amount_likes: 0,
            amount_dislikes: 0 
        }
    ]);
};
