import React, { useEffect, useState } from 'react';
import './App.css';

import { createNotificationBus, Notification } from './services/NotificationBus';
import { BusProvider } from './BusProvider';
import { NotificationView } from './NotificationView';

const bus = createNotificationBus();

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const { unsubscribe } = bus.subscribe((a) => {
      if (a.type === 'ADD') {
        setNotifications((n) => [...n, a.data]);
      }

      if (a.type === 'REMOVE') {
        setNotifications((n) => n.filter((n) => n.id !== a.id))
      }
    });

    for(let i = 0; i <= 3; i++) {
      bus.addNotification({ timeout: (i + 2) * 1000, name: `${Math.random()}` });
    };

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(notifications)

  return (
    <div className="App">
      <BusProvider bus={bus}>
        {notifications.map((n) => <NotificationView key={n.id} notification={n} />)}
      </BusProvider>
    </div>
  );
}

export default App;
