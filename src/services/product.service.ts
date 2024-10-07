import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { PageResponse } from "../dtos/responses/page.response";
import { ProductUserResponse } from "../dtos/responses/products/productUser-response";
import { ResponseSuccess } from "../dtos/responses/response.success";


export const getProductsSale = async (): Promise<ResponseSuccess<ProductUserResponse[]>> => {
    try {
        const response = await requestConfig(
            'products/discount',
            Method.GET,
            [],
            ContentType.JSON
        );
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const getProductsDiscount = async (pageNo: number = 1, pageSize: number = 40, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult : string = 'sort=""';
    let searchResult : string = 'search=""';
    
    if(search.length > 0){
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }
    
    if(sort.length > 0){
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/page-product-discount?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}