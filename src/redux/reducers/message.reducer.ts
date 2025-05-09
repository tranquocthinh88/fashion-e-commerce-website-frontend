import { createSlice } from "@reduxjs/toolkit"
import { MessageModel } from "../../models/message.model"

export type Messages = {
    items: MessageModel[],
}

const initialState: Messages = {
    items: [],
}

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, actions) => {
            state.items = [ actions.payload, ...state.items ];
        },
    },
})

export const { addMessage } = messageSlice.actions

export default messageSlice.reducer