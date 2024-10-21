export type ProductDto = {
    productName?: string;
    price?: number;
    description?: string;
    thumbnail?: number;
    categoryId?: number | string;
    providerId?: number | string;
    brandId: string; 
    images?: File[];
}