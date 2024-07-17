import { useTurso } from '../utils/turso'

export default defineEventHandler(async (event) => {
  const client = useTurso(/* event */)
  const { rows } = await client.execute("select * from todos")

  return rows
})