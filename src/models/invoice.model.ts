import { DeliveryMethod } from "../dtos/requests/orders/shipping.dto";
import { OrderModel, PaymentMethod } from "./order.model";

export type InvoiceModel = {
    id: string;
    invoiceDate: Date;
    paymentMethod: PaymentMethod;
    phoneNumber: string;
    buyerName: string;
    addressDetail: string;
    originalAmount: number;
    deliveryFee: number;
    discountAmount: number;
    discountPrice: number;
    deliveryMethod: DeliveryMethod;
    order: OrderModel;
}