import { Status } from "../../../models/enum/status.enum"

export type CategoryDto = {
    categoryName?: string
    status?: Status
}