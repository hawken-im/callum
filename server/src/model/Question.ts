import { User } from "./User"

export class Question {
  static builder() {
    return new Builder();
  };
  id: String;
  title: String;
  content: String;
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

  id(id: String) {
    this.question.id = id;
    return this;
  }

  title(title: String) {
    this.question.title = title;
    return this;
  }

  content(content: String) {
    this.question.content = content;
    return this;
  }

  questioner(questioner: User) {
    this.question.questioner = questioner;
    return this;
  }
}