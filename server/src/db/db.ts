import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Question } from '../model/Model.js';

type Data = { questions: Array<Question> };

const db = new Low(new JSONFile<Data>('./db.json'));
export async function push(question: Question) {
  await db.read();
  db.data ||= { questions: new Array<Question>() };
  db.data.questions.push(question);
  console.log(db.data);
  await db.write();
}
