import { User } from "./User"
export class Reply {
  id: String;
  replys: Reply[] | null;
  replyer: User | null;
  content: String;

  constructor() {
    this.id = '';
    this.replyer = null;
    this.replys = null;
    this.content = '';
  }
}