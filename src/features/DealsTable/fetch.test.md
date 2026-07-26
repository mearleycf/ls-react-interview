# Tests for fetch.ts

These are the tests I would want to write for this module, if I had the time.

- getDeals returns the parsed array from GET /deals
- addDeal posts the deal and returns the created record
- updateDeal sends a PATCH with the given partial update
- removeDeal sends a DELETE
- request<T> throws when response.ok is false
- request<T> returns undefined for a 204 without attempting to parse a body
