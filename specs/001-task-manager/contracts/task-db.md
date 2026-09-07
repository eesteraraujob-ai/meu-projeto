# Task Database Contract

## Scope

This contract defines the local SQLite structure used by the task manager for personal daily task tracking.

## Table: tasks

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | TEXT | Yes | Unique task identifier |
| title | TEXT | Yes | Task title |
| description | TEXT | No | Optional description |
| start_date | TEXT | No | Start date in ISO format |
| start_time | TEXT | No | Start time (`HH:MM`, 24h) |
| due_date | TEXT | No | Target completion date in ISO format |
| priority | TEXT | Yes | low, medium, or high |
| status | TEXT | Yes | pending, in_progress, or completed |
| created_at | TEXT | Yes | Creation timestamp |
| updated_at | TEXT | Yes | Last change timestamp |

## Table: app_settings

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| key | TEXT | Yes | Setting name, e.g. `theme`, `language` (primary key) |
| value | TEXT | Yes | Setting value, e.g. `light`/`dark`, `pt`/`en` |

A generic key/value store rather than fixed columns, since the set of app preferences is small and may grow without warranting a schema change each time. Reads default to the app's built-in default (`light` theme, `pt` language) when a key is absent; writes upsert (`INSERT ... ON CONFLICT DO UPDATE`).

## Data behaviors

- The title field MUST be non-empty when creating or updating a task.
- The priority field MUST use a supported enum value.
- The status field MUST use a supported enum value.
- The start date and due date, when present, MUST each be stored in ISO form for stable sorting.
- `start_date` and `start_time` were added to an already-shipped table; `initializeDb()` MUST migrate existing installs by adding any missing column (`CREATE TABLE IF NOT EXISTS` alone does not alter an existing table).
- The app MUST read and write through simple local database operations without external services.

## Query expectations

- Read all tasks ordered by status then due date, as needed for display.
- Filter by priority, status, or due-date scope (today, this week, overdue, no date) in the application layer, combining active filters with AND.
- Update records when task properties change.
- Delete a task permanently on user request; there is no archive or soft-delete in this version.
