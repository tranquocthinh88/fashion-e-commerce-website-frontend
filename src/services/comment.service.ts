import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { PageResponse } from "../dtos/responses/page.response";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { CommentResponse } from "../dtos/responses/user/comment.response";
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


export const getAllCommentById = async (pageNo: number = 1, pageSize: number = 10, productId?: string): Promise<ResponseSuccess<PageResponse<CommentResponse[]>>> => {

    try {
        console.log("Đã vào ");
        
        const response = await requestConfig(
            // `comments/page-comment?pageNo=${pageNo}&pageSize=${pageSize}&${productId ? `search=product.id-${productId}` : ''}`,
            `comments/page-comment?pageNo=${pageNo}&pageSize=${pageSize}&sort=commentDate%3Adesc&search=product.id-${productId}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
