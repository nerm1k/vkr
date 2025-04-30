import { useState } from "react";
import ButtonInput from "../ButtonInput/ButtonInput";
import axios from "axios";
import styles from './PublishThePrediction.module.scss';

interface Props {
    modelPredictionId: number | undefined
}

const PublishThePrediction = ({modelPredictionId}: Props) => {
    const [isPublic, setIsPublic] = useState<boolean>(false);

    const shareThePrediction =  () => {
        if (!isPublic) {
            const publish = async () => {
                try {
                    const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/models-predictions/${modelPredictionId}/public`);
                    if (res.status == 204) {
                        setIsPublic(true);
                    }
                } catch (error) {
                    console.log('error publish', error);
                }
            }
    
            publish();
        }
    }

    return (
        <>
            {isPublic ? (
                <p className={styles.public}>Опубликовано</p>
            ) : (
                <ButtonInput onClick={shareThePrediction} text='Опубликовать' />
            ) 
            }
        </>
    )
}

export default PublishThePrediction;