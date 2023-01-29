import { Low, JSONFile } from '@commonify/lowdb';
import { User, Reply, Question } from '../model/Model';

type Data = { "questions": Array<Question> }

const db = new Low(new JSONFile<Data>('./db.json'));
export async function push(question: Question) {
  await db.read();
  db.data ||= { "questions": new Array<Question>() };
  db.data.questions.push(question);
  console.log(db.data);
  await db.write();
}
