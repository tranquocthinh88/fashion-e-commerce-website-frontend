import { SizeType } from "./enum/size-type.enum";

export type SizeModel = {
    id?: number;
    sizeType?: SizeType;
    numberSize?: number;
    textSize?: string;
}