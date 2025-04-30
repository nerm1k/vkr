import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
            try {
                await fetch(`${import.meta.env.VITE_BACKEND_API}/logout`);
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('decoded_jwt_token');
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
        
        logout();
    }, []);

    return null;
}

export default Logout;