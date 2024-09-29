import { LoginResponseDto } from "../dtos/responses/login.response";

export const saveToken = (loginResponse: LoginResponseDto) => {
    if (loginResponse && loginResponse.accessToken) {
        localStorage.setItem("accessToken", loginResponse.accessToken);
    } else {
        console.error("Không có accessToken để lưu");
    }
    
    if (loginResponse && loginResponse.refreshToken) {
        localStorage.setItem("refreshToken", loginResponse.refreshToken);
    } else {
        console.error("Không có refreshToken để lưu");
    }
};

export const getToken = (): LoginResponseDto | null => {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
}