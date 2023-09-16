import { IEvent } from "./Event/IEvent";
import { IPublishSubscribeService } from "./IPublishSubscribeService";
import { ISubscriber } from "./Subscriber/ISubscriber";

export class PublishSubscribeService implements IPublishSubscribeService {
  private _registeredSubscriber = new Map<string, Array<ISubscriber>>();

  publish(event: IEvent): void {
    const type = event.type();
    const subscribers = this._registeredSubscriber.get(type);
    subscribers?.forEach(subscriber => subscriber.handle(event));
  }

  subscribe(type: string, handler: ISubscriber): void {
    if (this._registeredSubscriber.has(type)) {
      this._registeredSubscriber.get(type)!.push(handler);
    } else {
      this._registeredSubscriber.set(type, [handler]);
    }
  }

  unsubscribe(type: string, handler: ISubscriber): void {
    if (this._registeredSubscriber.has(type)) {
      const unsubscribed = this._registeredSubscriber.get(type)!.filter(
        subscriber => subscriber !== handler
      );
      this._registeredSubscriber.set(type, unsubscribed);
    }
  }
}
