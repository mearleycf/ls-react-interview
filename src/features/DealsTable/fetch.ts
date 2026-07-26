import { DealType } from "../../types";

/**
 * Performs a `fetch` request and returns the parsed JSON response body,
 * centralizing HTTP-level error handling and empty-body handling so callers
 * don't have to repeat it at every call site.
 *
 * `fetch` only rejects its promise on network-level failures (e.g. the request
 * never reached a server); it does not throw for HTTP error statuses such as
 * 404 or 500. This wrapper checks `response.ok` itself and throws in that case,
 * so callers can rely on ordinary `try/catch` / `.catch()` handling regardless
 * of whether the failure was a network error or a server-returned error status.
 *
 * @typeParam T - The expected shape of the parsed response body.
 * @param url - The URL to request.
 * @param options - Standard `fetch` options (method, headers, body, etc.).
 * @returns A promise resolving to the parsed response body as `T`. Resolves to
 * `undefined` (cast to `T`) when the response status is `204 No Content`, since
 * there is no body to parse in that case.
 * @throws {Error} If the response status is outside the 200–299 range.
 */

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  // kick off the request, and wait for the response
  const response = await fetch(url, options);

  /** Note:
   * fetch does not throw an error on HTTP error statuses (e.g. 404). Fetch treats 'error'
   * responses (404, 500, etc) as successful responses, and treats them as such.
   * The Response object contains an ok key with a value of false. So this if statement tells
   * the function to treat a Response outside the 200-299 range as a failure.
   * Embed the status and statusText values into the Error object so downstream user can interpret
   * error cause.
   * */
  if (!response.ok) {
    throw new Error(`Request to ${url} failed: ${response.status}
      ${response.statusText}`);
  }

  /**
   * You cannot call .json() on a body-less response, and the 204 Response is deliberately
   * a body-less response.
   * It is used in instances when, for example, an item is deleted but the site wishes the
   * user to stay on page instead of navigate away.
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204
   */
  if (response.status === 204) {
    return undefined as T;
  }

  /**
   * Parse the Response body as JSON and resolve it.
   * Note: request<T> matching Promise<T> is a compile-time expectation, not a runtime check.
   * Typescript type checks do not exist in the runtime.
   */
  return response.json();
}

export const getDeals = () => request<DealType[]>("/deals");

export const addDeal = (deal: DealType) =>
  request<DealType>("/deals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deal),
  });

export const updateDeal = (id: number, updates: Partial<DealType>) =>
  request<DealType>(`/deals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

export const removeDeal = (id: number) =>
  request<void>(`/deals/${id}`, { method: "DELETE" });
