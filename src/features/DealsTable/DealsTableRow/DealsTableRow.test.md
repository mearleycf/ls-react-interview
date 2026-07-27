# Tests for DealsTableRow.tsx

These are the tests I would want to write for this component, if I had the time.

Note: remove/publish mutations were lifted up to DealsTable (to fix a
"state update on an unmounted component" warning when a deleted row's
own mutation tried to update state after the row itself unmounted), so
this component is now presentational -- it just calls the callbacks
it's given and reflects the pending state it's given, rather than
owning the mutations itself.

- renders institution, deal type, formatted currency, and Yes/No for published state
- clicking Delete calls the onRemove callback
- clicking Publish/Unpublish calls the onTogglePublish callback
- Delete button is disabled when isRemoving is true
- Publish/Unpublish button is disabled when isToggling is true
