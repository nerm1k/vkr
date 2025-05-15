import { useEffect, useRef, useState } from "react";
import styles from './ImageWithPredictions.module.scss';
import { useMutation } from "@tanstack/react-query";
import Rate from "../Rate/Rate";
import PublishThePrediction from "../PublishThePrediction/PublishThePrediction";

interface Props {
    imageSrc: string,
    predictions:  Array<{
        x: number,
        y: number,
        width: number,
        height: number,
        class: string,
        class_id: number,
        confidence: number,
        detection_id: string
    }>,
    modelId: number,
    isAuthenticated: boolean,
    authenticatedUser: {
      id: number,
      username: string
    },
    confidence: number,
    overlap: number,
    selectedFile?: File
}

interface ModelPredictionResponse {
  modelId: number,
  modelPredictionId: number
}

const ImageWithPredictions = ({ imageSrc, selectedFile, predictions, modelId, isAuthenticated, authenticatedUser, confidence, overlap }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [imgurLink, setImgurLink] = useState<string | null>(null);
    const [modelPredictionResponse, setModelPredictionResponse] = useState<ModelPredictionResponse>();

    const containersWithTrash = predictions.filter((pred) => pred.class_id === 0);
    const containersWithoutTrash = predictions.filter((pred) => pred.class_id === 1);
    const averageConfidence = predictions.reduce((acc, pred) => acc + pred.confidence, 0) / predictions.length;

    const { mutate } = useMutation({
        mutationFn: async (base64Image: string) => {
            const formData = new FormData();
            formData.append('image', base64Image);
            formData.append('type', 'base64');
            formData.append('title', 'Simple upload');
            formData.append('description', 'This is a simple image upload in Imgur');
            const response = await fetch('https://api.imgur.com/3/image', {
              method: 'POST',
              headers: {
                  Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`,
              },
              body: formData,
            });

            const result = await response.json();
            if (!result.success) {
                throw new Error('Imgur upload failed');
            }
            return result.data.link;
        },
        onSuccess: async (link) => {
            setImgurLink(link);
            console.log('Image uploaded to Imgur:', link);
            console.log(modelId, isAuthenticated ? authenticatedUser.id : null, link, confidence, overlap, averageConfidence, containersWithTrash.length, containersWithoutTrash.length, false);
            try {
              const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/models-predictions`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    modelId,
                    userId: isAuthenticated ? authenticatedUser.id : null,
                    imageLink: link,
                    confidence,
                    overlap,
                    averageConfidence,
                    amountFullContainers: containersWithTrash.length,
                    amountNotFullContainers: containersWithoutTrash.length,
                    isPublic: false
                  })
              });

              if (res.status === 201) {
                const modelPredictionResponse: ModelPredictionResponse = await res.json();
                setModelPredictionResponse(modelPredictionResponse)
                console.log('+');
              } else {
                console.log('error serverr');
              }
            } catch (error) {
              console.log('error na servere', error);
            }
        },
        onError: (error) => {
            console.error('Error uploading to Imgur:', error);
        },
    });

    useEffect(() => {
      console.log(predictions);
      const canvas = canvasRef.current;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
  
      img.onload = () => {
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
  
            predictions.forEach((pred) => {
                if (pred.class_id === 0) {
                    ctx.strokeStyle = '#ff0000';
                    
                } else {
                    ctx.strokeStyle = '#009e0d';
                }

              ctx.lineWidth = 5;
              
              if (pred.class_id === 0) {
                ctx.fillStyle = 'red';         
              } else {
                ctx.fillStyle = 'green';
              }

              ctx.font = '24px Arial';
              if (modelId == 1 || modelId == 2 || modelId == 3 || modelId == 4) {
                ctx.strokeRect(pred.x - pred.width / 2, pred.y - pred.height / 2, pred.width, pred.height);
                ctx.fillText(`${pred.class} (${(pred.confidence * 100).toFixed(2)}%)`, pred.x - pred.width / 2, pred.y - pred.height / 2 - 10);
              } else {
                ctx.strokeRect(pred.x, pred.y, pred.width, pred.height);
                ctx.fillText(`${pred.class} (${(pred.confidence * 100).toFixed(2)}%)`, pred.x, pred.y - 10);
              }
            });
  
            setIsCanvasReady(true);
          }
        }
      };
    }, [imageSrc, predictions]);
  
    useEffect(() => {
      if (isCanvasReady && canvasRef.current && !imgurLink) {
          const dataURL = canvasRef.current.toDataURL('image/png');
          const base64Image = dataURL.split(',')[1];
          console.log(dataURL)
          mutate(base64Image);
      }
    }, [isCanvasReady, mutate, imgurLink]);

    

    return (
      <div className={styles.predictions}>
        <p className={styles['predictions__with-trash']}>Красный - контейнер с мусором</p>
        <p className={styles['predictions__without-trash']}>Зеленый - контейнер без мусора</p>
        <canvas className={styles.predictions__canvas} ref={canvasRef} style={{ maxWidth: '100%' }} />
        <p className={styles.predictions__amount}>Количество контейнеров <span className={styles.bold}>с</span> мусором: <span className={styles.bold}>{containersWithTrash.length}</span></p>
        <p className={styles.predictions__amount}>Количество контейнеров <span className={styles.bold}>без</span> мусора: <span className={styles.bold}>{containersWithoutTrash.length}</span></p>
        {isAuthenticated && (
          <div className={styles.predictions__rate}>
              <Rate modelId={modelId}/>
              <PublishThePrediction modelPredictionId={modelPredictionResponse?.modelPredictionId}/>
          </div>
        )}
      </div>
    );
};

export default ImageWithPredictions;