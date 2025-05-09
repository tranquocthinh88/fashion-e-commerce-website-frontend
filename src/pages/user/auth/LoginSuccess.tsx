import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveToken } from "../../../services/token.service";
import { UserModel } from "../../../models/user.model";
import { getUserByEmail, saveUserToLocalStorage } from "../../../services/user.service";
import Cookies from 'js-cookie';
import { LoginResponse } from "../../../dtos/responses/login.response";
import { ResponseSuccess } from "../../../dtos/responses/response.success";

const LoginSuccsess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const historyPath = localStorage.getItem('historyPath');
    useEffect(() => {
        (async () => {
            const accessToken = Cookies.get('accessToken');
            const refreshToken = Cookies.get('refreshToken');
            if(accessToken && refreshToken && email) {
                const loginResponse: LoginResponse = {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
                try {
                    saveToken(loginResponse);
                    const response: ResponseSuccess<UserModel> = await getUserByEmail(email);
                    const user: UserModel = response.data;

                    saveUserToLocalStorage(user);
                } catch (error) {
                    navigate("/login");
                }
                navigate(historyPath || "/home");
                localStorage.removeItem('historyPath');
            } else {
                navigate("/login");
            }
        })();
    }, []);
    return null;
}

export default LoginSuccsess;