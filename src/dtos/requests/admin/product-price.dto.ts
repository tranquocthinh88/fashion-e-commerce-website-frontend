export type ProductPriceDto = {
    productId: number;
    discount: number;
    expiredDate: Date;
    issueDate: Date;
    note: string;
}