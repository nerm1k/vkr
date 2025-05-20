import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { isValidLoginForm } from '../../utils/validations';
import { jwtDecode } from 'jwt-decode';
import InputLogin from '../../components/InputLogin/InputLogin';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';

interface LoginForm {
    username: string,
    password: string
};

interface ResponseData {
    message: string,
    jwtToken: string
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState<LoginForm>({
        username: '',
        password: ''
    });
    const [isValid, setIsValid] = useState(true);
    const [isError, setIsError] = useState(false);

    function handleChange(e: SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        setIsValid(true);
        setIsError(false);
        setLoginInfo({
            ...loginInfo,
            [target.name]: target.value
        })
    }

    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        const isValid = isValidLoginForm(loginInfo.username, loginInfo.password);
        setIsValid(isValid);
        if (!isValid) {
            return;
        } else {
            async function login() {
                try {
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/login`, loginInfo, {
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                      });
                  
                    const data = res.data;
                    console.log(data);
                    if (!data.jwtToken) {
                        setIsError(true);
                    } else {
                        localStorage.setItem('jwt_token', data.jwtToken);
                        const decodedJwtToken = jwtDecode(data.jwtToken);
                        localStorage.setItem('decoded_jwt_token', JSON.stringify(decodedJwtToken))
                        navigate('/');
                    }
                } catch (error) {
                    console.log(error);
                    setIsError(true);
                }
            }
            login();
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.login} onSubmit={handleSubmit}>
                <p className={styles.login__title}>Вход</p>
                {!isValid && (
                        <p className={styles.login__error}>Заполните поля корректно</p>
                )}
                {isError && (
                    <p className={styles.login__error}>Данные некорректны</p>
                )}
                <div className={styles.login__username}>
                    <InputLogin type="text" name="username" id="username" placeholder='Логин' icon={<FaUser />} onChange={handleChange} value={loginInfo.username}/>
                </div>
                <div className={styles.login__password}>
                    <InputLogin type="password" name="password" id="password" placeholder='Пароль' icon={<RiLockPasswordFill />} onChange={handleChange} value={loginInfo.password}/>
                </div>
                {/* <div className={styles.login__remember}>
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Запомнить меня</label>
                </div> */}
                <button className={styles.login__button} type="submit">
                    Войти
                </button>
                <p className={styles.login__alternative}>Нет аккаунта? <Link to={'../signup'}>Создайте аккаунт</Link></p>
            </form>
        </div>
    );
}

export default LoginPage;