import { CartItemModel } from "../models/cart.model";

export const getCartLocalStorage = (): CartItemModel[] => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
};

export const addToCartLocalStorage = (item: any) => {
    if (checkItemInCart(item)) {
        addQuantity(item)
    } else {
        pushItemCart(item)
    }
    
}

const checkItemInCart = (item: CartItemModel): boolean => {
    const cart = getCartLocalStorage();
    if (cart.length > 0) {
        const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
        if (filter.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

const addQuantity = (item: CartItemModel) => {
    const cart = getCartLocalStorage()
    const newCart = cart.map(cartItem => {
        if (cartItem.productDetail.id === item.productDetail.id) {
            cartItem.quantity += item.quantity
        }
        return cartItem
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
}


const pushItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage()
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const updateQuantityProduct = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
    if(filter.length > 0) {
        filter[0].quantity = item.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const removeProductFromCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const newCart = cart.filter(cartItem => cartItem.productDetail.id !== item.productDetail.id)
    localStorage.setItem('cart', JSON.stringify(newCart))
}