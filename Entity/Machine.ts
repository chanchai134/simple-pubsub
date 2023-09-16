export class Machine {
  private _stockLevel: number;

  get stockLevel(): number {
    return this._stockLevel;
  }

  constructor (readonly id: string, stockLevel: number = 10) {
    this._stockLevel = stockLevel;
  }

  sale(quantity: number): void {
    if(quantity > this._stockLevel) throw new Error("insufficient stock");
    this._stockLevel -= quantity;
  }

  refill(quantity: number): void {
    this._stockLevel += quantity
  }
}
