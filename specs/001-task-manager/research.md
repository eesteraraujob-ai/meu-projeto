# Research

## Decision: Use Expo + Expo Router + expo-sqlite for a small mobile task manager

**Rationale**:
The requirement explicitly calls for TypeScript, React Native with Expo, Expo Router, and SQLite through expo-sqlite. This combination meets the need for a lightweight mobile application that runs on Expo Go while keeping the stack minimal and easy to maintain.

**Alternatives considered**:
- Native Android/iOS implementation: rejected because it would add platform-specific setup and complexity beyond a small personal task tracker.
- Firebase or remote database: rejected because the requirement specifies local SQLite storage and the app is intended to be simple and local-first.
- Full state-management library such as Redux or Zustand: rejected as unnecessary for a single-user app with a small data model and simple screen flow.

## Decision: Keep task management as a small local CRUD workflow

**Rationale**:
The feature focuses on daily task management and basic filters. A focused local CRUD flow is enough to satisfy the user story without adding multi-user, sync, or cloud features.

**Alternatives considered**:
- Multi-user collaborative task system: rejected because the feature description is personal and daily-use focused.
- Notification/reminder system: rejected for the initial version to stay within the project’s small scope.

## Decision: No automated tests for this version

**Rationale**:
The project constitution explicitly forbids automated test requirements for this project. Manual validation and code review are the approved quality gate for this version.

**Alternatives considered**:
- Minimal unit test setup: rejected because it conflicts with the constitution’s requirement to avoid automated test overhead for a very small project.

## Decision: Filter behavior will be local and UI-driven

**Rationale**:
The app can filter the task list in memory after reading tasks from SQLite, keeping implementation direct and easy to validate manually.

**Alternatives considered**:
- Server-side query layer or advanced filtering engine: rejected because the app is simple and local first.
