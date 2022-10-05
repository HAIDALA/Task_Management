import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as taskController from "./controllers/taskController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return new Response(`Redirecting to /tasks.`, {
      status: 303,
      headers: {
        "Location": "/tasks",
      },
    });
  } else if (url.pathname === "/tasks" && request.method === "POST") {
    return await taskController.addTask(request);
  } else if (url.pathname === "/tasks" && request.method === "GET") {
    return await taskController.viewTasks(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });