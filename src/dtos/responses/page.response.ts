export type PageResponse<T> = {
    pageNo: number;
    totalPage: number;
    totalElements: number;
    data: T;
}