import { apiUrl } from "../configs/api-url";
import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { connect } from "../configs/websocket";
import { ResetPasswordDto } from "../dtos/requests/auth/reset.password.dto";
import { LoginRequestDto } from "../dtos/requests/login.dto"
import { RegisterRequestDto } from "../dtos/requests/register.dto";
import { VerifyEmailDto } from "../dtos/requests/verify.dto";
import { LoginResponse } from "../dtos/responses/login.response";
import { ResponseSuccess } from "../dtos/responses/response.success";

export const login = async (loginRequestDto: LoginRequestDto): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/login`,
            Method.POST,
            loginRequestDto,
            ContentType.JSON,
        );
        console.log(response.data);

        connect(() => {
            console.log('WebSocket connected!');
        }, () => {
            console.log('WebSocket connection error');
        });
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const logout = async (refreshToken: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/logout`,
            Method.POST,
            refreshToken,
            ContentType.TEXT_PLAIN
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const register = async (registerRequestDto: RegisterRequestDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/register`,
            Method.POST,
            registerRequestDto,
            ContentType.JSON,
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}



export const verifyEmail = async (verifyEmailDto: VerifyEmailDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/verify-email`,
            Method.POST,
            verifyEmailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export const loginWithSocial = (provider: string) => {
    window.location.href = `${apiUrl}/oauth2/authorization/${provider}`;
}

export const sendVerificationEmail = async (email: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/send-verification-email`,
            Method.POST,
            email,
            ContentType.TEXT_PLAIN
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const verifyEmailOtp = async (verifyEmailDto: VerifyEmailDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/verify-email-otp-reset-password`,
            Method.POST,
            verifyEmailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const resetPassword = async (resetPasswordDto: ResetPasswordDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/reset-password`,
            Method.POST,
            resetPasswordDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}