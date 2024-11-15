import { Status } from "../../../models/enum/status.enum"
import { AddressDto } from "../address.dto"

export type ProviderDto = {
    providerName?: string
    phoneNumber: string,
    email: string,
    addressId: number,
    status?: Status
}