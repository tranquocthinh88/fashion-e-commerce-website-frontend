import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NotificationModel } from "../../models/notification.model"

export type Notifications = {
    items: NotificationModel[]
}

const initialState: Notifications = {
    items: []
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationModel>) => {
            state.items.push(action.payload);
        },
        setNotification: (state, actions) => {
            state.items = actions.payload;
        },
        removeNotification: (state, actions) => {
            state.items = state.items.filter(item => item.id !== actions.payload);
        },
        clearNotification: (state) => {
            state.items = [];
        }
    }
})

export const { addNotification, setNotification, removeNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer