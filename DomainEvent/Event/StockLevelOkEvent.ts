import { NotifyEvent } from "./NotifyEvent";

export class StockLevelOkEvent extends NotifyEvent {
  constructor(
    machineId: string,
    private readonly _stockQuantityThreshold: number
  ) {
    super(machineId);
  }
  
  getMessage(): string {
    return `stock greater than or equal to ${this._stockQuantityThreshold}`;
  }
}
