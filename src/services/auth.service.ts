import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { LoginRequestDto } from "../dtos/requests/login.dto"
import { LoginResponseDto } from "../dtos/responses/login.response";
import { ResponseSuccess } from "../dtos/responses/response.success";

export const login = async (loginRequestDto: LoginRequestDto): Promise<ResponseSuccess<LoginResponseDto>> => {
    try {
        const response = await requestConfig(
            `auth/login`,
            Method.POST,
            loginRequestDto,
            ContentType.JSON,
        );
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}