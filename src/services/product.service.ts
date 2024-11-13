import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { ProductUpdateDto } from "../dtos/requests/admin/product-update.dto";
import { PageResponse } from "../dtos/responses/page.response";
import { ProductResponse } from "../dtos/responses/products/product.response";
import { ProductUserResponse } from "../dtos/responses/products/productUser-response";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ProductModel } from "../models/product.model";

export const getProductsDiscount = async (pageNo: number = 1, pageSize: number = 40, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult: string = 'sort=""';
    let searchResult: string = 'search=""';

    if (search.length > 0) {
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }

    if (sort.length > 0) {
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/page-product-discount?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        console.log("Data discount: ", response.data);
        
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const getProductsNewCreatedAt = async (pageNo: number = 1, pageSize: number = 20, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult: string = 'sort=""';
    let searchResult: string = 'search=""';

    if (search.length > 0) {
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }

    if (sort.length > 0) {
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/page-product-top20?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        console.log("Data new: ", response.data);

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const getProductsSold = async (pageNo: number = 1, pageSize: number = 20, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult: string = 'sort=""';
    let searchResult: string = 'search=""';

    if (search.length > 0) {
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }

    if (sort.length > 0) {
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/page-product-sold?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        console.log("Data sold: ", response.data);

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const getProductsForUser = async (pageNo: number = 1, pageSize: number = 20, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult: string = 'sort=""';
    let searchResult: string = 'search=""';

    if (search.length > 0) {
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }

    if (sort.length > 0) {
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/page-product?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
            [],
            ContentType.JSON
        );

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


export const getProductById = async (productId: string): Promise<ResponseSuccess<ProductResponse>> => {
    try {
        const response = await requestConfig(
            `products/${productId}`,
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

export const createProduct = async (productDto: FormData): Promise<ResponseSuccess<ProductModel>> => {
    try {
        const response = await requestConfig(
            'products',
            Method.POST,
            productDto,
            ContentType.FORM_DATA,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getAllProducts = async (): Promise<ResponseSuccess<ProductModel[]>> => {
    try {
        const response = await requestConfig(
            'products',
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
export const getPageProducts = async (pageNo: number = 1, pageSize: number = 40, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult: string = 'sort=""';
    let searchResult: string = 'search=""';

    if (search.length > 0) {
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }

    if (sort.length > 0) {
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/page-product?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const updateProduct = async (id: number, productDto: ProductUpdateDto): Promise<ResponseSuccess<ProductModel>> => {
    try {
        const response = await requestConfig(
            `products/${id}`,
            Method.PUT,
            productDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateProductStatus = async (productId: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `products/delete/${productId}`,
            Method.PUT,
            null,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};