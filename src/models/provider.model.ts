import { Status } from "./enum/status.enum"
import { AddressModel } from "./addess.model"

export type ProviderModel = {
    id?: number,
    providerName?: string,
    address?: AddressModel,
    phoneNumber?: string,
    email?: string,
    status?: Status
}