import { NotifyEvent } from "./NotifyEvent";

export class LowStockWarningEvent extends NotifyEvent {
  constructor(
    machineId: string,
    private readonly _stockQuantityThreshold: number
  ) {
    super(machineId);
  }
  
  getMessage(): string {
    return `stock below ${this._stockQuantityThreshold}`;
  }
}
