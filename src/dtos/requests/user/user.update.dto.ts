import { Gender } from "../../../models/user.model";
import { AddressDto } from "../address.dto";

export type userUpdateDto = {
    username: string;
    phone: string;
    address?: AddressDto;
    avatarUrl: string;
    dateOfBirth: string;
    gender: Gender
}