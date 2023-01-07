import { Article } from "./Article";

export class Museum{
  id?:number;
  address: string;
  name:string;
  type:string;

  constructor() {
    this.name = '';
    this.type = '';
    this.address = '';
  }
}
