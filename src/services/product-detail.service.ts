
import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ProductDetailDto } from "../dtos/requests/admin/product-detail.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ProductDetailModel } from "../models/product-detail.model";

export const createProductDetail = async (productDetailDto: ProductDetailDto): Promise<ResponseSuccess<ProductDetailModel>> => {
    try {
        const response = await requestConfig(
            'productDetails',
            Method.POST,
            productDetailDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}