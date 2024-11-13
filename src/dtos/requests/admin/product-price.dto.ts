export type ProductPriceDto = {
    productId: string;
    discount: number;
    expiredDate: Date;
    issueDate: Date;
    note?: string;
}