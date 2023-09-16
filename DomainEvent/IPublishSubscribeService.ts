import { IEvent } from "./Event/IEvent";
import { ISubscriber } from "./Subscriber/ISubscriber";

export interface IPublishSubscribeService {
  publish (event: IEvent): void;
  subscribe (type: string, handler: ISubscriber): void;
  unsubscribe (type: string, handler: ISubscriber): void;
}
