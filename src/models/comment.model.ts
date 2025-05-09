import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

export type CommentModel = {
    id: string;
    textContent: string;
    rating: number;
    commentDate: Date;
    user: UserModel;
    product: ProductModel;
}

export type CommentMediaModel = {
    id: string;
    path: string;
    mediaType: MediaType;
    comment: CommentModel;
}

export enum MediaType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
}