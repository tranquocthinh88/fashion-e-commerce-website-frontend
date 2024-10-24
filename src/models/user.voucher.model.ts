import { UserModel } from "./user.model"
import { VoucherModel } from "./voucher.model";

export type UserVoucherModel = {
    user: UserModel;
    voucher: VoucherModel;
    isUsed: boolean;
}