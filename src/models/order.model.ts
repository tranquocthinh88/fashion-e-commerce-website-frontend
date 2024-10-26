import { DeliveryMethod } from "../dtos/requests/orders/shipping.dto"
import { AddressModel } from "./addess.model"
import { UserModel } from "./user.model"

export enum PaymentMethod {
    COD = 'COD',
    CC = 'CC'
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export type OrderModel = {
    id: String,
    orderDate: Date,
    status: OrderStatus,
    paymentMethod: PaymentMethod,
    note: String,
    phoneNumber: String,
    buyerName: String,
    originalAmount: Number,
    deliveryFee: Number,
    discountAmount: Number,
    discountPrice: Number,
    deliveryMethod: DeliveryMethod,
    user: UserModel,
    address: AddressModel,
    addressDetail: String
}