# Tests for DealsTable.tsx

These are the tests I would want to write for this component, if I had the time.

- shows a loading state while deals are being fetched
- shows an error state if the fetch fails
- renders all deals returned by the query
- clicking a column header sorts ascending, clicking again sorts descending
- clicking a different header resets sort to ascending on the new column
- sorts dealSize numerically, not lexicographically (regression test — this bit us for real early on)
- aria-sort reflects the active sort column and direction correctly; other columns report "none"
- clicking a row's Delete calls removeDeal with that row's id, and a successful delete invalidates the deals query
- clicking a row's Publish/Unpublish calls updateDeal with that row's id and toggled isPublished value, and a successful call invalidates the deals query
- only the specific row being removed or toggled shows a disabled/pending state -- regression test for a real bug: remove/publish mutations live in DealsTable and are shared across all rows, so it's possible to accidentally disable every row's button instead of just the one in flight
