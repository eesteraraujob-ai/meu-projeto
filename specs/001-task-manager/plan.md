# Implementation Plan: Task Manager

**Branch**: 001-task-manager | **Date**: 2026-08-22 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from /specs/001-task-manager/spec.md

## Summary

The feature will deliver a lightweight mobile task manager for daily activities using TypeScript, React Native and Expo, with minimal dependencies and SQLite persistence. Users can create, edit, filter, and update tasks across pending, in progress, and completed states, while keeping the experience simple enough for quick daily use.

## Technical Context

**Language/Version**: TypeScript with Expo-managed React Native runtime

**Primary Dependencies**: Expo, Expo Router, expo-sqlite, React Native, React

**Storage**: SQLite via expo-sqlite for local task persistence

**Testing**: No automated tests in this version, by project constitution and user requirement

**Target Platform**: Expo Go compatible mobile application

**Project Type**: Mobile app

**Performance Goals**: Fast local interactions with task lists and filters under normal mobile usage

**Constraints**: Minimal dependencies, simple navigation, local-first storage, small and readable codebase, no automated test suite for this version

**Scale/Scope**: Single-user personal task tracker with a small list of tasks and basic filtering

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Pass: The project remains intentionally small and focused on a single user outcome.
- Pass: Simplicity is the default; no speculative or unnecessary features are included.
- Pass: No automated tests are required in this version, matching the project constitution.
- Pass: Local SQLite persistence is appropriate and simple for the requested scope.
- Pass: The design keeps the codebase readable, direct, and easy to validate manually.

## Project Structure

### Documentation (this feature)

```text
specs/001-task-manager/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── task-db.md
├── checklist/
│   └── requirements.md
└── spec.md
```

### Source Code (repository root)

```text
app/
├── _layout.tsx
├── index.tsx
├── profile.tsx
├── task/[id].tsx
components/
├── TaskForm.tsx
├── TaskList.tsx
├── FilterBar.tsx
├── TaskCard.tsx
constants/
├── priorities.ts
├── statuses.ts
contexts/
├── ThemeContext.tsx
├── LanguageContext.tsx
db/
├── index.ts
├── tasks.ts
├── settings.ts
lib/
├── date.ts
├── theme.ts
├── i18n.ts
types/
├── task.ts
```

**Structure Decision**: A minimal single-app Expo structure with local SQLite database access and lightweight UI components is sufficient for the feature and aligns with the constitution's simplicity requirement. Filter state and list filtering are plain component state plus a memoized derivation, not a dedicated hook; date formatting stays in `lib/date.ts` alongside date parsing since the two are small enough not to warrant separate files. Presentational concerns (form, list, card, filter bar) are split out of the screen files into `components/` because a single screen mixing form, filters, list, and inline styles stops being readable as those pieces grow — each extracted component still does one job, matching Principle II.

Theme and language state live in `contexts/` (React Context) because both are cross-cutting concerns read by nearly every screen and component — prop-drilling them would be more speculative complexity than a small context, not less. Their persistence reuses the existing SQLite database (`db/settings.ts`, a generic key/value table) instead of adding a new storage dependency like AsyncStorage, per the constitution's preference against unnecessary new dependencies. Labels/strings move out of `constants/` and into `lib/i18n.ts` once they need to vary by language; `constants/priorities.ts` and `constants/statuses.ts` now hold only the enum value lists.

## Complexity Tracking

No constitution violations identified; no justified complexity exceptions required.
