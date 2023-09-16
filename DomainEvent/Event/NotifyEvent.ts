import { EventType } from "./EventType";
import { IEvent } from "./IEvent";

export abstract class NotifyEvent implements IEvent {
  constructor(private readonly _machineId: string) {}

  abstract getMessage(): string

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return EventType.NOTIFY;
  }
}
