import { Status } from "./enum/status.enum"
import { ProviderModel } from "./provider.model"

export type ProductModel = {
    id?: number,
    productName?: string,
    price?: number,
    status?: Status,
    categoryId?: number
    provider?: ProviderModel
    description?: string
    avgRating?: number
    thumbnail?: string
    buyQuantity?: number
    numberOfRating?: number
    totalQuantity?: number
}