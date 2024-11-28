import { Scope, VoucherType } from "../../../models/voucher.model";

export type applyVoucherOrderDto= {
    originalAmount: number;
    voucherId: number;
}

export type applyVoucherShipDto= {
    deliveryFee: number;
    originalAmount: number;
    voucherId: number;
}

export type voucherDto = {
    voucherName: string;
    note: string;
    discount: number;
    voucherType: VoucherType;
    scope: Scope;
    startDate: string;
    expiredDate: string;
    maxDiscountAmount: number;
    minOrderAmount: number;
    quantity: number;
}