import { useTurso } from '../utils/turso'
import { z } from 'zod'

const addTodoSchema = z.object({
  text: z.string(),
})

export default defineEventHandler(async (event) => {
  const client = useTurso(/* event */)

  const result = await readValidatedBody(event, body => addTodoSchema.safeParse(body))

  if (!result.success)
    throw 'Invalid body in addTodo post'

  console.log('result.data', result.data.text)

  const { rows } = await client.execute(`insert into todos (text, completed) values ('${result.data.text}', false) returning *`)

  if (rows.length === 0)
    throw 'Failed to insert todo'

  const { rows: allRows } = await client.execute(`select * from todos`)

  return allRows
})