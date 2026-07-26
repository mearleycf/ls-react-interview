# Loan Street React Interview

## Plan of Attack to Complete Tasks / Tasks to Complete

- [x] Add `@testing-library/jest-dom` (matchers) and `@testing-library/user-event` (realistic interaction simulation); wire up `src/setupTests.ts`
- [x] Build out MSW server.ts and handlers.ts for being able to make mock service calls for tests
- [ ] Create tests (acceptance-level: validation errors, remove, publish, sort)
  - Note: written before RJSF exists, so these are best guesses at error text/behavior. Expect to reconcile assertions with RJSF's actual output (AJV default messages, or whatever's overridden via `customValidate`/`uiSchema`) once step 4 lands — not a planning flaw, just the normal cost of tests-first.
  - Note: remove/publish tests written here are provisional. `src/tests/utils.tsx` currently wraps renders in a Redux `<Provider>`, so these will pass against that setup for now — but if TanStack Query is chosen at the decision point below, the wrapper becomes a `QueryClientProvider` and these tests likely need rewriting (different mocking strategy: MSW intercepting `fetch` vs. asserting against a Redux store). Sort/validation tests aren't affected by this since they don't touch the state-management layer.
- [x] Add fetch calls for GET/PUT/POST/DELETE — interfaces for the json-server calls
  - Note: this is really a small API module (`getDeals`, `createDeal`, `updateDeal`, `deleteDeal` wrapping `fetch`), not Redux-style middleware — worth keeping the vocabulary precise for the debrief.
- [x] Add sort functionality
- [ ] Integrate RJSF, then add in validation

> Checkpoint: Task 1 (validation) and Task 4 (sort) done. Data-layer functions in place to support Tasks 2/3 (remove/publish). Bonus 1 (json-server persistence) underway, Bonus 2 (tests) started.

- [x] Decide: TanStack Query, or stick with Redux, for remove/publish
- [x] If TanStack Query: remove redux functionality
- [x] If TanStack Query: implement remove and publish using TanStack Query
- [ ] Decide: shadcn, or another approach, for "pretty up the table styling"
- [ ] Implement table styling accordingly

## Work Done

- [x] Installed @testing-library/dom, @testing-library/jest-dom, @testing-library/user-event (first two per CRA instructions, last as easier than using fireEvent)
- [x] created src/setupTests.ts as method for avoiding boilerplate in every test file
- [x] renamed `index.tests.tsx` to `index.test.tsx` due to improper CRA naming convention--jest/CRA look for .test, not .tests so .tests is failing to match patterns
- [x] changed `<div class='tile--header'>` to be `<h2>` instead, for accessibility and testing
- [x] wrote basic test to find heading 'Deal Portfolio' just to exercise testing platform and practice writing test script
- [x] upgraded typescript to v5.x.x to resolve library issues with @testing-library/jest-dom that required a version of TS >= 4.5.x
- [x] added trunk.yaml to .gitignore
- [x] detached repository from upstream loanstreet repository so i don't accidentally keep attempting to merge upstream with pull requests
- [x] yarn add -D msw; added MSW so tests exercise real fetch calls like our components; they are intercepted at the network layer and answered with realistic mock responses instead of either mocking fetch away entirely, or depenting on a live json-server process being up during test runs.
- [x] handlers.ts to start mocking out mock services for test api handling (part of msw)
- [x] server.ts for mocking out servers for test api handling (part of msw)
- [x] added proxy to package.json
- [x] wrote handler for http.get for msw handler
- [x] wrote handler for http.post for msw; use reassignment of 'deals' to new array to avoid mutating existing deals array; react and redux rely on shallow checks of array mutation (i.e. did a ref change). By matching convention we stay consistent within app and avoid potential issues downstream. Also, immutable vars is generally better code.
- [x] wrote handler for http.patch for msw; convert params.id to number
- [x] wrote handler for http.delete for msw; convert params.id to number
- [x] started fetch.ts file
- [x] wrote 'request' function with generic `<T>` type param so that all subsequent calls can use the same request function and return a correctly typed result via a returned `Promise<T>`
  - note: the `options?: RequestInit` use here represents the set of options that can be used to configure a fetch request; for my purposes, we're using it for method, headers, and body. Basically it's a way to tell typescript that we're going to optionally pass in some fetch params, depending on the call we are making.
- [x] wrote getDeals endpoint
- [x] wrote addDeal endpoint
- [x] wrote udpateDeal endpoint
- [x] wrote removeDeal endpoint
- [x] move to DealsTable.tsx, start defining types for sorting;
  - SortableField gives us 4 values to sort on
  - SortState gives us an object with 2 keys--key and direction--or a null option
  - SortIndicator gives us two keys--ariaSort and iconDirection--and the two keys have 3 sets of paired values that equate to ascending/up, descending/down, and none/undefined
- [x] implement useState for storing sort states
- [x] write handleSort function; takes previous sort state value, if any, and reverses it; otherwise returns ascending if no previous sort value
- [x] write sortedDeals function; !!! need to explain what this function is doing !!!
- [x] wrote getSortIndicator function; takes a sortable field and sets the sort indicator based on what the sortState direction values are
- [x] wrote vars for sorting the columns; just a quick way to shorten what is needed in the html elements
- [x] rewrote the `<th>` elements to have `aria-sort` attributes that use the appropriate var and method's return property to set the sort icon direction to be displayed.
- [x] implemented the `<button>` for the sort; used button because it is semantic, since sorting is a click action, and using a button gives us accessibility for free
- [x] going with tanstack query; work is more trivial at this point, because we implemented fetch and we used useState for sort functionality
- [x] installed tanstack query@4
- [x] rewrite src/index.tsx to use tanstack query instead of redux; now any child of App can call useQuery/useMutation/useQueryClient. App cache lives on queryClient now, instead of on Redux store.
- [x] deleted DealsTableContainer.tsx; redux file, not needed
- [x] deleted NewDealFormContainer.tsx; redux file, not needed
- [x] updated DealsTable.tsx to use tanstack query; removed props, added a constant to deconstruct deals, isLoading, isError, and error from useQuery and getDeals
- [x] wrote if statements to handle loading and error states for below the heading, while the table is loading, or when the table fails to load
- [x] updated App.tsx to remove refs to DealsTableContainer and NewDealFormContainer
- [x] removed lodash import; not used anymore
- [x] removed DealFormProps; component doesn't take props with Tanstack query
- [x] updated DealForm to use tanstack query; deconstructed createDeal, isLoading, isError, error from useMutation
- [x] moved onSubmit call to form element, because natively the button has no type attribute (defaults to submit inside a form). So, in a form, clicking an untyped button, where the form does not have an onSubmit handler, will cause the mutation (call addDeal) AND also cause a full page reload. Moving onSubmit to form means we call addDeal without reloading the page; it also means pressing Enter from any form field will trigger the addDeal onSubmit.
- [x] made button a little more user friendly; disabled while isLoading, change button text to Creating...
- [x] added error handling
- [x] tested json-server/fetch functionality by adding new deal; deal successfully added to db.json, although ID was wrong...added a second one to validate that enter key triggers Create Deal button successfully, which it did...
- [x] moved to DealsTableRow to stub out Delete and Publish/Unpublish functionality as actions in a new column
- [x] wired up tanstack useMutation for removeDeal and updateDeal; renamed the mutate and isPending destructures so they don't collide since I have multiple instances of useMutation
- [x] added onClick and disabled attributes to the appropriate buttons on DealsTableRow.tsx to enable Delete and Publish/Unpublish functionality
- [x] installed RJSF/core, RJSF/utils, RJSF/validator-ajv8
- [x] downgraded RJSF to v5.24.13, and upgraded React/dom to v16.14.0, for compatibility reasons
- [x] did a pass to remove any remaining traces of redux from package.json, other files, etc.

## Sources

- [https://create-react-app.dev/docs/running-tests/](Create React App - Running Tests)
- [https://www.npmjs.com/package/msw](MSW - Mock Service Workers)
- [https://developer.mozilla.org/en-US/docs/Web/API/RequestInit](RequestInit type in Web APIs)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204](Response Code 204 No Content)
- [https://ui.shadcn.com/docs/components/aria/table](Shadcn UI React Aria Table Component)
- [https://rjsf-team.github.io/react-jsonschema-form/docs/#installation](React-JSON-Schema-Form)
