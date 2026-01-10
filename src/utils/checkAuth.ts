import { jwtDecode, JwtPayload } from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp ? decodedToken.exp < currentTime : true;
    } catch (error) {
        return true;
    }
};
