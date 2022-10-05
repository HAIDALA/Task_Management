import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as taskService from "../services/taskService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addTask = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await taskService.create(name);

  return redirectTo("/tasks");
};

const viewTasks = async (request) => {
  const data = {
    tasks: await taskService.findAllNonCompletedTasks(),
  };

  return new Response(await renderFile("tasks.eta", data), responseDetails);
};

export { addTask, viewTasks };