import { IMachineRepository } from "../../Repository/IMachineRepository";
import { NotifyEvent } from "../Event/NotifyEvent";
import { ISubscriber } from "./ISubscriber";

export class StockWarningSubscriber implements ISubscriber {
  constructor(private _machineRepository: IMachineRepository) {}

  handle(event: NotifyEvent): void {
    const targetMachine = this._machineRepository.findById(event.machineId());
    if (targetMachine !== undefined) {
      console.log(`[${targetMachine.id}-${event.type()}]\t${event.getMessage()}`);
    }
  }
}
