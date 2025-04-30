import express, { Express } from "express";
import cors from 'cors';
import "dotenv/config.js";
import { routes } from "./routes/routes";
import bodyParser from "body-parser";
import ModelModel from "./models/modelModel";
import ModelService from "./services/modelService";
import ModelController from "./controllers/modelController";
import ModelPredictionModel from "./models/modelPredictionModel";
import ModelPredictionService from "./services/modelPredictionService";
import ModelPredictionController from "./controllers/modelPredictionController";
import UserModel from "./models/userModel";
import UserService from "./services/userService";
import UserController from "./controllers/userController";

const app: Express = express();

const modelModel: ModelModel = new ModelModel();
const modelService: ModelService = new ModelService(modelModel);
const modelController: ModelController = new ModelController(modelService);

const modelPredictionModel: ModelPredictionModel = new ModelPredictionModel();
const modelPredictionService: ModelPredictionService = new ModelPredictionService(modelPredictionModel);
const modelPredictionController: ModelPredictionController = new ModelPredictionController(modelPredictionService);

const userModel: UserModel = new UserModel();
const userService: UserService = new UserService(userModel);
const userController: UserController = new UserController(userService);

const corsOptions = {
  origin: "*",
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes(modelController, modelPredictionController, userController));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});