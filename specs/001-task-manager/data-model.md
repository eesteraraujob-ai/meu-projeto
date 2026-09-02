# Data Model

## Entity: Task

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | string | Required, unique | Internal identifier for the task |
| title | string | Required, non-empty | Short task name |
| description | string | Optional | Additional task details |
| startDate | string | Optional | ISO date representing when work on the task begins |
| startTime | string | Optional | Time of day (`HH:MM`, 24h) paired with startDate |
| dueDate | string | Optional | ISO date representing completion or target date |
| priority | string | Required | Values: low, medium, high |
| status | string | Required | Values: pending, in_progress, completed |
| createdAt | string | Required | ISO timestamp for creation |
| updatedAt | string | Required | ISO timestamp for latest modification |

## Entity: TaskFilter

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| priority | string or null | Optional | Selected priority filter |
| status | string or null | Optional | Selected status filter |
| dueDateScope | string | Optional, one of: `all`, `today`, `this_week`, `overdue`, `none` | Selected date filter; `all` means no date narrowing |

Active filters combine with AND: a task must match every non-`all` filter to appear in the list.

## Relationships

- A user manages many tasks.
- Each task belongs to a single user context in the local app state.
- A task can move through the statuses pending, in progress, and completed.

## Validation Rules

- Title MUST be present before a task can be saved.
- Priority MUST be one of the supported values (`low`, `medium`, `high`); the UI MUST constrain input to these values rather than accepting free text.
- Status MUST be one of the allowed states (`pending`, `in_progress`, `completed`); the UI MUST constrain input to these values rather than accepting free text.
- Start date and due date MUST each be stored in a consistent ISO format (`YYYY-MM-DD`) for easy sorting and filtering; invalid input is rejected rather than silently stored. Input MAY be entered as `DD/MM/YYYY` or `DD-MM-YYYY` and is normalized to ISO on save.
- Start date and due date are independent fields with no ordering constraint between them.
- Start time MUST be stored as `HH:MM` (24h); invalid input is rejected rather than silently stored. Start time has no meaning without a start date but the two are not cross-validated against each other.
- Task status changes MUST update the modified timestamp.
- A due date in the past is valid and MUST be preserved as-is; the app never modifies or clears it automatically.

## State Transitions

- pending -> in_progress
- in_progress -> completed
- pending -> completed
- in_progress -> pending
- completed -> pending or in_progress if the user reopens the task

## Local Storage Model

The SQLite table should store the fields above in a single tasks table, with simpler structure and direct SQL access for read and write operations.
