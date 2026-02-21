import { useEffect, useState } from "react";
import { getNotificationRequest } from "../api/auth";

export const useNotification = () => {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notificationsData = await getNotificationRequest();
                setNotifications(notificationsData);
            } catch (err) {
                console.error("API Error - Fetching notifications failed:", err);
            }
        };
        fetchNotifications();
    }, []);

    return {
        notifications,
    }
}