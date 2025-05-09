export type ResponseSuccess<T> = {
    status: number,
    message: string,
    data: T
}