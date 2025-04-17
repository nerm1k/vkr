import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const Header = () => {
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();
    
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__logo}>
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                </div>
                <nav className={styles.header__nav}>
                        {!isAuthenticated && (
                            <ul>
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
                            </ul>
                        )}
                        {isAuthenticated && (
                            <ul>
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
                            </ul>
                        )}
                </nav>
            </div>
        </header>
    )
}

export default Header;