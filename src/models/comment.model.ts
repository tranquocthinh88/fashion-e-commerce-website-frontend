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