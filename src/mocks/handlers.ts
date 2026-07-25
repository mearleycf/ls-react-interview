import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/deals", () => {
    /* return mock array */
  }),
  http.post("/deals", async ({ request }) => {
    /* read body, return created object */
  }),
  http.patch("/deals/:id", async ({ params, request }) => {
    /* use params.id */
  }),
  http.delete("/deals/:id", ({ params }) => {
    /* use params.id */
  }),
];
