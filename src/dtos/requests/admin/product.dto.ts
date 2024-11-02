import { Status } from "../../../models/enum/status.enum";

export type ProductDto = {
    productName?: string;
    price?: number;
    description?: string;
    thumbnail?: number;
    categoryId?: number | string;
    providerId?: number | string;
    brandId: number | string; 
    images?: File[];
    status?: Status;
}