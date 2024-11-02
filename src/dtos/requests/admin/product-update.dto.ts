import { Status } from "../../../models/enum/status.enum";

export type ProductUpdateDto = {
    productName: string;
    price: number;
    description: string;
    thumbnail: string;
    categoryId: number;
    providerId: number;
    status: Status;
    brandId: string
}
