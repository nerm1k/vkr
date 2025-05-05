import { useQuery } from '@tanstack/react-query';
import styles from './FeedPage.module.scss';
import ModelPredictionCard from '../../components/ModelPredictionCard/ModelPredictionCard';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Pagination from '../../components/Pagination/Pagination';
import { setCurrentPage } from '../../store/currentPageSlice';

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

    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.currentPage);

    const {data} = useQuery<ModelPrediction[]>({
        queryKey: ['models_predictions', currentPage],
        queryFn: () => fetch(`${import.meta.env.VITE_BACKEND_API}/models-predictions?public=true&page=${currentPage}`).then(res => res.json()),
        initialData: []
    });

    console.log(data);
    console.log(`current page: ${currentPage}`);

    const handlePagination = (type: 'previous' | 'next') => {
        if (type == 'previous') {
            if (currentPage - 1 < 1) {
                return;
            }
            dispatch(setCurrentPage(currentPage - 1));
        }

        if (type == 'next') {
            if (data.length < 1) {
                return;
            }
            dispatch(setCurrentPage(currentPage + 1));
        }

        window.scrollTo(0, 0);
    }

    if (data.length < 1) {
        return (
            <div className={styles.container}>
                <p>Пусто...</p>
                <Pagination onClick={handlePagination} currentPage={currentPage} isDisabled={true}/>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {data.map(pred => (
                <ModelPredictionCard key={pred.modelPredictionId} prediction={pred} hasLink={true}/>
            ))}
            <Pagination onClick={handlePagination} currentPage={currentPage}/>
        </div>
    )
}

export default FeedPage;