import { CartItemModel } from "../models/cart.model";

export const getCartLocalStorage = (userId: number): CartItemModel[] => {
    const cart = localStorage.getItem(`cart_${userId}`);
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
};

export const addToCartLocalStorage = (item: CartItemModel, userId: number) => {
    if (checkItemInCart(item, userId)) {
        addQuantity(item, userId);
    } else {
        pushItemCart(item, userId);
    }
};

const checkItemInCart = (item: CartItemModel, userId: number): boolean => {
    const cart = getCartLocalStorage(userId);
    return cart.some((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
};

const addQuantity = (item: CartItemModel, userId: number) => {
    const cart = getCartLocalStorage(userId);
    const newCart = cart.map(cartItem => {
        if (cartItem.productDetail.id === item.productDetail.id) {
            cartItem.quantity += item.quantity;
        }
        return cartItem;
    });
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
};

const pushItemCart = (item: CartItemModel, userId: number) => {
    const cart = getCartLocalStorage(userId);
    cart.push(item);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
};

export const updateQuantityProduct = (item: CartItemModel, userId: number) => {
    const cart = getCartLocalStorage(userId);
    const newCart = cart.map((cartItem: CartItemModel) => 
        cartItem.productDetail.id === item.productDetail.id ? { ...cartItem, quantity: item.quantity } : cartItem
    );
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
};

export const removeProductFromCart = (item: CartItemModel, userId: number) => {
    const cart = getCartLocalStorage(userId);
    const newCart = cart.filter(cartItem => cartItem.productDetail.id !== item.productDetail.id);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
};
