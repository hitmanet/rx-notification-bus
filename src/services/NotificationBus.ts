import { nanoid } from "nanoid";
import { mapTo, race, Subject, tap, timer } from "rxjs"

export type Notification = { name: string; id: string; timeout: number }

type Action = { type: 'ADD'; data: Notification } | { type: 'REMOVE'; id: string };

export const createNotificationBus = () => {
  const subject = new Subject<Action>();

  return {
    subscribe: (handler: (a: Action) => void) => subject.pipe(tap(handler)).subscribe(),
    addNotification: (n: Pick<Notification, 'name' | 'timeout'>) => {
      const id = nanoid();
      subject.next({ type: 'ADD', data: { ...n, id }})
    },
    removeNotification: (id: string) => {
      subject.next({ type: 'REMOVE', id });
    },
  }
}
