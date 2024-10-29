import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { CommentModel } from "../models/comment.model";

export const createComment = async (comment: FormData) : Promise<ResponseSuccess<CommentModel>> => {
    try {
        const response = await requestConfig(
            `comments/send`,
            Method.POST,
            comment,
            ContentType.FORM_DATA,
            true
        )
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}