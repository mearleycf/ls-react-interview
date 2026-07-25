import { http, HttpResponse } from "msw";
import { DealType } from "../types";
import dbSeed from "../../db.json";

let deals: DealType[] = [...dbSeed.deals];

/*
{
  "id": 1, // optional number
  "institution": "LS Credit Union", // string
  "dealSize": "1000000", // string
  "dealType": "Consumer Auto", // string
  "isPublished": true // boolean
}
*/

export const handlers = [
  http.get("/deals", () => {
    return HttpResponse.json(deals);
  }),
  http.post("/deals", async ({ request }) => {
    const newDeal = (await request.json()) as Omit<DealType, "id">;
    /* ternary: mock json-server POST id assignment;
    if deals is an empty array, it will resolve to -Infinity, so set the id to 1;
    otherwise, map all ids in deals and obtain the largest, then add 1; ?? gives us a fallback in case any d.id value is undefined
     */
    const nextId =
      deals.length > 0 ? Math.max(...deals.map((d) => d.id ?? 0)) + 1 : 1;
    const created: DealType = { ...newDeal, id: nextId };
    deals = [...deals, created];
    return HttpResponse.json(created, { status: 201 });
  }),
  http.patch("/deals/:id", async ({ params, request }) => {
    const updates = (await request.json()) as Partial<DealType>;
    const deal = deals.find((d) => d.id === Number(params.id)); // params.id is a string; convert to match DealType
    if (!deal) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    Object.assign(deal, updates);
    return HttpResponse.json(deal);
  }),
  http.delete("/deals/:id", ({ params }) => {
    deals = deals.filter((d) => d.id !== Number(params.id)); // params.id is a string; convert to match DealType
    return new HttpResponse(null, { status: 200 });
  }),
];
