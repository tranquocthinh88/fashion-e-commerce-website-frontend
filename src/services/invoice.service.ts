import requestConfig, { ContentType, Method } from "../configs/axios.config";
import { PageResponse } from "../dtos/responses/page.response";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { InvoiceModel } from "../models/invoice.model";

export const getInvoicesForAdmin = async (pageNo: number = 1, pageSize: number = 40, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<InvoiceModel[]>>> => {
    let sortResult: string = 'sort=""';
    let searchResult: string = 'search=""';

    if (search.length > 0) {
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }

    if (sort.length > 0) {
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        console.log("Search: ", searchResult);
        
        const response = await requestConfig(
            `invoices/admin?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
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