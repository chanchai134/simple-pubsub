import { IMachineRepository } from "../../Repository/IMachineRepository";
import { MachineRefillEvent } from "../Event/MachineRefillEvent";
import { StockLevelOkEvent } from "../Event/StockLevelOkEvent";
import { IPublishSubscribeService } from "../IPublishSubscribeService";
import { ISubscriber } from "./ISubscriber";

export class MachineRefillSubscriber implements ISubscriber {
  constructor(
    private _pubSubService: IPublishSubscribeService,
    private readonly _threshold: number,
    private _machineRepository: IMachineRepository
  ) {}

  handle(event: MachineRefillEvent): void {
    const targetMachine = this._machineRepository.findById(event.machineId());
    if (targetMachine !== undefined) {
      const before = targetMachine.stockLevel;
      targetMachine.refill(event.getRefillQuantity());
      console.log(`[${targetMachine.id}-${event.type()}]\tstock from ${before} to ${targetMachine.stockLevel}`);
      this._notifyStockLevelOk(targetMachine.id, before, targetMachine.stockLevel);
    }
  }

  private _notifyStockLevelOk(machineId: string, stockBefore: number, stockAfter: number): void {
    if(stockBefore < this._threshold && stockAfter >= this._threshold) {
      this._pubSubService.publish(new StockLevelOkEvent(machineId, this._threshold));
    }
  }
}
