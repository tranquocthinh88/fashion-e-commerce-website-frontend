import { PaymentMethod } from "../../../models/order.model";
import { AddressDto } from "../address.dto";
import { DeliveryMethod } from "./shipping.dto";

export type ProductsOrderDto = {
    productDetailId: string;
    quantity: number;
}

export type OrderDto = {
    email: string;
    paymentMethod: PaymentMethod;
    note: string;
    phoneNumber: string;
    buyerName: string;
    deliveryMethod: DeliveryMethod;
    deliveryFee: number;
    address: AddressDto;
    addressDetail: string;
    productsOrderDtos: ProductsOrderDto[];
    vouchers?: number[];
}