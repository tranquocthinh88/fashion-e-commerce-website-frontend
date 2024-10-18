import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ChangePasswordDto } from "../dtos/requests/user/change.password.dto";
import { userUpdateDto } from "../dtos/requests/user/user.update.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { Role, UserModel } from "../models/user.model";

export const getUserByEmail = async (email: string) : Promise<ResponseSuccess<UserModel>> => {
    try {
        const response = await requestConfig(
            `users/${email}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const saveUserToLocalStorage = (user: UserModel) : void => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const isLoginAccount = (role?: Role) : boolean => {
    const user : UserModel | null = getUserFromLocalStorage();
    if(user) {
        return role ? user.role === role : true;
    }
    return false;
}


export const getUserFromLocalStorage = () : UserModel | null => { 
    const userStr : string | null = localStorage.getItem('user');
    if(userStr) {
        return JSON.parse(userStr);
    }
    return null;
}

export const uploadAvatar = async (avatar: File) : Promise<ResponseSuccess<string>> => {
    try {
        const formData = new FormData();
        formData.append('avatar', avatar);
        const response = await requestConfig(
            `users/upload`,
            Method.PUT,
            formData,
            ContentType.FORM_DATA,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateUser = async (email: string, userUpdateDto: userUpdateDto) : Promise<ResponseSuccess<UserModel>> => {
    try {
        const response = await requestConfig(
            `users/${email}`,
            Method.PUT,
            userUpdateDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const changePassword = async (changePasswordDto: ChangePasswordDto) : Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `users/change-password`,
            Method.POST,
            changePasswordDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}