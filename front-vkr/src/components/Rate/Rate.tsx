import { useState } from 'react';
import styles from './Rate.module.scss';
import { BiLike, BiDislike } from "react-icons/bi";
import axios from 'axios';


interface Props {
    modelId: number,
}

const Rate = ({modelId}: Props) => {
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [isRated, setIsRated] = useState(false);

    const handleLikeButton = () => {
        if (!isRated) {
            setIsLike(true);
            const rate = async () => {
                try {
                    const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/models/${modelId}/rate`, {
                        rate: 'like'
                    });
                    if (res.status == 204) {
                        setIsRated(true);
                    }
                } catch (error) {
                    console.log('error rate', error);
                }
            }
    
            rate();
        }
    }

    const handleDislikeButton = () => {
        if (!isRated) {
            setIsDislike(true);
            const rate = async () => {
                try {
                    const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/models/${modelId}/rate`, {
                        rate: 'dislike'
                    });
                    if (res.status == 204) {
                        setIsRated(true);
                    }
                } catch (error) {
                    console.log('error rate', error);
                }
            }
    
            rate();
        }
    }
    console.log(isRated)
    return (
        <div className={styles.rate}>
            <p className={styles.rate__text}>Оцените работу нейросети</p>
            <div>
                <button className={`${styles.rate__like} ${isLike && styles['rate__like--liked']}`} onClick={handleLikeButton} disabled={isDislike}><BiLike size='26px'/></button>
                <button className={`${styles.rate__dislike} ${isDislike && styles['rate__dislike--disliked']}`} onClick={handleDislikeButton} disabled={isLike}><BiDislike size='26px'/></button>
            </div> 
        </div>
    )
}

export default Rate;