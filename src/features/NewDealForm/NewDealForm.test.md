# Tests for NewDealForm.tsx

These are the tests I would want to write for this component, if I had the time.

- renders Institution, Deal Type, and Deal Size fields with correct labels
- shows a validation error when Institution is submitted empty
- shows a validation error when Deal Size is zero or negative
- shows a validation error when Deal Size is left empty
- submits successfully when all fields are valid, calling addDeal with the correct payload
- resets the form to empty after a successful submission
- disables the submit button while the mutation is pending
- shows an error message if the create mutation fails
- computes the next id from the current deals in the query cache
