import { OrderStatus } from "../../../models/enum/order.status";
import { PaymentMethod } from "../../../models/order.model";
import { AddressDto } from "../address.dto";
import { DeliveryMethod } from "./shipping.dto";

export type ProductsOrderDto = {
    productDetailId: string;
    quantity: number;
    isSelected?: boolean;
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

export type OrderUpdateDto = {
    orderStatus: OrderStatus,
}