import { User } from './User.js';
export class Reply {
  id: string;
  replys: Reply[] | null;
  replyer: User | null;
  content: string;

  constructor() {
    this.id = '';
    this.replyer = null;
    this.replys = null;
    this.content = '';
  }
}
