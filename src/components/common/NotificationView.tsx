import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import { NotificationModel } from '../../models/notification.model';
import { deleteNotificationUser, getNotificationsByUserId, markNotificationAsRead } from "../../services/notification.service";
import { UserModel } from "../../models/user.model";
import { getUserFromLocalStorage } from "../../services/user.service";
import { NotificationUserModel } from "../../models/notification.user.model";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../dtos/responses/response.success";
import { useDispatch } from "react-redux";
import { removeNotification, updateNotificationStatus } from "../../redux/reducers/notification.reducer";
import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  notification: NotificationModel;
}

const NotificationView = ({ notification }: Props) => {
  const user: UserModel | null = getUserFromLocalStorage();
  const [notificationUser, setNotificationUser] = useState<NotificationUserModel | null>(null);
  const dispatch = useDispatch();


  const handleRead = async (notification: NotificationModel, userId: number) => {
    console.log("Mark as read");
    try {
      await markNotificationAsRead(notification.id, userId);
      setNotificationUser((prev) => prev ? { ...prev, isRead: true } : null);
      dispatch(updateNotificationStatus({ id: notification.id, isRead: true }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchNotificationUser = async () => {

      if (user && notification) {
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
  }, []); // Thêm notification vào dependencies

  const handleDelete = async () => {
    console.log("Delete notification");
    try {
      await deleteNotificationUser(notification.id, user!.id!);
      dispatch(removeNotification(notification.id));
      console.log("Delete notification successfully");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box>
      <MenuItem
        onClick={() => user && handleRead(notification, user.id)}
        style={{ backgroundColor: notificationUser?.isRead ? 'white' : '#cccccc' }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, width: '100%' }}> 
            <Typography variant="body2">{notification.content}</Typography>
            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'flex-end', right: 0 }}>
              {new Date(notification.notificationTime).toLocaleDateString()} {new Date(notification.notificationTime).toLocaleTimeString()}
            </Typography>
          </Box>
          <IconButton onClick={handleDelete}>
            <ClearIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </MenuItem>
    </Box>
  );
};

export default NotificationView;