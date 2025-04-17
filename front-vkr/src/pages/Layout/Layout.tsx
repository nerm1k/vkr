import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from './Layout.module.scss';

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <div className={styles.container}>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Layout;