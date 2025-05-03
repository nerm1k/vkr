import { useParams } from 'react-router-dom';
import styles from './UserPage.module.scss';
import { useQuery } from '@tanstack/react-query';
import { ModelPrediction } from '../FeedPage/FeedPage';
import ModelPredictionCard from '../../components/ModelPredictionCard/ModelPredictionCard';

const UserPage = () => {
    const {username} = useParams();
    
    const {data} = useQuery<ModelPrediction[]>({
        queryKey: ['models_predictions'],
        queryFn: () => fetch(`${import.meta.env.VITE_BACKEND_API}/users/${username}/models-predictions`).then(res => res.json()),
        initialData: []
    });

    console.log(data);

    return(
        <>
            <div className={styles.user}>
                Публикации пользователя <span className={styles.bold}>{username}</span>
            </div>
            <div className={styles.container}>
                {data.map(pred => (
                    <ModelPredictionCard key={pred.modelPredictionId} prediction={pred} hasLink={false}/>
                ))}
            </div>
        </>
    )
}

export default UserPage;