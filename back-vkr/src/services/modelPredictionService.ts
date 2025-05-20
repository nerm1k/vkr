import ModelPredictionModel from "../models/modelPredictionModel";
import { spawn } from "child_process";
import { error } from "console";
import fs from "fs";
import path from "path";

export default class ModelPredictionService {
    modelPredictionModel: ModelPredictionModel;

    constructor(modelPredictionModel: ModelPredictionModel) {
        this.modelPredictionModel = modelPredictionModel;
    }

    async getAllModelsPredictions() {
        const modelsPredictions = await this.modelPredictionModel.getAllModelsPredictions();
        return modelsPredictions;
    }

    async getAllPublicModelsPredictions() {
        const publicModelsPredictions = await this.modelPredictionModel.getAllPublicModelsPredictions();
        return publicModelsPredictions;
    }

    async getAllPublicModelsPredictionsByPage(page: number) {
        const offset = page * 10 - 10;
        const publicModelsPredictions = await this.modelPredictionModel.getAllPublicModelsPredictionsByPage(offset);
        return publicModelsPredictions;
    }

    async getAllModelsPredictionsByUsername(username: string) {
        const modelsPredictions = await this.modelPredictionModel.getAllModelsPredictionsByUsername(username);
        return modelsPredictions;
    }

    async createModelPrediction(modelId: number, userId: number | null, imageLink: string, confidence: number | null, overlap: number | null, averageConfidence: number | null, amountFullContainers: number, amountNotFullContainers: number, isPublic: boolean) {
        const modelPrediction = await this.modelPredictionModel.createModelPrediction(modelId, userId, imageLink, confidence, overlap, averageConfidence, amountFullContainers, amountNotFullContainers, isPublic);
        return modelPrediction;
    }

    async publishModelPredictionById(modelPredictionId: number) {
        const isUpdated = await this.modelPredictionModel.publishModelPredictionById(modelPredictionId);
        return isUpdated;
    }

    async predictInternalModel(modelName: string, confidence: string, imagePath: string) {
        console.log(modelName);
        const absoluteImagePath = path.resolve(imagePath);

        return new Promise((resolve, reject) => {
            let pythonProcess;
            if (modelName == 'fasterrcnn') {
                pythonProcess = spawn('../python/detectron2_env/Scripts/python.exe', ['../python/fasterRCNN.py', absoluteImagePath, confidence]);
            } else if (modelName == 'retinanet') {
                pythonProcess = spawn('../python/detectron2_env/Scripts/python.exe', ['../python/retinanet.py', absoluteImagePath, confidence]);
            }

            if (pythonProcess) { 
                let stdoutData = '';
                let stderrData = '';

                pythonProcess.stdout.on('data', (data) => stdoutData += data.toString());
                pythonProcess.stderr.on('data', (data) => stderrData += data.toString());

                pythonProcess.on('close', (code) => {
                    try {
                        fs.unlinkSync(imagePath);

                        if (code !== 0) {
                            console.error(`Python process exited with code ${code}: ${stderrData}`);
                            reject(error);
                            return;
                        } 

                        const prediction = JSON.parse(stdoutData);
                        resolve(prediction);
                        
                    } catch (error) {
                        console.error(`Error: ${error}`);
                        reject(error);
                    }
                    
                });
            } else {
                return;
            }
            
        })
    }
}