import { Status } from "../../../models/enum/status.enum"

export type ProviderDto = {
    providerName?: string
    // phoneNumber: string,
    // email: string,
    // addressId: number,
    status?: Status
}