import ReactDOM from 'react-dom/client'
import './index.scss'
import { Button, CssBaseline } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { Provider as ProviderRedux } from 'react-redux';
import { store } from './redux/stores/store.ts'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { connect, disconnect, subscribe } from './configs/websocket.ts'
import { NotificationModel } from './models/notification.model.ts'
import { Message } from 'stompjs'
import { addNotification, setNotification } from './redux/reducers/notification.reducer.ts'
import { ResponseSuccess } from './dtos/responses/response.success.ts'
import { getAllNotificationsByUserId } from './services/notification.service.ts'
import { Role, UserModel } from './models/user.model.ts'
import { getUserFromLocalStorage } from './services/user.service.ts'
import ProtectRouter from './routes/ProtectRoutes.tsx'
import ChatAI from './pages/user/chat/ChatAI.tsx'
import ChatContainer from './pages/user/chat/ChatContainer.tsx'
// import chatbot from './assets/images/chatbot1.jpg'

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
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const onConnected = () => {
      console.log("Connected to WebSocket server");
      subscribe(`/topic/notifications`, onNotificationReceived);
    };

    const onError = () => {
      console.log("Error connecting to WebSocket server");
    };

    const onNotificationReceived = (message: Message) => {
      try {
        const notification = JSON.parse(message.body);
        console.log("Received notification:", notification);
        dispatch(addNotification(notification));
        if (user) {
          getNotifications(user.id);
        }
      } catch (error) {
        console.error("Failed to parse notification:", error);
      }
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CssVarsProvider>
      <CssBaseline />
      <RouterProvider router={router} />
      {user && user.role === Role.ROLE_USER ? <> <Button
      variant="contained"
      sx={{
        position: 'fixed',
        right: '5%',
        bottom: '5%',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        width: 30,
      }}
      onClick={toggleChat}
    >
      <img
        src="https://img.icons8.com/ios/452/robot-2.png"
        // src={chatbot}
        style={{ width: 40, height: 40 }}
        alt="Trợ lý AI"
      />
      Chat
    </Button>
    <ChatContainer />
    {isChatOpen && (
      <ProtectRouter role={Role.ROLE_USER}>
        <ChatAI onSwitch={toggleChat} />
      </ProtectRouter>
    )}</> : <></>}
      
    </CssVarsProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProviderRedux store={store}>
    <App />
  </ProviderRedux>
);
