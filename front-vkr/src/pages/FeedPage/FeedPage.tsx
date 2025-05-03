import { useQuery } from '@tanstack/react-query';
import styles from './FeedPage.module.scss';
import ModelPredictionCard from '../../components/ModelPredictionCard/ModelPredictionCard';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

export interface ModelPrediction {
    modelPredictionId: number,
    modelId: number, 
    userId: number,
    imageLink: string,
    confidence: number,
    overlap: number,
    averageConfidence: number,
    amountFullContainers: number,
    amountNotFullContainers: number,
    isPublic: boolean,
    createdAt: Date,
    updatedAt: Date,
    username: string,
    model: string
}

const FeedPage = () => {
    const {isAuthenticated, authenticatedUser} = useIsAuthenticated();

    const {data} = useQuery<ModelPrediction[]>({
        queryKey: ['models_predictions'],
        queryFn: () => fetch(`${import.meta.env.VITE_BACKEND_API}/models-predictions/public`).then(res => res.json()),
        initialData: []
    });

    console.log(data);

    return (
        <div className={styles.container}>
            {data.map(pred => (
                <ModelPredictionCard key={pred.modelPredictionId} prediction={pred} hasLink={true}/>
            ))}
        </div>
    )
}

export default FeedPage;