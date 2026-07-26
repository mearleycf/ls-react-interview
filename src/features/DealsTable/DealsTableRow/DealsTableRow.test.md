# Tests for DealsTableRow.tsx

These are the tests I would want to write for this component, if I had the time.

- renders institution, deal type, formatted currency, and Yes/No for published state
- clicking Delete calls removeDeal with the correct id
- clicking Publish/Unpublish calls updateDeal with the correct id and toggled value
- Delete/Publish buttons disable while their mutation is pending
- a successful delete or publish invalidates the deals query
