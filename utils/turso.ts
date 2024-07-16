import { createClient } from "@libsql/client";
// You can optionally pass in the event to useRuntimeConfig
// import { H3Event } from "h3";

export function useTurso() {
  const { turso } = useRuntimeConfig();

  console.log(process.env)

  console.log(process.env.NUXT_TURSO_DATABASE_URL)

  return createClient({
    url: process.env.NUXT_TURSO_DATABASE_URL!,
    authToken:process.env.NUXT_TURSO_AUTH_TOKEN!,
  });
}