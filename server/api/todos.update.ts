import { useTurso } from '../utils/turso'
import { z } from 'zod'

const updateTodoSchema = z.object({
  id: z.number(),
  completed: z.number()
})

export default defineEventHandler(async (event) => {
  const client = useTurso(/* event */)

  // const result = await readBody(event)

  // console.log('result', result)

  const result = await readValidatedBody(event, body => updateTodoSchema.safeParse(body))

  console.log('result', result) 

  if (!result.success)
    throw 'Invalid body in updateTodo post'

  console.log('result.data', result.data.completed)

  const { rows } = await client.execute(`update todos set completed = ${result.data.completed} where id = ${result.data.id} returning *`)

  if (rows.length === 0)
    throw 'Failed to insert todo'

  const { rows: allRows } = await client.execute(`select * from todos`)

  return allRows
})