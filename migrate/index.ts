import { createClient } from "@libsql/client";

const client = createClient({
  url: "libsql://nuxt-pinia-james0r.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjExNDU1MjcsImlkIjoiMTJlNTk0YzQtMjEzNC00MzBjLTllYzYtMzAzMzc4N2I1ZDc3In0.DE8MddDOcU9l3Im6TB8bF42GWZ7JNZSAUXCXcNYGNje5qAl8Y7-5HeVTrGXKS4HQIyH_TWJHbo12TD1hUoaECg"
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

  console.log(statements)

  await client.batch(statements, 'write')

  console.log("Seeded db")
}

main().catch(console.log)