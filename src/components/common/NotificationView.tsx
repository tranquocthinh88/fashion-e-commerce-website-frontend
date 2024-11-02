// import { Box, MenuItem, Typography } from "@mui/material";
// import { NotificationModel } from '../../models/notification.model';
// import { getNotificationsByUserId, markNotificationAsRead } from "../../services/notification.service";
// import { UserModel } from "../../models/user.model";
// import { getUserFromLocalStorage } from "../../services/user.service";
// import { NotificationUserModel } from "../../models/notification.user.model";
// import { useEffect, useState } from "react";
// import { ResponseSuccess } from "../../dtos/responses/response.success";

// type Props = {
//   notification: NotificationModel
// }

// const handleRead = async (notification: NotificationModel, userId: number) => {
//   console.log("Mark as read");
//   try {
//     await markNotificationAsRead(notification.id, userId);
//   } catch (error) {
//     console.log(error);
//   }
// }


// const NotificationView = ({ notification }: Props) => {

//   const user: UserModel | null = getUserFromLocalStorage();
//   const [notificationUser, setNotificationUser] = useState<NotificationUserModel | null>(null);

//   useEffect(() => {
//     console.log("Notification: ", notification);
//     (async () => {
//       if (user) {
//         try {
//           const response: ResponseSuccess<NotificationUserModel[]> = await getNotificationsByUserId(user.id!);
//           setNotificationUser(response.data[0] || null);
//         } catch (error) {
//           console.log(error);

//         }
//       }
//     })();
//   }, []);

//   return (
//     <>
//       {notificationUser && notificationUser.isRead && (
//         <MenuItem onClick={() => user && handleRead(notification, user.id)} 
//         style={{backgroundColor: 'red'}}>
//           <Box sx={{ width: '100%', }}>
//             <Typography variant="body2">{notification.content}</Typography>
//             <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'flex-end', right: 0 }}>
//               {new Date(notification.notificationTime).toLocaleDateString()} {new Date(notification.notificationTime).toLocaleTimeString()}
//             </Typography>
//           </Box>
//         </MenuItem>
//       )}
//     </>
//   );
// };

// export default NotificationView;

import { Box, MenuItem, Typography } from "@mui/material";
import { NotificationModel } from '../../models/notification.model';
import { getNotificationsByUserId, markNotificationAsRead } from "../../services/notification.service";
import { UserModel } from "../../models/user.model";
import { getUserFromLocalStorage } from "../../services/user.service";
import { NotificationUserModel } from "../../models/notification.user.model";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../dtos/responses/response.success";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type Props = {
  notification: NotificationModel;
}

const handleRead = async (notification: NotificationModel, userId: number, setNotificationUser: Function) => {
  console.log("Mark as read");
  try {
    await markNotificationAsRead(notification.id, userId);
    setNotificationUser((prev: NotificationUserModel) => ({ ...prev, isRead: true })); // Cập nhật trạng thái đọc
  } catch (error) {
    console.log(error);
  }
}

const NotificationView = ({ notification }: Props) => {
  const user: UserModel | null = getUserFromLocalStorage();
  const [notificationUser, setNotificationUser] = useState<NotificationUserModel | null>(null);

  useEffect(() => {
    const fetchNotificationUser = async () => {
      
      if (user && notification) { // Thêm kiểm tra notification
        try {
          const response: ResponseSuccess<NotificationUserModel[]> = await getNotificationsByUserId(user.id!);
          console.log("Notification User: ", response.data);
          
          const notificationUserItem = response.data.find(item => item.notification.id === notification.id);
          setNotificationUser(notificationUserItem || null);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    fetchNotificationUser();
  }, [user, notification]); // Thêm notification vào dependencies
  
  return (
    <MenuItem 
      onClick={() => user && handleRead(notification, user.id, setNotificationUser)} 
      style={{ backgroundColor: notificationUser?.isRead ? 'white' : 'grey' }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="body2">{notification.content}</Typography>
        <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'flex-end', right: 0 }}>
          {new Date(notification.notificationTime).toLocaleDateString()} {new Date(notification.notificationTime).toLocaleTimeString()}
        </Typography>
      </Box>
    </MenuItem>
  );
};

export default NotificationView;


// type Props = {
//   notification: NotificationModel;
// };

// const NotificationView = ({ notification }: Props) => {
//   const user: UserModel | null = getUserFromLocalStorage();
//   const dispatch = useDispatch();
//   const [notificationUser, setNotificationUser] = useState<NotificationUserModel | null>(null);
//   const notificationUsers = useSelector((state) => state.notifications.items); // Lấy danh sách thông báo từ Redux

//   useEffect(() => {
//     const fetchNotificationUser = async () => {
//       if (user) {
//         const notificationUserItem = notificationUsers.find(item => item.notification.id === notification.id);
//         setNotificationUser(notificationUserItem || null);
//       }
//     };
  
//     fetchNotificationUser();
//   }, [user, notification, notificationUsers]);

//   const handleRead = async () => {
//     if (user) {
//       await markNotificationAsRead(notification.id, user.id);
//       dispatch(markAsRead(notification.id)); // Gọi action để đánh dấu là đã đọc
//     }
//   };

//   return (
//     <MenuItem 
//       onClick={handleRead}
//       style={{ backgroundColor: notificationUser?.isRead ? 'white' : 'grey' }}
//     >
//       <Box sx={{ width: '100%' }}>
//         <Typography variant="body2">{notification.content}</Typography>
//         <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'flex-end', right: 0 }}>
//           {new Date(notification.notificationTime).toLocaleDateString()} {new Date(notification.notificationTime).toLocaleTimeString()}
//         </Typography>
//       </Box>
//     </MenuItem>
//   );
// };

// export default NotificationView;