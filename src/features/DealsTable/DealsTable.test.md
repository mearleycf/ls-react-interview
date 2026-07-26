# Tests for DealsTable.tsx

These are the tests I would want to write for this component, if I had the time.

- shows a loading state while deals are being fetched
- shows an error state if the fetch fails
- renders all deals returned by the query
- clicking a column header sorts ascending, clicking again sorts descending
- clicking a different header resets sort to ascending on the new column
- sorts dealSize numerically, not lexicographically (regression test — this bit us for real early on)
- aria-sort reflects the active sort column and direction correctly; other columns report "none"
