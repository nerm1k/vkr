import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface User {
    id: number
    username: string,
}

interface TokenPayload extends User {
    exp: number;
}

const useIsAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState<User>({
        id: 0,
        username: '',
    });

    useEffect(() => {
        const decodedJwtToken: TokenPayload = JSON.parse(localStorage.getItem('decoded_jwt_token') || '{}');

        if (Object.keys(decodedJwtToken).length != 0) {
            try {
                const isJwtTokenExpired = decodedJwtToken.exp * 1000 < Date.now();

                if (!isJwtTokenExpired) {
                    setIsAuthenticated(true);
                    setAuthenticatedUser({id: decodedJwtToken.id, username: decodedJwtToken.username});
                } else {
                    setIsAuthenticated(false);
                } 
            } catch (error) {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return {
        isAuthenticated,
        authenticatedUser
    }
};

export default useIsAuthenticated;