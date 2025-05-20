import { useEffect, useState } from "react";
import ButtonInput from "../ButtonInput/ButtonInput";
import axios from "axios";
import styles from './PublishThePrediction.module.scss';

interface Props {
    modelPredictionId: number | undefined
}

const PublishThePrediction = ({modelPredictionId}: Props) => {
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setIsError(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isError]);

    const shareThePrediction =  () => {
        if (!isPublic) {
            const publish = async () => {
                try {
                    const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/models-predictions/${modelPredictionId}/public`);
                    if (res.status == 204) {
                        setIsPublic(true);
                    }
                } catch (error) {
                    setIsError(true);
                    console.log('error publish', error);
                }
            }
    
            publish();
        }
    }

    if (isError) {
        return (
            <p className={styles.error}>Невозможно опубликовать в данный момент.</p>
        )
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