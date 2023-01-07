import { Museum } from "./Museum";

export class Article{
  id?: number;
  name:string;
  description: string;
  damaged: boolean;
  museumId:number;

  constructor(){
    this.name = '';
    this.description = '';
    this.damaged = false;
    this.museumId = 0;
  }
}
