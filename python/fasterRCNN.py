import cv2
import torch
import json
import uuid
import sys
import os
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2.data import MetadataCatalog
from detectron2 import model_zoo

def detect_objects(image_path, confidence_threshold):
    # Настройка конфигурации
    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))
    # Use absolute path to model weights
    cfg.MODEL.WEIGHTS = os.path.join(os.path.dirname(__file__), "model_final.pth")
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = 2  # 2 класса: full_container, not_full_container
    cfg.MODEL.MASK_ON = False
    cfg.MODEL.DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = confidence_threshold

    # Создание предиктора
    predictor = DefaultPredictor(cfg)

    # Загрузка тестового изображения
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Не удалось загрузить изображение: {image_path}")

    # Выполнение предсказания
    outputs = predictor(image)

    # Подготовка метаданных
    metadata = MetadataCatalog.get("temp_dataset")
    metadata.thing_classes = ["full_container", "not_full_container"]

    # Формирование результата в формате JSON
    result = []
    instances = outputs["instances"].to("cpu")
    for i in range(len(instances)):
        class_id = instances.pred_classes[i].item()
        bbox = instances.pred_boxes.tensor[i].numpy()
        detection = {
            "x": float(bbox[0]),  # Левый верхний угол x
            "y": float(bbox[1]),  # Левый верхний угол y
            "width": float(bbox[2] - bbox[0]),  # Ширина
            "height": float(bbox[3] - bbox[1]),  # Высота
            "class": metadata.thing_classes[class_id],
            "class_id": class_id,
            "confidence": float(instances.scores[i].item()),
            "detection_id": str(uuid.uuid4())  # Генерация уникального ID
        }
        result.append(detection)

    return result

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(json.dumps({"error": "Image path and confidence threshold arguments required"}))
        sys.exit(1)

    image_path = sys.argv[1]
    try:
        confidence_threshold = float(sys.argv[2])
        if not 0 <= confidence_threshold <= 1:
            raise ValueError("Confidence threshold must be between 0 and 1")
        result = detect_objects(image_path, confidence_threshold)
        print(json.dumps(result, indent=2))
    except ValueError as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)