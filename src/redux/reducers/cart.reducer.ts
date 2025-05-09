import { createSlice } from "@reduxjs/toolkit"
import { getCartLocalStorage } from "../../utils/cart.handle"
import { CartItemModel } from "../../models/cart.model"

export type Cart = {
    items: CartItemModel[],
}

const initialState: Cart = {
    items: []
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartState: (state, action) => {
            const userId = action.payload; // Nhận userId từ payload
            state.items = getCartLocalStorage(userId);
        }
    },
})

export const { updateCartState } = cartSlice.actions

export default cartSlice.reducer