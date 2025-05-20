import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentPage } from '../../store/currentPageSlice';

const Header = () => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    const dispatch = useAppDispatch();
    
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__logo}>
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                </div>
                <nav className={styles.header__nav}>
                    <ul>
                        <li>
                            <Link to='/feed' onClick={() => dispatch(setCurrentPage(1))}>
                                Все публикации
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <>
                                <li>
                                    <Link to='/login'>
                                        Войти
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/signup'>
                                        Регистрация
                                    </Link>
                                </li>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link to={`/user/${authenticatedUser.username.toLowerCase()}`}>
                                        Мои публикации
                                    </Link>
                                </li>     
                                <li>
                                    <Link to='/logout'>
                                        Выйти
                                    </Link>
                                </li>    
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;