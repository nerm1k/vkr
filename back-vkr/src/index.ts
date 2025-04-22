import express, { Express } from "express";
import cors from 'cors';
import "dotenv/config.js";
import { routes } from "./routes/routes";
import bodyParser from "body-parser";
import ModelModel from "./models/modelModel";
import ModelService from "./services/modelService";
import ModelController from "./controllers/modelController";

const app: Express = express();

const modelModel: ModelModel = new ModelModel();
const modelService: ModelService = new ModelService(modelModel);
const modelController: ModelController = new ModelController(modelService);

const corsOptions = {
  origin: "*",
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes(modelController));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});