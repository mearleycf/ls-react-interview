# Attack Plan

- [x] Add `@testing-library/jest-dom` (matchers) and `@testing-library/user-event` (realistic interaction simulation); wire up `src/setupTests.ts`
- [ ] Create tests (acceptance-level: validation errors, remove, publish, sort)
  - Note: written before RJSF exists, so these are best guesses at error text/behavior. Expect to reconcile assertions with RJSF's actual output (AJV default messages, or whatever's overridden via `customValidate`/`uiSchema`) once step 4 lands — not a planning flaw, just the normal cost of tests-first.
  - Note: remove/publish tests written here are provisional. `src/tests/utils.tsx` currently wraps renders in a Redux `<Provider>`, so these will pass against that setup for now — but if TanStack Query is chosen at the decision point below, the wrapper becomes a `QueryClientProvider` and these tests likely need rewriting (different mocking strategy: MSW intercepting `fetch` vs. asserting against a Redux store). Sort/validation tests aren't affected by this since they don't touch the state-management layer.
- [ ] Add fetch calls for GET/PUT/POST/DELETE — interfaces for the json-server calls
  - Note: this is really a small API module (`getDeals`, `createDeal`, `updateDeal`, `deleteDeal` wrapping `fetch`), not Redux-style middleware — worth keeping the vocabulary precise for the debrief.
- [ ] Add sort functionality
- [ ] Integrate RJSF, then add in validation

> Checkpoint: Task 1 (validation) and Task 4 (sort) done. Data-layer functions in place to support Tasks 2/3 (remove/publish). Bonus 1 (json-server persistence) underway, Bonus 2 (tests) started.

- [ ] Decide: TanStack Query, or stick with Redux, for remove/publish
- [ ] If TanStack Query: remove redux functionality
- [ ] If TanStack Query: implement remove and publish using TanStack Query
- [ ] If not: implement remove and publish using Redux
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

## Sources

- https://create-react-app.dev/docs/running-tests/
