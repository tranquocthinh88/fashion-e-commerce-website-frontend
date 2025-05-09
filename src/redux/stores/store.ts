import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cart.reducer'
import notificationReducer from '../reducers/notification.reducer'
import roomChatReducer from '../reducers/roomchat.reducer'
import messageReducer from '../reducers/message.reducer'

export const store = configureStore({
    reducer: {
      cart: cartReducer,
      notification: notificationReducer,
      roomChat: roomChatReducer,
      message: messageReducer
    },
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch