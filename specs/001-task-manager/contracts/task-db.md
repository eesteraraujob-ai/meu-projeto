# Task Database Contract

## Scope

This contract defines the local SQLite structure used by the task manager for personal daily task tracking.

## Table: tasks

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | TEXT | Yes | Unique task identifier |
| title | TEXT | Yes | Task title |
| description | TEXT | No | Optional description |
| due_date | TEXT | No | Target completion date in ISO format |
| priority | TEXT | Yes | low, medium, or high |
| status | TEXT | Yes | pending, in_progress, or completed |
| created_at | TEXT | Yes | Creation timestamp |
| updated_at | TEXT | Yes | Last change timestamp |

## Data behaviors

- The title field MUST be non-empty when creating or updating a task.
- The priority field MUST use a supported enum value.
- The status field MUST use a supported enum value.
- The due date, when present, MUST be stored in ISO form for stable sorting.
- The app MUST read and write through simple local database operations without external services.

## Query expectations

- Read all tasks ordered by due date or status as needed for display.
- Filter by priority, status, or date in the application layer.
- Update records when task properties change.
- Delete or archive tasks only if the product scope later expands beyond the initial version.
