import { createClient } from "@libsql/client";
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const todos = [
  { text: "do the dishes", completed: 0 },
  { text: "walk the dog", completed: 0 },
  { text: "buy groceries", completed: 0 },
  { text: "clean the house", completed: 1 },
  { text: "do laundry", completed: 0 },
]

async function main() {
  await client.execute(`create table if not exists todos (id integer primary key,text varchar (50) not null,completed integer not null)`)
  console.log("Migrated db!")

  const statements = [
    `create table if not exists todos (id integer primary key,text varchar (50) not null,completed integer not null)`,
    "delete from todos",
    ...todos.map((todo) => ({
      sql: "insert into todos(text, completed) values(?, ?)",
      args: [todo.text, todo.completed],
    })),
  ]

  await client.batch(statements, 'write')

  console.log("Seeded db")
}

main().catch(console.log)