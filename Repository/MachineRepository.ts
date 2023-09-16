import { Machine } from "../Entity/Machine";
import { IMachineRepository } from "./IMachineRepository";

export class MachineRepository implements IMachineRepository {
  private _machines = new Map<string, Machine>();

  add(machine: Machine): boolean {
    if(this._machines.has(machine.id)) return false;
    this._machines.set(machine.id, machine);
    return true;
  }

  findById(id: string): Machine | undefined {
    return this._machines.get(id);
  }

  delete(id: string): boolean {
    return this._machines.delete(id);
  }
}