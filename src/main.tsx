import ReactDOM from 'react-dom/client'
import './index.scss'
import { CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { Provider as ProviderRedux } from 'react-redux';
import { store } from './redux/stores/store.ts'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { connect, disconnect, subscribe } from './configs/websocket.ts'
import { NotificationModel } from './models/notification.model.ts'
import { Message } from 'stompjs'
import { addNotification, setNotification } from './redux/reducers/notification.reducer.ts'
import { ResponseSuccess } from './dtos/responses/response.success.ts'
import { getAllNotificationsByUserId } from './services/notification.service.ts'
import { UserModel } from './models/user.model.ts'
import { getUserFromLocalStorage } from './services/user.service.ts'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <ProviderRedux  store={store}>
//     <CssVarsProvider>
//       <CssBaseline />
//       <RouterProvider router={router}></RouterProvider>
//     </CssVarsProvider>
//   </ProviderRedux>
// )


const App = () => {
  const dispatch = useDispatch();
  const user: UserModel | null = getUserFromLocalStorage();

  useEffect(() => {
    const onConnected = () => {
      console.log("Connected to WebSocket server");
      subscribe(`/topic/notifications`, onNotificationReceived);
    };

    const onError = () => {
      console.log("Error connecting to WebSocket server");
    };

    const onNotificationReceived = (message: Message) => {
      const notification: NotificationModel = JSON.parse(message.body);
      dispatch(addNotification(notification));
    };

    connect(onConnected, onError);

    if (user?.id) {
      getNotifications(user.id);
    }

    return () => {
      disconnect();
    };
  }, [dispatch, user]);

  const getNotifications = async (userId: number) => {
    try {
      const response: ResponseSuccess<NotificationModel[]> = await getAllNotificationsByUserId(userId);
      dispatch(setNotification(response.data));
      console.log("Dữ liệu: ", response.data);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CssVarsProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProviderRedux store={store}>
    <App />
  </ProviderRedux>
);
