import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery("INSERT INTO tasks (name) VALUES ($name);", {
    name: name,
  });
};

const findAllNonCompletedTasks = async () => {
  let result = await executeQuery(
    "SELECT * FROM tasks WHERE completed = false;"
  );
  return result.rows;
};

export { create, findAllNonCompletedTasks };