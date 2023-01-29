import { User } from './User.js';

export class Question {
  static builder() {
    return new Builder();
  }
  id: string;
  title: string;
  content: string;
  questioner: User | null;
  timeStamp = Date.now();
  constructor() {
    this.id = '';
    this.title = '';
    this.content = '';
    this.questioner = null;
  }
}

class Builder {
  private question = new Question();

  build() {
    return this.question;
  }

  id(id: string) {
    this.question.id = id;
    return this;
  }

  title(title: string) {
    this.question.title = title;
    return this;
  }

  content(content: string) {
    this.question.content = content;
    return this;
  }

  questioner(questioner: User) {
    this.question.questioner = questioner;
    return this;
  }
}
