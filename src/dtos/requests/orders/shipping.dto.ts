export type ShippingDto = {
    pickProvince: string;
    pickDistrict: string;
    province: string;
    district: string;
    weight: number;
    deliveryMethod: DeliveryMethod;
}

export enum DeliveryMethod {
    EXPRESS = "EXPRESS",
    ECONOMY = "ECONOMY",
}