# Loan Street React Interview

## Plan of Attack to Complete Tasks / Tasks to Complete

- [x] Add `@testing-library/jest-dom` (matchers) and `@testing-library/user-event` (realistic interaction simulation); wire up `src/setupTests.ts`
- [x] Build out MSW server.ts and handlers.ts for being able to make mock service calls for tests
- [x] Create tests (acceptance-level: validation errors, remove, publish, sort)
  - Note: ended up only writing markdown documents stubbing out my recommendations for tests I would write, due to time constraints.
- [x] Add fetch calls for GET/PUT/POST/DELETE — interfaces for the json-server calls
  - Note: this is really a small API module (`getDeals`, `createDeal`, `updateDeal`, `deleteDeal` wrapping `fetch`), not Redux-style middleware — worth keeping the vocabulary precise for the debrief.
- [x] Add sort functionality
- [x] Integrate RJSF, then add in validation

> Checkpoint: Task 1 (validation) and Task 4 (sort) done. Data-layer functions in place to support Tasks 2/3 (remove/publish). Bonus 1 (json-server persistence) underway, Bonus 2 (tests) started.

- [x] Decide: TanStack Query, or stick with Redux, for remove/publish
- [x] If TanStack Query: remove redux functionality
- [x] If TanStack Query: implement remove and publish using TanStack Query
- [x] Implement Material UI for some quick, RJSF-compliant styling
- [x] Implement table styling accordingly

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
- [x] implemented json schema for new deal in newDealSchema.ts using RSJF
- [x] moved to NewDealForm.tsx; replaced old return statement with RJSF version returning the RJSF `<Form>` html tag.
- [x] added in UiSchema to add ui:placeholder values back in for the input fields
- [x] converted the deal type field from an input field to a select field with 4 options--consumer auto, real estate, commercial, and home equity--just because, to exercise the ui schema framework
- [x] installed react-number-format so we can do a currency mask on the deal size input
- [x] created CurrencyWidget.tsx to make a custom widget for RJSF that lets us have a currency mask for deal size
- [x] added CurrencyWidget to UiSchema in newDealSchema.ts
- [x] removed dead code from NewDealForm.tsx that wasn't needed after switching to RJSF
- [x] added bootstrap, RJSF uses it by default; then removed bootstrap, because I was wrong.
- [x] ran into an issue with RJSF 5.24.13, related to babel and Form.js; the fix, per Claude, was to downgrade RJSF to 5.24.5, which was the version that has the code necessary to not cause the error we are experiencing; performed the downgrade.
- [x] chose material UI (v4) for the styling task; it was one of the themes that works with RJSF, and it is the only theme where I liked how they styled their tables.
  - note: I had Claude do most of the implementation here--the work was a matter of importing material-ui components (e.g. TableRow, TableCell) and replacing the standard versions of those html elements (e.g. `<tr>`, `<td>`) with the react material ui versions. Grunt work, good work for the AI.
- [x] doing some basic freeform style riffing on the site; added the loanstreet wordmark based logo to replace the symbol only logo; used a gradient background for the background of the table header row; changed the actions text color to be a loanstreet green color; changed the submit button to be a loanstreet green color; changed row hover to be $RobinLight1 instead of the default dark slate blue it was; changed app background color to $Robin. Changed sort button colors to Ivory. Increased App--Header font size to 20px (1.25rem) instead of 14px--I didn't like how small it was...
- [x] had claude create markdown docs for each component, documenting a list of tests it recommends we write if we were going to write the tests, given more time.
- [x] had claude run sanity checks through whole application to find outstanding errors and resolve them;
  - found issue with yarn build, something something OpenSSL 3.0 vs. old w3ebpack MD4-hash incompatibility
  - found orphaned reference to `<LSLogo />`, removed it
  - found a real gap against task 1: validation was blocking submit, but no error text ever displayed. Turned out the browser's native HTML5 `required` validation was firing first and preempting RJSF's own AJV validation/error UI before it ever ran. Fixed with `noHtml5Validate` on the Form.
  - found (not fixed): deleting a row logs a "can't update state on an unmounted component" warning -- benign/no-op per React's own message, root cause is each DealsTableRow owning its own remove/publish mutations, so the mutation's own success-state update fires after the row that owns it has already unmounted. Real fix would be lifting those mutations to DealsTable; leaving as a known item given time constraints.

## End Result -- Task Implementations

### Add Validation

"Add validation so that a deal isn't created unless all fields are entered. Display errors when a field is missing or contains bad data according to the UX form fields design."

I chose to implement validation by implementing the package 'React-JSONSchema-Form' (aka RJSF). This allowed me to introduce validation and error handling in a fairly simple manner. I chose this solution because it is something I mentioned to Chris during my interview as a possible solution for JSON schema driven form creation; I thought it would be interesting to explore it here.

### Remove Deals

"Add ability to remove deals from the DealsTable (interface up to you)."

I had implemented calls to the json-server via fetch.ts, a new file. I added an 'Actions' column to the DealsTable, and then added 'Delete' and 'Publish/Unpublish' buttons to each row. The 'Delete' button calls 'removeDeal' and deletes the deal.

### Publish Deals

"Add ability to publish a deal from the DealsTable (interface up to you)."

I had implemented calls to the json-server via fetch.ts, a new file. I added an 'Actions' column to the DealsTable, and then added 'Delete' and 'Publish/Unpublish' buttons to each row. The 'Publish/Unpublish' button calls updateDeal and either publishes or unpublishes the deal.

### Sort Deal Rows

"Add ability to sort deal rows in ascending or descending order by clicking the header cell of the different fields by which you wish to order. You can find the SortIcon is in the assets folder."

I used SortIcon.tsx, useState, and useMemo to handle sorting. UseState allowed me to store the current sort state of the various columns. Specifically, it stores the column being sorted and the current sort direction. A handleSort function calls setSortState and uses a ternary to change the value from its current value to the opposite value. UseMemo is computed from 'deals' (the raw query data from tanstack) and sortState (what sort option the user clicked), and useMemo's value is only recomputed when either the 'deals' data or the sortState changes between renders. UseMemo lets us maintain sorts without having to re-render it, if other events (e.g. a delete button click) re-renders a different part of the page.
Splitting the data into two separate hooks--'deals' to store what the data actually is, and sortState to store how the user currently wants to arrange the data in the table--means that we can apply sortState's current value to the current data and always have a correctly rendered dataset. Displayed data won't go stale because we are attempting to store both data and its display order in a single store.

### (Bonus) Connect to Mock JSON Server

"Connect to the mock json server using the HTTP client of your choice so that any data that you manipulate saves into the db.json file."

I implemented a generic request function that accepts a generic `<T>` type, allowing me to pass any of the needed types from any of the GET/POST/PATCH/DELETE REST calls. I added a proxy property to package.json to route calls to the json-server address localhost:8000. Then I pointed all of the necessary event calls that need to get, add, edit, or delete data at the fetch.ts functionality, thus connecting to the mock json-server, and saving any data being manipulated into db.json.

### (Bonus) Write Tests

"Write tests for any of the requirements that you implement."

I originally set out to write tests at the beginning of my tasks, but ended up starting with fetch.ts instead. As we got further in the project, we started experiencing compatibility issues with create-react-app and the jest-dom findBy* functions. I pushed off testing until the end of the assignment, since it was bonus work. I ended up just brainstorming a list of tests I would ideally write with Claude, and listing those tests in markdown files colocated with the various component files.

### (Bonus) Improve Styling

"Pretty up the table styling."

I implemented Material UI v4, which was compatible with RJSF v5, the version I had to implement due to compatibility with React 16. I had Claude do most of the grunt work heavy lifting--i.e. converting generic html tags like `<tr>` to material ui specific react components like `<TableRow>`. Then I made some changes just because I liked how they looked--implemented a gradient on the table header row, using the colors from LoanStreet's logo. Changed the SortIcon.tsx button colors to Ivory. Replaced the LoanStreet logo-only version with the full logo+wordmark version of the logo. Changed the body background color to $Robin. Changed button colors to other theme.scss based design tokens.

## Sources

- [https://create-react-app.dev/docs/running-tests/](Create React App - Running Tests)
- [https://www.npmjs.com/package/msw](MSW - Mock Service Workers)
- [https://developer.mozilla.org/en-US/docs/Web/API/RequestInit](RequestInit type in Web APIs)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204](Response Code 204 No Content)
- [https://ui.shadcn.com/docs/components/aria/table](Shadcn UI React Aria Table Component)
- [https://rjsf-team.github.io/react-jsonschema-form/docs/#installation](React-JSON-Schema-Form)
