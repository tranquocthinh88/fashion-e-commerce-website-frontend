import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RoomChats = {
    roomChatId: number | null;
}

const initialState: RoomChats = {
    roomChatId: null
}

export const roomChatSlice = createSlice({
    name: 'roomChat',
    initialState,
    reducers: {
        addRoomChat: (state, action: PayloadAction<number>) => {
            state.roomChatId = action.payload;
        },
    }
})

export const { addRoomChat } = roomChatSlice.actions

export default roomChatSlice.reducer
