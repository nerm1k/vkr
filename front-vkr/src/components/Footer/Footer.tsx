import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footer__item}>
                    © 2025, Бойко Роман
                </div>
            </div>
        </footer>
    )
}

export default Footer;