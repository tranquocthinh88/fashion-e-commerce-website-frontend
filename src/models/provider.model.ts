import { Status } from "./enum/status.enum"

export type ProviderModel = {
    id?: number,
    providerName?: string,
    address?: string,
    phoneNumber?: string,
    email?: string,
    status?: Status
}