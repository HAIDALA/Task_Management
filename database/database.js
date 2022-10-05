import { Pool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: "localhost",
  database: "test",
  user: "postgres",
  password: "Haydala123",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

export { executeQuery };