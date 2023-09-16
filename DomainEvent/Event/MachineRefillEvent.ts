import { IEvent } from "./IEvent";
import { EventType } from "./EventType";

export class MachineRefillEvent implements IEvent {
  constructor(private readonly _refill: number, private readonly _machineId: string) {}

  machineId(): string {
    return this._machineId;
  }

  getRefillQuantity(): number {
    return this._refill;
  }

  type(): string {
    return EventType.REFILL;
  }
}
