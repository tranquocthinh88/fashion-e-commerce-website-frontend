
export enum VoucherType {
    FOR_PRODUCT = 'FOR_PRODUCT',
    FOR_DELIVERY = 'FOR_DELIVERY',
}

export enum Scope {
    ALL = 'ALL',
    FOR_USER = 'FOR_USER',
}

export type VoucherModel = {
    id: number;
    name: string;
    note: string;
    discount: number;
    voucherType: VoucherType;
    startDate: string;
    expiredDate: string;
    quantity: number;
    scope: Scope;
    maxDiscountAmount: number;
    minOrderAmount: number;
}
