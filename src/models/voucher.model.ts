import { Status } from "./enum/status.enum";

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
    startDate: Date | string;
    expiredDate: Date | string;
    quantity: number;
    scope: Scope;
    maxDiscountAmount: number;
    minOrderAmount: number;
    status?: Status;
}
