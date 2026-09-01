import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { subscribeToNotifications, type AppNotification } from '../services/notifications';

export function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }
    return subscribeToNotifications(user.uid, setNotifications);
  }, [user]);

  const unread = notifications.filter((item) => !item.read).length;

  return (
    <button className="notification-bell" aria-label={`${unread} unread notifications`} title="Notifications">
      🔔 {unread > 0 && <span>{unread}</span>}
    </button>
  );
}
