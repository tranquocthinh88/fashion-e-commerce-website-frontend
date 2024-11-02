import { OrderModel } from "./order.model";
import { ProductDetailModel } from "./product-detail.model";

export type OrderDetailsModel = {
    order?: OrderModel;
    productDetail?: ProductDetailModel;
    quantity?: number;
    totalAmount?: number;
    priceAtCreateOrder?: number;
}