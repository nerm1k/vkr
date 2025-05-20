import styles from './Pagination.module.scss';
import { Link } from 'react-router-dom';

interface Props {
    onClick: (type: 'previous' | 'next') => void,
    currentPage: number,
    isDisabled: boolean
}

const Pagination = ({onClick, currentPage, isDisabled}: Props) => {
    return (
        <div className={styles.pagination}>
            <Link to={`/feed?page=${currentPage - 1}`}>
                <button className={`${styles.pagination__button} ${currentPage == 1 && styles['pagination__button--disabled']}`} onClick={() => onClick('previous')}>Вперед</button>
            </Link>
            <Link to={`/feed?page=${currentPage + 1}`}>
                <button className={`${styles.pagination__button} ${isDisabled && styles['pagination__button--disabled']}`} onClick={() => onClick('next')}>Назад</button>
            </Link>
        </div>
    )
}

export default Pagination;