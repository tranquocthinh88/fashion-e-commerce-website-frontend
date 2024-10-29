export type CommentDto = {
    email: string;
    textContent: string;
    rating: number;
    productId: string;
    medias?: File[];
}