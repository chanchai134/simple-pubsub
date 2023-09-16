import { Machine } from "../Entity/Machine";

export interface IMachineRepository {
  add(machine: Machine): boolean;
  findById(id: string): Machine | undefined;
  delete(id: string): boolean;
}
