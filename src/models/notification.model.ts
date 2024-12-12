import { Scope } from "./voucher.model";

export type NotificationModel = {
    id: number;
    content: string;
    notificationTime: Date;
    scope: Scope;
    isRead?: boolean;
}