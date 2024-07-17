import { useTurso } from '../utils/turso'
import { z } from 'zod'

const updateTodoSchema = z.object({
  id: z.number(),
})

export default defineEventHandler(async (event) => {
  const client = useTurso(/* event */)

  // const result = await readBody(event)

  // console.log('result', result)

  const result = await readValidatedBody(event, body => updateTodoSchema.safeParse(body))

  console.log('result', result) 

  if (!result.success)
    throw 'Invalid body in delete post'

  console.log('result.data', result.data.id)

  const { rows } = await client.execute(`delete from todos where id = ${result.data.id} returning *`)

  if (rows.length === 0)
    throw 'Failed to delete todo'

  const { rows: allRows } = await client.execute(`select * from todos`)

  return allRows

})