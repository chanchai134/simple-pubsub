import { IEvent } from "../Event/IEvent";

export interface ISubscriber {
  handle(event: IEvent): void;
}
