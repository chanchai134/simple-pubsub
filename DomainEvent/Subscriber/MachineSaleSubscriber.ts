import { IMachineRepository } from "../../Repository/IMachineRepository";
import { LowStockWarningEvent } from "../Event/LowStockWarningEvent";
import { MachineSaleEvent } from "../Event/MachineSaleEvent";
import { IPublishSubscribeService } from "../IPublishSubscribeService";
import { ISubscriber } from "./ISubscriber";

export class MachineSaleSubscriber implements ISubscriber {
  constructor(
    private _pubSubService: IPublishSubscribeService,
    private readonly _threshold: number,
    private _machineRepository: IMachineRepository
  ) {}

  handle(event: MachineSaleEvent): void {
    const targetMachine = this._machineRepository.findById(event.machineId());
    if (targetMachine !== undefined) {
      const before = targetMachine.stockLevel;
      try {
        targetMachine.sale(event.getSoldQuantity())
        console.log(`[${targetMachine.id}-${event.type()}]\tstock from ${before} to ${targetMachine.stockLevel}`);
        this._notifyLowStock(targetMachine.id, before, targetMachine.stockLevel);
      } catch {
        console.log(`[${targetMachine.id}-${event.type()}]\t(REJECT) have ${before} need to sell ${event.getSoldQuantity()}`);
      }
    }
  }

  private _notifyLowStock(machineId: string, stockBefore: number, stockAfter: number): void {
    if(stockBefore >= this._threshold && stockAfter < this._threshold) {
      this._pubSubService.publish(new LowStockWarningEvent(machineId, this._threshold));
    }
  }
}
