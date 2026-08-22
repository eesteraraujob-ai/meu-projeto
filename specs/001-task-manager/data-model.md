# Data Model

## Entity: Task

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | string | Required, unique | Internal identifier for the task |
| title | string | Required, non-empty | Short task name |
| description | string | Optional | Additional task details |
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
| dueDate | string or null | Optional | Selected date filter |

## Relationships

- A user manages many tasks.
- Each task belongs to a single user context in the local app state.
- A task can move through the statuses pending, in progress, and completed.

## Validation Rules

- Title MUST be present before a task can be saved.
- Priority MUST be one of the supported values.
- Status MUST be one of the allowed states.
- Due date MUST be stored in a consistent ISO format for easy sorting and filtering.
- Task status changes MUST update the modified timestamp.

## State Transitions

- pending -> in_progress
- in_progress -> completed
- pending -> completed
- in_progress -> pending
- completed -> pending or in_progress if the user reopens the task

## Local Storage Model

The SQLite table should store the fields above in a single tasks table, with simpler structure and direct SQL access for read and write operations.
