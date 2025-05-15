import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("models")
        .where({ model_id: 1 })
        .update({ url: "https://detect.roboflow.com/trash-containers/3" });

    await knex("models")
        .where({ model_id: 2 })
        .update({ url: "https://detect.roboflow.com/trash-containers/4" });

    await knex("models").insert([
        { 
            model_id: 3, 
            name: "RF-DETR" ,
            description: "Ращ два три четрые пять шесть восеьм денят Описан3 43 ва в554 5апав рпа55 4 Описание модели",
            url: "https://detect.roboflow.com/trash-containers/5",
            amount_likes: 0,
            amount_dislikes: 0 
        },
        { 
            model_id: 4, 
            name: "YOLO-NAS" ,
            description: "Ращ два три четрые пять шесть восеьм денят Описан3 43 ва в554 5апав рпа55 4 Описание модели",
            url: "https://detect.roboflow.com/trash-containers/6",
            amount_likes: 0,
            amount_dislikes: 0 
        },
        { 
            model_id: 5, 
            name: "Faster R-CNN" ,
            description: "Ращ два три четрые пять шесть восеьм денят Описан3 43 ва в554 5апав рпа55 4 Описание модели",
            url: "http://localhost:3000/api/v1/models/fasterrcnn",
            amount_likes: 0,
            amount_dislikes: 0 
        }
    ]);
};