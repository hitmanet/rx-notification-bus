import React, { useEffect } from 'react';
import { timer } from 'rxjs';
import { useBus } from './BusProvider';
import { Notification } from './services/NotificationBus';

type Props = {
  notification: Notification;
};

export const NotificationView: React.FC<Props> = ({ notification }) => {
  const bus = useBus();

  useEffect(() => {
    const subscription = timer(notification.timeout).subscribe({
      next: () => bus.removeNotification(notification.id),
    });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {notification.name}
    </div>
  )
}