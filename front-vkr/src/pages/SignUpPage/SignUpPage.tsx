import { FormEvent, SyntheticEvent, useState } from 'react';
import InputLogin from '../../components/InputLogin/InputLogin';
import styles from './SignUpPage.module.scss';
import { isValidSignUpForm } from '../../utils/validations';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';




interface SignUpForm {
    username: string,
    email: string,
    password: string
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState<SignUpForm>({
        username: '',
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    function handleChange(e: SyntheticEvent): void {
        const target = e.target as HTMLInputElement;
        setIsValid(true);
        setError('');
        setSignUpInfo({
            ...signUpInfo,
            [target.name]: target.value
        })
    }

    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        const isValid = isValidSignUpForm(signUpInfo.username, signUpInfo.email, signUpInfo.password);
        setIsValid(isValid);
        console.log(isValid);
        if (!isValid) {
            return;
        } else {
            async function register() {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/register`, signUpInfo, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                  });
                if (res.status === 201) {
                    navigate('/login');
                } else if (res.status === 409) {
                    setError('Такой пользователь уже существует');
                }
            }
    
            register();
            setIsValid(true);
            setSignUpInfo({username: '', email: '', password: ''});
        }
    }

    return(
        <div className={styles.container}>
            <form className={styles.login} onSubmit={handleSubmit}>
                <p className={styles.login__title}>Регистрация</p>
                {error != '' && (
                        <p className={styles.login__error}>{error}</p>
                )}
                {!isValid && (
                        <p className={styles.login__error}>Заполните поля корректно</p>
                )}
                <div className={styles.login__username} data-title='Логин не меньше 6-ти символов и не больше 32-ух символов'>
                    <InputLogin type="text" name="username" id="username" placeholder='Логин' icon={<FaUser />} value={signUpInfo.username} onChange={handleChange}/>
                </div>
                <div className={styles.login__email} data-title='Почта не меньше 6-ти символов и не больше 64-ех символов'>
                    <InputLogin type="email" name="email" id="email" placeholder='Email' icon={<MdEmail />} value={signUpInfo.email} onChange={handleChange}/>
                </div>
                <div className={styles.login__password} data-title='Пароль не меньше 6-ти символов и не больше 32-ух символов'>
                    <InputLogin type="password" name="password" id="password" placeholder='Пароль' icon={<RiLockPasswordFill />} value={signUpInfo.password} onChange={handleChange}/>
                </div>
                <button className={styles.login__button} type="submit">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}

export default SignUpPage;