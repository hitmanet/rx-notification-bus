import { createContext, useContext } from "react";
import { createNotificationBus } from "./services/NotificationBus";

type Context = ReturnType<typeof createNotificationBus> | null;

const BusContext = createContext<Context>(null);

export const useBus = () => {
  const bus = useContext(BusContext);

  if (bus === null) {
    throw new Error('Bus is not defined. Check your provider');
  }

  return bus;
}

export const BusProvider: React.FC<{ bus: Context }> = ({ bus, children }) => {
  return (
    <BusContext.Provider value={bus}>
      {children}
    </BusContext.Provider>
  )
}