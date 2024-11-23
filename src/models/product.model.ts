import { BrandModel } from "./brand.model"
import { CategoryModel } from "./category.model"
import { Status } from "./enum/status.enum"
import { ProviderModel } from "./provider.model"

export type ProductModel = {
    brand: BrandModel
    productStatus: any
    id: string,
    productName?: string,
    inputPrice?: number,
    price?: number,
    status?: Status,
    category?: CategoryModel
    provider?: ProviderModel
    description?: string
    avgRating?: number
    thumbnail?: string
    buyQuantity?: number
    numberOfRating?: number
    totalQuantity?: number
}