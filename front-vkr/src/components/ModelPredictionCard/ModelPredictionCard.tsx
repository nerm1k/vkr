import { Link } from 'react-router-dom';
import { ModelPrediction } from '../../pages/FeedPage/FeedPage';
import { formatDate } from '../../utils/functions';
import styles from './ModelPredictionCard.module.scss';

interface Props {
    prediction: ModelPrediction,
    hasLink: boolean
}

const ModelPredictionCard = ({prediction, hasLink}: Props) => {
    return(
        <div className={styles.prediction}>
            <div className={styles.prediction__item}>
                {hasLink ? (
                    <Link to={`/user/${prediction.username.toLowerCase()}`} className={styles.link}>
                        {prediction.username}
                    </Link>  
                ) : <span className={styles.bold}>{prediction.username}</span>
                }
                , {formatDate(prediction.createdAt)}
            </div>
            {prediction.imageLink ? (
                <div className={styles.prediction__image}>
                    <img src={prediction.imageLink} alt='Изображение предсказанных классов' referrerPolicy="no-referrer"/>
                </div>
            ) : (
                <div className={styles.prediction__image}>
                    <img src='/images/placeholder.png' alt='Плейсхолдер'/>
                </div>
            )}
            
            {prediction.model && (
                <div className={styles.prediction__item}>
                    Модель: <span className={styles.bold}>{prediction.model}</span>
                </div>
            )}
            {typeof prediction.confidence  === 'number' && (
                <div className={styles.prediction__item}>
                    Уверенность: <span className={styles.bold}>{prediction.confidence}</span>
                </div>
            )}
            {(prediction.modelId != 6 && prediction.modelId != 5) && 
                (typeof prediction.overlap  === 'number'&& (
                <div className={styles.prediction__item}>
                    Перекрытие: <span className={styles.bold}>{prediction.overlap}</span>
                </div>
                )
            )}

            {typeof prediction.amountFullContainers === 'number' && (
                <div className={styles.prediction__item}>
                    Полных контейнеров: <span className={styles.bold}>{prediction.amountFullContainers}</span>
                </div>
            )}
            {typeof prediction.amountNotFullContainers === 'number' && (
                <div className={styles.prediction__item}>
                    Неполных контейнеров: <span className={styles.bold}>{prediction.amountNotFullContainers}</span>
                </div>
            )}
            {typeof prediction.averageConfidence === 'number' && (
                <div className={styles.prediction__item}>
                    Средняя уверенность модели: <span className={styles.bold}>{prediction.averageConfidence.toFixed(2)}</span>
                </div>
            )}
        </div>
    )
}

export default ModelPredictionCard;