import { Box, MenuItem, Typography } from "@mui/material";
import { NotificationModel } from '../../models/notification.model';
import { getNotificationsByUserId, markNotificationAsRead } from "../../services/notification.service";
import { UserModel } from "../../models/user.model";
import { getUserFromLocalStorage } from "../../services/user.service";
import { NotificationUserModel } from "../../models/notification.user.model";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../dtos/responses/response.success";

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