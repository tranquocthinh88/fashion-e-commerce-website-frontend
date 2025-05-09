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
            console.log("Adding notification:", action.payload);
            state.items.push(action.payload);
        },
        setNotification: (state, actions) => {
            console.log("Setting notifications:", actions.payload);
            state.items = actions.payload;
        },
        removeNotification: (state, actions: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== actions.payload);
        },
        clearNotification: (state) => {
            state.items = [];
        },
        updateNotificationStatus: (state, action: PayloadAction<{ id: number; isRead: boolean }>) => {
            const notification = state.items.find(item => item.id === action.payload.id);
            if (notification) {
                notification.isRead = action.payload.isRead; // Cập nhật trạng thái đã đọc
            }
        },
    }
})

export const { addNotification, setNotification, removeNotification, clearNotification, updateNotificationStatus } = notificationSlice.actions

export default notificationSlice.reducer
