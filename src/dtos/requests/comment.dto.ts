export type CommentDto = {
    email: string;
    content: string;
    rating: number;
    productId: string;
    medias?: File[];
}